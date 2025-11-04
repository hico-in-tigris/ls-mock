// ===============================
// LocalSuccess - Projects Module
// ===============================

function renderProjects(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Projects</h1>
                    <p class="text-muted-foreground">企画から実行まで、プロジェクトライフサイクル全体をサポート</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="openIdeationWorkspace()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                        企画ワークスペース
                    </button>
                    <button onclick="generateAIOutline()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        新規プロジェクト
                    </button>
                </div>
            </div>

            <!-- Project Planning Pipeline -->
            <div class="card mb-8">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">プロジェクト企画パイプライン</h2>
                    <p class="text-sm text-muted-foreground">想いから実行まで、段階的にプロジェクトを形にしていきます</p>
                </div>
                <div class="card-content">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openIdeationWorkspace('ideation')">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">想いの整理</h3>
                            <p class="text-sm text-muted-foreground">アイデアから具体的な企画へ</p>
                        </div>
                        
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openIdeationWorkspace('planning')">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14,2 14,8 20,8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                    <polyline points="10,9 9,9 8,9"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">企画構成</h3>
                            <p class="text-sm text-muted-foreground">フレームワークで構造化</p>
                        </div>
                        
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openStakeholderAnalysis()">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">関係者分析</h3>
                            <p class="text-sm text-muted-foreground">ステークホルダーマップ</p>
                        </div>
                        
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openProposalCreation()">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,11 12,14 22,4"/>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">提案作成</h3>
                            <p class="text-sm text-muted-foreground">プレゼン資料生成</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Projects -->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">進行中のプロジェクト</h2>
                    <p class="text-sm text-muted-foreground">現在取り組んでいるプロジェクト一覧</p>
                </div>
                <div class="card-content">
                    <div id="active-projects-list" class="space-y-4">
                        <div class="text-center py-12 text-muted-foreground">
                            <svg class="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <p>まだプロジェクトがありません</p>
                            <p class="text-sm">上のワークスペースから企画を始めてみましょう</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    loadActiveProjects();
}

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

