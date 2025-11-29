import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ArrowRight, Trash2, Inbox } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function ActionMemoInbox({ 
  memos = [], 
  onAddMemo,
  onDeleteMemo,
  onConvertToAction
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddMemo(text);
    setText('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-700">行動メモ</h3>
          <span className="text-xs text-slate-400">（思いついたことを書き留める）</span>
        </div>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="text-slate-500 hover:text-slate-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            追加
          </Button>
        )}
      </div>

      {/* 入力エリア */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="次にやってみたいこと、試したいアイデアを書いてください..."
                className="min-h-[80px] text-base leading-relaxed resize-none border-0 bg-transparent focus-visible:ring-0 p-0"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setIsAdding(false);
                    setText('');
                  }}
                >
                  キャンセル
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAdd}
                  disabled={!text.trim()}
                  className="bg-slate-800 hover:bg-slate-900"
                >
                  メモを追加
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* メモリスト */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {memos.map((memo) => (
            <motion.div
              key={memo.id}
              layoutId={`memo-${memo.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card className="border-slate-100 shadow-none hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-base leading-relaxed text-slate-700">
                        {memo.content}
                      </p>
                      {memo.created_at && (
                        <p className="text-xs text-slate-400 mt-2">
                          {format(parseISO(memo.created_at), 'M月d日 H:mm')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onConvertToAction(memo.id)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <ArrowRight className="w-3.5 h-3.5 mr-1.5" />
                        アクション化
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onDeleteMemo(memo.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {memos.length === 0 && !isAdding && (
          <div className="text-center py-8 text-slate-400 text-sm">
            まだメモがありません
          </div>
        )}
      </div>
    </div>
  );
}