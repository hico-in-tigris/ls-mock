import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThoughtInput - 想いを入力するコンポーネント
 * LocalSuccess UIガイドライン v0.1 準拠
 * LSCard構造: タイトル・本文・CTAの順序
 */
export default function ThoughtInput({ onSubmit, isLoading }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim() || isLoading) return;
    onSubmit(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="border-ls-border shadow-sm">
      <CardContent className="p-4">
        <div className="relative">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="最近感じた違和感や、モヤモヤを書いてください"
            className={cn(
              "min-h-[120px] pr-14 text-sm leading-relaxed resize-none",
              "border-ls-border focus:border-ls-primary focus:ring-ls-primary/20",
              "placeholder:text-ls-text-light bg-ls-surface",
              "text-ls-text"
            )}
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading}
            className={cn(
              "absolute bottom-3 right-3",
              "bg-ls-primary hover:bg-ls-primary-light text-white",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              "w-9 h-9"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-ls-text-light mt-3 text-center">
          Cmd + Enter で送信
        </p>
      </CardContent>
    </Card>
  );
}
