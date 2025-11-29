import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatsCard({ title, value, icon: Icon, trend, trendLabel, className, iconClassName }) {
  return (
    <Card className={cn("relative overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {(trend !== undefined || trendLabel) && (
              <div className="flex items-center gap-1.5 text-sm">
                {trend !== undefined && (
                  <span className={cn(
                    "font-medium",
                    trend >= 0 ? "text-emerald-600" : "text-red-500"
                  )}>
                    {trend >= 0 ? "+" : ""}{trend}%
                  </span>
                )}
                {trendLabel && <span className="text-slate-400">{trendLabel}</span>}
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn(
              "p-3 rounded-xl bg-blue-50",
              iconClassName
            )}>
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}