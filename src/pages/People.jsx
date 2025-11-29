import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PeopleCard from '@/components/people/PeopleCard';
import EmptyState from '@/components/ui/EmptyState';

const roleOptions = [
  { value: 'all', label: 'すべての役割' },
  { value: 'admin', label: '行政' },
  { value: 'coop', label: '協力隊' },
  { value: 'resident', label: '住民' },
  { value: 'npo', label: 'NPO' },
  { value: 'business', label: '事業者' },
  { value: 'expert', label: '専門家' }
];

export default function People() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: people = [], isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-lastContactAt'),
  });

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesSearch = 
        person.name?.toLowerCase().includes(search.toLowerCase()) ||
        person.skills?.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
        person.values?.some(value => value.toLowerCase().includes(search.toLowerCase()));
      
      const matchesRole = roleFilter === 'all' || person.role === roleFilter;
      
      return matchesSearch && matchesRole;
    });
  }, [people, search, roleFilter]);

  const handleCardClick = (personId) => {
    navigate(`/people/${personId}`);
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
              <h1 className="text-2xl font-bold text-slate-900">PeopleOS</h1>
              <p className="text-sm text-slate-500">{people.length}人の関係者</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/people/new')}
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
              placeholder="名前・スキル・価値観で検索..."
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
              {roleOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="mb-6" />

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
          />
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {filteredPeople.map(person => (
                <PeopleCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  role={person.role}
                  skills={person.skills || []}
                  values={person.values || []}
                  lastContactAt={person.lastContactAt}
                  projects={person.projects || []}
                  onClick={() => handleCardClick(person.id)}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
