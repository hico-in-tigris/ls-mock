import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * StatsCard - 統計カードコンポーネント
 * LocalSuccess UIガイドライン v0.1 準拠
 * LSCard構造: タイトル・本文の順序
 */
export default function StatsCard({ title, value, icon: Icon, trend, trendLabel, className, iconClassName }) {
  return (
    <Card className={cn("relative overflow-hidden transition-all duration-300 hover:shadow-md border-ls-border shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-ls-text-light">{title}</p>
            <p className="text-2xl font-bold text-ls-text">{value}</p>
            {(trend !== undefined || trendLabel) && (
              <div className="flex items-center gap-1.5 text-sm">
                {trend !== undefined && (
                  <span className={cn(
                    "font-medium",
                    trend >= 0 ? "text-ls-success" : "text-ls-danger"
                  )}>
                    {trend >= 0 ? "+" : ""}{trend}%
                  </span>
                )}
                {trendLabel && <span className="text-ls-text-light">{trendLabel}</span>}
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn(
              "p-3 rounded-lg",
              iconClassName || "bg-ls-primary/10"
            )}>
              <Icon className="w-5 h-5 text-ls-primary" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}