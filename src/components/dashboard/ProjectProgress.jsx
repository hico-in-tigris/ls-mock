import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Folder, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { cn } from "@/lib/utils";

const statusConfig = {
  "Plan": { color: "bg-slate-100 text-slate-700", progress: 33 },
  "Try": { color: "bg-blue-100 text-blue-700", progress: 66 },
  "Done": { color: "bg-emerald-100 text-emerald-700", progress: 100 }
};

export default function ProjectProgress({ projects = [] }) {
  const activeProjects = projects.filter(p => p.status !== 'Done').slice(0, 4);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Folder className="w-5 h-5 text-indigo-600" />
          進行中のプロジェクト
        </CardTitle>
        <Link 
          to={createPageUrl("Projects")}
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          すべて見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Folder className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>進行中のプロジェクトはありません</p>
          </div>
        ) : (
          activeProjects.map((project) => (
            <Link
              key={project.id}
              to={createPageUrl(`Projects?id=${project.id}`)}
              className="block group"
            >
              <div className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h4>
                    {project.purpose && (
                      <p className="text-sm text-slate-500 truncate mt-0.5">
                        {project.purpose}
                      </p>
                    )}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn("ml-3 shrink-0", statusConfig[project.status]?.color)}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
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