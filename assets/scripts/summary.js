// ===============================
// LocalSuccess - Summary Module
// ===============================

// Sample reflection data
const reflectionData = {
    daily: [
        {
            date: '2024-01-20',
            actions: [
                { time: '09:00', action: '田中さんとの打診会議', result: '移住相談のニーズ確認完了', type: 'meeting' },
                { time: '14:00', action: 'プロジェクト企画書更新', result: 'VR体験機能の詳細を追加', type: 'work' },
                { time: '16:30', action: '地域課題調査', result: '3件の新しい課題を発見', type: 'research' }
            ],
            reflection: {
                good: '田中さんからの具体的なフィードバックが得られた',
                challenge: 'VR体験の技術的な実装方法を明確にする必要',
                next: '明日はVR技術パートナーと相談予定'
            }
        },
        {
            date: '2024-01-19',
            actions: [
                { time: '10:00', action: '移住体験ツアー企画', result: '初回プランを作成', type: 'planning' },
                { time: '15:00', action: '地域住民インタビュー', result: '5名からフィードバック収集', type: 'research' }
            ],
            reflection: {
                good: '住民の生の声を聞くことができた',
                challenge: 'ツアー内容をもっと具体化が必要',
                next: '体験内容の詳細設計を進める'
            }
        }
    ],
    weekly: [
        {
            week: '2024年1月第3週',
            period: '2024-01-15 〜 2024-01-21',
            dailySummary: '5日間で12のアクションを実施',
            achievements: [
                '移住相談システムの基本設計完了',
                'VR体験プロトタイプの企画策定',
                '地域住民からの初期フィードバック収集'
            ],
            challenges: [
                'VR技術の実装方法が未確定',
                '移住希望者のニーズ調査が不十分'
            ],
            nextWeekPlan: [
                'VR技術パートナーとの連携開始',
                '移住希望者アンケート実施',
                'プロトタイプ開発着手'
            ],
            kpiProgress: {
                '移住相談件数': { target: 50, actual: 12, progress: '24%' },
                '移住決定者数': { target: 5, actual: 1, progress: '20%' },
                '満足度': { target: 85, actual: 78, progress: '92%' }
            }
        }
    ],
    monthly: [
        {
            month: '2024年1月',
            period: '2024-01-01 〜 2024-01-31',
            weeklySummary: '4週間で計48のアクションを実施',
            majorAchievements: [
                '移住サポートプログラムの基盤構築',
                'デジタル移住相談システムの企画完成',
                '地域課題データベースの初期構築'
            ],
            mainChallenges: [
                'VRによる地域体験システムの技術選定',
                '移住希望者との継続的な関係構築方法',
                '地域住民の協力体制の強化'
            ],
            nextMonthFocus: [
                'VR体験システムのプロトタイプ開発',
                '移住希望者向けオンライン相談の本格運用',
                '地域住民との連携強化プログラム開始'
            ],
            kpiSummary: {
                '移住相談件数': { target: 50, actual: 32, growth: '+128%' },
                '移住決定者数': { target: 5, actual: 3, growth: '+200%' },
                '満足度': { target: 85, actual: 81, growth: '+8%' }
            },
            projectStatus: {
                try: { count: 2, promoted: 1 },
                plan: { count: 1, completed: 0 }
            }
        }
    ],
    yearly: [
        {
            year: '2024年',
            period: '2024-01-01 〜 2024-12-31',
            monthlySummary: '12ヶ月間で計576のアクションを実施',
            annualAchievements: [
                'デジタル移住サポートプログラムの完全運用開始',
                'VRによる地域体験システムの実装と普及',
                '移住希望者向け包括的サポート体制の確立',
                '地域課題解決プラットフォームの構築'
            ],
            yearlyLessons: [
                'デジタル技術と人的サポートの組み合わせが重要',
                '地域住民との信頼関係が成功の鍵',
                '継続的なフィードバック収集とシステム改善が必要'
            ],
            nextYearVision: [
                '他地域への展開モデルの確立',
                'AI活用による個別最適化サポート',
                '移住後の定着支援システムの強化'
            ],
            annualKPI: {
                '移住相談件数': { target: 200, actual: 245, achievement: '122%' },
                '移住決定者数': { target: 20, actual: 28, achievement: '140%' },
                '移住後定着率': { target: 80, actual: 89, achievement: '111%' },
                '地域満足度': { target: 85, actual: 91, achievement: '107%' }
            }
        }
    ]
};

