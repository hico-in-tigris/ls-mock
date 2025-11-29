/**
 * HypothesisDetail - 仮説詳細ページ
 * 仮説の詳細情報を表示し、思考を深めるための各種機能を提供
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader2, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// コンポーネント
import HypothesisCard from '@/components/thought/HypothesisCard';
import StructuredQuestions from '@/components/thought/StructuredQuestions';
import AnswerSummary from '@/components/thought/AnswerSummary';
import NextActionPrompt from '@/components/thought/NextActionPrompt';
import ActionMemoInbox from '@/components/thought/ActionMemoInbox';
import ActionList from '@/components/thought/ActionList';
import BusinessPlanGenerator from '@/components/thought/BusinessPlanGenerator';
import CollaborationPanel from '@/components/collaboration/CollaborationPanel';
import CommentThread from '@/components/collaboration/CommentThread';
import SyncRecommendations from '@/components/synchro/SyncRecommendations';
import PublishToggle from '@/components/synchro/PublishToggle';
import PeopleCard from '@/components/people/PeopleCard';

// カスタムフック
import { useHypothesisDetail } from '@/hooks/useHypothesisDetail';
import { 
  useBusinessPlanGeneration, 
  useQuestionGeneration, 
  useSummaryGeneration,
  useEmotionalTagsGeneration,
  useNextPromptGeneration
} from '@/hooks/useHypothesisMutations';
import { useHypothesisHandlers } from '@/hooks/useHypothesisHandlers';

export default function HypothesisDetail() {
  // URLパラメータから仮説IDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const hypothesisId = urlParams.get('id');

  // データ取得とmutations
  const { hypothesis, isLoading, recommendedPeople, updateMutation } = useHypothesisDetail(hypothesisId);

  // AI生成mutations
  const generateBusinessPlanMutation = useBusinessPlanGeneration(hypothesis, hypothesisId, updateMutation);
  const generateQuestionsMutation = useQuestionGeneration(hypothesis, hypothesisId, updateMutation);
  const generateSummaryMutation = useSummaryGeneration(hypothesis, hypothesisId, updateMutation);
  const generateEmotionalTagsMutation = useEmotionalTagsGeneration(hypothesis, hypothesisId, updateMutation);
  const generateNextPromptMutation = useNextPromptGeneration(hypothesis, hypothesisId, updateMutation);

  // イベントハンドラー
  const handlers = useHypothesisHandlers(hypothesis, hypothesisId, updateMutation);

  // ローディング状態
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  // エラー状態
  if (!hypothesis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-slate-500">仮説が見つかりませんでした</p>
          <Link to={createPageUrl('HypothesisList')}>
            <Button variant="outline" className="mt-4">
              仮説一覧へ戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to={createPageUrl('HypothesisList')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            仮説一覧
          </Link>

          <div className="flex items-center gap-2">
            <CollaborationPanel 
              hypothesisId={hypothesisId} 
              hypothesisTitle={hypothesis.title}
            />
            <Select
              value={hypothesis.status}
              onValueChange={handlers.handleStatusChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unverified">未検証</SelectItem>
                <SelectItem value="verifying">検証中</SelectItem>
                <SelectItem value="verified">検証済</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* セクション1: 仮説の概要 */}
        <section className="mb-10">
          <HypothesisCard hypothesis={hypothesis} showStatus />
          
          {hypothesis.original_input && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400 mb-1">元の想い</p>
              <p className="text-sm leading-relaxed text-slate-700">{hypothesis.original_input}</p>
            </div>
          )}
        </section>

        <Separator className="my-8" />

        {/* セクション2: 構造化された問い */}
        <section className="mb-10">
          <h2 className="text-base font-medium text-slate-800 mb-6">
            思考を深める問い
          </h2>
          <StructuredQuestions
            hypothesis={hypothesis}
            structuredQuestions={hypothesis.structured_questions || {}}
            onQuestionUpdate={handlers.handleQuestionUpdate}
            onConvertInsight={handlers.handleConvertInsight}
            onGenerateQuestions={() => generateQuestionsMutation.mutate()}
            isLoading={updateMutation.isPending}
            isGenerating={generateQuestionsMutation.isPending}
          />

          {/* 回答サマリー生成ボタン */}
          {handlers.hasAnswers() && !hypothesis.answer_summary && !generateSummaryMutation.isPending && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => generateSummaryMutation.mutate()}
                variant="outline"
                className="text-slate-600"
              >
                回答をまとめてAIに確認してもらう
              </Button>
            </div>
          )}
        </section>

        {/* セクション2.5: 回答サマリー */}
        {(hypothesis.answer_summary || generateSummaryMutation.isPending) && (
          <section className="mb-10">
            <AnswerSummary
              summary={hypothesis.answer_summary}
              isGenerating={generateSummaryMutation.isPending}
              onConfirm={() => handlers.handleConfirmSummary(() => generateNextPromptMutation.mutate())}
              onAddClarification={(clarification) => handlers.handleAddClarification(clarification, () => generateSummaryMutation.mutate())}
              isConfirmed={hypothesis.summary_confirmed}
            />
          </section>
        )}

        {/* セクション2.6: 次のアクションを促す問い */}
        {hypothesis.summary_confirmed && (
          <section className="mb-10">
            <NextActionPrompt
              promptQuestion={hypothesis.next_action_prompt}
              isGenerating={generateNextPromptMutation.isPending}
              onSaveActionMemo={handlers.handleSaveFromPrompt}
              isSaving={updateMutation.isPending}
            />
          </section>
        )}

        <Separator className="my-8" />

        {/* セクション3: 行動メモ (Inbox) */}
        <section className="mb-10">
          <ActionMemoInbox
            memos={hypothesis.action_memos || []}
            onAddMemo={handlers.handleAddMemo}
            onDeleteMemo={handlers.handleDeleteMemo}
            onConvertToAction={handlers.handleConvertToAction}
          />
        </section>

        <Separator className="my-8" />

        {/* セクション4: アクション一覧 */}
        <section className="mb-10">
          <ActionList
            actions={hypothesis.actions || []}
            onStatusChange={handlers.handleActionStatusChange}
            onAddVerification={handlers.handleAddVerification}
          />
          
          {/* アクションへのコメント */}
          {(hypothesis.actions || []).length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
              <CommentThread 
                hypothesisId={hypothesisId}
                targetType="action"
                compact
              />
            </div>
          )}
        </section>

        <Separator className="my-8" />

        {/* セクション5: 事業計画ドラフト */}
        <section className="mb-10">
          <BusinessPlanGenerator
            hypothesis={hypothesis}
            onGenerate={() => generateBusinessPlanMutation.mutate()}
            isGenerating={generateBusinessPlanMutation.isPending}
            generatedPlan={hypothesis.business_plan_draft}
          />
        </section>

        <Separator className="my-8" />

        {/* セクション6: シンクロレコメンド */}
        <section className="mb-10">
          <SyncRecommendations
            hypothesis={hypothesis}
            onGenerateTags={() => generateEmotionalTagsMutation.mutateAsync()}
          />
        </section>

        <Separator className="my-8" />

        {/* セクション7: この仮説に関わりそうな人（PeopleOS連動） */}
        {recommendedPeople.length > 0 && (
          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  この仮説に関わりそうな人
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  AIが推薦した、この仮説に関連する価値観やスキルを持つ関係者
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedPeople.map(person => (
                    <PeopleCard
                      key={person.id}
                      id={person.id}
                      name={person.name}
                      role={person.role}
                      skills={person.skills || []}
                      values={person.values || []}
                      lastContactAt={person.lastContactAt}
                      projects={person.projects || []}
                      onClick={() => window.location.href = `/people/${person.id}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 公開設定 */}
        <section className="mb-10">
          <PublishToggle
            isPublic={hypothesis.is_public}
            onToggle={handlers.handleTogglePublic}
            disabled={updateMutation.isPending}
          />
        </section>
      </div>
    </div>
  );
}
