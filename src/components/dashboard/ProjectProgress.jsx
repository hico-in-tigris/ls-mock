import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Folder, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";

const statusConfig = {
  "Plan": { color: "bg-ls-bg text-ls-text-light border-ls-border", progress: 33 },
  "Try": { color: "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20", progress: 66 },
  "Done": { color: "bg-ls-success/10 text-ls-success border-ls-success/20", progress: 100 }
};

export default function ProjectProgress({ projects = [] }) {
  const activeProjects = projects.filter(p => p.status !== 'Done').slice(0, 4);

  return (
    <Card className="h-full border-ls-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-ls-text">
          <Folder className="w-5 h-5 text-ls-primary" />
          進行中のプロジェクト
        </CardTitle>
        <Link 
          to={createPageUrl("Projects")}
          className="text-sm text-ls-primary hover:text-ls-primary-light flex items-center gap-1"
        >
          すべて見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.length === 0 ? (
          <div className="text-center py-8 text-ls-text-light">
            <Folder className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">進行中のプロジェクトはありません</p>
          </div>
        ) : (
          activeProjects.map((project) => (
            <Link
              key={project.id}
              to={createPageUrl(`Projects?id=${project.id}`)}
              className="block group"
            >
              <div className="p-4 rounded-lg bg-ls-bg hover:bg-ls-surface border border-ls-border transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-ls-text truncate group-hover:text-ls-primary transition-colors">
                      {project.title}
                    </h4>
                    {project.purpose && (
                      <p className="text-xs text-ls-text-light truncate mt-0.5">
                        {project.purpose}
                      </p>
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("ml-3 shrink-0 text-xs", statusConfig[project.status]?.color)}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-ls-text-light">
                    <span>進捗</span>
                    <span>{statusConfig[project.status]?.progress || 0}%</span>
                  </div>
                  <Progress 
                    value={statusConfig[project.status]?.progress || 0} 
                    className="h-1.5"
                  />
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}