import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { Feather, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThoughtInput from '@/components/thought/ThoughtInput';
import HypothesisCard from '@/components/thought/HypothesisCard';

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Feather className="w-6 h-6 text-slate-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-medium text-slate-900 mb-2">
            想いを言葉にする
          </h1>
          <p className="text-sm text-slate-500">
            {step === 'input' && '最近感じている違和感やモヤモヤを教えてください'}
            {step === 'loading' && '仮説を生成しています...'}
            {step === 'hypotheses' && 'あなたの想いから、いくつかの仮説が見えてきました'}
          </p>
        </div>

        {/* Step: Input */}
        {step === 'input' && (
          <ThoughtInput 
            onSubmit={handleSubmitThought}
            isLoading={generateHypothesesMutation.isPending}
          />
        )}

        {/* Step: Loading */}
        {step === 'loading' && (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-4" />
            <p className="text-sm text-slate-500">
              AIが複数の視点から仮説を考えています...
            </p>
          </div>
        )}

        {/* Step: Hypotheses Selection */}
        {step === 'hypotheses' && (
          <div className="space-y-6">
            {/* Original Input Display */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 mb-1">あなたの入力</p>
              <p className="text-sm text-slate-700">{originalInput}</p>
            </div>

            {/* Hypothesis Cards */}
            <div className="grid gap-4">
              {hypotheses.map((hypothesis, index) => (
                <HypothesisCard
                  key={index}
                  hypothesis={hypothesis}
                  isSelected={selectedHypothesis === hypothesis}
                  onSelect={handleSelectHypothesis}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setStep('input');
                  setHypotheses([]);
                  setSelectedHypothesis(null);
                }}
                className="flex-1"
              >
                入力し直す
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={!selectedHypothesis || createHypothesisMutation.isPending}
                className="flex-1 bg-slate-800 hover:bg-slate-900"
              >
                {createHypothesisMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                この仮説を深掘りする
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}