function openProposalCreation() {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-2xl font-bold text-gray-800">提案作成ワークスペース</h3>
                    <p class="text-gray-600">企画を魅力的なプレゼンテーションに仕上げる</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- 左パネル: テンプレート選択 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">プレゼンテーションテンプレート</h4>
                        
                        <div class="space-y-4">
                            <div class="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer" onclick="selectProposalTemplate('business')">
                                <div class="flex items-center mb-2">
                                    <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <h5 class="font-medium">ビジネス提案書</h5>
                                </div>
                                <p class="text-sm text-gray-600">経営陣向けの本格的な事業提案テンプレート</p>
                            </div>
                            
                            <div class="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors cursor-pointer" onclick="selectProposalTemplate('project')">
                                <div class="flex items-center mb-2">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <h5 class="font-medium">プロジェクト企画書</h5>
                                </div>
                                <p class="text-sm text-gray-600">社内プロジェクト向けの企画提案テンプレート</p>
                            </div>
                            
                            <div class="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition-colors cursor-pointer" onclick="selectProposalTemplate('simple')">
                                <div class="flex items-center mb-2">
                                    <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                    <h5 class="font-medium">シンプル提案</h5>
                                </div>
                                <p class="text-sm text-gray-600">要点を簡潔にまとめた提案テンプレート</p>
                            </div>
                            
                            <button onclick="generateProposal()" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                提案書を生成
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: プレビュー -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg border p-6">
                        <h4 class="font-semibold text-lg mb-4">プレビュー</h4>
                        
                        <div id="proposal-preview" class="space-y-4">
                            <div class="text-center py-20 text-gray-500">
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p>テンプレートを選択してプレビューを表示</p>
                            </div>
                        </div>
                        
                        <div class="mt-6 flex space-x-3">
                            <button onclick="downloadProposal()" class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" disabled>
                                ダウンロード
                            </button>
                            <button onclick="shareProposal()" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors" disabled>
                                共有
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 生成された提案書 -->
            <div class="mt-6">
                <div class="bg-white rounded-lg border p-6">
                    <h4 class="font-semibold text-lg mb-4">生成された提案書</h4>
                    <div id="generated-proposal" class="space-y-3">
                        <p class="text-gray-500 text-center py-8">提案書を生成すると、詳細な内容が表示されます</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Idea processing functions
function addIdeaTag(tag) {
    const textarea = document.getElementById('raw-ideas');
    if (textarea) {
        const currentText = textarea.value;
        const newText = currentText + (currentText ? '\n\n' : '') + `[${tag}] `;
        textarea.value = newText;
        textarea.focus();
        textarea.setSelectionRange(newText.length, newText.length);
    }
}

function extractKeywords() {
    const rawIdeas = document.getElementById('raw-ideas').value;
    if (!rawIdeas.trim()) {
        alert('まず、アイデアを入力してください。');
        return;
    }
    
    // Simple keyword extraction simulation
    const keywordsContainer = document.getElementById('extracted-keywords');
    const lines = rawIdeas.split('\n').filter(line => line.trim());
    
    const categories = {
        '課題': [],
        '解決策': [],
        '対象者': [],
        '効果': []
    };
    
    lines.forEach(line => {
        if (line.includes('[課題]')) {
            categories['課題'].push(line.replace('[課題]', '').trim());
        } else if (line.includes('[解決策]')) {
            categories['解決策'].push(line.replace('[解決策]', '').trim());
        } else if (line.includes('[対象者]')) {
            categories['対象者'].push(line.replace('[対象者]', '').trim());
        } else if (line.includes('[効果]')) {
            categories['効果'].push(line.replace('[効果]', '').trim());
        }
    });
    
    let html = '';
    Object.keys(categories).forEach(category => {
        if (categories[category].length > 0) {
            html += `
                <div class="mb-4">
                    <h5 class="font-medium text-sm text-gray-700 mb-2">${category}</h5>
                    <div class="flex flex-wrap gap-2">
                        ${categories[category].map(item => `
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${item}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    if (html) {
        keywordsContainer.innerHTML = html;
    } else {
        keywordsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">タグ付きテキストから要素を抽出します。[課題]、[解決策]、[対象者]、[効果]のタグを使用してください。</p>';
    }
}

function applyKeywordsToStructure() {
    const rawIdeas = document.getElementById('raw-ideas').value;
    const lines = rawIdeas.split('\n');
    
    const categories = {
        problem: [],
        solution: [],
        target: [],
        impact: []
    };
    
    lines.forEach(line => {
        if (line.includes('[課題]')) {
            categories.problem.push(line.replace('[課題]', '').trim());
        } else if (line.includes('[解決策]')) {
            categories.solution.push(line.replace('[解決策]', '').trim());
        } else if (line.includes('[対象者]')) {
            categories.target.push(line.replace('[対象者]', '').trim());
        } else if (line.includes('[効果]')) {
            categories.impact.push(line.replace('[効果]', '').trim());
        }
    });
    
    // Apply to structured fields
    const problemField = document.getElementById('structured-problem');
    const solutionField = document.getElementById('structured-solution');
    const targetField = document.getElementById('structured-target');
    const impactField = document.getElementById('structured-impact');
    
    if (problemField) problemField.value = categories.problem.join('\n');
    if (solutionField) solutionField.value = categories.solution.join('\n');
    if (targetField) targetField.value = categories.target.join('\n');
    if (impactField) impactField.value = categories.impact.join('\n');
}

function proceedToNextStage(stage) {
    if (stage === 'planning') {
        openIdeationWorkspace('planning');
    }
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
    
    if (type === '5w1h') {
        workspace.innerHTML = render5W1HFramework();
    } else if (type === 'logic-tree') {
        workspace.innerHTML = renderLogicTreeFramework();
    } else if (type === 'business-canvas') {
        workspace.innerHTML = renderBusinessCanvasFramework();
    }
}

function render5W1HFramework() {
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-blue-800">5W1H分析</h3>
                <p class="text-sm text-gray-600">企画の要素を整理しましょう</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Who（誰が・誰に）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="対象者、実施者"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">What（何を）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="何をするか、提供するか"></textarea>
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
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="目的、理由"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">How（どのように）</label>
                    <textarea class="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none" placeholder="方法、手段"></textarea>
                </div>
            </div>
            
            <div class="text-center">
                <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    分析結果を保存
                </button>
            </div>
        </div>
    `;
}

function renderLogicTreeFramework() {
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-green-800">ロジックツリー</h3>
                <p class="text-sm text-gray-600">課題を構造的に分解します</p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-lg">
                <div class="text-center py-20 text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <p>ロジックツリーエディタ</p>
                    <p class="text-sm">インタラクティブなツリー構造エディタを開発中</p>
                </div>
            </div>
        </div>
    `;
}

function renderBusinessCanvasFramework() {
    return `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <h3 class="text-lg font-semibold text-purple-800">ビジネスモデルキャンバス</h3>
                <p class="text-sm text-gray-600">事業モデルを可視化します</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <label class="block font-medium text-gray-700 mb-2">キーパートナー</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="重要なパートナー"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">キーアクティビティ</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="重要な活動"></textarea>
                </div>
                
                <div>
                    <label class="block font-medium text-gray-700 mb-2">価値提案</label>
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="提供価値"></textarea>
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
                    <textarea class="w-full h-24 p-2 border border-gray-300 rounded resize-none" placeholder="顧客層"></textarea>
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
                <button class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    キャンバスを保存
                </button>
            </div>
        </div>
    `;
}

function loadActiveProjects() {
    // Load and display active projects from localStorage
    const projects = JSON.parse(localStorage.getItem('activeProjects') || '[]');
    const container = document.getElementById('active-projects-list');
    
    if (projects.length === 0) {
        return; // Keep the empty state message
    }
    
    container.innerHTML = projects.map(project => `
        <div class="p-4 border rounded-lg hover:border-primary/50 transition-colors">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-medium">${project.title}</h3>
                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">${project.stage}</span>
            </div>
            <p class="text-sm text-muted-foreground mb-3">${project.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-xs text-muted-foreground">更新: ${project.lastUpdated}</span>
                <button onclick="openProject('${project.id}')" class="text-xs text-primary hover:text-primary/80">
                    続きを見る →
                </button>
            </div>
        </div>
    `).join('');
}

function openProject(projectId) {
    // Open specific project - to be implemented
    console.log('Opening project:', projectId);
}

function generateAIOutline() {
    // AI outline generation - to be implemented
    alert('AI企画アウトライン生成機能は近日公開予定です！');
}

// Expose functions to global scope
window.openIdeationWorkspace = openIdeationWorkspace;
window.closeIdeationWorkspace = closeIdeationWorkspace;
window.openProposalCreation = openProposalCreation;
window.addIdeaTag = addIdeaTag;
window.extractKeywords = extractKeywords;
window.applyKeywordsToStructure = applyKeywordsToStructure;
window.proceedToNextStage = proceedToNextStage;
window.selectFramework = selectFramework;
window.generateAIOutline = generateAIOutline;

// Proposal creation functions
function selectProposalTemplate(type) {
    const templates = document.querySelectorAll('[onclick^="selectProposalTemplate"]');
    templates.forEach(template => {
        template.classList.remove('border-blue-500', 'border-green-500', 'border-purple-500');
        template.classList.add('border-gray-200');
    });
    
    const selectedTemplate = document.querySelector(`[onclick="selectProposalTemplate('${type}')"]`);
    if (selectedTemplate) {
        selectedTemplate.classList.remove('border-gray-200');
        if (type === 'business') {
            selectedTemplate.classList.add('border-blue-500');
        } else if (type === 'project') {
            selectedTemplate.classList.add('border-green-500');
        } else if (type === 'simple') {
            selectedTemplate.classList.add('border-purple-500');
        }
    }
    
    updateProposalPreview(type);
}

function updateProposalPreview(type) {
    const preview = document.getElementById('proposal-preview');
    
    const templates = {
        business: {
            title: 'ビジネス提案書',
            structure: ['エグゼクティブサマリー', '市場分析', '事業概要', '実行計画', '財務計画', 'リスク分析'],
            color: 'blue'
        },
        project: {
            title: 'プロジェクト企画書',
            structure: ['プロジェクト概要', '目的・目標', '実行計画', 'リソース計画', 'スケジュール', '成果物'],
            color: 'green'
        },
        simple: {
            title: 'シンプル提案',
            structure: ['提案概要', '課題と解決策', '実施方法', '期待効果'],
            color: 'purple'
        }
    };
    
    const template = templates[type];
    if (template) {
        preview.innerHTML = `
            <div class="border-l-4 border-${template.color}-500 pl-4">
                <h5 class="font-medium text-${template.color}-800 mb-3">${template.title}</h5>
                <div class="space-y-2">
                    ${template.structure.map((section, index) => `
                        <div class="flex items-center text-sm">
                            <span class="w-6 h-6 bg-${template.color}-100 text-${template.color}-600 rounded-full flex items-center justify-center text-xs mr-3">
                                ${index + 1}
                            </span>
                            ${section}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

function generateProposal() {
    const generatedProposal = document.getElementById('generated-proposal');
    
    generatedProposal.innerHTML = `
        <div class="space-y-6">
            <div class="text-center">
                <div class="inline-block p-4 bg-green-100 rounded-full mb-4">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h5 class="text-lg font-medium text-green-800 mb-2">提案書生成完了</h5>
                <p class="text-sm text-gray-600">選択されたテンプレートに基づいて提案書を生成しました</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600 text-center">
                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    提案書の詳細生成機能は現在開発中です
                </p>
            </div>
        </div>
    `;
    
    // Enable buttons
    const downloadBtn = document.querySelector('[onclick="downloadProposal()"]');
    const shareBtn = document.querySelector('[onclick="shareProposal()"]');
    if (downloadBtn) downloadBtn.disabled = false;
    if (shareBtn) shareBtn.disabled = false;
}

function downloadProposal() {
    alert('ダウンロード機能は近日公開予定です！');
}

function shareProposal() {
    alert('共有機能は近日公開予定です！');
}

// Expose proposal functions to global scope
window.selectProposalTemplate = selectProposalTemplate;
window.generateProposal = generateProposal;
window.downloadProposal = downloadProposal;
window.shareProposal = shareProposal;