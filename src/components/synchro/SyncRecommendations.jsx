import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  Heart,
  Loader2,
  RefreshCw,
  ChevronDown
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { cn } from "@/lib/utils";

export default function SyncRecommendations({ hypothesis, onGenerateTags }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);

  // 類似仮説を検索
  const { data: similarHypotheses = [], isLoading: isLoadingSimilar, refetch } = useQuery({
    queryKey: ['similar-hypotheses', hypothesis.id, hypothesis.emotional_tags],
    queryFn: async () => {
      if (!hypothesis.emotional_tags?.length) return [];
      
      // 公開されている他の仮説を取得
      const allHypotheses = await base44.entities.Hypothesis.filter({ is_public: true });
      
      // 自分の仮説を除外
      const others = allHypotheses.filter(h => h.id !== hypothesis.id);
      
      // タグベースでスコアリング
      const scored = others.map(h => {
        const tags = h.emotional_tags || [];
        const matchCount = hypothesis.emotional_tags.filter(t => 
          tags.some(ht => ht.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(ht.toLowerCase()))
        ).length;
        
        // 背景やターゲットの類似性も考慮
        let contextScore = 0;
        if (h.target && hypothesis.target && 
            (h.target.includes(hypothesis.target) || hypothesis.target.includes(h.target))) {
          contextScore += 1;
        }
        
        return {
          ...h,
          matchScore: matchCount + contextScore,
          matchedTags: hypothesis.emotional_tags.filter(t => 
            tags.some(ht => ht.toLowerCase().includes(t.toLowerCase()))
          )
        };
      });
      
      // スコア順でソート、上位5件
      return scored
        .filter(h => h.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
    },
    enabled: !!hypothesis.emotional_tags?.length
  });

  // 先人の学びを生成
  const generateLearningsMutation = useMutation({
    mutationFn: async () => {
      const verifiedHypotheses = similarHypotheses.filter(h => h.status === 'verified');
      if (verifiedHypotheses.length === 0) return null;

      const learningsData = verifiedHypotheses.map(h => ({
        title: h.title,
        actions: (h.actions || []).filter(a => a.status === 'done'),
        verifications: (h.actions || []).flatMap(a => a.verifications || [])
      }));

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたは地域おこし協力隊の経験を整理するファシリテーターです。

以下は、似たモヤモヤを乗り越えた先輩隊員たちの行動と検証の記録です：

${JSON.stringify(learningsData, null, 2)}

これらの経験から、今悩んでいる隊員へのヒントを3つ抽出してください。
具体的で、行動に移しやすい示唆にしてください。
解決策を押し付けず、「こういう視点もある」という形で。`,
        response_json_schema: {
          type: "object",
          properties: {
            learnings: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });
      return response.learnings;
    }
  });

  const handleGenerateTags = async () => {
    setIsGeneratingTags(true);
    await onGenerateTags();
    setIsGeneratingTags(false);
  };

  const memberStatusLabel = {
    active: '現役',
    obog: 'OBOG'
  };

  if (!hypothesis.emotional_tags?.length) {
    return (
      <Card className="border-slate-100 shadow-none bg-gradient-to-br from-purple-50/30 to-pink-50/20">
        <CardContent className="py-8 text-center">
          <Heart className="w-10 h-10 text-purple-300 mx-auto mb-3" />
          <h3 className="font-medium text-slate-800 mb-2">
            似たモヤモヤを持つ仲間を探す
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            あなたの想いから「心の揺れタグ」を生成し、<br />
            同じ悩みを持つ協力隊員を見つけます
          </p>
          <Button
            onClick={handleGenerateTags}
            disabled={isGeneratingTags}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isGeneratingTags ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            ) : (
              <Sparkles className="w-4 h-4 mr-1.5" />
            )}
            タグを生成して仲間を探す
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-100 shadow-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800">
                <Heart className="w-4 h-4 text-purple-500" />
                似たモヤモヤを持つ隊員
              </CardTitle>
              <ChevronDown className={cn(
                "w-5 h-5 text-slate-400 transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* 心の揺れタグ */}
            <div className="flex flex-wrap gap-2">
              {hypothesis.emotional_tags.map((tag, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="bg-purple-100 text-purple-700"
                >
                  {tag}
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGenerateTags}
                disabled={isGeneratingTags}
                className="h-6 text-xs text-slate-400"
              >
                <RefreshCw className={cn("w-3 h-3 mr-1", isGeneratingTags && "animate-spin")} />
                再生成
              </Button>
            </div>

            {/* 類似隊員リスト */}
            {isLoadingSimilar ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : similarHypotheses.length > 0 ? (
              <div className="space-y-3">
                {similarHypotheses.map((h) => (
                  <div 
                    key={h.id}
                    className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {h.region && (
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {h.region}
                            </span>
                          )}
                          {h.member_status && (
                            <Badge variant="outline" className="text-xs">
                              {memberStatusLabel[h.member_status] || '隊員'}
                            </Badge>
                          )}
                          {h.status === 'verified' && (
                            <Badge className="text-xs bg-emerald-100 text-emerald-700">
                              乗り越え済
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-slate-800 mb-1">
                          「{h.title}」
                        </p>
                        {h.matchedTags?.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {h.matchedTags.map((tag, i) => (
                              <span key={i} className="text-xs text-purple-600">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <Link to={createPageUrl(`HypothesisDetail?id=${h.id}`)}>
                        <Button variant="ghost" size="sm" className="shrink-0">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-sm">
                <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                まだ類似の仮説が見つかりません<br />
                仮説を公開すると、他の隊員とつながれます
              </div>
            )}

            {/* 先人の学び */}
            {similarHypotheses.some(h => h.status === 'verified') && (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    似たケースからの学び
                  </h4>
                  {!generateLearningsMutation.data && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateLearningsMutation.mutate()}
                      disabled={generateLearningsMutation.isPending}
                      className="text-xs"
                    >
                      {generateLearningsMutation.isPending ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : null}
                      学びを抽出
                    </Button>
                  )}
                </div>

                {generateLearningsMutation.data && (
                  <ul className="space-y-2">
                    {generateLearningsMutation.data.map((learning, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-amber-500">•</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}