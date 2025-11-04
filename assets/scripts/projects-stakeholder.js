// ===============================
// LocalSuccess - Projects Stakeholder Analysis Module
// ===============================

function renderStakeholderContent() {
    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">ステップ4: 関係者分析</h2>
                        <p class="text-sm text-muted-foreground">プロジェクトの関係者を特定し、影響力や関心度を分析しましょう</p>
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
                <!-- Left Column: Stakeholder Input -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">関係者の追加</h3>
                            <p class="text-sm text-muted-foreground">プロジェクトに関係する人や組織を特定して追加してください</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="flex gap-2 mb-4">
                                <button onclick="suggestStakeholdersFromFramework()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                    </svg>
                                    推奨関係者
                                </button>
                                <button onclick="showNetworkStakeholderSelector()" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                                    </svg>
                                    ネットワークから選択
                                </button>
                            </div>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">関係者名</label>
                                    <input type="text" id="stakeholder-name" placeholder="例: 田中太郎" class="w-full p-3 border border-input rounded-md">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">役割・ポジション</label>
                                    <input type="text" id="stakeholder-role" placeholder="例: プロジェクトマネージャー" class="w-full p-3 border border-input rounded-md">
                                </div>
                                
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2">影響力</label>
                                        <select id="stakeholder-influence" class="w-full p-3 border border-input rounded-md">
                                            <option value="low">低</option>
                                            <option value="medium">中</option>
                                            <option value="high">高</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label class="block text-sm font-medium mb-2">関心度</label>
                                        <select id="stakeholder-interest" class="w-full p-3 border border-input rounded-md">
                                            <option value="low">低</option>
                                            <option value="medium">中</option>
                                            <option value="high">高</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium mb-2">特記事項</label>
                                    <textarea id="stakeholder-notes" placeholder="その他の重要な情報があれば記載してください" class="w-full p-3 border border-input rounded-md h-20"></textarea>
                                </div>
                                
                                <button onclick="addStakeholderToMatrix()" class="w-full px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                                    関係者を追加
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Stakeholder Matrix -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">関係者マップ</h3>
                            <p class="text-sm text-muted-foreground">影響力と関心度に基づいて関係者を分析</p>
                        </div>
                        <div class="card-content">
                            <div id="stakeholder-matrix" class="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                                <div class="text-center text-gray-400 py-8">
                                    <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    <p>関係者を追加するとマッピングが表示されます</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">対応戦略</h3>
                        </div>
                        <div class="card-content">
                            <div class="space-y-3 text-sm">
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-red-500 rounded"></div>
                                    <span><strong>高影響力・高関心</strong>: 密接に管理・エンゲージ</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-orange-500 rounded"></div>
                                    <span><strong>高影響力・低関心</strong>: 満足度を維持</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-yellow-500 rounded"></div>
                                    <span><strong>低影響力・高関心</strong>: 十分な情報提供</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div class="w-4 h-4 bg-green-500 rounded"></div>
                                    <span><strong>低影響力・低関心</strong>: 最小限の努力</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Stakeholder List -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">関係者一覧</h3>
                        </div>
                        <div class="card-content">
                            <div id="stakeholder-list" class="space-y-2">
                                <p class="text-gray-400 text-center py-4">まだ関係者が追加されていません</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button onclick="openIdeationWorkspace('goal-setting')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    ← 前のステップ
                </button>
                <div class="text-center">
                    <div class="text-sm text-muted-foreground mb-2">ステップ 4 / 5</div>
                    <div class="w-64 h-2 bg-gray-200 rounded-full mx-auto">
                        <div class="w-4/5 h-2 bg-orange-600 rounded-full"></div>
                    </div>
                </div>
                <button onclick="markStepCompleted('stakeholder'); openIdeationWorkspace('proposal')" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    提案作成へ →
                </button>
            </div>
        </div>
    `;
}

// Stakeholder management functions
let stakeholders = [];

function addStakeholderToMatrix() {
    const name = document.getElementById('stakeholder-name').value;
    const role = document.getElementById('stakeholder-role').value;
    const influence = document.getElementById('stakeholder-influence').value;
    const interest = document.getElementById('stakeholder-interest').value;
    const notes = document.getElementById('stakeholder-notes').value;
    
    if (!name || !role) {
        alert('名前と役割は必須です');
        return;
    }
    
    const stakeholder = {
        id: Date.now(),
        name,
        role,
        influence,
        interest,
        notes
    };
    
    stakeholders.push(stakeholder);
    
    // Clear form
    document.getElementById('stakeholder-name').value = '';
    document.getElementById('stakeholder-role').value = '';
    document.getElementById('stakeholder-influence').value = 'low';
    document.getElementById('stakeholder-interest').value = 'low';
    document.getElementById('stakeholder-notes').value = '';
    
    updateStakeholderMatrix();
    updateStakeholderList();
    saveStakeholderData();
}

function updateStakeholderMatrix() {
    const matrix = document.getElementById('stakeholder-matrix');
    if (!matrix || stakeholders.length === 0) return;
    
    const matrixSize = 300;
    const quadrantSize = matrixSize / 2;
    
    matrix.innerHTML = `
        <div class="relative" style="width: ${matrixSize}px; height: ${matrixSize}px;">
            <!-- Grid lines -->
            <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 border border-gray-300">
                <div class="border-r border-b border-gray-300 bg-green-50"></div>
                <div class="border-b border-gray-300 bg-yellow-50"></div>
                <div class="border-r border-gray-300 bg-orange-50"></div>
                <div class="bg-red-50"></div>
            </div>
            
            <!-- Axis labels -->
            <div class="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-600">影響力</div>
            <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">関心度</div>
            
            <!-- Stakeholder dots -->
            ${stakeholders.map(stakeholder => {
                const x = getPositionValue(stakeholder.interest) * quadrantSize * 1.8 + 20;
                const y = matrixSize - (getPositionValue(stakeholder.influence) * quadrantSize * 1.8 + 20);
                const color = getStakeholderColor(stakeholder.influence, stakeholder.interest);
                
                return `
                    <div class="absolute w-3 h-3 rounded-full ${color} cursor-pointer transform -translate-x-1/2 -translate-y-1/2" 
                         style="left: ${x}px; top: ${y}px;"
                         title="${stakeholder.name} (${stakeholder.role})"
                         onclick="showStakeholderDetails(${stakeholder.id})">
                    </div>
                `;
            }).join('')}
        </div>
        
        <!-- Legend -->
        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div class="text-left">
                <div class="font-medium">低関心</div>
                <div class="text-gray-500">情報提供</div>
            </div>
            <div class="text-right">
                <div class="font-medium">高関心</div>
                <div class="text-gray-500">積極的関与</div>
            </div>
        </div>
    `;
}

function updateStakeholderList() {
    const list = document.getElementById('stakeholder-list');
    if (!list) return;
    
    if (stakeholders.length === 0) {
        list.innerHTML = '<p class="text-gray-400 text-center py-4">まだ関係者が追加されていません</p>';
        return;
    }
    
    list.innerHTML = stakeholders.map(stakeholder => `
        <div class="flex items-center justify-between p-3 border rounded-lg">
            <div>
                <h4 class="font-medium text-sm">${stakeholder.name}</h4>
                <p class="text-xs text-gray-600">${stakeholder.role}</p>
            </div>
            <div class="flex space-x-2">
                <span class="text-xs px-2 py-1 rounded-full ${getInfluenceBadgeColor(stakeholder.influence)}">
                    影響: ${stakeholder.influence}
                </span>
                <span class="text-xs px-2 py-1 rounded-full ${getInterestBadgeColor(stakeholder.interest)}">
                    関心: ${stakeholder.interest}
                </span>
            </div>
        </div>
    `).join('');
}

function getPositionValue(level) {
    switch(level) {
        case 'high': return 1;
        case 'medium': return 0.5;
        case 'low': return 0.1;
        default: return 0.1;
    }
}

function getStakeholderColor(influence, interest) {
    if (influence === 'high' && interest === 'high') return 'bg-red-500';
    if (influence === 'high' && interest === 'low') return 'bg-orange-500';
    if (influence === 'low' && interest === 'high') return 'bg-yellow-500';
    return 'bg-green-500';
}

function getInfluenceBadgeColor(influence) {
    switch(influence) {
        case 'high': return 'bg-red-100 text-red-700';
        case 'medium': return 'bg-yellow-100 text-yellow-700';
        case 'low': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-700';
    }
}

function getInterestBadgeColor(interest) {
    switch(interest) {
        case 'high': return 'bg-blue-100 text-blue-700';
        case 'medium': return 'bg-yellow-100 text-yellow-700';
        case 'low': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-700';
    }
}

function saveStakeholderData() {
    const stakeholderData = {
        stakeholders: stakeholders,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('stakeholderData', JSON.stringify(stakeholderData));
}

function generateStakeholderMatrix() {
    updateStakeholderMatrix();
    updateStakeholderList();
}

function suggestStakeholdersFromFramework() {
    // Get planning data to suggest relevant stakeholders
    const planningData = JSON.parse(localStorage.getItem('planningData') || '{}');
    const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
    
    const suggestions = [
        { name: 'プロジェクトマネージャー', role: '企画推進責任者', influence: 'high', interest: 'high' },
        { name: '予算承認者', role: '経営層・部長', influence: 'high', interest: 'medium' },
        { name: '実行チームリーダー', role: '現場責任者', influence: 'medium', interest: 'high' },
        { name: '対象ユーザー代表', role: 'エンドユーザー', influence: 'low', interest: 'high' }
    ];
    
    suggestions.forEach(suggestion => {
        stakeholders.push({
            id: Date.now() + Math.random(),
            name: suggestion.name,
            role: suggestion.role,
            influence: suggestion.influence,
            interest: suggestion.interest,
            notes: '推奨関係者として追加'
        });
    });
    
    updateStakeholderMatrix();
    updateStakeholderList();
    saveStakeholderData();
    
    // Show notification
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg z-50';
    message.textContent = '推奨関係者を追加しました';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showNetworkStakeholderSelector() {
    // Show people network selector modal
    const modal = document.createElement('div');
    modal.id = 'network-stakeholder-selector';
    modal.className = 'fixed inset-0 z-50 bg-black/50';
    modal.innerHTML = `
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold">ネットワークから関係者を選択</h3>
                    <button onclick="closeNetworkSelector()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div class="space-y-3">
                    <div class="p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onclick="addPersonAsStakeholder({id: 1, name: '田中太郎', role: 'システムエンジニア'})">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span class="text-sm font-medium">田</span>
                            </div>
                            <div>
                                <div class="font-medium">田中太郎</div>
                                <div class="text-sm text-gray-600">システムエンジニア</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 border rounded-lg cursor-pointer hover:bg-gray-50" onclick="addPersonAsStakeholder({id: 2, name: '佐藤花子', role: 'プロジェクトマネージャー'})">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span class="text-sm font-medium">佐</span>
                            </div>
                            <div>
                                <div class="font-medium">佐藤花子</div>
                                <div class="text-sm text-gray-600">プロジェクトマネージャー</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function addPersonAsStakeholder(person, isRecommended = false) {
    // Add person from network to stakeholder list
    const stakeholder = {
        id: Date.now(),
        name: person.name,
        role: person.role,
        influence: 'medium',
        interest: 'medium',
        notes: isRecommended ? '推奨関係者として追加' : 'ネットワークから追加'
    };
    
    stakeholders.push(stakeholder);
    updateStakeholderMatrix();
    updateStakeholderList();
    saveStakeholderData();
    
    // Close modal
    closeNetworkSelector();
    
    // Show success message
    const message = isRecommended ? 
        `${person.name}さんを推奨関係者として追加しました。フォームをご確認ください。` :
        `${person.name}さんの情報をフォームに入力しました。`;
    
    // Show temporary success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function closeNetworkSelector() {
    const overlay = document.getElementById('network-stakeholder-selector');
    if (overlay) {
        overlay.remove();
    }
}

// Export functions to global scope
window.renderStakeholderContent = renderStakeholderContent;
window.addStakeholderToMatrix = addStakeholderToMatrix;
window.updateStakeholderMatrix = updateStakeholderMatrix;
window.updateStakeholderList = updateStakeholderList;
window.saveStakeholderData = saveStakeholderData;
window.generateStakeholderMatrix = generateStakeholderMatrix;
window.suggestStakeholdersFromFramework = suggestStakeholdersFromFramework;
window.showNetworkStakeholderSelector = showNetworkStakeholderSelector;
window.addPersonAsStakeholder = addPersonAsStakeholder;
window.closeNetworkSelector = closeNetworkSelector;