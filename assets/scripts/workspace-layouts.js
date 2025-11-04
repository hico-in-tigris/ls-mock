// Project Workspace Functions - Cleaned Version

function openIdeationWorkspace(stage = 'ideation') {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = renderIdeationWorkspace(stage);
    modal.classList.remove('hidden');
}

function closeIdeationWorkspace() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
}

function renderIdeationWorkspace(stage = 'ideation') {
    if (stage === 'ideation') {
        return renderIdeationContent();
    } else if (stage === 'planning') {
        return renderPlanningContent();
    }
    
    return renderIdeationContent();
}

function renderIdeationContent() {
    return `
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">想いの整理ワークスペース</h3>
                    <p class="text-gray-600">アイデアから具体的な企画への変換</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- 左パネル: アイデア入力 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">アイデア・想いの記録</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">自由記述</label>
                                <textarea id="raw-ideas" class="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none" placeholder="何をしたいのか、なぜそれをやりたいのか、どんな課題を解決したいのか...
思いついたことを自由に書いてください。"></textarea>
                            </div>
                            
                            <div class="flex flex-wrap gap-2">
                                <button onclick="addIdeaTag('課題')" class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors">課題</button>
                                <button onclick="addIdeaTag('解決策')" class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors">解決策</button>
                                <button onclick="addIdeaTag('対象者')" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">対象者</button>
                                <button onclick="addIdeaTag('効果')" class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors">効果</button>
                            </div>
                            
                            <button onclick="extractKeywords()" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                キーワード抽出・構造化
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: 構造化結果 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">構造化された企画要素</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">課題・問題</label>
                                <textarea id="structured-problem" class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="抽出された課題"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">解決策・アプローチ</label>
                                <textarea id="structured-solution" class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="提案する解決策"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">対象者・受益者</label>
                                <textarea id="structured-target" class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="想定する対象者"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">期待される効果</label>
                                <textarea id="structured-impact" class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="期待される効果・成果"></textarea>
                            </div>
                        </div>
                        
                        <div class="mt-6 flex space-x-3">
                            <button onclick="applyKeywordsToStructure()" class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                                構造化を適用
                            </button>
                            <button onclick="proceedToNextStage('planning')" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                次のステップへ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- キーワード一覧 -->
            <div class="mt-6">
                <div class="bg-white rounded-lg border p-6">
                    <h4 class="font-semibold text-lg mb-4">抽出されたキーワード</h4>
                    <div id="extracted-keywords" class="space-y-3">
                        <p class="text-gray-500 text-center py-8">キーワード抽出を実行すると、重要な要素が表示されます</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPlanningContent() {
    return `
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">企画構成ワークスペース</h3>
                    <p class="text-gray-600">フレームワークを使った企画整理</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- フレームワーク選択パネル -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">フレームワーク選択</h4>
                        
                        <div class="space-y-3">
                            <button onclick="selectFramework('5w1h')" class="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors framework-btn" data-framework="5w1h">
                                <div class="font-medium text-blue-800">5W1H分析</div>
                                <div class="text-sm text-gray-600">Who, What, When, Where, Why, How</div>
                            </button>
                            
                            <button onclick="selectFramework('logic-tree')" class="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors framework-btn" data-framework="logic-tree">
                                <div class="font-medium text-green-800">ロジックツリー</div>
                                <div class="text-sm text-gray-600">課題を体系的に分解・整理</div>
                            </button>
                            
                            <button onclick="selectFramework('business-canvas')" class="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors framework-btn" data-framework="business-canvas">
                                <div class="font-medium text-purple-800">ビジネスキャンバス</div>
                                <div class="text-sm text-gray-600">事業モデルの可視化</div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- フレームワーク作業エリア -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">フレームワーク作業エリア</h4>
                        
                        <div id="framework-workspace">
                            <div class="text-center py-12 text-gray-500">
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p>左のパネルからフレームワークを選択してください</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Expose functions to global scope
window.renderIdeationContent = renderIdeationContent;
window.renderPlanningContent = renderPlanningContent;

// Stakeholder Analysis Functions
function openStakeholderAnalysis() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = renderStakeholderContent();
    modal.classList.remove('hidden');
    
    // Initialize stakeholder matrix after modal is shown
    setTimeout(() => {
        if (typeof initializeStakeholderMatrix === 'function') {
            initializeStakeholderMatrix();
        }
    }, 100);
}

function renderStakeholderContent() {
    return `
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">関係者分析ワークスペース</h3>
                    <p class="text-gray-600">ステークホルダーマップの作成と影響度分析</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- 左パネル: ステークホルダー入力 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">ステークホルダー追加</h4>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">名前</label>
                                <input type="text" id="stakeholder-name" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="ステークホルダー名">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">役割・立場</label>
                                <input type="text" id="stakeholder-role" class="w-full p-3 border border-gray-300 rounded-lg" placeholder="例：経営陣、開発チーム、顧客">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">影響度</label>
                                    <select id="stakeholder-influence" class="w-full p-3 border border-gray-300 rounded-lg">
                                        <option value="low">低</option>
                                        <option value="medium" selected>中</option>
                                        <option value="high">高</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">関心度</label>
                                    <select id="stakeholder-interest" class="w-full p-3 border border-gray-300 rounded-lg">
                                        <option value="low">低</option>
                                        <option value="medium" selected>中</option>
                                        <option value="high">高</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">期待・要求</label>
                                <textarea id="stakeholder-expectations" class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="このステークホルダーの期待や要求"></textarea>
                            </div>
                            
                            <div class="flex space-x-3">
                                <button onclick="addStakeholder()" class="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    追加
                                </button>
                                <button onclick="addSampleStakeholders()" class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                    サンプル
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: ステークホルダーマップ -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">ステークホルダーマップ</h4>
                        
                        <div class="relative bg-gray-50 rounded-lg" style="height: 400px;">
                            <!-- マトリクス軸ラベル -->
                            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                                関心度 高
                            </div>
                            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
                                関心度 低
                            </div>
                            <div class="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-600">
                                影響度 高
                            </div>
                            <div class="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-sm font-medium text-gray-600">
                                影響度 低
                            </div>
                            
                            <!-- マトリクス中央線 -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-full h-px bg-gray-300"></div>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="h-full w-px bg-gray-300"></div>
                            </div>
                            
                            <!-- ステークホルダー表示エリア -->
                            <div id="stakeholder-matrix" class="relative w-full h-full">
                                <!-- ステークホルダーがここに動的に配置される -->
                            </div>
                        </div>
                        
                        <div class="mt-4 flex space-x-3">
                            <button onclick="exportStakeholderData()" class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                                データ出力
                            </button>
                            <button onclick="clearAllStakeholders()" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                                全削除
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ステークホルダー一覧 -->
            <div class="mt-6">
                <div class="bg-white rounded-lg border p-6">
                    <h4 class="font-semibold text-lg mb-4">登録済みステークホルダー</h4>
                    <div id="stakeholder-list" class="space-y-3">
                        <p class="text-gray-500 text-center py-8">ステークホルダーを追加すると一覧が表示されます</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Expose stakeholder functions to global scope
window.openStakeholderAnalysis = openStakeholderAnalysis;
window.renderStakeholderContent = renderStakeholderContent;