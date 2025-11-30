import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreVertical, MessageCircle, Edit, Folder, TrendingUp } from "lucide-react";
import { STAGE_COLORS, ROLE_COLORS, STATUS_COLORS } from '@/lib/people/types';
import { cn } from "@/lib/utils";

/**
 * PeopleCard - 人物カードコンポーネント（刷新版）
 * LocalSuccess UIガイドライン v0.1 準拠
 * 思考フロー × 地域プレイヤーのレーダーを体現
 */
export default function PeopleCard({
  id,
  name,
  fullName,
  role,
  status,
  interests,
  skills,
  recentActivity,
  projectCount,
  stage,
  activityScore,
  onClick,
  onContact,
  onEdit
}) {
  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <Card 
      className="hover:shadow-md transition-all duration-200 border-ls-border shadow-sm"
    >
      <CardContent className="p-4">
        {/* ヘッダー: Avatar + 名前 + 役割 + ステータス */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-ls-primary/10 text-ls-primary text-sm font-medium">
              {getInitials(name || fullName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-ls-text truncate">
                  {name || fullName}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", ROLE_COLORS[role] || ROLE_COLORS['その他'])}
                  >
                    {role}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", STATUS_COLORS[status] || STATUS_COLORS['未接触'])}
                  >
                    {status}
                  </Badge>
                </div>
              </div>
              
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
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    if (onClick) onClick(id);
                  }}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    詳細を見る
                  </DropdownMenuItem>
                  {onEdit && (
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      onEdit(id);
                    }}>
                      <Edit className="w-4 h-4 mr-2" />
                      編集する
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <Separator className="bg-ls-border mb-3" />
        
        {/* 関心領域 */}
        {interests && interests.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-ls-text-light mb-1.5">関心</p>
            <div className="flex flex-wrap gap-1">
              {interests.slice(0, 3).map((interest, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="text-xs bg-ls-bg border-ls-border rounded-full px-2.5 py-0.5"
                >
                  {interest}
                </Badge>
              ))}
              {interests.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-ls-bg border-ls-border rounded-full px-2.5 py-0.5">
                  +{interests.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* スキル */}
        {skills && skills.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-ls-text-light mb-1.5">スキル</p>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-xs border-ls-border rounded-full px-2.5 py-0.5"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-xs border-ls-border rounded-full px-2.5 py-0.5">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* 最近のアクティビティ */}
        {recentActivity && (
          <div className="mb-3">
            <p className="text-xs font-medium text-ls-text-light mb-1">最近</p>
            <p className="text-xs text-ls-text line-clamp-2 leading-relaxed">
              {recentActivity}
            </p>
          </div>
        )}
        
        <Separator className="bg-ls-border mb-3" />
        
        {/* フッター: プロジェクト数 + ステージ */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-ls-text-light">
            <Folder className="w-4 h-4" />
            <span>プロジェクト: {projectCount || 0}件</span>
          </div>
          {stage && (
            <Badge 
              variant="outline" 
              className={cn("text-xs", STAGE_COLORS[stage] || STAGE_COLORS['気づき'])}
            >
              {stage}
            </Badge>
          )}
        </div>
        
        {/* アクションボタン */}
        <Button
          variant="outline"
          className="w-full border-ls-border text-ls-text hover:bg-ls-bg"
          onClick={(e) => {
            e.stopPropagation();
            if (onContact) onContact(id);
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          この人に声をかける
        </Button>
      </CardContent>
    </Card>
  );
}
