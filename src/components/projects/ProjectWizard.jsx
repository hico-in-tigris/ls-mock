import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Layout, 
  Target, 
  Users, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: 1, name: '想いの整理', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 2, name: '企画構成', icon: Layout, color: 'from-blue-500 to-indigo-500' },
  { id: 3, name: '目標設定', icon: Target, color: 'from-amber-500 to-orange-500' },
  { id: 4, name: '関係者分析', icon: Users, color: 'from-emerald-500 to-teal-500' },
  { id: 5, name: '提案作成', icon: FileText, color: 'from-purple-500 to-violet-500' }
];

export default function ProjectWizard({ project, onUpdate, onClose }) {
  const [currentStage, setCurrentStage] = useState(project?.wizard_stage || 1);
  const [formData, setFormData] = useState({
    ideation: project?.ideation || { thoughts: '', challenges: '', target: '', effects: '' },
    planning: project?.planning || { what: '', why: '', who: '', when: '', where: '', how: '' },
    goals: project?.goals || { smart_goal: '', kpis: [], milestones: [] },
    stakeholders: project?.stakeholders || [],
    proposal: project?.proposal || { summary: '', background: '', solution: '', benefits: '', resources: '', timeline: '' }
  });

  const currentStageData = stages.find(s => s.id === currentStage);
  const Icon = currentStageData?.icon || Heart;

  const handleNext = () => {
    if (currentStage < 5) {
      const newStage = currentStage + 1;
      setCurrentStage(newStage);
      onUpdate({ ...formData, wizard_stage: newStage });
    }
  };

  const handlePrev = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSave = () => {
    onUpdate({ ...formData, wizard_stage: currentStage });
    onClose();
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>あなたの想い・アイデア</Label>
              <Textarea
                value={formData.ideation.thoughts}
                onChange={(e) => setFormData({
                  ...formData,
                  ideation: { ...formData.ideation, thoughts: e.target.value }
                })}
                placeholder="この地域でやりたいこと、実現したい未来を自由に書いてください..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>解決したい課題</Label>
              <Textarea
                value={formData.ideation.challenges}
                onChange={(e) => setFormData({
                  ...formData,
                  ideation: { ...formData.ideation, challenges: e.target.value }
                })}
                placeholder="地域が抱える問題、困っている人たち..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>対象となる人々</Label>
              <Input
                value={formData.ideation.target}
                onChange={(e) => setFormData({
                  ...formData,
                  ideation: { ...formData.ideation, target: e.target.value }
                })}
                placeholder="移住希望者、地域の高齢者、若い起業家など..."
              />
            </div>
            <div className="space-y-2">
              <Label>期待される効果</Label>
              <Textarea
                value={formData.ideation.effects}
                onChange={(e) => setFormData({
                  ...formData,
                  ideation: { ...formData.ideation, effects: e.target.value }
                })}
                placeholder="このプロジェクトによって生まれる変化..."
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">5W1Hで企画を構造化しましょう</p>
            {[
              { key: 'what', label: 'What（何を）', placeholder: '具体的に何をするのか' },
              { key: 'why', label: 'Why（なぜ）', placeholder: 'なぜこのプロジェクトが必要なのか' },
              { key: 'who', label: 'Who（誰が）', placeholder: '誰がこのプロジェクトを進めるのか' },
              { key: 'when', label: 'When（いつ）', placeholder: 'いつまでに、どのようなスケジュールで' },
              { key: 'where', label: 'Where（どこで）', placeholder: 'どの場所・範囲で実施するのか' },
              { key: 'how', label: 'How（どのように）', placeholder: 'どのような方法・手段で' }
            ].map(item => (
              <div key={item.key} className="space-y-2">
                <Label>{item.label}</Label>
                <Textarea
                  value={formData.planning[item.key]}
                  onChange={(e) => setFormData({
                    ...formData,
                    planning: { ...formData.planning, [item.key]: e.target.value }
                  })}
                  placeholder={item.placeholder}
                  rows={2}
                />
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>SMART目標</Label>
              <p className="text-xs text-slate-500">具体的・測定可能・達成可能・関連性・期限のある目標を設定</p>
              <Textarea
                value={formData.goals.smart_goal}
                onChange={(e) => setFormData({
                  ...formData,
                  goals: { ...formData.goals, smart_goal: e.target.value }
                })}
                placeholder="例: 2025年12月までに移住相談から定住までの期間を現在の6ヶ月から3ヶ月に短縮する"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>KPI（重要業績評価指標）</Label>
              <Textarea
                value={formData.goals.kpis?.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  goals: { ...formData.goals, kpis: e.target.value.split('\n').filter(k => k.trim()) }
                })}
                placeholder="1行に1つずつKPIを入力&#10;例:&#10;移住相談件数: 月20件&#10;定住率: 80%以上"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>マイルストーン</Label>
              <Textarea
                value={formData.goals.milestones?.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  goals: { ...formData.goals, milestones: e.target.value.split('\n').filter(m => m.trim()) }
                })}
                placeholder="1行に1つずつマイルストーンを入力&#10;例:&#10;1月: ヒアリング完了&#10;3月: プロトタイプ公開"
                rows={4}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">
              プロジェクトに関わる人々を整理しましょう。
              People画面で登録した関係者をここでプロジェクトに紐付けられます。
            </p>
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="text-center text-slate-500">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">関係者分析機能は準備中です</p>
                  <p className="text-xs mt-1">People画面から関係者を管理できます</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">提案書の骨子を作成しましょう</p>
            {[
              { key: 'summary', label: '概要', placeholder: 'プロジェクトの要約（100字程度）', rows: 2 },
              { key: 'background', label: '背景・課題', placeholder: 'なぜこのプロジェクトが必要か', rows: 3 },
              { key: 'solution', label: '解決策', placeholder: '具体的な施策・アプローチ', rows: 3 },
              { key: 'benefits', label: '期待効果', placeholder: '得られる成果・メリット', rows: 3 },
              { key: 'resources', label: '必要なリソース', placeholder: '人員・予算・設備など', rows: 2 },
              { key: 'timeline', label: 'スケジュール', placeholder: '実施計画・マイルストーン', rows: 2 }
            ].map(item => (
              <div key={item.key} className="space-y-2">
                <Label>{item.label}</Label>
                <Textarea
                  value={formData.proposal[item.key]}
                  onChange={(e) => setFormData({
                    ...formData,
                    proposal: { ...formData.proposal, [item.key]: e.target.value }
                  })}
                  placeholder={item.placeholder}
                  rows={item.rows}
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <button
                onClick={() => setCurrentStage(stage.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  currentStage === stage.id
                    ? `bg-gradient-to-br ${stage.color} text-white shadow-lg`
                    : currentStage > stage.id
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {currentStage > stage.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <stage.icon className="w-5 h-5" />
                )}
              </button>
              {index < stages.length - 1 && (
                <div className={cn(
                  "w-8 sm:w-16 h-1 mx-1",
                  currentStage > stage.id ? "bg-emerald-200" : "bg-slate-200"
                )} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">{currentStageData?.name}</h3>
          <p className="text-sm text-slate-500">ステップ {currentStage} / 5</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-1">
        {renderStageContent()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStage === 1}
          className="gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          前へ
        </Button>
        
        <Button
          variant="outline"
          onClick={handleSave}
        >
          保存して閉じる
        </Button>

        {currentStage < 5 ? (
          <Button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 gap-1.5"
          >
            次へ
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            完了
          </Button>
        )}
      </div>
    </div>
  );
}