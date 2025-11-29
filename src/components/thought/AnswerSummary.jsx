import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Check, Pencil, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnswerSummary({ 
  summary,
  isGenerating,
  onConfirm,
  onAddClarification,
  isConfirmed
}) {
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationText, setClarificationText] = useState('');

  const handleAddClarification = () => {
    if (!clarificationText.trim()) return;
    onAddClarification(clarificationText);
    setClarificationText('');
    setShowClarification(false);
  };

  if (isGenerating) {
    return (
      <Card className="border-slate-100 shadow-none bg-slate-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-5 w-40" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "border-slate-100 shadow-none transition-all",
        isConfirmed ? "bg-emerald-50/30 border-emerald-100" : "bg-slate-50/50"
      )}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800">
            <MessageSquare className="w-4 h-4 text-slate-500" />
            AIの理解（サマリー）
            {isConfirmed && (
              <span className="ml-auto text-xs text-emerald-600 flex items-center gap-1">
                <Check className="w-3 h-3" />
                確認済み
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base leading-relaxed text-slate-700">
            {summary}
          </p>

          {!isConfirmed && (
            <>
              <AnimatePresence>
                {showClarification && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-white border border-slate-100 space-y-3">
                      <p className="text-sm text-slate-500">
                        補足や修正したい点があれば教えてください
                      </p>
                      <Textarea
                        value={clarificationText}
                        onChange={(e) => setClarificationText(e.target.value)}
                        placeholder="例：〇〇の部分は少し違っていて、実際は..."
                        className="min-h-[80px] text-sm leading-relaxed resize-none"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setShowClarification(false);
                            setClarificationText('');
                          }}
                        >
                          キャンセル
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleAddClarification}
                          disabled={!clarificationText.trim()}
                          className="bg-slate-800 hover:bg-slate-900"
                        >
                          補足を追加
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showClarification && (
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClarification(true)}
                    className="text-slate-600"
                  >
                    <Pencil className="w-3.5 h-3.5 mr-1.5" />
                    修正・補足
                  </Button>
                  <Button
                    size="sm"
                    onClick={onConfirm}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    この理解でOK
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}