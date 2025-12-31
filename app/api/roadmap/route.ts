import { NextResponse } from 'next/server';
import { RoadmapData } from '@/types/roadmap';
import { JobTitleSchema } from '@/schemas/jobTitleSchema';

interface RequestBody {
  jobTitle: string;
}

// Lazy initialization for rate limiter
let ratelimit: any = null;

function getRateLimiter() {
  if (ratelimit !== null) return ratelimit;
  
  const hasRedisConfig = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!hasRedisConfig) {
    ratelimit = false; // Mark as disabled
    return false;
  }
  
  try {
    const { Ratelimit } = require("@upstash/ratelimit");
    const { Redis } = require("@upstash/redis");
    const rateLimitRequestsPerMinute = parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || "10", 10);
    
    ratelimit = new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(rateLimitRequestsPerMinute, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/roadmap",
    });
    return ratelimit;
  } catch (error) {
    console.error('Failed to initialize rate limiter:', error);
    ratelimit = false;
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Only apply rate limiting if Redis is configured
    const limiter = getRateLimiter();
    if (limiter) {
      try {
        const identifier = "api/roadmap";
        const { success, limit, remaining, reset } = await limiter.limit(identifier);

        if (!success) {
          const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
          return NextResponse.json(
            { message: `Too many requests. Please try again in ${retryAfterSeconds} seconds.` },
            {
              status: 429,
              headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
              },
            }
          );
        }
      } catch (rateLimitError) {
        console.error('Rate limiting error, skipping:', rateLimitError);
        // Continue without rate limiting if it fails
      }
    }

    const body = await request.json() as RequestBody;

    const validationResult = JobTitleSchema.safeParse(body.jobTitle);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.format()._errors.join(', ');
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      );
    }

    const jobTitle = validationResult.data;
    
    // Check if OpenRouter API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { message: 'API configuration error. Please set OPENROUTER_API_KEY.' },
        { status: 500 }
      );
    }

    // Skip AI validation - just do basic length check to save API calls
    // Job title validation is handled by Zod schema already
    
    // List of models to try in order (fallback chain)
    const modelsToTry = [
      process.env.OPENROUTER_ROADMAP_MODEL,
      'google/gemini-2.0-flash-exp:free',
      'meta-llama/llama-3.2-3b-instruct:free',
      'qwen/qwen-2-7b-instruct:free',
    ].filter(Boolean) as string[];
    
    let lastError: any = null;
    let response: Response | null = null;
    
    // Try each model until one works
    for (const model of modelsToTry) {
      console.log(`Trying model: ${model}`);
      try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'model': model,
            'messages': [
              {
                'role': 'system',
                'content': 'You are a career advisor AI that generates structured learning roadmaps. You MUST respond with valid JSON only, no markdown formatting, no explanatory text. The JSON must be parseable by JSON.parse().'
              },
              {
                'role': 'user',
                'content': `Generate a detailed learning roadmap for a ${jobTitle}. 

CRITICAL: Your response must be ONLY valid JSON, nothing else. No markdown code blocks, no explanation text before or after.

The JSON structure must be:
{
  "nodes": [
    {
      "id": "string",
      "name": "string (short title, max 30 chars)",
      "description": "string (concise explanation, max 200 chars)",
      "type": "primary | secondary | tertiary",
      "group": "string (group name)"
    }
  ],
  "links": [
    {
      "source": "string (parent node id)",
      "target": "string (child node id)",
      "type": "string"
    }
  ]
}

Requirements:
1. Create 5-8 groups of related skills
2. Each group should have 3-6 nodes
3. Use primary for essential skills, secondary for important, tertiary for nice-to-have
4. Include both technical and soft skills
5. Limit to 30-40 nodes total

Remember: Output ONLY the JSON object, starting with { and ending with }. No other text.`
              }
            ]
          })
        });
        
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.choices && responseData.choices[0] && responseData.choices[0].message && responseData.choices[0].message.content) {
            console.log(`Success with model: ${model}`);
            // Store the successful data and exit loop
            return processRoadmapResponse(responseData);
          }
        } else {
          const errorData = await response.json();
          console.error(`Model ${model} failed:`, errorData);
          lastError = errorData;
          response = null; // Reset to try next model
        }
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        lastError = error;
        response = null;
      }
    }
    
    // All models failed
    console.error('All models failed. Last error:', lastError);
    return NextResponse.json(
      { message: 'Failed to generate roadmap. All AI models are currently unavailable. Please try again later.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error in POST /api/roadmap:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper function to process the roadmap response
function processRoadmapResponse(data: any) {
  const content = data.choices[0].message.content;
    let roadmapData: RoadmapData;
    
    // Log the raw AI response for debugging
    console.error('=== AI Response Start ===');
    console.error('Response length:', content.length);
    console.error('First 2000 chars:', content.substring(0, 2000));
    console.error('Last 1000 chars:', content.substring(Math.max(0, content.length - 1000)));
    console.error('=== AI Response End ===');
    
    // Helper function to try to repair common JSON issues
    const repairJSON = (jsonStr: string): string => {
      let repaired = jsonStr
        // Remove trailing commas before ] or }
        .replace(/,\s*([\]}])/g, '$1')
        // Fix unquoted property names
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
        // Remove control characters
        .replace(/[\x00-\x1F\x7F]/g, ' ')
        // Fix single quotes to double quotes (careful with apostrophes)
        .replace(/:\s*'([^']*)'/g, ': "$1"')
        // Remove any text after the last }
        .replace(/\}[^}]*$/, '}');
      
      // Ensure the JSON is properly closed
      const openBraces = (repaired.match(/\{/g) || []).length;
      const closeBraces = (repaired.match(/\}/g) || []).length;
      const openBrackets = (repaired.match(/\[/g) || []).length;
      const closeBrackets = (repaired.match(/\]/g) || []).length;
      
      // Add missing closing brackets/braces
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        repaired += ']';
      }
      for (let i = 0; i < openBraces - closeBraces; i++) {
        repaired += '}';
      }
      
      return repaired;
    };
    
    // Function to extract JSON from content that may have reasoning/thinking text
    const extractJSON = (text: string): string | null => {
      // Try to find JSON in code blocks first
      let match = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (match) return match[1].trim();
      
      match = text.match(/```\s*([\s\S]*?)\s*```/);
      if (match && match[1].trim().startsWith('{')) return match[1].trim();
      
      // For DeepSeek R1, the JSON might come after reasoning text
      // Look for a complete JSON object with "nodes" and "links"
      const jsonPattern = /\{[\s\S]*?"nodes"\s*:\s*\[[\s\S]*?\][\s\S]*?"links"\s*:\s*\[[\s\S]*?\][\s\S]*?\}/;
      match = text.match(jsonPattern);
      if (match) return match[0];
      
      // Try to find any JSON object
      match = text.match(/\{[\s\S]*\}/);
      if (match) return match[0];
      
      return null;
    };
    
    try {
      const jsonStr = extractJSON(content);
                        
      if (jsonStr) {
        
        // Try parsing as-is first
        try {
          roadmapData = JSON.parse(jsonStr);
        } catch (firstError) {
          console.log('First parse attempt failed, trying to repair JSON...');
          
          // Try to repair and parse again
          try {
            const repairedJson = repairJSON(jsonStr);
            roadmapData = JSON.parse(repairedJson);
            console.log('JSON repaired and parsed successfully');
          } catch (repairError) {
            console.error('Error parsing JSON even after repair:', repairError);
            console.error('Original JSON (first 500 chars):', jsonStr.substring(0, 500));
            return NextResponse.json(
              { message: 'Failed to parse roadmap data from AI response. Please try again.' },
              { status: 500 }
            );
          }
        }
      } else {
        roadmapData = {
          nodes: [{ id: '1', name: 'Start', description: 'Starting point' }],
          links: []
        };
        
        const paragraphs = content.split('\n\n');
        paragraphs.forEach((para: string, index: number) => {
          if (para.trim() && index > 0) {
            const nodeId = (index + 1).toString();
            roadmapData.nodes.push({
              id: nodeId,
              name: para.split('.')[0] || `Step ${index}`,
              description: para
            });
            
            roadmapData.links.push({
              source: index.toString(),
              target: nodeId,
              type: 'next-step'
            });
          }
        });
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      roadmapData = {
        nodes: [
          { id: '1', name: 'Error', description: 'Failed to parse roadmap data' }
        ],
        links: []
      };
    }
    
    return NextResponse.json(roadmapData);
}