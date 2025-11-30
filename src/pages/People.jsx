import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { Users, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PeopleCard from '@/components/people/PeopleCard';
import PeopleFilters from '@/components/people/PeopleFilters';
import ActivePeopleRanking from '@/components/people/ActivePeopleRanking';
import EmptyState from '@/components/ui/EmptyState';
import { enrichPersonData, filterPeople, sortPeople } from '@/lib/people/utils';

/**
 * PeopleOS v1.1 - 仲間・協力者一覧ページ（刷新版）
 * LocalSuccess の思考フロー × 地域プレイヤーのレーダー
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function People() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keyword: '',
    interests: [],
    skills: [],
    stage: 'all',
    role: 'all',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('activityScore');

  const { data: people = [], isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-lastContactAt'),
  });

  // データを拡張（新しいフィールドを追加）
  const enrichedPeople = useMemo(() => {
    return people.map(person => enrichPersonData(person));
  }, [people]);

  // フィルタリング
  const filteredPeople = useMemo(() => {
    const filtered = filterPeople(enrichedPeople, filters);
    return sortPeople(filtered, sortBy);
  }, [enrichedPeople, filters, sortBy]);

  // ランキング用（アクティブ順）
  const rankedPeople = useMemo(() => {
    return sortPeople(enrichedPeople, 'activityScore');
  }, [enrichedPeople]);

  const handleCardClick = (personId) => {
    navigate(`/people/${personId}`);
  };

  const handleContact = (personId) => {
    // TODO: 後で実装
    console.log('Contact person:', personId);
  };

  const handleEdit = (personId) => {
    // TODO: 後で実装
    console.log('Edit person:', personId);
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-ls-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-ls-text">仲間・協力者</h1>
                <p className="text-sm text-ls-text-light mt-1">
                  {filteredPeople.length}人{enrichedPeople.length !== filteredPeople.length && ` / ${enrichedPeople.length}人`}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/people/new')}
              className="bg-ls-primary hover:bg-ls-primary-light text-white gap-1.5"
            >
              <Plus className="w-4 h-4" />
              関係者を追加
            </Button>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* メインコンテンツエリア */}
            <div className="lg:col-span-3">
              {/* LSSection: Filters */}
              <div className="mt-6">
                <PeopleFilters
                  people={enrichedPeople}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>

              {/* LSSection: People Grid */}
              <div className="mt-6">
                {isLoading ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-64 bg-ls-border/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredPeople.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="該当する関係者がいません"
                    description="検索条件を変更してみてください"
                  />
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPeople.map(person => (
                      <PeopleCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        fullName={person.fullName}
                        role={person.role}
                        status={person.status}
                        interests={person.interests}
                        skills={person.skills}
                        recentActivity={person.recentActivity}
                        projectCount={person.projectCount}
                        stage={person.stage}
                        activityScore={person.activityScore}
                        onClick={handleCardClick}
                        onContact={handleContact}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* サイドバー: ランキング */}
            <div className="lg:col-span-1">
              <div className="mt-6">
                <ActivePeopleRanking people={rankedPeople} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
