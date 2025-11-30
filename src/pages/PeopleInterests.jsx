import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { Tag, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PeopleCard from '@/components/people/PeopleCard';
import EmptyState from '@/components/ui/EmptyState';
import { enrichPersonData } from '@/lib/people/utils';
import { cn } from "@/lib/utils";

/**
 * PeopleInterests - 関心で探すページ
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleInterests() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState('');
  const selectedInterest = searchParams.get('interest') || '';

  const { data: people = [], isLoading } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list('-lastContactAt'),
  });

  // データを拡張
  const enrichedPeople = useMemo(() => {
    return people.map(person => enrichPersonData(person));
  }, [people]);

  // すべての関心を抽出（人気順）
  const allInterests = useMemo(() => {
    const interestCounts = {};
    enrichedPeople.forEach(person => {
      person.interests?.forEach(interest => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });
    
    return Object.entries(interestCounts)
      .sort((a, b) => b[1] - a[1]) // 人気順
      .map(([interest]) => interest);
  }, [enrichedPeople]);

  // フィルタリング
  const filteredPeople = useMemo(() => {
    let filtered = enrichedPeople;
    
    // 関心でフィルター
    if (selectedInterest) {
      filtered = filtered.filter(person => 
        person.interests?.includes(selectedInterest)
      );
    }
    
    // キーワードでフィルター
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(person =>
        person.name?.toLowerCase().includes(keyword) ||
        person.interests?.some(i => i.toLowerCase().includes(keyword))
      );
    }
    
    return filtered;
  }, [enrichedPeople, selectedInterest, searchKeyword]);

  const handleInterestClick = (interest) => {
    setSearchParams({ interest });
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
              <Tag className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">関心で探す</h1>
              <p className="text-sm text-ls-text-light mt-1">
                関心領域から仲間を見つける
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
                placeholder="関心領域で検索..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 border-ls-border"
              />
            </div>
          </div>

          {/* LSSection: Interests Tags */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-ls-text mb-3">関心領域一覧</h2>
            <div className="flex flex-wrap gap-2">
              {allInterests.map(interest => (
                <Button
                  key={interest}
                  variant={selectedInterest === interest ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInterestClick(interest)}
                  className={cn(
                    "rounded-full",
                    selectedInterest === interest
                      ? "bg-ls-primary hover:bg-ls-primary-light text-white"
                      : "border-ls-border text-ls-text hover:bg-ls-bg"
                  )}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          {/* LSSection: People List */}
          {selectedInterest && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-ls-text">
                  「{selectedInterest}」に関心がある人
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
                  icon={Tag}
                  title="該当する人がいません"
                  description="別の関心領域を選択するか、検索条件を変更してください"
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
          {!selectedInterest && (
            <div className="mt-6">
              <Card className="border-ls-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <Tag className="w-12 h-12 text-ls-text-light mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-ls-text-light">
                    関心領域を選択すると、該当する人が表示されます
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

