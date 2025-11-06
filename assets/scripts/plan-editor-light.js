/**
 * plan-editor-light.js
 * ライトモード（簡易AI下書き生成）関連UI・ロジック
 */
(function(){
  'use strict';

  // --- ライトモードUI ---
  window.renderModeSelector = function() {
    return `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <h1 class="text-2xl font-bold mb-2">企画室</h1>
        <p class="text-muted-foreground mb-8">企画の作成方法を選んでください</p>
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="card p-8 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow" onclick="selectPlanningMode('simple')">
            <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div class="font-bold text-lg">ライトに作成</div>
            <div class="text-muted-foreground text-sm">簡単な質問に答えるだけで、AIが事業計画の下書きを自動生成します。すぐに企画を形にしたい方におすすめです。</div>
            <ul class="text-green-600 text-sm space-y-1 mt-2">
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>3つの質問に答えるだけ</li>
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>AIが財務概算も自動生成</li>
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>後から詳細ワークスペースで深掘り可能</li>
            </ul>
            <div class="mt-4 text-primary text-sm font-medium flex items-center gap-1">このモードで始める <span aria-hidden="true">&rarr;</span></div>
          </div>
          <div class="card p-8 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow" onclick="selectPlanningMode('workspace')">
            <div class="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center mb-2">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/></svg>
            </div>
            <div class="font-bold text-lg">ワークスペースから開始</div>
            <div class="text-muted-foreground text-sm">各ワークスペースで段階的に企画を作り込みます。じっくり練りたい方、複雑な企画におすすめです。</div>
            <ul class="text-green-600 text-sm space-y-1 mt-2">
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>アイデア整理・目標設定など6つのツール</li>
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>関係者分析・SMART目標など専門機能</li>
              <li><svg class="inline-block w-5 h-5 mr-1 align-middle" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#e6f9ec"/><path d="M7 12l3 3 7-7" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>好きな順番で必要な部分だけ作成</li>
            </ul>
            <div class="mt-4 text-primary text-sm font-medium flex items-center gap-1">このモードで始める <span aria-hidden="true">&rarr;</span></div>
          </div>
        </div>
        <div class="bg-muted/40 rounded-lg p-4 text-sm text-muted-foreground flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 16h.01M16 12h.01"/></svg>
          <span>どちらのモードでも<br>いつでもモードを切り替えられます。ライトに始めて、必要に応じてワークスペースで詳細を詰めることも可能です。</span>
        </div>
      </div>
    `;
  };

  window.renderInitialForm = function() {
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
              value="${(window.currentDraft && window.currentDraft.title) ? window.currentDraft.title : (window.projectName || '')}"
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
  };

  window.renderDraftEditor = function() {
    if (!window.currentDraft) return '';
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
            >${window.currentDraft.overview}</textarea>
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
            >${window.currentDraft.target}</textarea>
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
            >${window.currentDraft.revenue}</textarea>
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
            >${window.currentDraft.plan}</textarea>
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
              ${window.renderPreview()}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.renderPreview = function() {
    if (!window.currentDraft) return '';
    const draft = window.currentDraft;
    return `
      <div class="space-y-6">
        <div>
          <h4 class="font-semibold mb-1">事業概要</h4>
          <div class="bg-muted/40 rounded p-3 whitespace-pre-line">${draft.overview}</div>
        </div>
        <div>
          <h4 class="font-semibold mb-1">ターゲット顧客</h4>
          <div class="bg-muted/40 rounded p-3 whitespace-pre-line">${draft.target}</div>
        </div>
        <div>
          <h4 class="font-semibold mb-1">収益モデル</h4>
          <div class="bg-muted/40 rounded p-3 whitespace-pre-line">${draft.revenue}</div>
        </div>
        <div>
          <h4 class="font-semibold mb-1">実行計画</h4>
          <div class="bg-muted/40 rounded p-3 whitespace-pre-line">${draft.plan}</div>
        </div>
      </div>
    `;
  };

  // 必要に応じてAIドラフト生成・保存・イベントハンドラもここに追加可能

})();
