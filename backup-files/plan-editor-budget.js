(function(){
  'use strict';

  // 予算・スケジュール ワークスペース描画
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
                    <button onclick="applySimulation()" class="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium">
                      この試算を予算に反映
                    </button>
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
            <div id="income-list" class="space-y-2"></div>
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-medium">支出計画</h3>
              <button onclick="addBudgetRow('expense')" class="text-sm text-primary hover:underline">+ 支出項目を追加</button>
            </div>
            <div id="expense-list" class="space-y-2"></div>
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

  // ===== 予算・収支管理機能 =====
  let budgetItems = { income: [], expense: [] };

  // 予算項目追加/削除/更新
  window.addBudgetRow = function(type) {
    const item = { id: Date.now(), type, name: '', amount: 0, note: '' };
    budgetItems[type].push(item);
    renderBudgetLists();
  };
  window.removeBudgetItem = function(type, id) {
    budgetItems[type] = budgetItems[type].filter(item => item.id !== id);
    renderBudgetLists();
  };
  window.updateBudgetItem = function(type, id, field, value) {
    const item = budgetItems[type].find(i => i.id === id);
    if (item) {
      item[field] = field === 'amount' ? parseFloat(value) || 0 : value;
      updateTotals();
    }
  };

  function renderBudgetLists() {
    renderBudgetList('income');
    renderBudgetList('expense');
    updateTotals();
  }

  function renderBudgetList(type) {
    const container = document.getElementById(`${type}-list`);
    if (!container) return;

    const items = budgetItems[type];
    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-6 text-muted-foreground text-sm">
          <p>${type === 'income' ? '収入' : '支出'}項目がまだ追加されていません</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="grid grid-cols-12 gap-2 items-center p-2 border rounded hover:bg-accent/50">
        <input type="text" value="${item.name}" placeholder="${type === 'income' ? '収入' : '支出'}項目名" class="col-span-4 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm" onchange="updateBudgetItem('${type}', ${item.id}, 'name', this.value)" />
        <div class="col-span-3 relative">
          <input type="number" value="${item.amount}" placeholder="0" class="w-full px-2 py-1 pr-8 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm text-right" onchange="updateBudgetItem('${type}', ${item.id}, 'amount', this.value)" />
          <span class="absolute right-2 top-1 text-xs text-muted-foreground">円</span>
        </div>
        <input type="text" value="${item.note}" placeholder="備考・メモ" class="col-span-4 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm" onchange="updateBudgetItem('${type}', ${item.id}, 'note', this.value)" />
        <button onclick="removeBudgetItem('${type}', ${item.id})" class="col-span-1 text-red-600 hover:text-red-800 text-sm" title="削除">
          <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }

  function updateTotals() {
    const totalIncome = budgetItems.income.reduce((s, i) => s + (i.amount || 0), 0);
    const totalExpense = budgetItems.expense.reduce((s, i) => s + (i.amount || 0), 0);
    const netProfit = totalIncome - totalExpense;

    const incomeEl = document.getElementById('total-income');
    const expenseEl = document.getElementById('total-expense');
    const profitEl = document.getElementById('net-profit');

    if (incomeEl) incomeEl.textContent = `¥${totalIncome.toLocaleString()}`;
    if (expenseEl) expenseEl.textContent = `¥${totalExpense.toLocaleString()}`;
    if (profitEl) {
      profitEl.textContent = `¥${netProfit.toLocaleString()}`;
      profitEl.className = `text-2xl font-bold ${netProfit >= 0 ? 'text-green-900' : 'text-red-900'}`;
    }
  }

  // ===== 詳細シミュレーター: ゲストハウス（インライン） =====
  function renderGuesthouseSimulator() {
    return `
          <div class="space-y-6">
            <!-- 基本情報 -->
            <div class="bg-blue-50 rounded-lg p-4">
              <h4 class="font-semibold text-blue-900 mb-3">基本情報</h4>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-blue-800 mb-1">客室数</label>
                  <input type="number" id="gh-rooms" value="3" min="1" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-blue-800 mb-1">月の営業日数</label>
                  <input type="number" id="gh-days" value="30" min="1" max="31" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
              </div>
            </div>

            <!-- 宿泊料金設定 -->
            <div class="bg-green-50 rounded-lg p-4">
              <h4 class="font-semibold text-green-900 mb-3">宿泊料金設定</h4>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-green-800 mb-1">平日単価（円/泊）</label>
                  <input type="number" id="gh-price-weekday" value="4000" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-green-800 mb-1">週末単価（円/泊）</label>
                  <input type="number" id="gh-price-weekend" value="5500" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-green-800 mb-1">ハイシーズン単価（円/泊）</label>
                  <input type="number" id="gh-price-high" value="6500" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
              </div>
            </div>

            <!-- 稼働率設定 -->
            <div class="bg-yellow-50 rounded-lg p-4">
              <h4 class="font-semibold text-yellow-900 mb-3">稼働率設定（%）</h4>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">平日稼働率</label>
                  <input type="number" id="gh-occ-weekday" value="50" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">週末稼働率</label>
                  <input type="number" id="gh-occ-weekend" value="75" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">ハイシーズン稼働率</label>
                  <input type="number" id="gh-occ-high" value="90" min="0" max="100" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
              </div>
            </div>

            <!-- 日数配分 -->
            <div class="bg-purple-50 rounded-lg p-4">
              <h4 class="font-semibold text-purple-900 mb-3">日数配分（月30日として）</h4>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-purple-800 mb-1">平日（日）</label>
                  <input type="number" id="gh-days-weekday" value="20" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-purple-800 mb-1">週末（日）</label>
                  <input type="number" id="gh-days-weekend" value="8" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-purple-800 mb-1">ハイシーズン（日）</label>
                  <input type="number" id="gh-days-high" value="2" class="w-full px-3 py-2 border rounded" onchange="calculateGuesthouseRevenue()">
                </div>
              </div>
            </div>

            <!-- 試算結果 -->
            <div id="gh-revenue-result" class="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
              <h4 class="font-semibold text-green-900 mb-3">売上試算</h4>
              <div id="gh-revenue-breakdown" class="space-y-2"></div>
            </div>

            <!-- 固定費 -->
            <div class="bg-red-50 rounded-lg p-4">
              <h4 class="font-semibold text-red-900 mb-3 flex justify-between items-center">
                <span>固定費（月額）</span>
                <button onclick="addGuesthouseExpense('fixed')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">+ 項目追加</button>
              </h4>
              <div id="gh-fixed-expenses" class="space-y-2"></div>
            </div>

            <!-- 変動費 -->
            <div class="bg-orange-50 rounded-lg p-4">
              <h4 class="font-semibold text-orange-900 mb-3 flex justify-between items-center">
                <span>変動費（月額）</span>
                <button onclick="addGuesthouseExpense('variable')" class="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">+ 項目追加</button>
              </h4>
              <div id="gh-variable-expenses" class="space-y-2"></div>
            </div>

            <!-- 損益サマリー -->
            <div id="gh-profit-summary" class="bg-gradient-to-r from-blue-900 to-green-900 text-white rounded-lg p-6">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-sm opacity-80">月間売上</div>
                  <div id="gh-total-revenue" class="text-2xl font-bold mt-1">¥0</div>
                </div>
                <div>
                  <div class="text-sm opacity-80">月間経費</div>
                  <div id="gh-total-expense" class="text-2xl font-bold mt-1">¥0</div>
                </div>
                <div>
                  <div class="text-sm opacity-80">月間利益</div>
                  <div id="gh-net-profit" class="text-2xl font-bold mt-1">¥0</div>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button onclick="applyGuesthouseSimulation()" class="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold">この試算を予算に反映する</button>
            </div>
          </div>
    `;
  }

  function initializeGuesthouseExpenses() {
    window.guesthouseExpenses = {
      fixed: [
        { id: 1, name: '家賃・賃料', amount: 100000, note: '物件賃料' },
        { id: 2, name: '水道光熱費', amount: 35000, note: '電気・水道・ガス' },
        { id: 3, name: '通信費', amount: 8000, note: 'インターネット・電話' },
        { id: 4, name: '保険料', amount: 15000, note: '火災保険・賠償責任保険' },
        { id: 5, name: '人件費', amount: 80000, note: '清掃・管理スタッフ' }
      ],
      variable: [
        { id: 6, name: '消耗品費', amount: 25000, note: 'リネン・アメニティ' },
        { id: 7, name: '清掃費', amount: 20000, note: '外部清掃委託' },
        { id: 8, name: '広告宣伝費', amount: 30000, note: '予約サイト・SNS広告' },
        { id: 9, name: '手数料', amount: 15000, note: '予約サイト手数料' },
        { id: 10, name: '雑費', amount: 10000, note: 'その他経費' }
      ]
    };
    renderGuesthouseExpenses();
  }

  function renderGuesthouseExpenses() {
    ['fixed', 'variable'].forEach(type => {
      const container = document.getElementById(`gh-${type}-expenses`);
      if (!container) return;
      const expenses = window.guesthouseExpenses[type];
      container.innerHTML = expenses.map(exp => `
        <div class="grid grid-cols-12 gap-2 items-center bg-white rounded p-2 border">
          <input type="text" value="${exp.name}" class="col-span-4 px-2 py-1 border rounded text-sm" onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'name', this.value)">
          <div class="col-span-3 relative">
            <input type="number" value="${exp.amount}" class="w-full px-2 py-1 pr-8 border rounded text-sm text-right" onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'amount', this.value)">
            <span class="absolute right-2 top-1 text-xs text-gray-500">円</span>
          </div>
          <input type="text" value="${exp.note}" class="col-span-4 px-2 py-1 border rounded text-sm" onchange="updateGuesthouseExpense('${type}', ${exp.id}, 'note', this.value)">
          <button onclick="removeGuesthouseExpense('${type}', ${exp.id})" class="col-span-1 text-red-600 hover:text-red-800">
            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `).join('');
    });
    calculateGuesthouseProfit();
  }

  window.addGuesthouseExpense = function(type) {
    const newId = Date.now();
    window.guesthouseExpenses[type].push({ id: newId, name: '', amount: 0, note: '' });
    renderGuesthouseExpenses();
  };
  window.updateGuesthouseExpense = function(type, id, field, value) {
    const expense = window.guesthouseExpenses[type].find(e => e.id === id);
    if (expense) {
      expense[field] = field === 'amount' ? parseFloat(value) || 0 : value;
      calculateGuesthouseProfit();
    }
  };
  window.removeGuesthouseExpense = function(type, id) {
    window.guesthouseExpenses[type] = window.guesthouseExpenses[type].filter(e => e.id !== id);
    renderGuesthouseExpenses();
  };

  window.calculateGuesthouseRevenue = function() {
    const rooms = parseFloat(document.getElementById('gh-rooms')?.value) || 0;
    const priceWeekday = parseFloat(document.getElementById('gh-price-weekday')?.value) || 0;
    const priceWeekend = parseFloat(document.getElementById('gh-price-weekend')?.value) || 0;
    const priceHigh = parseFloat(document.getElementById('gh-price-high')?.value) || 0;
    const occWeekday = parseFloat(document.getElementById('gh-occ-weekday')?.value) || 0;
    const occWeekend = parseFloat(document.getElementById('gh-occ-weekend')?.value) || 0;
    const occHigh = parseFloat(document.getElementById('gh-occ-high')?.value) || 0;
    const daysWeekday = parseFloat(document.getElementById('gh-days-weekday')?.value) || 0;
    const daysWeekend = parseFloat(document.getElementById('gh-days-weekend')?.value) || 0;
    const daysHigh = parseFloat(document.getElementById('gh-days-high')?.value) || 0;

    const revenueWeekday = rooms * priceWeekday * daysWeekday * (occWeekday / 100);
    const revenueWeekend = rooms * priceWeekend * daysWeekend * (occWeekend / 100);
    const revenueHigh = rooms * priceHigh * daysHigh * (occHigh / 100);
    const totalRevenue = revenueWeekday + revenueWeekend + revenueHigh;

    const breakdownEl = document.getElementById('gh-revenue-breakdown');
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="flex justify-between items-center py-1 border-b">
          <span class="text-sm">平日: ${rooms}室 × ¥${priceWeekday.toLocaleString()} × ${daysWeekday}日 × ${occWeekday}%</span>
          <span class="font-semibold">¥${Math.round(revenueWeekday).toLocaleString()}</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b">
          <span class="text-sm">週末: ${rooms}室 × ¥${priceWeekend.toLocaleString()} × ${daysWeekend}日 × ${occWeekend}%</span>
          <span class="font-semibold">¥${Math.round(revenueWeekend).toLocaleString()}</span>
        </div>
        <div class="flex justify-between items-center py-1 border-b">
          <span class="text-sm">ハイシーズン: ${rooms}室 × ¥${priceHigh.toLocaleString()} × ${daysHigh}日 × ${occHigh}%</span>
          <span class="font-semibold">¥${Math.round(revenueHigh).toLocaleString()}</span>
        </div>
        <div class="flex justify-between items-center py-2 mt-2 bg-green-200 rounded px-2">
          <span class="font-bold text-green-900">月間売上合計</span>
          <span class="font-bold text-green-900 text-xl">¥${Math.round(totalRevenue).toLocaleString()}</span>
        </div>
      `;
    }

    const revenueEl = document.getElementById('gh-total-revenue');
    if (revenueEl) revenueEl.textContent = `¥${Math.round(totalRevenue).toLocaleString()}`;

    calculateGuesthouseProfit();
  };

  function calculateGuesthouseProfit() {
    const revenueText = document.getElementById('gh-total-revenue')?.textContent || '¥0';
    const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;
    if (!window.guesthouseExpenses) return;

    const fixedTotal = window.guesthouseExpenses.fixed.reduce((sum, e) => sum + (e.amount || 0), 0);
    const variableTotal = window.guesthouseExpenses.variable.reduce((sum, e) => sum + (e.amount || 0), 0);
    const totalExpense = fixedTotal + variableTotal;
    const netProfit = revenue - totalExpense;

    const expenseEl = document.getElementById('gh-total-expense');
    const profitEl = document.getElementById('gh-net-profit');

    if (expenseEl) expenseEl.textContent = `¥${totalExpense.toLocaleString()}`;
    if (profitEl) {
      profitEl.textContent = `¥${netProfit.toLocaleString()}`;
      profitEl.className = `text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-green-200' : 'text-red-200'}`;
    }
  }

  window.applyGuesthouseSimulation = function() {
    const revenueText = document.getElementById('gh-total-revenue')?.textContent || '¥0';
    const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;

    budgetItems.income = [];
    budgetItems.expense = [];

    const rooms = parseFloat(document.getElementById('gh-rooms')?.value) || 0;
    const priceWeekday = parseFloat(document.getElementById('gh-price-weekday')?.value) || 0;
    const priceWeekend = parseFloat(document.getElementById('gh-price-weekend')?.value) || 0;
    const priceHigh = parseFloat(document.getElementById('gh-price-high')?.value) || 0;
    const occWeekday = parseFloat(document.getElementById('gh-occ-weekday')?.value) || 0;
    const occWeekend = parseFloat(document.getElementById('gh-occ-weekend')?.value) || 0;
    const occHigh = parseFloat(document.getElementById('gh-occ-high')?.value) || 0;
    const daysWeekday = parseFloat(document.getElementById('gh-days-weekday')?.value) || 0;
    const daysWeekend = parseFloat(document.getElementById('gh-days-weekend')?.value) || 0;
    const daysHigh = parseFloat(document.getElementById('gh-days-high')?.value) || 0;

    budgetItems.income.push({ id: Date.now() + 1, type: 'income', name: '宿泊料（平日）', amount: Math.round(rooms * priceWeekday * daysWeekday * (occWeekday / 100)), note: `${rooms}室×¥${priceWeekday}×${daysWeekday}日×${occWeekday}%` });
    budgetItems.income.push({ id: Date.now() + 2, type: 'income', name: '宿泊料（週末）', amount: Math.round(rooms * priceWeekend * daysWeekend * (occWeekend / 100)), note: `${rooms}室×¥${priceWeekend}×${daysWeekend}日×${occWeekend}%` });
    if (daysHigh > 0) {
      budgetItems.income.push({ id: Date.now() + 3, type: 'income', name: '宿泊料（ハイシーズン）', amount: Math.round(rooms * priceHigh * daysHigh * (occHigh / 100)), note: `${rooms}室×¥${priceHigh}×${daysHigh}日×${occHigh}%` });
    }

    if (window.guesthouseExpenses) {
      window.guesthouseExpenses.fixed.forEach(exp => {
        budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: exp.name, amount: exp.amount, note: `固定費: ${exp.note}` });
      });
      window.guesthouseExpenses.variable.forEach(exp => {
        budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: exp.name, amount: exp.amount, note: `変動費: ${exp.note}` });
      });
    }

    renderBudgetLists();
    showNotification('ゲストハウス収支計画を予算に反映しました', 'success');
  };

  // ===== 詳細シミュレーター: カフェ・飲食店（インライン） =====
  window.showDetailedCafeSimulator = function() {
    const resultSection = document.getElementById('simulation-result');
    const contentEl = document.getElementById('simulation-content');
    if (!resultSection || !contentEl) return;

    const html = `
          <div class="space-y-6">
            <!-- 基本情報 -->
            <div class="bg-blue-50 rounded-lg p-4">
              <h4 class="font-semibold text-blue-900 mb-3">基本情報</h4>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-blue-800 mb-1">月の営業日数</label>
                  <input type="number" id="cafe-days" value="26" min="1" max="31" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-blue-800 mb-1">座席数</label>
                  <input type="number" id="cafe-seats" value="20" min="1" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-blue-800 mb-1">回転率（回/日）</label>
                  <input type="number" id="cafe-turnover" value="2.5" min="0" step="0.5" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
              </div>
            </div>

            <!-- メニュー別売上 -->
            <div class="bg-green-50 rounded-lg p-4">
              <h4 class="font-semibold text-green-900 mb-3">メニュー構成</h4>
              <div class="space-y-3">
                <div class="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600">
                  <div class="col-span-3">メニュー</div>
                  <div class="col-span-2">単価（円）</div>
                  <div class="col-span-2">原価率（%）</div>
                  <div class="col-span-2">注文率（%）</div>
                  <div class="col-span-2">月間売上</div>
                  <div class="col-span-1"></div>
                </div>
                <div id="cafe-menu-items"></div>
                <button onclick="addCafeMenuItem()" class="w-full py-2 border-2 border-dashed border-green-300 rounded text-green-700 hover:bg-green-100 text-sm">+ メニュー追加</button>
              </div>
            </div>

            <!-- 時間帯別客数 -->
            <div class="bg-yellow-50 rounded-lg p-4">
              <h4 class="font-semibold text-yellow-900 mb-3">時間帯別想定客数（1日あたり）</h4>
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">モーニング（7-11時）</label>
                  <input type="number" id="cafe-morning" value="8" min="0" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">ランチ（11-14時）</label>
                  <input type="number" id="cafe-lunch" value="25" min="0" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">カフェタイム（14-17時）</label>
                  <input type="number" id="cafe-afternoon" value="12" min="0" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
                <div>
                  <label class="block text-sm text-yellow-800 mb-1">ディナー（17-21時）</label>
                  <input type="number" id="cafe-dinner" value="15" min="0" class="w-full px-3 py-2 border rounded" onchange="calculateCafeRevenue()">
                </div>
              </div>
              <div class="mt-3 p-2 bg-yellow-100 rounded text-sm">
                <span class="text-yellow-800">1日合計客数: </span>
                <span id="cafe-daily-customers" class="font-bold text-yellow-900">60人</span>
                <span class="text-yellow-800 ml-3">月間客数: </span>
                <span id="cafe-monthly-customers" class="font-bold text-yellow-900">1,560人</span>
              </div>
            </div>

            <!-- 売上試算 -->
            <div id="cafe-revenue-result" class="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
              <h4 class="font-semibold text-green-900 mb-3">売上試算</h4>
              <div id="cafe-revenue-breakdown" class="space-y-2"></div>
            </div>

            <!-- 固定費 -->
            <div class="bg-red-50 rounded-lg p-4">
              <h4 class="font-semibold text-red-900 mb-3 flex justify-between items-center">
                <span>固定費（月額）</span>
                <button onclick="addCafeExpense('fixed')" class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">+ 項目追加</button>
              </h4>
              <div id="cafe-fixed-expenses" class="space-y-2"></div>
            </div>

            <!-- 変動費 -->
            <div class="bg-orange-50 rounded-lg p-4">
              <h4 class="font-semibold text-orange-900 mb-3 flex justify-between items-center">
                <span>変動費（月額）</span>
                <button onclick="addCafeExpense('variable')" class="text-sm px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">+ 項目追加</button>
              </h4>
              <div id="cafe-variable-expenses" class="space-y-2"></div>
              <div class="mt-3 p-2 bg-orange-100 rounded text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-orange-800">原価合計（食材費）:</span>
                  <span id="cafe-total-cost" class="font-bold text-orange-900">¥0</span>
                </div>
              </div>
            </div>

            <!-- 損益サマリー -->
            <div id="cafe-profit-summary" class="bg-gradient-to-r from-blue-900 to-green-900 text白 rounded-lg p-6">
              <div class="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div class="text-sm opacity-80">月間売上</div>
                  <div id="cafe-total-revenue" class="text-2xl font-bold mt-1">¥0</div>
                </div>
                <div>
                  <div class="text-sm opacity-80">原価</div>
                  <div id="cafe-gross-cost" class="text-2xl font-bold mt-1">¥0</div>
                </div>
                <div>
                  <div class="text-sm opacity-80">その他経費</div>
                  <div id="cafe-total-expense" class="text-2xl font-bold mt-1">¥0</div>
                </div>
                <div>
                  <div class="text-sm opacity-80">月間利益</div>
                  <div id="cafe-net-profit" class="text-2xl font-bold mt-1">¥0</div>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-white/30 text-center">
                <div class="text-sm opacity-80">粗利率（売上-原価）</div>
                <div id="cafe-profit-rate" class="text-xl font-bold mt-1">0%</div>
              </div>
            </div>

            <div class="flex gap-3">
              <button onclick="applyCafeSimulation()" class="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 font-semibold">この試算を予算に反映する</button>
            </div>
          </div>
    `;

    contentEl.innerHTML = html;
    resultSection.classList.remove('hidden');
    initializeCafeMenuItems();
    initializeCafeExpenses();
    calculateCafeRevenue();
  };

  function initializeCafeMenuItems() {
    window.cafeMenuItems = [
      { id: 1, name: 'モーニングセット', price: 600, costRate: 30, orderRate: 50 },
      { id: 2, name: 'ランチセット', price: 980, costRate: 35, orderRate: 70 },
      { id: 3, name: 'コーヒー・ドリンク', price: 450, costRate: 20, orderRate: 80 },
      { id: 4, name: 'デザート', price: 520, costRate: 25, orderRate: 30 },
      { id: 5, name: 'ディナーセット', price: 1380, costRate: 38, orderRate: 60 }
    ];
    renderCafeMenuItems();
  }

  function renderCafeMenuItems() {
    const container = document.getElementById('cafe-menu-items');
    if (!container) return;
    container.innerHTML = window.cafeMenuItems.map(item => `
      <div class="grid grid-cols-12 gap-2 items-center bg-white rounded p-2 border">
        <input type="text" value="${item.name}" class="col-span-3 px-2 py-1 border rounded text-sm" onchange="updateCafeMenuItem(${item.id}, 'name', this.value)">
        <input type="number" value="${item.price}" class="col-span-2 px-2 py-1 border rounded text-sm text-right" onchange="updateCafeMenuItem(${item.id}, 'price', this.value)">
        <div class="col-span-2 relative">
          <input type="number" value="${item.costRate}" min="0" max="100" class="w-full px-2 py-1 pr-6 border rounded text-sm text-right" onchange="updateCafeMenuItem(${item.id}, 'costRate', this.value)">
          <span class="absolute right-2 top-1 text-xs text-gray-500">%</span>
        </div>
        <div class="col-span-2 relative">
          <input type="number" value="${item.orderRate}" min="0" max="100" class="w-full px-2 py-1 pr-6 border rounded text-sm text-right" onchange="updateCafeMenuItem(${item.id}, 'orderRate', this.value)">
          <span class="absolute right-2 top-1 text-xs text-gray-500">%</span>
        </div>
        <div class="col-span-2 text-right text-sm font-semibold text-green-700" id="menu-revenue-${item.id}">¥0</div>
        <button onclick="removeCafeMenuItem(${item.id})" class="col-span-1 text-red-600 hover:text-red-800">
          <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }

  window.addCafeMenuItem = function() {
    const newId = Date.now();
    window.cafeMenuItems.push({ id: newId, name: '新規メニュー', price: 500, costRate: 30, orderRate: 50 });
    renderCafeMenuItems();
    calculateCafeRevenue();
  };
  window.updateCafeMenuItem = function(id, field, value) {
    const item = window.cafeMenuItems.find(i => i.id === id);
    if (item) {
      item[field] = field === 'name' ? value : (parseFloat(value) || 0);
      calculateCafeRevenue();
    }
  };
  window.removeCafeMenuItem = function(id) {
    window.cafeMenuItems = window.cafeMenuItems.filter(i => i.id !== id);
    renderCafeMenuItems();
    calculateCafeRevenue();
  };

  function initializeCafeExpenses() {
    window.cafeExpenses = {
      fixed: [
        { id: 1, name: '家賃・賃料', amount: 150000, note: '店舗賃料' },
        { id: 2, name: '水道光熱費', amount: 45000, note: '電気・水道・ガス' },
        { id: 3, name: '通信費', amount: 8000, note: 'インターネット・電話' },
        { id: 4, name: '人件費', amount: 250000, note: 'スタッフ給与' },
        { id: 5, name: '保険料', amount: 12000, note: '各種保険' }
      ],
      variable: [
        { id: 6, name: '消耗品費', amount: 20000, note: '食器・カトラリー等' },
        { id: 7, name: '清掃費', amount: 15000, note: '清掃用品' },
        { id: 8, name: '広告宣伝費', amount: 35000, note: 'SNS・チラシ等' },
        { id: 9, name: '雑費', amount: 15000, note: 'その他経費' }
      ]
    };
    renderCafeExpenses();
  }

  function renderCafeExpenses() {
    ['fixed', 'variable'].forEach(type => {
      const container = document.getElementById(`cafe-${type}-expenses`);
      if (!container) return;
      const expenses = window.cafeExpenses[type];
      container.innerHTML = expenses.map(exp => `
        <div class="grid grid-cols-12 gap-2 items-center bg白 rounded p-2 border">
          <input type="text" value="${exp.name}" class="col-span-4 px-2 py-1 border rounded text-sm" onchange="updateCafeExpense('${type}', ${exp.id}, 'name', this.value)">
          <div class="col-span-3 relative">
            <input type="number" value="${exp.amount}" class="w-full px-2 py-1 pr-8 border rounded text-sm text-right" onchange="updateCafeExpense('${type}', ${exp.id}, 'amount', this.value)">
            <span class="absolute right-2 top-1 text-xs text-gray-500">円</span>
          </div>
          <input type="text" value="${exp.note}" class="col-span-4 px-2 py-1 border rounded text-sm" onchange="updateCafeExpense('${type}', ${exp.id}, 'note', this.value)">
          <button onclick="removeCafeExpense('${type}', ${exp.id})" class="col-span-1 text-red-600 hover:text-red-800">
            <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `).join('');
    });
    calculateCafeProfit();
  }

  window.addCafeExpense = function(type) {
    const newId = Date.now();
    window.cafeExpenses[type].push({ id: newId, name: '', amount: 0, note: '' });
    renderCafeExpenses();
  };
  window.updateCafeExpense = function(type, id, field, value) {
    const expense = window.cafeExpenses[type].find(e => e.id === id);
    if (expense) {
      expense[field] = field === 'amount' ? parseFloat(value) || 0 : value;
      calculateCafeProfit();
    }
  };
  window.removeCafeExpense = function(type, id) {
    window.cafeExpenses[type] = window.cafeExpenses[type].filter(e => e.id !== id);
    renderCafeExpenses();
  };

  window.calculateCafeRevenue = function() {
    const days = parseFloat(document.getElementById('cafe-days')?.value) || 0;
    const morning = parseFloat(document.getElementById('cafe-morning')?.value) || 0;
    const lunch = parseFloat(document.getElementById('cafe-lunch')?.value) || 0;
    const afternoon = parseFloat(document.getElementById('cafe-afternoon')?.value) || 0;
    const dinner = parseFloat(document.getElementById('cafe-dinner')?.value) || 0;

    const dailyCustomers = morning + lunch + afternoon + dinner;
    const monthlyCustomers = dailyCustomers * days;

    const dailyEl = document.getElementById('cafe-daily-customers');
    const monthlyEl = document.getElementById('cafe-monthly-customers');
    if (dailyEl) dailyEl.textContent = `${dailyCustomers}人`;
    if (monthlyEl) monthlyEl.textContent = `${monthlyCustomers.toLocaleString()}人`;

    let totalRevenue = 0;
    let totalCost = 0;
    let breakdownHTML = '';

    window.cafeMenuItems.forEach(item => {
      const orders = monthlyCustomers * (item.orderRate / 100);
      const revenue = orders * item.price;
      const cost = revenue * (item.costRate / 100);
      totalRevenue += revenue;
      totalCost += cost;

      const revenueEl = document.getElementById(`menu-revenue-${item.id}`);
      if (revenueEl) revenueEl.textContent = `¥${Math.round(revenue).toLocaleString()}`;

      breakdownHTML += `
        <div class="flex justify-between items-center py-1 border-b">
          <span class="text-sm">${item.name}: ¥${item.price} × ${Math.round(orders)}件 （注文率${item.orderRate}%）</span>
          <span class="font-semibold">¥${Math.round(revenue).toLocaleString()}</span>
        </div>
      `;
    });

    breakdownHTML += `
      <div class="flex justify-between items-center py-2 mt-2 bg-green-200 rounded px-2">
        <span class="font-bold text-green-900">月間売上合計</span>
        <span class="font-bold text-green-900 text-xl">¥${Math.round(totalRevenue).toLocaleString()}</span>
      </div>
    `;

    const breakdownEl = document.getElementById('cafe-revenue-breakdown');
    if (breakdownEl) breakdownEl.innerHTML = breakdownHTML;

    const revenueEl = document.getElementById('cafe-total-revenue');
    const costDisplayEl = document.getElementById('cafe-total-cost');
    if (revenueEl) revenueEl.textContent = `¥${Math.round(totalRevenue).toLocaleString()}`;
    if (costDisplayEl) costDisplayEl.textContent = `¥${Math.round(totalCost).toLocaleString()}`;

    calculateCafeProfit();
  };

  function calculateCafeProfit() {
    const revenueText = document.getElementById('cafe-total-revenue')?.textContent || '¥0';
    const revenue = parseFloat(revenueText.replace(/[¥,]/g, '')) || 0;
    if (!window.cafeExpenses) return;

    const fixedTotal = window.cafeExpenses.fixed.reduce((sum, e) => sum + (e.amount || 0), 0);
    const variableTotal = window.cafeExpenses.variable.reduce((sum, e) => sum + (e.amount || 0), 0);

    const days = parseFloat(document.getElementById('cafe-days')?.value) || 0;
    const morning = parseFloat(document.getElementById('cafe-morning')?.value) || 0;
    const lunch = parseFloat(document.getElementById('cafe-lunch')?.value) || 0;
    const afternoon = parseFloat(document.getElementById('cafe-afternoon')?.value) || 0;
    const dinner = parseFloat(document.getElementById('cafe-dinner')?.value) || 0;
    const monthlyCustomers = (morning + lunch + afternoon + dinner) * days;

    let totalCost = 0;
    window.cafeMenuItems.forEach(item => {
      const orders = monthlyCustomers * (item.orderRate / 100);
      const itemRevenue = orders * item.price;
      totalCost += itemRevenue * (item.costRate / 100);
    });

    const totalExpense = fixedTotal + variableTotal;
    const netProfit = revenue - totalCost - totalExpense;
    const profitRate = revenue > 0 ? ((revenue - totalCost) / revenue * 100) : 0;

    const grossCostEl = document.getElementById('cafe-gross-cost');
    const expenseEl = document.getElementById('cafe-total-expense');
    const profitEl = document.getElementById('cafe-net-profit');
    const profitRateEl = document.getElementById('cafe-profit-rate');

    if (grossCostEl) grossCostEl.textContent = `¥${Math.round(totalCost).toLocaleString()}`;
    if (expenseEl) expenseEl.textContent = `¥${totalExpense.toLocaleString()}`;
    if (profitEl) {
      profitEl.textContent = `¥${Math.round(netProfit).toLocaleString()}`;
      profitEl.className = `text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-green-200' : 'text-red-200'}`;
    }
    if (profitRateEl) profitRateEl.textContent = `${profitRate.toFixed(1)}%`;
  }

  window.applyCafeSimulation = function() {
    budgetItems.income = [];
    budgetItems.expense = [];

    window.cafeMenuItems.forEach(item => {
      const days = parseFloat(document.getElementById('cafe-days')?.value) || 0;
      const morning = parseFloat(document.getElementById('cafe-morning')?.value) || 0;
      const lunch = parseFloat(document.getElementById('cafe-lunch')?.value) || 0;
      const afternoon = parseFloat(document.getElementById('cafe-afternoon')?.value) || 0;
      const dinner = parseFloat(document.getElementById('cafe-dinner')?.value) || 0;
      const monthlyCustomers = (morning + lunch + afternoon + dinner) * days;
      const orders = monthlyCustomers * (item.orderRate / 100);
      const revenue = orders * item.price;

      if (revenue > 0) {
        budgetItems.income.push({ id: Date.now() + Math.random(), type: 'income', name: item.name, amount: Math.round(revenue), note: `¥${item.price}×${Math.round(orders)}件（注文率${item.orderRate}%）` });
      }
    });

    const days = parseFloat(document.getElementById('cafe-days')?.value) || 0;
    const morning = parseFloat(document.getElementById('cafe-morning')?.value) || 0;
    const lunch = parseFloat(document.getElementById('cafe-lunch')?.value) || 0;
    const afternoon = parseFloat(document.getElementById('cafe-afternoon')?.value) || 0;
    const dinner = parseFloat(document.getElementById('cafe-dinner')?.value) || 0;
    const monthlyCustomers = (morning + lunch + afternoon + dinner) * days;

    let totalCost = 0;
    window.cafeMenuItems.forEach(item => {
      const orders = monthlyCustomers * (item.orderRate / 100);
      const itemRevenue = orders * item.price;
      totalCost += itemRevenue * (item.costRate / 100);
    });

    if (totalCost > 0) {
      budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: '食材費（原価）', amount: Math.round(totalCost), note: 'メニュー別原価率から算出' });
    }

    if (window.cafeExpenses) {
      window.cafeExpenses.fixed.forEach(exp => {
        budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: exp.name, amount: exp.amount, note: `固定費: ${exp.note}` });
      });
      window.cafeExpenses.variable.forEach(exp => {
        budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: exp.name, amount: exp.amount, note: `変動費: ${exp.note}` });
      });
    }

    renderBudgetLists();
    showNotification('カフェ・飲食店収支計画を予算に反映しました', 'success');
  };

  // ===== 目標月収からのシミュレーション =====
  window.simulateFromTarget = function() {
    const targetIncome = parseFloat(document.getElementById('target-monthly-income')?.value) || 0;
    const businessModel = document.getElementById('business-model-select')?.value;
    const resultSection = document.getElementById('simulation-result');
    const contentEl = document.getElementById('simulation-content');
    if (!resultSection || !contentEl) return;

    if (targetIncome === 0 || !businessModel) {
      resultSection.classList.add('hidden');
      return;
    }

    if (businessModel === 'guesthouse') {
      contentEl.innerHTML = renderGuesthouseSimulator();
      resultSection.classList.remove('hidden');
      setTimeout(() => {
        initializeGuesthouseExpenses();
        calculateGuesthouseRevenue();
      }, 10);
      return;
    }

    if (businessModel === 'cafe') {
      showDetailedCafeSimulator();
      return;
    }

  const models = {
      coworking: {
        name: 'コワーキングスペース',
        incomes: [ { name: '月額会員', unitPrice: 15000, description: '月額会員費' }, { name: 'ドロップイン', unitPrice: 1000, description: 'ドロップイン利用' } ],
        expenses: [ { name: '家賃', amount: 80000, description: '施設賃料' }, { name: '水道光熱費', amount: 30000, description: '電気・水道・ガス' }, { name: '通信費', amount: 10000, description: 'インターネット' } ],
        profitRate: 0.4
      },
      guesthouse: {
        name: 'ゲストハウス',
        incomes: [ { name: '宿泊料', unitPrice: 4000, description: '1泊あたり' } ],
        expenses: [ { name: '家賃', amount: 100000, description: '施設賃料' }, { name: '水道光熱費', amount: 50000, description: '電気・水道・ガス' }, { name: '消耗品費', amount: 30000, description: 'リネン・アメニティ等' } ],
        profitRate: 0.35
      },
      cafe: {
        name: 'カフェ・飲食店',
        incomes: [ { name: '飲食売上', unitPrice: 800, description: '客単価' } ],
        expenses: [ { name: '家賃', amount: 120000, description: '店舗賃料' }, { name: '食材費', amount: 150000, description: '原価（売上の30%想定）' }, { name: '水道光熱費', amount: 40000, description: '電気・水道・ガス' } ],
        profitRate: 0.25
      },
      event: {
        name: 'イベント事業',
        incomes: [ { name: 'イベント参加費', unitPrice: 3000, description: '1人あたり' } ],
        expenses: [ { name: '会場費', amount: 50000, description: '月平均' }, { name: '材料費', amount: 40000, description: 'イベント材料' }, { name: '広告宣伝費', amount: 30000, description: 'SNS広告等' } ],
        profitRate: 0.45
      },
      tour: {
        name: '観光ツアー',
        incomes: [ { name: 'ツアー料金', unitPrice: 5000, description: '1人あたり' } ],
        expenses: [ { name: '交通費', amount: 60000, description: '車両維持費等' }, { name: '保険料', amount: 20000, description: '旅行保険' }, { name: '広告宣伝費', amount: 40000, description: 'プロモーション' } ],
        profitRate: 0.5
      },
      consulting: {
        name: 'コンサル・サービス',
        incomes: [ { name: 'コンサル料', unitPrice: 50000, description: '1件あたり' } ],
        expenses: [ { name: '通信費', amount: 15000, description: 'インターネット・電話' }, { name: '交通費', amount: 30000, description: '訪問交通費' }, { name: '広告宣伝費', amount: 25000, description: 'Web広告等' } ],
        profitRate: 0.7
      },
      subscription: {
        name: 'サブスク・会員制',
        incomes: [ { name: '月額会費', unitPrice: 2000, description: '1人あたり' } ],
        expenses: [ { name: 'サーバー費', amount: 20000, description: 'システム維持費' }, { name: 'コンテンツ制作費', amount: 50000, description: '月次コンテンツ' }, { name: '広告宣伝費', amount: 40000, description: 'プロモーション' } ],
        profitRate: 0.6
      }
    };

    const model = models[businessModel];
    if (!model) return;

    const requiredRevenue = Math.ceil(targetIncome / model.profitRate);

    budgetItems.income = [];
    budgetItems.expense = [];

    model.incomes.forEach(income => {
      const requiredUnits = Math.ceil(requiredRevenue / model.incomes.length / income.unitPrice);
      budgetItems.income.push({ id: Date.now() + Math.random(), type: 'income', name: income.name, amount: income.unitPrice * requiredUnits, note: `単価¥${income.unitPrice.toLocaleString()} × ${requiredUnits}件` });
    });

    model.expenses.forEach(expense => {
      budgetItems.expense.push({ id: Date.now() + Math.random(), type: 'expense', name: expense.name, amount: expense.amount, note: '月次固定費' });
    });

  renderBudgetLists();

  // 画面用のシミュレーション可視化
  const totalExpenses = model.expenses.reduce((sum, e) => sum + e.amount, 0);
    if (contentEl && resultSection) {
      let simulationHTML = `
        <div class="space-y-3">
          <div class="flex justify-between items-center pb-2 border-b">
            <span class="text-green-800">必要な月次売上</span>
            <span class="font-bold text-green-900">¥${requiredRevenue.toLocaleString()}</span>
          </div>
      `;
      model.incomes.forEach((income) => {
        const requiredUnits = Math.ceil(requiredRevenue / model.incomes.length / income.unitPrice);
        simulationHTML += `
          <div class="bg-blue-50 rounded p-2">
            <div class="text-xs text-blue-700 mb-1">${income.name}（${income.description}）</div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-blue-900">単価 ¥${income.unitPrice.toLocaleString()} × ${requiredUnits}${income.name.includes('会員') ? '人' : income.name.includes('料') ? '件' : '回'}</span>
              <span class="font-semibold text-blue-900">¥${(income.unitPrice * requiredUnits).toLocaleString()}</span>
            </div>
          </div>
        `;
      });
      simulationHTML += `
          <div class="pt-2 border-t">
            <div class="text-xs text-gray-600 mb-2">主な固定費（想定）</div>
      `;
      model.expenses.forEach(expense => {
        simulationHTML += `
          <div class="flex justify-between items-center text-xs text-gray-700 py-1">
            <span>${expense.name}</span>
            <span>¥${expense.amount.toLocaleString()}</span>
          </div>
        `;
      });
      simulationHTML += `
          </div>
          <div class="pt-2 border-t bg-green-100 rounded p-2 -mx-2">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-green-900">想定粗利</span>
              <span class="font-bold text-green-900">¥${targetIncome.toLocaleString()}</span>
            </div>
            <div class="text-xs text-green-700 mt-1">
              （粗利率: ${(model.profitRate * 100).toFixed(0)}%想定）
            </div>
          </div>
        </div>
      `;
  contentEl.innerHTML = simulationHTML;
  resultSection.classList.remove('hidden');
    }

    showNotification('シミュレーション結果を予算に反映しました', 'success');
  };

  // 明示的に「この試算を予算に反映」ボタンで再反映（同じモデル）
  window.applySimulation = function() {
    window.simulateFromTarget();
  };
})();
