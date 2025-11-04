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
                    <button onclick="openProjectList()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                        </svg>
                        全プロジェクト一覧
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
                    <!-- Wizard Progress Bar -->
                    <div class="mb-8">
                        <div class="flex items-center justify-center">
                            <!-- Step 1: 想いの整理 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('ideation')">
                                <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-1">1</span>
                                    <svg class="wizard-check-icon-1 w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-blue-600 text-center">想いの整理</span>
                            </div>
                            
                            <!-- Arrow 1→2 -->
                            <div class="flex items-center mx-4">
                                <div class="h-0.5 w-12 bg-gray-300"></div>
                                <svg class="w-5 h-5 text-gray-400 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </div>
                            
                            <!-- Step 2: 企画構成 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('planning')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-2">2</span>
                                    <svg class="wizard-check-icon-2 w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-500 text-center">企画構成</span>
                            </div>
                            
                            <!-- Arrow 2→3 -->
                            <div class="flex items-center mx-4">
                                <div class="h-0.5 w-12 bg-gray-300"></div>
                                <svg class="w-5 h-5 text-gray-400 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </div>
                            
                            <!-- Step 3: 目標設定 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('goal-setting')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-3">3</span>
                                    <svg class="wizard-check-icon-3 w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-500 text-center">目標設定</span>
                            </div>
                            
                            <!-- Arrow 3→4 -->
                            <div class="flex items-center mx-4">
                                <div class="h-0.5 w-12 bg-gray-300"></div>
                                <svg class="w-5 h-5 text-gray-400 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </div>
                            
                            <!-- Step 4: 関係者分析 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('stakeholder')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-4">4</span>
                                    <svg class="wizard-check-icon-4 w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-500 text-center">関係者分析</span>
                            </div>
                            
                            <!-- Arrow 4→5 -->
                            <div class="flex items-center mx-4">
                                <div class="h-0.5 w-12 bg-gray-300"></div>
                                <svg class="w-5 h-5 text-gray-400 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </div>
                            
                            <!-- Step 5: 提案作成 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('proposal')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-5">5</span>
                                    <svg class="wizard-check-icon-5 w-6 h-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20,6 9,17 4,12"/>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-500 text-center">提案作成</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Current Step Details -->
                    <div class="space-y-4">
                        <div id="wizard-step-detail" class="text-center p-6 rounded-lg bg-blue-50 border border-blue-200">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-blue-800">ステップ1: 想いの整理</h3>
                            <p class="text-blue-600 mb-4">アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。</p>
                            <div class="flex justify-center gap-3">
                                <button onclick="openIdeationWorkspace('ideation')" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    設計する
                                </button>
                                <button onclick="proceedToNextStep('ideation')" class="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                                    次へ
                                </button>
                            </div>
                        </div>
                        
                        <!-- Progress Summary -->
                        <div class="text-center text-sm text-muted-foreground">
                            <span id="wizard-progress-text">ステップ 1 / 5 - 想いの整理から始めましょう</span>
                        </div>
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
    
    // Initialize wizard progress after rendering
    setTimeout(initializeWizard, 100);
}

function openIdeationWorkspace(stage = 'ideation') {
    let modal = document.getElementById('project-modal');
    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/50" onclick="closeIdeationWorkspace()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-7xl bg-background shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
                <div id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const content = document.getElementById('modal-content');
    
    const renderedContent = renderIdeationWorkspace(stage);
    
    content.innerHTML = renderedContent;
    modal.classList.remove('hidden');
    
    // Update wizard progress and initialize content after modal opens
    setTimeout(() => {
        updateWizardProgress(stage);
        
        // Initialize stakeholder matrix if on stakeholder stage
        if (stage === 'stakeholder') {
            generateStakeholderMatrix();
        }
    }, 100);
}

function closeIdeationWorkspace() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function renderIdeationWorkspace(stage = 'ideation') {
    if (stage === 'ideation') {
        return renderIdeationContent();
    } else if (stage === 'planning') {
        return renderPlanningContent();
    } else if (stage === 'goal-setting') {
        return renderGoalSettingContent();
    } else if (stage === 'stakeholder') {
        return renderStakeholderContent();
    } else if (stage === 'proposal') {
        return renderProposalContent();
    }
    
    return renderIdeationContent();
}

