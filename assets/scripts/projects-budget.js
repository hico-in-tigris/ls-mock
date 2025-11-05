// ===============================
// LocalSuccess - Projects Budget & Schedule Module
// ===============================

function renderBudgetContent() {
    const saved = JSON.parse(localStorage.getItem('budgetData') || '{}');
    const items = Array.isArray(saved.items) ? saved.items : [];
    const milestones = Array.isArray(saved.milestones) ? saved.milestones : [];

    const total = items.reduce((sum, it) => sum + (Number(it.cost) || 0), 0);

    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-gray-600 to-black rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M3 7h18M3 21h18M3 11h10M3 15h10"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">ステップ5: 予算/スケジュール作成</h2>
                        <p class="text-sm text-muted-foreground">費目別の予算とマイルストーンを設定します</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left: Budget Items -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">予算（費目別）</h3>
                            <p class="text-sm text-muted-foreground">項目名・数量・単価または合計を入力</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="flex items-center gap-2">
                                <input id="budget-name" type="text" placeholder="項目名（例: 会場費）" class="flex-1 p-2 border border-input rounded-md text-sm" />
                                <input id="budget-qty" type="number" min="1" placeholder="数量" class="w-24 p-2 border border-input rounded-md text-sm" />
                                <input id="budget-unit" type="number" min="0" placeholder="単価" class="w-28 p-2 border border-input rounded-md text-sm" />
                                <button onclick="addBudgetItem()" class="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-black text-sm">追加</button>
                            </div>
                            <div id="budget-items" class="space-y-2">
                                ${items.length === 0 ? '<p class="text-gray-400 text-center py-4">まだ項目がありません</p>' : items.map(renderBudgetItemRow).join('')}
                            </div>
                            <div class="flex items-center justify-between pt-3 border-t">
                                <div class="text-sm text-muted-foreground">合計</div>
                                <div class="text-xl font-bold">¥${formatCurrency(total)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Schedule -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">スケジュール（マイルストーン）</h3>
                            <p class="text-sm text-muted-foreground">重要な節目と期限を設定</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="flex items-center gap-2">
                                <input id="ms-title" type="text" placeholder="マイルストーン（例: 企画承認）" class="flex-1 p-2 border border-input rounded-md text-sm" />
                                <input id="ms-date" type="date" class="p-2 border border-input rounded-md text-sm" />
                                <button onclick="addMilestone()" class="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-black text-sm">追加</button>
                            </div>
                            <div id="milestone-list" class="space-y-2">
                                ${milestones.length === 0 ? '<p class="text-gray-400 text-center py-4">まだマイルストーンがありません</p>' : milestones.map(renderMilestoneRow).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="flex gap-3">
                                <button onclick="saveBudgetData(); markStepCompleted('budget'); openIdeationWorkspace('proposal')" class="flex-1 px-6 py-3 bg-gradient-to-r from-gray-700 to-black text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                                    資料作成へ進む →
                                </button>
                                <button onclick="saveBudgetData()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    保存
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderBudgetItemRow(item, idx) {
    const cost = item.cost ?? (Number(item.qty||0) * Number(item.unit||0));
    return `
        <div class="flex items-center justify-between p-2 border rounded-md text-sm">
            <div class="flex items-center gap-3">
                <div class="font-medium">${escapeHtml(item.name||'未設定')}</div>
                <div class="text-muted-foreground">${item.qty||'-'} × ¥${formatCurrency(item.unit||0)}</div>
            </div>
            <div class="flex items-center gap-3">
                <div class="font-semibold">¥${formatCurrency(cost||0)}</div>
                <button onclick="removeBudgetItem(${idx})" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

function renderMilestoneRow(ms, idx) {
    return `
        <div class="flex items-center justify-between p-2 border rounded-md text-sm">
            <div>
                <div class="font-medium">${escapeHtml(ms.title||'未設定')}</div>
                <div class="text-muted-foreground">${ms.date ? new Date(ms.date).toLocaleDateString('ja-JP') : '-'}</div>
            </div>
            <button onclick="removeMilestone(${idx})" class="text-red-500 hover:text-red-700">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
}

function addBudgetItem() {
    const name = document.getElementById('budget-name').value.trim();
    const qty = Number(document.getElementById('budget-qty').value || 0);
    const unit = Number(document.getElementById('budget-unit').value || 0);
    if (!name) { alert('項目名を入力してください'); return; }
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    data.items = Array.isArray(data.items) ? data.items : [];
    data.items.push({ name, qty, unit, cost: qty * unit });
    localStorage.setItem('budgetData', JSON.stringify(data));
    updateBudgetUI();
}

function removeBudgetItem(index) {
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    data.items = Array.isArray(data.items) ? data.items : [];
    data.items.splice(index, 1);
    localStorage.setItem('budgetData', JSON.stringify(data));
    updateBudgetUI();
}

function addMilestone() {
    const title = document.getElementById('ms-title').value.trim();
    const date = document.getElementById('ms-date').value;
    if (!title) { alert('マイルストーンを入力してください'); return; }
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    data.milestones = Array.isArray(data.milestones) ? data.milestones : [];
    data.milestones.push({ title, date });
    localStorage.setItem('budgetData', JSON.stringify(data));
    updateBudgetUI();
}

function removeMilestone(index) {
    const data = JSON.parse(localStorage.getItem('budgetData') || '{}');
    data.milestones = Array.isArray(data.milestones) ? data.milestones : [];
    data.milestones.splice(index, 1);
    localStorage.setItem('budgetData', JSON.stringify(data));
    updateBudgetUI();
}

function updateBudgetUI() {
    const saved = JSON.parse(localStorage.getItem('budgetData') || '{}');
    const items = Array.isArray(saved.items) ? saved.items : [];
    const milestones = Array.isArray(saved.milestones) ? saved.milestones : [];

    const itemsEl = document.getElementById('budget-items');
    const msEl = document.getElementById('milestone-list');
    if (itemsEl) {
        itemsEl.innerHTML = items.length === 0 ? '<p class="text-gray-400 text-center py-4">まだ項目がありません</p>' : items.map(renderBudgetItemRow).join('');
        const total = items.reduce((s, it) => s + (Number(it.cost)||0), 0);
        // Update total text
        const totals = itemsEl.parentElement?.querySelectorAll('div.font-bold');
        // Not strictly necessary; total row is rebuilt on render.
    }
    if (msEl) {
        msEl.innerHTML = milestones.length === 0 ? '<p class="text-gray-400 text-center py-4">まだマイルストーンがありません</p>' : milestones.map(renderMilestoneRow).join('');
    }
}

function saveBudgetData() {
    // Already persisted on add/remove; show toast only
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    message.textContent = '予算/スケジュールを保存しました';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function formatCurrency(num) {
    try { return Number(num||0).toLocaleString('ja-JP'); } catch { return String(num||0); }
}

function escapeHtml(text) {
    return String(text||'').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

// Export to global
window.renderBudgetContent = renderBudgetContent;
window.addBudgetItem = addBudgetItem;
window.removeBudgetItem = removeBudgetItem;
window.addMilestone = addMilestone;
window.removeMilestone = removeMilestone;
window.saveBudgetData = saveBudgetData;
window.updateBudgetUI = updateBudgetUI;
