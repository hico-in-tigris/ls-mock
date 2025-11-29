import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Trash2, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export default function ActionMemoInput({ 
  memos = [], 
  onAddMemo,
  onDeleteMemo,
  onConvertToAction,
  onAddResult
}) {
  const [resultInputIndex, setResultInputIndex] = useState(null);
  const [resultText, setResultText] = useState('');
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddMemo(text);
    setText('');
    setIsAdding(false);
  };

  const handleAddResult = (index) => {
    if (!resultText.trim()) return;
    onAddResult(index, resultText);
    setResultText('');
    setResultInputIndex(null);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          行動メモ
        </CardTitle>
        <p className="text-xs text-slate-500">
          問いへの回答から浮かんだ小さな行動を書き留めましょう
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {memos.map((memo, index) => (
          <div 
            key={index}
            className={cn(
              "p-3 rounded-lg border",
              memo.converted_to_action 
                ? "bg-emerald-50/50 border-emerald-100" 
                : "bg-amber-50/50 border-amber-100"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {memo.converted_to_action ? (
                    <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      アクション化済
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                      <Clock className="w-3 h-3 mr-1" />
                      メモ
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-700">{memo.content}</p>
                {memo.created_at && (
                  <p className="text-xs text-slate-400 mt-1">
                    {format(parseISO(memo.created_at), 'M/d H:mm')}
                  </p>
                )}
                
                {/* 検証結果 */}
                {memo.result && (
                  <div className="mt-2 p-2 rounded bg-white border border-slate-100">
                    <p className="text-xs text-slate-400 mb-0.5">検証結果</p>
                    <p className="text-sm text-slate-600">{memo.result}</p>
                    {memo.result_at && (
                      <p className="text-xs text-slate-400 mt-1">
                        {format(parseISO(memo.result_at), 'M/d H:mm')}
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-1 shrink-0">
                {!memo.converted_to_action && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onConvertToAction(index)}
                    title="アクションに変換"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-50 hover:opacity-100"
                  onClick={() => onDeleteMemo(index)}
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </div>
            </div>

            {/* 検証結果入力 */}
            {memo.converted_to_action && !memo.result && (
              resultInputIndex === index ? (
                <div className="mt-3 space-y-2">
                  <Textarea
                    value={resultText}
                    onChange={(e) => setResultText(e.target.value)}
                    placeholder="検証してわかったことを書いてください..."
                    className="min-h-[60px] text-sm resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setResultInputIndex(null);
                        setResultText('');
                      }}
                    >
                      キャンセル
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleAddResult(index)}
                      disabled={!resultText.trim()}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      結果を記録
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setResultInputIndex(index)}
                  className="mt-3 w-full border-dashed text-emerald-600 hover:text-emerald-700"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  検証結果を記録
                </Button>
              )
            )}
          </div>
        ))}

        {isAdding ? (
          <div className="space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="例: 明日の朝、〇〇さんに声をかけてみる"
              className="min-h-[60px] text-sm resize-none"
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
                className="bg-amber-500 hover:bg-amber-600"
              >
                追加
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            行動メモを追加
          </Button>
        )}
      </CardContent>
    </Card>
  );
}