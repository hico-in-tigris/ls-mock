import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Plus, 
  Clock, 
  Play, 
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

const statusConfig = {
  not_started: { 
    label: '未開始', 
    icon: Clock, 
    color: 'bg-slate-100 text-slate-600' 
  },
  running: { 
    label: '検証中', 
    icon: Play, 
    color: 'bg-amber-100 text-amber-700' 
  },
  done: { 
    label: '完了', 
    icon: CheckCircle2, 
    color: 'bg-emerald-100 text-emerald-700' 
  }
};

export default function ActionCard({ 
  action, 
  onStatusChange,
  onAddVerification 
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [logText, setLogText] = useState('');

  const status = statusConfig[action.status] || statusConfig.running;
  const StatusIcon = status.icon;
  const verifications = action.verifications || [];

  const handleAddLog = () => {
    if (!logText.trim()) return;
    onAddVerification(action.id, logText);
    setLogText('');
    setIsAddingLog(false);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(action.id, newStatus);
  };

  return (
    <motion.div
      layoutId={`action-${action.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-slate-100 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-base leading-relaxed text-slate-800 font-medium">
                {action.content}
              </p>
              {action.created_at && (
                <p className="text-xs text-slate-400 mt-1">
                  {format(parseISO(action.created_at), 'M月d日')} にアクション化
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge 
                variant="secondary" 
                className={cn("cursor-pointer", status.color)}
                onClick={() => {
                  const statuses = ['not_started', 'running', 'done'];
                  const currentIndex = statuses.indexOf(action.status);
                  const nextIndex = (currentIndex + 1) % statuses.length;
                  handleStatusChange(statuses[nextIndex]);
                }}
              >
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Separator className="mb-3" />
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-500 -ml-2">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  検証ログ
                  {verifications.length > 0 && (
                    <span className="ml-1.5 text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                      {verifications.length}
                    </span>
                  )}
                  <ChevronDown className={cn(
                    "w-4 h-4 ml-1 transition-transform",
                    isOpen && "rotate-180"
                  )} />
                </Button>
              </CollapsibleTrigger>
              
              {!isAddingLog && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingLog(true)}
                  className="text-slate-500"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  ログを追加
                </Button>
              )}
            </div>

            <CollapsibleContent>
              <div className="mt-3 space-y-3">
                {/* ログ入力 */}
                <AnimatePresence>
                  {isAddingLog && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 rounded-lg bg-slate-50 space-y-3">
                        <Textarea
                          value={logText}
                          onChange={(e) => setLogText(e.target.value)}
                          placeholder="検証してわかったこと、気づいたことを記録..."
                          className="min-h-[80px] text-sm leading-relaxed resize-none"
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setIsAddingLog(false);
                              setLogText('');
                            }}
                          >
                            キャンセル
                          </Button>
                          <Button 
                            size="sm"
                            onClick={handleAddLog}
                            disabled={!logText.trim()}
                            className="bg-emerald-500 hover:bg-emerald-600"
                          >
                            記録する
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ログリスト */}
                {verifications.length > 0 ? (
                  <div className="space-y-2">
                    {[...verifications].reverse().map((log, index) => (
                      <motion.div
                        key={log.id || index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 rounded-lg bg-white border border-slate-100"
                      >
                        <p className="text-sm leading-relaxed text-slate-700">
                          {log.content}
                        </p>
                        {log.created_at && (
                          <p className="text-xs text-slate-400 mt-2">
                            {format(parseISO(log.created_at), 'M月d日 H:mm')}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : !isAddingLog && (
                  <div className="text-center py-4 text-slate-400 text-sm">
                    まだ検証ログがありません
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </motion.div>
  );
}