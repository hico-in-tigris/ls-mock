// ===============================
// LocalSuccess - Projects Core Module
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
                                    <svg class="w-6 h-6 wizard-check-icon-1 hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">想いの整理</span>
                            </div>
                            
                            <!-- Arrow 1 -->
                            <div class="flex-1 border-t-2 border-gray-300 mx-4"></div>
                            
                            <!-- Step 2: 企画構成 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('planning')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-2">2</span>
                                    <svg class="w-6 h-6 wizard-check-icon-2 hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">企画構成</span>
                            </div>
                            
                            <!-- Arrow 2 -->
                            <div class="flex-1 border-t-2 border-gray-300 mx-4"></div>
                            
                            <!-- Step 3: 目標設定 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('goal-setting')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-3">3</span>
                                    <svg class="w-6 h-6 wizard-check-icon-3 hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">目標設定</span>
                            </div>
                            
                            <!-- Arrow 3 -->
                            <div class="flex-1 border-t-2 border-gray-300 mx-4"></div>
                            
                            <!-- Step 4: 関係者分析 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('stakeholder')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-4">4</span>
                                    <svg class="w-6 h-6 wizard-check-icon-4 hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">関係者分析</span>
                            </div>
                            
                            <!-- Arrow 4 -->
                            <div class="flex-1 border-t-2 border-gray-300 mx-4"></div>
                            
                            <!-- Step 5: 提案作成 -->
                            <div class="flex flex-col items-center cursor-pointer" onclick="selectWizardStep('proposal')">
                                <div class="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-5">5</span>
                                    <svg class="w-6 h-6 wizard-check-icon-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">提案作成</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Step Details -->
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
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="card">
                    <div class="card-content p-6">
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openStakeholderAnalysis()">
                            <svg class="w-8 h-8 mx-auto mb-2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <p class="text-sm text-muted-foreground">関係者分析</p>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content p-6">
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openGoalSetting()">
                            <svg class="w-8 h-8 mx-auto mb-2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            <p class="text-sm text-muted-foreground">目標設定</p>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content p-6">
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openProposalCreation()">
                            <svg class="w-8 h-8 mx-auto mb-2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <p class="text-sm text-muted-foreground">提案作成</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Active Projects -->
            <div class="card">
                <div class="card-header">
                    <h2 class="text-xl font-semibold">進行中のプロジェクト</h2>
                    <p class="text-sm text-muted-foreground">現在進行中のプロジェクトと次のアクション</p>
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

function loadActiveProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const activeProjects = projects.filter(p => p.status === 'active');
    
    const listElement = document.getElementById('active-projects-list');
    if (!listElement) return;
    
    if (activeProjects.length === 0) {
        listElement.innerHTML = `
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
        `;
        return;
    }
    
    listElement.innerHTML = activeProjects.map(project => `
        <div class="border rounded-lg p-4 hover:bg-accent transition-colors">
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-medium">${project.title}</h3>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">${project.status}</span>
            </div>
            <p class="text-sm text-muted-foreground mb-3">${project.description}</p>
            
            <div class="flex flex-wrap gap-2 mb-3">
                ${project.tags.map(tag => `
                    <span class="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">${tag}</span>
                `).join('')}
            </div>
            
            <div class="flex justify-between items-center text-sm text-muted-foreground">
                <span>作成日: ${new Date(project.createdAt).toLocaleDateString('ja-JP')}</span>
                <button onclick="viewProject('${project.id}')" class="text-primary hover:underline">詳細を見る</button>
            </div>
        </div>
    `).join('');
}

// Export functions to global scope
window.renderProjects = renderProjects;
window.loadActiveProjects = loadActiveProjects;