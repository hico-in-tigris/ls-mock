import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smile, 
  Meh, 
  Frown,
  ThumbsUp,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const moods = [
  { id: 'great', icon: Smile, label: '最高', color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
  { id: 'good', icon: Smile, label: '良い', color: 'text-blue-500 bg-blue-50 border-blue-200' },
  { id: 'neutral', icon: Meh, label: '普通', color: 'text-slate-500 bg-slate-50 border-slate-200' },
  { id: 'difficult', icon: Frown, label: '難しかった', color: 'text-amber-500 bg-amber-50 border-amber-200' },
  { id: 'challenging', icon: Frown, label: '大変だった', color: 'text-red-500 bg-red-50 border-red-200' }
];

export default function ReflectionForm({ 
  reflection, 
  doneActions = [],
  onSubmit, 
  onCancel, 
  isLoading 
}) {
  const [formData, setFormData] = useState({
    good_points: '',
    improvements: '',
    learnings: '',
    next_actions: [],
    mood: 'neutral',
    related_action_ids: []
  });
  const [newNextAction, setNewNextAction] = useState('');

  useEffect(() => {
    if (reflection) {
      setFormData({
        good_points: reflection.good_points || '',
        improvements: reflection.improvements || '',
        learnings: reflection.learnings || '',
        next_actions: reflection.next_actions || [],
        mood: reflection.mood || 'neutral',
        related_action_ids: reflection.related_action_ids || []
      });
    }
  }, [reflection]);

  const handleAddNextAction = () => {
    if (newNextAction.trim()) {
      setFormData({
        ...formData,
        next_actions: [...formData.next_actions, newNextAction.trim()]
      });
      setNewNextAction('');
    }
  };

  const handleRemoveNextAction = (index) => {
    setFormData({
      ...formData,
      next_actions: formData.next_actions.filter((_, i) => i !== index)
    });
  };

  const handleToggleRelatedAction = (actionId) => {
    const isSelected = formData.related_action_ids.includes(actionId);
    setFormData({
      ...formData,
      related_action_ids: isSelected
        ? formData.related_action_ids.filter(id => id !== actionId)
        : [...formData.related_action_ids, actionId]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mood Selection */}
      <div className="space-y-3">
        <Label>今日の気分</Label>
        <div className="flex flex-wrap gap-2">
          {moods.map(mood => {
            const Icon = mood.icon;
            const isSelected = formData.mood === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => setFormData({ ...formData, mood: mood.id })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all",
                  isSelected ? mood.color : "border-slate-200 hover:border-slate-300"
                )}
              >
                <Icon className={cn("w-4 h-4", isSelected && mood.color.split(' ')[0])} />
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Related Done Actions */}
      {doneActions.length > 0 && (
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
            今日完了したアクション
          </Label>
          <div className="space-y-2">
            {doneActions.map(action => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleToggleRelatedAction(action.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg border-2 transition-all",
                  formData.related_action_ids.includes(action.id)
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <p className="text-sm font-medium text-slate-900">{action.content}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {action.type}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Good Points */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4 text-emerald-500" />
          良かったこと
        </Label>
        <Textarea
          value={formData.good_points}
          onChange={(e) => setFormData({ ...formData, good_points: e.target.value })}
          placeholder="今日うまくいったこと、達成できたこと..."
          rows={3}
        />
      </div>

      {/* Improvements */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          改善点
        </Label>
        <Textarea
          value={formData.improvements}
          onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
          placeholder="もっとうまくできたこと、反省点..."
          rows={3}
        />
      </div>

      {/* Learnings */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-blue-500" />
          学び
        </Label>
        <Textarea
          value={formData.learnings}
          onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
          placeholder="今日学んだこと、気づき..."
          rows={3}
        />
      </div>

      {/* Next Actions */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-indigo-500" />
          次のアクション
        </Label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newNextAction}
            onChange={(e) => setNewNextAction(e.target.value)}
            placeholder="明日やること..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddNextAction();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={handleAddNextAction}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {formData.next_actions.length > 0 && (
          <div className="space-y-2 mt-3">
            {formData.next_actions.map((action, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
              >
                <span className="text-sm">{action}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveNextAction(index)}
                  className="p-1 hover:bg-slate-200 rounded"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {reflection ? '更新' : '保存'}
        </Button>
      </div>
    </form>
  );
}