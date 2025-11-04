// ===============================
// LocalSuccess - Core Module
// Global State, Utilities, Router
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
    // Update active navigation
    function updateActiveNav() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('bg-accent', 'text-accent-foreground');
        });
        
        const currentLink = document.querySelector(`[data-route="${appState.currentRoute}"]`);
        if (currentLink) {
            currentLink.classList.add('bg-accent', 'text-accent-foreground');
        }
        
        // Update mobile page indicator
        const mobileIndicator = document.getElementById('current-page-mobile');
        if (mobileIndicator && currentLink) {
            const routeNames = {
                'dashboard': 'ダッシュボード',
                'projects': 'プロジェクト',
                'people': '人脈',
                'actions': 'アクション',
                'follow': 'Follow',
                'summary': 'ふりかえり',
                'settings': '設定',
                'profile': 'プロフィール',
                'region': 'Region',
                'issues': 'Issues'
            };
            mobileIndicator.textContent = routeNames[appState.currentRoute] || 'ダッシュボード';
        }
    }
    
    // Hash change handler
    function handleHashChange() {
        const hash = window.location.hash.slice(1); // Remove #
        const route = hash.replace('/', '') || 'dashboard';
        appState.currentRoute = route;
        renderCurrentRoute();
        updateActiveNav();
        saveData();
    }
    
    // Navigation click handler
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-route]') || e.target.closest('[data-route]')) {
            const link = e.target.matches('[data-route]') ? e.target : e.target.closest('[data-route]');
            const route = link.dataset.route;
            window.location.hash = '#/' + route;
        }
    });
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load
}

function renderCurrentRoute() {
    const container = document.getElementById('main-content');
    if (!container) return;
    
    switch (appState.currentRoute) {
        case 'dashboard':
            renderDashboard(container);
            break;
        case 'projects':
            renderProjects(container);
            break;
        case 'people':
            renderPeople(container);
            break;
        case 'actions':
            renderActions(container);
            break;
        case 'follow':
            // Follow functionality has been integrated into dashboard
            appState.currentRoute = 'dashboard';
            window.location.hash = '#/dashboard';
            renderDashboard(container);
            break;
        case 'summary':
            renderSummary(container);
            break;
        case 'settings':
            renderSettings(container);
            break;
        case 'profile':
            renderProfile(container);
            break;
        case 'region':
            renderRegion(container);
            break;
        case 'issues':
            renderIssues(container);
            break;
        default:
            renderDashboard(container);
    }
}

// ============= Mobile Menu =============
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

// ============= User Menu =============
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        // Close menu when clicking outside
        document.addEventListener('click', closeUserMenuOnOutsideClick);
    } else {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeUserMenuOnOutsideClick);
    }
}

function closeUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.add('hidden');
    document.removeEventListener('click', closeUserMenuOnOutsideClick);
}

function closeUserMenuOnOutsideClick(event) {
    const userMenu = document.getElementById('user-menu');
    if (!userMenu.contains(event.target)) {
        closeUserMenu();
    }
}

function logout() {
    alert('ログアウト機能は実装予定です');
    closeUserMenu();
}

// ============= Profile Rendering =============
function renderProfile(container) {
    container.innerHTML = `
        <div class="container px-4 py-6">
            <div class="max-w-4xl mx-auto space-y-6">
                <!-- Profile Header -->
                <div class="mb-8">
                    <h1 class="text-3xl font-bold tracking-tight">プロフィール</h1>
                    <p class="text-muted-foreground">アカウント情報とユーザー設定の管理</p>
                </div>
                
                <!-- Basic Profile Information -->
                <div class="card">
                    <div class="card-header">
                        <h2 class="text-xl font-bold">基本情報</h2>
                        <p class="text-muted-foreground">アカウントの基本情報</p>
                    </div>
                    <div class="card-content space-y-6">
                        <div class="flex items-center space-x-4">
                            <div class="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-semibold">
                                T
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold">管理者</h3>
                                <p class="text-muted-foreground">admin@localsuccess.jp</p>
                            </div>
                        </div>
                        
                        <div class="grid gap-4 md:grid-cols-2">
                            <div>
                                <label class="text-sm font-medium">名前</label>
                                <input type="text" value="管理者" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                            </div>
                            
                            <div>
                                <label class="text-sm font-medium">メールアドレス</label>
                                <input type="email" value="admin@localsuccess.jp" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                            </div>
                            
                            <div>
                                <label class="text-sm font-medium">役職</label>
                                <input type="text" value="システム管理者" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                            </div>
                            
                            <div>
                                <label class="text-sm font-medium">所属地域</label>
                                <input type="text" value="Kimobetsu Lab" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                            </div>
                        </div>
                        
                        <div class="flex space-x-2">
                            <button onclick="saveProfile()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                                保存
                            </button>
                            <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- User Settings (from Settings page) -->
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
            </div>
        </div>
    `;
}

function saveProfile() {
    alert('プロフィールが保存されました');
}

// ============= Settings Functions =============
function toggleMasking() {
    appState.masking = !appState.masking;
    saveData();
    renderCurrentRoute(); // Re-render current page with new masking setting
}

function navigateToProfile() {
    // Already on profile page, could scroll to top or show message
    window.scrollTo(0, 0);
    alert('現在プロフィールページです');
}

function navigateToRegion() {
    window.location.hash = '#/region';
}

function navigateToIssues() {
    window.location.hash = '#/issues';
}

// Expose to global scope
window.toggleMobileMenu = toggleMobileMenu;
window.toggleUserMenu = toggleUserMenu;
window.closeUserMenu = closeUserMenu;
window.logout = logout;
window.saveProfile = saveProfile;
window.toggleMasking = toggleMasking;
window.navigateToProfile = navigateToProfile;
window.navigateToRegion = navigateToRegion;
window.navigateToIssues = navigateToIssues;