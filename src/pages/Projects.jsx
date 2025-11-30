import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { 
  Folder, 
  Plus, 
  Search,
  Filter,
  Pencil,
  Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { cn } from "@/lib/utils";
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectWizard from '@/components/projects/ProjectWizard';
import EmptyState from '@/components/ui/EmptyState';

const statusConfig = {
  "Plan": { color: "bg-ls-bg text-ls-text-light border-ls-border" },
  "Try": { color: "bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20" },
  "Done": { color: "bg-ls-success/10 text-ls-success border-ls-success/20" }
};

export default function Projects() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showWizard, setShowWizard] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', purpose: '', kpi: '' });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list('-updated_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Project.create(data),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setShowCreateForm(false);
      setNewProject({ title: '', purpose: '', kpi: '' });
      setSelectedProject(created);
      setShowWizard(true);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Project.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Project.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setDeleteConfirm(null);
      setSelectedProject(null);
    },
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.purpose?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = () => {
    if (!newProject.title.trim()) return;
    createMutation.mutate({
      ...newProject,
      status: 'Plan',
      wizard_stage: 1
    });
  };

  const handleWizardUpdate = (data) => {
    if (selectedProject) {
      updateMutation.mutate({ id: selectedProject.id, data });
    }
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
                <Folder className="w-5 h-5 text-ls-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-ls-text">プロジェクト化</h1>
                <p className="text-sm text-ls-text-light mt-1">{projects.length}件のプロジェクト</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-ls-primary hover:bg-ls-primary-light text-white gap-1.5"
            >
              <Plus className="w-4 h-4" />
              新規プロジェクト
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
                  placeholder="プロジェクトを検索..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-ls-border"
                />
              </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="Plan">Plan</TabsTrigger>
              <TabsTrigger value="Try">Try</TabsTrigger>
              <TabsTrigger value="Done">Done</TabsTrigger>
            </TabsList>
              </Tabs>
            </div>
          </div>

          {/* LSSection: Projects Grid */}
          <div className="mt-6">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-56 bg-ls-border/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredProjects.length === 0 && !search && statusFilter === 'all' ? (
              <EmptyState
                icon={Folder}
                title="まだプロジェクトがありません"
                description="「新規プロジェクト」ボタンから最初のプロジェクトを作成しましょう"
                actionLabel="新規プロジェクト"
                onAction={() => setShowCreateForm(true)}
              />
            ) : filteredProjects.length === 0 ? (
              <EmptyState
                icon={Search}
                title="該当するプロジェクトがありません"
                description="検索条件を変更してみてください"
              />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onView={(p) => {
                      setSelectedProject(p);
                      setShowWizard(true);
                    }}
                    onEdit={(p) => {
                      setSelectedProject(p);
                      setShowWizard(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Project Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>新規プロジェクト</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">プロジェクト名 <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="例: 移住促進プログラム"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">目的・概要</Label>
              <Textarea
                id="purpose"
                value={newProject.purpose}
                onChange={(e) => setNewProject({ ...newProject, purpose: e.target.value })}
                placeholder="このプロジェクトで実現したいこと..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kpi">KPI・目標指標</Label>
              <Input
                id="kpi"
                value={newProject.kpi}
                onChange={(e) => setNewProject({ ...newProject, kpi: e.target.value })}
                placeholder="例: 移住相談件数 月20件"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              キャンセル
            </Button>
            <Button
              onClick={handleCreateProject}
              disabled={!newProject.title.trim() || createMutation.isPending}
              className="bg-ls-primary hover:bg-ls-primary-light text-white"
            >
              作成して設計を開始
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Wizard Sheet */}
      <Sheet open={showWizard} onOpenChange={setShowWizard}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedProject && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
                      <Folder className="w-5 h-5 text-ls-primary" />
                    </div>
                    <div>
                      <div className="text-lg">{selectedProject.title}</div>
                      <Badge className={cn("mt-1", statusConfig[selectedProject.status]?.color)}>
                        {selectedProject.status}
                      </Badge>
                    </div>
                  </SheetTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedProject.status}
                      onValueChange={(value) => {
                        updateMutation.mutate({ 
                          id: selectedProject.id, 
                          data: { status: value } 
                        });
                        setSelectedProject({ ...selectedProject, status: value });
                      }}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plan">Plan</SelectItem>
                        <SelectItem value="Try">Try</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteConfirm(selectedProject)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              <ProjectWizard
                project={selectedProject}
                onUpdate={handleWizardUpdate}
                onClose={() => setShowWizard(false)}
              />
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>プロジェクトを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              「{deleteConfirm?.title}」を削除します。この操作は取り消せません。
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