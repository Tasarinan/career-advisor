# Career Roadmap Generator - Setup Guide

## Overview
This project has been updated to implement an AI-powered career roadmap generator according to the PRD specifications. The system visualizes personalized career learning paths with hierarchical skill importance levels.

## Recent Updates

### 1. Core Components Created
- **SearchInput** (`components/search-input.tsx`): Job title input with validation
- **LoadingAnimation** (`components/loading-animation.tsx`): 10-stage loading feedback
- **RoadmapVisualizer** (`components/roadmap-visualizer.tsx`): Simplified card-based visualization (ReactFlow integration pending)
- **API Endpoint** (`app/api/roadmap/route.ts`): OpenRouter API integration
- **Homepage** (`app/page.tsx`): Completely rewritten to match PRD specifications

### 2. Required Dependencies (Not Yet Installed)

To enable full visualization features, you need to install:

```bash
npm install reactflow html-to-image
```

**Note**: The current RoadmapVisualizer uses a simplified card layout. Once ReactFlow is installed, it can be upgraded to full graph visualization.

### 3. Environment Variables Setup

Create or update `.env.local` with the following variables:

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# API Configuration  
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase Configuration (if still needed)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Get OpenRouter API Key**:
1. Visit [https://openrouter.ai](https://openrouter.ai)
2. Sign up / Log in
3. Generate an API key from your dashboard
4. Paste it in the `.env.local` file

### 4. Build and Run

Once dependencies are installed and environment variables are configured:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Features Implemented

### Homepage (`app/page.tsx`)
- Clean, modern hero section with gradient background
- Centered search input for job titles
- Features showcase (3 cards)
- Conditional rendering: search form ↔ roadmap visualization
- Loading animation during API calls
- Footer with branding

### Search Input (`components/search-input.tsx`)
- Input validation with Zod
- Example placeholder text showing sample job titles
- Error display with animations
- Submit button with loading state
- Keyboard support (Enter to submit)

### Loading Animation (`components/loading-animation.tsx`)
- 10 sequential loading stages matching PRD specifications:
  1. Understanding your career goals
  2. Analyzing market trends
  3. Identifying key skills
  4. Mapping learning paths
  5. Prioritizing competencies
  6. Structuring roadmap
  7. Validating dependencies
  8. Optimizing sequence
  9. Finalizing recommendations
  10. Preparing visualization
- Progress bar showing completion percentage
- Animated logo with scale and rotate
- Current stage counter

### Roadmap Visualizer (`components/roadmap-visualizer.tsx`)
- **Current Implementation**: Card-based layout grouped by importance
- Stats display: Total Topics, Learning Connections, Critical Skills
- Legend explaining node types:
  - **Primary (Blue)**: Critical core skills
  - **Secondary (Yellow)**: Important supporting skills
  - **Tertiary (Orange)**: Supplementary skills
- Animated cards with hover effects
- Group labels for skill categories
- Download button (placeholder until ReactFlow integration)

**Future Enhancement with ReactFlow**:
- Graph-based visualization with nodes and edges
- Interactive pan and zoom
- Minimap for navigation
- Image export with html-to-image

### API Endpoint (`app/api/roadmap/route.ts`)
- POST endpoint accepting `jobTitle` parameter
- OpenRouter API integration
- Structured prompt engineering for hierarchical roadmap generation
- JSON parsing and validation
- Error handling with user-friendly messages
- Response format:
  ```json
  {
    "nodes": [
      {
        "id": "unique-id",
        "name": "Skill Name",
        "description": "Skill description",
        "type": "primary" | "secondary" | "tertiary",
        "group": "Category Name"
      }
    ],
    "links": [
      {
        "source": "node-id-1",
        "target": "node-id-2",
        "type": "prerequisite"
      }
    ]
  }
  ```

## API Models Used

According to PRD specifications:

1. **Check Model**: `google/gemini-flash-1.5-8b`
   - Fast validation and preprocessing
   
2. **Roadmap Generation**: `openai/o3-mini-high`
   - High-quality career path generation
   - Structured JSON output
   - Comprehensive skill mapping

## Architecture

```
User Input (Job Title)
  ↓
SearchInput Component
  ↓
POST /api/roadmap
  ↓
OpenRouter API
  ↓
Structured JSON Response
  ↓
RoadmapVisualizer Component
  ↓
Card-Based Display (Current)
or
ReactFlow Graph (With npm install)
```

## Color Scheme (PRD Compliant)

- **Primary Skills**: Blue gradient (#3B82F6 to #6366F1)
- **Secondary Skills**: Yellow (#EAB308)
- **Tertiary Skills**: Orange (#F97316)
- **Background**: White with slate undertones
- **Text**: Slate-900 for headings, Slate-600 for body

## Next Steps

1. **Install Dependencies**:
   ```bash
   npm install reactflow html-to-image
   ```

2. **Configure Environment Variables**:
   - Add your OpenRouter API key to `.env.local`

3. **Test the Application**:
   ```bash
   npm run dev
   ```
   - Open http://localhost:3000
   - Try searching for job titles like:
     - "DevOps Engineer"
     - "Product Manager"
     - "Data Scientist"
     - "Full Stack Developer"

4. **Upgrade RoadmapVisualizer** (After installing reactflow):
   - Replace card layout with ReactFlow graph
   - Implement auto-layout algorithms
   - Add download functionality with html-to-image

5. **Additional Enhancements**:
   - Mobile responsiveness testing
   - Accessibility audit (WCAG 2.1 AA)
   - Loading animation polish
   - Error boundary implementation
   - Rate limiting on API endpoint

## Known Limitations

- ReactFlow and html-to-image not yet installed (manual installation required)
- Download feature is placeholder until ReactFlow integration
- No graph visualization (using card layout temporarily)
- OpenRouter API key must be manually configured

## TypeScript Errors Fixed

- ✅ Next.js 15 async params destructuring
- ✅ SessionData type compatibility
- ✅ Credits type display issue
- ✅ Import statements for missing packages (removed temporarily)

## File Structure

```
app/
  ├── page.tsx (NEW - Roadmap Generator Homepage)
  ├── api/
  │   └── roadmap/
  │       └── route.ts (NEW - OpenRouter API Integration)
components/
  ├── search-input.tsx (NEW)
  ├── loading-animation.tsx (NEW)
  └── roadmap-visualizer.tsx (NEW - Simplified version)
```

## Support

For issues or questions:
1. Check that all environment variables are configured
2. Verify Node.js version compatibility (v18+ recommended)
3. Ensure npm packages are installed correctly
4. Check browser console for client-side errors
5. Check terminal output for server-side errors
