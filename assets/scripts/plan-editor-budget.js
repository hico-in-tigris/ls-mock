// Extracted Budget Module
// Handles budget items CRUD, list rendering, and totals update. Exposes required APIs on window.
(function(){
  // ===== 予算・収支管理機能 =====
  let budgetItems = {
    income: [],
    expense: []
  };

  // 予算項目を追加
  window.addBudgetRow = function(type) {
    const item = {
      id: Date.now(),
      type: type, // 'income' or 'expense'
      name: '',
      amount: 0,
      note: ''
    };
    budgetItems[type].push(item);
    renderBudgetLists();
  };

  // 予算項目を削除
  window.removeBudgetItem = function(type, id) {
    budgetItems[type] = budgetItems[type].filter(item => item.id !== id);
    renderBudgetLists();
  };

  // 予算項目を更新
  window.updateBudgetItem = function(type, id, field, value) {
    const item = budgetItems[type].find(i => i.id === id);
    if (item) {
      item[field] = field === 'amount' ? parseFloat(value) || 0 : value;
      updateTotals();
    }
  };

  // 予算リストを描画
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
        <input 
          type="text" 
          value="${item.name}" 
          placeholder="${type === 'income' ? '収入' : '支出'}項目名"
          class="col-span-4 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          onchange="updateBudgetItem('${type}', ${item.id}, 'name', this.value)"
        />
        <div class="col-span-3 relative">
          <input 
            type="number" 
            value="${item.amount}" 
            placeholder="0"
            class="w-full px-2 py-1 pr-8 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm text-right"
            onchange="updateBudgetItem('${type}', ${item.id}, 'amount', this.value)"
          />
          <span class="absolute right-2 top-1 text-xs text-muted-foreground">円</span>
        </div>
        <input 
          type="text" 
          value="${item.note}" 
          placeholder="備考・メモ"
          class="col-span-4 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          onchange="updateBudgetItem('${type}', ${item.id}, 'note', this.value)"
        />
        <button 
          onclick="removeBudgetItem('${type}', ${item.id})" 
          class="col-span-1 text-red-600 hover:text-red-800 text-sm"
          title="削除"
        >
          <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    `).join('');
  }

  // 合計を更新
  function updateTotals() {
    const totalIncome = budgetItems.income.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalExpense = budgetItems.expense.reduce((sum, item) => sum + (item.amount || 0), 0);
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

  // 予算APIの公開（シミュレーター等が利用）
  window.renderBudgetLists = renderBudgetLists;
  window.budgetItems = budgetItems;
})();
