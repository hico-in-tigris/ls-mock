import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Clock, User, Folder, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors = {
  "連絡": "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20",
  "調整": "bg-ls-primary-light/10 text-ls-primary-light border-ls-primary-light/20",
  "準備": "bg-ls-warning/10 text-ls-warning border-ls-warning/20",
  "記録": "bg-ls-success/10 text-ls-success border-ls-success/20"
};

export default function TodayActions({ 
  actions = [], 
  onToggleStatus, 
  onAddAction,
  people = [],
  projects = []
}) {
  const todoActions = actions.filter(a => a.status === 'Todo' || a.status === 'Doing');
  const doneActions = actions.filter(a => a.status === 'Done');

  const getPersonName = (personId) => {
    const person = people.find(p => p.id === personId);
    return person?.name || '';
  };

  const getProjectTitle = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || '';
  };

  return (
    <Card className="h-full border-ls-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-ls-text">
          <Clock className="w-5 h-5 text-ls-primary" />
          今日やること
        </CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onAddAction} 
          className="gap-1.5 border-ls-border text-ls-text hover:bg-ls-bg"
        >
          <Plus className="w-4 h-4" />
          追加
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {todoActions.length === 0 && doneActions.length === 0 ? (
          <div className="text-center py-8 text-ls-text-light">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">今日のアクションはありません</p>
          </div>
        ) : (
          <>
            {todoActions.map((action) => (
              <div 
                key={action.id}
                className="group flex items-start gap-3 p-3 rounded-lg bg-ls-bg hover:bg-ls-surface border border-ls-border transition-colors min-h-[44px]"
              >
                <Checkbox 
                  checked={action.status === 'Done'}
                  onCheckedChange={() => onToggleStatus(action)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ls-text">{action.content}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className={cn("text-xs", typeColors[action.type])}>
                      {action.type}
                    </Badge>
                    {action.person_id && (
                      <span className="text-xs text-ls-text-light flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {getPersonName(action.person_id)}
                      </span>
                    )}
                    {action.project_id && (
                      <span className="text-xs text-ls-text-light flex items-center gap-1">
                        <Folder className="w-4 h-4" />
                        {getProjectTitle(action.project_id)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {doneActions.length > 0 && (
              <div className="pt-4 border-t border-ls-border">
                <p className="text-xs font-medium text-ls-text-light uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-ls-success" />
                  完了 ({doneActions.length})
                </p>
                {doneActions.slice(0, 3).map((action) => (
                  <div 
                    key={action.id}
                    className="flex items-center gap-3 p-2 rounded-lg opacity-60 min-h-[44px]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-ls-success shrink-0" />
                    <p className="text-sm text-ls-text-light line-through">{action.content}</p>
                  </div>
                ))}
                {doneActions.length > 3 && (
                  <p className="text-xs text-ls-text-light mt-2">他 {doneActions.length - 3} 件</p>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}