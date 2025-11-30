import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Eye, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HypothesisCard - 仮説カードコンポーネント
 * LocalSuccess UIガイドライン v0.1 準拠
 * LSCard構造: タイトル・本文の順序
 */
export default function HypothesisCard({ 
  hypothesis, 
  isSelected, 
  onSelect,
  showStatus = false,
  compact = false
}) {
  const statusLabels = {
    unverified: { label: '未検証', color: 'bg-ls-bg text-ls-text-light border-ls-border' },
    verifying: { label: '検証中', color: 'bg-ls-warning/10 text-ls-warning border-ls-warning/20' },
    verified: { label: '検証済', color: 'bg-ls-success/10 text-ls-success border-ls-success/20' }
  };

  const statusConfig = statusLabels[hypothesis.status] || statusLabels.unverified;

  if (compact) {
    return (
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-200 border-ls-border shadow-sm",
          "hover:shadow-md",
          isSelected && "ring-2 ring-ls-primary"
        )}
        onClick={() => onSelect?.(hypothesis)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-ls-text">{hypothesis.title}</h3>
              {hypothesis.target && (
                <p className="text-xs text-ls-text-light mt-1 truncate">
                  {hypothesis.target}
                </p>
              )}
            </div>
            {showStatus && (
              <Badge variant="outline" className={cn("text-xs shrink-0", statusConfig.color)}>
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
        "cursor-pointer transition-all duration-200 border-ls-border shadow-sm",
        "hover:shadow-md",
        isSelected && "ring-2 ring-ls-primary shadow-md"
      )}
      onClick={() => onSelect?.(hypothesis)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-medium text-ls-text leading-snug">
            {hypothesis.title}
          </h3>
          {isSelected && (
            <div className="w-6 h-6 rounded-lg bg-ls-primary flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {hypothesis.target && (
            <div className="flex items-start gap-2">
              <Users className="w-5 h-5 text-ls-text-light mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-ls-text-light mb-1">ターゲット</p>
                <p className="text-sm text-ls-text leading-relaxed">{hypothesis.target}</p>
              </div>
            </div>
          )}

          {hypothesis.background && (
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-ls-text-light mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-ls-text-light mb-1">背景</p>
                <p className="text-sm text-ls-text leading-relaxed line-clamp-2">{hypothesis.background}</p>
              </div>
            </div>
          )}

          {hypothesis.perspective && (
            <div className="flex items-start gap-2">
              <Eye className="w-5 h-5 text-ls-text-light mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-ls-text-light mb-1">検証の切り口</p>
                <p className="text-sm text-ls-text leading-relaxed">{hypothesis.perspective}</p>
              </div>
            </div>
          )}
        </div>

        {showStatus && (
          <div className="mt-4 pt-3 border-t border-ls-border">
            <Badge variant="outline" className={cn("text-xs", statusConfig.color)}>
              {statusConfig.label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
