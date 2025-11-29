import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const types = ["連絡", "調整", "準備", "記録"];
const statuses = ["Todo", "Doing", "Done"];
const priorities = ["高", "中", "低"];

export default function ActionForm({ 
  action, 
  people = [],
  projects = [],
  onSubmit, 
  onCancel, 
  isLoading 
}) {
  const [formData, setFormData] = useState({
    content: '',
    type: '連絡',
    status: 'Todo',
    due_date: '',
    person_id: '',
    project_id: '',
    priority: '中',
    weekly_target: false,
  });

  useEffect(() => {
    if (action) {
      setFormData({
        content: action.content || '',
        type: action.type || '連絡',
        status: action.status || 'Todo',
        due_date: action.due_date || '',
        person_id: action.person_id || '',
        project_id: action.project_id || '',
        priority: action.priority || '中',
        weekly_target: action.weekly_target || false,
      });
    }
  }, [action]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (!submitData.person_id) delete submitData.person_id;
    if (!submitData.project_id) delete submitData.project_id;
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="content">内容 <span className="text-red-500">*</span></Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="アクションの内容を入力..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>タイプ</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>ステータス</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>期限</Label>
          <Input
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>優先度</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorities.map(priority => (
                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>関連する人物</Label>
        <Select
          value={formData.person_id}
          onValueChange={(value) => setFormData({ ...formData, person_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>なし</SelectItem>
            {people.map(person => (
              <SelectItem key={person.id} value={person.id}>{person.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>関連するプロジェクト</Label>
        <Select
          value={formData.project_id}
          onValueChange={(value) => setFormData({ ...formData, project_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>なし</SelectItem>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
        <div>
          <Label htmlFor="weekly_target" className="text-sm font-medium">週間目標</Label>
          <p className="text-xs text-slate-500">今週の重要タスクとしてマーク</p>
        </div>
        <Switch
          id="weekly_target"
          checked={formData.weekly_target}
          onCheckedChange={(checked) => setFormData({ ...formData, weekly_target: checked })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || !formData.content.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {action ? '更新' : '作成'}
        </Button>
      </div>
    </form>
  );
}