function openProposalCreation() {
    let modal = document.getElementById('project-modal');
    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/50" onclick="closeIdeationWorkspace()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-7xl bg-background shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
                <div id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const content = document.getElementById('modal-content');
    
    content.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">提案作成ワークスペース</h3>
                        <p class="text-gray-600 mt-1">企画を魅力的なプレゼンテーションに仕上げる</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="group p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- 左パネル: テンプレート選択 -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">プレゼンテーションテンプレート</h4>
                                    <p class="text-sm text-gray-500">目的に応じた最適なテンプレートを選択</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 space-y-4">
                            <div class="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group" onclick="selectProposalTemplate('business')">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="font-semibold text-blue-800 mb-2">ビジネス提案書</h5>
                                        <p class="text-sm text-gray-600 leading-relaxed mb-2">経営陣向けの本格的な事業提案テンプレート</p>
                                        <div class="flex flex-wrap gap-1">
                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">ROI分析</span>
                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">市場調査</span>
                                            <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">財務計画</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-5 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer group" onclick="selectProposalTemplate('project')">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z"/>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="font-semibold text-green-800 mb-2">プロジェクト企画書</h5>
                                        <p class="text-sm text-gray-600 leading-relaxed mb-2">社内プロジェクト向けの企画提案テンプレート</p>
                                        <div class="flex flex-wrap gap-1">
                                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">実行計画</span>
                                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">リソース</span>
                                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">スケジュール</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-5 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 cursor-pointer group" onclick="selectProposalTemplate('simple')">
                                <div class="flex items-start space-x-4">
                                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h5 class="font-semibold text-purple-800 mb-2">シンプル提案</h5>
                                        <p class="text-sm text-gray-600 leading-relaxed mb-2">要点を簡潔にまとめた提案テンプレート</p>
                                        <div class="flex flex-wrap gap-1">
                                            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">簡潔</span>
                                            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">明確</span>
                                            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">迅速</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button onclick="generateProposal()" class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                提案書を生成
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 右パネル: プレビュー -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="p-6 border-b border-gray-100">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">プレビュー</h4>
                                    <p class="text-sm text-gray-500">選択したテンプレートの構成を確認</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div id="proposal-preview" class="space-y-4 min-h-[400px]">
                                <div class="text-center py-20 text-gray-400">
                                    <div class="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                                        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                    </div>
                                    <p class="text-lg font-medium mb-2">テンプレートを選択してください</p>
                                    <p class="text-sm">左のパネルからテンプレートを選ぶとプレビューが表示されます</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="px-6 pb-6">
                            <div class="flex space-x-3">
                                <button onclick="downloadProposal()" class="flex-1 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 font-medium border border-green-200 hover:border-green-300" disabled>
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    ダウンロード
                                </button>
                                <button onclick="shareProposal()" class="flex-1 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium border border-blue-200 hover:border-blue-300" disabled>
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                                    </svg>
                                    共有
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 生成された提案書 -->
            <div class="mt-8">
                <div class="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div class="p-6 border-b border-gray-100">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900">生成された提案書</h4>
                                <p class="text-sm text-gray-500">完成した提案書の内容を確認できます</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <div id="generated-proposal" class="space-y-4">
                            <div class="text-center py-12 text-gray-400">
                                <div class="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </div>
                                <p class="text-lg font-medium mb-2">提案書を生成してください</p>
                                <p class="text-sm">テンプレートを選択して生成ボタンを押すと、詳細な提案書が表示されます</p>
                            </div>
                        </div>
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
    
    // Save to localStorage for use in planning phase
    const structuredData = {
        problem: categories.problem.join('\n'),
        solution: categories.solution.join('\n'),
        target: categories.target.join('\n'),
        impact: categories.impact.join('\n'),
        rawIdeas: rawIdeas,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ideationData', JSON.stringify(structuredData));
}

function proceedToNextStage(stage) {
    if (stage === 'planning') {
        openIdeationWorkspace('planning');
    } else if (stage === 'goal-setting') {
        openIdeationWorkspace('goal-setting');
    }
}

// Goal setting content renderer
function renderGoalSettingContent() {
    return `
        <div class="p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">目標設定ワークスペース</h2>
                    <p class="text-muted-foreground">SMART目標とKPI設計で成功指標を明確化</p>
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
                    <button onclick="openIdeationWorkspace('planning')" class="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                        </svg>
                        企画構成
                    </button>
                    <div class="text-purple-600 font-medium px-3 py-2 bg-purple-50 rounded-md border border-purple-200">
                        <svg class="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                        目標設定
                    </div>
                </div>
            </div>
            
            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Left Column: Goal Setting Framework -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">SMART目標設定</h3>
                            <p class="text-sm text-muted-foreground">具体的で測定可能な目標を設定</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Specific（具体的）
                                    <span class="text-muted-foreground text-xs ml-1">何を達成するか明確に</span>
                                </label>
                                <textarea id="goal-specific" rows="3" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 地域の高齢者100名に対してデジタル技術教育プログラムを提供する"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Measurable（測定可能）
                                    <span class="text-muted-foreground text-xs ml-1">数値で測れる指標</span>
                                </label>
                                <textarea id="goal-measurable" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 参加者100名、プログラム完了率80%以上、満足度4.0以上"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Achievable（達成可能）
                                    <span class="text-muted-foreground text-xs ml-1">実現可能性の根拠</span>
                                </label>
                                <textarea id="goal-achievable" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 既存の公民館ネットワークと講師陣を活用、予算200万円確保済み"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Relevant（関連性）
                                    <span class="text-muted-foreground text-xs ml-1">なぜ重要か</span>
                                </label>
                                <textarea id="goal-relevant" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: デジタル格差解消による高齢者の社会参加促進、地域活性化に寄与"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Time-bound（期限）
                                    <span class="text-muted-foreground text-xs ml-1">いつまでに</span>
                                </label>
                                <input type="text" id="goal-timebound" class="w-full p-3 border border-input rounded-md" placeholder="例: 2024年12月末までに第1期プログラムを完了">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Success Metrics -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">成功指標・KPI</h3>
                            <p class="text-sm text-muted-foreground">目標達成を測る具体的指標</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">主要指標（KPI）</label>
                                <div id="kpi-list" class="space-y-2">
                                    <div class="flex items-center space-x-2">
                                        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="指標名（例: プログラム完了率）">
                                        <input type="text" class="w-24 p-2 border border-input rounded-md text-sm" placeholder="目標値">
                                        <select class="p-2 border border-input rounded-md text-sm">
                                            <option value="percent">%</option>
                                            <option value="number">人</option>
                                            <option value="score">点</option>
                                            <option value="days">日</option>
                                        </select>
                                        <button type="button" onclick="removeKPI(this)" class="text-red-500 hover:text-red-700">
                                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" onclick="addKPI()" class="mt-2 text-sm text-blue-600 hover:text-blue-800">+ KPIを追加</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column: Impact & Timeline -->
                <div class="space-y-6">
                    <!-- Impact Analysis -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">インパクト分析</h3>
                            <p class="text-sm text-muted-foreground">期待される影響と効果</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">短期的効果（1-3ヶ月）</label>
                                <textarea id="impact-short" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 参加者のスマートフォン操作スキル向上、デジタルサービス利用開始"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">中期的効果（3-12ヶ月）</label>
                                <textarea id="impact-medium" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 地域コミュニティでのデジタル活用促進、高齢者の社会参加増加"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">長期的効果（1年以上）</label>
                                <textarea id="impact-long" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: デジタル格差の解消、持続可能な地域デジタル化モデルの確立"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Risk Assessment -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">リスク評価</h3>
                            <p class="text-sm text-muted-foreground">目標達成への阻害要因</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div id="risk-list" class="space-y-3">
                                <div class="p-3 border border-gray-200 rounded-md">
                                    <div class="flex items-center justify-between mb-2">
                                        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="リスク要因（例: 参加者の確保困難）">
                                        <select class="ml-2 p-2 border border-input rounded-md text-sm">
                                            <option value="high">高</option>
                                            <option value="medium">中</option>
                                            <option value="low">低</option>
                                        </select>
                                    </div>
                                    <textarea rows="2" class="w-full p-2 border border-input rounded-md text-sm resize-none" placeholder="対策・軽減策"></textarea>
                                </div>
                            </div>
                            <button type="button" onclick="addRisk()" class="text-sm text-blue-600 hover:text-blue-800">+ リスクを追加</button>
                        </div>
                    </div>
                    
                    <!-- Goal Summary -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">目標サマリー</h3>
                            <p class="text-sm text-muted-foreground">設定した目標の要約</p>
                        </div>
                        <div class="card-content">
                            <div id="goal-summary" class="text-sm text-muted-foreground p-4 bg-gray-50 rounded-md">
                                目標設定項目を入力すると、ここにサマリーが表示されます
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t">
                <button onclick="openIdeationWorkspace('planning')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    ← 企画構成に戻る
                </button>
                
                <div class="flex space-x-3">
                    <button onclick="generateGoalSummary()" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        目標サマリー生成
                    </button>
                    <button onclick="saveGoalData(); markStepCompleted('goal-setting')" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        目標を保存して完了
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Goal setting helper functions
function addKPI() {
    const kpiList = document.getElementById('kpi-list');
    const newKPI = document.createElement('div');
    newKPI.className = 'flex items-center space-x-2';
    newKPI.innerHTML = `
        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="指標名">
        <input type="text" class="w-24 p-2 border border-input rounded-md text-sm" placeholder="目標値">
        <select class="p-2 border border-input rounded-md text-sm">
            <option value="percent">%</option>
            <option value="number">人</option>
            <option value="score">点</option>
            <option value="days">日</option>
        </select>
        <button type="button" onclick="removeKPI(this)" class="text-red-500 hover:text-red-700">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    kpiList.appendChild(newKPI);
}

function removeKPI(button) {
    button.parentElement.remove();
}

function addRisk() {
    const riskList = document.getElementById('risk-list');
    const newRisk = document.createElement('div');
    newRisk.className = 'p-3 border border-gray-200 rounded-md';
    newRisk.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="リスク要因">
            <select class="ml-2 p-2 border border-input rounded-md text-sm">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
            </select>
            <button type="button" onclick="removeRisk(this)" class="ml-2 text-red-500 hover:text-red-700">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <textarea rows="2" class="w-full p-2 border border-input rounded-md text-sm resize-none" placeholder="対策・軽減策"></textarea>
    `;
    riskList.appendChild(newRisk);
}

function removeRisk(button) {
    button.closest('.p-3').remove();
}

function generateGoalSummary() {
    const specific = document.getElementById('goal-specific').value;
    const measurable = document.getElementById('goal-measurable').value;
    const achievable = document.getElementById('goal-achievable').value;
    const relevant = document.getElementById('goal-relevant').value;
    const timebound = document.getElementById('goal-timebound').value;
    
    const summaryContainer = document.getElementById('goal-summary');
    
    if (!specific && !measurable && !achievable && !relevant && !timebound) {
        summaryContainer.innerHTML = '<p class="text-muted-foreground">目標設定項目を入力してください</p>';
        return;
    }
    
    let summary = '<div class="space-y-2">';
    
    if (specific) {
        summary += `<div><strong>目標:</strong> ${specific}</div>`;
    }
    
    if (measurable) {
        summary += `<div><strong>成功指標:</strong> ${measurable}</div>`;
    }
    
    if (timebound) {
        summary += `<div><strong>期限:</strong> ${timebound}</div>`;
    }
    
    if (relevant) {
        summary += `<div><strong>意義:</strong> ${relevant}</div>`;
    }
    
    if (achievable) {
        summary += `<div><strong>実現根拠:</strong> ${achievable}</div>`;
    }
    
    // Add KPIs
    const kpiInputs = document.querySelectorAll('#kpi-list .flex');
    if (kpiInputs.length > 0) {
        summary += '<div><strong>主要KPI:</strong><ul class="ml-4 mt-1">';
        kpiInputs.forEach(kpiRow => {
            const inputs = kpiRow.querySelectorAll('input, select');
            if (inputs[0].value && inputs[1].value) {
                summary += `<li>• ${inputs[0].value}: ${inputs[1].value}${inputs[2].value === 'percent' ? '%' : inputs[2].value === 'number' ? '人' : inputs[2].value === 'score' ? '点' : '日'}</li>`;
            }
        });
        summary += '</ul></div>';
    }
    
    summary += '</div>';
    summaryContainer.innerHTML = summary;
}

function saveGoalData() {
    const goalData = {
        smart: {
            specific: document.getElementById('goal-specific').value,
            measurable: document.getElementById('goal-measurable').value,
            achievable: document.getElementById('goal-achievable').value,
            relevant: document.getElementById('goal-relevant').value,
            timebound: document.getElementById('goal-timebound').value
        },
        kpis: [],
        impact: {
            short: document.getElementById('impact-short').value,
            medium: document.getElementById('impact-medium').value,
            long: document.getElementById('impact-long').value
        },
        risks: [],
        timestamp: new Date().toISOString()
    };
    
    // Collect KPIs
    const kpiInputs = document.querySelectorAll('#kpi-list .flex');
    kpiInputs.forEach(kpiRow => {
        const inputs = kpiRow.querySelectorAll('input, select');
        if (inputs[0].value && inputs[1].value) {
            goalData.kpis.push({
                name: inputs[0].value,
                target: inputs[1].value,
                unit: inputs[2].value
            });
        }
    });
    
    // Collect Risks
    const riskInputs = document.querySelectorAll('#risk-list .p-3');
    riskInputs.forEach(riskDiv => {
        const inputs = riskDiv.querySelectorAll('input, select, textarea');
        if (inputs[0].value) {
            goalData.risks.push({
                factor: inputs[0].value,
                level: inputs[1].value,
                mitigation: inputs[2].value
            });
        }
    });
    
    localStorage.setItem('goalData', JSON.stringify(goalData));
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    successMessage.textContent = '目標データを保存しました';
    document.body.appendChild(successMessage);
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 2000);
}

// Wizard state management
function updateWizardProgress(currentStep) {
    const steps = [
        { name: 'ideation', number: 1, title: '想いの整理', color: 'blue', icon: 'circle', description: 'アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。' },
        { name: 'planning', number: 2, title: '企画構成', color: 'green', icon: 'document', description: 'フレームワークを使って企画を構造化し、全体像を明確にしましょう。' },
        { name: 'goal-setting', number: 3, title: '目標設定', color: 'purple', icon: 'target', description: 'SMART目標とKPIを設定して、成功指標を明確化しましょう。' },
        { name: 'stakeholder', number: 4, title: '関係者分析', color: 'orange', icon: 'users', description: 'プロジェクトの関係者を特定し、影響力や関心度を分析しましょう。' },
        { name: 'proposal', number: 5, title: '提案作成', color: 'indigo', icon: 'presentation', description: '分析結果をもとに、説得力のある提案書を作成しましょう。' }
    ];
    
    const currentStepIndex = steps.findIndex(step => step.name === currentStep);
    const completedSteps = JSON.parse(localStorage.getItem('wizardProgress') || '[]');
    
    // Update step indicators
    steps.forEach((step, index) => {
        const stepElement = document.querySelector(`.wizard-step-number-${step.number}`);
        const checkIcon = document.querySelector(`.wizard-check-icon-${step.number}`);
        const labelElement = stepElement?.closest('.flex').querySelector('.text-sm');
        
        if (stepElement && labelElement) {
            const circleElement = stepElement.parentElement;
            
            // Reset classes
            circleElement.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110';
            labelElement.className = 'text-sm font-medium text-center';
            
            if (completedSteps.includes(step.name)) {
                // Completed step
                circleElement.classList.add(`bg-${step.color}-500`, 'text-white');
                labelElement.classList.add(`text-${step.color}-600`);
                stepElement.classList.add('hidden');
                if (checkIcon) checkIcon.classList.remove('hidden');
            } else if (index === currentStepIndex) {
                // Current step
                circleElement.classList.add(`bg-${step.color}-500`, 'text-white');
                labelElement.classList.add(`text-${step.color}-600`);
                stepElement.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            } else {
                // Future step
                circleElement.classList.add('bg-gray-300', 'text-gray-600');
                labelElement.classList.add('text-gray-500');
                stepElement.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            }
        }
    });
    
    // Update step detail section
    const currentStepData = steps[currentStepIndex];
    if (currentStepData) {
        updateStepDetail(currentStepData);
    }
    
    // Update progress text
    const progressText = document.getElementById('wizard-progress-text');
    if (progressText) {
        const completedCount = completedSteps.length;
        const totalSteps = steps.length;
        progressText.textContent = `ステップ ${currentStepIndex + 1} / ${totalSteps} - ${currentStepData.title}`;
    }
    
    // Update connector arrows color
    const arrows = document.querySelectorAll('.flex.items-center.mx-4');
    arrows.forEach((arrow, index) => {
        const line = arrow.querySelector('.h-0\\.5');
        const arrowIcon = arrow.querySelector('svg');
        
        if (index < currentStepIndex || completedSteps.length > index) {
            // Completed connection
            line.classList.remove('bg-gray-300');
            line.classList.add('bg-green-400');
            arrowIcon.classList.remove('text-gray-400');
            arrowIcon.classList.add('text-green-400');
        } else {
            // Future connection
            line.classList.remove('bg-green-400');
            line.classList.add('bg-gray-300');
            arrowIcon.classList.remove('text-green-400');
            arrowIcon.classList.add('text-gray-400');
        }
    });
}

function updateStepDetail(stepData) {
    const detailElement = document.getElementById('wizard-step-detail');
    if (!detailElement) return;
    
    const icons = {
        circle: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
        document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>`,
        target: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
        users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
        presentation: `<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`
    };
    
    // Get next step name
    const nextStepName = getNextStepName(stepData.name);
    
    detailElement.className = `text-center p-6 rounded-lg bg-${stepData.color}-50 border border-${stepData.color}-200`;
    detailElement.innerHTML = `
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-${stepData.color}-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-${stepData.color}-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${icons[stepData.icon]}
            </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-${stepData.color}-800">ステップ${stepData.number}: ${stepData.title}</h3>
        <p class="text-${stepData.color}-600 mb-4">${stepData.description}</p>
        <div class="flex justify-center gap-3">
            <button onclick="openIdeationWorkspace('${stepData.name}')" class="px-6 py-2 bg-${stepData.color}-600 text-white rounded-md hover:bg-${stepData.color}-700 transition-colors">
                設計する
            </button>
            ${stepData.name === 'proposal' ? `
                <button onclick="createProjectFromWizard()" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
                    プロジェクトを開始する
                </button>
            ` : nextStepName ? `
                <button onclick="proceedToNextStep('${stepData.name}')" class="px-6 py-2 border border-${stepData.color}-600 text-${stepData.color}-600 rounded-md hover:bg-${stepData.color}-50 transition-colors">
                    次へ
                </button>
            ` : ''}
        </div>
    `;
}

