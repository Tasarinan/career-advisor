"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Star, Eye, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedRoadmap {
  id: string;
  job_title: string;
  created_at: string;
  nodes_count: number;
  is_favorite: boolean;
}

export function MyRoadmapsCard() {
  const { user } = useUser();
  const { toast } = useToast();
  const [savedRoadmaps, setSavedRoadmaps] = useState<SavedRoadmap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, fetch from API
      // For now, show placeholder
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleDeleteRoadmap = async (roadmapId: string) => {
    try {
      // API call would go here
      setSavedRoadmaps(roadmaps => roadmaps.filter(r => r.id !== roadmapId));
      toast({
        title: "Roadmap deleted",
        description: "The roadmap has been removed from your collection.",
      });
    } catch (error) {
      console.error('Failed to delete roadmap:', error);
      toast({
        title: "Failed to delete",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (roadmapId: string) => {
    setSavedRoadmaps(roadmaps => 
      roadmaps.map(r => 
        r.id === roadmapId ? { ...r, is_favorite: !r.is_favorite } : r
      )
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            My Roadmaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Loading roadmaps...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          My Roadmaps
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedRoadmaps.length === 0 ? (
          <div className="text-center py-8">
            <Map className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No saved roadmaps yet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Create your first career roadmap and save it here for future reference.
            </p>
            <Button asChild>
              <a href="/">Create Roadmap</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedRoadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{roadmap.job_title}</h4>
                      {roadmap.is_favorite && (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {roadmap.nodes_count} skills
                      </Badge>
                      <span>•</span>
                      <span>{new Date(roadmap.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFavorite(roadmap.id)}
                      className="h-8 w-8"
                    >
                      <Star className={`h-4 w-4 ${roadmap.is_favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRoadmap(roadmap.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
