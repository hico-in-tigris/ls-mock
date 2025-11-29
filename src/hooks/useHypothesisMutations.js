/**
 * useHypothesisMutations - 仮説詳細ページで使用するAI生成mutations
 * HypothesisDetail.jsxから分離したカスタムフック
 */

import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/apiClient';

/**
 * 事業計画生成のmutation
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} mutationオブジェクト
 */
export function useBusinessPlanGeneration(hypothesis, hypothesisId, updateMutation) {
  return useMutation({
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

## 1. 事業の目的
この事業が解決する課題と目指す状態

## 2. 対象者
誰の課題を解決するのか、具体的に

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
}

/**
 * 構造化された問い生成のmutation
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} mutationオブジェクト
 */
export function useQuestionGeneration(hypothesis, hypothesisId, updateMutation) {
  return useMutation({
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
}

/**
 * 回答サマリー生成のmutation
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} mutationオブジェクト
 */
export function useSummaryGeneration(hypothesis, hypothesisId, updateMutation) {
  return useMutation({
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
}

/**
 * 心の揺れタグ生成のmutation
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} mutationオブジェクト
 */
export function useEmotionalTagsGeneration(hypothesis, hypothesisId, updateMutation) {
  return useMutation({
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
}

/**
 * 次のアクションを促す問い生成のmutation
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} mutationオブジェクト
 */
export function useNextPromptGeneration(hypothesis, hypothesisId, updateMutation) {
  return useMutation({
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
}

