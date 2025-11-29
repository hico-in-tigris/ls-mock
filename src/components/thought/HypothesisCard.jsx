import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Eye, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HypothesisCard({ 
  hypothesis, 
  isSelected, 
  onSelect,
  showStatus = false,
  compact = false
}) {
  const statusLabels = {
    unverified: { label: '未検証', color: 'bg-slate-100 text-slate-600' },
    verifying: { label: '検証中', color: 'bg-amber-100 text-amber-700' },
    verified: { label: '検証済', color: 'bg-emerald-100 text-emerald-700' }
  };

  const statusConfig = statusLabels[hypothesis.status] || statusLabels.unverified;

  if (compact) {
    return (
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-200",
          "hover:shadow-md",
          isSelected && "ring-2 ring-slate-800"
        )}
        onClick={() => onSelect?.(hypothesis)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-slate-900 text-sm">{hypothesis.title}</h3>
              {hypothesis.target && (
                <p className="text-xs text-slate-500 mt-1 truncate">
                  {hypothesis.target}
                </p>
              )}
            </div>
            {showStatus && (
              <Badge variant="secondary" className={cn("text-xs shrink-0", statusConfig.color)}>
                {statusConfig.label}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        isSelected && "ring-2 ring-slate-800 shadow-lg"
      )}
      onClick={() => onSelect?.(hypothesis)}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-slate-900 leading-snug">
            {hypothesis.title}
          </h3>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {hypothesis.target && (
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 mb-0.5">ターゲット</p>
                <p className="text-sm text-slate-700">{hypothesis.target}</p>
              </div>
            </div>
          )}

          {hypothesis.background && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 mb-0.5">背景</p>
                <p className="text-sm text-slate-700 line-clamp-2">{hypothesis.background}</p>
              </div>
            </div>
          )}

          {hypothesis.perspective && (
            <div className="flex items-start gap-2">
              <Eye className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400 mb-0.5">検証の切り口</p>
                <p className="text-sm text-slate-700">{hypothesis.perspective}</p>
              </div>
            </div>
          )}
        </div>

        {showStatus && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Badge variant="secondary" className={cn("text-xs", statusConfig.color)}>
              {statusConfig.label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}