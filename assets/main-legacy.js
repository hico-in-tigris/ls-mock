// ===============================
// LocalSuccess - Main JavaScript
// SaaS Mock Application
// ===============================

// ============= Global State & Data =============
let appState = {
    currentRoute: 'dashboard',
    masking: false,
    demoStep: 1,
    demoCompleted: false
};

// Sample Data Seeds
const sampleData = {
    people: [
        {
            id: 1,
            name: '田中 健一',
            role: '住民',
            tags: ['#移住相談', '#空き家'],
            lastContact: '2025-10-28',
            email: 'tanaka@example.com',
            phone: '090-1234-5678',
            notes: '都市部からの移住希望。空き家活用に興味を持っている。子育て環境を重視。',
            avatar: 'T'
        },
        {
            id: 2,
            name: '佐藤 美咲',
            role: '協力隊',
            tags: ['#イベント', '#観光'],
            lastContact: '2025-11-01',
            email: 'sato@example.com',
            phone: '090-2345-6789',
            notes: '地域おこし協力隊2年目。イベント企画が得意で、観光振興に取り組んでいる。',
            avatar: 'S'
        },
        {
            id: 3,
            name: '山田 太郎',
            role: '役場',
            tags: ['#移住相談', '#農業'],
            lastContact: '2025-10-25',
            email: 'yamada@kimobetsu.gov',
            phone: '0136-33-2211',
            notes: '町役場まちづくり課。移住相談窓口担当。農業振興にも詳しい。',
            avatar: 'Y'
        },
        {
            id: 4,
            name: '鈴木 花子',
            role: '事業者',
            tags: ['#観光', '#イベント'],
            lastContact: '2025-10-30',
            email: 'suzuki@local-biz.com',
            phone: '090-3456-7890',
            notes: '地元の民宿経営者。観光客誘致と地域イベントに積極的。',
            avatar: 'Su'
        },
        {
            id: 5,
            name: '高橋 大学',
            role: '学生',
            tags: ['#農業', '#イベント'],
            lastContact: '2025-10-20',
            email: 'takahashi@univ.ac.jp',
            phone: '090-4567-8901',
            notes: '農学部学生。地域の農業体験プログラムに参加中。',
            avatar: 'Ta'
        },
        {
            id: 6,
            name: '渡辺 次郎',
            role: '住民',
            tags: ['#空き家', '#農業'],
            lastContact: '2025-10-15',
            email: 'watanabe@example.com',
            phone: '090-5678-9012',
            notes: '地元農家。空き家の活用について相談を受けることが多い。',
            avatar: 'W'
        }
    ],
    
    projects: [
        {
            id: 1,
            title: '移住促進プログラムv2',
            purpose: 'UI/UXを改善し、移住相談から定住までの期間を短縮する',
            scope: 'Webサイト全面リニューアル、相談窓口のデジタル化、フォローアップ体制構築',
            kpi: 'Time-to-first-entry -60%',
            status: 'Try',
            tags: ['#移住相談', '#UI改善'],
            relatedPeople: [1, 3],
            createdAt: '2025-10-01',
            kptLogs: [
                {
                    type: 'Keep',
                    content: '既存の相談窓口の人的サポートは評価が高い',
                    date: '2025-10-15'
                },
                {
                    type: 'Problem',
                    content: '情報が散在していて、移住希望者が迷子になる',
                    date: '2025-10-15'
                },
                {
                    type: 'Try',
                    content: 'ワンストップポータルサイトを構築する',
                    date: '2025-10-20'
                }
            ]
        },
        {
            id: 2,
            title: 'コミュニティイベント活性化',
            purpose: '住民参加型イベントの頻度と満足度を向上させる',
            scope: 'イベント企画の住民参加促進、SNS活用、フィードバック収集システム',
            kpi: 'Try昇格率 +45%',
            status: 'Plan',
            tags: ['#イベント', '#コミュニティ'],
            relatedPeople: [2, 4],
            createdAt: '2025-09-15',
            kptLogs: [
                {
                    type: 'Keep',
                    content: '既存イベントは参加者の満足度が高い',
                    date: '2025-10-10'
                },
                {
                    type: 'Problem',
                    content: 'イベント情報の周知が不十分で参加者が限定的',
                    date: '2025-10-10'
                },
                {
                    type: 'Try',
                    content: 'LINEグループとInstagramを活用した情報発信',
                    date: '2025-10-25'
                }
            ]
        },
        {
            id: 3,
            title: '空き家活用プロジェクト',
            purpose: '空き家を活用して移住者の住居確保と地域活性化を両立',
            scope: '空き家データベース構築、改修支援制度、マッチングシステム',
            kpi: '30日内フォロー率 +35%',
            status: 'Done',
            tags: ['#空き家', '#移住相談'],
            relatedPeople: [1, 6],
            createdAt: '2025-08-01',
            kptLogs: [
                {
                    type: 'Keep',
                    content: '所有者の協力度が予想以上に高い',
                    date: '2025-09-20'
                },
                {
                    type: 'Problem',
                    content: '改修費用の負担が移住者にとって高いハードル',
                    date: '2025-09-20'
                },
                {
                    type: 'Try',
                    content: '改修費用の分割支援制度を検討',
                    date: '2025-10-05'
                }
            ]
        }
    ],
    
    actions: [
        {
            id: 1,
            content: '田中さんに移住相談の件で電話',
            type: '連絡',
            linkedPeople: [1],
            linkedProjects: [1],
            status: 'Done',
            deadline: '2025-10-28',
            weeklyTarget: true,
            createdAt: '2025-10-25'
        },
        {
            id: 2,
            content: 'イベント企画MTG準備',
            type: '準備',
            linkedPeople: [2],
            linkedProjects: [2],
            status: 'Doing',
            deadline: '2025-11-05',
            weeklyTarget: true,
            createdAt: '2025-10-30'
        },
        {
            id: 3,
            content: '空き家データベース更新',
            type: '記録',
            linkedPeople: [6],
            linkedProjects: [3],
            status: 'Todo',
            deadline: '2025-11-08',
            weeklyTarget: false,
            createdAt: '2025-11-01'
        },
        {
            id: 4,
            content: '山田さんと移住支援制度の調整',
            type: '調整',
            linkedPeople: [3],
            linkedProjects: [1],
            status: 'Todo',
            deadline: '2025-11-06',
            weeklyTarget: true,
            createdAt: '2025-11-02'
        },
        {
            id: 5,
            content: '佐藤さんとイベント開催場所の確認',
            type: '連絡',
            linkedPeople: [2],
            linkedProjects: [2],
            status: 'Done',
            deadline: '2025-11-01',
            weeklyTarget: true,
            createdAt: '2025-10-29'
        },
        {
            id: 6,
            content: '鈴木さんに観光プランの提案',
            type: '連絡',
            linkedPeople: [4],
            linkedProjects: [2],
            status: 'Todo',
            deadline: '2025-11-10',
            weeklyTarget: false,
            createdAt: '2025-11-03'
        },
        {
            id: 7,
            content: '高橋さんと農業体験の振り返り',
            type: '記録',
            linkedPeople: [5],
            linkedProjects: [2],
            status: 'Todo',
            deadline: '2025-11-07',
            weeklyTarget: true,
            createdAt: '2025-11-01'
        },
        {
            id: 8,
            content: '渡辺さんの空き家情報を整理',
            type: '記録',
            linkedPeople: [6],
            linkedProjects: [3],
            status: 'Doing',
            deadline: '2025-11-09',
            weeklyTarget: false,
            createdAt: '2025-11-02'
        },
        {
            id: 9,
            content: '移住相談窓口のUI改善案作成',
            type: '準備',
            linkedPeople: [1, 3],
            linkedProjects: [1],
            status: 'Todo',
            deadline: '2025-11-12',
            weeklyTarget: true,
            createdAt: '2025-11-03'
        },
        {
            id: 10,
            content: 'SNS投稿コンテンツの企画',
            type: '準備',
            linkedPeople: [2, 4],
            linkedProjects: [2],
            status: 'Todo',
            deadline: '2025-11-15',
            weeklyTarget: false,
            createdAt: '2025-11-04'
        }
    ],
    
    planVersions: {
        v1: {
            version: '1.0',
            projects: [
                {
                    title: '移住促進プログラム',
                    objective: '移住相談の効率化',
                    approach: '既存窓口の改善',
                    timeline: '6ヶ月',
                    budget: '50万円'
                }
            ],
            kpiSnapshot: {
                'Time-to-first-entry': '平均45日',
                'Try昇格率': '25%',
                '30日内フォロー率': '40%'
            },
            period: '2025年7月-12月'
        },
        v2: {
            version: '2.0',
            projects: [
                {
                    title: '移住促進プログラムv2',
                    objective: 'UI/UXを改善し、移住相談から定住までの期間を短縮',
                    approach: 'デジタル化とワンストップポータル導入',
                    timeline: '4ヶ月',
                    budget: '120万円'
                }
            ],
            kpiSnapshot: {
                'Time-to-first-entry': '平均18日 (-60%)',
                'Try昇格率': '36% (+45%)',
                '30日内フォロー率': '54% (+35%)'
            },
            period: '2025年11月-2026年3月',
            changeReason: 'KPTのTryより: ワンストップポータルサイトを構築する'
        }
    },
    
    summary: {
        current: {
            good: '',
            more: '',
            next: ''
        },
        nextToPlan: []
    }
};

