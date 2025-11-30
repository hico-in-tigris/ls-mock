import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { Briefcase, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PeopleCard from '@/components/people/PeopleCard';
import EmptyState from '@/components/ui/EmptyState';
import { enrichPersonData, filterPeople } from '@/lib/people/utils';
import { cn } from "@/lib/utils";

/**
 * PeopleSkills - スキルで探すページ
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleSkills() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState('');
  const selectedSkill = searchParams.get('skill') || '';

  const { data: people = [], isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-lastContactAt'),
  });

  // データを拡張
  const enrichedPeople = useMemo(() => {
    return people.map(person => enrichPersonData(person));
  }, [people]);

  // すべてのスキルを抽出（人気順）
  const allSkills = useMemo(() => {
    const skillCounts = {};
    enrichedPeople.forEach(person => {
      person.skills?.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });
    
    return Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1]) // 人気順
      .map(([skill]) => skill);
  }, [enrichedPeople]);

  // フィルタリング
  const filteredPeople = useMemo(() => {
    let filtered = enrichedPeople;
    
    // スキルでフィルター
    if (selectedSkill) {
      filtered = filtered.filter(person => 
        person.skills?.includes(selectedSkill)
      );
    }
    
    // キーワードでフィルター
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(person =>
        person.name?.toLowerCase().includes(keyword) ||
        person.skills?.some(s => s.toLowerCase().includes(keyword))
      );
    }
    
    return filtered;
  }, [enrichedPeople, selectedSkill, searchKeyword]);

  const handleSkillClick = (skill) => {
    setSearchParams({ skill });
  };

  const handleCardClick = (personId) => {
    navigate(`/people/${personId}`);
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">スキルで探す</h1>
              <p className="text-sm text-ls-text-light mt-1">
                スキルから仲間を見つける
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* LSSection: Search */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ls-text-light" />
              <Input
                placeholder="スキル名で検索..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 border-ls-border"
              />
            </div>
          </div>

          {/* LSSection: Skills Tags */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">スキル一覧</h2>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <Button
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSkillClick(skill)}
                  className={cn(
                    "rounded-full",
                    selectedSkill === skill
                      ? "bg-ls-primary hover:bg-ls-primary-light text-white"
                      : "border-ls-border text-ls-text hover:bg-ls-bg"
                  )}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>

          {/* LSSection: People List */}
          {selectedSkill && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-ls-text">
                  「{selectedSkill}」のスキルを持つ人
                </h2>
                <Badge variant="secondary" className="bg-ls-bg border-ls-border">
                  {filteredPeople.length}人
                </Badge>
              </div>
              
              {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-ls-border/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredPeople.length === 0 ? (
                <EmptyState
                  icon={Briefcase}
                  title="該当する人がいません"
                  description="別のスキルを選択するか、検索条件を変更してください"
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
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 初期状態 */}
          {!selectedSkill && (
            <div className="mt-6">
              <Card className="border-ls-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-ls-text-light mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-ls-text-light">
                    スキルを選択すると、該当する人が表示されます
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

