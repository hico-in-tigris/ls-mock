import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { recommendPeopleForHypothesis } from '@/api/integrations';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Twitter, 
  Instagram,
  Calendar,
  Tag,
  Briefcase,
  Lightbulb,
  MessageSquare,
  Plus,
  Edit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import PeopleCard from '@/components/people/PeopleCard';

const roleLabels = {
  "admin": "行政",
  "coop": "協力隊",
  "resident": "住民",
  "npo": "NPO",
  "business": "事業者",
  "expert": "専門家"
};

const interactionTypes = [
  { value: 'meet', label: '面会' },
  { value: 'call', label: '電話' },
  { value: 'dm', label: 'DM' },
  { value: 'event', label: 'イベント' },
  { value: 'project', label: 'プロジェクト' }
];

export default function PersonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showInteractionDialog, setShowInteractionDialog] = useState(false);
  const [interactionForm, setInteractionForm] = useState({ type: 'meet', note: '' });

  const { data: person, isLoading } = useQuery({
    queryKey: ['person', id],
    queryFn: () => base44.entities.Person.get(id),
    enabled: !!id
  });

  const { data: interactions = [] } = useQuery({
    queryKey: ['interactions', id],
    queryFn: async () => {
      const all = await base44.entities.Interaction.list();
      return all.filter(i => i.personId === id).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    },
    enabled: !!id
  });

  const { data: hypotheses = [] } = useQuery({
    queryKey: ['hypotheses'],
    queryFn: () => base44.entities.Hypothesis.list(),
    enabled: !!id
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => base44.entities.Project.list(),
    enabled: !!id
  });

  const { data: recommendedPeople = [] } = useQuery({
    queryKey: ['recommendedPeople', id],
    queryFn: async () => {
      if (!person?.hypotheses || person.hypotheses.length === 0) return [];
      const latestHypothesisId = person.hypotheses[person.hypotheses.length - 1];
      return await recommendPeopleForHypothesis(latestHypothesisId);
    },
    enabled: !!id && !!person?.hypotheses?.length
  });

  const createInteractionMutation = useMutation({
    mutationFn: async (data) => {
      const interaction = await base44.entities.Interaction.create({
        personId: id,
        type: data.type,
        note: data.note,
        timestamp: new Date().toISOString()
      });
      
      await base44.entities.Person.update(id, {
        lastContactAt: new Date().toISOString()
      });
      
      return interaction;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactions', id] });
      queryClient.invalidateQueries({ queryKey: ['person', id] });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      setShowInteractionDialog(false);
      setInteractionForm({ type: 'meet', note: '' });
    }
  });

  const handleCreateInteraction = () => {
    createInteractionMutation.mutate(interactionForm);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  const personHypotheses = hypotheses.filter(h => person?.hypotheses?.includes(h.id)).slice(0, 3);
  const personProjects = projects.filter(p => person?.projects?.includes(p.id)).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">関係者が見つかりません</p>
          <Button onClick={() => navigate('/people')} className="mt-4">
            一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/people')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            一覧に戻る
          </Button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-700 text-2xl">
                {getInitials(person.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{person.name}</h1>
              <Badge variant="secondary" className="text-sm">
                {roleLabels[person.role] || person.role}
              </Badge>
            </div>

            <div className="flex gap-2">
              {person.contact?.sns?.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://twitter.com/${person.contact.sns.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {person.contact?.sns?.instagram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://instagram.com/${person.contact.sns.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                編集
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Values */}
            {person.values && person.values.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    価値観
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {person.values.map((value, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {person.skills && person.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    スキル
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            {person.description && (
              <Card>
                <CardHeader>
                  <CardTitle>プロフィール</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 whitespace-pre-wrap">{person.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Hypotheses */}
            {personHypotheses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    関わった仮説
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {personHypotheses.map(hypothesis => (
                      <div key={hypothesis.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold text-slate-900">{hypothesis.title}</h4>
                        {hypothesis.target && (
                          <p className="text-sm text-slate-600 mt-1">対象: {hypothesis.target}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects */}
            {personProjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    関わったプロジェクト
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {personProjects.map(project => (
                      <div key={project.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold text-slate-900">{project.name || project.title}</h4>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interaction Log */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    接触履歴
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setShowInteractionDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    接触を記録
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {interactions.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-8">
                        接触履歴がありません
                      </p>
                    ) : (
                      interactions.map(interaction => (
                        <div key={interaction.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">
                              {interactionTypes.find(t => t.value === interaction.type)?.label || interaction.type}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {format(parseISO(interaction.timestamp), 'yyyy年M月d日 HH:mm')}
                            </span>
                          </div>
                          {interaction.note && (
                            <p className="text-sm text-slate-600">{interaction.note}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>連絡先</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {person.contact?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <a href={`mailto:${person.contact.email}`} className="text-emerald-600 hover:underline">
                      {person.contact.email}
                    </a>
                  </div>
                )}
                {person.contact?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <a href={`tel:${person.contact.phone}`} className="text-emerald-600 hover:underline">
                      {person.contact.phone}
                    </a>
                  </div>
                )}
                {person.lastContactAt && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>最終接触: {format(parseISO(person.lastContactAt), 'yyyy年M月d日')}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            {recommendedPeople.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>AIのおすすめ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-4">
                    この仮説に関わりそうな人
                  </p>
                  <div className="space-y-3">
                    {recommendedPeople.map(rec => (
                      <PeopleCard
                        key={rec.id}
                        id={rec.id}
                        name={rec.name}
                        role={rec.role}
                        skills={rec.skills || []}
                        values={rec.values || []}
                        lastContactAt={rec.lastContactAt}
                        projects={rec.projects || []}
                        onClick={() => navigate(`/people/${rec.id}`)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Interaction Dialog */}
      <Dialog open={showInteractionDialog} onOpenChange={setShowInteractionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>接触を記録</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>種類</Label>
              <Select
                value={interactionForm.type}
                onValueChange={(value) => setInteractionForm({ ...interactionForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interactionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>メモ</Label>
              <Textarea
                value={interactionForm.note}
                onChange={(e) => setInteractionForm({ ...interactionForm, note: e.target.value })}
                placeholder="接触内容を記録..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInteractionDialog(false)}>
                キャンセル
              </Button>
              <Button
                onClick={handleCreateInteraction}
                disabled={createInteractionMutation.isPending}
              >
                {createInteractionMutation.isPending ? '保存中...' : '保存'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

