"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Calendar, MapPin } from "lucide-react";

interface RoadmapLog {
  id: string;
  job_title: string;
  nodes_generated: number;
  created_at: string;
}

interface RoadmapStats {
  total_roadmaps: number;
  total_skills_mapped: number;
  unique_careers: number;
  this_month: number;
}

export function RoadmapHistoryCard() {
  const { user } = useUser();
  const [logs, setLogs] = useState<RoadmapLog[]>([]);
  const [stats, setStats] = useState<RoadmapStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, fetch from API
      // For now, show placeholder stats
      setStats({
        total_roadmaps: 0,
        total_skills_mapped: 0,
        unique_careers: 0,
        this_month: 0
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Roadmap History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">Loading history...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Roadmap History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Summary */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.total_roadmaps}</div>
              <div className="text-xs text-muted-foreground">Roadmaps</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.total_skills_mapped}</div>
              <div className="text-xs text-muted-foreground">Skills Mapped</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.unique_careers}</div>
              <div className="text-xs text-muted-foreground">Careers Explored</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.this_month}</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Activity
          </h4>
          
          {logs.length === 0 ? (
            <div className="text-center py-6 bg-muted/30 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No roadmaps generated yet. Create your first one!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.slice(0, 5).map((log, index) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{log.job_title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {log.nodes_generated} skills
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights */}
        {stats && stats.total_roadmaps > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">
                You've explored {stats.unique_careers} different career paths!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
