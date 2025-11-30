import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { STAGES, ROLES, STATUSES } from '@/lib/people/types';
import { extractAllInterests, extractAllSkills } from '@/lib/people/utils';
import { cn } from "@/lib/utils";

/**
 * PeopleFilters - 人物一覧のフィルターコンポーネント（刷新版）
 * Sheetを使用したタグフィルター
 * URLクエリで状態保持
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleFilters({ 
  people = [],
  filters,
  onFiltersChange 
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openInterestsSheet, setOpenInterestsSheet] = useState(false);
  const [openSkillsSheet, setOpenSkillsSheet] = useState(false);
  
  const allInterests = extractAllInterests(people);
  const allSkills = extractAllSkills(people);
  
  // URLクエリから初期状態を読み込む（初回のみ）
  useEffect(() => {
    const urlFilters = {
      keyword: searchParams.get('keyword') || '',
      interests: searchParams.get('interest')?.split(',').filter(Boolean) || [],
      skills: searchParams.get('skill')?.split(',').filter(Boolean) || [],
      stage: searchParams.get('stage') || 'all',
      role: searchParams.get('role') || 'all',
      status: searchParams.get('status') || 'all'
    };
    
    // URLと現在のフィルターが異なる場合のみ更新
    const currentFiltersStr = JSON.stringify({
      keyword: filters.keyword || '',
      interests: filters.interests || [],
      skills: filters.skills || [],
      stage: filters.stage || 'all',
      role: filters.role || 'all',
      status: filters.status || 'all'
    });
    const urlFiltersStr = JSON.stringify(urlFilters);
    
    if (urlFiltersStr !== currentFiltersStr) {
      onFiltersChange(urlFilters);
    }
  }, [searchParams]);
  
  // フィルター変更時にURLを更新
  const updateFilters = (newFilters) => {
    onFiltersChange(newFilters);
    
    const params = new URLSearchParams();
    if (newFilters.keyword) params.set('keyword', newFilters.keyword);
    if (newFilters.interests && newFilters.interests.length > 0) {
      params.set('interest', newFilters.interests.join(','));
    }
    if (newFilters.skills && newFilters.skills.length > 0) {
      params.set('skill', newFilters.skills.join(','));
    }
    if (newFilters.stage && newFilters.stage !== 'all') {
      params.set('stage', newFilters.stage);
    }
    if (newFilters.role && newFilters.role !== 'all') {
      params.set('role', newFilters.role);
    }
    if (newFilters.status && newFilters.status !== 'all') {
      params.set('status', newFilters.status);
    }
    
    setSearchParams(params, { replace: true });
  };
  
  const handleKeywordChange = (keyword) => {
    updateFilters({ ...filters, keyword });
  };
  
  const handleStageChange = (stage) => {
    updateFilters({ ...filters, stage });
  };
  
  const handleRoleChange = (role) => {
    updateFilters({ ...filters, role });
  };
  
  const handleStatusChange = (status) => {
    updateFilters({ ...filters, status });
  };
  
  const toggleInterest = (interest) => {
    const current = filters.interests || [];
    const newInterests = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateFilters({ ...filters, interests: newInterests });
  };
  
  const toggleSkill = (skill) => {
    const current = filters.skills || [];
    const newSkills = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    updateFilters({ ...filters, skills: newSkills });
  };
  
  const clearFilters = () => {
    const cleared = {
      keyword: '',
      interests: [],
      skills: [],
      stage: 'all',
      role: 'all',
      status: 'all'
    };
    updateFilters(cleared);
    setSearchParams({}, { replace: true });
  };
  
  const hasActiveFilters = 
    filters.keyword ||
    (filters.interests && filters.interests.length > 0) ||
    (filters.skills && filters.skills.length > 0) ||
    filters.stage !== 'all' ||
    filters.role !== 'all' ||
    filters.status !== 'all';
  
  return (
    <div className="space-y-4">
      {/* キーワード検索 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ls-text-light" />
        <Input
          placeholder="名前・スキル・関心で検索..."
          value={filters.keyword || ''}
          onChange={(e) => handleKeywordChange(e.target.value)}
          className="pl-10 border-ls-border"
        />
      </div>
      
      {/* フィルター行 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 思考ステージ */}
        <Select value={filters.stage || 'all'} onValueChange={handleStageChange}>
          <SelectTrigger className="w-full sm:w-40 border-ls-border">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="思考ステージ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのステージ</SelectItem>
            {STAGES.map(stage => (
              <SelectItem key={stage} value={stage}>{stage}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* 役割 */}
        <Select value={filters.role || 'all'} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full sm:w-40 border-ls-border">
            <SelectValue placeholder="役割" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての役割</SelectItem>
            {ROLES.map(role => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* ステータス */}
        <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-40 border-ls-border">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのステータス</SelectItem>
            {STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* 関心タグ - Sheet */}
        <Sheet open={openInterestsSheet} onOpenChange={setOpenInterestsSheet}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "border-ls-border text-ls-text hover:bg-ls-bg",
                filters.interests && filters.interests.length > 0 && "bg-ls-primary/10 border-ls-primary"
              )}
            >
              関心タグ
              {filters.interests && filters.interests.length > 0 && (
                <Badge className="ml-2 bg-ls-primary text-white rounded-full">
                  {filters.interests.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md border-ls-border">
            <SheetHeader>
              <SheetTitle className="text-ls-text">関心領域で絞り込み</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-2">
                {allInterests.length === 0 ? (
                  <p className="text-sm text-ls-text-light">関心領域がありません</p>
                ) : (
                  allInterests.map(interest => (
                    <div key={interest} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-ls-bg">
                      <Checkbox
                        id={`interest-${interest}`}
                        checked={filters.interests?.includes(interest) || false}
                        onCheckedChange={() => toggleInterest(interest)}
                      />
                      <label
                        htmlFor={`interest-${interest}`}
                        className="text-sm text-ls-text cursor-pointer flex-1"
                      >
                        {interest}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* スキルタグ - Sheet */}
        <Sheet open={openSkillsSheet} onOpenChange={setOpenSkillsSheet}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "border-ls-border text-ls-text hover:bg-ls-bg",
                filters.skills && filters.skills.length > 0 && "bg-ls-secondary/10 border-ls-secondary"
              )}
            >
              スキルタグ
              {filters.skills && filters.skills.length > 0 && (
                <Badge className="ml-2 bg-ls-secondary text-white rounded-full">
                  {filters.skills.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md border-ls-border">
            <SheetHeader>
              <SheetTitle className="text-ls-text">スキルで絞り込み</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-2">
                {allSkills.length === 0 ? (
                  <p className="text-sm text-ls-text-light">スキルがありません</p>
                ) : (
                  allSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-ls-bg">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills?.includes(skill) || false}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className="text-sm text-ls-text cursor-pointer flex-1"
                      >
                        {skill}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* フィルタークリア */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-ls-text-light hover:text-ls-text"
          >
            <X className="w-4 h-4 mr-1" />
            クリア
          </Button>
        )}
      </div>
      
      {/* 選択中のタグ表示 */}
      {(filters.interests && filters.interests.length > 0) || 
       (filters.skills && filters.skills.length > 0) ? (
        <div className="flex flex-wrap gap-2">
          {filters.interests?.map(interest => (
            <Badge
              key={interest}
              variant="secondary"
              className="bg-ls-primary/10 text-ls-primary border-ls-primary/20 rounded-full px-2.5 py-0.5"
            >
              {interest}
              <button
                onClick={() => toggleInterest(interest)}
                className="ml-1.5 hover:bg-ls-primary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.skills?.map(skill => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20 rounded-full px-2.5 py-0.5"
            >
              {skill}
              <button
                onClick={() => toggleSkill(skill)}
                className="ml-1.5 hover:bg-ls-secondary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