// Select wizard step without opening modal
function selectWizardStep(stepName) {
    const steps = [
        { name: 'ideation', number: 1, title: '想いの整理', color: 'blue', icon: 'circle', description: 'アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。' },
        { name: 'planning', number: 2, title: '企画構成', color: 'green', icon: 'document', description: 'フレームワークを使って企画を構造化し、全体像を明確にしましょう。' },
        { name: 'goal-setting', number: 3, title: '目標設定', color: 'purple', icon: 'target', description: 'SMART目標とKPIを設定して、成功指標を明確化しましょう。' },
        { name: 'stakeholder', number: 4, title: '関係者分析', color: 'orange', icon: 'users', description: 'プロジェクトの関係者を特定し、影響力や関心度を分析しましょう。' },
        { name: 'proposal', number: 5, title: '提案作成', color: 'indigo', icon: 'presentation', description: '分析結果をもとに、説得力のある提案書を作成しましょう。' }
    ];
    
    const selectedStep = steps.find(step => step.name === stepName);
    
    if (selectedStep) {
        updateStepDetail(selectedStep);
        updateWizardProgress(stepName);
    }
}

// Get next step name
function getNextStepName(currentStepName) {
    const stepOrder = ['ideation', 'planning', 'goal-setting', 'stakeholder', 'proposal'];
    const currentIndex = stepOrder.indexOf(currentStepName);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
}

// Proceed to next step
function proceedToNextStep(currentStepName) {
    const nextStepName = getNextStepName(currentStepName);
    if (nextStepName) {
        // Mark current step as completed
        markStepCompleted(currentStepName);
        
        // Move to next step
        selectWizardStep(nextStepName);
        
        // Show confirmation message
        const stepTitles = {
            'ideation': '想いの整理',
            'planning': '企画構成',
            'goal-setting': '目標設定',
            'stakeholder': '関係者分析',
            'proposal': '提案作成'
        };
        
        const currentTitle = stepTitles[currentStepName];
        const nextTitle = stepTitles[nextStepName];
        
        showStepTransitionMessage(currentTitle, nextTitle);
    }
}

