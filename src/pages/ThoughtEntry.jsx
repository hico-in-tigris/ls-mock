import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { createPageUrl } from '@/utils';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ThoughtInput from '@/components/thought/ThoughtInput';
import HypothesisCard from '@/components/thought/HypothesisCard';

/**
 * ThoughtEntry - 想いを言葉にするページ
 * LocalSuccess UIガイドライン v0.1 準拠
 * LSPageLayout構造: Header → Section → CTA
 */
export default function ThoughtEntry() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState('input'); // input, hypotheses, loading
  const [originalInput, setOriginalInput] = useState('');
  const [hypotheses, setHypotheses] = useState([]);
  const [selectedHypothesis, setSelectedHypothesis] = useState(null);

  const generateHypothesesMutation = useMutation({
    mutationFn: async (input) => {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたは地域おこし協力隊の思考整理を支援するファシリテーターです。

以下のユーザーの想い・違和感・困りごとから、3〜5個の「仮説」を生成してください。

ユーザー入力：
${input}

各仮説は以下の構造で出力してください：
- title: 仮説タイトル（短く端的に）
- target: ターゲット（誰の課題か、具体的に）
- background: 背景（地域文脈など、なぜこの問題が起きているか）
- perspective: 検証すべき切り口（どんな視点で検証すべきか）

仮説は、ユーザーが「なるほど、そういう見方もあるのか」と思えるような、多角的な視点を提供してください。
直接的な解決策ではなく、問題の捉え方のバリエーションを提示してください。`,
        response_json_schema: {
          type: "object",
          properties: {
            hypotheses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  target: { type: "string" },
                  background: { type: "string" },
                  perspective: { type: "string" }
                }
              }
            }
          }
        }
      });
      return response.hypotheses;
    },
    onSuccess: (data) => {
      setHypotheses(data);
      setStep('hypotheses');
    }
  });

  const createHypothesisMutation = useMutation({
    mutationFn: async (hypothesis) => {
      // まず仮説を保存
      const savedHypothesis = await base44.entities.Hypothesis.create({
        ...hypothesis,
        original_input: originalInput,
        status: 'unverified',
        questions: [],
        action_memos: [],
        verification_logs: []
      });

      // ThoughtEntryも保存
      await base44.entities.ThoughtEntry.create({
        content: originalInput,
        generated_hypotheses: hypotheses.map(h => h.title),
        selected_hypothesis_id: savedHypothesis.id
      });

      return savedHypothesis;
    },
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ['hypotheses'] });
      window.location.href = createPageUrl(`HypothesisDetail?id=${saved.id}`);
    }
  });

  const handleSubmitThought = (text) => {
    setOriginalInput(text);
    setStep('loading');
    generateHypothesesMutation.mutate(text);
  };

  const handleSelectHypothesis = (hypothesis) => {
    setSelectedHypothesis(hypothesis);
  };

  const handleConfirmSelection = () => {
    if (!selectedHypothesis) return;
    createHypothesisMutation.mutate(selectedHypothesis);
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">
                想いを言葉にする
              </h1>
            </div>
          </div>
          <p className="text-sm text-ls-text-light ml-[52px]">
            {step === 'input' && '最近感じている違和感やモヤモヤを教えてください'}
            {step === 'loading' && 'AIが複数の視点から仮説を考えています...'}
            {step === 'hypotheses' && 'あなたの想いから、いくつかの仮説が見えてきました'}
          </p>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          {/* Step: Input */}
          {step === 'input' && (
            <div className="mt-6">
              <ThoughtInput 
                onSubmit={handleSubmitThought}
                isLoading={generateHypothesesMutation.isPending}
              />
            </div>
          )}

          {/* Step: Loading */}
          {step === 'loading' && (
            <div className="mt-6">
              <Card className="border-ls-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-ls-text-light mx-auto mb-4" />
                  <p className="text-sm text-ls-text-light">
                    AIが複数の視点から仮説を考えています...
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step: Hypotheses Selection */}
          {step === 'hypotheses' && (
            <div className="space-y-6">
              {/* LSSection: Original Input Display */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-ls-text mb-3">
                  あなたの入力
                </h2>
                <Card className="border-ls-border shadow-sm">
                  <CardContent className="p-4">
                    <p className="text-sm text-ls-text leading-relaxed">
                      {originalInput}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* LSSection: Hypothesis Cards */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-ls-text mb-3">
                  生成された仮説
                </h2>
                <div className="space-y-4">
                  {hypotheses.map((hypothesis, index) => (
                    <HypothesisCard
                      key={index}
                      hypothesis={hypothesis}
                      isSelected={selectedHypothesis === hypothesis}
                      onSelect={handleSelectHypothesis}
                    />
                  ))}
                </div>
              </div>

              {/* LSPageLayout: Footer CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('input');
                    setHypotheses([]);
                    setSelectedHypothesis(null);
                  }}
                  className="flex-1 border-ls-border text-ls-text hover:bg-ls-bg"
                >
                  入力し直す
                </Button>
                <Button
                  onClick={handleConfirmSelection}
                  disabled={!selectedHypothesis || createHypothesisMutation.isPending}
                  className="flex-1 bg-ls-primary hover:bg-ls-primary-light text-white"
                >
                  {createHypothesisMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      保存中...
                    </>
                  ) : (
                    'この仮説を深掘りする'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
