import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { STAGES, ROLES, STATUSES } from '@/lib/people/types';
import { extractAllInterests, extractAllSkills } from '@/lib/people/utils';
import { cn } from "@/lib/utils";

/**
 * PeopleFilters - 人物一覧のフィルターコンポーネント
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleFilters({ 
  people = [],
  filters,
  onFiltersChange 
}) {
  const [openInterests, setOpenInterests] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  
  const allInterests = extractAllInterests(people);
  const allSkills = extractAllSkills(people);
  
  const handleKeywordChange = (keyword) => {
    onFiltersChange({ ...filters, keyword });
  };
  
  const handleStageChange = (stage) => {
    onFiltersChange({ ...filters, stage });
  };
  
  const handleRoleChange = (role) => {
    onFiltersChange({ ...filters, role });
  };
  
  const handleStatusChange = (status) => {
    onFiltersChange({ ...filters, status });
  };
  
  const toggleInterest = (interest) => {
    const current = filters.interests || [];
    const newInterests = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    onFiltersChange({ ...filters, interests: newInterests });
  };
  
  const toggleSkill = (skill) => {
    const current = filters.skills || [];
    const newSkills = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    onFiltersChange({ ...filters, skills: newSkills });
  };
  
  const clearFilters = () => {
    onFiltersChange({
      keyword: '',
      interests: [],
      skills: [],
      stage: 'all',
      role: 'all',
      status: 'all'
    });
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
        
        {/* 関心タグ */}
        <Popover open={openInterests} onOpenChange={setOpenInterests}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "border-ls-border text-ls-text hover:bg-ls-bg",
                filters.interests && filters.interests.length > 0 && "bg-ls-primary/10 border-ls-primary"
              )}
            >
              関心タグ
              {filters.interests && filters.interests.length > 0 && (
                <Badge className="ml-2 bg-ls-primary text-white">
                  {filters.interests.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 border-ls-border">
            <div className="space-y-2">
              <div className="text-sm font-medium text-ls-text mb-2">関心領域</div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {allInterests.length === 0 ? (
                  <p className="text-xs text-ls-text-light">関心領域がありません</p>
                ) : (
                  allInterests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
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
          </PopoverContent>
        </Popover>
        
        {/* スキルタグ */}
        <Popover open={openSkills} onOpenChange={setOpenSkills}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "border-ls-border text-ls-text hover:bg-ls-bg",
                filters.skills && filters.skills.length > 0 && "bg-ls-primary/10 border-ls-primary"
              )}
            >
              スキルタグ
              {filters.skills && filters.skills.length > 0 && (
                <Badge className="ml-2 bg-ls-primary text-white">
                  {filters.skills.length}
                </Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 border-ls-border">
            <div className="space-y-2">
              <div className="text-sm font-medium text-ls-text mb-2">スキル</div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {allSkills.length === 0 ? (
                  <p className="text-xs text-ls-text-light">スキルがありません</p>
                ) : (
                  allSkills.map(skill => (
                    <div key={skill} className="flex items-center space-x-2">
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
          </PopoverContent>
        </Popover>
        
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
              className="bg-ls-primary/10 text-ls-primary border-ls-primary/20"
            >
              {interest}
              <button
                onClick={() => toggleInterest(interest)}
                className="ml-1 hover:bg-ls-primary/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.skills?.map(skill => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-ls-secondary/10 text-ls-secondary border-ls-secondary/20"
            >
              {skill}
              <button
                onClick={() => toggleSkill(skill)}
                className="ml-1 hover:bg-ls-secondary/20 rounded-full p-0.5"
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

