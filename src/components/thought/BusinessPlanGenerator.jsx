import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Loader2, 
  Copy, 
  Check,
  ChevronDown,
  Sparkles
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

export default function BusinessPlanGenerator({ 
  hypothesis, 
  onGenerate, 
  isGenerating,
  generatedPlan 
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!generatedPlan) return;
    await navigator.clipboard.writeText(generatedPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasEnoughData = () => {
    const hasQuestions = hypothesis.structured_questions && 
      Object.values(hypothesis.structured_questions).some(arr => 
        arr?.some(q => q.answer?.trim())
      );
    const hasActions = hypothesis.actions?.length > 0;
    return hasQuestions || hasActions;
  };

  return (
    <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-base">事業計画ドラフト</CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    仮説と検証結果から自動生成
                  </p>
                </div>
              </div>
              <ChevronDown className={cn(
                "w-5 h-5 text-slate-400 transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <Separator className="mb-4" />

            {!generatedPlan ? (
              <div className="text-center py-8">
                {!hasEnoughData() ? (
                  <>
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 mb-2">
                      事業計画を生成するには、まず問いに回答したり<br />
                      アクションを実行してください
                    </p>
                    <p className="text-xs text-slate-400">
                      検証データが増えるほど、精度の高い計画が生成されます
                    </p>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-10 h-10 text-indigo-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-4">
                      仮説・回答・検証ログを元に<br />
                      事業計画のドラフトを生成します
                    </p>
                    <Button
                      onClick={onGenerate}
                      disabled={isGenerating}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          事業計画を生成
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onGenerate}
                      disabled={isGenerating}
                      className="text-slate-600"
                    >
                      {isGenerating ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-1.5" />
                      )}
                      再生成
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="text-slate-600"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1.5 text-emerald-500" />
                          コピー済み
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1.5" />
                          コピー
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Generated Plan */}
                  <div className="p-5 rounded-xl bg-white border border-slate-100 prose prose-sm prose-slate max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold text-slate-900 mt-0 mb-3">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-slate-800 mt-6 mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-medium text-slate-700 mt-4 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="text-sm leading-relaxed text-slate-600 my-2">{children}</p>,
                        ul: ({ children }) => <ul className="my-2 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="text-sm text-slate-600">{children}</li>,
                      }}
                    >
                      {generatedPlan}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}