// ===============================
// LocalSuccess - Projects Core Module
// ===============================

// renderProjects関数はprojects.jsで定義されています
function renderProjectsCore(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Projects</h1>
                    <p class="text-muted-foreground">企画から実行まで、プロジェクトライフサイクル全体をサポート</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="window.location.hash = '#/plan'" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
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
                            <!-- Step 1: アイデア整理 -->
                            <div class="flex flex-col items-center group hover:scale-105 transition-transform duration-200 cursor-pointer" onclick="selectWizardStep('ideation')">
                                <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                                    <span class="wizard-step-number-1">1</span>
                                    <svg class="wizard-check-icon-1 hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </div>
                                <span class="text-sm text-center">アイデア整理</span>
                            </div>                            <!-- Arrow 1 -->
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
                        <h3 class="text-lg font-semibold mb-2 text-blue-800">ステップ1: アイデア整理</h3>
                        <p class="text-blue-600 mb-4">アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。</p>
                        <div class="flex justify-center gap-3">
                            <button class="design-btn px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" data-mode="ideation">
                                設計する
                            </button>
                            <button onclick="proceedToNextStep('ideation')" class="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                                次へ
                            </button>
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
                    <div id="active-projects-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="text-center py-12 text-muted-foreground col-span-full">
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
    
    // Initialize wizard progress and bind design buttons after rendering
    setTimeout(() => {
        initializeWizard();
    }, 100);
}

