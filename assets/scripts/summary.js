// ===============================
// LocalSuccess - Summary Module (Main)
// ===============================

function renderSummary(container) {
    // Load saved data
    loadReflectionData();
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">ふりかえり</h1>
                    <p class="text-muted-foreground">定期的なふりかえりで継続的な改善を図りましょう</p>
                </div>
                <div class="flex space-x-2">
                    ${createButton({
                        text: '保存',
                        variant: 'secondary',
                        onClick: 'saveSummary()',
                        icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                            <polyline points="17,21 17,13 7,13 7,21"/>
                            <polyline points="7,3 7,8 15,8"/>
                        </svg>`
                    })}
                    ${createButton({
                        text: '次期プランに反映',
                        variant: 'primary',
                        onClick: 'promoteSelectedToNext()',
                        icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,11 12,14 22,4"/>
                        </svg>`
                    })}
                </div>
            </div>
            
            <!-- Period Selector -->
            <div class="mb-6">
                <div class="flex space-x-2 border-b border-border">
                    <button onclick="switchReflectionPeriod('daily')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-primary text-primary" 
                            data-period="daily">
                        そのときのメモ
                    </button>
                    <button onclick="switchReflectionPeriod('weekly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="weekly">
                        週次
                    </button>
                    <button onclick="switchReflectionPeriod('monthly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="monthly">
                        月次
                    </button>
                    <button onclick="switchReflectionPeriod('yearly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="yearly">
                        年次
                    </button>
                </div>
            </div>
            
            <!-- Reflection Content -->
            <div id="reflection-content">
                ${renderDailyReflection()}
            </div>
            
            <!-- Add Action Modal -->
            <div id="action-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center">
                <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold flex items-center">
                            <svg class="mr-2 h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 4v16m8-8H4"/>
                            </svg>
                            新しいアクションを追加
                        </h3>
                        <button onclick="closeActionModal()" class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    
                    <form id="action-form" class="space-y-4">
                        <div>
                            <label class="text-sm font-medium block mb-2">時間</label>
                            <input id="modal-action-time" type="time" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                        </div>
                        
                        <div>
                            <label class="text-sm font-medium block mb-2">アクション内容</label>
                            <input id="modal-action-content" type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="実施したアクション" required>
                        </div>
                        
                        <div>
                            <label class="text-sm font-medium block mb-2">種類</label>
                            <select id="modal-action-type" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="meeting">会議</option>
                                <option value="work">作業</option>
                                <option value="research">調査</option>
                                <option value="planning">企画</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="text-sm font-medium block mb-2">結果・成果</label>
                            <textarea id="modal-action-result" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="どのような結果や成果が得られましたか？" required></textarea>
                        </div>
                        
                        <div class="flex space-x-3 pt-4">
                            <button type="submit" class="flex-1 inline-flex items-center justify-center py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 6L9 17l-5-5"/>
                                </svg>
                                保存して追加
                            </button>
                            <button type="button" onclick="closeActionModal()" class="flex-1 inline-flex items-center justify-center py-3 px-4 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg shadow-md transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                キャンセル
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // モーダルのフォーム送信イベントを設定
    setTimeout(() => {
        const actionForm = document.getElementById('action-form');
        if (actionForm) {
            actionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addActionFromModal();
            });
        }
    }, 100);
}

// Period switching and action functions
function switchReflectionPeriod(period) {
    // Update tab appearance
    document.querySelectorAll('.reflection-tab').forEach(tab => {
        tab.classList.remove('border-primary', 'text-primary');
        tab.classList.add('border-transparent', 'text-muted-foreground');
    });
    
    const activeTab = document.querySelector(`[data-period="${period}"]`);
    if (activeTab) {
        activeTab.classList.remove('border-transparent', 'text-muted-foreground');
        activeTab.classList.add('border-primary', 'text-primary');
    }
    
    // Render content for selected period using the new function
    renderReflectionContent(period);
}

// Expose to global scope
window.renderSummary = renderSummary;
window.switchReflectionPeriod = switchReflectionPeriod;