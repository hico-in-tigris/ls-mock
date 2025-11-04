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
                            <div class="mt-2 text-xs text-blue-600">メモ → 構造化</div>
                        </div>
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openIdeationWorkspace('planning')">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">企画構成</h3>
                            <p class="text-sm text-muted-foreground">フレームワークで整理</p>
                            <div class="mt-2 text-xs text-green-600">課題 → 解決策</div>
                        </div>
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openIdeationWorkspace('stakeholders')">
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
                            <div class="mt-2 text-xs text-purple-600">影響度 × 関心度</div>
                        </div>
                        <div class="text-center p-4 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onclick="openIdeationWorkspace('proposal')">
                            <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-100 flex items-center justify-center">
                                <svg class="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14,2 14,8 20,8"/>
                                </svg>
                            </div>
                            <h3 class="font-medium mb-2">提案作成</h3>
                            <p class="text-sm text-muted-foreground">資料の自動生成</p>
                            <div class="mt-2 text-xs text-orange-600">企画書 → 提案資料</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-6">
                <!-- Filters -->
                <div class="w-64 space-y-4">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-medium">フィルタ</h3>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="text-sm font-medium">ステータス</label>
                                <div class="mt-2 space-y-2">
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">Plan</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">Try</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">Done</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label class="text-sm font-medium">企画段階</label>
                                <div class="mt-2 space-y-2">
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">想い整理</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">企画構成</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">実行準備</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Project Cards -->
                <div class="flex-1 space-y-4">
                    ${sampleData.projects.map(project => `
                        <div class="card cursor-pointer hover:shadow-md transition-shadow" onclick="openProjectDetail(${project.id})">
                            <div class="card-content">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2 mb-2">
                                            <h3 class="font-semibold">${project.title}</h3>
                                            <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                                        </div>
                                        <p class="text-sm text-muted-foreground mb-3">${project.purpose}</p>
                                        
                                        <div class="flex items-center space-x-4 text-xs text-muted-foreground">
                                            <div class="flex items-center space-x-1">
                                                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                                </svg>
                                                <span>KPI: ${project.kpi}</span>
                                            </div>
                                            <div class="flex items-center space-x-1">
                                                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                                </svg>
                                                <span>${formatDate(project.createdAt)}</span>
                                            </div>
                                        </div>
                                        
                                        <div class="flex items-center space-x-2 mt-3">
                                            <span class="text-xs text-muted-foreground">関連:</span>
                                            ${project.relatedPeople.map(id => {
                                                const person = getPersonById(id);
                                                return `<div class="avatar avatar-sm" title="${getMaskedName(person.name)}">${person.avatar}</div>`;
                                            }).join('')}
                                        </div>
                                    </div>
                                    
                                    <div class="flex flex-col space-y-2">
                                        ${project.tags.map(tag => `<span class="tag ${tag.slice(1)}">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Ideation Workspace Modal -->
        <div id="ideation-workspace-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeIdeationWorkspace()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="ideation-workspace-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
        
        <!-- Project Detail Modal -->
        <div id="project-detail-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeProjectDetail()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="project-detail-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    `;
}

function openProjectDetail(projectId) {
    const project = getProjectById(projectId);
    const modal = document.getElementById('project-detail-modal');
    const content = document.getElementById('project-detail-content');
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div>
                <h2 class="text-2xl font-bold">${project.title}</h2>
                <div class="flex items-center space-x-2 mt-2">
                    <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                    <span class="text-sm text-muted-foreground">KPI: ${project.kpi}</span>
                </div>
            </div>
            <button onclick="closeProjectDetail()" class="text-muted-foreground hover:text-foreground">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2">
            <!-- Project Info -->
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">プロジェクト概要</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">目的</h4>
                            <p class="text-sm">${project.purpose}</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">スコープ</h4>
                            <p class="text-sm">${project.scope}</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">関連メンバー</h4>
                            <div class="flex items-center space-x-2 mt-1">
                                ${project.relatedPeople.map(id => {
                                    const person = getPersonById(id);
                                    return `
                                        <div class="flex items-center space-x-1">
                                            <div class="avatar avatar-sm">${person.avatar}</div>
                                            <span class="text-xs">${getMaskedName(person.name)}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">アクション</h3>
                    </div>
                    <div class="card-content space-y-2">
                        ${project.status === 'Try' ? `
                            <button onclick="promoteTryToPlan(${project.id})" class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M7 14l9-9"/>
                                    <path d="M16 5h-9v9"/>
                                </svg>
                                Try → Plan に昇格
                            </button>
                        ` : ''}
                        <button class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            履歴を表示
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- KPT Logs -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">KPTログ</h3>
                </div>
                <div class="card-content">
                    <div class="timeline">
                        ${project.kptLogs.map(log => `
                            <div class="timeline-item">
                                <div class="flex items-start space-x-3">
                                    <span class="badge ${log.type === 'Keep' ? 'badge-success' : log.type === 'Problem' ? 'badge-destructive' : 'badge-secondary'} text-xs">${log.type}</span>
                                    <div class="flex-1">
                                        <p class="text-sm">${log.content}</p>
                                        <p class="text-xs text-muted-foreground mt-1">${formatDate(log.date)}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeProjectDetail() {
    document.getElementById('project-detail-modal').classList.add('hidden');
}

function promoteTryToPlan(projectId) {
    const project = getProjectById(projectId);
    project.status = 'Plan';
    
    // Add to diff history
    const changeLog = {
        projectId: projectId,
        action: 'Try → Plan 昇格',
        reason: project.kptLogs.find(log => log.type === 'Try')?.content || 'Try段階の実施結果を受けてPlanに昇格',
        timestamp: new Date().toISOString(),
        kpiSnapshot: sampleData.planVersions.v2.kpiSnapshot
    };
    
    // Update demo step
    if (appState.demoStep === 4) {
        updateDemoStep(5);
    }
    
    saveData();
    closeProjectDetail();
    renderCurrentRoute();
    
    alert('プロジェクトがPlanに昇格しました。Diffページで変更履歴を確認できます。');
}

function generateAIOutline() {
    const mockOutline = {
        title: 'デジタル移住サポートプログラム',
        purpose: 'オンラインツールを活用して移住検討者の不安を軽減し、移住決定までの期間を短縮する',
        scope: 'VRによる地域体験、オンライン移住相談、デジタル手続きサポート',
        steps: [
            '1. VR地域体験コンテンツの制作（2ヶ月）',
            '2. オンライン相談プラットフォーム構築（3ヶ月）',
            '3. 手続きデジタル化とワンストップ化（4ヶ月）'
        ]
    };
    
    const newProject = {
        id: sampleData.projects.length + 1,
        title: mockOutline.title,
        purpose: mockOutline.purpose,
        scope: mockOutline.scope,
        kpi: 'AI生成による効率化 +50%',
        status: 'Plan',
        tags: ['#移住相談', '#デジタル化'],
        relatedPeople: [1, 3],
        createdAt: new Date().toISOString().split('T')[0],
        kptLogs: [
            {
                type: 'Try',
                content: mockOutline.steps.join(', '),
                date: new Date().toISOString().split('T')[0]
            }
        ]
    };
    
    sampleData.projects.push(newProject);
    saveData();
    renderCurrentRoute();
    
    alert('AIがプロジェクトアウトラインを生成しました！新しいプロジェクトが追加されています。');
}

// Ideation Workspace functions (placeholder)
function openIdeationWorkspace(stage) {
    alert(`企画ワークスペース「${stage || 'メイン'}」を開きます（実装予定）`);
}

function closeIdeationWorkspace() {
    document.getElementById('ideation-workspace-modal').classList.add('hidden');
}

// Expose to global scope
window.renderProjects = renderProjects;
window.openProjectDetail = openProjectDetail;
window.closeProjectDetail = closeProjectDetail;
window.promoteTryToPlan = promoteTryToPlan;
window.generateAIOutline = generateAIOutline;
window.openIdeationWorkspace = openIdeationWorkspace;
window.closeIdeationWorkspace = closeIdeationWorkspace;