function loadActiveProjects() {
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // If no projects exist, create sample data
    if (projects.length === 0) {
        projects = createSampleProjects();
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    const activeProjects = projects.filter(p => p.status === 'active');
    
    const listElement = document.getElementById('active-projects-list');
    if (!listElement) return;
    
    // Ensure grid layout classes are applied
    listElement.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    if (activeProjects.length === 0) {
        listElement.innerHTML = `
            <div class="text-center py-12 text-muted-foreground col-span-full">
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
        <div class="border rounded-lg p-6 hover:bg-accent transition-colors cursor-pointer project-card" data-project-id="${project.id}">
            <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-lg">${project.title}</h3>
                <span class="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">${project.status === 'active' ? '進行中' : project.status}</span>
            </div>
            
            <p class="text-sm text-muted-foreground mb-4 leading-relaxed">${project.description}</p>
            
            ${project.progress ? `
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">プロジェクト進捗</span>
                        <span class="text-sm font-bold text-indigo-600">${project.progress}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300" style="width: ${project.progress}%"></div>
                    </div>
                </div>
            ` : ''}
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags.map(tag => `
                    <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md font-medium">${tag}</span>
                `).join('')}
            </div>
            
            ${project.kpis && project.kpis.length > 0 ? `
                <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">主要指標 (KPI)</h4>
                    <div class="grid grid-cols-3 gap-3">
                        ${project.kpis.slice(0, 3).map(kpi => `
                            <div class="text-center">
                                <div class="text-lg font-bold text-indigo-600">${kpi.target}${kpi.unit === 'percent' ? '%' : kpi.unit === 'number' ? '' : kpi.unit}</div>
                                <div class="text-xs text-gray-600">${kpi.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex justify-between items-center text-sm text-muted-foreground pt-3 border-t border-gray-100">
                <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    ${new Date(project.createdAt).toLocaleDateString('ja-JP')}
                </span>
                <button class="text-indigo-600 hover:text-indigo-800 font-medium project-detail-btn" data-project-id="${project.id}">
                    詳細を見る →
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for project cards
    console.log('Adding event listeners to project cards');
    const projectCards = listElement.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const projectId = this.getAttribute('data-project-id');
            console.log('Project card clicked, ID:', projectId);
            viewProject(parseInt(projectId));
        });
    });
    
    // Add event listeners for detail buttons
    const detailButtons = listElement.querySelectorAll('.project-detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectId = this.getAttribute('data-project-id');
            console.log('Detail button clicked, ID:', projectId);
            viewProject(parseInt(projectId));
        });
    });
}

function createSampleProjects() {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    return [
        {
            id: 1001,
            title: "地域活性化イベント企画",
            description: "地域の商店街と連携した活性化イベントの企画・運営",
            status: "active",
            createdAt: oneWeekAgo.toISOString(),
            tags: ["地域活性化", "イベント企画", "商店街", "コミュニティ"],
            framework: {
                type: "5w1h",
                data: {
                    what: "地域商店街活性化イベント",
                    who: "商店街組合、地域住民",
                    when: "来月の土日",
                    where: "中央商店街",
                    why: "地域経済の活性化",
                    how: "ワークショップとマルシェの開催"
                }
            },
            goals: {
                specific: "地域商店街の売上向上と来客数増加",
                measurable: "参加者300名、売上前年比120%",
                achievable: "商店街組合との連携体制構築済み",
                relevant: "地域活性化という目標に直結",
                timebound: "2ヶ月以内に実施"
            },
            kpis: [
                { name: "参加者数", target: "300", unit: "人" },
                { name: "売上向上率", target: "20", unit: "percent" },
                { name: "新規顧客獲得", target: "50", unit: "人" }
            ],
            progress: 65
        },
        {
            id: 1002,
            title: "オンライン学習プラットフォーム",
            description: "地域の高齢者向けデジタルリテラシー向上プログラム",
            status: "active",
            createdAt: twoWeeksAgo.toISOString(),
            tags: ["デジタル教育", "高齢者支援", "オンライン", "ITリテラシー"],
            framework: {
                type: "business_canvas",
                data: {
                    valueProposition: "高齢者が安心して学べるデジタル環境",
                    customerSegments: "60歳以上のシニア層",
                    channels: "公民館、図書館での対面サポート付きオンライン学習"
                }
            },
            goals: {
                specific: "高齢者100名のデジタルスキル向上",
                measurable: "基本操作習得率80%以上",
                achievable: "段階的カリキュラムで実現可能",
                relevant: "デジタル格差解消に貢献",
                timebound: "6ヶ月プログラム"
            },
            kpis: [
                { name: "受講者数", target: "100", unit: "人" },
                { name: "修了率", target: "80", unit: "percent" },
                { name: "満足度", target: "4.5", unit: "点" }
            ],
            progress: 30
        },
        {
            id: 1003,
            title: "環境保護キャンペーン",
            description: "地域のプラスチック削減と環境意識向上のための取り組み",
            status: "active",
            createdAt: currentDate.toISOString(),
            tags: ["環境保護", "プラスチック削減", "啓発活動", "持続可能性"],
            framework: {
                type: "logic_tree",
                data: {
                    mainGoal: "地域の環境意識向上とプラスチック使用量削減",
                    subGoals: [
                        "啓発イベントの開催",
                        "エコバッグ配布キャンペーン",
                        "リサイクル活動の推進"
                    ]
                }
            },
            goals: {
                specific: "地域のプラスチック使用量30%削減",
                measurable: "参加世帯数500世帯、削減量測定",
                achievable: "段階的な取り組みで実現",
                relevant: "SDGs目標に合致",
                timebound: "1年間のキャンペーン"
            },
            kpis: [
                { name: "参加世帯数", target: "500", unit: "世帯" },
                { name: "プラスチック削減率", target: "30", unit: "percent" },
                { name: "啓発イベント参加者", target: "200", unit: "人" }
            ],
            progress: 15
        }
    ];
}

function viewProject(projectId) {
    console.log('viewProject called with ID:', projectId);
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    console.log('Projects from localStorage:', projects);
    const project = projects.find(p => p.id == projectId);
    
    if (!project) {
        console.error('Project not found:', projectId);
        alert('プロジェクトが見つかりません');
        return;
    }
    
    console.log('Found project:', project);
    // Show project details in modal using new modal component
    createProjectDetailModal(project);
}

function editProject(projectId) {
    // Close modal first
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) modal.remove();
    
    // Navigate to edit mode (placeholder)
    alert('編集機能は開発中です');
}

// Export functions to global scope
window.renderProjectsCore = renderProjectsCore;
window.loadActiveProjects = loadActiveProjects;
window.createSampleProjects = createSampleProjects;
window.viewProject = viewProject;
window.showProjectDetailModal = showProjectDetailModal;
window.editProject = editProject;