// ============= Utility Functions =============
function daysSince(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getMaskedName(name) {
    if (!appState.masking) return name;
    const names = ['Aさん', 'Bさん', 'Cさん', 'Dさん', 'Eさん', 'Fさん'];
    const index = sampleData.people.findIndex(p => p.name === name);
    return names[index] || '匿名';
}

function getPersonById(id) {
    return sampleData.people.find(p => p.id === id);
}

function getProjectById(id) {
    return sampleData.projects.find(p => p.id === id);
}

function generateSuggestions(person) {
    const suggestions = [];
    const daysSinceContact = daysSince(person.lastContact);
    
    // ルールベースで提案生成
    if (daysSinceContact > 7 && person.tags.includes('#移住相談')) {
        suggestions.push({
            title: '次回の移住相談打診',
            description: '前回から時間が経っているので、進捗確認の連絡をしてみましょう',
            actionType: '連絡',
            priority: 'high'
        });
    }
    
    if (person.tags.includes('#イベント')) {
        suggestions.push({
            title: '新しいイベント企画の相談',
            description: 'イベント関連のタグがあるので、新企画の意見を聞いてみましょう',
            actionType: '調整',
            priority: 'medium'
        });
    }
    
    if (daysSinceContact > 14) {
        suggestions.push({
            title: '定期フォローアップ',
            description: '2週間以上連絡が取れていないので、近況確認をしましょう',
            actionType: '連絡',
            priority: 'high'
        });
    }
    
    return suggestions.slice(0, 3); // 最大3件
}

// ============= Data Persistence =============
function saveData() {
    localStorage.setItem('localsuccess-data', JSON.stringify(sampleData));
    localStorage.setItem('localsuccess-state', JSON.stringify(appState));
}

function loadData() {
    const savedData = localStorage.getItem('localsuccess-data');
    const savedState = localStorage.getItem('localsuccess-state');
    
    if (savedData) {
        Object.assign(sampleData, JSON.parse(savedData));
    }
    
    if (savedState) {
        Object.assign(appState, JSON.parse(savedState));
    }
}

function resetData() {
    localStorage.removeItem('localsuccess-data');
    localStorage.removeItem('localsuccess-state');
    location.reload();
}

// ============= Router =============
function initRouter() {
    function handleRoute() {
        const hash = window.location.hash.slice(1) || '/dashboard';
        const route = hash.replace('/', '');
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active', 'bg-accent', 'text-accent-foreground');
            if (link.dataset.route === route) {
                link.classList.add('active', 'bg-accent', 'text-accent-foreground');
            }
        });
        
        // Update mobile page indicator
        const currentPageMobile = document.getElementById('current-page-mobile');
        if (currentPageMobile) {
            const pageNames = {
                'dashboard': 'Dashboard',
                'projects': 'Projects',
                'people': 'People',
                'actions': 'Actions',
                'follow': 'Follow',
                'diff': 'Diff',
                'summary': 'Summary',
                'settings': 'Settings'
            };
            currentPageMobile.textContent = pageNames[route] || 'Dashboard';
        }
        
        appState.currentRoute = route;
        renderCurrentRoute();
    }
    
    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Initial load
}

function renderCurrentRoute() {
    const mainContent = document.getElementById('main-content');
    
    switch (appState.currentRoute) {
        case 'dashboard':
            renderDashboard(mainContent);
            break;
        case 'projects':
            renderProjects(mainContent);
            break;
        case 'people':
            renderPeople(mainContent);
            break;
        case 'actions':
            renderActions(mainContent);
            break;
        case 'follow':
            renderFollow(mainContent);
            break;
        case 'diff':
            renderDiff(mainContent);
            break;
        case 'summary':
            renderSummary(mainContent);
            break;
        case 'settings':
            renderSettings(mainContent);
            break;
        case 'profile':
            renderProfile(mainContent);
            break;
        case 'region':
            renderRegion(mainContent);
            break;
        case 'issues':
            renderIssues(mainContent);
            break;
        default:
            renderDashboard(mainContent);
    }
}

