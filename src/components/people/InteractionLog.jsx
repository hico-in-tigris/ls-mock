import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";
import { Plus, MessageSquare } from "lucide-react";

const interactionTypes = [
  { value: 'meet', label: '面会' },
  { value: 'call', label: '電話' },
  { value: 'dm', label: 'DM' },
  { value: 'event', label: 'イベント' },
  { value: 'project', label: 'プロジェクト' }
];

/**
 * 接触履歴コンポーネント
 * @param {array} interactions - 接触履歴の配列
 * @param {function} onCreateInteraction - 接触記録作成ハンドラー
 * @param {boolean} isPending - mutationのpending状態
 */
export default function InteractionLog({ interactions, onCreateInteraction, isPending }) {
  const [showDialog, setShowDialog] = useState(false);
  const [form, setForm] = useState({ type: 'meet', note: '' });

  const handleSubmit = () => {
    onCreateInteraction(form);
    setForm({ type: 'meet', note: '' });
    setShowDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              接触履歴
            </CardTitle>
            <Button
              size="sm"
              onClick={() => setShowDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              接触を記録
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {interactions.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  接触履歴がありません
                </p>
              ) : (
                interactions.map(interaction => (
                  <div key={interaction.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">
                        {interactionTypes.find(t => t.value === interaction.type)?.label || interaction.type}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {format(parseISO(interaction.timestamp), 'yyyy年M月d日 HH:mm')}
                      </span>
                    </div>
                    {interaction.note && (
                      <p className="text-sm text-slate-600">{interaction.note}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Interaction Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>接触を記録</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>種類</Label>
              <Select
                value={form.type}
                onValueChange={(value) => setForm({ ...form, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interactionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>メモ</Label>
              <Textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="接触内容を記録..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                キャンセル
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending}
              >
                {isPending ? '保存中...' : '保存'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

