import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileCheck, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function VerificationLog({ 
  logs = [], 
  onAddLog,
  onDeleteLog
}) {
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddLog(text);
    setText('');
    setIsAdding(false);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2 text-slate-800">
          <FileCheck className="w-4 h-4 text-emerald-500" />
          検証ログ
        </CardTitle>
        <p className="text-xs text-slate-500">
          検証したこと、わかったことを短くメモしましょう
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {logs.map((log, index) => (
          <div 
            key={index}
            className="group flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100"
          >
            <div className="flex-1">
              <p className="text-sm text-slate-700">{log.content}</p>
              {log.created_at && (
                <p className="text-xs text-slate-400 mt-1">
                  {format(parseISO(log.created_at), 'M/d H:mm')}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
              onClick={() => onDeleteLog(index)}
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400" />
            </Button>
          </div>
        ))}

        {isAdding ? (
          <div className="space-y-2">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="例: 〇〇さんに聞いたら、△△だということがわかった"
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
                className="bg-emerald-500 hover:bg-emerald-600"
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
            検証ログを追加
          </Button>
        )}
      </CardContent>
    </Card>
  );
}