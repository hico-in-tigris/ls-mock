import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Folder, 
  Target,
  Calendar,
  ChevronRight,
  Pencil
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

const statusConfig = {
  "Plan": { color: "bg-ls-bg text-ls-text-light border-ls-border", progress: 33 },
  "Try": { color: "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20", progress: 66 },
  "Done": { color: "bg-ls-success/10 text-ls-success border-ls-success/20", progress: 100 }
};

const wizardStages = [
  { id: 1, name: '想いの整理' },
  { id: 2, name: '企画構成' },
  { id: 3, name: '目標設定' },
  { id: 4, name: '関係者分析' },
  { id: 5, name: '提案作成' }
];

export default function ProjectCard({ 
  project, 
  onView, 
  onEdit,
  compact = false 
}) {
  const config = statusConfig[project.status] || statusConfig.Plan;
  const currentStage = wizardStages.find(s => s.id === (project.wizard_stage || 1));

  if (compact) {
    return (
      <div 
        onClick={() => onView(project)}
        className="flex items-center gap-3 p-3 rounded-lg bg-ls-surface hover:bg-ls-bg border border-ls-border cursor-pointer transition-all"
      >
        <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
          <Folder className="w-5 h-5 text-ls-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ls-text truncate">{project.title}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("text-xs", config.color)}>
              {project.status}
            </Badge>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-ls-text-light" />
      </div>
    );
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md border-ls-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center shrink-0">
              <Folder className="w-5 h-5 text-ls-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-medium text-ls-text group-hover:text-ls-primary transition-colors">
                {project.title}
              </h3>
              <Badge variant="secondary" className={cn("mt-1", config.color)}>
                {project.status}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        {project.purpose && (
          <p className="text-sm text-ls-text mb-3 line-clamp-2">
            {project.purpose}
          </p>
        )}

        {project.kpi && (
          <div className="flex items-center gap-2 text-sm text-ls-text-light mb-3">
            <Target className="w-4 h-4 text-ls-primary" />
            <span className="truncate">{project.kpi}</span>
          </div>
        )}

        {/* Wizard Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-ls-text-light mb-2">
            <span>設計進捗: {currentStage?.name}</span>
            <span>{((project.wizard_stage || 1) / 5 * 100).toFixed(0)}%</span>
          </div>
          <Progress value={(project.wizard_stage || 1) / 5 * 100} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-ls-border">
          <div className="flex items-center gap-1.5 text-xs text-ls-text-light">
            <Calendar className="w-4 h-4" />
            {project.updated_date 
              ? format(parseISO(project.updated_date), 'M/d更新')
              : format(parseISO(project.created_date), 'M/d作成')}
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onView(project)}
            className="gap-1 border-ls-border"
          >
            詳細
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}