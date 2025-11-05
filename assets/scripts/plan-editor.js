// Plan Editor - AI-First Approach
// Simple input → AI generates draft → User refines
(function(){
  
  let currentDraft = null;
  let isGenerating = false;

  function renderPlanEditor(container){
    const hasDraft = currentDraft !== null;
    
    container.innerHTML = `
      <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold">企画室</h1>
            <p class="text-muted-foreground text-sm">簡単な質問に答えるだけで、AIが事業計画の下書きを作成します</p>
          </div>
          ${hasDraft ? `
            <div class="flex gap-2">
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

  function renderInitialForm() {
    return `
      <div class="max-w-3xl mx-auto">
        <div class="card p-6 space-y-6">
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
        overview: `${finalIdea}\n\n${finalValue}を通じて、地域活性化と移住促進に貢献します。${budget ? `初期投資額: ${budget}` : ''}${timeline ? `、開始予定: ${timeline}` : ''}`,
        target: finalTarget,
        revenue: financials ? `選択ジャンル: ${financials.meta.genres.join('、')}\n\n主な収益源（概算）:\n${financials.incomes.map(i=>`• ${i.label}: 約${i.monthly.toLocaleString()}円/月`).join('\n')}\n\n主な固定費（概算）:\n${financials.expenses.map(e=>`• ${e.label}: 約${(e.monthly||0).toLocaleString()}円/月`).join('\n')}\n\n概算粗利: 約${(financials.totals.profit).toLocaleString()}円/月` : `主な収益源:\n• コワーキングスペース月額会員費: 2万円/月\n• ゲストハウス宿泊費: 5,000円/泊\n• イベント・ワークショップ収益\n• 地域企業とのコラボレーション収益`,
        plan: `フェーズ1（準備期間: 6ヶ月）\n• 空き家物件の選定と契約\n• 改装工事の実施\n• 地域コミュニティとの関係構築\n\nフェーズ2（立ち上げ: 3ヶ月）\n• プレオープン・テストマーケティング\n• SNS・Webでの情報発信開始\n• 初期会員の獲得\n\nフェーズ3（本格運営）\n• グランドオープン\n• イベント・ワークショップの定期開催\n• 地域企業との連携強化`,
        genres: finalGenres,
        financials
      };
      
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
      window.renderPlanEditor(document.getElementById('main-content'));
    }
  };

  window.exportPlanAsPDF = function() {
    showNotification('PDF出力機能は実装予定です', 'info');
  };

  window.renderPlanEditor = renderPlanEditor;
})();
