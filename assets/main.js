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
                    <p class="text-muted-foreground">プロジェクトの管理と進捗追跡</p>
                </div>
                <button onclick="generateAIOutline()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    AIアウトライン生成
                </button>
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
                                <label class="text-sm font-medium">KPI設定</label>
                                <div class="mt-2 space-y-2">
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border" checked>
                                        <span class="text-sm">KPIあり</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" class="rounded border-border">
                                        <span class="text-sm">KPIなし</span>
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
                <p class="text-muted-foreground">システム設定とデータ管理</p>
            </div>
            
            <div class="space-y-6">
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