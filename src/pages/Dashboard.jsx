import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { format, isToday, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';
import { 
  CheckCircle2, 
  Users, 
  Folder, 
  TrendingUp,
  Sparkles,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatsCard from '@/components/ui/StatsCard';
import TodayActions from '@/components/dashboard/TodayActions';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import RecentContacts from '@/components/dashboard/RecentContacts';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [showAddAction, setShowAddAction] = useState(false);
  const [newAction, setNewAction] = useState({ content: '', type: '連絡', status: 'Todo' });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: actions = [] } = useQuery({
    queryKey: ['actions'],
    queryFn: () => base44.entities.Action.list('-created_date'),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-updated_date'),
  });

  const { data: people = [] } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-last_contact'),
  });

  const createActionMutation = useMutation({
    mutationFn: (data) => base44.entities.Action.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      setShowAddAction(false);
      setNewAction({ content: '', type: '連絡', status: 'Todo' });
    },
  });

  const updateActionMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Action.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
    },
  });

  const todayActions = actions.filter(a => {
    if (a.due_date && isToday(parseISO(a.due_date))) return true;
    if (a.status === 'Todo' || a.status === 'Doing') return true;
    if (a.status === 'Done' && a.completed_at && isToday(parseISO(a.completed_at))) return true;
    return false;
  });

  const handleToggleStatus = (action) => {
    const newStatus = action.status === 'Done' ? 'Todo' : 'Done';
    updateActionMutation.mutate({
      id: action.id,
      data: { 
        status: newStatus,
        completed_at: newStatus === 'Done' ? new Date().toISOString() : null
      }
    });
  };

  const handleContactAction = (person) => {
    setNewAction({
      content: `${person.name}さんに連絡する`,
      type: '連絡',
      status: 'Todo',
      person_id: person.id
    });
    setShowAddAction(true);
  };

  const handleCreateAction = () => {
    if (!newAction.content.trim()) return;
    createActionMutation.mutate({
      ...newAction,
      due_date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  const completedToday = actions.filter(a => 
    a.status === 'Done' && a.completed_at && isToday(parseISO(a.completed_at))
  ).length;

  const activeProjects = projects.filter(p => p.status !== 'Done').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                おかえりなさい、{user?.full_name || 'ゲスト'}さん
              </h1>
              <p className="text-sm text-slate-500">
                {format(new Date(), 'yyyy年M月d日（E）', { locale: ja })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="今日の完了"
            value={completedToday}
            icon={CheckCircle2}
            iconClassName="bg-emerald-50"
            trendLabel="タスク"
          />
          <StatsCard
            title="進行中プロジェクト"
            value={activeProjects}
            icon={Folder}
            iconClassName="bg-indigo-50"
          />
          <StatsCard
            title="関係者"
            value={people.length}
            icon={Users}
            iconClassName="bg-amber-50"
          />
          <StatsCard
            title="今週の達成率"
            value={`${Math.round((completedToday / Math.max(todayActions.length, 1)) * 100)}%`}
            icon={TrendingUp}
            iconClassName="bg-blue-50"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodayActions 
              actions={todayActions}
              onToggleStatus={handleToggleStatus}
              onAddAction={() => setShowAddAction(true)}
              people={people}
              projects={projects}
            />
          </div>
          <div className="space-y-6">
            <ProjectProgress projects={projects} />
            <RecentContacts 
              people={people} 
              onContactAction={handleContactAction}
            />
          </div>
        </div>
      </div>

      {/* Add Action Dialog */}
      <Dialog open={showAddAction} onOpenChange={setShowAddAction}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>アクションを追加</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>内容</Label>
              <Input
                placeholder="例: 田中さんに電話する"
                value={newAction.content}
                onChange={(e) => setNewAction({ ...newAction, content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>タイプ</Label>
              <Select
                value={newAction.type}
                onValueChange={(value) => setNewAction({ ...newAction, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="連絡">連絡</SelectItem>
                  <SelectItem value="調整">調整</SelectItem>
                  <SelectItem value="準備">準備</SelectItem>
                  <SelectItem value="記録">記録</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAction(false)}>
              キャンセル
            </Button>
            <Button 
              onClick={handleCreateAction}
              disabled={!newAction.content.trim() || createActionMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}