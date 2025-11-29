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
  "Plan": { color: "bg-slate-100 text-slate-700 border-slate-200", progress: 33 },
  "Try": { color: "bg-blue-100 text-blue-700 border-blue-200", progress: 66 },
  "Done": { color: "bg-emerald-100 text-emerald-700 border-emerald-200", progress: 100 }
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
        className="flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-100 cursor-pointer transition-all"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
          <Folder className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 truncate">{project.title}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("text-xs", config.color)}>
              {project.status}
            </Badge>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shrink-0">
              <Folder className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
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
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {project.purpose}
          </p>
        )}

        {project.kpi && (
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Target className="w-4 h-4 text-indigo-500" />
            <span className="truncate">{project.kpi}</span>
          </div>
        )}

        {/* Wizard Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>設計進捗: {currentStage?.name}</span>
            <span>{((project.wizard_stage || 1) / 5 * 100).toFixed(0)}%</span>
          </div>
          <Progress value={(project.wizard_stage || 1) / 5 * 100} className="h-1.5" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {project.updated_date 
              ? format(parseISO(project.updated_date), 'M/d更新')
              : format(parseISO(project.created_date), 'M/d作成')}
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onView(project)}
            className="gap-1"
          >
            詳細
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}