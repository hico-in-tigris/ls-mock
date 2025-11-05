// Plan Editor - AI-First Approach
// Simple input → AI generates draft → User refines
(function(){
  
  let currentDraft = null;
  let currentMode = null; // 'simple' or 'workspace' or null
  // ライト/ワークスペース共通で使うプロジェクト名の一時保持
  let projectName = '';

  function renderPlanEditor(container){
    const hasDraft = currentDraft !== null;
    
    // モード選択画面を表示
    if (!currentMode && !hasDraft) {
      container.innerHTML = renderModeSelector();
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

        ${!hasDraft ? renderInitialForm() : renderDraftEditor()}
      </div>
    `;

    attachEventListeners();
  }

  function renderModeSelector() {
    return `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div>
          <h1 class="text-2xl font-bold">企画室</h1>
          <p class="text-muted-foreground">企画の作成方法を選んでください</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mt-8">
          <!-- ライトモード -->
          <div class="card hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary" onclick="selectPlanningMode('simple')">
            <div class="p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold mb-3">ライトに作成</h2>
              <p class="text-muted-foreground mb-6">簡単な質問に答えるだけで、AIが事業計画の下書きを自動生成します。すぐに企画を形にしたい方におすすめです。</p>
              
              <div class="space-y-2 mb-6">
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>3つの質問に答えるだけ</span>
                </div>
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>AI が財務概算も自動生成</span>
                </div>
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>後から詳細ワークスペースで深掘り可能</span>
                </div>
              </div>

              <div class="inline-flex items-center text-sm font-medium text-primary">
                このモードで始める
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- ワークスペースモード -->
          <div class="card hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary" onclick="selectPlanningMode('workspace')">
            <div class="p-8">
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center mb-6">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold mb-3">ワークスペースから開始</h2>
              <p class="text-muted-foreground mb-6">各ワークスペースで段階的に企画を作り込みます。じっくり練りたい方、複雑な企画におすすめです。</p>
              
              <div class="space-y-2 mb-6">
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>アイデア整理・目標設定など6つのツール</span>
                </div>
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>関係者分析・SMART目標など専門機能</span>
                </div>
                <div class="flex items-start gap-2 text-sm">
                  <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>好きな順番で必要な部分だけ作成</span>
                </div>
              </div>

              <div class="inline-flex items-center text-sm font-medium text-primary">
                このモードで始める
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 補足情報 -->
        <div class="bg-muted/50 rounded-lg p-4 mt-6">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="text-sm text-muted-foreground">
              <p class="font-medium text-foreground mb-1">どちらのモードでも</p>
              <p>いつでもモードを切り替えられます。ライトに始めて、必要に応じてワークスペースで詳細を詰めることも可能です。</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // モジュールごとの初期化フック
    // 予算ワークスペース: 初期表示時にリストと合計を描画（既存のUI挙動を維持）
    if (module === 'budget' && typeof window.renderBudgetLists === 'function') {
      try {
        window.renderBudgetLists();
      } catch (e) {
        console.warn('Failed to initialize budget lists on first render', e);
      }
    }
  }

  window.selectPlanningMode = function(mode) {
    currentMode = mode;
    if (mode === 'simple') {
      window.renderPlanEditor(document.getElementById('main-content'));
    } else if (mode === 'workspace') {
      const container = document.getElementById('main-content');
      container.innerHTML = renderWorkspaceSelector();
    }
  };

  function renderInitialForm() {
    return `
      <div class="max-w-3xl mx-auto">
        <div class="card p-6 space-y-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">P</div>
              <h2 class="text-lg font-semibold">プロジェクト名</h2>
            </div>
            <input 
              id="project-name" 
              type="text"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="例: ○○エリア活性化プロジェクト"
              value="${(currentDraft && currentDraft.title) ? currentDraft.title : (projectName || '')}"
              oninput="updateProjectName(this.value)"
            />
            <p class="text-xs text-muted-foreground">後からいつでも変更できます。</p>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">0</div>
              <h2 class="text-lg font-semibold">ジャンルを選ぶ（複数可）</h2>
            </div>
            <div class="flex flex-wrap gap-2" id="genre-select">
              <button type="button" class="px-3 py-1.5 rounded-full border border-input text-sm hover:bg-accent" data-genre="coworking">コワーキング</button>
              <button type="button" class="px-3 py-1.5 rounded-full border border-input text-sm hover:bg-accent" data-genre="guesthouse">ゲストハウス</button>
              <button type="button" class="px-3 py-1.5 rounded-full border border-input text-sm hover:bg-accent" data-genre="events">イベント</button>
              <button type="button" class="px-3 py-1.5 rounded-full border border-input text-sm hover:bg-accent" data-genre="akiya">空き家活用</button>
              <button type="button" class="px-3 py-1.5 rounded-full border border-input text-sm hover:bg-accent" data-genre="tour">観光ツアー</button>
            </div>
            <p class="text-xs text-muted-foreground">ざっくり選べばOK。後から編集できます。</p>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <h2 class="text-lg font-semibold">どんな事業ですか?</h2>
            </div>
            <textarea 
              id="business-idea" 
              class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="例: 地域の空き家を活用したコワーキングスペースとゲストハウスの複合施設。リモートワーカーや移住希望者をターゲットに、仕事と地域体験の両方を提供する。"
            ></textarea>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <h2 class="text-lg font-semibold">誰のための事業ですか?</h2>
            </div>
            <textarea 
              id="target-users" 
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="例: 都市部からの移住を検討している30-40代のリモートワーカー、週末起業を考えているビジネスパーソン"
            ></textarea>
          </div>

          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <h2 class="text-lg font-semibold">どんな価値を提供しますか?</h2>
            </div>
            <textarea 
              id="value-prop" 
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="例: 仕事に集中できる環境と地域コミュニティへのアクセス、移住前のお試し居住の機会"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">想定予算（任意）</label>
              <input 
                id="budget" 
                type="text"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="例: 500万円"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">事業開始時期（任意）</label>
              <input 
                id="timeline" 
                type="text"
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="例: 2026年4月"
              />
            </div>
          </div>

          <details class="rounded-md border border-border p-4">
            <summary class="cursor-pointer text-sm font-medium">詳細オプション（任意）</summary>
            <div class="grid md:grid-cols-3 gap-3 mt-3 text-sm">
              <div>
                <label class="block mb-1">客室数（ゲストハウス）</label>
                <input id="opt-rooms" type="number" min="1" class="w-full h-9 rounded-md border border-input px-3" placeholder="2" />
              </div>
              <div>
                <label class="block mb-1">稼働率（0-1）</label>
                <input id="opt-occ" type="number" step="0.1" min="0" max="1" class="w-full h-9 rounded-md border border-input px-3" placeholder="0.5" />
              </div>
              <div>
                <label class="block mb-1">月イベント回数</label>
                <input id="opt-events" type="number" min="0" class="w-full h-9 rounded-md border border-input px-3" placeholder="2" />
              </div>
              <div>
                <label class="block mb-1">イベント参加者/回</label>
                <input id="opt-participants" type="number" min="0" class="w-full h-9 rounded-md border border-input px-3" placeholder="25" />
              </div>
              <div>
                <label class="block mb-1">月ツアー回数</label>
                <input id="opt-tours" type="number" min="0" class="w-full h-9 rounded-md border border-input px-3" placeholder="4" />
              </div>
              <div>
                <label class="block mb-1">ツアー人数/回</label>
                <input id="opt-tour-size" type="number" min="0" class="w-full h-9 rounded-md border border-input px-3" placeholder="8" />
              </div>
            </div>
          </details>

          <div class="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
            <div class="flex items-start gap-2">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="font-medium text-foreground mb-1">AIが下書きを作成します</div>
                <p>入力内容をもとに、事業計画の下書き（目的・ターゲット・収益モデル・実行計画など）を自動生成します。生成後に編集・ブラッシュアップできます。</p>
              </div>
            </div>
          </div>

          <button 
            onclick="generateAIDraft()" 
            id="generate-btn"
            class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            AI下書き生成
          </button>
        </div>
      </div>
    `;
  }

  function renderDraftEditor() {
    if (!currentDraft) return '';
    
    return `
  <div class="grid md:grid-cols-2 gap-4">
        <!-- Left: Editable Sections -->
        <div class="space-y-4">
          <div class="card p-4">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              事業概要
            </h3>
            <textarea 
              id="edit-overview" 
              class="w-full min-h-[120px] p-3 rounded-md border border-input text-sm"
            >${currentDraft.overview}</textarea>
          </div>

          <div class="card p-4">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              ターゲット顧客
            </h3>
            <textarea 
              id="edit-target" 
              class="w-full min-h-[100px] p-3 rounded-md border border-input text-sm"
            >${currentDraft.target}</textarea>
          </div>

          <div class="card p-4">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              収益モデル
            </h3>
            <textarea 
              id="edit-revenue" 
              class="w-full min-h-[100px] p-3 rounded-md border border-input text-sm"
            >${currentDraft.revenue}</textarea>
          </div>

          <div class="card p-4">
            <h3 class="font-semibold mb-3 flex items-center gap-2">
              <svg class="w-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
              実行計画
            </h3>
            <textarea 
              id="edit-plan" 
              class="w-full min-h-[120px] p-3 rounded-md border border-input text-sm"
            >${currentDraft.plan}</textarea>
          </div>

          <button 
            onclick="saveDraftChanges()" 
            class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            変更を保存
          </button>
        </div>

        <!-- Right: Preview -->
        <div class="space-y-4">
          <div class="card sticky top-24 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  事業計画プレビュー
                </h3>
                <span class="text-xs bg-white/20 px-2 py-1 rounded">下書き</span>
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-6 bg-white" id="draft-preview">
              ${renderPreview()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPreview() {
    if (!currentDraft) return '';
    return `
      <div class="space-y-6">
        <!-- Title -->
        <div class="border-b border-border pb-4">
          <h1 class="text-2xl font-bold text-foreground mb-2">事業計画書</h1>
          ${currentDraft.title ? `<div class=\"text-lg font-semibold text-foreground\">${currentDraft.title}</div>` : ''}
          <p class="text-sm text-muted-foreground">作成日: ${new Date().toLocaleDateString('ja-JP')}</p>
          ${currentDraft.genres && currentDraft.genres.length ? `
          <div class="mt-2 flex flex-wrap gap-2">
            ${currentDraft.genres.map(g=>`<span class=\"px-2 py-0.5 rounded-full bg-accent text-xs\">${{
              coworking:'コワーキング', guesthouse:'ゲストハウス', events:'イベント', akiya:'空き家活用', tour:'観光ツアー'
            }[g]||g}</span>`).join('')}
          </div>`: ''}
        </div>

        <!-- 事業概要 -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-foreground">1. 事業概要</h2>
          </div>
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
            <p class="text-sm text-foreground whitespace-pre-line">${currentDraft.overview}</p>
          </div>
        </div>

        <!-- ターゲット顧客 -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-foreground">2. ターゲット顧客</h2>
          </div>
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
            <p class="text-sm text-foreground whitespace-pre-line">${currentDraft.target}</p>
          </div>
        </div>

        <!-- 収益モデル -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-foreground">3. 収益モデル</h2>
          </div>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
            <p class="text-sm text-foreground whitespace-pre-line">${currentDraft.revenue}</p>
          </div>
        </div>

        <!-- 実行計画 -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-foreground">4. 実行計画</h2>
          </div>
          <div class="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r">
            <p class="text-sm text-foreground whitespace-pre-line">${currentDraft.plan}</p>
          </div>
        </div>

        ${currentDraft.financials ? `
        <!-- 財務概算 -->
        <div class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-foreground">5. 財務概算</h2>
          </div>
          <div class="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r space-y-4">
            <div>
              <h3 class="font-medium text-foreground mb-2">収入（概算・月次）</h3>
              <div class="text-sm divide-y">
                ${currentDraft.financials.incomes.map(i=>`
                  <div class=\"flex items-center justify-between py-1\">
                    <span>${i.label}</span>
                    <span class=\"tabular-nums\">約${i.monthly.toLocaleString()}円</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <h3 class="font-medium text-foreground mb-2">支出（概算・月次）</h3>
              <div class="text-sm divide-y">
                ${currentDraft.financials.expenses.map(e=>`
                  <div class=\"flex items-center justify-between py-1\">
                    <span>${e.label}</span>
                    <span class=\"tabular-nums\">約${(e.monthly||0).toLocaleString()}円</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 text-sm">
              <div class="bg-white rounded border border-rose-200 p-3">
                <div class="text-xs text-muted-foreground">売上合計</div>
                <div class="text-base font-semibold tabular-nums">${currentDraft.financials.totals.income.toLocaleString()}円/月</div>
              </div>
              <div class="bg-white rounded border border-rose-200 p-3">
                <div class="text-xs text-muted-foreground">費用合計</div>
                <div class="text-base font-semibold tabular-nums">${currentDraft.financials.totals.expense.toLocaleString()}円/月</div>
              </div>
              <div class="bg-white rounded border border-rose-200 p-3">
                <div class="text-xs text-muted-foreground">概算粗利</div>
                <div class="text-base font-semibold tabular-nums">${currentDraft.financials.totals.profit.toLocaleString()}円/月</div>
              </div>
            </div>
            <p class="text-xs text-muted-foreground">※ あくまで概算です。価格/数量/稼働率などは状況に応じて調整してください。</p>
          </div>
        </div>` : ''}

        <!-- Footer -->
        <div class="border-t border-border pt-4 mt-6">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>LocalSuccess 企画室で生成</span>
            <span>AI支援による下書き</span>
          </div>
        </div>
      </div>
    `;
  }

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
    
    document.getElementById('draft-preview').innerHTML = renderPreview();
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
    container.innerHTML = renderWorkspaceSelector();
  };

  let activeWorkspace = null;

  function renderWorkspaceSelector() {
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
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
  }

  window.backToSimpleEditor = function() {
    currentMode = 'simple';
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  window.switchToLightMode = function() {
    currentMode = 'simple';
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  window.backToModeSelector = function() {
    currentMode = null;
    currentDraft = null;
    projectName = '';
    window.renderPlanEditor(document.getElementById('main-content'));
  };

  // ワークスペースモジュールのトグル表示
  window.toggleWorkspaceModule = function(module) {
    // 状態を更新（同じものなら閉じる）
    activeWorkspace = (activeWorkspace === module) ? null : module;

    // ワークスペース選択画面を再描画してアクティブ状態を反映
    const container = document.getElementById('main-content');
    container.innerHTML = renderWorkspaceSelector();

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
        content: renderIdeationWorkspace(),
      },
      planning: {
        title: '企画構成ワークスペース',
        subtitle: 'フレームワークで多面的に整理',
        color: 'green',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
        content: renderPlanningWorkspace(),
      },
      'goal-setting': {
        title: '目標設定ワークスペース',
        subtitle: 'ゴール・KPI・マイルストーン',
        color: 'purple',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' ,
        content: renderGoalWorkspace(),
      },
      stakeholder: {
        title: '関係者分析ワークスペース',
        subtitle: '関係者・期待・懸念・影響度',
        color: 'orange',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
        content: renderStakeholderWorkspace(),
      },
      proposal: {
        title: '提案作成ワークスペース',
        subtitle: '背景・提案内容・効果・リスク',
        color: 'indigo',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
        content: renderProposalWorkspace(),
      },
      budget: {
        title: '予算・スケジュールワークスペース',
        subtitle: '収入・支出・収支を整理',
        color: 'yellow',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        content: renderBudgetWorkspace(),
      }
    };

    const cfg = moduleConfig[module];
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
    showNotification('保存しました', 'success');
  };

  // プロジェクト名の更新（ワークスペース/共通）
  window.updateProjectName = function(val){
    projectName = (val || '').trim();
    if (currentDraft) {
      currentDraft.title = projectName || undefined;
    }
  };

  // 次のステップへ進む（モジュール順に切り替え）
  window.goToNextWorkspaceModule = function() {
    const order = ['ideation','planning','goal-setting','stakeholder','proposal','budget'];
    const idx = order.indexOf(activeWorkspace);
    const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
    if (next) {
      toggleWorkspaceModule(next);
    } else {
      showNotification('全てのステップが完了しました', 'success');
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
    showNotification('AIが提案を作成しました', 'success');
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

  // 各ワークスペースの描画関数
  // ※ 企画構成（planning）、目標設定（goal）、提案作成（proposal）は外部モジュールに分離済み

  function renderIdeationWorkspace() {
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
  }

  // renderPlanningWorkspace → plan-editor-planning.js に移動済み
  // renderGoalWorkspace → plan-editor-goal.js に移動済み
  // renderProposalWorkspace → plan-editor-proposal.js に移動済み

  function renderStakeholderWorkspace() {
    return `
      <div class="card p-6">
        <div class="space-y-6">
          <!-- ネットワークから候補を選択 -->
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
            <div class="flex items-start gap-3 mb-3">
              <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <div class="flex-1">
                <p class="text-sm font-medium text-blue-900 mb-2">ネットワークから候補を選ぶ</p>
                <div class="flex items-center gap-2">
                  <button onclick="openNetworkPicker()" class="inline-flex items-center text-sm px-3 py-1.5 rounded-md bg-white border border-blue-300 text-blue-700 hover:bg-blue-50">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    ネットワークから選択
                  </button>
                  <span class="text-xs text-blue-700">登録されている人物から簡単に追加できます</span>
                </div>
              </div>
            </div>
          </div>

          <!-- スキル・役割の充足状況 -->
          <div id="gap-analysis-section" class="hidden">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <div class="flex-1">
                  <p class="text-sm font-medium text-yellow-900 mb-2">スキル・役割の不足分析</p>
                  <div id="gap-analysis-content" class="text-sm text-yellow-800"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <label class="block text-sm font-medium">ステークホルダーマップ</label>
              <button onclick="analyzeGaps()" class="text-xs px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                不足分析を表示
              </button>
            </div>
            <div class="grid grid-cols-1 gap-4">
              <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium">主要ステークホルダー</h4>
                  <button onclick="addStakeholderRow()" class="text-sm text-primary hover:underline">+ 手動で追加</button>
                </div>
                <div id="stakeholder-list" class="space-y-2">
                  <!-- ステークホルダー行が動的に追加される -->
                </div>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">コミュニケーション計画</label>
            <textarea id="stakeholder-comm-plan" class="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="各ステークホルダーとどのように連携・報告していきますか？"></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button class="btn-secondary" onclick="handleWorkspaceSave()">保存</button>
            <button class="btn" onclick="aiPolishWorkspace()">AIにブラッシュアップ</button>
            <button class="btn-primary" onclick="goToNextWorkspaceModule()">次のステップへ</button>
          </div>
        </div>
      </div>

      <!-- ネットワークピッカーモーダル -->
      <div id="network-picker-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
          <div class="p-4 border-b flex items-center justify-between">
            <h3 class="text-lg font-semibold">ネットワークから関係者を選択</h3>
            <button onclick="closeNetworkPicker()" class="text-muted-foreground hover:text-foreground">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-4">
            <input 
              type="text" 
              id="network-search" 
              placeholder="名前や役割で絞り込み..."
              class="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              oninput="filterNetworkPicker(this.value)"
            />
            <div id="network-picker-list" class="space-y-2 max-h-[50vh] overflow-y-auto">
              <!-- 人物リストが動的に生成される -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderBudgetWorkspace() {
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
  }

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
