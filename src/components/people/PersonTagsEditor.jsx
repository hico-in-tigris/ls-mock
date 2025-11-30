import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * PersonTagsEditor - 人物のスキル・関心タグ編集Drawer
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PersonTagsEditor({ 
  person, 
  open, 
  onOpenChange 
}) {
  const queryClient = useQueryClient();
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    if (person) {
      setSkills(person.skills || []);
      setInterests(person.values || person.interests || []);
    }
  }, [person, open]);

  const updatePersonMutation = useMutation({
    mutationFn: async (data) => {
      return await base44.entities.Person.update(person.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person', person.id] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      toast.success('タグを更新しました');
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error('更新に失敗しました');
      console.error(error);
    }
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSave = () => {
    updatePersonMutation.mutate({
      skills,
      values: interests // 既存のAPIはvaluesフィールドを使用
    });
  };

  if (!person) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] border-ls-border">
        <DrawerHeader className="border-b border-ls-border">
          <DrawerTitle className="text-ls-text">スキル・関心タグを編集</DrawerTitle>
        </DrawerHeader>
        
        <div className="overflow-y-auto p-4 space-y-6">
          {/* スキルセクション */}
          <div>
            <Label className="text-sm font-medium text-ls-text mb-3 block">スキル</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="rounded-full px-2.5 py-0.5 border-ls-border"
                >
                  {skill}
                  <button
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
                onClick={handleAddSkill}
                size="icon"
                className="bg-ls-primary hover:bg-ls-primary-light text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator className="bg-ls-border" />

          {/* 関心セクション */}
          <div>
            <Label className="text-sm font-medium text-ls-text mb-3 block">関心領域</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-full px-2.5 py-0.5 bg-ls-bg border-ls-border"
                >
                  {interest}
                  <button
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
                onClick={handleAddInterest}
                size="icon"
                className="bg-ls-primary hover:bg-ls-primary-light text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-ls-border">
          <div className="flex gap-3">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="flex-1 border-ls-border text-ls-text hover:bg-ls-bg"
              >
                キャンセル
              </Button>
            </DrawerClose>
            <Button
              onClick={handleSave}
              disabled={updatePersonMutation.isPending}
              className="flex-1 bg-ls-primary hover:bg-ls-primary-light text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {updatePersonMutation.isPending ? '保存中...' : '保存'}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

