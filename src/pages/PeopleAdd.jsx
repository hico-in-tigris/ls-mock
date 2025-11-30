import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { UserPlus, X, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ROLES, STAGES } from '@/lib/people/types';
import { cn } from "@/lib/utils";

/**
 * PeopleAdd - 関係者を追加するページ
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleAdd() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    role: '住民',
    stage: '気づき',
    area: '',
    skills: [],
    interests: [],
    notes: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const createPersonMutation = useMutation({
    mutationFn: async (data) => {
      return await base44.entities.Person.create({
        name: data.name,
        role: data.role,
        skills: data.skills,
        values: data.interests, // APIはvaluesフィールドを使用
        description: data.notes,
        lastContactAt: null,
        projects: [],
        hypotheses: [],
        interactions: [],
        contact: {
          email: '',
          phone: '',
          sns: { twitter: null, instagram: null }
        }
      });
    },
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      toast.success('関係者を追加しました');
      navigate(`/people/${created.id}`);
    },
    onError: (error) => {
      toast.error('追加に失敗しました');
      console.error(error);
    }
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(i => i !== interest)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('名前を入力してください');
      return;
    }
    createPersonMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">関係者を追加</h1>
              <p className="text-sm text-ls-text-light mt-1">
                新しい仲間・協力者の情報を登録します
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card className="border-ls-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-ls-text">基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    名前 <span className="text-ls-danger">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="山田 太郎"
                    required
                    className="border-ls-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>役割</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger className="border-ls-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>思考ステージ</Label>
                    <Select
                      value={formData.stage}
                      onValueChange={(value) => setFormData({ ...formData, stage: value })}
                    >
                      <SelectTrigger className="border-ls-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STAGES.map(stage => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">地域</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="例: 北海道 喜茂別町"
                    className="border-ls-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* スキル */}
            <Card className="border-ls-border shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-ls-text">スキル</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="rounded-full px-2.5 py-0.5 border-ls-border"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1.5 hover:bg-ls-border rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="スキルを入力..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="border-ls-border"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSkill}
                    size="icon"
                    className="bg-ls-primary hover:bg-ls-primary-light text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 関心領域 */}
            <Card className="border-ls-border shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-ls-text">関心領域</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="rounded-full px-2.5 py-0.5 bg-ls-bg border-ls-border"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1.5 hover:bg-ls-border rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="関心領域を入力..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                    className="border-ls-border"
                  />
                  <Button
                    type="button"
                    onClick={handleAddInterest}
                    size="icon"
                    className="bg-ls-primary hover:bg-ls-primary-light text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* メモ */}
            <Card className="border-ls-border shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-ls-text">メモ</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="気づきやメモを記録..."
                  rows={4}
                  className="border-ls-border"
                />
              </CardContent>
            </Card>

            {/* アクションボタン */}
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/people')}
                className="flex-1 border-ls-border text-ls-text hover:bg-ls-bg"
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={!formData.name.trim() || createPersonMutation.isPending}
                className="flex-1 bg-ls-primary hover:bg-ls-primary-light text-white"
              >
                {createPersonMutation.isPending ? '保存中...' : '追加する'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

