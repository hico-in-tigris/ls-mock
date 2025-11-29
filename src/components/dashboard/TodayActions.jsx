import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Clock, User, Folder, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors = {
  "連絡": "bg-blue-100 text-blue-700",
  "調整": "bg-purple-100 text-purple-700",
  "準備": "bg-amber-100 text-amber-700",
  "記録": "bg-emerald-100 text-emerald-700"
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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          今日やること
        </CardTitle>
        <Button size="sm" variant="outline" onClick={onAddAction} className="gap-1.5">
          <Plus className="w-4 h-4" />
          追加
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {todoActions.length === 0 && doneActions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>今日のアクションはありません</p>
          </div>
        ) : (
          <>
            {todoActions.map((action) => (
              <div 
                key={action.id}
                className="group flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <Checkbox 
                  checked={action.status === 'Done'}
                  onCheckedChange={() => onToggleStatus(action)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{action.content}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="secondary" className={cn("text-xs", typeColors[action.type])}>
                      {action.type}
                    </Badge>
                    {action.person_id && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {getPersonName(action.person_id)}
                      </span>
                    )}
                    {action.project_id && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        {getProjectTitle(action.project_id)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {doneActions.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  完了 ({doneActions.length})
                </p>
                {doneActions.slice(0, 3).map((action) => (
                  <div 
                    key={action.id}
                    className="flex items-center gap-3 p-2 rounded-lg opacity-60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <p className="text-sm text-slate-500 line-through">{action.content}</p>
                  </div>
                ))}
                {doneActions.length > 3 && (
                  <p className="text-xs text-slate-400 mt-2">他 {doneActions.length - 3} 件</p>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}