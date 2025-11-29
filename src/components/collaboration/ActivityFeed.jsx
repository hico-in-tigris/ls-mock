import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  MessageCircle, 
  Edit, 
  Zap, 
  CheckCircle2, 
  Lightbulb, 
  Users,
  RefreshCw
} from "lucide-react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";

const actionConfig = {
  comment_added: { icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  answer_updated: { icon: Edit, color: 'text-amber-500', bg: 'bg-amber-50' },
  action_created: { icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
  action_completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  memo_added: { icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  shared: { icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
  status_changed: { icon: RefreshCw, color: 'text-slate-500', bg: 'bg-slate-50' }
};

export default function ActivityFeed({ hypothesisId, maxHeight = 400 }) {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', hypothesisId],
    queryFn: () => base44.entities.Activity.filter(
      { hypothesis_id: hypothesisId }, 
      '-created_date', 
      50
    ),
    refetchInterval: 30000 // 30秒ごとに更新
  });

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ja });
    } catch {
      return '';
    }
  };

  if (activities.length === 0 && !isLoading) {
    return (
      <Card className="border-slate-100 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
            <Activity className="w-4 h-4" />
            アクティビティ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400 text-center py-6">
            まだアクティビティがありません
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-100 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-700">
          <Activity className="w-4 h-4" />
          アクティビティ
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ maxHeight }}>
          <div className="px-6 pb-4 space-y-4">
            {activities.map((activity, index) => {
              const config = actionConfig[activity.action_type] || actionConfig.status_changed;
              const Icon = config.icon;
              
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className="relative">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      config.bg
                    )}>
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>
                    {index < activities.length - 1 && (
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pb-4">
                    <p className="text-sm text-slate-700">
                      {activity.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatTime(activity.created_date)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}