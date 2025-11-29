import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  Users, 
  Plus, 
  Search,
  Filter,
  X,
  User,
  Calendar,
  Phone,
  Tag,
  Trash2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { differenceInDays, parseISO, format } from "date-fns";
import { cn } from "@/lib/utils";
import PersonCard from '@/components/people/PersonCard';
import PersonForm from '@/components/people/PersonForm';
import SuggestionCard from '@/components/people/SuggestionCard';
import EmptyState from '@/components/ui/EmptyState';

const roleColors = {
  "住民": "bg-emerald-100 text-emerald-700",
  "行政": "bg-blue-100 text-blue-700",
  "事業者": "bg-amber-100 text-amber-700",
  "NPO": "bg-purple-100 text-purple-700",
  "専門家": "bg-indigo-100 text-indigo-700",
  "その他": "bg-slate-100 text-slate-700"
};

export default function People() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editPerson, setEditPerson] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: people = [], isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-last_contact'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Person.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Person.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      setEditPerson(null);
      setSelectedPerson(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Person.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      setDeleteConfirm(null);
      setSelectedPerson(null);
    },
  });

  const createActionMutation = useMutation({
    mutationFn: (data) => base44.entities.Action.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actions'] });
    },
  });

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesRole = roleFilter === 'all' || person.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateAction = (content, personId) => {
    createActionMutation.mutate({
      content,
      type: '連絡',
      status: 'Todo',
      person_id: personId,
      due_date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  const handleContactAction = (person) => {
    handleCreateAction(`${person.name}さんに連絡する`, person.id);
  };

  const daysAgo = (date) => {
    if (!date) return null;
    return differenceInDays(new Date(), parseISO(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">関係者管理</h1>
              <p className="text-sm text-slate-500">{people.length}人の関係者</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            関係者を追加
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="名前やタグで検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="役割で絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての役割</SelectItem>
              {Object.keys(roleColors).map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* People Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredPeople.length === 0 ? (
          <EmptyState
            icon={Users}
            title={search || roleFilter !== 'all' ? '該当する関係者がいません' : 'まだ関係者がいません'}
            description={search || roleFilter !== 'all' 
              ? '検索条件を変更してみてください' 
              : '「関係者を追加」ボタンから最初の関係者を登録しましょう'}
            actionLabel={!(search || roleFilter !== 'all') ? '関係者を追加' : undefined}
            onAction={!(search || roleFilter !== 'all') ? () => setShowForm(true) : undefined}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPeople.map(person => (
              <PersonCard
                key={person.id}
                person={person}
                onView={() => setSelectedPerson(person)}
                onContact={handleContactAction}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Person Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>関係者を追加</DialogTitle>
          </DialogHeader>
          <PersonForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setShowForm(false)}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Person Dialog */}
      <Dialog open={!!editPerson} onOpenChange={() => setEditPerson(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>関係者を編集</DialogTitle>
          </DialogHeader>
          <PersonForm
            person={editPerson}
            onSubmit={(data) => updateMutation.mutate({ id: editPerson.id, data })}
            onCancel={() => setEditPerson(null)}
            isLoading={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Person Detail Sheet */}
      <Sheet open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedPerson && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-xl">{selectedPerson.name}</div>
                    <Badge className={cn("mt-1", roleColors[selectedPerson.role])}>
                      {selectedPerson.role}
                    </Badge>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Calendar className="w-4 h-4" />
                    最終接触
                  </div>
                  <p className="text-slate-600">
                    {selectedPerson.last_contact 
                      ? `${format(parseISO(selectedPerson.last_contact), 'yyyy年M月d日')}（${daysAgo(selectedPerson.last_contact)}日前）`
                      : '未設定'}
                  </p>
                </div>

                {selectedPerson.contact_info && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Phone className="w-4 h-4" />
                      連絡先
                    </div>
                    <p className="text-slate-600">{selectedPerson.contact_info}</p>
                  </div>
                )}

                {selectedPerson.tags?.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Tag className="w-4 h-4" />
                      タグ
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerson.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPerson.notes && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-slate-700">メモ</div>
                    <p className="text-slate-600 whitespace-pre-wrap">{selectedPerson.notes}</p>
                  </div>
                )}

                {/* Suggestions */}
                <SuggestionCard
                  person={selectedPerson}
                  onCreateAction={(content) => handleCreateAction(content, selectedPerson.id)}
                />

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEditPerson(selectedPerson);
                    }}
                  >
                    編集
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteConfirm(selectedPerson)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>関係者を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirm?.name}さんを削除します。この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(deleteConfirm.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}