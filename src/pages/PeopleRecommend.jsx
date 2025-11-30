import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/apiClient';
import { Sparkles, Loader2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { recommendPeopleForHypothesis } from '@/api/integrations';
import { enrichPersonData } from '@/lib/people/utils';
import { cn } from "@/lib/utils";

/**
 * PeopleRecommend - AI推薦ページ
 * LocalSuccess UIガイドライン v0.1 準拠
 */
export default function PeopleRecommend() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedHypothesis, setSelectedHypothesis] = useState('');
  const [recommendationType, setRecommendationType] = useState('project'); // 'project' or 'hypothesis'

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
  });

  const { data: hypotheses = [] } = useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => base44.entities.Hypothesis.list(),
  });

  const { data: people = [] } = useQuery({
    queryKey: ['people'],
    queryFn: () => base44.entities.Person.list(),
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ['peopleRecommendations', recommendationType, selectedProject || selectedHypothesis],
    queryFn: async () => {
      if (recommendationType === 'hypothesis' && selectedHypothesis) {
        // 仮説ベースの推薦
        const recommended = await recommendPeopleForHypothesis(selectedHypothesis);
        return recommended.map((rec, index) => {
          const enriched = enrichPersonData(rec);
          return {
            person: enriched,
            priority: index < 2 ? '高' : index < 4 ? '中' : '低',
            reason: `スキルと関心がマッチしています（マッチ度: ${Math.round((rec.score || 0) * 100)}%）`
          };
        });
      } else if (recommendationType === 'project' && selectedProject) {
        // プロジェクトベースの推薦（簡易版）
        const project = projects.find(p => p.id === selectedProject);
        if (!project) return [];
        
        // 簡易的な推薦ロジック（実際はAI APIを呼ぶ）
        const enriched = people.map(p => enrichPersonData(p));
        return enriched
          .filter(p => p.skills && p.skills.length > 0)
          .slice(0, 5)
          .map((person, index) => ({
            person,
            priority: index < 2 ? '高' : index < 4 ? '中' : '低',
            reason: `${person.skills?.slice(0, 2).join('、')}のスキルがプロジェクトに役立ちそうです`
          }));
      }
      return [];
    },
    enabled: (recommendationType === 'project' && !!selectedProject) || 
             (recommendationType === 'hypothesis' && !!selectedHypothesis)
  });

  const handleContact = (personId) => {
    navigate(`/people/${personId}`);
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const priorityColors = {
    '高': 'bg-ls-danger/10 text-ls-danger border-ls-danger/20',
    '中': 'bg-ls-warning/10 text-ls-warning border-ls-warning/20',
    '低': 'bg-ls-bg text-ls-text-light border-ls-border'
  };

  return (
    <div className="min-h-screen bg-ls-bg">
      {/* LSPageLayout: Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-ls-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-ls-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-ls-text">推薦AI</h1>
              <p className="text-sm text-ls-text-light mt-1">
                プロジェクトや仮説に適した仲間をAIが推薦します
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LSPageLayout: Main Content */}
      <div className="px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* LSSection: Selection */}
          <div className="mt-6">
            <Card className="border-ls-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-ls-text">推薦対象を選択</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>推薦タイプ</Label>
                  <Select value={recommendationType} onValueChange={(value) => {
                    setRecommendationType(value);
                    setSelectedProject('');
                    setSelectedHypothesis('');
                  }}>
                    <SelectTrigger className="border-ls-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">プロジェクト</SelectItem>
                      <SelectItem value="hypothesis">仮説</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {recommendationType === 'project' && (
                  <div className="space-y-2">
                    <Label>プロジェクト</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="border-ls-border">
                        <SelectValue placeholder="プロジェクトを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title || project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {recommendationType === 'hypothesis' && (
                  <div className="space-y-2">
                    <Label>仮説</Label>
                    <Select value={selectedHypothesis} onValueChange={setSelectedHypothesis}>
                      <SelectTrigger className="border-ls-border">
                        <SelectValue placeholder="仮説を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {hypotheses.map(hypothesis => (
                          <SelectItem key={hypothesis.id} value={hypothesis.id}>
                            {hypothesis.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* LSSection: Recommendations */}
          {(selectedProject || selectedHypothesis) && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-ls-text mb-3">推薦候補者</h2>
              
              {isLoadingRecommendations ? (
                <Card className="border-ls-border shadow-sm">
                  <CardContent className="p-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-ls-text-light mx-auto mb-4" />
                    <p className="text-sm text-ls-text-light">推薦を生成しています...</p>
                  </CardContent>
                </Card>
              ) : recommendations.length === 0 ? (
                <Card className="border-ls-border shadow-sm">
                  <CardContent className="p-8 text-center">
                    <p className="text-sm text-ls-text-light">推薦候補者が見つかりませんでした</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const person = rec.person || rec;
                    return (
                      <Card key={person.id || index} className="border-ls-border shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 shrink-0">
                              <AvatarFallback className="bg-ls-primary/10 text-ls-primary">
                                {getInitials(person.name || person.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <h3 className="text-sm font-medium text-ls-text">
                                    {person.name || person.fullName}
                                  </h3>
                                  <p className="text-xs text-ls-text-light mt-1">
                                    {person.role}
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", priorityColors[rec.priority] || priorityColors['中'])}
                                >
                                  {rec.priority}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-ls-text mb-3 leading-relaxed">
                                {rec.reason}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {person.skills?.slice(0, 3).map((skill, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs rounded-full px-2.5 py-0.5 border-ls-border"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContact(person.id)}
                                className="border-ls-border text-ls-text hover:bg-ls-bg"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                この人に声をかける
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 初期状態 */}
          {!selectedProject && !selectedHypothesis && (
            <div className="mt-6">
              <Card className="border-ls-border shadow-sm">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-ls-text-light mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-ls-text-light">
                    プロジェクトまたは仮説を選択すると、AIが適した仲間を推薦します
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