// ============= Dashboard =============
function renderDashboard(container) {
    const overdueTasks = sampleData.actions.filter(a => 
        a.status !== 'Done' && new Date(a.deadline) < new Date()
    );
    
    const todayTasks = sampleData.actions.filter(a => {
        const today = new Date().toISOString().split('T')[0];
        return a.deadline === today;
    });
    
    const nextPlans = sampleData.projects.filter(p => p.status === 'Plan').slice(0, 3);
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p class="text-muted-foreground">地域活動の全体像と直近のタスクを確認</p>
            </div>
            
            <!-- KPI Cards -->
            <div class="grid gap-4 md:grid-cols-3 mb-8">
                <div class="card kpi-card kpi-positive">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-white/80">Time-to-first-entry</p>
                                <div class="text-2xl font-bold text-white">-60%</div>
                                <p class="text-xs text-white/60">45日 → 18日</p>
                            </div>
                            <svg class="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="card kpi-card kpi-positive">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-white/80">Try昇格率</p>
                                <div class="text-2xl font-bold text-white">+45%</div>
                                <p class="text-xs text-white/60">25% → 36%</p>
                            </div>
                            <svg class="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 14l9-9"/>
                                <path d="M16 5h-9v9"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="card kpi-card kpi-positive">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-white/80">30日内フォロー率</p>
                                <div class="text-2xl font-bold text-white">+35%</div>
                                <p class="text-xs text-white/60">40% → 54%</p>
                            </div>
                            <svg class="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid gap-6 md:grid-cols-2">
                <!-- Next Plans -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">Next Plan</h3>
                        <p class="text-sm text-muted-foreground">直近のプロジェクト予定</p>
                    </div>
                    <div class="card-content space-y-4">
                        ${nextPlans.map(project => `
                            <div class="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                                <span class="badge status-plan text-xs">${project.status}</span>
                                <div class="flex-1 min-w-0">
                                    <p class="font-medium text-sm">${project.title}</p>
                                    <p class="text-xs text-muted-foreground">${project.purpose}</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        ${project.relatedPeople.map(id => {
                                            const person = getPersonById(id);
                                            return `<div class="avatar avatar-sm">${person.avatar}</div>`;
                                        }).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Today's Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">今日のアクション</h3>
                        <p class="text-sm text-muted-foreground">本日期限のタスク</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${todayTasks.length > 0 ? todayTasks.map(action => `
                            <div class="flex items-center space-x-3 p-3 rounded-lg border">
                                <span class="badge action-${action.type} text-xs">${action.type}</span>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">${action.content}</p>
                                    <p class="text-xs text-muted-foreground">期限: ${formatDate(action.deadline)}</p>
                                </div>
                                <span class="badge status-${action.status.toLowerCase()} text-xs">${action.status}</span>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">今日期限のタスクはありません</p>'}
                    </div>
                </div>
                
                <!-- Overdue Follow-ups -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">期限切れフォロー</h3>
                        <p class="text-sm text-muted-foreground">遅れているタスク</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${overdueTasks.length > 0 ? overdueTasks.slice(0, 3).map(action => `
                            <div class="flex items-center space-x-3 p-3 rounded-lg border border-destructive/50 bg-destructive/5">
                                <span class="badge badge-destructive text-xs">${action.type}</span>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">${action.content}</p>
                                    <p class="text-xs text-destructive">期限: ${formatDate(action.deadline)}</p>
                                </div>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">期限切れのタスクはありません</p>'}
                    </div>
                </div>
                
                <!-- Activity Chart Placeholder -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">活動トレンド</h3>
                        <p class="text-sm text-muted-foreground">過去30日間の活動状況</p>
                    </div>
                    <div class="card-content">
                        <div class="chart-placeholder">
                            <div class="text-center">
                                <svg class="h-12 w-12 mx-auto text-muted-foreground mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 3v18h18"/>
                                    <path d="M18.7 8l-5-5-4 4-4-4"/>
                                </svg>
                                <p class="text-sm text-muted-foreground">アクティビティチャート</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============= Projects =============
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

// ============= People =============
function renderPeople(container) {
    // Sort by last contact (most recent first)
    const sortedPeople = [...sampleData.people].sort((a, b) => 
        new Date(b.lastContact) - new Date(a.lastContact)
    );
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">People</h1>
                <p class="text-muted-foreground">関係者の管理と提案アクション</p>
            </div>
            
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                ${sortedPeople.map(person => {
                    const daysSinceContact = daysSince(person.lastContact);
                    const suggestions = generateSuggestions(person);
                    
                    return `
                        <div class="card">
                            <div class="card-content">
                                <div class="flex items-start space-x-3">
                                    <div class="avatar avatar-lg">${person.avatar}</div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2">
                                            <h3 class="font-semibold">${getMaskedName(person.name)}</h3>
                                            <span class="badge badge-outline text-xs">${person.role}</span>
                                        </div>
                                        <div class="flex items-center space-x-2 mt-1">
                                            <span class="days-since ${daysSinceContact <= 7 ? 'days-since-recent' : daysSinceContact <= 14 ? 'days-since-warning' : 'days-since-danger'}">${daysSinceContact}日前</span>
                                            <span class="text-xs text-muted-foreground">最終接触</span>
                                        </div>
                                        <div class="flex flex-wrap gap-1 mt-2">
                                            ${person.tags.map(tag => `<span class="tag tag-${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-4">
                                    <p class="text-sm text-muted-foreground">${appState.masking ? '詳細情報は非表示' : person.notes}</p>
                                </div>
                                
                                <!-- Suggestions -->
                                <div class="mt-4 space-y-2">
                                    <h4 class="text-sm font-medium">提案アクション</h4>
                                    ${suggestions.map((suggestion, index) => `
                                        <div class="suggestion-card p-3 rounded-lg cursor-pointer" onclick="createActionFromSuggestion(${person.id}, ${index})">
                                            <div class="flex items-start space-x-2">
                                                <span class="badge action-${suggestion.actionType} text-xs">${suggestion.actionType}</span>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium">${suggestion.title}</p>
                                                    <p class="text-xs text-muted-foreground">${suggestion.description}</p>
                                                </div>
                                                <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                                </svg>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                
                                <div class="mt-4 pt-4 border-t border-border">
                                    <button onclick="openPersonDetail(${person.id})" class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2">
                                        詳細を表示
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        
        <!-- Person Detail Modal -->
        <div id="person-detail-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closePersonDetail()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="person-detail-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    `;
}

function createActionFromSuggestion(personId, suggestionIndex) {
    const person = getPersonById(personId);
    const suggestions = generateSuggestions(person);
    const suggestion = suggestions[suggestionIndex];
    
    if (!suggestion) return;
    
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}に${suggestion.title}`,
        type: suggestion.actionType,
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        weeklyTarget: suggestion.priority === 'high',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    
    // Update demo step if this is the first demo action
    if (appState.demoStep === 1 && person.name === '田中 健一') {
        updateDemoStep(2);
    }
    
    saveData();
    alert(`アクション「${newAction.content}」が追加されました。`);
    renderCurrentRoute(); // Refresh to update suggestions
}

function openPersonDetail(personId) {
    const person = getPersonById(personId);
    const relatedActions = sampleData.actions.filter(a => a.linkedPeople.includes(personId));
    const relatedProjects = sampleData.projects.filter(p => p.relatedPeople.includes(personId));
    
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-3">
                <div class="avatar avatar-lg">${person.avatar}</div>
                <div>
                    <h2 class="text-2xl font-bold">${getMaskedName(person.name)}</h2>
                    <p class="text-muted-foreground">${person.role}</p>
                </div>
            </div>
            <button onclick="closePersonDetail()" class="text-muted-foreground hover:text-foreground">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-4">
                <!-- Contact Info -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">連絡先</h3>
                    </div>
                    <div class="card-content space-y-2">
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span class="text-sm">${appState.masking ? '***@***.com' : person.email}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span class="text-sm">${appState.masking ? '090-****-****' : person.phone}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span class="text-sm">最終接触: ${formatDate(person.lastContact)}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Tags -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">タグ</h3>
                    </div>
                    <div class="card-content">
                        <div class="flex flex-wrap gap-2">
                            ${person.tags.map(tag => `<span class="tag tag-${tag.slice(1)}">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Notes -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">メモ</h3>
                    </div>
                    <div class="card-content">
                        <p class="text-sm">${appState.masking ? '詳細情報は非表示設定により隠されています' : person.notes}</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <!-- Related Actions -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">関連アクション</h3>
                    </div>
                    <div class="card-content space-y-2">
                        ${relatedActions.length > 0 ? relatedActions.slice(0, 5).map(action => `
                            <div class="flex items-center space-x-2 p-2 rounded bg-muted/50">
                                <span class="badge action-${action.type} text-xs">${action.type}</span>
                                <div class="flex-1">
                                    <p class="text-sm">${action.content}</p>
                                    <p class="text-xs text-muted-foreground">${formatDate(action.deadline)}</p>
                                </div>
                                <span class="badge status-${action.status.toLowerCase()} text-xs">${action.status}</span>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">関連アクションはありません</p>'}
                    </div>
                </div>
                
                <!-- Related Projects -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">関連プロジェクト</h3>
                    </div>
                    <div class="card-content space-y-2">
                        ${relatedProjects.length > 0 ? relatedProjects.map(project => `
                            <div class="flex items-center space-x-2 p-2 rounded bg-muted/50">
                                <span class="badge status-${project.status.toLowerCase()} text-xs">${project.status}</span>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">${project.title}</p>
                                    <p class="text-xs text-muted-foreground">${project.purpose}</p>
                                </div>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">関連プロジェクトはありません</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closePersonDetail() {
    document.getElementById('person-detail-modal').classList.add('hidden');
}

// ============= Actions =============
function renderActions(container) {
    const groupedActions = {
        Todo: sampleData.actions.filter(a => a.status === 'Todo'),
        Doing: sampleData.actions.filter(a => a.status === 'Doing'),
        Done: sampleData.actions.filter(a => a.status === 'Done')
    };
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Actions</h1>
                    <p class="text-muted-foreground">アクションの管理とステータス追跡</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="toggleActionView()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        カード表示
                    </button>
                </div>
            </div>
            
            <!-- Kanban Board -->
            <div class="grid gap-6 md:grid-cols-3">
                ${Object.entries(groupedActions).map(([status, actions]) => `
                    <div class="card">
                        <div class="card-header">
                            <div class="flex items-center justify-between">
                                <h3 class="font-semibold">${status}</h3>
                                <span class="badge badge-secondary">${actions.length}</span>
                            </div>
                        </div>
                        <div class="card-content space-y-3">
                            ${actions.map(action => `
                                <div class="card border-l-4 ${action.weeklyTarget ? 'border-l-primary' : 'border-l-muted'} p-3">
                                    <div class="space-y-2">
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1">
                                                <p class="text-sm font-medium">${action.content}</p>
                                                <div class="flex items-center space-x-2 mt-1">
                                                    <span class="badge action-${action.type} text-xs">${action.type}</span>
                                                    ${action.weeklyTarget ? '<span class="badge badge-secondary text-xs">週次対象</span>' : ''}
                                                </div>
                                            </div>
                                            <div class="flex items-center space-x-1">
                                                ${action.linkedPeople.map(id => {
                                                    const person = getPersonById(id);
                                                    return `<div class="avatar avatar-sm" title="${getMaskedName(person.name)}">${person.avatar}</div>`;
                                                }).join('')}
                                            </div>
                                        </div>
                                        
                                        <div class="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>期限: ${formatDate(action.deadline)}</span>
                                            <div class="flex space-x-1">
                                                <button onclick="updateActionStatus(${action.id}, 'Todo')" class="px-2 py-1 rounded text-xs ${action.status === 'Todo' ? 'bg-gray-200' : 'hover:bg-gray-100'}">Todo</button>
                                                <button onclick="updateActionStatus(${action.id}, 'Doing')" class="px-2 py-1 rounded text-xs ${action.status === 'Doing' ? 'bg-yellow-200' : 'hover:bg-yellow-100'}">Doing</button>
                                                <button onclick="updateActionStatus(${action.id}, 'Done')" class="px-2 py-1 rounded text-xs ${action.status === 'Done' ? 'bg-green-200' : 'hover:bg-green-100'}">Done</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            
                            ${actions.length === 0 ? '<p class="text-sm text-muted-foreground text-center py-4">アクションはありません</p>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function updateActionStatus(actionId, newStatus) {
    const action = sampleData.actions.find(a => a.id === actionId);
    if (action) {
        action.status = newStatus;
        
        // Update demo step
        if (appState.demoStep === 2 && newStatus === 'Done') {
            updateDemoStep(3);
        }
        
        saveData();
        renderCurrentRoute();
    }
}

function toggleActionView() {
    // This would toggle between card and table view
    alert('表示切替機能は今回のモックでは省略されています');
}

// ============= Follow =============
function renderFollow(container) {
    const sortedPeople = [...sampleData.people].sort((a, b) => 
        daysSince(b.lastContact) - daysSince(a.lastContact)
    );
    
    const followStats = {
        totalPeople: sampleData.people.length,
        recentContact: sampleData.people.filter(p => daysSince(p.lastContact) <= 30).length,
        needsFollow: sampleData.people.filter(p => daysSince(p.lastContact) > 30).length
    };
    
    const followRate = Math.round((followStats.recentContact / followStats.totalPeople) * 100);
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Follow</h1>
                <p class="text-muted-foreground">フォローアップ管理と効率化</p>
            </div>
            
            <!-- Follow KPIs -->
            <div class="grid gap-4 md:grid-cols-3 mb-8">
                <div class="card kpi-card kpi-positive">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-white/80">30日内フォロー率</p>
                                <div class="text-2xl font-bold text-white">${followRate}%</div>
                                <p class="text-xs text-white/60">50% → ${followRate}% (+${followRate - 50}%)</p>
                            </div>
                            <svg class="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="card kpi-card kpi-positive">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-white/80">準備時間</p>
                                <div class="text-2xl font-bold text-white">10分</div>
                                <p class="text-xs text-white/60">40分 → 10分 (-75%)</p>
                            </div>
                            <svg class="h-8 w-8 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-muted-foreground">要フォロー</p>
                                <div class="text-2xl font-bold">${followStats.needsFollow}名</div>
                                <p class="text-xs text-muted-foreground">30日以上未接触</p>
                            </div>
                            <svg class="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- People List -->
            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold">フォロー対象者</h3>
                        <button onclick="createBulkReminders()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 py-2">
                            一括リマインド作成
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="space-y-3">
                        ${sortedPeople.map(person => {
                            const daysSinceContact = daysSince(person.lastContact);
                            const urgency = daysSinceContact > 30 ? 'high' : daysSinceContact > 14 ? 'medium' : 'low';
                            
                            return `
                                <div class="flex items-center space-x-4 p-3 rounded-lg border ${urgency === 'high' ? 'border-destructive/50 bg-destructive/5' : urgency === 'medium' ? 'border-warning/50 bg-warning/5' : 'border-border'}">
                                    <div class="avatar">${person.avatar}</div>
                                    <div class="flex-1">
                                        <div class="flex items-center space-x-2">
                                            <h4 class="font-medium">${getMaskedName(person.name)}</h4>
                                            <span class="badge badge-outline text-xs">${person.role}</span>
                                            <span class="days-since ${urgency === 'high' ? 'days-since-danger' : urgency === 'medium' ? 'days-since-warning' : 'days-since-recent'}">${daysSinceContact}日前</span>
                                        </div>
                                        <div class="flex flex-wrap gap-1 mt-1">
                                            ${person.tags.map(tag => `<span class="tag tag-${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button onclick="copyLastConversation(${person.id})" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2">
                                            <svg class="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                            </svg>
                                            前回話題
                                        </button>
                                        <button onclick="createFollowAction(${person.id})" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3 py-2">
                                            <svg class="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="12" y1="5" x2="12" y2="19"/>
                                                <line x1="5" y1="12" x2="19" y2="12"/>
                                            </svg>
                                            アクション作成
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function copyLastConversation(personId) {
    const person = getPersonById(personId);
    const template = `${getMaskedName(person.name)}さんとの前回の話題:
- ${person.tags.join('、')}についての相談
- 進捗確認と次のステップの相談
- 地域での課題や要望のヒアリング

※この内容がクリップボードにコピーされました（モック）`;
    
    alert(template);
}

function createFollowAction(personId) {
    const person = getPersonById(personId);
    const daysSinceContact = daysSince(person.lastContact);
    
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}さんにフォローアップ連絡（${daysSinceContact}日ぶり）`,
        type: '連絡',
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
        weeklyTarget: true,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    alert(`フォローアップアクションが追加されました: ${newAction.content}`);
}

function createBulkReminders() {
    const needsFollow = sampleData.people.filter(p => daysSince(p.lastContact) > 14);
    let count = 0;
    
    needsFollow.forEach(person => {
        const newAction = {
            id: sampleData.actions.length + 1 + count,
            content: `${getMaskedName(person.name)}さんに定期フォロー連絡`,
            type: '連絡',
            linkedPeople: [person.id],
            linkedProjects: [],
            status: 'Todo',
            deadline: new Date(Date.now() + (count + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            weeklyTarget: true,
            createdAt: new Date().toISOString().split('T')[0]
        };
        sampleData.actions.push(newAction);
        count++;
    });
    
    saveData();
    alert(`${count}件のフォローアップアクションを一括作成しました`);
}

// ============= Diff =============
function renderDiff(container) {
    const v1 = sampleData.planVersions.v1;
    const v2 = sampleData.planVersions.v2;
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Diff</h1>
                <p class="text-muted-foreground">プランバージョンの変化を可視化</p>
            </div>
            
            <!-- Version Comparison Header -->
            <div class="grid gap-4 md:grid-cols-2 mb-6">
                <div class="card">
                    <div class="card-content">
                        <div class="flex items-center space-x-2">
                            <span class="badge badge-outline">v1.0</span>
                            <h3 class="font-semibold">初期プラン</h3>
                        </div>
                        <p class="text-sm text-muted-foreground mt-1">${v1.period}</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="flex items-center space-x-2">
                            <span class="badge badge-secondary">v2.0</span>
                            <h3 class="font-semibold">改善プラン</h3>
                        </div>
                        <p class="text-sm text-muted-foreground mt-1">${v2.period}</p>
                        ${v2.changeReason ? `<p class="text-xs text-muted-foreground mt-2">変更理由: ${v2.changeReason}</p>` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Diff View -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">プラン差分</h3>
                </div>
                <div class="card-content">
                    <div class="diff-container">
                        <div class="grid gap-6 md:grid-cols-2">
                            <!-- v1.0 -->
                            <div>
                                <h4 class="font-medium mb-3 text-destructive">v1.0 (削除/変更)</h4>
                                <div class="space-y-2">
                                    <div class="diff-line diff-line-removed">- タイトル: ${v1.projects[0].title}</div>
                                    <div class="diff-line diff-line-removed">- 目的: ${v1.projects[0].objective}</div>
                                    <div class="diff-line diff-line-removed">- アプローチ: ${v1.projects[0].approach}</div>
                                    <div class="diff-line diff-line-removed">- 期間: ${v1.projects[0].timeline}</div>
                                    <div class="diff-line diff-line-removed">- 予算: ${v1.projects[0].budget}</div>
                                </div>
                            </div>
                            
                            <!-- v2.0 -->
                            <div>
                                <h4 class="font-medium mb-3 text-green-600">v2.0 (追加/変更)</h4>
                                <div class="space-y-2">
                                    <div class="diff-line diff-line-added">+ タイトル: ${v2.projects[0].title}</div>
                                    <div class="diff-line diff-line-added">+ 目的: ${v2.projects[0].objective}</div>
                                    <div class="diff-line diff-line-added">+ アプローチ: ${v2.projects[0].approach}</div>
                                    <div class="diff-line diff-line-added">+ 期間: ${v2.projects[0].timeline}</div>
                                    <div class="diff-line diff-line-added">+ 予算: ${v2.projects[0].budget}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- KPI Snapshots -->
            <div class="grid gap-6 md:grid-cols-2 mt-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">v1.0 KPIスナップショット</h3>
                        <p class="text-sm text-muted-foreground">${v1.period}</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${Object.entries(v1.kpiSnapshot).map(([key, value]) => `
                            <div class="flex justify-between">
                                <span class="text-sm font-medium">${key}</span>
                                <span class="text-sm text-muted-foreground">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">v2.0 KPIスナップショット</h3>
                        <p class="text-sm text-muted-foreground">${v2.period}</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${Object.entries(v2.kpiSnapshot).map(([key, value]) => `
                            <div class="flex justify-between">
                                <span class="text-sm font-medium">${key}</span>
                                <span class="text-sm font-weight-bold text-green-600">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Change History -->
            <div class="card mt-6">
                <div class="card-header">
                    <h3 class="font-semibold">変更履歴</h3>
                </div>
                <div class="card-content">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="flex items-start space-x-3">
                                <span class="badge badge-secondary text-xs">v2.0</span>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">Try → Plan昇格による自動更新</p>
                                    <p class="text-xs text-muted-foreground">KPTログからの改善提案を反映</p>
                                    <p class="text-xs text-muted-foreground mt-1">${new Date().toLocaleDateString('ja-JP')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="flex items-start space-x-3">
                                <span class="badge badge-outline text-xs">v1.0</span>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">初期プラン作成</p>
                                    <p class="text-xs text-muted-foreground">移住促進の基本計画として策定</p>
                                    <p class="text-xs text-muted-foreground mt-1">2025年7月1日</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============= Summary =============
function renderSummary(container) {
    const doneActions = sampleData.actions.filter(a => a.status === 'Done' && a.weeklyTarget);
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Summary</h1>
                <p class="text-muted-foreground">週次サマリとNext昇格</p>
            </div>
            
            <!-- GMN Input -->
            <div class="grid gap-6 md:grid-cols-3 mb-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold text-green-600">Good</h3>
                        <p class="text-sm text-muted-foreground">今週うまくいったこと</p>
                    </div>
                    <div class="card-content">
                        <textarea 
                            id="summary-good"
                            class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="例: 移住相談の対応時間が短縮された"
                        >${sampleData.summary.current.good}</textarea>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold text-blue-600">More</h3>
                        <p class="text-sm text-muted-foreground">もっとやりたいこと</p>
                    </div>
                    <div class="card-content">
                        <textarea 
                            id="summary-more"
                            class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="例: イベント企画により多くの住民を巻き込みたい"
                        >${sampleData.summary.current.more}</textarea>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold text-purple-600">Next</h3>
                        <p class="text-sm text-muted-foreground">来週やること</p>
                    </div>
                    <div class="card-content">
                        <textarea 
                            id="summary-next"
                            class="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="例: デジタル化の具体的な実装計画を立てる"
                        >${sampleData.summary.current.next}</textarea>
                    </div>
                </div>
            </div>
            
            <!-- Completed Actions for Next Promotion -->
            <div class="card mb-6">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="font-semibold">完了アクション → Next昇格</h3>
                            <p class="text-sm text-muted-foreground">週次対象の完了アクションをNextに昇格</p>
                        </div>
                        <button onclick="promoteSelectedToNext()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                            選択をNext昇格
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="space-y-3">
                        ${doneActions.map(action => `
                            <label class="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50">
                                <input type="checkbox" class="rounded border-border promotion-checkbox" data-action-id="${action.id}">
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2">
                                        <span class="badge action-${action.type} text-xs">${action.type}</span>
                                        <span class="badge status-done text-xs">Done</span>
                                    </div>
                                    <p class="text-sm font-medium mt-1">${action.content}</p>
                                    <p class="text-xs text-muted-foreground">完了日: ${formatDate(action.deadline)}</p>
                                </div>
                                <div class="flex items-center space-x-1">
                                    ${action.linkedPeople.map(id => {
                                        const person = getPersonById(id);
                                        return `<div class="avatar avatar-sm" title="${getMaskedName(person.name)}">${person.avatar}</div>`;
                                    }).join('')}
                                </div>
                            </label>
                        `).join('')}
                        
                        ${doneActions.length === 0 ? '<p class="text-sm text-muted-foreground text-center py-4">週次対象の完了アクションはありません</p>' : ''}
                    </div>
                </div>
            </div>
            
            <!-- Save and Print Actions -->
            <div class="flex justify-between items-center">
                <button onclick="saveSummary()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17,21 17,13 7,13 7,21"/>
                        <polyline points="7,3 7,8 15,8"/>
                    </svg>
                    サマリを保存
                </button>
                <button onclick="printSummary()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 6,2 18,2 18,9"/>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                        <rect x="6" y="14" width="12" height="8"/>
                    </svg>
                    印刷用表示
                </button>
            </div>
        </div>
    `;
}

function promoteSelectedToNext() {
    const checkboxes = document.querySelectorAll('.promotion-checkbox:checked');
    const selectedActions = Array.from(checkboxes).map(cb => 
        sampleData.actions.find(a => a.id === parseInt(cb.dataset.actionId))
    );
    
    if (selectedActions.length === 0) {
        alert('昇格するアクションを選択してください');
        return;
    }
    
    // Add to summary next items
    selectedActions.forEach(action => {
        sampleData.summary.nextToPlan.push({
            content: action.content,
            fromAction: true,
            actionId: action.id,
            promotedAt: new Date().toISOString()
        });
    });
    
    // Update demo step
    if (appState.demoStep === 3) {
        updateDemoStep(4);
    }
    
    saveData();
    alert(`${selectedActions.length}件のアクションがNextに昇格しました。Projectsページで確認できます。`);
    renderCurrentRoute();
}

function saveSummary() {
    sampleData.summary.current = {
        good: document.getElementById('summary-good').value,
        more: document.getElementById('summary-more').value,
        next: document.getElementById('summary-next').value
    };
    
    saveData();
    alert('サマリが保存されました');
}

function printSummary() {
    window.print();
}

// ============= Settings =============
function renderSettings(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
                <p class="text-muted-foreground">システム設定とユーザー設定</p>
            </div>
            
            <div class="space-y-6">
                <!-- User Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">ユーザー設定</h3>
                        <p class="text-sm text-muted-foreground">プロフィールと地域設定の管理</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="grid gap-4">
                            <button onclick="navigateToProfile()" 
                                    class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-3">
                                    <svg class="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <div class="text-left">
                                        <h4 class="font-medium">プロフィール設定</h4>
                                        <p class="text-sm text-gray-600">スキル、経験、志向の設定</p>
                                    </div>
                                </div>
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </button>
                            
                            <button onclick="navigateToRegion()" 
                                    class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-3">
                                    <svg class="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <div class="text-left">
                                        <h4 class="font-medium">地域設定</h4>
                                        <p class="text-sm text-gray-600">所属地域と地域情報の管理</p>
                                    </div>
                                </div>
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </button>
                            
                            <div class="ml-6 pl-4 border-l-2 border-gray-200">
                                <button onclick="navigateToIssues()" 
                                        class="flex items-center justify-between w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div class="flex items-center space-x-3">
                                        <svg class="h-5 w-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 9v4l2 2"/>
                                            <path d="M21 12c0 1.3-.9 2.4-2 2.7V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3.3c-1.1-.3-2-1.4-2-2.7V7a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1v5z"/>
                                        </svg>
                                        <div class="text-left">
                                            <h4 class="font-medium">地域課題管理</h4>
                                            <p class="text-sm text-gray-600">課題の推論と管理</p>
                                        </div>
                                    </div>
                                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="9,18 15,12 9,6"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Privacy Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">プライバシー設定</h3>
                        <p class="text-sm text-muted-foreground">投資家向けデモ時の個人情報保護</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-medium">匿名化表示</h4>
                                <p class="text-sm text-muted-foreground">人物名を「Aさん」「Bさん」で表示</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" ${appState.masking ? 'checked' : ''} class="sr-only peer" onchange="toggleMasking()">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div class="p-3 rounded-lg bg-muted/50">
                            <p class="text-sm">
                                <strong>現在の表示:</strong> ${appState.masking ? '匿名化モード（個人情報は非表示）' : '通常表示（個人情報表示）'}
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Data Management -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">データ管理</h3>
                        <p class="text-sm text-muted-foreground">データの初期化とバックアップ</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <button onclick="exportData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                データエクスポート
                            </button>
                            
                            <label class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17,8 12,3 7,8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                                データインポート
                                <input type="file" accept=".json" onchange="importData(event)" class="hidden">
                            </label>
                        </div>
                        
                        <div class="border-t border-border pt-4">
                            <button onclick="confirmResetData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 h-9 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="1,4 1,10 7,10"/>
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                                </svg>
                                データを初期化
                            </button>
                            <p class="text-xs text-muted-foreground mt-2">
                                ⚠️ この操作により、すべてのカスタムデータが削除され、初期状態に戻ります
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- System Info -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">システム情報</h3>
                    </div>
                    <div class="card-content space-y-3">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">バージョン</h4>
                                <p class="text-sm">LocalSuccess v1.0.0</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">最終更新</h4>
                                <p class="text-sm">${new Date().toLocaleDateString('ja-JP')}</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">データ件数</h4>
                                <p class="text-sm">People: ${sampleData.people.length}件, Projects: ${sampleData.projects.length}件, Actions: ${sampleData.actions.length}件</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">ストレージ使用量</h4>
                                <p class="text-sm">${Math.round(JSON.stringify(sampleData).length / 1024)}KB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleMasking() {
    appState.masking = !appState.masking;
    saveData();
    renderCurrentRoute(); // Re-render current page with new masking setting
}

function exportData() {
    const dataToExport = {
        data: sampleData,
        state: appState,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localsuccess-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            
            if (imported.data && imported.state) {
                Object.assign(sampleData, imported.data);
                Object.assign(appState, imported.state);
                saveData();
                alert('データをインポートしました');
                renderCurrentRoute();
            } else {
                alert('無効なデータファイルです');
            }
        } catch (error) {
            alert('ファイルの読み込みに失敗しました: ' + error.message);
        }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
}

function confirmResetData() {
    if (confirm('本当にすべてのデータを初期化しますか？この操作は取り消せません。')) {
        resetData();
    }
}

// ============= Mobile Navigation =============
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

// Close mobile menu when clicking on nav links
function closeMobileMenuOnNavClick() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ============= Common Functions =============
function updateDemoStep(step) {
    appState.demoStep = step;
    saveData();
    
    const steps = document.querySelectorAll('#demo-steps p');
    steps.forEach((stepEl, index) => {
        stepEl.classList.remove('current-step');
        stepEl.classList.toggle('opacity-50', index + 1 !== step);
        
        if (index + 1 === step) {
            stepEl.classList.add('current-step');
        }
    });
    
    if (step > 5) {
        appState.demoCompleted = true;
        document.getElementById('demo-guide').innerHTML = `
            <div class="flex items-start space-x-2">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                </div>
                <div class="min-w-0 flex-1">
                    <h4 class="text-sm font-medium text-green-700">デモ完了！</h4>
                    <p class="mt-1 text-xs text-green-600">すべてのフローを体験しました</p>
                </div>
                <button onclick="toggleDemoGuide()" class="flex-shrink-0 text-muted-foreground hover:text-foreground">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
    }
}

function toggleDemoGuide() {
    const guide = document.getElementById('demo-guide');
    guide.style.display = guide.style.display === 'none' ? 'block' : 'none';
}

// ============= Quick Add Modal =============
function openQuickAddModal() {
    document.getElementById('quick-add-modal').classList.remove('hidden');
    document.getElementById('quick-add-input').focus();
}

function closeQuickAddModal() {
    document.getElementById('quick-add-modal').classList.add('hidden');
    document.getElementById('quick-add-input').value = '';
}

function submitQuickAdd() {
    const input = document.getElementById('quick-add-input').value.trim();
    if (!input) return;
    
    // Parse input for tags (#), people (@), and deadlines (!)
    const tagRegex = /#([^\s]+)/g;
    const personRegex = /@([^\s]+)/g;
    const deadlineRegex = /!([^\s]+)/g;
    
    const tags = [...input.matchAll(tagRegex)].map(match => '#' + match[1]);
    const mentionedPeople = [...input.matchAll(personRegex)].map(match => match[1]);
    const deadlines = [...input.matchAll(deadlineRegex)].map(match => match[1]);
    
    // Find linked people by name matching
    const linkedPeople = [];
    mentionedPeople.forEach(name => {
        const person = sampleData.people.find(p => 
            p.name.includes(name) || getMaskedName(p.name).includes(name)
        );
        if (person) linkedPeople.push(person.id);
    });
    
    // Parse deadline
    let deadline = new Date();
    if (deadlines.length > 0) {
        const deadlineStr = deadlines[0];
        if (deadlineStr === '今週末') {
            const today = new Date();
            const daysUntilSunday = 7 - today.getDay();
            deadline = new Date(today.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
        } else if (deadlineStr === '明日') {
            deadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
        } else if (deadlineStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            deadline = new Date(deadlineStr);
        } else {
            deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default: 1 week
        }
    } else {
        deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default: 1 week
    }
    
    // Determine action type
    let actionType = '連絡';
    if (input.includes('準備') || input.includes('企画') || input.includes('計画')) {
        actionType = '準備';
    } else if (input.includes('調整') || input.includes('相談') || input.includes('MTG')) {
        actionType = '調整';
    } else if (input.includes('記録') || input.includes('更新') || input.includes('整理')) {
        actionType = '記録';
    }
    
    const newAction = {
        id: sampleData.actions.length + 1,
        content: input.replace(/#[^\s]+/g, '').replace(/@[^\s]+/g, '').replace(/![^\s]+/g, '').trim(),
        type: actionType,
        linkedPeople: linkedPeople,
        linkedProjects: [],
        status: 'Todo',
        deadline: deadline.toISOString().split('T')[0],
        weeklyTarget: tags.length > 0 || linkedPeople.length > 0,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    
    closeQuickAddModal();
    alert(`アクション「${newAction.content}」が追加されました`);
    
    if (appState.currentRoute === 'actions') {
        renderCurrentRoute();
    }
}

// ============= Event Listeners =============
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data
    loadData();
    
    // Initialize router
    initRouter();
    
    // Initialize mobile menu
    closeMobileMenuOnNavClick();
    
    // Quick Add button events
    document.querySelectorAll('.quick-add-btn, .quick-add-fab').forEach(btn => {
        btn.addEventListener('click', openQuickAddModal);
    });
    
    // Quick Add modal keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickAddModal();
            // Also close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            submitQuickAdd();
        }
    });
    
    // Auto-save summary inputs
    ['summary-good', 'summary-more', 'summary-next'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', saveSummary);
        }
    });
});

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.openQuickAddModal = openQuickAddModal;
window.closeQuickAddModal = closeQuickAddModal;
window.submitQuickAdd = submitQuickAdd;
window.toggleDemoGuide = toggleDemoGuide;
window.openProjectDetail = openProjectDetail;
window.closeProjectDetail = closeProjectDetail;
window.promoteTryToPlan = promoteTryToPlan;
window.generateAIOutline = generateAIOutline;
window.createActionFromSuggestion = createActionFromSuggestion;
window.openPersonDetail = openPersonDetail;
window.closePersonDetail = closePersonDetail;
window.updateActionStatus = updateActionStatus;
window.toggleActionView = toggleActionView;
window.copyLastConversation = copyLastConversation;
window.createFollowAction = createFollowAction;
window.createBulkReminders = createBulkReminders;
window.promoteSelectedToNext = promoteSelectedToNext;
window.saveSummary = saveSummary;
window.printSummary = printSummary;
window.toggleMasking = toggleMasking;
window.exportData = exportData;
window.importData = importData;
window.confirmResetData = confirmResetData;

// ============= Ideation Workspace =============
function openIdeationWorkspace(mode = 'ideation') {
    const modal = document.getElementById('ideation-workspace-modal');
    if (!modal) {
        console.error('Ideation workspace modal not found');
        return;
    }
    const content = document.getElementById('ideation-workspace-content');
    
    content.innerHTML = getIdeationWorkspaceContent(mode);
    modal.classList.remove('hidden');
}

function closeIdeationWorkspace() {
    const modal = document.getElementById('ideation-workspace-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function getIdeationWorkspaceContent(mode) {
    switch(mode) {
        case 'ideation':
            return getIdeationModeContent();
        case 'planning':
            return getPlanningModeContent();
        case 'stakeholders':
            return getStakeholderModeContent();
        case 'proposal':
            return getProposalModeContent();
        default:
            return getIdeationModeContent();
    }
}

function getIdeationModeContent() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">想いの整理ワークスペース</h2>
                    <p class="text-muted-foreground">アイデアやメモから具体的な企画を構造化していきます</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Raw Ideas Input -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">💭 自由な想い・アイデア</h3>
                        <p class="text-sm text-muted-foreground">思いついたことを自由に書き出してください</p>
                    </div>
                    <div class="card-content">
                        <textarea 
                            class="w-full h-64 p-3 border border-input rounded-md resize-none"
                            placeholder="例：
• 地域の若者が地元に残れる仕組みが欲しい
• IT系の仕事を地方でもできるようにしたい  
• 地域のおばあちゃんたちの知識を活用したい
• 廃校を使って何かできないか..."
                            id="raw-ideas"
                        ></textarea>
                    </div>
                </div>
                
                <!-- Structured Ideas -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">🎯 整理された想い</h3>
                        <p class="text-sm text-muted-foreground">AIが構造化された形に整理します</p>
                    </div>
                    <div class="card-content">
                        <div id="structured-ideas" class="space-y-4 min-h-64">
                            <div class="text-center text-muted-foreground py-12">
                                左側にアイデアを入力すると、AIが自動的に整理します
                            </div>
                        </div>
                        <button onclick="structureIdeas()" class="w-full mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            AIで想いを整理する
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-2">
                <button onclick="openIdeationWorkspace('planning')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    次：企画構成へ →
                </button>
            </div>
        </div>
    `;
}

function getPlanningModeContent() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">企画構成ワークスペース</h2>
                    <p class="text-muted-foreground">フレームワークを使って企画を具体化します</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Problem-Solution Framework -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">🎯 課題-解決フレームワーク</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">📍 地域の課題</label>
                            <textarea class="w-full h-20 p-3 border border-input rounded-md resize-none" placeholder="どんな課題を解決したいですか？"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">💡 解決策・アプローチ</label>
                            <textarea class="w-full h-20 p-3 border border-input rounded-md resize-none" placeholder="どのような方法で解決しますか？"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">🎁 期待される価値</label>
                            <textarea class="w-full h-20 p-3 border border-input rounded-md resize-none" placeholder="誰にどんな価値を提供しますか？"></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- 5W1H Framework -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">📝 5W1Hフレームワーク</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">Who（誰が）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="実行者・対象者">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">What（何を）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="具体的な内容">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">When（いつ）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="実施時期">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Where（どこで）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="実施場所">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">Why（なぜ）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="目的・理由">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">How（どのように）</label>
                                <input type="text" class="w-full p-2 border border-input rounded-md" placeholder="実施方法">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-between">
                <button onclick="openIdeationWorkspace('ideation')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    ← 前：想いの整理
                </button>
                <button onclick="openIdeationWorkspace('stakeholders')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    次：関係者分析へ →
                </button>
            </div>
        </div>
    `;
}

function getStakeholderModeContent() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">関係者分析ワークスペース</h2>
                    <p class="text-muted-foreground">ステークホルダーを整理し、巻き込み戦略を立てます</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Stakeholder List -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">👥 関係者リスト</h3>
                        <p class="text-sm text-muted-foreground">プロジェクトに関わる人・組織を洗い出します</p>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3" id="stakeholder-list">
                            <div class="flex items-center space-x-3 p-3 border border-input rounded-md">
                                <input type="text" class="flex-1 border-none outline-none" placeholder="関係者名・組織名">
                                <select class="border border-input rounded px-2 py-1 text-sm">
                                    <option>支援者</option>
                                    <option>協力者</option>
                                    <option>対象者</option>
                                    <option>承認者</option>
                                    <option>反対者</option>
                                </select>
                            </div>
                        </div>
                        <button onclick="addStakeholder()" class="w-full mt-3 text-sm text-primary hover:underline">+ 関係者を追加</button>
                    </div>
                </div>
                
                <!-- Stakeholder Matrix -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">📊 影響度×関心度マトリックス</h3>
                        <p class="text-sm text-muted-foreground">関係者の位置づけを可視化します</p>
                    </div>
                    <div class="card-content">
                        <div class="relative w-full h-64 border border-input rounded-md bg-gradient-to-tr from-red-50 via-yellow-50 to-green-50">
                            <!-- Matrix Labels -->
                            <div class="absolute -left-2 top-2 text-xs text-muted-foreground transform -rotate-90 origin-left">影響度高</div>
                            <div class="absolute -left-2 bottom-2 text-xs text-muted-foreground transform -rotate-90 origin-left">影響度低</div>
                            <div class="absolute left-2 -bottom-6 text-xs text-muted-foreground">関心度低</div>
                            <div class="absolute right-2 -bottom-6 text-xs text-muted-foreground">関心度高</div>
                            
                            <!-- Grid Lines -->
                            <div class="absolute inset-0">
                                <div class="absolute left-1/2 top-0 w-px h-full bg-border"></div>
                                <div class="absolute top-1/2 left-0 w-full h-px bg-border"></div>
                            </div>
                            
                            <!-- Sample Stakeholders -->
                            <div class="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full cursor-pointer" title="市長（高影響・高関心）"></div>
                            <div class="absolute top-12 left-8 w-3 h-3 bg-yellow-500 rounded-full cursor-pointer" title="商工会（高影響・低関心）"></div>
                            <div class="absolute bottom-8 right-8 w-3 h-3 bg-blue-500 rounded-full cursor-pointer" title="地域住民（低影響・高関心）"></div>
                        </div>
                        
                        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>重要パートナー</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span>説得が必要</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>情報提供</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                                <span>最小限監視</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- People Connection -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">🔗 Peopleとの連携</h3>
                    <p class="text-sm text-muted-foreground">登録済みの人物と関係者を紐付けます</p>
                </div>
                <div class="card-content">
                    <div class="flex flex-wrap gap-2">
                        ${sampleData.people.slice(0, 8).map(person => `
                            <div class="flex items-center space-x-2 p-2 border border-input rounded-md hover:bg-accent cursor-pointer">
                                <div class="avatar avatar-sm">${person.avatar}</div>
                                <span class="text-sm">${getMaskedName(person.name)}</span>
                                <button class="text-xs text-primary hover:underline">+関係者として追加</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="flex justify-between">
                <button onclick="openIdeationWorkspace('planning')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    ← 前：企画構成
                </button>
                <button onclick="openIdeationWorkspace('proposal')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    次：提案作成へ →
                </button>
            </div>
        </div>
    `;
}

function getProposalModeContent() {
    return `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">提案作成ワークスペース</h2>
                    <p class="text-muted-foreground">これまでの内容から提案資料を自動生成します</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Proposal Template -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">📄 提案書テンプレート</h3>
                        <p class="text-sm text-muted-foreground">自動生成された提案内容</p>
                    </div>
                    <div class="card-content">
                        <div class="space-y-4 text-sm">
                            <div class="border-l-4 border-primary pl-3">
                                <h4 class="font-medium text-primary">1. プロジェクト概要</h4>
                                <p class="text-muted-foreground mt-1">地域の若者が地元で活躍できるIT支援プラットフォームの構築</p>
                            </div>
                            <div class="border-l-4 border-primary pl-3">
                                <h4 class="font-medium text-primary">2. 課題と背景</h4>
                                <p class="text-muted-foreground mt-1">・若者の地域離れによる人口減少<br>・IT系スキルを活かす場の不足<br>・高齢者の豊富な知識の活用不足</p>
                            </div>
                            <div class="border-l-4 border-primary pl-3">
                                <h4 class="font-medium text-primary">3. 解決策</h4>
                                <p class="text-muted-foreground mt-1">・リモートワーク支援センターの設立<br>・世代間交流プログラムの実施<br>・地域課題解決型プロジェクトの推進</p>
                            </div>
                            <div class="border-l-4 border-primary pl-3">
                                <h4 class="font-medium text-primary">4. 期待効果</h4>
                                <p class="text-muted-foreground mt-1">・若者の地域定着率30%向上<br>・新規IT関連事業の創出<br>・世代間交流の活発化</p>
                            </div>
                        </div>
                        
                        <div class="mt-6 flex space-x-2">
                            <button class="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14,2 14,8 20,8"/>
                                </svg>
                                PDF出力
                            </button>
                            <button class="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <rect x="8" y="8" width="8" height="8" rx="1" ry="1"/>
                                </svg>
                                スライド生成
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Next Steps -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">🚀 次のステップ</h3>
                        <p class="text-sm text-muted-foreground">提案後のアクション計画</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3 p-3 border border-input rounded-md">
                                <input type="checkbox" class="mt-1">
                                <div class="flex-1">
                                    <div class="font-medium text-sm">市長への提案書提出</div>
                                    <div class="text-xs text-muted-foreground">期限：2024/11/15</div>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-3 border border-input rounded-md">
                                <input type="checkbox" class="mt-1">
                                <div class="flex-1">
                                    <div class="font-medium text-sm">商工会での説明会開催</div>
                                    <div class="text-xs text-muted-foreground">期限：2024/11/20</div>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-3 border border-input rounded-md">
                                <input type="checkbox" class="mt-1">
                                <div class="flex-1">
                                    <div class="font-medium text-sm">実証実験計画の詳細設計</div>
                                    <div class="text-xs text-muted-foreground">期限：2024/12/01</div>
                                </div>
                            </div>
                        </div>
                        
                        <button onclick="convertToProject()" class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            プロジェクトとして登録
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-start">
                <button onclick="openIdeationWorkspace('stakeholders')" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    ← 前：関係者分析
                </button>
            </div>
        </div>
    `;
}

// Helper functions for ideation workspace
function structureIdeas() {
    const rawIdeas = document.getElementById('raw-ideas');
    const structuredDiv = document.getElementById('structured-ideas');
    
    if (!rawIdeas || !rawIdeas.value.trim()) {
        alert('まず左側にアイデアを入力してください');
        return;
    }
    
    // Simulate AI processing
    structuredDiv.innerHTML = `
        <div class="space-y-4">
            <div class="border border-input rounded-md p-4">
                <h4 class="font-medium text-primary mb-2">🎯 核となる想い</h4>
                <p class="text-sm">地域の若者が地元で活躍し、高齢者の知識と連携できる仕組みづくり</p>
            </div>
            <div class="border border-input rounded-md p-4">
                <h4 class="font-medium text-green-600 mb-2">💡 具体的なアイデア</h4>
                <ul class="text-sm space-y-1">
                    <li>• IT系リモートワーク支援センター</li>
                    <li>• 世代間交流ワークショップ</li>
                    <li>• 廃校活用のコワーキングスペース</li>
                </ul>
            </div>
            <div class="border border-input rounded-md p-4">
                <h4 class="font-medium text-purple-600 mb-2">🎁 期待される効果</h4>
                <ul class="text-sm space-y-1">
                    <li>• 若者の地域定着率向上</li>
                    <li>• 高齢者の知識活用</li>
                    <li>• 地域経済の活性化</li>
                </ul>
            </div>
        </div>
    `;
}

function addStakeholder() {
    const list = document.getElementById('stakeholder-list');
    if (!list) return;
    
    const newItem = document.createElement('div');
    newItem.className = 'flex items-center space-x-3 p-3 border border-input rounded-md';
    newItem.innerHTML = `
        <input type="text" class="flex-1 border-none outline-none" placeholder="関係者名・組織名">
        <select class="border border-input rounded px-2 py-1 text-sm">
            <option>支援者</option>
            <option>協力者</option>
            <option>対象者</option>
            <option>承認者</option>
            <option>反対者</option>
        </select>
        <button onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    list.appendChild(newItem);
}

function convertToProject() {
    alert('企画内容がプロジェクトとして登録されました！\n\n自動的にプロジェクト一覧に追加され、関連するアクションアイテムも生成されます。');
    closeIdeationWorkspace();
    // Here you would actually create the project and actions
    renderCurrentRoute();
}

// ============= Profile Page =============
function renderProfile(container) {
    const userProfile = getUserProfile();
    
    container.innerHTML = `
        <div class="space-y-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">プロフィール設定</h1>
                <p class="mt-1 text-sm text-gray-600">あなたのスキル、経験、志向を設定してください。地域の課題とのマッチングに活用されます。</p>
            </div>
            
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">基本情報</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">名前</label>
                        <input type="text" id="profile-name" value="${userProfile.name || ''}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                               placeholder="山田 太郎">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">職業・立場</label>
                        <select id="profile-role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">選択してください</option>
                            <option value="住民" ${userProfile.role === '住民' ? 'selected' : ''}>住民</option>
                            <option value="協力隊" ${userProfile.role === '協力隊' ? 'selected' : ''}>地域おこし協力隊</option>
                            <option value="役場" ${userProfile.role === '役場' ? 'selected' : ''}>役場職員</option>
                            <option value="事業者" ${userProfile.role === '事業者' ? 'selected' : ''}>事業者</option>
                            <option value="学生" ${userProfile.role === '学生' ? 'selected' : ''}>学生・研究者</option>
                            <option value="移住希望" ${userProfile.role === '移住希望' ? 'selected' : ''}>移住希望者</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">スキル・経験</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">主なスキル（複数選択可）</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2" id="skills-grid">
                            ${renderSkillCheckboxes(userProfile.skills || [])}
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">職歴・経験</label>
                        <textarea id="profile-experience" rows="3" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                  placeholder="これまでの職歴や主な経験について記入してください">${userProfile.experience || ''}</textarea>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">地域への想い・志向</h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">関心のある分野</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2" id="interests-grid">
                            ${renderInterestCheckboxes(userProfile.interests || [])}
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">地域への想い・目標</label>
                        <textarea id="profile-aspirations" rows="4" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                  placeholder="地域に対してどのような貢献をしたいか、どんな暮らしを実現したいかを記入してください">${userProfile.aspirations || ''}</textarea>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end">
                <button onclick="saveProfile()" 
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    プロフィールを保存
                </button>
            </div>
        </div>
    `;
}

function renderSkillCheckboxes(selectedSkills) {
    const skills = [
        'プログラミング', 'デザイン', 'マーケティング', '農業', '観光', '教育',
        '医療・福祉', '建築・土木', '会計・経理', 'イベント企画', '写真・動画', 'IT・システム',
        '料理', '手工芸', '音楽', 'スポーツ指導', '翻訳・通訳', 'コンサルティング'
    ];
    
    return skills.map(skill => `
        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" value="${skill}" ${selectedSkills.includes(skill) ? 'checked' : ''} 
                   class="text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <span class="text-sm text-gray-700">${skill}</span>
        </label>
    `).join('');
}

function renderInterestCheckboxes(selectedInterests) {
    const interests = [
        '移住促進', '観光振興', '農業振興', '空き家活用', '子育て支援', '高齢者支援',
        '起業支援', 'コミュニティ形成', '文化継承', '環境保護', '防災・安全', 'デジタル化推進',
        'イベント開催', '教育充実', '医療・福祉', '交通インフラ', '情報発信', '関係人口拡大'
    ];
    
    return interests.map(interest => `
        <label class="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" value="${interest}" ${selectedInterests.includes(interest) ? 'checked' : ''} 
                   class="text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <span class="text-sm text-gray-700">${interest}</span>
        </label>
    `).join('');
}

function saveProfile() {
    const profile = {
        name: document.getElementById('profile-name').value,
        role: document.getElementById('profile-role').value,
        experience: document.getElementById('profile-experience').value,
        aspirations: document.getElementById('profile-aspirations').value,
        skills: Array.from(document.querySelectorAll('#skills-grid input:checked')).map(input => input.value),
        interests: Array.from(document.querySelectorAll('#interests-grid input:checked')).map(input => input.value),
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('user.profile', JSON.stringify(profile));
    alert('プロフィールを保存しました！');
}

function getUserProfile() {
    const stored = localStorage.getItem('user.profile');
    return stored ? JSON.parse(stored) : {};
}

// ============= Region Page =============
function renderRegion(container) {
    const userRegion = getUserRegion();
    const userIssues = getUserIssues();
    
    container.innerHTML = `
        <div class="space-y-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">地域設定・課題管理</h1>
                <p class="mt-1 text-sm text-gray-600">あなたの所属地域を設定し、地域特有の情報と課題を管理できます。</p>
            </div>
            
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">地域選択</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">都道府県</label>
                        <select id="region-prefecture" onchange="updateRegionMunicipalities()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">選択してください</option>
                            <option value="北海道" ${userRegion.prefecture === '北海道' ? 'selected' : ''}>北海道</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">市町村</label>
                        <select id="region-municipality" onchange="loadRegionDataAndRefreshIssues()" 
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">選択してください</option>
                        </select>
                    </div>
                </div>
                
                <!-- 地域情報サマリー -->
                <div id="region-summary" class="hidden mt-6 pt-6 border-t border-gray-200">
                    <!-- 地域サマリーがここに表示される -->
                </div>
            </div>
            
            <div id="region-data-display" class="hidden space-y-4">
                <!-- 詳細地域データがここに表示される -->
            </div>
            
            <!-- 地域課題管理セクション -->
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">地域課題管理</h2>
                        <p class="text-sm text-gray-600">地域設定に基づいて課題を推論し、管理できます。</p>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="inferIssuesInRegion()" 
                                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                ${!userRegion.municipality ? 'disabled' : ''}>
                            <svg class="inline w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12c0 1.3-.9 2.4-2 2.7V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3.3c-1.1-.3-2-1.4-2-2.7V7a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1v5z"/>
                            </svg>
                            課題を自動推論
                        </button>
                        <button onclick="addManualIssueInRegion()" 
                                class="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                            手動追加
                        </button>
                    </div>
                </div>
                
                ${!userRegion.municipality ? `
                    <div class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">地域を選択してください</h3>
                        <p class="mt-1 text-sm text-gray-500">地域を選択すると、その地域の課題推論が可能になります。</p>
                    </div>
                ` : `
                    <div id="region-issues-list" class="space-y-3">
                        ${renderRegionIssuesList(userIssues)}
                    </div>
                    
                    ${userIssues.length === 0 ? `
                        <div class="text-center py-8">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                            <h3 class="mt-2 text-sm font-medium text-gray-900">課題がありません</h3>
                            <p class="mt-1 text-sm text-gray-500">「課題を自動推論」ボタンで地域課題を自動生成するか、手動で追加してください。</p>
                        </div>
                    ` : ''}
                `}
            </div>
            
            <div class="flex justify-end">
                <button onclick="saveRegion()" 
                        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    地域設定を保存
                </button>
            </div>
        </div>
    `;
    
    // 初期化
    updateRegionMunicipalities();
    if (userRegion.municipality) {
        loadRegionData();
    }
}

function updateRegionMunicipalities() {
    const prefecture = document.getElementById('region-prefecture').value;
    const municipalitySelect = document.getElementById('region-municipality');
    
    municipalitySelect.innerHTML = '<option value="">選択してください</option>';
    
    if (prefecture === '北海道') {
        const municipalities = ['喜茂別町', '真狩村', 'ルスツ村', 'ニセコ町', '倶知安町'];
        municipalities.forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipalitySelect.appendChild(option);
        });
    }
    
    // 保存済みの値を復元
    const userRegion = getUserRegion();
    if (userRegion.municipality) {
        municipalitySelect.value = userRegion.municipality;
    }
}

async function loadRegionData() {
    const municipality = document.getElementById('region-municipality').value;
    if (!municipality) {
        document.getElementById('region-data-display').classList.add('hidden');
        document.getElementById('region-summary').classList.add('hidden');
        return;
    }
    
    try {
        // 地域データを読み込み
        const response = await fetch('./assets/data/regions.seed.json');
        const regionsData = await response.json();
        const regionData = regionsData.find(region => region.name === municipality);
        
        if (regionData) {
            displayRegionSummary(regionData);
            displayRegionData(regionData);
            document.getElementById('region-summary').classList.remove('hidden');
            document.getElementById('region-data-display').classList.remove('hidden');
        }
    } catch (error) {
        console.error('地域データの読み込みに失敗:', error);
    }
}

async function loadRegionDataAndRefreshIssues() {
    await loadRegionData();
    // 地域変更時に課題リストも更新
    refreshRegionIssuesDisplay();
}

function displayRegionSummary(regionData) {
    const summary = document.getElementById('region-summary');
    
    // 高齢化率に基づく評価
    const agingAssessment = regionData.agingRate >= 40 ? 
        { level: '超高齢社会', color: 'bg-red-100 text-red-800', icon: '⚠️' } :
        regionData.agingRate >= 28 ? 
        { level: '高齢社会', color: 'bg-yellow-100 text-yellow-800', icon: '⚡' } :
        { level: '安定', color: 'bg-green-100 text-green-800', icon: '✅' };
    
    // 人口規模に基づく評価
    const populationAssessment = regionData.population >= 10000 ? 
        { level: '大規模', color: 'bg-blue-100 text-blue-800' } :
        regionData.population >= 5000 ? 
        { level: '中規模', color: 'bg-indigo-100 text-indigo-800' } :
        { level: '小規模', color: 'bg-purple-100 text-purple-800' };
    
    summary.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-md font-semibold text-gray-900">📍 ${regionData.name} 概要</h3>
            <div class="flex gap-2">
                <span class="px-3 py-1 text-xs rounded-full ${populationAssessment.color}">
                    ${populationAssessment.level}
                </span>
                <span class="px-3 py-1 text-xs rounded-full ${agingAssessment.color}">
                    ${agingAssessment.icon} ${agingAssessment.level}
                </span>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">${regionData.population.toLocaleString()}</div>
                <div class="text-xs text-gray-600">人口</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">${regionData.agingRate}%</div>
                <div class="text-xs text-gray-600">高齢化率</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">${regionData.industries.length}</div>
                <div class="text-xs text-gray-600">主要産業</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
                <div class="text-2xl font-bold text-gray-900">${regionData.tourismSpots.length}</div>
                <div class="text-xs text-gray-600">観光地</div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">🏭 主要産業</h4>
                <div class="flex flex-wrap gap-1">
                    ${regionData.industries.slice(0, 3).map(industry => 
                        `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${industry}</span>`
                    ).join('')}
                    ${regionData.industries.length > 3 ? `<span class="text-xs text-gray-500">+${regionData.industries.length - 3}件</span>` : ''}
                </div>
            </div>
            
            <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">🏞️ 観光・特色</h4>
                <div class="flex flex-wrap gap-1">
                    ${regionData.tourismSpots.slice(0, 3).map(spot => 
                        `<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">${spot}</span>`
                    ).join('')}
                    ${regionData.tourismSpots.length > 3 ? `<span class="text-xs text-gray-500">+${regionData.tourismSpots.length - 3}件</span>` : ''}
                </div>
            </div>
        </div>
        
        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
            <div class="flex items-start">
                <div class="flex-shrink-0 mt-0.5">
                    <svg class="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="ml-2 text-sm">
                    <p class="text-blue-800">
                        <strong>地域特性:</strong> 
                        ${getRegionCharacteristics(regionData)}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function getRegionCharacteristics(regionData) {
    const characteristics = [];
    
    if (regionData.agingRate >= 40) {
        characteristics.push('人口減少・高齢化が進行');
    }
    
    if (regionData.industries.includes('農業')) {
        characteristics.push('農業基盤が充実');
    }
    
    if (regionData.industries.includes('観光業')) {
        characteristics.push('観光資源が豊富');
    }
    
    if (regionData.tourismSpots.some(spot => spot.includes('スキー') || spot.includes('リゾート'))) {
        characteristics.push('リゾート地として知名度が高い');
    }
    
    if (regionData.population < 5000) {
        characteristics.push('小規模コミュニティ');
    }
    
    return characteristics.length > 0 ? characteristics.join('、') : '地域固有の特色を持つエリア';
}

function renderRegionIssuesList(issues) {
    return issues.map(issue => `
        <div class="border border-gray-200 rounded-lg p-4 ${issue.source === 'inferred' ? 'bg-blue-50' : 'bg-gray-50'}">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="font-medium text-gray-900">${issue.title}</h3>
                        <span class="px-2 py-1 text-xs rounded-full ${
                            issue.source === 'inferred' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                        }">
                            ${issue.source === 'inferred' ? '自動推論' : '手動追加'}
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full ${
                            issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                            issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }">
                            ${issue.priority === 'high' ? '高' : issue.priority === 'medium' ? '中' : '低'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${issue.description}</p>
                    ${issue.tags && issue.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-1">
                            ${issue.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="flex gap-2 ml-4">
                    <button onclick="createProjectFromIssueInRegion('${issue.id}')" 
                            class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                        プロジェクト化
                    </button>
                    <button onclick="removeIssueInRegion('${issue.id}')" 
                            class="text-red-500 hover:text-red-700">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function inferIssuesInRegion() {
    const userProfile = getUserProfile();
    const userRegion = getUserRegion();
    
    if (!userProfile.interests || !userRegion.municipality) {
        alert('プロフィール設定を完了してから課題推論を実行してください。');
        return;
    }
    
    // region-inference.jsの関数を使用
    if (typeof inferRegionIssues === 'function') {
        const inferredIssues = inferRegionIssues(userProfile, userRegion);
        
        // 既存の課題と重複を避けて追加
        const existingIssues = getUserIssues();
        const newIssues = inferredIssues.filter(newIssue => 
            !existingIssues.some(existing => existing.title === newIssue.title)
        );
        
        if (newIssues.length > 0) {
            const updatedIssues = [...existingIssues, ...newIssues];
            localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
            refreshRegionIssuesDisplay();
            alert(`${newIssues.length}件の課題が推論されました！`);
        } else {
            alert('新しい課題は見つかりませんでした。既存の課題と重複している可能性があります。');
        }
    } else {
        alert('課題推論機能の読み込みに失敗しました。');
    }
}

function addManualIssueInRegion() {
    const title = prompt('課題のタイトルを入力してください:');
    if (!title) return;
    
    const description = prompt('課題の詳細を入力してください:') || '';
    const priority = prompt('優先度を入力してください (high/medium/low):', 'medium') || 'medium';
    
    const newIssue = {
        id: Date.now().toString(),
        title: title,
        description: description,
        priority: priority,
        source: 'manual',
        tags: [],
        createdAt: new Date().toISOString()
    };
    
    const existingIssues = getUserIssues();
    const updatedIssues = [...existingIssues, newIssue];
    localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
    refreshRegionIssuesDisplay();
}

function removeIssueInRegion(issueId) {
    if (confirm('この課題を削除しますか？')) {
        const existingIssues = getUserIssues();
        const updatedIssues = existingIssues.filter(issue => issue.id !== issueId);
        localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
        refreshRegionIssuesDisplay();
    }
}

function createProjectFromIssueInRegion(issueId) {
    const issues = getUserIssues();
    const issue = issues.find(i => i.id === issueId);
    
    if (issue && typeof createPlanFromIssue === 'function') {
        const projectPlan = createPlanFromIssue(issue);
        alert(`課題「${issue.title}」からプロジェクトプランが生成されました！\n\n${projectPlan.title}\n\n企画ワークスペースで詳細を確認・編集できます。`);
        
        // 企画ワークスペースを開く
        openIdeationWorkspace();
    } else {
        alert('プロジェクト生成機能の読み込みに失敗しました。');
    }
}

function refreshRegionIssuesDisplay() {
    const issuesList = document.getElementById('region-issues-list');
    if (issuesList) {
        const userIssues = getUserIssues();
        issuesList.innerHTML = renderRegionIssuesList(userIssues);
    }
}

function displayRegionData(regionData) {
    const display = document.getElementById('region-data-display');
    
    display.innerHTML = `
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">${regionData.name} 地域情報</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-md font-medium text-gray-900 mb-3">基本情報</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">人口:</span>
                            <span class="font-medium">${regionData.population.toLocaleString()}人</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">高齢化率:</span>
                            <span class="font-medium">${regionData.agingRate}%</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-md font-medium text-gray-900 mb-3">主要産業</h3>
                    <div class="flex flex-wrap gap-2">
                        ${regionData.industries.map(industry => 
                            `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${industry}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
            
            <div class="mt-6">
                <h3 class="text-md font-medium text-gray-900 mb-3">観光・特色</h3>
                <div class="flex flex-wrap gap-2">
                    ${regionData.tourismSpots.map(spot => 
                        `<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">${spot}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

function saveRegion() {
    const region = {
        prefecture: document.getElementById('region-prefecture').value,
        municipality: document.getElementById('region-municipality').value,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('user.region', JSON.stringify(region));
    alert('地域設定を保存しました！');
}

function getUserRegion() {
    const stored = localStorage.getItem('user.region');
    return stored ? JSON.parse(stored) : {};
}

// ============= Issues Page =============
function renderIssues(container) {
    const userIssues = getUserIssues();
    
    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">地域課題</h1>
                    <p class="mt-1 text-sm text-gray-600">あなたのプロフィールと地域データから推測される課題と、手動で追加した課題を管理できます。</p>
                </div>
                <button onclick="inferIssues()" 
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <svg class="inline w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12c0 1.3-.9 2.4-2 2.7V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3.3c-1.1-.3-2-1.4-2-2.7V7a1 1 0 0 1 1 1h14a1 1 0 0 1 1-1v5z"/>
                    </svg>
                    課題を自動推論
                </button>
            </div>
            
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-900">課題一覧</h2>
                    <button onclick="addManualIssue()" 
                            class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        手動追加
                    </button>
                </div>
                
                <div id="issues-list" class="space-y-3">
                    ${renderIssuesList(userIssues)}
                </div>
                
                ${userIssues.length === 0 ? `
                    <div class="text-center py-8">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">課題がありません</h3>
                        <p class="mt-1 text-sm text-gray-500">「課題を自動推論」ボタンで地域課題を自動生成するか、手動で追加してください。</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderIssuesList(issues) {
    return issues.map(issue => `
        <div class="border border-gray-200 rounded-lg p-4 ${issue.source === 'inferred' ? 'bg-blue-50' : 'bg-gray-50'}">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                        <h3 class="font-medium text-gray-900">${issue.title}</h3>
                        <span class="px-2 py-1 text-xs rounded-full ${
                            issue.source === 'inferred' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                        }">
                            ${issue.source === 'inferred' ? '自動推論' : '手動追加'}
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full ${
                            issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                            issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }">
                            ${issue.priority === 'high' ? '高' : issue.priority === 'medium' ? '中' : '低'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${issue.description}</p>
                    ${issue.tags && issue.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-1">
                            ${issue.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="flex gap-2 ml-4">
                    <button onclick="createProjectFromIssue('${issue.id}')" 
                            class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                        プロジェクト化
                    </button>
                    <button onclick="removeIssue('${issue.id}')" 
                            class="text-red-500 hover:text-red-700">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function inferIssues() {
    const userProfile = getUserProfile();
    const userRegion = getUserRegion();
    
    if (!userProfile.interests || !userRegion.municipality) {
        alert('プロフィールと地域設定を完了してから課題推論を実行してください。');
        return;
    }
    
    // region-inference.jsの関数を使用
    if (typeof inferRegionIssues === 'function') {
        const inferredIssues = inferRegionIssues(userProfile, userRegion);
        
        // 既存の課題と重複を避けて追加
        const existingIssues = getUserIssues();
        const newIssues = inferredIssues.filter(newIssue => 
            !existingIssues.some(existing => existing.title === newIssue.title)
        );
        
        if (newIssues.length > 0) {
            const updatedIssues = [...existingIssues, ...newIssues];
            localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
            renderCurrentRoute(); // ページを再描画
            alert(`${newIssues.length}件の課題が推論されました！`);
        } else {
            alert('新しい課題は見つかりませんでした。既存の課題と重複している可能性があります。');
        }
    } else {
        alert('課題推論機能の読み込みに失敗しました。');
    }
}

function addManualIssue() {
    const title = prompt('課題のタイトルを入力してください:');
    if (!title) return;
    
    const description = prompt('課題の詳細を入力してください:') || '';
    const priority = prompt('優先度を入力してください (high/medium/low):', 'medium') || 'medium';
    
    const newIssue = {
        id: Date.now().toString(),
        title: title,
        description: description,
        priority: priority,
        source: 'manual',
        tags: [],
        createdAt: new Date().toISOString()
    };
    
    const existingIssues = getUserIssues();
    const updatedIssues = [...existingIssues, newIssue];
    localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
    renderCurrentRoute();
}

function removeIssue(issueId) {
    if (confirm('この課題を削除しますか？')) {
        const existingIssues = getUserIssues();
        const updatedIssues = existingIssues.filter(issue => issue.id !== issueId);
        localStorage.setItem('user.issues', JSON.stringify(updatedIssues));
        renderCurrentRoute();
    }
}

function createProjectFromIssue(issueId) {
    const issues = getUserIssues();
    const issue = issues.find(i => i.id === issueId);
    
    if (issue && typeof createPlanFromIssue === 'function') {
        const projectPlan = createPlanFromIssue(issue);
        alert(`課題「${issue.title}」からプロジェクトプランが生成されました！\n\n${projectPlan.title}\n\n企画ワークスペースで詳細を確認・編集できます。`);
        
        // 企画ワークスペースを開く
        openIdeationWorkspace();
    } else {
        alert('プロジェクト生成機能の読み込みに失敗しました。');
    }
}

function getUserIssues() {
    const stored = localStorage.getItem('user.issues');
    return stored ? JSON.parse(stored) : [];
}

// Navigation functions for settings page
function navigateToProfile() {
    window.location.hash = '#/profile';
}

function navigateToRegion() {
    window.location.hash = '#/region';
}

function navigateToIssues() {
    window.location.hash = '#/issues';
}

// Expose functions to global scope
window.openIdeationWorkspace = openIdeationWorkspace;
window.closeIdeationWorkspace = closeIdeationWorkspace;
window.structureIdeas = structureIdeas;
window.addStakeholder = addStakeholder;
window.convertToProject = convertToProject;
window.saveProfile = saveProfile;
window.updateRegionMunicipalities = updateRegionMunicipalities;
window.loadRegionData = loadRegionData;
window.loadRegionDataAndRefreshIssues = loadRegionDataAndRefreshIssues;
window.saveRegion = saveRegion;
window.inferIssues = inferIssues;
window.addManualIssue = addManualIssue;
window.removeIssue = removeIssue;
window.createProjectFromIssue = createProjectFromIssue;
window.inferIssuesInRegion = inferIssuesInRegion;
window.addManualIssueInRegion = addManualIssueInRegion;
window.removeIssueInRegion = removeIssueInRegion;
window.createProjectFromIssueInRegion = createProjectFromIssueInRegion;
window.refreshRegionIssuesDisplay = refreshRegionIssuesDisplay;
window.navigateToProfile = navigateToProfile;
window.navigateToRegion = navigateToRegion;
window.navigateToIssues = navigateToIssues;