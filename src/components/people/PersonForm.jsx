import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

const roles = ["住民", "行政", "事業者", "NPO", "専門家", "その他"];
const levels = ["高", "中", "低"];

export default function PersonForm({ person, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '住民',
    tags: [],
    last_contact: '',
    notes: '',
    contact_info: '',
    influence_level: '中',
    interest_level: '中',
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || '',
        role: person.role || '住民',
        tags: person.tags || [],
        last_contact: person.last_contact || '',
        notes: person.notes || '',
        contact_info: person.contact_info || '',
        influence_level: person.influence_level || '中',
        interest_level: person.interest_level || '中',
      });
    }
  }, [person]);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">名前 <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="山田 太郎"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>役割</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>最終接触日</Label>
          <Input
            type="date"
            value={formData.last_contact}
            onChange={(e) => setFormData({ ...formData, last_contact: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>タグ</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="タグを追加"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={handleAddTag}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="gap-1 pr-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:bg-slate-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>影響度</Label>
          <Select
            value={formData.influence_level}
            onValueChange={(value) => setFormData({ ...formData, influence_level: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>関心度</Label>
          <Select
            value={formData.interest_level}
            onValueChange={(value) => setFormData({ ...formData, interest_level: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>連絡先</Label>
        <Input
          value={formData.contact_info}
          onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
          placeholder="電話番号、メールアドレスなど"
        />
      </div>

      <div className="space-y-2">
        <Label>メモ</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="この人物に関するメモ..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || !formData.name.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {person ? '更新' : '追加'}
        </Button>
      </div>
    </form>
  );
}