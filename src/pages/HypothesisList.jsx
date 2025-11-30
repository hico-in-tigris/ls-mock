import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Layers, 
  Plus,
  Search,
  MessageCircle,
  Lightbulb,
  FileCheck,
  Filter
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const statusConfig = {
  unverified: { label: '未検証', color: 'bg-ls-bg text-ls-text-light border-ls-border' },
  verifying: { label: '検証中', color: 'bg-ls-warning/10 text-ls-warning border-ls-warning/20' },
  verified: { label: '検証済', color: 'bg-ls-success/10 text-ls-success border-ls-success/20' }
};

export default function HypothesisList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: hypotheses = [], isLoading } = useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => base44.entities.Hypothesis.list('-created_date'),
  });

  const filteredHypotheses = hypotheses.filter(h => {
    const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.target?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getUnansweredQuestionCount = (hypothesis) => {
    return (hypothesis.questions || []).filter(q => !q.answer).length;
  };

  const getActionMemoCount = (hypothesis) => {
    return (hypothesis.action_memos || []).length;
  };

  const getVerificationLogCount = (hypothesis) => {
    return (hypothesis.verification_logs || []).length;
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-ls-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-ls-text">仮説一覧</h1>
                <p className="text-sm text-ls-text-light mt-1">{hypotheses.length}件の仮説</p>
              </div>
            </div>
            <Link to={createPageUrl('ThoughtEntry')}>
              <Button className="bg-ls-primary hover:bg-ls-primary-light text-white gap-1.5">
                <Plus className="w-4 h-4" />
                新しい想いを入力
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* LSSection: Filters */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ls-text-light" />
                <Input
                  placeholder="仮説を検索..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 border-ls-border"
                />
              </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger value="unverified">未検証</TabsTrigger>
              <TabsTrigger value="verifying">検証中</TabsTrigger>
              <TabsTrigger value="verified">検証済</TabsTrigger>
            </TabsList>
              </Tabs>
            </div>
          </div>

          {/* LSSection: Hypotheses List */}
          <div className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-ls-border/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredHypotheses.length === 0 ? (
              <div className="text-center py-16">
                <Layers className="w-12 h-12 text-ls-border mx-auto mb-4" />
                <h3 className="text-lg font-medium text-ls-text mb-2">
                  {search || statusFilter !== 'all' ? '該当する仮説がありません' : 'まだ仮説がありません'}
                </h3>
                <p className="text-sm text-ls-text-light mb-6">
                  {search || statusFilter !== 'all' 
                    ? '検索条件を変更してみてください' 
                    : '想いを言葉にして、仮説を生成しましょう'}
                </p>
                {!(search || statusFilter !== 'all') && (
                  <Link to={createPageUrl('ThoughtEntry')}>
                    <Button className="bg-ls-primary hover:bg-ls-primary-light text-white">
                      想いを入力する
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredHypotheses.map((hypothesis) => {
                  const unansweredCount = getUnansweredQuestionCount(hypothesis);
                  const memoCount = getActionMemoCount(hypothesis);
                  const logCount = getVerificationLogCount(hypothesis);
                  const status = statusConfig[hypothesis.status] || statusConfig.unverified;

                  return (
                    <Link 
                      key={hypothesis.id}
                      to={createPageUrl(`HypothesisDetail?id=${hypothesis.id}`)}
                    >
                      <Card className="hover:shadow-md transition-all cursor-pointer border-ls-border shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-medium text-ls-text mb-1">
                                {hypothesis.title}
                              </h3>
                              {hypothesis.target && (
                                <p className="text-sm text-ls-text-light truncate">
                                  {hypothesis.target}
                                </p>
                              )}
                            </div>
                            <Badge variant="secondary" className={cn("shrink-0", status.color)}>
                              {status.label}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-ls-text-light">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {unansweredCount > 0 ? (
                                <span className="text-ls-warning font-medium">
                                  未回答 {unansweredCount}件
                                </span>
                              ) : (
                                <span>問い {(hypothesis.questions || []).length}件</span>
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <Lightbulb className="w-4 h-4" />
                              行動メモ {memoCount}件
                            </span>
                            <span className="flex items-center gap-1">
                              <FileCheck className="w-4 h-4" />
                              検証ログ {logCount}件
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}