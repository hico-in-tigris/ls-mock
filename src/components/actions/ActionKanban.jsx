import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Circle, 
  PlayCircle, 
  CheckCircle2,
  Calendar,
  User,
  Folder,
  GripVertical,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, parseISO, isToday, isPast } from "date-fns";
import { cn } from "@/lib/utils";

const columns = [
  { id: 'Todo', title: 'Todo', icon: Circle, color: 'text-ls-text-light', bg: 'bg-ls-bg' },
  { id: 'Doing', title: 'Doing', icon: PlayCircle, color: 'text-ls-secondary', bg: 'bg-ls-secondary/10' },
  { id: 'Done', title: 'Done', icon: CheckCircle2, color: 'text-ls-success', bg: 'bg-ls-success/10' }
];

const typeColors = {
  "連絡": "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20",
  "調整": "bg-ls-primary-light/10 text-ls-primary-light border-ls-primary-light/20",
  "準備": "bg-ls-warning/10 text-ls-warning border-ls-warning/20",
  "記録": "bg-ls-success/10 text-ls-success border-ls-success/20"
};

const priorityColors = {
  "高": "border-l-ls-danger",
  "中": "border-l-ls-warning",
  "低": "border-l-ls-border"
};

export default function ActionKanban({ 
  actions = [], 
  people = [],
  projects = [],
  onStatusChange,
  onEdit,
  onDelete
}) {
  const getPersonName = (personId) => {
    const person = people.find(p => p.id === personId);
    return person?.name || '';
  };

  const getProjectTitle = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.title || '';
  };

  const isOverdue = (action) => {
    if (!action.due_date || action.status === 'Done') return false;
    return isPast(parseISO(action.due_date)) && !isToday(parseISO(action.due_date));
  };

  const isDueToday = (action) => {
    if (!action.due_date) return false;
    return isToday(parseISO(action.due_date));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {columns.map(column => {
        const columnActions = actions.filter(a => a.status === column.id);
        const Icon = column.icon;
        
        return (
          <div key={column.id} className="space-y-4">
            <div className={cn(
              "flex items-center gap-2 p-3 rounded-lg border border-ls-border",
              column.bg
            )}>
              <Icon className={cn("w-5 h-5", column.color)} />
              <h3 className="text-sm font-medium text-ls-text">{column.title}</h3>
              <Badge variant="secondary" className="ml-auto bg-ls-bg border-ls-border">
                {columnActions.length}
              </Badge>
            </div>

            <div className="space-y-3 min-h-[200px]">
              {columnActions.map(action => (
                <Card 
                  key={action.id}
                  className={cn(
                    "border-l-4 transition-all hover:shadow-md cursor-pointer border-ls-border shadow-sm",
                    priorityColors[action.priority] || priorityColors["中"],
                    isOverdue(action) && "ring-2 ring-ls-danger/20 bg-ls-danger/10"
                  )}
                  onClick={() => onEdit(action)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className={cn(
                        "text-sm font-medium text-ls-text",
                        action.status === 'Done' && "line-through text-ls-text-light"
                      )}>
                        {action.content}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {column.id !== 'Todo' && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(action, 'Todo');
                            }}>
                              <Circle className="w-4 h-4 mr-2 text-ls-text-light" />
                              Todoに移動
                            </DropdownMenuItem>
                          )}
                          {column.id !== 'Doing' && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(action, 'Doing');
                            }}>
                              <PlayCircle className="w-4 h-4 mr-2 text-ls-secondary" />
                              Doingに移動
                            </DropdownMenuItem>
                          )}
                          {column.id !== 'Done' && (
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(action, 'Done');
                            }}>
                              <CheckCircle2 className="w-4 h-4 mr-2 text-ls-success" />
                              Doneに移動
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-ls-danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(action);
                            }}
                          >
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={cn("text-xs", typeColors[action.type])}>
                        {action.type}
                      </Badge>
                      
                      {action.due_date && (
                        <span className={cn(
                          "text-xs flex items-center gap-1",
                          isOverdue(action) ? "text-ls-danger font-medium" :
                          isDueToday(action) ? "text-ls-warning font-medium" :
                          "text-ls-text-light"
                        )}>
                          <Calendar className="w-4 h-4" />
                          {format(parseISO(action.due_date), 'M/d')}
                        </span>
                      )}
                    </div>

                    {(action.person_id || action.project_id) && (
                      <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-ls-border">
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
                    )}
                  </CardContent>
                </Card>
              ))}

              {columnActions.length === 0 && (
                <div className="flex items-center justify-center h-32 text-sm text-ls-text-light border-2 border-dashed border-ls-border rounded-lg bg-ls-bg">
                  アクションがありません
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}