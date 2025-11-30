import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { 
  CheckSquare, 
  Plus, 
  Search,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionKanban from '@/components/actions/ActionKanban';
import ActionForm from '@/components/actions/ActionForm';
import EmptyState from '@/components/ui/EmptyState';

export default function Actions() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editAction, setEditAction] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('kanban');

  const { data: actions = [], isLoading } = useQuery({
    queryKey: ['actions'],
    queryFn: () => base44.entities.Action.list('-created_date'),
  });

  const { data: people = [] } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list(),
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Action.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Action.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      setEditAction(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Action.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
      setDeleteConfirm(null);
    },
  });

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.content.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || action.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleStatusChange = (action, newStatus) => {
    updateMutation.mutate({
      id: action.id,
      data: { 
        status: newStatus,
        completed_at: newStatus === 'Done' ? new Date().toISOString() : null
      }
    });
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-ls-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-ls-text">小さな検証</h1>
                <p className="text-sm text-ls-text-light mt-1">{actions.length}件のアクション</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-ls-primary hover:bg-ls-primary-light text-white gap-1.5"
            >
              <Plus className="w-4 h-4" />
              アクションを追加
            </Button>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* LSSection: Filters */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ls-text-light" />
              <Input
                placeholder="アクションを検索..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-ls-border"
              />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="タイプで絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="連絡">連絡</SelectItem>
              <SelectItem value="調整">調整</SelectItem>
              <SelectItem value="準備">準備</SelectItem>
              <SelectItem value="記録">記録</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={viewMode} onValueChange={setViewMode} className="hidden sm:block">
            <TabsList>
              <TabsTrigger value="kanban" className="gap-1.5">
                <LayoutGrid className="w-4 h-4" />
                カンバン
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-1.5">
                <List className="w-4 h-4" />
                リスト
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

            </div>
          </div>

          {/* LSSection: Content */}
          <div className="mt-6">
            {isLoading ? (
              <div className="grid lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-64 bg-ls-border/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredActions.length === 0 && !search && typeFilter === 'all' ? (
              <EmptyState
                icon={CheckSquare}
                title="まだアクションがありません"
                description="「アクションを追加」ボタンから最初のアクションを作成しましょう"
                actionLabel="アクションを追加"
                onAction={() => setShowForm(true)}
              />
            ) : (
              <ActionKanban
                actions={filteredActions}
                people={people}
                projects={projects}
                onStatusChange={handleStatusChange}
                onEdit={setEditAction}
                onDelete={setDeleteConfirm}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add Action Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>アクションを追加</DialogTitle>
          </DialogHeader>
          <ActionForm
            people={people}
            projects={projects}
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setShowForm(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Action Dialog */}
      <Dialog open={!!editAction} onOpenChange={() => setEditAction(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>アクションを編集</DialogTitle>
          </DialogHeader>
          <ActionForm
            action={editAction}
            people={people}
            projects={projects}
            onSubmit={(data) => updateMutation.mutate({ id: editAction.id, data })}
            onCancel={() => setEditAction(null)}
            isLoading={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アクションを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              このアクションを削除します。この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(deleteConfirm.id)}
              className="bg-ls-danger hover:bg-ls-danger/90 text-white"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}