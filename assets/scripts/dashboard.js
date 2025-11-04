// ===============================
// LocalSuccess - Dashboard Module
// ===============================

function renderDashboard(container) {
    const overdueTasks = sampleData.actions.filter(a => 
        a.status !== 'Done' && new Date(a.deadline) < new Date()
    );
    
    const todayTasks = sampleData.actions.filter(a => {
        const today = new Date().toISOString().split('T')[0];
        return a.deadline === today;
    });
    
    const nextPlans = sampleData.projects.filter(p => p.status === 'Plan').slice(0, 3);
    
    // Follow-up analysis
    const peopleNeedingFollow = sampleData.people.filter(person => {
        const daysSinceContact = daysSince(person.lastContact);
        return daysSinceContact > 7;
    });
    
    const recentContacts = sampleData.people.filter(person => {
        const daysSinceContact = daysSince(person.lastContact);
        return daysSinceContact <= 3;
    }).slice(0, 3);
    
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
            
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                
                <!-- Follow-up Alerts -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">フォローアップ要</h3>
                        <p class="text-sm text-muted-foreground">連絡が必要な人たち</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${peopleNeedingFollow.length > 0 ? peopleNeedingFollow.slice(0, 3).map(person => {
                            const daysSinceContact = daysSince(person.lastContact);
                            return `
                                <div class="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar avatar-sm">${person.avatar}</div>
                                        <div>
                                            <p class="text-sm font-medium">${getMaskedName(person.name)}</p>
                                            <p class="text-xs text-orange-600">${daysSinceContact}日前</p>
                                        </div>
                                    </div>
                                    <button onclick="createFollowAction(${person.id})" class="text-xs bg-orange-600 text-white px-2 py-1 rounded">
                                        連絡
                                    </button>
                                </div>
                            `;
                        }).join('') : '<p class="text-sm text-muted-foreground">すべて最新です</p>'}
                    </div>
                </div>
                
                <!-- Recent Contacts -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">最近の連絡</h3>
                        <p class="text-sm text-muted-foreground">直近の活動</p>
                    </div>
                    <div class="card-content space-y-3">
                        ${recentContacts.map(person => {
                            const daysSinceContact = daysSince(person.lastContact);
                            return `
                                <div class="flex items-center space-x-3 p-3 rounded-lg border border-green-200 bg-green-50">
                                    <div class="avatar avatar-sm">${person.avatar}</div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">${getMaskedName(person.name)}</p>
                                        <p class="text-xs text-green-600">${daysSinceContact === 0 ? '今日' : daysSinceContact + '日前'}</p>
                                    </div>
                                    <button onclick="copyLastConversation(${person.id})" class="text-xs border border-green-300 px-2 py-1 rounded">
                                        会話
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
            
            <div class="grid gap-6 md:grid-cols-2 mt-6">
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

// Follow-up functions integrated from follow.js
function copyLastConversation(personId) {
    const person = getPersonById(personId);
    const mockConversation = `前回の${getMaskedName(person.name)}さんとの会話内容がクリップボードにコピーされました。`;
    
    navigator.clipboard.writeText(mockConversation).then(() => {
        alert('前回の会話内容をクリップボードにコピーしました');
    });
}

function createFollowAction(personId) {
    const person = getPersonById(personId);
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}さんにフォローアップ連絡`,
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
    
    alert('フォローアップアクションが作成されました！');
    renderCurrentRoute();
}

// Expose to global scope
window.renderDashboard = renderDashboard;
window.copyLastConversation = copyLastConversation;
window.createFollowAction = createFollowAction;