// Show step transition message
function showStepTransitionMessage(fromStep, toStep) {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm';
    message.innerHTML = `
        <div class="flex items-start">
            <svg class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
                <div class="font-medium">${fromStep}完了</div>
                <div class="text-sm">${toStep}に進みました</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (message.parentNode) {
            document.body.removeChild(message);
        }
    }, 3000);
}

function markStepCompleted(stepName) {
    const completedSteps = JSON.parse(localStorage.getItem('wizardProgress') || '[]');
    if (!completedSteps.includes(stepName)) {
        completedSteps.push(stepName);
        localStorage.setItem('wizardProgress', JSON.stringify(completedSteps));
    }
}

function getNextStep(currentStep) {
    const stepOrder = ['ideation', 'planning', 'goal-setting'];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
}

// Initialize wizard on page load
function initializeWizard() {
    updateWizardProgress('ideation');
}

// Simple content renderers for other stages
function renderIdeationContent() {
    return `
        <div class="p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">想いの整理ワークスペース</h2>
                    <p class="text-muted-foreground">アイデアから具体的な企画へ</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="card">
                <div class="card-content p-6">
                    <div class="text-center py-12">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg class="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                <line x1="9" y1="9" x2="9.01" y2="9"/>
                                <line x1="15" y1="9" x2="15.01" y2="9"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">想いの整理ワークスペース</h3>
                        <p class="text-muted-foreground mb-6">アイデアの整理機能は開発中です</p>
                        <button onclick="markStepCompleted('ideation'); openIdeationWorkspace('planning')" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                            完了して企画構成へ進む →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

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
            
            <div class="card">
                <div class="card-content p-6">
                    <div class="text-center py-12">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">企画構成ワークスペース</h3>
                        <p class="text-muted-foreground mb-6">フレームワーク機能は開発中です</p>
                        <div class="flex space-x-3 justify-center">
                            <button onclick="openIdeationWorkspace('ideation')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                                ← 想いの整理に戻る
                            </button>
                            <button onclick="markStepCompleted('planning'); openIdeationWorkspace('goal-setting')" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                                完了して目標設定へ進む →
                            </button>
                        </div>
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

function loadActiveProjects() {
    // Load and display active projects from sampleData
    const projects = sampleData.projects || [];
    const container = document.getElementById('active-projects-list');
    
    if (projects.length === 0) {
        return; // Keep the empty state message
    }
    
    // Filter active projects (not Done)
    const activeProjects = projects.filter(project => project.status !== 'Done');
    
    if (activeProjects.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-muted-foreground">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                </svg>
                <p>現在進行中のプロジェクトはありません</p>
                <p class="text-sm">上のワークスペースから企画を始めてみましょう</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            ${activeProjects.map(project => {
                // Get related people for display
                const relatedPeople = project.relatedPeople ? project.relatedPeople.map(id => 
                    sampleData.people.find(p => p.id === id)
                ).filter(Boolean) : [];
                
                // Get related actions
                const relatedActions = sampleData.actions.filter(action => 
                    action.linkedProjects && action.linkedProjects.includes(project.id)
                );
                const todoActions = relatedActions.filter(action => action.status === 'Todo').length;
                const doingActions = relatedActions.filter(action => action.status === 'Doing').length;
                
                // Determine progress
                const totalActions = relatedActions.length;
                const completedActions = relatedActions.filter(action => action.status === 'Done').length;
                const progressPercentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
                
                return `
                    <div class="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1" onclick="openProject(${project.id})">
                        <div class="card-content">
                            <!-- Project Header -->
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        ${project.title.charAt(0)}
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="font-semibold text-lg line-clamp-1">${project.title}</h3>
                                        <div class="flex items-center space-x-2 mt-1">
                                            <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                                            ${project.tags.slice(0, 2).map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                            ${project.tags.length > 2 ? `<span class="text-xs text-muted-foreground">+${project.tags.length - 2}</span>` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Project Purpose -->
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-muted-foreground mb-1">目的</h4>
                                <p class="text-sm line-clamp-2">${project.purpose}</p>
                            </div>
                            
                            <!-- Project Progress -->
                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="text-sm font-medium text-muted-foreground">進捗</h4>
                                    <span class="text-sm font-medium text-blue-600">${progressPercentage}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                                    <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style="width: ${progressPercentage}%"></div>
                                </div>
                                <div class="flex justify-between text-xs text-muted-foreground">
                                    <span>${completedActions}/${totalActions} アクション完了</span>
                                    ${totalActions > 0 ? `
                                        <span class="flex items-center space-x-2">
                                            ${doingActions > 0 ? `<span class="px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">進行${doingActions}</span>` : ''}
                                            ${todoActions > 0 ? `<span class="px-1 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">待機${todoActions}</span>` : ''}
                                        </span>
                                    ` : ''}
                                </div>
                            </div>
                            
                            <!-- Project KPI -->
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-muted-foreground mb-1">KPI</h4>
                                <p class="text-sm font-medium text-green-600">${project.kpi}</p>
                            </div>
                            
                            <!-- Related People -->
                            ${relatedPeople.length > 0 ? `
                                <div class="mb-4">
                                    <h4 class="text-sm font-medium text-muted-foreground mb-2">関連メンバー</h4>
                                    <div class="flex items-center space-x-2">
                                        ${relatedPeople.slice(0, 3).map(person => `
                                            <div class="flex items-center space-x-1">
                                                <div class="avatar avatar-xs">${person.avatar}</div>
                                                <span class="text-xs text-muted-foreground">${getMaskedName(person.name)}</span>
                                            </div>
                                        `).join('')}
                                        ${relatedPeople.length > 3 ? `<span class="text-xs text-muted-foreground">+${relatedPeople.length - 3}</span>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <!-- Project Location (if available) -->
                            ${project.location ? `
                                <div class="mb-4">
                                    <h4 class="text-sm font-medium text-muted-foreground mb-1">拠点</h4>
                                    <div class="flex items-center space-x-2">
                                        <span class="text-xs px-2 py-1 rounded-full ${project.location.area === '地域内' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${project.location.area}</span>
                                        ${project.location.landmark ? `<span class="text-xs text-muted-foreground">${project.location.landmark}</span>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <!-- Budget Progress (if available) -->
                            ${project.budget ? `
                                <div class="mb-4">
                                    <h4 class="text-sm font-medium text-muted-foreground mb-1">予算執行</h4>
                                    <div class="flex justify-between text-sm">
                                        <span>¥${project.budget.spent.toLocaleString()}</span>
                                        <span class="text-muted-foreground">/ ¥${project.budget.allocated.toLocaleString()}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
                                        <div class="bg-orange-500 h-1 rounded-full" style="width: ${(project.budget.spent / project.budget.allocated * 100).toFixed(1)}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            <!-- Action Buttons -->
                            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div class="flex items-center space-x-3 text-xs text-muted-foreground">
                                    <span>作成: ${formatDate(project.createdAt)}</span>
                                    ${project.estimatedDuration ? `<span>期間: ${project.estimatedDuration}</span>` : ''}
                                </div>
                                <div class="flex space-x-2">
                                    <button onclick="event.stopPropagation(); openProject(${project.id})" class="text-xs text-primary hover:text-primary/80 px-3 py-1 border border-primary/20 rounded-full hover:bg-primary/5 transition-colors">
                                        詳細を見る
                                    </button>
                                    ${project.location && project.location.lat && project.location.lng ? `
                                        <button onclick="event.stopPropagation(); openMapWithProject(${project.location.lat}, ${project.location.lng}, ${project.id})" class="text-xs text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors">
                                            地図で確認
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <!-- All Projects Link -->
        <div class="mt-6 text-center">
            <button onclick="showAllProjects()" class="text-sm text-primary hover:text-primary/80 px-4 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                すべてのプロジェクトを表示 →
            </button>
        </div>
    `;
}

function openProject(projectId) {
    // First check sampleData projects
    let project = sampleData.projects.find(p => p.id == projectId);
    
    // If not found, check localStorage projects
    if (!project) {
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        project = localProjects.find(p => p.id == projectId);
    }
    
    if (!project) {
        alert('プロジェクトが見つかりません');
        return;
    }
    
    // Show project detail modal
    showProjectDetailModal(project);
}

function showProjectDetailModal(project) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('project-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-detail-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        document.body.appendChild(modal);
    }
    
    // Get related people and actions
    const relatedPeople = project.relatedPeople ? project.relatedPeople.map(id => sampleData.people.find(p => p.id === id)).filter(Boolean) : [];
    const relatedActions = sampleData.actions.filter(action => action.linkedProjects && action.linkedProjects.includes(project.id));
    
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/50" onclick="closeProjectDetail()"></div>
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-7xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        ${project.title.charAt(0)}
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">${project.title}</h2>
                        <div class="flex items-center space-x-3 mt-2">
                            <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                            ${project.tags.map(tag => `<span class="tag ${tag.slice(1)}">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="openProjectEditModal(${project.id})" class="px-3 py-2 border border-input rounded-md hover:bg-accent">
                        編集
                    </button>
                    <button onclick="closeProjectDetail()" class="text-muted-foreground hover:text-foreground">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="grid gap-6 lg:grid-cols-3">
                <!-- Left Column: Overview -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Project Overview -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">プロジェクト概要</h3>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground mb-2">目的・Purpose</h4>
                                <p class="text-sm">${project.purpose}</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground mb-2">範囲・Scope</h4>
                                <p class="text-sm">${project.scope}</p>
                            </div>
                            ${project.approach ? `
                                <div>
                                    <h4 class="text-sm font-medium text-muted-foreground mb-2">アプローチ</h4>
                                    <p class="text-sm">${project.approach}</p>
                                </div>
                            ` : ''}
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground mb-2">KPI・成功指標</h4>
                                <p class="text-sm font-medium text-blue-600">${project.kpi}</p>
                            </div>
                            ${project.currentPhase ? `
                                <div>
                                    <h4 class="text-sm font-medium text-muted-foreground mb-2">現在のフェーズ</h4>
                                    <p class="text-sm">${project.currentPhase}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Project Metrics (if available) -->
                    ${project.metrics ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">プロジェクト指標</h3>
                            </div>
                            <div class="card-content">
                                <div class="grid gap-4 md:grid-cols-3">
                                    ${project.metrics.website ? `
                                        <div class="text-center p-4 bg-blue-50 rounded-lg">
                                            <div class="text-2xl font-bold text-blue-600">${project.metrics.website.visitors}</div>
                                            <div class="text-sm text-muted-foreground">Webサイト訪問者</div>
                                            <div class="text-xs text-muted-foreground">目標: ${project.metrics.website.target} (${project.metrics.website.period})</div>
                                        </div>
                                    ` : ''}
                                    ${project.metrics.social ? `
                                        <div class="text-center p-4 bg-green-50 rounded-lg">
                                            <div class="text-2xl font-bold text-green-600">${project.metrics.social.followers}</div>
                                            <div class="text-sm text-muted-foreground">SNSフォロワー</div>
                                            <div class="text-xs text-muted-foreground">目標: ${project.metrics.social.target}, エンゲージメント: ${project.metrics.social.engagement}</div>
                                        </div>
                                    ` : ''}
                                    ${project.metrics.media ? `
                                        <div class="text-center p-4 bg-purple-50 rounded-lg">
                                            <div class="text-2xl font-bold text-purple-600">${project.metrics.media.mentions}</div>
                                            <div class="text-sm text-muted-foreground">メディア露出</div>
                                            <div class="text-xs text-muted-foreground">目標: ${project.metrics.media.target} (${project.metrics.media.period})</div>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Next Milestones (if available) -->
                    ${project.nextMilestones ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">次のマイルストーン</h3>
                            </div>
                            <div class="card-content space-y-3">
                                ${project.nextMilestones.map(milestone => `
                                    <div class="flex items-center justify-between p-3 border rounded-lg">
                                        <div class="flex-1">
                                            <h4 class="font-medium text-sm">${milestone.title}</h4>
                                            <p class="text-xs text-muted-foreground mt-1">担当: ${milestone.responsible}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm font-medium">${formatDate(milestone.deadline)}</p>
                                            <span class="text-xs px-2 py-1 rounded-full ${milestone.status === '進行中' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}">
                                                ${milestone.status}
                                            </span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- KPT Logs -->
                    ${project.kptLogs && project.kptLogs.length > 0 ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">KPTログ・振り返り</h3>
                            </div>
                            <div class="card-content space-y-3">
                                ${project.kptLogs.map(log => `
                                    <div class="flex items-start space-x-3 p-3 rounded-lg ${log.type === 'Keep' ? 'bg-green-50 border-l-4 border-green-400' : log.type === 'Problem' ? 'bg-red-50 border-l-4 border-red-400' : 'bg-blue-50 border-l-4 border-blue-400'}">
                                        <div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${log.type === 'Keep' ? 'bg-green-500' : log.type === 'Problem' ? 'bg-red-500' : 'bg-blue-500'}">
                                            ${log.type.charAt(0)}
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-sm">${log.content}</p>
                                            <p class="text-xs text-muted-foreground mt-1">${formatDate(log.date)} ${log.author ? `• ${log.author}` : ''}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Change History -->
                    ${project.changeHistory && project.changeHistory.length > 0 ? `
                        <div class="card">
                            <div class="card-header">
                                <div class="flex items-center justify-between">
                                    <h3 class="font-semibold">変更履歴・トレーサビリティ</h3>
                                    ${project.version ? `<span class="text-sm text-muted-foreground">バージョン: ${project.version}</span>` : ''}
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="space-y-4">
                                    ${project.changeHistory.map((change, index) => `
                                        <div class="relative ${index < project.changeHistory.length - 1 ? 'pb-4' : ''}">
                                            ${index < project.changeHistory.length - 1 ? '<div class="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>' : ''}
                                            <div class="flex items-start space-x-3">
                                                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${change.changeType === 'created' ? 'bg-green-500' : change.impactLevel === 'major' ? 'bg-red-500' : 'bg-blue-500'}">
                                                    ${change.changeType === 'created' ? 'C' : change.changeType === 'updated' ? 'U' : 'M'}
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <div class="flex items-center justify-between mb-1">
                                                        <h4 class="font-medium text-sm">${change.title}</h4>
                                                        <div class="flex items-center space-x-2">
                                                            <span class="text-xs px-2 py-1 rounded-full ${change.impactLevel === 'major' ? 'bg-red-100 text-red-700' : change.impactLevel === 'minor' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}">
                                                                ${change.impactLevel}
                                                            </span>
                                                            <span class="text-xs text-muted-foreground">${change.version}</span>
                                                        </div>
                                                    </div>
                                                    <p class="text-sm text-gray-700 mb-2">${change.description}</p>
                                                    <div class="text-xs text-muted-foreground mb-2">
                                                        ${formatDate(change.date)} • ${change.author}
                                                        ${change.approvedBy ? ` • 承認: ${change.approvedBy}` : ''}
                                                    </div>
                                                    ${change.changes && change.changes.length > 0 ? `
                                                        <div class="bg-gray-50 rounded-lg p-3 mb-2">
                                                            <h5 class="text-xs font-medium text-gray-600 mb-2">主な変更内容:</h5>
                                                            <ul class="text-xs text-gray-700 space-y-1">
                                                                ${change.changes.map(item => `<li class="flex items-start space-x-2"><span class="text-blue-500 mt-1">•</span><span>${item}</span></li>`).join('')}
                                                            </ul>
                                                        </div>
                                                    ` : ''}
                                                    ${change.relatedKPT && change.relatedKPT.length > 0 ? `
                                                        <div class="bg-blue-50 border-l-4 border-blue-400 rounded p-2">
                                                            <h5 class="text-xs font-medium text-blue-700 mb-1">関連するKPT:</h5>
                                                            <ul class="text-xs text-blue-700 space-y-1">
                                                                ${change.relatedKPT.map(kpt => `<li>• ${kpt}</li>`).join('')}
                                                            </ul>
                                                        </div>
                                                    ` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <!-- Change Summary -->
                                <div class="mt-6 pt-4 border-t border-gray-200">
                                    <h4 class="text-sm font-medium text-muted-foreground mb-3">変更サマリー</h4>
                                    <div class="grid grid-cols-3 gap-4 text-center">
                                        <div class="bg-green-50 rounded-lg p-3">
                                            <div class="text-lg font-bold text-green-600">${project.changeHistory.filter(c => c.changeType === 'created').length}</div>
                                            <div class="text-xs text-green-700">作成</div>
                                        </div>
                                        <div class="bg-blue-50 rounded-lg p-3">
                                            <div class="text-lg font-bold text-blue-600">${project.changeHistory.filter(c => c.changeType === 'updated').length}</div>
                                            <div class="text-xs text-blue-700">更新</div>
                                        </div>
                                        <div class="bg-orange-50 rounded-lg p-3">
                                            <div class="text-lg font-bold text-orange-600">${project.changeHistory.filter(c => c.impactLevel === 'major').length}</div>
                                            <div class="text-xs text-orange-700">重要変更</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Right Column: Details -->
                <div class="space-y-6">
                    <!-- Project Info -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">プロジェクト情報</h3>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground mb-1">開始日</h4>
                                <p class="text-sm">${formatDate(project.createdAt)}</p>
                            </div>
                            ${project.estimatedDuration ? `
                                <div>
                                    <h4 class="text-sm font-medium text-muted-foreground mb-1">予定期間</h4>
                                    <p class="text-sm">${project.estimatedDuration}</p>
                                </div>
                            ` : ''}
                            ${project.budget ? `
                                <div>
                                    <h4 class="text-sm font-medium text-muted-foreground mb-1">予算</h4>
                                    <div class="space-y-2">
                                        <div class="flex justify-between text-sm">
                                            <span>総予算</span>
                                            <span class="font-medium">¥${project.budget.allocated.toLocaleString()}</span>
                                        </div>
                                        <div class="flex justify-between text-sm">
                                            <span>使用済</span>
                                            <span class="font-medium text-blue-600">¥${project.budget.spent.toLocaleString()}</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${(project.budget.spent / project.budget.allocated * 100).toFixed(1)}%"></div>
                                        </div>
                                        <p class="text-xs text-muted-foreground">${(project.budget.spent / project.budget.allocated * 100).toFixed(1)}% 使用</p>
                                    </div>
                                </div>
                            ` : ''}
                            ${project.location ? `
                                <div>
                                    <h4 class="text-sm font-medium text-muted-foreground mb-1">拠点</h4>
                                    <div class="space-y-1">
                                        <p class="text-sm">
                                            <span class="inline-block px-2 py-1 text-xs rounded-full ${project.location.area === '地域内' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${project.location.area}</span>
                                        </p>
                                        ${project.location.address ? `<p class="text-sm text-gray-700">${project.location.address}</p>` : ''}
                                        ${project.location.landmark ? `<p class="text-xs text-muted-foreground">${project.location.landmark}</p>` : ''}
                                        ${project.location.scope ? `<p class="text-xs text-muted-foreground">対象範囲: ${project.location.scope}</p>` : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Related People -->
                    ${relatedPeople.length > 0 ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">関連するネットワーク</h3>
                            </div>
                            <div class="card-content space-y-3">
                                ${relatedPeople.map(person => `
                                    <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer" onclick="openPersonDetail(${person.id}); closeProjectDetail();">
                                        <div class="avatar avatar-sm">${person.avatar}</div>
                                        <div class="flex-1">
                                            <p class="text-sm font-medium">${getMaskedName(person.name)}</p>
                                            <p class="text-xs text-muted-foreground">${person.role}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Stakeholders (if available) -->
                    ${project.stakeholders ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">ステークホルダー</h3>
                            </div>
                            <div class="card-content space-y-3">
                                ${project.stakeholders.map(stakeholder => `
                                    <div class="p-3 border rounded-lg">
                                        <h4 class="font-medium text-sm">${stakeholder.name}</h4>
                                        <p class="text-xs text-muted-foreground mt-1">${stakeholder.role}</p>
                                        <span class="inline-block mt-2 text-xs px-2 py-1 rounded-full ${stakeholder.involvement === '高' ? 'bg-red-100 text-red-700' : stakeholder.involvement === '中' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
                                            関与度: ${stakeholder.involvement}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Risks (if available) -->
                    ${project.risks ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">リスク管理</h3>
                            </div>
                            <div class="card-content space-y-3">
                                ${project.risks.map(risk => `
                                    <div class="p-3 border rounded-lg">
                                        <h4 class="font-medium text-sm">${risk.risk}</h4>
                                        <div class="flex space-x-2 mt-2">
                                            <span class="text-xs px-2 py-1 rounded-full ${risk.impact === '高' ? 'bg-red-100 text-red-700' : risk.impact === '中' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
                                                影響: ${risk.impact}
                                            </span>
                                            <span class="text-xs px-2 py-1 rounded-full ${risk.probability === '高' ? 'bg-red-100 text-red-700' : risk.probability === '中' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
                                                確率: ${risk.probability}
                                            </span>
                                        </div>
                                        <p class="text-xs text-muted-foreground mt-2">対策: ${risk.mitigation}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Related Actions -->
                    ${relatedActions.length > 0 ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">関連アクション</h3>
                            </div>
                            <div class="card-content space-y-2">
                                ${relatedActions.slice(0, 5).map(action => `
                                    <div class="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                                        <span class="badge action-${action.type} text-xs">${action.type}</span>
                                        <div class="flex-1">
                                            <p class="text-sm">${action.content}</p>
                                            <p class="text-xs text-muted-foreground">${formatDate(action.deadline)}</p>
                                        </div>
                                        <span class="badge status-${action.status.toLowerCase()} text-xs">${action.status}</span>
                                    </div>
                                `).join('')}
                                ${relatedActions.length > 5 ? `<p class="text-xs text-muted-foreground text-center">他 ${relatedActions.length - 5} 件</p>` : ''}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Documents (if available) -->
                    ${project.documents ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">関連ドキュメント</h3>
                            </div>
                            <div class="card-content space-y-2">
                                ${project.documents.map(doc => `
                                    <div class="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                                        <div class="flex-1">
                                            <p class="text-sm font-medium">${doc.title}</p>
                                            <p class="text-xs text-muted-foreground">${doc.type} • 更新: ${formatDate(doc.lastUpdated)}</p>
                                        </div>
                                        <span class="text-xs px-2 py-1 rounded-full ${doc.status === '完成' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                                            ${doc.status}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Lessons (if available) -->
                    ${project.lessons ? `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">学んだこと</h3>
                            </div>
                            <div class="card-content space-y-2">
                                ${project.lessons.map(lesson => `
                                    <div class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                                        <p class="text-sm">${lesson}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeProjectDetail() {
    const modal = document.getElementById('project-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openProjectEditModal(projectId) {
    const project = sampleData.projects.find(p => p.id == projectId);
    if (!project) {
        alert('プロジェクトが見つかりません');
        return;
    }
    
    // Close project detail modal
    closeProjectDetail();
    
    // Create or update edit modal
    let editModal = document.getElementById('project-edit-modal');
    if (!editModal) {
        editModal = document.createElement('div');
        editModal.id = 'project-edit-modal';
        editModal.className = 'fixed inset-0 z-50 hidden';
        document.body.appendChild(editModal);
    }
    
    editModal.innerHTML = `
        <div class="fixed inset-0 bg-black/50" onclick="closeProjectEditModal()"></div>
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold">プロジェクトを編集</h2>
                    <p class="text-muted-foreground">${project.title}</p>
                </div>
                <button onclick="closeProjectEditModal()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <form onsubmit="saveProjectEdit(event, ${project.id})" class="space-y-6">
                <div class="grid gap-6 lg:grid-cols-2">
                    <!-- Left Column: Basic Info -->
                    <div class="space-y-6">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">基本情報</h3>
                            </div>
                            <div class="card-content space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">プロジェクト名 *</label>
                                    <input type="text" id="edit-project-title" value="${project.title}" class="w-full p-2 border border-input rounded-md" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">目的 *</label>
                                    <textarea id="edit-project-purpose" class="w-full p-2 border border-input rounded-md h-20" required>${project.purpose}</textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">範囲・スコープ *</label>
                                    <textarea id="edit-project-scope" class="w-full p-2 border border-input rounded-md h-24" required>${project.scope}</textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">KPI・成功指標 *</label>
                                    <input type="text" id="edit-project-kpi" value="${project.kpi}" class="w-full p-2 border border-input rounded-md" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">ステータス</label>
                                    <select id="edit-project-status" class="w-full p-2 border border-input rounded-md">
                                        <option value="Plan" ${project.status === 'Plan' ? 'selected' : ''}>Plan（計画）</option>
                                        <option value="Try" ${project.status === 'Try' ? 'selected' : ''}>Try（実行）</option>
                                        <option value="Done" ${project.status === 'Done' ? 'selected' : ''}>Done（完了）</option>
                                        <option value="Pause" ${project.status === 'Pause' ? 'selected' : ''}>Pause（一時停止）</option>
                                    </select>
                                </div>
                                ${project.approach ? `
                                    <div>
                                        <label class="block text-sm font-medium mb-2">アプローチ</label>
                                        <textarea id="edit-project-approach" class="w-full p-2 border border-input rounded-md h-20">${project.approach}</textarea>
                                    </div>
                                ` : ''}
                                ${project.currentPhase ? `
                                    <div>
                                        <label class="block text-sm font-medium mb-2">現在のフェーズ</label>
                                        <input type="text" id="edit-project-phase" value="${project.currentPhase}" class="w-full p-2 border border-input rounded-md">
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Additional Info -->
                    <div class="space-y-6">
                        ${project.budget ? `
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="font-semibold">予算情報</h3>
                                </div>
                                <div class="card-content space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium mb-2">総予算</label>
                                        <input type="number" id="edit-project-budget-allocated" value="${project.budget.allocated}" class="w-full p-2 border border-input rounded-md">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium mb-2">使用済み予算</label>
                                        <input type="number" id="edit-project-budget-spent" value="${project.budget.spent}" class="w-full p-2 border border-input rounded-md">
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${project.estimatedDuration ? `
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="font-semibold">期間</h3>
                                </div>
                                <div class="card-content">
                                    <div>
                                        <label class="block text-sm font-medium mb-2">予定期間</label>
                                        <input type="text" id="edit-project-duration" value="${project.estimatedDuration}" class="w-full p-2 border border-input rounded-md">
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        <div class="card">
                            <div class="card-header">
                                <h3 class="font-semibold">変更情報</h3>
                            </div>
                            <div class="card-content space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">変更タイトル *</label>
                                    <input type="text" id="edit-change-title" placeholder="例: KPI指標の調整" class="w-full p-2 border border-input rounded-md" required>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">変更理由・説明 *</label>
                                    <textarea id="edit-change-description" placeholder="なぜこの変更が必要なのか、どのような影響があるかを記載してください。" class="w-full p-2 border border-input rounded-md h-20" required></textarea>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">影響レベル</label>
                                    <select id="edit-change-impact" class="w-full p-2 border border-input rounded-md">
                                        <option value="minor">Minor（軽微な変更）</option>
                                        <option value="major">Major（重要な変更）</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">承認者（任意）</label>
                                    <input type="text" id="edit-change-approver" placeholder="例: 山田 太郎" class="w-full p-2 border border-input rounded-md">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3 pt-6 border-t">
                    <button type="button" onclick="closeProjectEditModal()" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                        キャンセル
                    </button>
                    <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        変更を保存
                    </button>
                </div>
            </form>
        </div>
    `;
    
    editModal.classList.remove('hidden');
}

function closeProjectEditModal() {
    const modal = document.getElementById('project-edit-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function saveProjectEdit(event, projectId) {
    event.preventDefault();
    
    const projectIndex = sampleData.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
        alert('プロジェクトが見つかりません');
        return;
    }
    
    const project = sampleData.projects[projectIndex];
    const originalProject = JSON.parse(JSON.stringify(project)); // Deep copy for comparison
    
    // Collect form data
    const title = document.getElementById('edit-project-title').value.trim();
    const purpose = document.getElementById('edit-project-purpose').value.trim();
    const scope = document.getElementById('edit-project-scope').value.trim();
    const kpi = document.getElementById('edit-project-kpi').value.trim();
    const status = document.getElementById('edit-project-status').value;
    const approach = document.getElementById('edit-project-approach')?.value?.trim();
    const currentPhase = document.getElementById('edit-project-phase')?.value?.trim();
    const budgetAllocated = parseFloat(document.getElementById('edit-project-budget-allocated')?.value) || null;
    const budgetSpent = parseFloat(document.getElementById('edit-project-budget-spent')?.value) || null;
    const estimatedDuration = document.getElementById('edit-project-duration')?.value?.trim();
    
    // Change tracking data
    const changeTitle = document.getElementById('edit-change-title').value.trim();
    const changeDescription = document.getElementById('edit-change-description').value.trim();
    const changeImpact = document.getElementById('edit-change-impact').value;
    const changeApprover = document.getElementById('edit-change-approver').value.trim();
    
    // Determine what changed
    const changes = [];
    if (title !== originalProject.title) changes.push(`タイトル変更: "${originalProject.title}" → "${title}"`);
    if (purpose !== originalProject.purpose) changes.push(`目的変更: "${originalProject.purpose}" → "${purpose}"`);
    if (scope !== originalProject.scope) changes.push(`範囲変更: "${originalProject.scope}" → "${scope}"`);
    if (kpi !== originalProject.kpi) changes.push(`KPI変更: "${originalProject.kpi}" → "${kpi}"`);
    if (status !== originalProject.status) changes.push(`ステータス変更: "${originalProject.status}" → "${status}"`);
    if (approach && approach !== originalProject.approach) changes.push(`アプローチ変更: "${originalProject.approach || '(未設定)'}" → "${approach}"`);
    if (currentPhase && currentPhase !== originalProject.currentPhase) changes.push(`フェーズ変更: "${originalProject.currentPhase || '(未設定)'}" → "${currentPhase}"`);
    if (budgetAllocated && originalProject.budget && budgetAllocated !== originalProject.budget.allocated) changes.push(`総予算変更: ¥${originalProject.budget.allocated.toLocaleString()} → ¥${budgetAllocated.toLocaleString()}`);
    if (budgetSpent && originalProject.budget && budgetSpent !== originalProject.budget.spent) changes.push(`使用済み予算変更: ¥${originalProject.budget.spent.toLocaleString()} → ¥${budgetSpent.toLocaleString()}`);
    if (estimatedDuration && estimatedDuration !== originalProject.estimatedDuration) changes.push(`期間変更: "${originalProject.estimatedDuration || '(未設定)'}" → "${estimatedDuration}"`);
    
    // Update project data
    project.title = title;
    project.purpose = purpose;
    project.scope = scope;
    project.kpi = kpi;
    project.status = status;
    if (approach) project.approach = approach;
    if (currentPhase) project.currentPhase = currentPhase;
    if (budgetAllocated && project.budget) project.budget.allocated = budgetAllocated;
    if (budgetSpent && project.budget) project.budget.spent = budgetSpent;
    if (estimatedDuration) project.estimatedDuration = estimatedDuration;
    
    // Update version
    const currentVersion = project.version || '1.0.0';
    const versionParts = currentVersion.split('.').map(Number);
    if (changeImpact === 'major') {
        versionParts[1]++; // Increment minor version for major changes
        versionParts[2] = 0; // Reset patch version
    } else {
        versionParts[2]++; // Increment patch version for minor changes
    }
    project.version = versionParts.join('.');
    
    // Add to change history
    if (!project.changeHistory) project.changeHistory = [];
    
    const changeEntry = {
        version: project.version,
        date: new Date().toISOString().split('T')[0],
        author: 'Current User', // In real app, this would be the logged-in user
        changeType: 'updated',
        title: changeTitle,
        description: changeDescription,
        changes: changes,
        impactLevel: changeImpact
    };
    
    if (changeApprover) {
        changeEntry.approvedBy = changeApprover;
    }
    
    project.changeHistory.unshift(changeEntry); // Add to beginning of array
    
    // Save data
    saveData();
    closeProjectEditModal();
    
    // Show success message and refresh project detail
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
    successMessage.textContent = 'プロジェクトを更新しました';
    document.body.appendChild(successMessage);
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
    
    // Reopen project detail with updated data
    setTimeout(() => {
        openProject(projectId);
    }, 500);
}

// Project listing functionality
function openProjectList() {
    let modal = document.getElementById('project-list-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-list-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/50" onclick="closeProjectList()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
                <div id="project-list-content">
                    <!-- Content will be populated by JavaScript -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const content = document.getElementById('project-list-content');
    const allProjects = sampleData.projects || [];
    
    content.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold">全プロジェクト一覧</h2>
                    <p class="text-muted-foreground">すべてのプロジェクトのステータスと詳細を確認できます</p>
                </div>
                <button onclick="closeProjectList()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <!-- Project Status Summary -->
            <div class="grid gap-4 md:grid-cols-4 mb-6">
                ${['Plan', 'Try', 'Done', 'Pause'].map(status => {
                    const count = allProjects.filter(p => p.status === status).length;
                    const statusLabels = {
                        'Plan': '計画',
                        'Try': '実行中', 
                        'Done': '完了',
                        'Pause': '一時停止'
                    };
                    return `
                        <div class="card p-4 text-center">
                            <div class="text-2xl font-bold ${status === 'Done' ? 'text-green-600' : status === 'Try' ? 'text-blue-600' : status === 'Pause' ? 'text-orange-600' : 'text-gray-600'}">${count}</div>
                            <div class="text-sm text-muted-foreground">${statusLabels[status]}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- All Projects List -->
            <div class="space-y-4">
                ${allProjects.map(project => `
                    <div class="card hover:shadow-md transition-shadow cursor-pointer" onclick="closeProjectList(); openProject(${project.id})">
                        <div class="card-content p-4">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-lg">${project.title}</h3>
                                <span class="px-2 py-1 text-xs rounded-full ${
                                    project.status === 'Done' ? 'bg-green-100 text-green-800' :
                                    project.status === 'Try' ? 'bg-blue-100 text-blue-800' :
                                    project.status === 'Pause' ? 'bg-orange-100 text-orange-800' :
                                    'bg-gray-100 text-gray-800'
                                }">
                                    ${project.status === 'Plan' ? '計画' : project.status === 'Try' ? '実行中' : project.status === 'Done' ? '完了' : '一時停止'}
                                </span>
                            </div>
                            <p class="text-muted-foreground mb-2">${project.purpose || project.description}</p>
                            <div class="flex items-center justify-between text-sm text-muted-foreground">
                                <span>KPI: ${project.kpi}</span>
                                ${project.version ? `<span>v${project.version}</span>` : ''}
                            </div>
                            ${project.budget ? `
                                <div class="mt-2 text-sm">
                                    <span class="text-muted-foreground">予算進捗:</span>
                                    <span class="ml-2">${((project.budget.spent / project.budget.allocated) * 100).toFixed(0)}% (¥${project.budget.spent.toLocaleString()} / ¥${project.budget.allocated.toLocaleString()})</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeProjectList() {
    const modal = document.getElementById('project-list-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openMapWithProject(lat, lng, projectId) {
    // Save the location and project info to highlight on map
    sessionStorage.setItem('highlightLocation', JSON.stringify({ 
        lat, 
        lng, 
        type: 'project',
        id: projectId 
    }));
    
    // Navigate to map page
    window.location.hash = '#map';
}

function showAllProjects() {
    // Function to show all projects in a modal or separate view
    let modal = document.getElementById('project-modal');
    if (!modal) {
        // Create modal if it doesn't exist
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/50" onclick="closeIdeationWorkspace()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-7xl bg-background shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
                <div id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    const content = document.getElementById('modal-content');
    
    const allProjects = sampleData.projects || [];
    
    content.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold">全プロジェクト一覧</h2>
                    <p class="text-muted-foreground">すべてのプロジェクトの状況を確認できます</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <!-- Project Status Summary -->
            <div class="grid gap-4 md:grid-cols-4 mb-6">
                ${['Plan', 'Try', 'Done', 'Pause'].map(status => {
                    const count = allProjects.filter(p => p.status === status).length;
                    const percentage = allProjects.length > 0 ? Math.round((count / allProjects.length) * 100) : 0;
                    return `
                        <div class="text-center p-4 rounded-lg border-2 ${status === 'Plan' ? 'border-gray-200 bg-gray-50' : status === 'Try' ? 'border-blue-200 bg-blue-50' : status === 'Done' ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}">
                            <div class="text-2xl font-bold ${status === 'Plan' ? 'text-gray-600' : status === 'Try' ? 'text-blue-600' : status === 'Done' ? 'text-green-600' : 'text-orange-600'}">${count}</div>
                            <div class="text-sm font-medium">${status}</div>
                            <div class="text-xs text-muted-foreground">${percentage}%</div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- All Projects List -->
            <div class="space-y-4">
                ${allProjects.map(project => {
                    const relatedActions = sampleData.actions.filter(action => 
                        action.linkedProjects && action.linkedProjects.includes(project.id)
                    );
                    const totalActions = relatedActions.length;
                    const completedActions = relatedActions.filter(action => action.status === 'Done').length;
                    const progressPercentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
                    
                    return `
                        <div class="card hover:shadow-md transition-all duration-200 cursor-pointer" onclick="closeIdeationWorkspace(); openProject(${project.id})">
                            <div class="card-content">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-3 mb-2">
                                            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                ${project.title.charAt(0)}
                                            </div>
                                            <h3 class="font-semibold text-lg">${project.title}</h3>
                                            <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                                        </div>
                                        <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${project.purpose}</p>
                                        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <span>KPI: ${project.kpi}</span>
                                            <span>作成: ${formatDate(project.createdAt)}</span>
                                            ${totalActions > 0 ? `<span>進捗: ${progressPercentage}% (${completedActions}/${totalActions})</span>` : ''}
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        ${project.tags.slice(0, 3).map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
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
window.openProject = openProject;
window.showProjectDetailModal = showProjectDetailModal;
window.closeProjectDetail = closeProjectDetail;
window.openProjectEditModal = openProjectEditModal;
window.closeProjectEditModal = closeProjectEditModal;
window.saveProjectEdit = saveProjectEdit;
window.openProjectList = openProjectList;
window.closeProjectList = closeProjectList;
window.loadActiveProjects = loadActiveProjects;
window.showAllProjects = showAllProjects;
window.openMapWithProject = openMapWithProject;
window.renderGoalSettingContent = renderGoalSettingContent;
window.renderIdeationContent = renderIdeationContent;
window.renderPlanningContent = renderPlanningContent;
window.addKPI = addKPI;
window.removeKPI = removeKPI;
window.addRisk = addRisk;
window.removeRisk = removeRisk;
window.generateGoalSummary = generateGoalSummary;
window.renderStakeholderContent = renderStakeholderContent;
window.renderProposalContent = renderProposalContent;
window.addStakeholderToMatrix = addStakeholderToMatrix;
window.generateStakeholderMatrix = generateStakeholderMatrix;
window.removeStakeholder = removeStakeholder;
window.showStakeholderDetail = showStakeholderDetail;
window.selectWizardStep = selectWizardStep;
window.getNextStepName = getNextStepName;
window.proceedToNextStep = proceedToNextStep;
window.showStepTransitionMessage = showStepTransitionMessage;
window.createProjectFromWizard = createProjectFromWizard;
window.extractTagsFromIdea = extractTagsFromIdea;
window.getFrameworkData = getFrameworkData;
window.showProjectCreationSuccess = showProjectCreationSuccess;
window.clearWizardData = clearWizardData;
window.saveGoalData = saveGoalData;
window.updateWizardProgress = updateWizardProgress;
window.updateStepDetail = updateStepDetail;
window.markStepCompleted = markStepCompleted;
window.getNextStep = getNextStep;
window.initializeWizard = initializeWizard;

// Initialize wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#projects' || document.querySelector('.projects-container')) {
        setTimeout(initializeWizard, 100);
    }
});

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

// Framework save functions
function save5W1HData() {
    const framework = document.getElementById('framework-workspace');
    const textareas = framework.querySelectorAll('textarea');
    const data = {
        who: textareas[0]?.value || '',
        what: textareas[1]?.value || '',
        when: textareas[2]?.value || '',
        where: textareas[3]?.value || '',
        why: textareas[4]?.value || '',
        how: textareas[5]?.value || '',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('5w1hData', JSON.stringify(data));
    
    // Show success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '保存完了！';
    button.classList.add('bg-green-600');
    button.classList.remove('bg-blue-600');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-blue-600');
    }, 2000);
}

function saveLogicTreeData() {
    const framework = document.getElementById('framework-workspace');
    const textareas = framework.querySelectorAll('textarea');
    const inputs = framework.querySelectorAll('input');
    
    const data = {
        mainProblem: textareas[0]?.value || '',
        subProblem1: textareas[1]?.value || '',
        subProblem2: textareas[2]?.value || '',
        subProblem3: textareas[3]?.value || '',
        solutions: Array.from(inputs).map(input => input.value),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('logicTreeData', JSON.stringify(data));
    
    // Show success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '保存完了！';
    button.classList.add('bg-green-700');
    button.classList.remove('bg-green-600');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-700');
        button.classList.add('bg-green-600');
    }, 2000);
}

function saveBusinessCanvasData() {
    const framework = document.getElementById('framework-workspace');
    const textareas = framework.querySelectorAll('textarea');
    
    const data = {
        keyPartners: textareas[0]?.value || '',
        keyActivities: textareas[1]?.value || '',
        valueProposition: textareas[2]?.value || '',
        keyResources: textareas[3]?.value || '',
        customerRelationships: textareas[4]?.value || '',
        customerSegments: textareas[5]?.value || '',
        costStructure: textareas[6]?.value || '',
        channels: textareas[7]?.value || '',
        revenueStreams: textareas[8]?.value || '',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('businessCanvasData', JSON.stringify(data));
    
    // Show success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '保存完了！';
    button.classList.add('bg-purple-700');
    button.classList.remove('bg-purple-600');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-purple-700');
        button.classList.add('bg-purple-600');
    }, 2000);
}

// Expose framework save functions to global scope
window.save5W1HData = save5W1HData;
window.saveLogicTreeData = saveLogicTreeData;
window.saveBusinessCanvasData = saveBusinessCanvasData;

// Render Stakeholder Content
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
                            <div id="stakeholder-matrix" class="relative">
                                <!-- Matrix will be generated here -->
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
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button onclick="markStepCompleted('planning'); openIdeationWorkspace('goal-setting')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
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

// Render Proposal Content
function renderProposalContent() {
    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">ステップ5: 提案作成</h2>
                        <p class="text-sm text-muted-foreground">分析結果をもとに、説得力のある提案書を作成しましょう</p>
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
                <!-- Left Column: Template Selection -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">提案テンプレートを選択</h3>
                            <p class="text-sm text-muted-foreground">プロジェクトの性質に合ったテンプレートを選んでください</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="grid gap-4">
                                <div onclick="selectProposalTemplate('business')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">ビジネス提案書</h4>
                                            <p class="text-sm text-gray-600">事業提案・新規事業・収益化</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div onclick="selectProposalTemplate('project')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">プロジェクト企画書</h4>
                                            <p class="text-sm text-gray-600">プロジェクト・施策・イベント</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div onclick="selectProposalTemplate('simple')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">シンプル提案</h4>
                                            <p class="text-sm text-gray-600">アイデア・改善提案・社内提案</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">提案書生成</h3>
                        </div>
                        <div class="card-content">
                            <div class="space-y-4">
                                <button onclick="generateProposal()" class="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    提案書を生成
                                </button>
                                
                                <div id="generated-proposal" class="min-h-[100px] text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-6">
                                    <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    <p>テンプレートを選択して提案書を生成してください</p>
                                </div>
                                
                                <div class="flex gap-2">
                                    <button onclick="downloadProposal()" disabled class="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
                                        ダウンロード
                                    </button>
                                    <button onclick="shareProposal()" disabled class="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
                                        共有
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Preview -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">テンプレートプレビュー</h3>
                        </div>
                        <div class="card-content">
                            <div id="proposal-preview" class="min-h-[300px] text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-6">
                                <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                <p>テンプレートを選択するとプレビューが表示されます</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">これまでの分析結果</h3>
                        </div>
                        <div class="card-content">
                            <div class="space-y-3 text-sm">
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                                    </svg>
                                    <span>想いの整理が完了</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                                    </svg>
                                    <span>企画構成が完了</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                                    </svg>
                                    <span>目標設定が完了</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                                    </svg>
                                    <span>関係者分析が完了</span>
                                </div>
                                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p class="text-blue-700 text-xs">これらの分析結果が提案書に自動的に反映されます</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button onclick="openIdeationWorkspace('stakeholder')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    ← 前のステップ
                </button>
                <div class="text-center">
                    <div class="text-sm text-muted-foreground mb-2">ステップ 5 / 5</div>
                    <div class="w-64 h-2 bg-gray-200 rounded-full mx-auto">
                        <div class="w-full h-2 bg-indigo-600 rounded-full"></div>
                    </div>
                </div>
                <button onclick="createProjectFromWizard()" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
                    プロジェクトを開始する
                </button>
            </div>
        </div>
    `;
}

// Create project from wizard data
function createProjectFromWizard() {
    try {
        // Collect data from all wizard steps
        const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
        const goalData = JSON.parse(localStorage.getItem('goalData') || '{}');
        const stakeholders = JSON.parse(localStorage.getItem('stakeholders') || '[]');
        const frameworkData = getFrameworkData();
        
        // Validate required data
        if (!ideationData.idea || !ideationData.idea.trim()) {
            alert('想いの整理でアイデアを入力してください。');
            return;
        }
        
        if (!goalData.smartGoal || !goalData.smartGoal.trim()) {
            alert('目標設定でSMART目標を設定してください。');
            return;
        }
        
        // Generate project data
        const projectData = {
            id: Date.now(),
            title: ideationData.idea.substring(0, 50) + (ideationData.idea.length > 50 ? '...' : ''),
            purpose: ideationData.problem || '課題解決プロジェクト',
            goal: goalData.smartGoal,
            kpi: goalData.kpis && goalData.kpis.length > 0 ? goalData.kpis[0].name : '成果指標未設定',
            status: 'Try',
            priority: 'Medium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: extractTagsFromIdea(ideationData.idea),
            stakeholders: stakeholders.map(s => ({
                name: s.name,
                role: s.role,
                influence: s.influence,
                interest: s.interest
            })),
            framework: frameworkData,
            wizardData: {
                ideation: ideationData,
                goals: goalData,
                stakeholders: stakeholders,
                completedAt: new Date().toISOString()
            }
        };
        
        // Save to projects list
        const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        existingProjects.push(projectData);
        localStorage.setItem('projects', JSON.stringify(existingProjects));
        
        // Mark wizard as completed
        markStepCompleted('proposal');
        
        // Show success message and redirect
        showProjectCreationSuccess(projectData);
        
    } catch (error) {
        console.error('プロジェクト作成エラー:', error);
        alert('プロジェクトの作成に失敗しました。もう一度お試しください。');
    }
}

// Extract tags from idea text
function extractTagsFromIdea(ideaText) {
    const commonTags = ['#地域', '#ビジネス', '#教育', '#健康', '#環境', '#技術', '#文化', '#スポーツ'];
    const tags = [];
    
    // Simple keyword matching
    const text = ideaText.toLowerCase();
    if (text.includes('地域') || text.includes('町') || text.includes('村')) tags.push('#地域');
    if (text.includes('ビジネス') || text.includes('事業') || text.includes('起業')) tags.push('#ビジネス');
    if (text.includes('教育') || text.includes('学習') || text.includes('スキル')) tags.push('#教育');
    if (text.includes('健康') || text.includes('医療') || text.includes('ウェルネス')) tags.push('#健康');
    if (text.includes('環境') || text.includes('エコ') || text.includes('持続可能')) tags.push('#環境');
    if (text.includes('技術') || text.includes('IT') || text.includes('DX')) tags.push('#技術');
    if (text.includes('文化') || text.includes('アート') || text.includes('伝統')) tags.push('#文化');
    if (text.includes('スポーツ') || text.includes('運動') || text.includes('フィットネス')) tags.push('#スポーツ');
    
    return tags.length > 0 ? tags : ['#プロジェクト'];
}

// Get framework data from localStorage
function getFrameworkData() {
    const frameworks = {
        '5w1h': localStorage.getItem('5w1hData'),
        'logicTree': localStorage.getItem('logicTreeData'),
        'businessCanvas': localStorage.getItem('businessCanvasData')
    };
    
    // Return the most recently used framework
    let latestFramework = null;
    let latestTimestamp = 0;
    
    Object.entries(frameworks).forEach(([key, data]) => {
        if (data) {
            try {
                const parsed = JSON.parse(data);
                const timestamp = new Date(parsed.timestamp).getTime();
                if (timestamp > latestTimestamp) {
                    latestTimestamp = timestamp;
                    latestFramework = { type: key, data: parsed };
                }
            } catch (e) {
                // Ignore invalid data
            }
        }
    });
    
    return latestFramework;
}

// Show project creation success
function showProjectCreationSuccess(projectData) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    successModal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">プロジェクト作成完了！</h3>
            <p class="text-gray-600 mb-6">「${projectData.title}」が進行中のプロジェクトとして作成されました。</p>
            <div class="space-y-3">
                <button onclick="openProject(${projectData.id}); document.body.removeChild(this.closest('.fixed'))" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    プロジェクトを開く
                </button>
                <button onclick="closeIdeationWorkspace(); document.body.removeChild(this.closest('.fixed'))" class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    ダッシュボードに戻る
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Clear wizard data
    setTimeout(() => {
        clearWizardData();
    }, 1000);
}

// Clear wizard data
function clearWizardData() {
    localStorage.removeItem('ideationData');
    localStorage.removeItem('goalData');
    localStorage.removeItem('stakeholders');
    localStorage.removeItem('wizardProgress');
    localStorage.removeItem('frameworkContext');
    localStorage.removeItem('5w1hData');
    localStorage.removeItem('logicTreeData');
    localStorage.removeItem('businessCanvasData');
}

// Stakeholder Matrix Functions
function addStakeholderToMatrix() {
    const name = document.getElementById('stakeholder-name').value.trim();
    const role = document.getElementById('stakeholder-role').value.trim();
    const influence = document.getElementById('stakeholder-influence').value;
    const interest = document.getElementById('stakeholder-interest').value;
    const notes = document.getElementById('stakeholder-notes').value.trim();
    
    if (!name || !role) {
        alert('関係者名と役割を入力してください。');
        return;
    }
    
    // Get existing stakeholders
    const stakeholders = JSON.parse(localStorage.getItem('stakeholders') || '[]');
    
    // Add new stakeholder
    const newStakeholder = {
        id: Date.now(),
        name,
        role,
        influence,
        interest,
        notes,
        createdAt: new Date().toISOString()
    };
    
    stakeholders.push(newStakeholder);
    localStorage.setItem('stakeholders', JSON.stringify(stakeholders));
    
    // Clear form
    document.getElementById('stakeholder-name').value = '';
    document.getElementById('stakeholder-role').value = '';
    document.getElementById('stakeholder-influence').value = 'medium';
    document.getElementById('stakeholder-interest').value = 'medium';
    document.getElementById('stakeholder-notes').value = '';
    
    // Refresh matrix
    generateStakeholderMatrix();
}

function generateStakeholderMatrix() {
    const stakeholders = JSON.parse(localStorage.getItem('stakeholders') || '[]');
    const matrix = document.getElementById('stakeholder-matrix');
    
    if (!matrix) return;
    
    const matrixSize = 300;
    
    matrix.innerHTML = `
        <div class="relative bg-gray-50 border rounded-lg" style="width: ${matrixSize}px; height: ${matrixSize}px;">
            <!-- Grid lines -->
            <div class="absolute inset-0">
                <div class="absolute w-full h-px bg-gray-300" style="top: 50%;"></div>
                <div class="absolute h-full w-px bg-gray-300" style="left: 50%;"></div>
            </div>
            
            <!-- Labels -->
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                高関心
            </div>
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                低関心
            </div>
            <div class="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-600">
                高影響力
            </div>
            <div class="absolute -right-8 top-1/2 transform -translate-y-1/2 rotate-90 text-xs font-medium text-gray-600">
                低影響力
            </div>
            
            <!-- Quadrant labels -->
            <div class="absolute top-2 left-2 text-xs text-red-600 font-medium">管理</div>
            <div class="absolute top-2 right-2 text-xs text-orange-600 font-medium">満足</div>
            <div class="absolute bottom-2 left-2 text-xs text-yellow-600 font-medium">情報</div>
            <div class="absolute bottom-2 right-2 text-xs text-green-600 font-medium">監視</div>
            
            <!-- Stakeholders -->
            ${stakeholders.map(stakeholder => {
                const x = stakeholder.interest === 'high' ? 75 : stakeholder.interest === 'medium' ? 50 : 25;
                const y = stakeholder.influence === 'high' ? 25 : stakeholder.influence === 'medium' ? 50 : 75;
                
                let color = 'bg-green-500'; // low influence, low interest
                if (stakeholder.influence === 'high' && stakeholder.interest === 'high') {
                    color = 'bg-red-500'; // manage closely
                } else if (stakeholder.influence === 'high' && stakeholder.interest === 'low') {
                    color = 'bg-orange-500'; // keep satisfied
                } else if (stakeholder.influence === 'low' && stakeholder.interest === 'high') {
                    color = 'bg-yellow-500'; // keep informed
                }
                
                return `
                    <div class="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" 
                         style="left: ${x}%; top: ${y}%;"
                         onclick="showStakeholderDetail(${stakeholder.id})">
                        <div class="w-3 h-3 ${color} rounded-full border-2 border-white shadow-sm hover:scale-125 transition-transform"></div>
                        <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${stakeholder.name}<br/><span class="text-gray-300">${stakeholder.role}</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        ${stakeholders.length > 0 ? `
            <div class="mt-4 space-y-2 max-h-32 overflow-y-auto">
                ${stakeholders.map(stakeholder => `
                    <div class="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                        <span class="font-medium">${stakeholder.name}</span>
                        <span class="text-gray-600">${stakeholder.role}</span>
                        <button onclick="removeStakeholder(${stakeholder.id})" class="text-red-500 hover:text-red-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

function removeStakeholder(id) {
    const stakeholders = JSON.parse(localStorage.getItem('stakeholders') || '[]');
    const filtered = stakeholders.filter(s => s.id !== id);
    localStorage.setItem('stakeholders', JSON.stringify(filtered));
    generateStakeholderMatrix();
}

function showStakeholderDetail(id) {
    const stakeholders = JSON.parse(localStorage.getItem('stakeholders') || '[]');
    const stakeholder = stakeholders.find(s => s.id === id);
    
    if (!stakeholder) return;
    
    alert(`${stakeholder.name}\n役割: ${stakeholder.role}\n影響力: ${stakeholder.influence}\n関心度: ${stakeholder.interest}${stakeholder.notes ? `\n特記事項: ${stakeholder.notes}` : ''}`);
}

// Expose framework save functions to global scope
window.save5W1HData = save5W1HData;
window.saveLogicTreeData = saveLogicTreeData;
window.saveBusinessCanvasData = saveBusinessCanvasData;

// Framework transition functions
function proceedToStakeholderAnalysis(frameworkType) {
    // First save current framework data
    if (frameworkType === '5w1h') {
        save5W1HData();
    } else if (frameworkType === 'logic-tree') {
        saveLogicTreeData();
    } else if (frameworkType === 'business-canvas') {
        saveBusinessCanvasData();
    }
    
    // Store the framework context for stakeholder analysis
    const frameworkContext = {
        type: frameworkType,
        completedAt: new Date().toISOString(),
        source: 'planning-workspace'
    };
    localStorage.setItem('frameworkContext', JSON.stringify(frameworkContext));
    
    // Transition to stakeholder analysis
    setTimeout(() => {
        const modal = document.getElementById('project-modal');
        const content = document.getElementById('modal-content');
        
        content.innerHTML = renderStakeholderContent();
        
        // Initialize stakeholder matrix after modal content is loaded
        setTimeout(() => {
            if (typeof initializeStakeholderMatrix === 'function') {
                initializeStakeholderMatrix();
            }
        }, 100);
    }, 500); // Small delay to show save completion
}

// Expose transition functions to global scope
window.proceedToStakeholderAnalysis = proceedToStakeholderAnalysis;

// Stakeholder Analysis Functions
function suggestStakeholdersFromFramework() {
    const frameworkContext = localStorage.getItem('frameworkContext');
    if (!frameworkContext) return;
    
    const context = JSON.parse(frameworkContext);
    let suggestions = [];
    
    // Get ideation data for context
    const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
    
    // Get people from network for personalized suggestions
    const networkSuggestions = suggestStakeholdersFromNetwork(ideationData);
    
    // Basic stakeholder suggestions based on common project patterns
    let genericSuggestions = [
        { name: 'プロジェクトオーナー', role: '意思決定者', influence: 'high', interest: 'high', type: 'generic' },
        { name: 'プロジェクトマネージャー', role: '推進責任者', influence: 'high', interest: 'high', type: 'generic' },
        { name: 'エンドユーザー', role: '利用者・受益者', influence: 'medium', interest: 'high', type: 'generic' },
        { name: '開発チーム', role: '実行者', influence: 'medium', interest: 'medium', type: 'generic' },
        { name: '予算承認者', role: '意思決定者', influence: 'high', interest: 'medium', type: 'generic' }
    ];
    
    // Add suggestions based on ideation content
    if (ideationData.target && ideationData.target.trim()) {
        genericSuggestions.push({
            name: ideationData.target,
            role: 'ターゲット', 
            influence: 'low', 
            interest: 'high',
            type: 'generic'
        });
    }
    
    // Combine network and generic suggestions
    suggestions = [...networkSuggestions, ...genericSuggestions];
    
    // Display suggestions
    const suggestionHtml = suggestions.map(stakeholder => `
        <div class="p-3 bg-white border ${stakeholder.type === 'network' ? 'border-blue-200 bg-blue-50' : 'border-purple-200'} rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
             onclick="addSuggestedStakeholder('${stakeholder.name}', '${stakeholder.role}', '${stakeholder.influence}', '${stakeholder.interest}')">
            <div class="flex items-center justify-between mb-2">
                <div class="font-medium text-gray-900">${stakeholder.name}</div>
                ${stakeholder.type === 'network' ? `
                    <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        ネットワーク
                    </span>
                ` : ''}
            </div>
            <div class="text-sm text-gray-600">${stakeholder.role}</div>
            ${stakeholder.reason ? `<div class="text-xs text-gray-500 mt-1">${stakeholder.reason}</div>` : ''}
            <div class="flex mt-2 space-x-2">
                <span class="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                    影響度: ${stakeholder.influence === 'high' ? '高' : stakeholder.influence === 'medium' ? '中' : '低'}
                </span>
                <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                    関心度: ${stakeholder.interest === 'high' ? '高' : stakeholder.interest === 'medium' ? '中' : '低'}
                </span>
            </div>
        </div>
    `).join('');
    
    // Show suggestions in a modal or overlay
    const existingOverlay = document.getElementById('stakeholder-suggestions');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'stakeholder-suggestions';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">推奨ステークホルダー</h3>
                <button onclick="closeSuggestions()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <p class="text-sm text-gray-600 mb-4">
                企画内容とネットワークから関係者を推奨しています。
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 ml-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    ネットワークから提案
                </span>
            </p>
            <div class="space-y-3">
                ${suggestionHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// New function to suggest stakeholders from people network
function suggestStakeholdersFromNetwork(ideationData) {
    // Get people data - try from global sampleData first, then from core.js
    let people = [];
    if (typeof sampleData !== 'undefined' && sampleData.people) {
        people = sampleData.people;
    } else if (typeof window.sampleData !== 'undefined' && window.sampleData.people) {
        people = window.sampleData.people;
    }
    
    if (!people || people.length === 0) {
        return [];
    }
    
    const suggestions = [];
    
    // Analyze ideation content for relevant keywords
    const allIdeationText = Object.values(ideationData || {}).join(' ').toLowerCase();
    
    people.forEach(person => {
        let relevance = 0;
        let reasons = [];
        let suggestedRole = person.role;
        let influence = 'medium';
        let interest = 'medium';
        
        // Check tag relevance
        person.tags.forEach(tag => {
            const tagText = tag.replace('#', '').toLowerCase();
            if (allIdeationText.includes(tagText)) {
                relevance += 3;
                reasons.push(`${tag}に関連`);
            }
        });
        
        // Check role relevance
        const roleText = person.role.toLowerCase();
        if (allIdeationText.includes(roleText) || 
            (roleText === '役場' && allIdeationText.includes('行政')) ||
            (roleText === '事業者' && allIdeationText.includes('ビジネス')) ||
            (roleText === '住民' && allIdeationText.includes('地域'))) {
            relevance += 2;
            reasons.push(`${person.role}として関連`);
        }
        
        // Determine suggested role and influence/interest based on person's actual role
        switch (person.role) {
            case '役場':
                suggestedRole = '行政担当者';
                influence = 'high';
                interest = 'high';
                break;
            case '事業者':
                suggestedRole = '事業パートナー';
                influence = 'medium';
                interest = 'high';
                break;
            case '協力隊':
                suggestedRole = '実行担当者';
                influence = 'medium';
                interest = 'high';
                break;
            case '住民':
                suggestedRole = '地域代表・受益者';
                influence = 'low';
                interest = 'high';
                break;
            case '学生':
                suggestedRole = '参加者・サポーター';
                influence = 'low';
                interest = 'medium';
                break;
        }
        
        // Add person if they have some relevance
        if (relevance > 0) {
            suggestions.push({
                name: person.name,
                role: suggestedRole,
                influence: influence,
                interest: interest,
                type: 'network',
                reason: reasons.join(', '),
                originalPerson: person
            });
        }
    });
    
    // Sort by relevance and return top suggestions
    return suggestions.sort((a, b) => {
        // Count reasons as relevance score
        const aScore = a.reason.split(',').length;
        const bScore = b.reason.split(',').length;
        return bScore - aScore;
    }).slice(0, 5); // Return top 5 network suggestions
}

function addSuggestedStakeholder(name, role, influence, interest) {
    // Fill the form with suggested data
    document.getElementById('stakeholder-name').value = name;
    document.getElementById('stakeholder-role').value = role;
    document.getElementById('stakeholder-influence').value = influence;
    document.getElementById('stakeholder-interest').value = interest;
    
    // Close suggestions
    closeSuggestions();
    
    // Auto-add to matrix if addStakeholder function exists
    if (typeof addStakeholderToMatrix === 'function') {
        addStakeholderToMatrix();
    }
}

function clearFrameworkContext() {
    localStorage.removeItem('frameworkContext');
    
    // Refresh the stakeholder content
    const content = document.getElementById('modal-content');
    content.innerHTML = renderStakeholderContent();
    
    // Re-initialize stakeholder matrix
    setTimeout(() => {
        if (typeof initializeStakeholderMatrix === 'function') {
            initializeStakeholderMatrix();
        }
    }, 100);
}

function closeSuggestions() {
    const overlay = document.getElementById('stakeholder-suggestions');
    if (overlay) {
        overlay.remove();
    }
}

// Expose stakeholder functions to global scope
window.suggestStakeholdersFromFramework = suggestStakeholdersFromFramework;
window.clearFrameworkContext = clearFrameworkContext;
window.addSuggestedStakeholder = addSuggestedStakeholder;
window.closeSuggestions = closeSuggestions;
window.showNetworkStakeholderSelector = showNetworkStakeholderSelector;
window.selectPersonAsStakeholder = selectPersonAsStakeholder;
window.closeNetworkSelector = closeNetworkSelector;

// Network Stakeholder Selector Function
function showNetworkStakeholderSelector() {
    // Get people data - try from global sampleData first, then from core.js
    let people = [];
    if (typeof sampleData !== 'undefined' && sampleData.people) {
        people = sampleData.people;
    } else if (typeof window.sampleData !== 'undefined' && window.sampleData.people) {
        people = window.sampleData.people;
    }
    
    if (!people || people.length === 0) {
        alert('ネットワークデータが見つかりません。');
        return;
    }
    
    // Get ideation data for context-aware suggestions
    const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
    const networkSuggestions = suggestStakeholdersFromNetwork(ideationData);
    
    // Create HTML for people list
    const peopleHtml = people.map(person => {
        // Check if this person is in suggestions
        const suggestion = networkSuggestions.find(s => s.originalPerson && s.originalPerson.id === person.id);
        const isRecommended = !!suggestion;
        
        return `
            <div class="p-4 bg-white border ${isRecommended ? 'border-blue-200 bg-blue-50' : 'border-gray-200'} rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                 onclick="selectPersonAsStakeholder(${person.id}, '${person.name}', '${person.role}', ${isRecommended})">
                <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            ${person.avatar || person.name.charAt(0)}
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">${person.name}</h4>
                            <p class="text-sm text-gray-600">${person.role}</p>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${person.tags.map(tag => `
                                    <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    ${isRecommended ? `
                        <div class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            推奨
                        </div>
                    ` : ''}
                </div>
                ${suggestion ? `
                    <div class="mt-3 text-xs text-blue-600 bg-blue-100 p-2 rounded">
                        <strong>推奨理由:</strong> ${suggestion.reason}
                    </div>
                ` : ''}
                ${person.notes ? `
                    <div class="mt-3 text-xs text-gray-500">
                        ${person.notes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
    
    // Show people selector modal
    const existingOverlay = document.getElementById('network-stakeholder-selector');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'network-stakeholder-selector';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900">ネットワークから関係者を選択</h3>
                    <p class="text-sm text-gray-600 mt-1">登録済みのネットワークから関係者を選択してマップに追加します</p>
                </div>
                <button onclick="closeNetworkSelector()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            ${networkSuggestions.length > 0 ? `
                <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div class="flex items-center mb-2">
                        <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        <span class="font-semibold text-blue-800">企画内容に基づく推奨</span>
                    </div>
                    <p class="text-sm text-blue-700">
                        ${networkSuggestions.length}人の関係者が企画に関連する可能性があります（青色でハイライト表示）
                    </p>
                </div>
            ` : ''}
            
            <div class="grid gap-4 md:grid-cols-2">
                ${peopleHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

function selectPersonAsStakeholder(personId, personName, personRole, isRecommended) {
    // Get people data to find the selected person
    let people = [];
    if (typeof sampleData !== 'undefined' && sampleData.people) {
        people = sampleData.people;
    } else if (typeof window.sampleData !== 'undefined' && window.sampleData.people) {
        people = window.sampleData.people;
    }
    
    const person = people.find(p => p.id === personId);
    if (!person) return;
    
    // Fill the stakeholder form with the person's data
    document.getElementById('stakeholder-name').value = person.name;
    
    // Determine role based on person's role and whether they're recommended
    let suggestedRole = person.role;
    let suggestedInfluence = 'medium';
    let suggestedInterest = 'medium';
    
    if (isRecommended) {
        // Get the recommendation data for more accurate suggestions
        const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
        const networkSuggestions = suggestStakeholdersFromNetwork(ideationData);
        const suggestion = networkSuggestions.find(s => s.originalPerson && s.originalPerson.id === personId);
        
        if (suggestion) {
            suggestedRole = suggestion.role;
            suggestedInfluence = suggestion.influence;
            suggestedInterest = suggestion.interest;
        }
    } else {
        // Default role mapping based on person's role
        switch (person.role) {
            case '役場':
                suggestedRole = '行政担当者';
                suggestedInfluence = 'high';
                suggestedInterest = 'high';
                break;
            case '事業者':
                suggestedRole = '事業パートナー';
                suggestedInfluence = 'medium';
                suggestedInterest = 'high';
                break;
            case '協力隊':
                suggestedRole = '実行担当者';
                suggestedInfluence = 'medium';
                suggestedInterest = 'high';
                break;
            case '住民':
                suggestedRole = '地域代表・受益者';
                suggestedInfluence = 'low';
                suggestedInterest = 'high';
                break;
            case '学生':
                suggestedRole = '参加者・サポーター';
                suggestedInfluence = 'low';
                suggestedInterest = 'medium';
                break;
        }
    }
    
    document.getElementById('stakeholder-role').value = suggestedRole;
    document.getElementById('stakeholder-influence').value = suggestedInfluence;
    document.getElementById('stakeholder-interest').value = suggestedInterest;
    
    // Close the network selector
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