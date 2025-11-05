// Plan Editor - AI-First Approach
// Simple input → AI generates draft → User refines
(function(){
  
  let currentDraft = null;
  let currentMode = null; // 'simple' or 'workspace' or null
  // ライト/ワークスペース共通で使うプロジェクト名の一時保持
  let projectName = '';

  // plan-editor-light.js と plan-editor-workspace.js からアクセス可能にするため、getter/setter を提供
  Object.defineProperty(window, 'currentDraft', {
    get: function() { return currentDraft; },
    set: function(val) { currentDraft = val; }
  });
  Object.defineProperty(window, 'projectName', {
    get: function() { return projectName; },
    set: function(val) { projectName = val; }
  });
  window.setCurrentMode = function(mode) {
    currentMode = mode;
  };

  function renderPlanEditor(container){
    const hasDraft = currentDraft !== null;
    
    // モード選択画面を表示
    if (!currentMode && !hasDraft) {
      container.innerHTML = window.renderModeSelector();
      return;
    }
    
    container.innerHTML = `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold">企画室</h1>
            <p class="text-muted-foreground text-sm">
              ${currentMode === 'simple' ? '簡単な質問に答えるだけで、AIが事業計画の下書きを作成します' : '各ワークスペースで計画を深掘りして作成します'}
            </p>
          </div>
          ${hasDraft ? `
            <div class="flex gap-2">
              <button onclick="openDetailedWorkspace()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                </svg>
                詳細ワークスペースへ
              </button>
              <button onclick="exportPlanAsPDF()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                PDFエクスポート
              </button>
              <button onclick="startNewPlan()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                新規作成
              </button>
            </div>
          ` : ''}
        </div>

        ${!hasDraft ? window.renderInitialForm() : window.renderDraftEditor()}
      </div>
    `;

    attachEventListeners();
  }

  // ライトモードUIは plan-editor-light.js に分離
  // window.renderModeSelector, window.renderInitialForm, window.renderDraftEditor, window.renderPreview は外部モジュールで提供

  window.selectPlanningMode = function(mode) {
    currentMode = mode;
    if (mode === 'simple') {
      window.renderPlanEditor(document.getElementById('main-content'));
    } else if (mode === 'workspace') {
      const container = document.getElementById('main-content');
      container.innerHTML = renderWorkspaceSelector();
    }
  };

  function attachEventListeners() {
    // Toggle genre chips
    document.querySelectorAll('#genre-select [data-genre]')?.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        btn.classList.toggle('bg-accent');
        btn.classList.toggle('text-foreground');
        btn.classList.toggle('selected');
      });
    });
  }

  window.generateAIDraft = function() {
    const name = document.getElementById('project-name')?.value?.trim() || projectName || '';
    const idea = document.getElementById('business-idea')?.value;
    const target = document.getElementById('target-users')?.value;
    const value = document.getElementById('value-prop')?.value;
    const budget = document.getElementById('budget')?.value;
    const timeline = document.getElementById('timeline')?.value;
    const selectedGenres = Array.from(document.querySelectorAll('#genre-select [data-genre].selected')).map(el=> el.getAttribute('data-genre'));
    const overrides = {
      rooms: parseInt(document.getElementById('opt-rooms')?.value||'') || undefined,
      occRate: parseFloat(document.getElementById('opt-occ')?.value||'') || undefined,
      eventsPerMonth: parseInt(document.getElementById('opt-events')?.value||'') || undefined,
      participants: parseInt(document.getElementById('opt-participants')?.value||'') || undefined,
      toursPerMonth: parseInt(document.getElementById('opt-tours')?.value||'') || undefined,
      tourSize: parseInt(document.getElementById('opt-tour-size')?.value||'') || undefined,
    };

    // サンプルデータの準備（入力がない場合のデフォルト）
    const finalIdea = idea || '地域の空き家を活用したコワーキングスペースとゲストハウスの複合施設。リモートワーカーや移住希望者をターゲットに、仕事と地域体験の両方を提供する。';
    const finalTarget = target || '都市部からの移住を検討している30-40代のリモートワーカー、週末起業を考えているビジネスパーソン';
    const finalValue = value || '仕事に集中できる環境と地域コミュニティへのアクセス、移住前のお試し居住の機会';
    const finalGenres = selectedGenres.length > 0 ? selectedGenres : ['coworking', 'guesthouse'];

    const btn = document.getElementById('generate-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>AI生成中...';

    // Simulate AI generation (in real app, call API)
    setTimeout(() => {
      let financials = null;
      if (typeof window.PlanEstimator?.estimateFinancials === 'function' && finalGenres.length){
        try {
          financials = window.PlanEstimator.estimateFinancials(finalGenres, overrides);
        } catch(e){ console.warn('Estimator error', e); }
      }

      currentDraft = {
        title: name || undefined,
        overview: `${finalIdea}\n\n${finalValue}を通じて、地域活性化と移住促進に貢献します。${budget ? `初期投資額: ${budget}` : ''}${timeline ? `、開始予定: ${timeline}` : ''}`,
        target: finalTarget,
        revenue: financials ? `選択ジャンル: ${financials.meta.genres.join('、')}\n\n主な収益源（概算）:\n${financials.incomes.map(i=>`• ${i.label}: 約${i.monthly.toLocaleString()}円/月`).join('\n')}\n\n主な固定費（概算）:\n${financials.expenses.map(e=>`• ${e.label}: 約${(e.monthly||0).toLocaleString()}円/月`).join('\n')}\n\n概算粗利: 約${(financials.totals.profit).toLocaleString()}円/月` : `主な収益源:\n• コワーキングスペース月額会員費: 2万円/月\n• ゲストハウス宿泊費: 5,000円/泊\n• イベント・ワークショップ収益\n• 地域企業とのコラボレーション収益`,
        plan: `フェーズ1（準備期間: 6ヶ月）\n• 空き家物件の選定と契約\n• 改装工事の実施\n• 地域コミュニティとの関係構築\n\nフェーズ2（立ち上げ: 3ヶ月）\n• プレオープン・テストマーケティング\n• SNS・Webでの情報発信開始\n• 初期会員の獲得\n\nフェーズ3（本格運営）\n• グランドオープン\n• イベント・ワークショップの定期開催\n• 地域企業との連携強化`,
        genres: finalGenres,
        financials
      };
      projectName = name; // 一時名も同期
      
      window.renderPlanEditor(document.getElementById('main-content'));
      showNotification('AI下書きを生成しました。内容を確認して編集してください。', 'success');
    }, 2000);
  };

  window.saveDraftChanges = function() {
    currentDraft.overview = document.getElementById('edit-overview')?.value;
    currentDraft.target = document.getElementById('edit-target')?.value;
    currentDraft.revenue = document.getElementById('edit-revenue')?.value;
    currentDraft.plan = document.getElementById('edit-plan')?.value;
    
    document.getElementById('draft-preview').innerHTML = window.renderPreview();
    showNotification('変更を保存しました', 'success');
  };

  window.startNewPlan = function() {
    if (confirm('現在の内容を破棄して新しい計画を作成しますか?')) {
      currentDraft = null;
      currentMode = null;
      projectName = '';
      window.renderPlanEditor(document.getElementById('main-content'));
    }
  };

  window.exportPlanAsPDF = function() {
    showNotification('PDF出力機能は実装予定です', 'info');
  };

  // 詳細ワークスペースへの遷移
  window.openDetailedWorkspace = function() {
    const container = document.getElementById('main-content');
    currentMode = 'workspace';
    container.innerHTML = window.renderWorkspaceSelector();
  };

  // 各ワークスペースの描画関数
  // ※ ideation、planning、goal、proposal、budget → 外部モジュールに分離済み
  // ※ stakeholder → plan-editor-stakeholder.js に分離済み（renderStakeholderWorkspace は保持）

  window.openWorkspaceModule = function(module) {
    // 既存のプロジェクトモジュールを呼び出す
    if (typeof window.openIdeationWorkspace === 'function') {
      window.openIdeationWorkspace(module);
    } else {
      showNotification(`${module}ワークスペースは準備中です`, 'info');
    }
  };

  // ===== ステークホルダー管理機能 =====
  // ※ロジックは plan-editor-stakeholder.js に分離済み。
  // ここでは renderStakeholderWorkspace() のUIテンプレートのみ保持し、
  // 実際の動作は plan-editor-stakeholder.js が提供する window.* API に委譲。

  window.renderPlanEditor = renderPlanEditor;
})();
