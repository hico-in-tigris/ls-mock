import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass, Lightbulb, Loader2 } from "lucide-react";

export default function NextActionPrompt({ 
  promptQuestion,
  isGenerating,
  onSaveActionMemo,
  isSaving
}) {
  const [actionText, setActionText] = useState('');

  const handleSave = () => {
    if (!actionText.trim()) return;
    onSaveActionMemo(actionText);
    setActionText('');
  };

  if (isGenerating) {
    return (
      <Card className="border-slate-100 shadow-none bg-slate-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!promptQuestion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="border-slate-100 shadow-none bg-gradient-to-br from-amber-50/30 to-orange-50/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800">
            <Compass className="w-4 h-4 text-amber-600" />
            次にどうする？
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI からの問いかけ */}
          <div className="p-4 rounded-lg bg-white/80 border border-amber-100/50">
            <p className="text-base leading-relaxed text-slate-700">
              {promptQuestion}
            </p>
          </div>

          {/* ユーザー入力エリア */}
          <div className="space-y-3">
            <Textarea
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="あなたの次の一歩を書いてみてください..."
              className="min-h-[100px] text-base leading-relaxed resize-none bg-white"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={!actionText.trim() || isSaving}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                ) : (
                  <Lightbulb className="w-4 h-4 mr-1.5" />
                )}
                行動メモとして保存
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center pt-2">
            保存した行動メモは、後でアクションに変換できます
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}