function renderSummary(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">ふりかえり</h1>
                <p class="text-muted-foreground">活動の振り返りと次期計画への反映</p>
            </div>
            
            <!-- Period Selector -->
            <div class="mb-6">
                <div class="flex space-x-2 border-b border-border">
                    <button onclick="switchReflectionPeriod('daily')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-primary text-primary" 
                            data-period="daily">
                        日次
                    </button>
                    <button onclick="switchReflectionPeriod('weekly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="weekly">
                        週次
                    </button>
                    <button onclick="switchReflectionPeriod('monthly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="monthly">
                        月次
                    </button>
                    <button onclick="switchReflectionPeriod('yearly')" 
                            class="reflection-tab px-4 py-2 text-sm font-medium transition-colors hover:text-primary border-b-2 border-transparent text-muted-foreground" 
                            data-period="yearly">
                        年次
                    </button>
                </div>
            </div>
            
            <!-- Reflection Content -->
            <div id="reflection-content">
                ${renderDailyReflection()}
            </div>
        </div>
    `;
}

function renderDailyReflection() {
    const latestDaily = reflectionData.daily[0];
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">日次ふりかえり</h2>
                <div class="text-sm text-muted-foreground">${latestDaily.date}</div>
            </div>
            
            <!-- Daily Actions -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">今日のアクション</h3>
                </div>
                <div class="card-content">
                    <div class="space-y-3">
                        ${latestDaily.actions.map(action => `
                            <div class="flex items-start space-x-3 p-3 border rounded-lg">
                                <div class="flex-shrink-0 w-12 text-sm text-muted-foreground">${action.time}</div>
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2">
                                        <h4 class="font-medium">${action.action}</h4>
                                        <span class="badge badge-${action.type === 'meeting' ? 'primary' : action.type === 'work' ? 'secondary' : action.type === 'research' ? 'success' : 'default'}">${action.type}</span>
                                    </div>
                                    <p class="text-sm text-muted-foreground mt-1">${action.result}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Daily Reflection -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">今日のふりかえり</h3>
                    <p class="text-sm text-muted-foreground">今日の活動を振り返って記録しましょう</p>
                </div>
                <div class="card-content space-y-4">
                    <div>
                        <label class="text-sm font-medium text-green-700">✓ よかったこと</label>
                        <textarea id="daily-good" class="w-full mt-1 p-3 border border-green-200 bg-green-50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="今日うまくいったことを記録してください...">${latestDaily.reflection.good}</textarea>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-orange-700">△ 課題・改善点</label>
                        <textarea id="daily-challenge" class="w-full mt-1 p-3 border border-orange-200 bg-orange-50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" rows="3" placeholder="改善できる点や課題を記録してください...">${latestDaily.reflection.challenge}</textarea>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-blue-700">→ 明日やること</label>
                        <textarea id="daily-next" class="w-full mt-1 p-3 border border-blue-200 bg-blue-50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="3" placeholder="明日の具体的なアクションを記録してください...">${latestDaily.reflection.next}</textarea>
                    </div>
                    <div class="flex space-x-2 pt-4">
                        <button onclick="saveDailyReflection()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
                                <polyline points="9,11 12,14 22,4"/>
                            </svg>
                            ふりかえりを保存
                        </button>
                        <button onclick="clearDailyReflection()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="1,4 1,10 7,10"/>
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                            </svg>
                            リセット
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Add New Action -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">新しいアクションを追加</h3>
                    <p class="text-sm text-muted-foreground">今日実施したアクションを記録しましょう</p>
                </div>
                <div class="card-content space-y-4">
                    <div class="grid gap-4 md:grid-cols-3">
                        <div>
                            <label class="text-sm font-medium">時間</label>
                            <input id="action-time" type="time" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="時間">
                        </div>
                        <div>
                            <label class="text-sm font-medium">アクション内容</label>
                            <input id="action-content" type="text" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="実施したアクション">
                        </div>
                        <div>
                            <label class="text-sm font-medium">種類</label>
                            <select id="action-type" class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                                <option value="meeting">会議</option>
                                <option value="work">作業</option>
                                <option value="research">調査</option>
                                <option value="planning">企画</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm font-medium">結果・成果</label>
                        <textarea id="action-result" class="mt-1 w-full p-3 border border-input bg-background rounded-md text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" rows="2" placeholder="どのような結果や成果が得られましたか？"></textarea>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="addDailyAction()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                            <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            アクションを追加
                        </button>
                        <button onclick="clearActionForm()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                            クリア
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderWeeklyReflection() {
    const latestWeekly = reflectionData.weekly[0];
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">週次ふりかえり</h2>
                <div class="text-sm text-muted-foreground">${latestWeekly.week} (${latestWeekly.period})</div>
            </div>
            
            <!-- Weekly Summary -->
            <div class="grid gap-6 md:grid-cols-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">今週の成果</h3>
                    </div>
                    <div class="card-content">
                        <p class="text-sm text-muted-foreground mb-3">${latestWeekly.dailySummary}</p>
                        <ul class="space-y-2">
                            ${latestWeekly.achievements.map(achievement => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-green-600 mt-0.5">✓</span>
                                    <span class="text-sm">${achievement}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">今週の課題</h3>
                    </div>
                    <div class="card-content">
                        <ul class="space-y-2">
                            ${latestWeekly.challenges.map(challenge => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-orange-600 mt-0.5">△</span>
                                    <span class="text-sm">${challenge}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- KPI Progress -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">KPI進捗</h3>
                </div>
                <div class="card-content">
                    <div class="grid gap-4 md:grid-cols-3">
                        ${Object.entries(latestWeekly.kpiProgress).map(([kpi, data]) => `
                            <div class="p-3 border rounded-lg">
                                <h4 class="font-medium text-sm">${kpi}</h4>
                                <div class="mt-2">
                                    <div class="flex items-center justify-between text-sm">
                                        <span>${data.actual} / ${data.target}</span>
                                        <span class="font-medium">${data.progress}</span>
                                    </div>
                                    <div class="mt-1 w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${data.progress}"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Next Week Plan -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">来週の計画</h3>
                </div>
                <div class="card-content">
                    <ul class="space-y-2">
                        ${latestWeekly.nextWeekPlan.map(plan => `
                            <li class="flex items-start space-x-2">
                                <span class="text-blue-600 mt-0.5">→</span>
                                <span class="text-sm">${plan}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderMonthlyReflection() {
    const latestMonthly = reflectionData.monthly[0];
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">月次ふりかえり</h2>
                <div class="text-sm text-muted-foreground">${latestMonthly.month} (${latestMonthly.period})</div>
            </div>
            
            <!-- Monthly Overview -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">月間サマリー</h3>
                </div>
                <div class="card-content">
                    <p class="text-muted-foreground mb-4">${latestMonthly.weeklySummary}</p>
                    <div class="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 class="font-medium text-green-700 mb-3">🎯 主要な成果</h4>
                            <ul class="space-y-2">
                                ${latestMonthly.majorAchievements.map(achievement => `
                                    <li class="flex items-start space-x-2">
                                        <span class="text-green-600 mt-0.5">✓</span>
                                        <span class="text-sm">${achievement}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-medium text-orange-700 mb-3">🚧 主要な課題</h4>
                            <ul class="space-y-2">
                                ${latestMonthly.mainChallenges.map(challenge => `
                                    <li class="flex items-start space-x-2">
                                        <span class="text-orange-600 mt-0.5">△</span>
                                        <span class="text-sm">${challenge}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Monthly KPI -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">月間KPI実績</h3>
                </div>
                <div class="card-content">
                    <div class="grid gap-4 md:grid-cols-3">
                        ${Object.entries(latestMonthly.kpiSummary).map(([kpi, data]) => `
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-medium">${kpi}</h4>
                                <div class="mt-2">
                                    <div class="text-2xl font-bold">${data.actual}</div>
                                    <div class="text-sm text-muted-foreground">目標: ${data.target}</div>
                                    <div class="text-sm font-medium text-green-600">${data.growth}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Project Status -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">プロジェクト状況</h3>
                </div>
                <div class="card-content">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-medium">Try プロジェクト</h4>
                            <div class="mt-2">
                                <span class="text-2xl font-bold">${latestMonthly.projectStatus.try.count}</span>
                                <span class="text-sm text-muted-foreground ml-2">件実施</span>
                                <div class="text-sm text-green-600">うち${latestMonthly.projectStatus.try.promoted}件をPlanに昇格</div>
                            </div>
                        </div>
                        <div class="p-4 border rounded-lg">
                            <h4 class="font-medium">Plan プロジェクト</h4>
                            <div class="mt-2">
                                <span class="text-2xl font-bold">${latestMonthly.projectStatus.plan.count}</span>
                                <span class="text-sm text-muted-foreground ml-2">件実施中</span>
                                <div class="text-sm text-blue-600">${latestMonthly.projectStatus.plan.completed}件完了</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Next Month Focus -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">来月の重点事項</h3>
                </div>
                <div class="card-content">
                    <ul class="space-y-2">
                        ${latestMonthly.nextMonthFocus.map(focus => `
                            <li class="flex items-start space-x-2">
                                <span class="text-blue-600 mt-0.5">→</span>
                                <span class="text-sm">${focus}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderYearlyReflection() {
    const latestYearly = reflectionData.yearly[0];
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">年次ふりかえり</h2>
                <div class="text-sm text-muted-foreground">${latestYearly.year} (${latestYearly.period})</div>
            </div>
            
            <!-- Annual Overview -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">年間総括</h3>
                </div>
                <div class="card-content">
                    <p class="text-muted-foreground mb-6">${latestYearly.monthlySummary}</p>
                    
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-medium text-green-700 mb-3">🏆 年間主要成果</h4>
                            <div class="grid gap-3 md:grid-cols-2">
                                ${latestYearly.annualAchievements.map(achievement => `
                                    <div class="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                                        <span class="text-green-600 mt-0.5">✓</span>
                                        <span class="text-sm">${achievement}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-medium text-blue-700 mb-3">💡 年間で得た学び</h4>
                            <div class="space-y-2">
                                ${latestYearly.yearlyLessons.map(lesson => `
                                    <div class="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                                        <span class="text-blue-600 mt-0.5">💡</span>
                                        <span class="text-sm">${lesson}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Annual KPI Achievement -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">年間KPI達成状況</h3>
                </div>
                <div class="card-content">
                    <div class="grid gap-4 md:grid-cols-2">
                        ${Object.entries(latestYearly.annualKPI).map(([kpi, data]) => `
                            <div class="p-4 border rounded-lg">
                                <h4 class="font-medium">${kpi}</h4>
                                <div class="mt-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-2xl font-bold">${data.actual}</span>
                                        <span class="text-lg font-semibold ${data.achievement >= '100%' ? 'text-green-600' : 'text-orange-600'}">${data.achievement}</span>
                                    </div>
                                    <div class="text-sm text-muted-foreground">目標: ${data.target}</div>
                                    <div class="mt-2 w-full bg-gray-200 rounded-full h-3">
                                        <div class="bg-${data.achievement >= '100%' ? 'green' : 'orange'}-600 h-3 rounded-full" style="width: ${Math.min(parseFloat(data.achievement), 100)}%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Next Year Vision -->
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">来年のビジョン</h3>
                </div>
                <div class="card-content">
                    <div class="space-y-2">
                        ${latestYearly.nextYearVision.map(vision => `
                            <div class="flex items-start space-x-2 p-3 border rounded-lg">
                                <span class="text-purple-600 mt-0.5">🚀</span>
                                <span class="text-sm">${vision}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Period switching and action functions
function switchReflectionPeriod(period) {
    // Update tab appearance
    document.querySelectorAll('.reflection-tab').forEach(tab => {
        tab.classList.remove('border-primary', 'text-primary');
        tab.classList.add('border-transparent', 'text-muted-foreground');
    });
    
    const activeTab = document.querySelector(`[data-period="${period}"]`);
    if (activeTab) {
        activeTab.classList.remove('border-transparent', 'text-muted-foreground');
        activeTab.classList.add('border-primary', 'text-primary');
    }
    
    // Update content
    const contentContainer = document.getElementById('reflection-content');
    switch(period) {
        case 'daily':
            contentContainer.innerHTML = renderDailyReflection();
            break;
        case 'weekly':
            contentContainer.innerHTML = renderWeeklyReflection();
            break;
        case 'monthly':
            contentContainer.innerHTML = renderMonthlyReflection();
            break;
        case 'yearly':
            contentContainer.innerHTML = renderYearlyReflection();
            break;
    }
}

function addDailyAction() {
    const time = document.getElementById('action-time')?.value;
    const content = document.getElementById('action-content')?.value;
    const type = document.getElementById('action-type')?.value;
    const result = document.getElementById('action-result')?.value;
    
    if (!time || !content || !result) {
        alert('すべての項目を入力してください');
        return;
    }
    
    // Add to reflection data (in a real app, this would save to backend)
    const newAction = {
        time: time,
        action: content,
        result: result,
        type: type
    };
    
    reflectionData.daily[0].actions.unshift(newAction);
    
    // Clear form
    clearActionForm();
    
    // Refresh the daily reflection view
    switchReflectionPeriod('daily');
    
    alert('アクションが追加されました！');
}

function clearActionForm() {
    document.getElementById('action-time').value = '';
    document.getElementById('action-content').value = '';
    document.getElementById('action-type').selectedIndex = 0;
    document.getElementById('action-result').value = '';
}

function saveDailyReflection() {
    const good = document.getElementById('daily-good')?.value;
    const challenge = document.getElementById('daily-challenge')?.value;
    const next = document.getElementById('daily-next')?.value;
    
    if (!good && !challenge && !next) {
        alert('少なくとも一つの項目を入力してください');
        return;
    }
    
    // Update reflection data (in a real app, this would save to backend)
    reflectionData.daily[0].reflection = {
        good: good || reflectionData.daily[0].reflection.good,
        challenge: challenge || reflectionData.daily[0].reflection.challenge,
        next: next || reflectionData.daily[0].reflection.next
    };
    
    alert('今日のふりかえりが保存されました！');
}

function clearDailyReflection() {
    if (confirm('ふりかえりの内容をリセットしますか？')) {
        document.getElementById('daily-good').value = '';
        document.getElementById('daily-challenge').value = '';
        document.getElementById('daily-next').value = '';
    }
}

function saveSummary() {
    alert('ふりかえりが保存されました');
}

function promoteSelectedToNext() {
    alert('選択された項目が次期プランに反映されました');
}

// Expose to global scope
window.renderSummary = renderSummary;
window.switchReflectionPeriod = switchReflectionPeriod;
window.addDailyAction = addDailyAction;
window.clearActionForm = clearActionForm;
window.saveDailyReflection = saveDailyReflection;
window.clearDailyReflection = clearDailyReflection;
window.saveSummary = saveSummary;
window.promoteSelectedToNext = promoteSelectedToNext;