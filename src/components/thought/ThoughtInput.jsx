import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="最近感じた違和感や、モヤモヤを書いてください"
          className={cn(
            "min-h-[120px] pr-14 text-base leading-relaxed resize-none",
            "border-slate-200 focus:border-slate-300 focus:ring-slate-200",
            "placeholder:text-slate-400"
          )}
          disabled={isLoading}
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
          className={cn(
            "absolute bottom-3 right-3",
            "bg-slate-800 hover:bg-slate-900",
            "disabled:opacity-30"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">
        Cmd + Enter で送信
      </p>
    </div>
  );
}