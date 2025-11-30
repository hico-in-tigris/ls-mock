import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { usePersonDetail } from '@/hooks/usePersonDetail';
import PersonHeader from '@/components/people/PersonHeader';
import PersonInfo from '@/components/people/PersonInfo';
import InteractionLog from '@/components/people/InteractionLog';
import PersonSidebar from '@/components/people/PersonSidebar';

export default function PersonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    person,
    isLoading,
    interactions,
    personHypotheses,
    personProjects,
    recommendedPeople,
    createInteractionMutation
  } = usePersonDetail(id);

  const handleCreateInteraction = (form) => {
    createInteractionMutation.mutate(form, {
      onSuccess: () => {
        // InteractionLogコンポーネント内でダイアログを閉じるため、ここでは何もしない
      }
    });
  };

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
        <PersonHeader person={person} />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PersonInfo 
              person={person} 
              personHypotheses={personHypotheses}
              personProjects={personProjects}
            />

            <InteractionLog
              interactions={interactions}
              onCreateInteraction={handleCreateInteraction}
              isPending={createInteractionMutation.isPending}
            />
          </div>

          {/* Sidebar */}
          <PersonSidebar 
            person={person}
            recommendedPeople={recommendedPeople}
          />
        </div>
      </div>
    </div>
  );
}

