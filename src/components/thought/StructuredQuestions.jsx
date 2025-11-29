import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Users, 
  MapPin, 
  Eye,
  Lightbulb,
  Check,
  ArrowRight,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const sectionConfig = {
  target: {
    key: 'target',
    label: 'ターゲット',
    description: '誰の課題かを深掘る',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100'
  },
  background: {
    key: 'background',
    label: '背景',
    description: 'なぜこの問題が起きているか',
    icon: MapPin,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100'
  },
  perspective: {
    key: 'perspective',
    label: '検証の切り口',
    description: 'どう確かめるか',
    icon: Eye,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  }
};

function QuestionItem({ 
  question, 
  answer, 
  insight,
  onAnswerChange, 
  onInsightChange,
  onConvertInsight,
  isLoading 
}) {
  const [showInsight, setShowInsight] = useState(!!insight);
  
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <p className="text-base leading-relaxed text-slate-800 mb-3">
        {question}
      </p>
      
      <Textarea
        value={answer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="あなたの考えを書いてください..."
        className="min-h-[80px] text-base leading-relaxed resize-none mb-2"
        disabled={isLoading}
      />
      
      {/* 気づきメモ */}
      <AnimatePresence>
        {showInsight ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-700">気づきメモ</span>
            </div>
            <Textarea
              value={insight || ''}
              onChange={(e) => onInsightChange(e.target.value)}
              placeholder="この問いから気づいたこと、試したいアイデアがあれば..."
              className="min-h-[60px] text-sm leading-relaxed resize-none bg-white"
              disabled={isLoading}
            />
            {insight && insight.trim() && (
              <div className="flex justify-end mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConvertInsight(insight)}
                  className="text-amber-700 border-amber-200 hover:bg-amber-100"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-1.5" />
                  行動メモへ昇格
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInsight(true)}
            className="text-slate-400 hover:text-amber-600 mt-1"
          >
            <Lightbulb className="w-4 h-4 mr-1.5" />
            気づきを書く
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestionSection({ 
  section, 
  hypothesisValue,
  questions = [], 
  onQuestionUpdate,
  onConvertInsight,
  isLoading,
  isGenerating 
}) {
  const [isOpen, setIsOpen] = useState(true);
  const config = sectionConfig[section];
  const Icon = config.icon;
  
  const answeredCount = questions.filter(q => q.answer && q.answer.trim()).length;
  const totalCount = questions.length;
  const isComplete = answeredCount === totalCount && totalCount > 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className={cn(
          "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all",
          config.bgColor,
          "hover:shadow-sm"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-white shadow-sm"
            )}>
              <Icon className={cn("w-5 h-5", config.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-slate-800">{config.label}</h3>
                {isComplete && (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                    <Check className="w-3 h-3 mr-1" />
                    完了
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{config.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <span className="text-xs text-slate-400">
                {answeredCount}/{totalCount}
              </span>
            )}
            <ChevronDown className={cn(
              "w-5 h-5 text-slate-400 transition-transform",
              isOpen && "rotate-180"
            )} />
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className={cn(
          "mt-2 p-4 rounded-xl border",
          config.borderColor,
          "bg-white"
        )}>
          {/* 仮説の該当部分を表示 */}
          {hypothesisValue && (
            <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 mb-1">{config.label}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{hypothesisValue}</p>
            </div>
          )}
          
          {isGenerating ? (
            <div className="text-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">問いを生成中...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              問いがまだありません
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {questions.map((q, index) => (
                <QuestionItem
                  key={index}
                  question={q.question}
                  answer={q.answer}
                  insight={q.insight}
                  onAnswerChange={(value) => onQuestionUpdate(section, index, 'answer', value)}
                  onInsightChange={(value) => onQuestionUpdate(section, index, 'insight', value)}
                  onConvertInsight={onConvertInsight}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function StructuredQuestions({
  hypothesis,
  structuredQuestions = {},
  onQuestionUpdate,
  onConvertInsight,
  onGenerateQuestions,
  isLoading,
  isGenerating
}) {
  const sections = ['target', 'background', 'perspective'];
  const hasAnyQuestions = sections.some(s => 
    structuredQuestions[s] && structuredQuestions[s].length > 0
  );

  return (
    <div className="space-y-4">
      {!hasAnyQuestions && !isGenerating && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 mb-4">
            仮説の構造に沿って、思考を深める問いを生成します
          </p>
          <Button
            onClick={onGenerateQuestions}
            disabled={isGenerating}
            className="bg-slate-800 hover:bg-slate-900"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                生成中...
              </>
            ) : (
              '問いを生成する'
            )}
          </Button>
        </div>
      )}

      {(hasAnyQuestions || isGenerating) && (
        <div className="space-y-3">
          {sections.map((section) => (
            <QuestionSection
              key={section}
              section={section}
              hypothesisValue={hypothesis[section]}
              questions={structuredQuestions[section] || []}
              onQuestionUpdate={onQuestionUpdate}
              onConvertInsight={onConvertInsight}
              isLoading={isLoading}
              isGenerating={isGenerating}
            />
          ))}
        </div>
      )}

      {hasAnyQuestions && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onGenerateQuestions}
            disabled={isGenerating}
            className="text-slate-500"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            問いを再生成
          </Button>
        </div>
      )}
    </div>
  );
}