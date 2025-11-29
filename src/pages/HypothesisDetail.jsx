import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import { recommendPeopleForHypothesis } from '@/api/integrations';
import PeopleCard from '@/components/people/PeopleCard';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HypothesisDetail() {
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const hypothesisId = urlParams.get('id');

  const { data: hypothesis, isLoading } = useQuery({
    queryKey: ['hypothesis', hypothesisId],
    queryFn: () => base44.entities.Hypothesis.get(hypothesisId),
    enabled: !!hypothesisId
  });

  const { data: recommendedPeople = [] } = useQuery({
    queryKey: ['recommendedPeople', hypothesisId],
    queryFn: () => recommendPeopleForHypothesis(hypothesisId),
    enabled: !!hypothesisId
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Hypothesis.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hypothesis', hypothesisId] });
      queryClient.invalidateQueries({ queryKey: ['hypotheses'] });
    }
  });

  const generateBusinessPlanMutation = useMutation({
    mutationFn: async () => {
      // 回答データを収集
      const sq = hypothesis.structured_questions || {};
      const answersText = ['target', 'background', 'perspective'].map(section => {
        const questions = sq[section] || [];
        const answered = questions.filter(q => q.answer?.trim());
        if (answered.length === 0) return '';
        const sectionLabel = { target: 'ターゲット', background: '背景', perspective: '検証の切り口' }[section];
        return `【${sectionLabel}についての回答】\n` + answered.map(q => 
          `Q: ${q.question}\nA: ${q.answer}${q.insight ? `\n気づき: ${q.insight}` : ''}`
        ).join('\n\n');
      }).filter(Boolean).join('\n\n');

      // アクションと検証ログを収集
      const actionsText = (hypothesis.actions || []).map(a => {
        const logs = (a.verifications || []).map(v => `  - ${v.content}`).join('\n');
        return `・${a.content}（${a.status === 'done' ? '完了' : a.status === 'running' ? '検証中' : '未開始'}）${logs ? '\n  検証ログ:\n' + logs : ''}`;
      }).join('\n');

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたは地域おこし協力隊の事業計画策定を支援する専門家です。

以下の仮説と検証データを元に、事業計画のドラフトを作成してください。

【仮説】
タイトル: ${hypothesis.title}
ターゲット: ${hypothesis.target || '未設定'}
背景: ${hypothesis.background || '未設定'}
検証の切り口: ${hypothesis.perspective || '未設定'}
元の想い: ${hypothesis.original_input || ''}

【問いへの回答】
${answersText || 'まだ回答がありません'}

【アクション・検証ログ】
${actionsText || 'まだアクションがありません'}

---

以下の構成で事業計画ドラフトを作成してください（Markdown形式）：

# 事業計画ドラフト

## 1. プロジェクト概要
協力隊としての事業概要を1〜2段落で

## 2. 現状の課題
仮説の背景やターゲットが抱える課題を整理

## 3. 提供する価値
この事業が地域・対象者に提供できる価値

## 4. 行動計画
検証データを元にした具体的なアクションプラン

## 5. 将来的な展望
この仮説が検証された場合の発展可能性

---
注意：
- 協力隊らしい地域密着の視点を大切に
- 検証データに基づいた現実的な内容に
- 専門用語は避け、わかりやすい表現で
- 各セクションは簡潔に（2〜4文程度）`,
        response_json_schema: {
          type: "object",
          properties: {
            plan: { type: "string" }
          }
        }
      });
      return response.plan;
    },
    onSuccess: (plan) => {
      updateMutation.mutate({
        id: hypothesisId,
        data: { business_plan_draft: plan }
      });
    }
  });

  const generateQuestionsMutation = useMutation({
    mutationFn: async () => {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたは地域おこし協力隊の思考整理を支援するコーチです。

以下の仮説について、3つの観点（ターゲット・背景・検証の切り口）それぞれに対して、2〜3個ずつの「問い」を生成してください。

【仮説】
タイトル: ${hypothesis.title}
ターゲット: ${hypothesis.target || '未設定'}
背景: ${hypothesis.background || '未設定'}
検証の切り口: ${hypothesis.perspective || '未設定'}

【重要なルール】
- 行動案や解決策を直接提示しないでください
- ユーザーが自分で答えを見つけられるような「問いかけ」を生成してください
- 問いは具体的で、答えやすいものにしてください

【各観点での問いの方向性】
■ ターゲットについて
- その人の行動パターンや習慣
- どんな瞬間に困りごとが生まれるか
- 本人が言葉にしていない潜在的なニーズ

■ 背景について  
- なぜこの状況が起きているのか
- 地域の文脈や歴史的経緯
- 自分自身の経験との接点

■ 検証の切り口について
- 最短で試せる小さな行動
- 仮説が間違っていた場合の兆候
- 誰に聞けば確かめられるか`,
        response_json_schema: {
          type: "object",
          properties: {
            target: {
              type: "array",
              items: {
                type: "object",
                properties: { question: { type: "string" } }
              }
            },
            background: {
              type: "array",
              items: {
                type: "object",
                properties: { question: { type: "string" } }
              }
            },
            perspective: {
              type: "array",
              items: {
                type: "object",
                properties: { question: { type: "string" } }
              }
            }
          }
        }
      });
      return response;
    },
    onSuccess: (data) => {
      const structured = {
        target: (data.target || []).map(q => ({ question: q.question, answer: '', insight: '' })),
        background: (data.background || []).map(q => ({ question: q.question, answer: '', insight: '' })),
        perspective: (data.perspective || []).map(q => ({ question: q.question, answer: '', insight: '' }))
      };
      updateMutation.mutate({
        id: hypothesisId,
        data: { structured_questions: structured }
      });
    }
  });

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 回答サマリー生成
  const generateSummaryMutation = useMutation({
    mutationFn: async () => {
      const sq = hypothesis.structured_questions || {};
      const allAnswers = ['target', 'background', 'perspective'].flatMap(section => {
        const questions = sq[section] || [];
        return questions
          .filter(q => q.answer?.trim())
          .map(q => `Q: ${q.question}\nA: ${q.answer}`);
      });

      if (allAnswers.length === 0) {
        throw new Error('回答がありません');
      }

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたはコーチとして、ユーザーの回答内容を理解し、確認するための要約を作成します。

以下はユーザーが仮説について考えた回答です：

【仮説】
タイトル: ${hypothesis.title}
ターゲット: ${hypothesis.target || '未設定'}
背景: ${hypothesis.background || '未設定'}

【ユーザーの回答】
${allAnswers.join('\n\n')}

---

上記の回答を踏まえて、「つまり〜という理解で合っていますか？」という形式で1〜2文の要約を作成してください。
- ユーザーの言葉を尊重しつつ、本質を捉えた要約にしてください
- 行動案や解決策は提示しないでください
- 確認の問いかけとして終えてください`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" }
          }
        }
      });
      return response.summary;
    },
    onSuccess: (summary) => {
      updateMutation.mutate({
        id: hypothesisId,
        data: { answer_summary: summary, summary_confirmed: false }
      });
    }
  });

  // 心の揺れタグ生成
  const generateEmotionalTagsMutation = useMutation({
    mutationFn: async () => {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたは地域おこし協力隊の心理を深く理解するカウンセラーです。

以下の仮説から、この隊員が抱えている「心の揺れ」「モヤモヤの本質」を2〜4個のタグとして抽出してください。

【仮説】
タイトル: ${hypothesis.title}
元の想い: ${hypothesis.original_input}
ターゲット: ${hypothesis.target || '未設定'}
背景: ${hypothesis.background || '未設定'}

【タグの例】
- 任期後の不安
- 地域での役割が見えない
- スキルと情熱のズレ
- 住民との距離感
- 成果が見えない焦り
- 自分の強みがわからない
- 情報発信の壁

短く端的なタグにしてください。`,
        response_json_schema: {
          type: "object",
          properties: {
            tags: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });
      return response.tags;
    },
    onSuccess: (tags) => {
      updateMutation.mutate({
        id: hypothesisId,
        data: { emotional_tags: tags }
      });
    }
  });

  // 次のアクションを促す問い生成
  const generateNextPromptMutation = useMutation({
    mutationFn: async () => {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `あなたはコーチとして、ユーザーが次の一歩を自分で考えられるよう促す「問い」を投げかけます。

【仮説】
タイトル: ${hypothesis.title}
ターゲット: ${hypothesis.target || '未設定'}
背景: ${hypothesis.background || '未設定'}

【ユーザーの理解（確認済み）】
${hypothesis.answer_summary || ''}

---

上記を踏まえて、ユーザーが次の行動を自分で考えられるような「問いかけ」を1つ作成してください。

重要なルール：
- 行動案や解決策を提示しないでください
- 「では、〜」で始まる問いかけにしてください
- ユーザーが自分で答えを見つけられるような、開かれた問いにしてください
- 1文で簡潔に`,
        response_json_schema: {
          type: "object",
          properties: {
            prompt: { type: "string" }
          }
        }
      });
      return response.prompt;
    },
    onSuccess: (prompt) => {
      updateMutation.mutate({
        id: hypothesisId,
        data: { next_action_prompt: prompt }
      });
    }
  });

  // 回答があるかチェック
  const hasAnswers = () => {
    const sq = hypothesis?.structured_questions || {};
    return ['target', 'background', 'perspective'].some(section => 
      (sq[section] || []).some(q => q.answer?.trim())
    );
  };

  // サマリー確認
  const handleConfirmSummary = () => {
    updateMutation.mutate({
      id: hypothesisId,
      data: { summary_confirmed: true }
    }, {
      onSuccess: () => {
        generateNextPromptMutation.mutate();
      }
    });
  };

  // 補足追加
  const handleAddClarification = (clarification) => {
    // 補足を背景セクションの追加回答として保存し、サマリーを再生成
    const current = hypothesis.structured_questions || {};
    const bgQuestions = [...(current.background || [])];
    bgQuestions.push({
      question: '補足・修正',
      answer: clarification,
      insight: ''
    });
    
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        structured_questions: { ...current, background: bgQuestions },
        answer_summary: null,
        summary_confirmed: false
      }
    }, {
      onSuccess: () => {
        generateSummaryMutation.mutate();
      }
    });
  };

  // 公開設定の切り替え
  const handleTogglePublic = (isPublic) => {
    updateMutation.mutate({
      id: hypothesisId,
      data: { is_public: isPublic }
    });
  };

  // NextActionPrompt から行動メモを保存
  const handleSaveFromPrompt = (content) => {
    const newMemo = {
      id: generateId(),
      content,
      created_at: new Date().toISOString()
    };
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        action_memos: [...(hypothesis.action_memos || []), newMemo]
      }
    });
  };

  const handleQuestionUpdate = (section, index, field, value) => {
    const current = hypothesis.structured_questions || {};
    const sectionQuestions = [...(current[section] || [])];
    sectionQuestions[index] = { ...sectionQuestions[index], [field]: value };
    
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        structured_questions: { ...current, [section]: sectionQuestions }
      }
    });
  };

  const handleConvertInsight = (content) => {
    const newMemo = {
      id: generateId(),
      content,
      created_at: new Date().toISOString()
    };
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        action_memos: [...(hypothesis.action_memos || []), newMemo]
      }
    });
  };

  const handleAddMemo = (content) => {
    const newMemo = {
      id: generateId(),
      content,
      created_at: new Date().toISOString()
    };
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        action_memos: [...(hypothesis.action_memos || []), newMemo]
      }
    });
  };

  const handleDeleteMemo = (memoId) => {
    const updatedMemos = (hypothesis.action_memos || []).filter(m => m.id !== memoId);
    updateMutation.mutate({
      id: hypothesisId,
      data: { action_memos: updatedMemos }
    });
  };

  const handleConvertToAction = (memoId) => {
    const memo = (hypothesis.action_memos || []).find(m => m.id === memoId);
    if (!memo) return;

    const newAction = {
      id: generateId(),
      content: memo.content,
      status: 'running',
      verifications: [],
      created_at: new Date().toISOString()
    };

    const updatedMemos = (hypothesis.action_memos || []).filter(m => m.id !== memoId);
    
    updateMutation.mutate({
      id: hypothesisId,
      data: { 
        action_memos: updatedMemos,
        actions: [...(hypothesis.actions || []), newAction],
        status: hypothesis.status === 'unverified' ? 'verifying' : hypothesis.status
      }
    });
  };

  const handleActionStatusChange = (actionId, newStatus) => {
    const updatedActions = (hypothesis.actions || []).map(a => 
      a.id === actionId ? { ...a, status: newStatus } : a
    );
    updateMutation.mutate({
      id: hypothesisId,
      data: { actions: updatedActions }
    });
  };

  const handleAddVerification = (actionId, content) => {
    const newLog = {
      id: generateId(),
      content,
      created_at: new Date().toISOString()
    };

    const updatedActions = (hypothesis.actions || []).map(a => 
      a.id === actionId 
        ? { ...a, verifications: [...(a.verifications || []), newLog] }
        : a
    );
    updateMutation.mutate({
      id: hypothesisId,
      data: { actions: updatedActions }
    });
  };

  const handleStatusChange = (status) => {
    updateMutation.mutate({
      id: hypothesisId,
      data: { status }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

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
        {/* Header */}
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
              onValueChange={handleStatusChange}
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

        {/* Section 1: 仮説の概要 */}
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

        {/* Section 2: 構造化された問い */}
        <section className="mb-10">
          <h2 className="text-base font-medium text-slate-800 mb-6">
            思考を深める問い
          </h2>
          <StructuredQuestions
            hypothesis={hypothesis}
            structuredQuestions={hypothesis.structured_questions || {}}
            onQuestionUpdate={handleQuestionUpdate}
            onConvertInsight={handleConvertInsight}
            onGenerateQuestions={() => generateQuestionsMutation.mutate()}
            isLoading={updateMutation.isPending}
            isGenerating={generateQuestionsMutation.isPending}
          />

          {/* 回答サマリー生成ボタン */}
          {hasAnswers() && !hypothesis.answer_summary && !generateSummaryMutation.isPending && (
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

        {/* Section 2.5: 回答サマリー */}
        {(hypothesis.answer_summary || generateSummaryMutation.isPending) && (
          <section className="mb-10">
            <AnswerSummary
              summary={hypothesis.answer_summary}
              isGenerating={generateSummaryMutation.isPending}
              onConfirm={handleConfirmSummary}
              onAddClarification={handleAddClarification}
              isConfirmed={hypothesis.summary_confirmed}
            />
          </section>
        )}

        {/* Section 2.6: 次のアクションを促す問い */}
        {hypothesis.summary_confirmed && (
          <section className="mb-10">
            <NextActionPrompt
              promptQuestion={hypothesis.next_action_prompt}
              isGenerating={generateNextPromptMutation.isPending}
              onSaveActionMemo={handleSaveFromPrompt}
              isSaving={updateMutation.isPending}
            />
          </section>
        )}

        <Separator className="my-8" />

        {/* Section 3: 行動メモ (Inbox) */}
        <section className="mb-10">
          <ActionMemoInbox
            memos={hypothesis.action_memos || []}
            onAddMemo={handleAddMemo}
            onDeleteMemo={handleDeleteMemo}
            onConvertToAction={handleConvertToAction}
          />
        </section>

        <Separator className="my-8" />

        {/* Section 4: アクション一覧 */}
        <section className="mb-10">
          <ActionList
            actions={hypothesis.actions || []}
            onStatusChange={handleActionStatusChange}
            onAddVerification={handleAddVerification}
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

        {/* Section 5: 事業計画ドラフト */}
        <section className="mb-10">
          <BusinessPlanGenerator
            hypothesis={hypothesis}
            onGenerate={() => generateBusinessPlanMutation.mutate()}
            isGenerating={generateBusinessPlanMutation.isPending}
            generatedPlan={hypothesis.business_plan_draft}
          />
        </section>

        <Separator className="my-8" />

        {/* Section 6: シンクロレコメンド */}
        <section className="mb-10">
          <SyncRecommendations
            hypothesis={hypothesis}
            onGenerateTags={() => generateEmotionalTagsMutation.mutateAsync()}
          />
        </section>

        <Separator className="my-8" />

        {/* Section 7: この仮説に関わりそうな人（PeopleOS連動） */}
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
            onToggle={handleTogglePublic}
            disabled={updateMutation.isPending}
          />
        </section>
      </div>
    </div>
  );
}