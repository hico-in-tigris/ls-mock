// ===============================
// LocalSuccess - Projects Planning Module
// ===============================

function renderPlanningContent() {
    return `
        <div class="p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">企画構成ワークスペース</h2>
                    <p class="text-muted-foreground">フレームワークで構造化</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <!-- Progress Navigation -->
            <div class="mb-6">
                <div class="flex items-center space-x-4">
                    <button onclick="openIdeationWorkspace('ideation')" class="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                        想いの整理
                    </button>
                    <div class="text-green-600 font-medium px-3 py-2 bg-green-50 rounded-md border border-green-200">
                        <svg class="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                        </svg>
                        企画構成
                    </div>
                    <button onclick="openIdeationWorkspace('goal-setting')" class="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                        目標設定
                    </button>
                </div>
            </div>
            
            <!-- Framework Selection -->
            <div class="card mb-6">
                <div class="card-header">
                    <h3 class="text-lg font-semibold">フレームワーク選択</h3>
                    <p class="text-sm text-muted-foreground">企画に適したフレームワークを選んで構造化しましょう</p>
                </div>
                <div class="card-content">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onclick="selectFramework('5w1h')" data-framework="5w1h" class="framework-btn p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                            </div>
                            <h4 class="font-semibold text-blue-800 mb-2">5W1H分析</h4>
                            <p class="text-sm text-gray-600">基本的な要素を整理</p>
                        </button>
                        
                        <button onclick="selectFramework('logic-tree')" data-framework="logic-tree" class="framework-btn p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors text-left">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                            </div>
                            <h4 class="font-semibold text-green-800 mb-2">ロジックツリー</h4>
                            <p class="text-sm text-gray-600">課題を構造的に分解</p>
                        </button>
                        
                        <button onclick="selectFramework('business-canvas')" data-framework="business-canvas" class="framework-btn p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors text-left">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h4 class="font-semibold text-purple-800 mb-2">ビジネスキャンバス</h4>
                            <p class="text-sm text-gray-600">事業モデルを可視化</p>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Framework Workspace -->
            <div class="card">
                <div class="card-content">
                    <div id="framework-workspace" class="text-center py-12">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2 text-gray-700">フレームワークを選択してください</h3>
                        <p class="text-gray-500">上からフレームワークを選んで企画を構造化しましょう</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Framework functions
function selectFramework(type) {
    const workspace = document.getElementById('framework-workspace');
    const buttons = document.querySelectorAll('.framework-btn');
    
    // Reset button styles
    buttons.forEach(btn => {
        btn.classList.remove('border-blue-500', 'border-green-500', 'border-purple-500');
        btn.classList.add('border-gray-200');
    });
    
    // Highlight selected button
    const selectedBtn = document.querySelector(`[data-framework="${type}"]`);
    if (selectedBtn) {
        selectedBtn.classList.remove('border-gray-200');
        if (type === '5w1h') {
            selectedBtn.classList.add('border-blue-500');
        } else if (type === 'logic-tree') {
            selectedBtn.classList.add('border-green-500');
        } else if (type === 'business-canvas') {
            selectedBtn.classList.add('border-purple-500');
        }
    }
    
    // Load saved ideation data
    const savedData = localStorage.getItem('ideationData');
    let ideationData = null;
    if (savedData) {
        ideationData = JSON.parse(savedData);
    }
    
    if (type === '5w1h') {
        workspace.innerHTML = render5W1HFramework(ideationData);
    } else if (type === 'logic-tree') {
        workspace.innerHTML = renderLogicTreeFramework(ideationData);
    } else if (type === 'business-canvas') {
        workspace.innerHTML = renderBusinessCanvasFramework(ideationData);
    }
}

function render5W1HFramework(ideationData) {
    const autoFillNotice = ideationData ? 
        '<div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"><div class="flex items-center"><svg class="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-sm text-blue-800 font-medium">想いの整理データから自動入力されました</span></div></div>' : '';
    
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-blue-800">5W1H分析</h3>
                <p class="text-sm text-gray-600">企画の要素を整理しましょう</p>
            </div>
            
            ${autoFillNotice}
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Who（誰が・誰に）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="対象者、実施者">${ideationData ? ideationData.target : ''}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">What（何を）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="何をするか、提供するか">${ideationData ? ideationData.solution : ''}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">When（いつ）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="実施時期、期間"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Where（どこで）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="場所、環境"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Why（なぜ）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="目的、理由">${ideationData ? ideationData.problem : ''}</textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">How（どのように）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="方法、手段">${ideationData ? ideationData.solution : ''}</textarea>
                </div>
            </div>
            
            <div class="text-center">
                <div class="flex justify-center space-x-3">
                    <button onclick="save5W1HData()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        分析結果を保存
                    </button>
                    <button onclick="proceedToStakeholderAnalysis('5w1h')" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                        関係者分析へ
                        <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderLogicTreeFramework(ideationData) {
    const autoFillNotice = ideationData ? 
        '<div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"><div class="flex items-center"><svg class="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-sm text-green-800 font-medium">想いの整理データから課題を分解構造化しました</span></div></div>' : '';
    
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-green-800">ロジックツリー</h3>
                <p class="text-sm text-gray-600">課題を構造的に分解します</p>
            </div>
            
            ${autoFillNotice}
            
            <div class="bg-gray-50 p-6 rounded-lg">
                <div class="space-y-4">
                    <div class="text-center">
                        <div class="inline-block p-4 bg-green-100 rounded-lg">
                            <h4 class="font-semibold text-green-800 mb-2">メイン課題</h4>
                            <textarea class="w-full h-16 p-2 border border-green-300 rounded resize-none" placeholder="解決すべき主要な課題">${ideationData ? ideationData.problem.split('\n')[0] || '' : ''}</textarea>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div class="text-center">
                            <h5 class="font-medium text-gray-700 mb-2">サブ課題 1</h5>
                            <textarea class="w-full h-20 p-2 border border-gray-300 rounded resize-none" placeholder="具体的な課題要素">${ideationData && ideationData.problem.split('\n')[1] ? ideationData.problem.split('\n')[1] : ''}</textarea>
                            <div class="mt-2 space-y-1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策2">
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <h5 class="font-medium text-gray-700 mb-2">サブ課題 2</h5>
                            <textarea class="w-full h-20 p-2 border border-gray-300 rounded resize-none" placeholder="具体的な課題要素">${ideationData && ideationData.problem.split('\n')[2] ? ideationData.problem.split('\n')[2] : ''}</textarea>
                            <div class="mt-2 space-y-1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策2">
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <h5 class="font-medium text-gray-700 mb-2">サブ課題 3</h5>
                            <textarea class="w-full h-20 p-2 border border-gray-300 rounded resize-none" placeholder="具体的な課題要素">${ideationData && ideationData.solution ? ideationData.solution.split('\n')[0] || '' : ''}</textarea>
                            <div class="mt-2 space-y-1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策1">
                                <input type="text" class="w-full p-1 text-xs border border-gray-200 rounded" placeholder="解決策2">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-6">
                    <div class="flex justify-center space-x-3">
                        <button onclick="saveLogicTreeData()" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            ツリー構造を保存
                        </button>
                        <button onclick="proceedToStakeholderAnalysis('logic-tree')" class="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                            関係者分析へ
                            <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderBusinessCanvasFramework(ideationData) {
    const autoFillNotice = ideationData ? 
        '<div class="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg"><div class="flex items-center"><svg class="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span class="text-sm text-purple-800 font-medium">想いの整理データからビジネスモデルを構築しました</span></div></div>' : '';
    
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-purple-800">ビジネスモデルキャンバス</h3>
                <p class="text-sm text-gray-600">事業モデルを可視化します</p>
            </div>
            
            ${autoFillNotice}
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <label class="block font-medium text-gray-700 mb-2">キーパートナー</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="重要なパートナー"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">キーアクティビティ</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="重要な活動">${ideationData ? ideationData.solution : ''}</textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">価値提案</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="提供価値">${ideationData ? ideationData.impact : ''}</textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">キーリソース</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="重要な資源"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">顧客関係</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="顧客との関係"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">顧客セグメント</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="顧客層">${ideationData ? ideationData.target : ''}</textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">コスト構造</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="主要コスト"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">チャネル</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="販売チャネル"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">収益の流れ</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="収益源"></textarea>
                </div>
            </div>
            
            <div class="text-center">
                <div class="flex justify-center space-x-3">
                    <button onclick="saveBusinessCanvasData()" class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        キャンバスを保存
                    </button>
                    <button onclick="proceedToStakeholderAnalysis('business-canvas')" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                        関係者分析へ
                        <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Data saving functions
function save5W1HData() {
    const frameworkData = {
        type: '5w1h',
        who: document.querySelector('textarea[placeholder*="対象者、実施者"]')?.value || '',
        what: document.querySelector('textarea[placeholder*="何をするか"]')?.value || '',
        when: document.querySelector('textarea[placeholder*="実施時期"]')?.value || '',
        where: document.querySelector('textarea[placeholder*="場所、環境"]')?.value || '',
        why: document.querySelector('textarea[placeholder*="目的、理由"]')?.value || '',
        how: document.querySelector('textarea[placeholder*="方法、手段"]')?.value || '',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('planningData', JSON.stringify(frameworkData));
    showSaveMessage('5W1H分析を保存しました');
}

function saveLogicTreeData() {
    const frameworkData = {
        type: 'logic-tree',
        mainIssue: document.querySelector('textarea[placeholder*="解決すべき主要な課題"]')?.value || '',
        subIssues: Array.from(document.querySelectorAll('textarea[placeholder*="具体的な課題要素"]')).map(el => el.value),
        solutions: Array.from(document.querySelectorAll('input[placeholder*="解決策"]')).map(el => el.value),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('planningData', JSON.stringify(frameworkData));
    showSaveMessage('ロジックツリーを保存しました');
}

function saveBusinessCanvasData() {
    const canvasFields = document.querySelectorAll('#framework-workspace textarea');
    const frameworkData = {
        type: 'business-canvas',
        keyPartners: canvasFields[0]?.value || '',
        keyActivities: canvasFields[1]?.value || '',
        valueProposition: canvasFields[2]?.value || '',
        keyResources: canvasFields[3]?.value || '',
        customerRelationships: canvasFields[4]?.value || '',
        customerSegments: canvasFields[5]?.value || '',
        costStructure: canvasFields[6]?.value || '',
        channels: canvasFields[7]?.value || '',
        revenueStreams: canvasFields[8]?.value || '',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('planningData', JSON.stringify(frameworkData));
    showSaveMessage('ビジネスキャンバスを保存しました');
}

function showSaveMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function proceedToStakeholderAnalysis(frameworkType) {
    // Mark planning as completed
    markStepCompleted('planning');
    
    // Open stakeholder analysis
    openIdeationWorkspace('stakeholder');
}

// Export functions to global scope
window.renderPlanningContent = renderPlanningContent;
window.selectFramework = selectFramework;
window.render5W1HFramework = render5W1HFramework;
window.renderLogicTreeFramework = renderLogicTreeFramework;
window.renderBusinessCanvasFramework = renderBusinessCanvasFramework;
window.save5W1HData = save5W1HData;
window.saveLogicTreeData = saveLogicTreeData;
window.saveBusinessCanvasData = saveBusinessCanvasData;
window.showSaveMessage = showSaveMessage;
window.proceedToStakeholderAnalysis = proceedToStakeholderAnalysis;