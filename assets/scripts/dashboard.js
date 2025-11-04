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

// Expose to global scope
window.renderDashboard = renderDashboard;