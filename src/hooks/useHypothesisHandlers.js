/**
 * useHypothesisHandlers - 仮説詳細ページのイベントハンドラー
 * HypothesisDetail.jsxから分離したカスタムフック
 */

/**
 * 仮説詳細ページで使用するイベントハンドラーを生成
 * @param {object} hypothesis - 仮説データ
 * @param {string} hypothesisId - 仮説ID
 * @param {function} updateMutation - 更新mutation
 * @returns {object} ハンドラー関数のオブジェクト
 */
export function useHypothesisHandlers(hypothesis, hypothesisId, updateMutation) {
  // ID生成ヘルパー
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 回答があるかチェック
  const hasAnswers = () => {
    const sq = hypothesis?.structured_questions || {};
    return ['target', 'background', 'perspective'].some(section => {
      const questions = sq[section] || [];
      return questions.some(q => q.answer?.trim());
    });
  };

  // サマリー確認（次の問い生成も実行）
  const handleConfirmSummary = (onGenerateNextPrompt) => {
    updateMutation.mutate({
      id: hypothesisId,
      data: { summary_confirmed: true }
    }, {
      onSuccess: () => {
        if (onGenerateNextPrompt) {
          onGenerateNextPrompt();
        }
      }
    });
  };

  // サマリーに補足追加（サマリー再生成も実行）
  const handleAddClarification = (clarification, onRegenerateSummary) => {
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
        if (onRegenerateSummary) {
          onRegenerateSummary();
        }
      }
    });
  };

  // 公開状態の切り替え
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

  // 問いの更新
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

  // インサイトを行動メモに変換
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

  // 行動メモの追加
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

  // 行動メモの削除
  const handleDeleteMemo = (memoId) => {
    const updatedMemos = (hypothesis.action_memos || []).filter(m => m.id !== memoId);
    updateMutation.mutate({
      id: hypothesisId,
      data: { action_memos: updatedMemos }
    });
  };

  // 行動メモをアクションに変換
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

  // アクションのステータス変更
  const handleActionStatusChange = (actionId, newStatus) => {
    const updatedActions = (hypothesis.actions || []).map(a => 
      a.id === actionId ? { ...a, status: newStatus } : a
    );
    updateMutation.mutate({
      id: hypothesisId,
      data: { actions: updatedActions }
    });
  };

  // 検証ログの追加
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

  // ステータス変更
  const handleStatusChange = (status) => {
    updateMutation.mutate({
      id: hypothesisId,
      data: { status }
    });
  };

  return {
    hasAnswers,
    handleConfirmSummary,
    handleAddClarification,
    handleTogglePublic,
    handleSaveFromPrompt,
    handleQuestionUpdate,
    handleConvertInsight,
    handleAddMemo,
    handleDeleteMemo,
    handleConvertToAction,
    handleActionStatusChange,
    handleAddVerification,
    handleStatusChange
  };
}

