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
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">想いの整理ワークスペース</h3>
                        <p class="text-gray-600 mt-1">アイデアから具体的な企画への変換プロセス</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- 左パネル: アイデア入力 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">アイデア・想いの記録</h4>
                                    <p class="text-sm text-gray-500">自由な発想を言葉にしてみましょう</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-3">自由記述</label>
                                <div class="relative">
                                    <textarea id="raw-ideas" class="w-full h-40 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400" placeholder="何をしたいのか、なぜそれをやりたいのか、どんな課題を解決したいのか...&#10;&#10;思いついたことを自由に書いてください。遠慮なく、想いのままに。"></textarea>
                                    <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        タグで分類できます
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-3">クイックタグ</label>
                                <div class="flex flex-wrap gap-3">
                                    <button onclick="addIdeaTag('課題')" class="group px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 transition-all duration-200 border border-red-200 hover:border-red-300">
                                        <span class="font-medium">課題</span>
                                        <span class="ml-1 text-xs opacity-70">Problem</span>
                                    </button>
                                    <button onclick="addIdeaTag('解決策')" class="group px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-all duration-200 border border-green-200 hover:border-green-300">
                                        <span class="font-medium">解決策</span>
                                        <span class="ml-1 text-xs opacity-70">Solution</span>
                                    </button>
                                    <button onclick="addIdeaTag('対象者')" class="group px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-all duration-200 border border-blue-200 hover:border-blue-300">
                                        <span class="font-medium">対象者</span>
                                        <span class="ml-1 text-xs opacity-70">Target</span>
                                    </button>
                                    <button onclick="addIdeaTag('効果')" class="group px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-all duration-200 border border-purple-200 hover:border-purple-300">
                                        <span class="font-medium">効果</span>
                                        <span class="ml-1 text-xs opacity-70">Impact</span>
                                    </button>
                                </div>
                            </div>
                            
                            <button onclick="extractKeywords()" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7"/>
                                </svg>
                                キーワード抽出・構造化
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: 構造化結果 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">構造化された企画要素</h4>
                                    <p class="text-sm text-gray-500">整理された情報が自動的に分類されます</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-5">
                            <div class="space-y-4">
                                <div>
                                    <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                        課題・問題
                                    </label>
                                    <textarea id="structured-problem" class="w-full h-20 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200" placeholder="抽出された課題が表示されます"></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                        解決策・アプローチ
                                    </label>
                                    <textarea id="structured-solution" class="w-full h-20 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all duration-200" placeholder="提案する解決策が表示されます"></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                        対象者・受益者
                                    </label>
                                    <textarea id="structured-target" class="w-full h-20 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" placeholder="想定する対象者が表示されます"></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center text-sm font-medium text-gray-700 mb-2">
                                        <div class="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                        期待される効果
                                    </label>
                                    <textarea id="structured-impact" class="w-full h-20 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200" placeholder="期待される効果・成果が表示されます"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="px-6 pb-6">
                            <div class="flex space-x-3">
                                <button onclick="applyKeywordsToStructure()" class="flex-1 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 font-medium border border-green-200 hover:border-green-300">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                    </svg>
                                    構造化を適用
                                </button>
                                <button onclick="proceedToNextStage('planning')" class="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                                    次のステップへ
                                    <svg class="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- キーワード一覧 -->
            <div class="mt-8">
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div class="p-6 border-b border-gray-100">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900">抽出されたキーワード</h4>
                                <p class="text-sm text-gray-500">重要な要素が自動的に分類・表示されます</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="extracted-keywords" class="space-y-4">
                            <div class="text-center py-12 text-gray-400">
                                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                </svg>
                                <p class="text-lg font-medium mb-2">キーワード抽出を実行してください</p>
                                <p class="text-sm">重要な要素が自動的に分類されて表示されます</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPlanningContent() {
    // Check if ideation data is available
    const savedData = localStorage.getItem('ideationData');
    const hasIdeationData = savedData && JSON.parse(savedData);
    
    const dataNotice = hasIdeationData ? 
        `<div class="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h4 class="font-semibold text-green-800">想いの整理データを検出</h4>
                        <p class="text-sm text-green-700">フレームワークを選択すると、自動的にデータが反映されます</p>
                    </div>
                </div>
                <button onclick="clearIdeationData()" class="text-xs text-green-600 hover:text-green-800 underline">
                    データをクリア
                </button>
            </div>
        </div>` : 
        `<div class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h4 class="font-semibold text-yellow-800">想いの整理データがありません</h4>
                    <p class="text-sm text-yellow-700">まず「想いの整理」ワークスペースで企画の基礎を作成することをお勧めします</p>
                </div>
            </div>
        </div>`;
    
    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">企画構成ワークスペース</h3>
                        <p class="text-gray-600 mt-1">フレームワークを使った体系的な企画整理</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            ${dataNotice}
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- フレームワーク選択パネル -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">フレームワーク選択</h4>
                                    <p class="text-sm text-gray-500">最適な分析手法を選択してください</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-4">
                            <button onclick="selectFramework('5w1h')" class="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 framework-btn group" data-framework="5w1h">
                                <div class="flex items-start space-x-4">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <span class="text-blue-600 font-bold text-sm">5W1H</span>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-semibold text-blue-800 mb-1">5W1H分析</div>
                                        <div class="text-sm text-gray-600 leading-relaxed">Who, What, When, Where, Why, How</div>
                                        <div class="text-xs text-gray-500 mt-2">基本的な企画要素を整理</div>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="selectFramework('logic-tree')" class="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 framework-btn group" data-framework="logic-tree">
                                <div class="flex items-start space-x-4">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-semibold text-green-800 mb-1">ロジックツリー</div>
                                        <div class="text-sm text-gray-600 leading-relaxed">課題を体系的に分解・整理</div>
                                        <div class="text-xs text-gray-500 mt-2">問題解決の構造化</div>
                                    </div>
                                </div>
                            </button>
                            
                            <button onclick="selectFramework('business-canvas')" class="w-full p-5 text-left border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 framework-btn group" data-framework="business-canvas">
                                <div class="flex items-start space-x-4">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <div class="font-semibold text-purple-800 mb-1">ビジネスキャンバス</div>
                                        <div class="text-sm text-gray-600 leading-relaxed">事業モデルの可視化</div>
                                        <div class="text-xs text-gray-500 mt-2">包括的なビジネス設計</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- フレームワーク作業エリア -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">フレームワーク作業エリア</h4>
                                    <p class="text-sm text-gray-500">選択したフレームワークで企画を整理しましょう</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div id="framework-workspace" class="min-h-[400px]">
                                <div class="text-center py-20 text-gray-400">
                                    <div class="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                    </div>
                                    <p class="text-lg font-medium mb-2">フレームワークを選択してください</p>
                                    <p class="text-sm">左のパネルから分析手法を選んで作業を開始しましょう</p>
                                </div>
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
    // Check if coming from framework analysis
    const frameworkContext = localStorage.getItem('frameworkContext');
    const hasFrameworkData = frameworkContext && JSON.parse(frameworkContext);
    
    let contextNotice = '';
    if (hasFrameworkData) {
        const context = JSON.parse(frameworkContext);
        const frameworkNames = {
            '5w1h': '5W1H分析',
            'logic-tree': 'ロジックツリー',
            'business-canvas': 'ビジネスキャンバス'
        };
        
        contextNotice = `
            <div class="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h4 class="font-semibold text-purple-800">${frameworkNames[context.type] || '企画構成'}から連携</h4>
                            <p class="text-sm text-purple-700">企画に関係するステークホルダーを特定しましょう</p>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="suggestStakeholdersFromFramework()" class="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                            関係者を推測
                        </button>
                        <button onclick="clearFrameworkContext()" class="text-xs text-purple-600 hover:text-purple-800 underline">
                            クリア
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">関係者分析ワークスペース</h3>
                        <p class="text-gray-600 mt-1">ステークホルダーマップの作成と影響度分析</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            ${contextNotice}
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- 左パネル: ステークホルダー入力 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">ステークホルダー追加</h4>
                                    <p class="text-sm text-gray-500">関係者の情報を入力してマップに配置</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-5">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">名前・組織</label>
                                <input type="text" id="stakeholder-name" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200" placeholder="例：田中部長、マーケティング部">
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">役割・立場</label>
                                <input type="text" id="stakeholder-role" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200" placeholder="例：意思決定者、実行責任者、情報提供者">
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <span class="flex items-center">
                                            <div class="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                            影響度
                                        </span>
                                    </label>
                                    <select id="stakeholder-influence" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200">
                                        <option value="low">低</option>
                                        <option value="medium" selected>中</option>
                                        <option value="high">高</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <span class="flex items-center">
                                            <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                            関心度
                                        </span>
                                    </label>
                                    <select id="stakeholder-interest" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200">
                                        <option value="low">低</option>
                                        <option value="medium" selected>中</option>
                                        <option value="high">高</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">期待・要求</label>
                                <textarea id="stakeholder-expectations" class="w-full h-24 p-3 border-2 border-gray-200 rounded-lg resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200" placeholder="このステークホルダーの期待や要求事項を記入"></textarea>
                            </div>
                            
                            <div class="flex space-x-3">
                                <button onclick="addStakeholder()" class="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    追加
                                </button>
                                <button onclick="showNetworkStakeholderSelector()" class="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200 border border-blue-200 hover:border-blue-300">
                                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    ネットワークから選択
                                </button>
                                <button onclick="addSampleStakeholders()" class="px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300">
                                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    サンプル
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: ステークホルダーマップ -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">ステークホルダーマップ</h4>
                                    <p class="text-sm text-gray-500">影響度×関心度マトリクス</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200" style="height: 450px;">
                                <!-- マトリクス軸ラベル -->
                                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    関心度 高
                                </div>
                                <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    関心度 低
                                </div>
                                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                    影響度 高
                                </div>
                                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                    影響度 低
                                </div>
                                
                                <!-- マトリクス四象限ラベル -->
                                <div class="absolute top-4 left-4 text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded">
                                    管理
                                </div>
                                <div class="absolute top-4 right-4 text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded">
                                    監視
                                </div>
                                <div class="absolute bottom-4 left-4 text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded">
                                    協力
                                </div>
                                <div class="absolute bottom-4 right-4 text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded">
                                    情報提供
                                </div>
                                
                                <!-- マトリクス中央線 -->
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="w-full h-px bg-gray-300"></div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="h-full w-px bg-gray-300"></div>
                                </div>
                                
                                <!-- ステークホルダー表示エリア -->
                                <div id="stakeholder-matrix" class="relative w-full h-full p-4">
                                    <!-- ステークホルダーがここに動的に配置される -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="px-6 pb-6">
                            <div class="flex space-x-3">
                                <button onclick="exportStakeholderData()" class="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 font-medium border border-green-200 hover:border-green-300">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    データ出力
                                </button>
                                <button onclick="clearAllStakeholders()" class="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium border border-red-200 hover:border-red-300">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                    全削除
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ステークホルダー一覧 -->
            <div class="mt-8">
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div class="p-6 border-b border-gray-100">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900">登録済みステークホルダー</h4>
                                <p class="text-sm text-gray-500">追加されたステークホルダーの詳細情報</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="stakeholder-list" class="space-y-4">
                            <div class="text-center py-12 text-gray-400">
                                <div class="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <p class="text-lg font-medium mb-2">ステークホルダーを追加してください</p>
                                <p class="text-sm">関係者情報を入力すると、詳細な一覧が表示されます</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Expose stakeholder functions to global scope
window.openStakeholderAnalysis = openStakeholderAnalysis;
window.renderStakeholderContent = renderStakeholderContent;

// Utility function for clearing ideation data
function clearIdeationData() {
    if (confirm('想いの整理データをクリアしますか？この操作は取り消せません。')) {
        localStorage.removeItem('ideationData');
        // Refresh the planning workspace
        const content = document.getElementById('modal-content');
        content.innerHTML = renderPlanningContent();
    }
}

// Expose utility functions to global scope
window.clearIdeationData = clearIdeationData;