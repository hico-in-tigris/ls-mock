/**
 * plan-editor-workspace.js
 * ワークスペース選択・管理ロジック
 */
(function(){
  'use strict';

  let activeWorkspace = null;

  // ワークスペース選択画面のレンダリング
  window.renderWorkspaceSelector = function() {
    const currentDraft = window.currentDraft;
    const projectName = window.projectName;
    
    return `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">詳細ワークスペース</h1>
            <p class="text-muted-foreground">各ステップで深掘りして計画をブラッシュアップしましょう</p>
          </div>
          <div class="flex gap-2">
            ${currentDraft ? `
              <button onclick="backToSimpleEditor()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                シンプル編集へ戻る
              </button>
            ` : `
              <button onclick="switchToLightMode()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                ライトモードに切替
              </button>
              <button onclick="backToModeSelector()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                モード選択へ戻る
              </button>
            `}
          </div>
        </div>
        
        <!-- プロジェクト名（ワークスペース開始時にも設定可能） -->
        <div class="bg-muted/40 rounded-lg p-4">
          <label class="block text-sm font-medium mb-1">プロジェクト名</label>
          <input id="project-name-ws" type="text" class="w-full h-9 rounded-md border border-input px-3" placeholder="例: ○○エリア活性化プロジェクト" value="${(currentDraft && currentDraft.title) ? currentDraft.title : (projectName || '')}" oninput="updateProjectName(this.value)" />
          <p class="text-xs text-muted-foreground mt-1">いつでも変更できます（保存不要）。</p>
        </div>

        <!-- ワークスペース選択カード -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- アイデア整理 -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'ideation' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('ideation')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>' ,
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">アイデア整理</h3>
              <p class="text-sm text-muted-foreground mb-4">想いを構造化し、課題・解決策・対象者・効果を明確にします</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'ideation' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'ideation' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'ideation' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 企画構成 -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'planning' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('planning')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">企画構成</h3>
              <p class="text-sm text-muted-foreground mb-4">5W1Hで企画を整理し、実行可能な形に落とし込みます</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'planning' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'planning' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'planning' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 目標設定 -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'goal-setting' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('goal-setting')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' ,
              </div>
              <h3 class="text-lg font-semibold mb-2">目標設定</h3>
              <p class="text-sm text-muted-foreground mb-4">SMART目標とKPIで成功指標を明確にします</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'goal-setting' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'goal-setting' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'goal-setting' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 関係者分析 -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'stakeholder' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('stakeholder')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">関係者分析</h3>
              <p class="text-sm text-muted-foreground mb-4">ステークホルダーを特定し、影響力と関心度を分析します</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'stakeholder' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'stakeholder' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'stakeholder' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 提案作成 -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'proposal' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('proposal')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">提案作成</h3>
              <p class="text-sm text-muted-foreground mb-4">分析結果をもとに説得力のある提案書を作成します</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'proposal' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'proposal' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'proposal' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 予算・スケジュール -->
          <div class="card hover:shadow-lg transition-shadow cursor-pointer ${activeWorkspace === 'budget' ? 'ring-2 ring-primary' : ''}" onclick="toggleWorkspaceModule('budget')">
            <div class="p-6">
              <div class="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
              </div>
              <h3 class="text-lg font-semibold mb-2">予算・スケジュール</h3>
              <p class="text-sm text-muted-foreground mb-4">予算計画とタイムラインを作成します</p>
              <div class="flex items-center text-sm ${activeWorkspace === 'budget' ? 'text-primary font-medium' : 'text-muted-foreground'}">
                ${activeWorkspace === 'budget' ? '開いています' : '開く'}
                <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${activeWorkspace === 'budget' ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- インラインワークスペース表示エリア -->
        <div id="inline-workspace-container"></div>

        <!-- ヒント -->
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="text-sm text-blue-900">
              <p class="font-medium mb-1">各ワークスペースで計画を深掘りできます</p>
              <p class="text-blue-800">AI下書きをベースに、それぞれの観点から詳細を詰めていきましょう。いつでもシンプル編集に戻れます。</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // モード切替関数
  window.backToSimpleEditor = function() {
    window.setCurrentMode('simple');
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  window.switchToLightMode = function() {
    window.setCurrentMode('simple');
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  window.backToModeSelector = function() {
    window.setCurrentMode(null);
    window.currentDraft = null;
    window.projectName = '';
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  // ワークスペースモジュールのトグル表示
  window.toggleWorkspaceModule = function(module) {
    // 状態を更新（同じものなら閉じる）
    activeWorkspace = (activeWorkspace === module) ? null : module;

    // ワークスペース選択画面を再描画してアクティブ状態を反映
    const container = document.getElementById('main-content');
    container.innerHTML = window.renderWorkspaceSelector();

    // 再描画後のDOMに対してインラインワークスペースを描画
    if (activeWorkspace) {
      renderInlineWorkspace(activeWorkspace);
      // 予算ワークスペース初期化フック（リスト/合計の初期描画）
      if (activeWorkspace === 'budget' && typeof window.renderBudgetLists === 'function') {
        try {
          window.renderBudgetLists();
        } catch (e) {
          console.warn('Failed to initialize budget lists on first render', e);
        }
      }
      // インラインエリアまでスムーズスクロール
      const inline = document.getElementById('inline-workspace-container');
      inline?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // インラインワークスペースの描画
  function renderInlineWorkspace(module) {
    const container = document.getElementById('inline-workspace-container');
    
    const palette = {
      blue:   { bg:'bg-blue-100',   text:'text-blue-600',   grad:'from-blue-500 to-blue-400' },
      green:  { bg:'bg-green-100',  text:'text-green-600',  grad:'from-green-500 to-green-400' },
      purple: { bg:'bg-purple-100', text:'text-purple-600', grad:'from-purple-500 to-purple-400' },
      orange: { bg:'bg-orange-100', text:'text-orange-600', grad:'from-orange-500 to-orange-400' },
      indigo: { bg:'bg-indigo-100', text:'text-indigo-600', grad:'from-indigo-500 to-indigo-400' },
      yellow: { bg:'bg-yellow-100', text:'text-yellow-600', grad:'from-yellow-500 to-yellow-400' },
    };

    const moduleConfig = {
      ideation: {
        title: 'アイデア整理ワークスペース',
        subtitle: '想い・課題・対象・効果を整理',
        color: 'blue',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>' ,
        content: window.renderIdeationWorkspace ? window.renderIdeationWorkspace() : '',
      },
      planning: {
        title: '企画構成ワークスペース',
        subtitle: 'フレームワークで多面的に整理',
        color: 'green',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
        content: window.renderPlanningWorkspace ? window.renderPlanningWorkspace() : '',
      },
      'goal-setting': {
        title: '目標設定ワークスペース',
        subtitle: 'ゴール・KPI・マイルストーン',
        color: 'purple',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' ,
        content: window.renderGoalWorkspace ? window.renderGoalWorkspace() : '',
      },
      stakeholder: {
        title: '関係者分析ワークスペース',
        subtitle: '関係者・期待・懸念・影響度',
        color: 'orange',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
        content: window.renderStakeholderWorkspace ? window.renderStakeholderWorkspace() : '',
      },
      proposal: {
        title: '提案作成ワークスペース',
        subtitle: '背景・提案内容・効果・リスク',
        color: 'indigo',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
        content: window.renderProposalWorkspace ? window.renderProposalWorkspace() : '',
      },
      budget: {
        title: '予算・スケジュールワークスペース',
        subtitle: '収入・支出・収支を整理',
        color: 'yellow',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        content: window.renderBudgetWorkspace ? window.renderBudgetWorkspace() : '',
      }
    };

    const cfg = moduleConfig[module];
    if (!cfg) return;
    
    const col = palette[cfg.color] || palette.blue;
    
    container.innerHTML = `
      <div class="mt-8 border rounded-lg shadow-sm overflow-hidden animate-fade-in">
        <div class="h-1.5 bg-gradient-to-r ${col.grad}"></div>
        <div class="p-5 border-b">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg ${col.bg} ${col.text} flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">${cfg.icon}</svg>
              </div>
              <div>
                <h2 class="text-lg md:text-xl font-bold">${cfg.title}</h2>
                <p class="text-xs md:text-sm text-muted-foreground">${cfg.subtitle||''}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="handleWorkspaceSave('${module}')" class="btn-secondary">保存</button>
              <button onclick="aiPolishWorkspace('${module}')" class="btn">AIにブラッシュアップ</button>
              <button onclick="goToNextWorkspaceModule()" class="btn-primary">次のステップへ</button>
            </div>
          </div>
        </div>
        <div class="p-5 bg-white">
          ${cfg.content}
          <div class="mt-6 bg-muted/40 border-l-4 border-muted p-4 rounded-r">
            <div class="flex items-start gap-2 text-muted-foreground text-xs md:text-sm">
              <svg class="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p>入力内容は画面上の保存ボタンで一時保存できます。後からいつでも編集可能です。</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 保存処理（現状は通知のみ、将来的にcurrentDraftへ書き込み）
  window.handleWorkspaceSave = function(moduleKey) {
    const mod = moduleKey || activeWorkspace;
    // TODO: 各モジュールのフォーム値を取得してcurrentDraftへ保存
    if (typeof showNotification === 'function') {
      showNotification('保存しました', 'success');
    }
  };

  // プロジェクト名の更新（ワークスペース/共通）
  window.updateProjectName = function(val){
    window.projectName = (val || '').trim();
    if (window.currentDraft) {
      window.currentDraft.title = window.projectName || undefined;
    }
  };

  // 次のステップへ進む（モジュール順に切り替え）
  window.goToNextWorkspaceModule = function() {
    const order = ['ideation','planning','goal-setting','stakeholder','proposal','budget'];
    const idx = order.indexOf(activeWorkspace);
    const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
    if (next) {
      window.toggleWorkspaceModule(next);
    } else {
      if (typeof showNotification === 'function') {
        showNotification('全てのステップが完了しました', 'success');
      }
    }
  };

  // AIブラッシュアップ: 現在のモジュールに応じた提案を画面内に生成（非破壊）
  window.aiPolishWorkspace = function(moduleKey) {
    const mod = moduleKey || activeWorkspace;
    const root = document.getElementById('inline-workspace-container');
    if (!root) return;

    // 既存の提案を一旦削除
    root.querySelectorAll('.ai-suggestion-box').forEach(el => el.remove());

    const suggestions = getAISuggestionsForModule(mod);
    const wrap = root.querySelector('.p-5.bg-white') || root;

    const box = document.createElement('div');
    box.className = 'ai-suggestion-box mt-4 p-4 rounded-lg border bg-muted/40';
    box.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="text-sm font-medium">AIの提案</div>
        <button class="text-xs text-muted-foreground hover:text-foreground" onclick="this.closest('.ai-suggestion-box').remove()">閉じる</button>
      </div>
      <ul class="list-disc pl-5 text-sm text-muted-foreground space-y-1">
        ${suggestions.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="mt-2 text-xs text-muted-foreground">提案は参考用です。必要なものだけ取り入れてください。</div>
    `;
    wrap.appendChild(box);
    if (typeof showNotification === 'function') {
      showNotification('AIが提案を作成しました', 'success');
    }
  };

  function getAISuggestionsForModule(mod) {
    const common = [
      '曖昧な表現は具体的な数字や期間に置き換えましょう（例: 早め → 2週間以内）。',
      '対象者や範囲を明確にしましょう（例: 地域住民 → 町内会B地区の高齢者）。',
      '実行順序と担当を明文化すると実践しやすくなります。'
    ];
    const byModule = {
      ideation: [
        '「課題 → 解決策 → 期待効果」の流れで1〜3行に要約してみましょう。',
        '既存の取り組みとの差分（ユニークさ）を一言で示しましょう。'
      ],
      planning: [
        '選んだフレームワークの空欄に最低1つずつ記入し、抜けを可視化しましょう。',
        '5W1Hなら「いつ・どこで・誰が・何を・なぜ・どうやって」を1文ずつ。'
      ],
      'goal-setting': [
        'KPIは「指標・目標値・期限・測定方法」をセットで記載しましょう。',
        'マイルストーンは四半期ごとに1〜2個に絞ると実行管理しやすいです。'
      ],
      stakeholder: [
        'ステークホルダーごとに「期待・懸念・影響度・関与方法」を1行で整理。',
        '対立が起きた場合の調整ルール（エスカレーション先）を決めておきましょう。'
      ],
      proposal: [
        '背景→課題→解決策→実施計画→効果→リスク→体制→予算の見出しで構成。',
        '読み手の意思決定に必要な根拠（データ・事例）を1つ添えましょう。'
      ],
      budget: [
        '収入と支出は月次と年次の2軸で整理し、前提（単価・数量）を明記。',
        'キャッシュがマイナスになる月の対策（支払いサイト・助成金）を検討。'
      ]
    };
    return [...(byModule[mod] || []), ...common];
  }

  // アイデア整理ワークスペースの描画
  window.renderIdeationWorkspace = function() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">実現したいこと</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="どんな想いや課題意識からこのプロジェクトを始めようと思いましたか？"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">解決したい課題</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="具体的にどのような課題を解決したいですか？"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">対象者・受益者</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="誰のための取り組みですか？"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">期待される効果</label>
            <textarea class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="実現したらどんな変化が生まれますか？"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn-secondary" onclick="handleWorkspaceSave()">保存</button>
            <button class="btn" onclick="aiPolishWorkspace()">AIにブラッシュアップ</button>
            <button class="btn-primary" onclick="goToNextWorkspaceModule()">次のステップへ</button>
          </div>
        </div>
      </div>
    `;
  };

  // 予算・スケジュールワークスペースの描画
  window.renderBudgetWorkspace = function() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <!-- 目標月収シミュレーター -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-r">
            <div class="flex items-start gap-3 mb-4">
              <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <div class="flex-1">
                <h3 class="font-semibold text-green-900 mb-2">💰 目標月収シミュレーター</h3>
                <p class="text-sm text-green-800 mb-3">月にいくら稼ぎたいか入力すると、必要な売上と利用者数を自動計算します</p>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-green-900 mb-2">目標月収（粗利）</label>
                    <div class="relative">
                      <input 
                        type="number" 
                        id="target-monthly-income" 
                        class="w-full px-3 py-2 pr-12 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="300000"
                        oninput="simulateFromTarget()"
                      />
                      <span class="absolute right-3 top-2 text-green-700 font-medium">円/月</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-green-900 mb-2">事業モデル</label>
                    <select id="business-model-select" class="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onchange="simulateFromTarget()">
                      <option value="">選択してください</option>
                      <option value="coworking">コワーキングスペース</option>
                      <option value="guesthouse">ゲストハウス</option>
                      <option value="cafe">カフェ・飲食店</option>
                      <option value="event">イベント事業</option>
                      <option value="tour">観光ツアー</option>
                      <option value="consulting">コンサル・サービス</option>
                      <option value="subscription">サブスク・会員制</option>
                    </select>
                  </div>
                </div>

                <div id="simulation-result" class="mt-4 hidden">
                  <div class="bg-white rounded-lg p-4 border border-green-200">
                    <div class="text-sm font-medium text-green-900 mb-3">📊 シミュレーション結果</div>
                    <div id="simulation-content" class="space-y-2 text-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium">収入計画</h3>
              <button onclick="addBudgetRow('income')" class="text-sm text-primary hover:underline">+ 収入項目を追加</button>
            </div>
            <div id="income-list" class="space-y-2">
              <!-- 収入項目が動的に追加される -->
            </div>
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium">支出計画</h3>
              <button onclick="addBudgetRow('expense')" class="text-sm text-primary hover:underline">+ 支出項目を追加</button>
            </div>
            <div id="expense-list" class="space-y-2">
              <!-- 支出項目が動的に追加される -->
            </div>
          </div>
          
          <div class="border-t pt-4">
            <div class="grid md:grid-cols-3 gap-4 text-center">
              <div class="bg-blue-50 rounded-lg p-4">
                <div class="text-xs text-blue-700 mb-1">総収入</div>
                <div id="total-income" class="text-2xl font-bold text-blue-900">¥0</div>
              </div>
              <div class="bg-red-50 rounded-lg p-4">
                <div class="text-xs text-red-700 mb-1">総支出</div>
                <div id="total-expense" class="text-2xl font-bold text-red-900">¥0</div>
              </div>
              <div class="bg-green-50 rounded-lg p-4">
                <div class="text-xs text-green-700 mb-1">収支（粗利）</div>
                <div id="net-profit" class="text-2xl font-bold text-green-900">¥0</div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end gap-2">
            <button class="btn-secondary" onclick="handleWorkspaceSave()">保存</button>
            <button class="btn">収支表をエクスポート</button>
          </div>
        </div>
      </div>
    `;
  };

})();
