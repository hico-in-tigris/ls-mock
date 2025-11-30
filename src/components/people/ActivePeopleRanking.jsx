import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";
import { STAGE_COLORS } from '@/lib/people/types';
import { cn } from "@/lib/utils";

/**
 * ActivePeopleRanking - 今週のアクティブな人ランキング
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function ActivePeopleRanking({ people = [] }) {
  // activityScoreでソートして上位10名を取得
  const topPeople = [...people]
    .sort((a, b) => (b.activityScore || 0) - (a.activityScore || 0))
    .slice(0, 10);
  
  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };
  
  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };
  
  if (topPeople.length === 0) {
    return (
      <Card className="border-ls-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2 text-ls-text">
            <TrendingUp className="w-5 h-5 text-ls-primary" />
            今週のアクティブな人
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ls-text-light text-center py-4">
            データがありません
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-ls-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-ls-text">
          <TrendingUp className="w-5 h-5 text-ls-primary" />
          今週のアクティブな人
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topPeople.map((person, index) => {
            const rank = index + 1;
            const rankIcon = getRankIcon(rank);
            
            return (
              <div
                key={person.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  rank <= 3 
                    ? "bg-ls-primary/5 border border-ls-primary/20" 
                    : "bg-ls-bg hover:bg-ls-surface border border-ls-border"
                )}
              >
                {/* ランク */}
                <div className="flex items-center justify-center w-8 h-8 shrink-0">
                  {rankIcon ? (
                    <span className="text-lg">{rankIcon}</span>
                  ) : (
                    <span className="text-sm font-medium text-ls-text-light">
                      {rank}
                    </span>
                  )}
                </div>
                
                {/* Avatar */}
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-ls-primary/10 text-ls-primary text-xs">
                    {getInitials(person.name || person.fullName)}
                  </AvatarFallback>
                </Avatar>
                
                {/* 情報 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-ls-text truncate">
                      {person.name || person.fullName}
                    </p>
                    {person.stage && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs shrink-0",
                          STAGE_COLORS[person.stage] || STAGE_COLORS['気づき']
                        )}
                      >
                        {person.stage}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-ls-text-light">
                      <Award className="w-3 h-3" />
                      <span>{person.activityScore || 0}</span>
                    </div>
                    {person.projectCount > 0 && (
                      <span className="text-xs text-ls-text-light">
                        {person.projectCount}件
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

