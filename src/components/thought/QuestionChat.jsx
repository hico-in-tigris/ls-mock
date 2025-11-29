import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageCircle, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuestionChat({ 
  questions = [], 
  onAnswerSubmit,
  isLoading 
}) {
  const [answers, setAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questions]);

  const handleSubmitAnswer = (index) => {
    const answer = answers[index];
    if (!answer?.trim()) return;
    
    onAnswerSubmit(index, answer);
    setActiveQuestion(null);
  };

  const getUnansweredCount = () => {
    return questions.filter(q => !q.answer).length;
  };

  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <div key={index} className="space-y-3">
          {/* Question */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 leading-relaxed">
                {item.question}
              </p>
            </div>
          </div>

          {/* Answer or Input */}
          {item.answer ? (
            <div className="flex gap-3 ml-11">
              <Card className="flex-1 bg-slate-50 border-slate-100">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {item.answer}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                    <Check className="w-3 h-3" />
                    回答済み
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="ml-11">
              {activeQuestion === index ? (
                <div className="space-y-2">
                  <Textarea
                    value={answers[index] || ''}
                    onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                    placeholder="考えを書いてください..."
                    className="min-h-[80px] text-sm resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveQuestion(null)}
                    >
                      キャンセル
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleSubmitAnswer(index)}
                      disabled={!answers[index]?.trim() || isLoading}
                      className="bg-slate-800 hover:bg-slate-900"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          回答する
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveQuestion(index)}
                  className="text-slate-600"
                >
                  この問いに答える
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
      
      {questions.length > 0 && getUnansweredCount() === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-slate-500">
            すべての問いに回答しました
          </p>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}