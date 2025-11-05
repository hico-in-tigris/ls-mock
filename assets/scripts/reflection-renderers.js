// ===============================
// LocalSuccess - Reflection Renderers
// ===============================

function renderDailyReflection() {
    // 過去7日分のふりかえりデータを取得
    const dailyReflections = reflectionData.daily.slice(0, 7);
    
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">ひとこと日記</h2>
                <button onclick="addDailyReflection()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    今日の振り返りを追加
                </button>
            </div>
            
            <!-- Daily Reflections List -->
            <div class="space-y-4">
                ${dailyReflections.map(daily => `
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">${daily.date}</h3>
                        </div>
                        <div class="card-content space-y-3">
                            ${daily.reflection.good ? `
                                <div>
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="text-green-600 font-medium text-sm">✓ Good</span>
                                    </div>
                                    <p class="text-sm text-muted-foreground pl-5">${daily.reflection.good}</p>
                                </div>
                            ` : ''}
                            
                            ${daily.reflection.challenge ? `
                                <div>
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="text-orange-600 font-medium text-sm">△ More</span>
                                    </div>
                                    <p class="text-sm text-muted-foreground pl-5">${daily.reflection.challenge}</p>
                                </div>
                            ` : ''}
                            
                            ${daily.reflection.next ? `
                                <div>
                                    <div class="flex items-center space-x-2 mb-1">
                                        <span class="text-blue-600 font-medium text-sm">→ Next</span>
                                    </div>
                                    <p class="text-sm text-muted-foreground pl-5">${daily.reflection.next}</p>
                                </div>
                            ` : ''}
                            
                            ${!daily.reflection.good && !daily.reflection.challenge && !daily.reflection.next ? `
                                <p class="text-sm text-muted-foreground text-center py-4">まだ振り返りがありません</p>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${dailyReflections.length === 0 ? `
                <div class="card">
                    <div class="card-content text-center py-12">
                        <svg class="h-16 w-16 mx-auto mb-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 4v16m8-8H4"/>
                        </svg>
                        <p class="text-muted-foreground mb-4">まだ振り返りがありません</p>
                        <button onclick="addDailyReflection()" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                            最初の振り返りを追加
                        </button>
                    </div>
                </div>
            ` : ''}
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

// Expose to global scope
window.renderDailyReflection = renderDailyReflection;
window.renderWeeklyReflection = renderWeeklyReflection;
window.renderMonthlyReflection = renderMonthlyReflection;
window.renderYearlyReflection = renderYearlyReflection;