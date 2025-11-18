// ===============================
// LocalSuccess - Projects Main Module
// プロジェクトのメイン画面とウィザード制御
// ===============================

function renderProjects(container) {
    // プロジェクト一覧を表示
    const projects = window.appState?.projects || window.sampleData?.projects || [];
    
    // ステータスでフィルタリング
    const planProjects = projects.filter(p => p.status === 'Plan');
    const tryProjects = projects.filter(p => p.status === 'Try');
    const doneProjects = projects.filter(p => p.status === 'Done');

    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
            <!-- Header -->
            <div class="flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-bold">プロジェクト</h1>
                    <p class="text-muted-foreground">企画から実行まで、プロジェクトライフサイクル全体をサポート</p>
                </div>
                <div class="flex gap-2">
                    <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" onclick="window.location.hash = '#/plan'">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        新規プロジェクト
                    </button>
                </div>
            </div>

            <!-- Plan Section -->
            <div class="card">
                <div class="border-b border-border p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <h2 class="text-lg font-semibold">企画段階のプロジェクト</h2>
                            <span class="badge badge-secondary">${planProjects.length}</span>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    ${planProjects.length > 0 ? `
                        <div class="grid gap-4 md:grid-cols-2">
                            ${planProjects.map(project => renderProjectCard(project)).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-muted-foreground">
                            <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            <p>企画段階のプロジェクトはありません</p>
                        </div>
                    `}
                </div>
            </div>

            <!-- Try Section -->
            <div class="card">
                <div class="border-b border-border p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <h2 class="text-lg font-semibold">実行中のプロジェクト</h2>
                            <span class="badge badge-warning">${tryProjects.length}</span>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    ${tryProjects.length > 0 ? `
                        <div class="grid gap-4 md:grid-cols-2">
                            ${tryProjects.map(project => renderProjectCard(project)).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-muted-foreground">
                            <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <p>実行中のプロジェクトはありません</p>
                        </div>
                    `}
                </div>
            </div>

            <!-- Done Section -->
            <div class="card">
                <div class="border-b border-border p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <h2 class="text-lg font-semibold">完了したプロジェクト</h2>
                            <span class="badge badge-success">${doneProjects.length}</span>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    ${doneProjects.length > 0 ? `
                        <div class="grid gap-4 md:grid-cols-2">
                            ${doneProjects.map(project => renderProjectCard(project)).join('')}
                        </div>
                    ` : `
                        <div class="text-center py-8 text-muted-foreground">
                            <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <p>完了したプロジェクトはありません</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

function renderProjectCard(project) {
    const relatedPeople = (project.relatedPeople || [])
        .map(id => (window.sampleData?.people || []).find(p => p.id === id))
        .filter(Boolean);
    
    return `
        <div class="card p-4 hover:shadow-md transition-shadow cursor-pointer" onclick="viewProjectDetail(${project.id})">
            <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-base">${escapeHtml(project.title)}</h3>
                <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
            </div>
            <p class="text-sm text-muted-foreground mb-3 line-clamp-2">${escapeHtml(project.purpose)}</p>
            ${project.kpi ? `
                <div class="flex items-center gap-2 mb-3">
                    <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span class="text-sm font-medium">${escapeHtml(project.kpi)}</span>
                </div>
            ` : ''}
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    ${(project.tags || []).slice(0, 2).map(tag => 
                        `<span class="tag tag-${tag.replace('#', '')}">${escapeHtml(tag)}</span>`
                    ).join('')}
                </div>
                ${relatedPeople.length > 0 ? `
                    <div class="flex -space-x-2">
                        ${relatedPeople.slice(0, 3).map(person => `
                            <div class="avatar avatar-sm border-2 border-white" title="${escapeHtml(person.name)}">
                                ${escapeHtml(person.avatar)}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function viewProjectDetail(projectId) {
    const project = (window.appState?.projects || window.sampleData?.projects || []).find(p => p.id === projectId);
    if (!project) return;
    
    const relatedPeople = (project.relatedPeople || [])
        .map(id => (window.sampleData?.people || []).find(p => p.id === id))
        .filter(Boolean);
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modal.onclick = (e) => {
        if (e.target === modal) closeProjectDetail();
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b border-border p-6 flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h2 class="text-2xl font-bold">${escapeHtml(project.title)}</h2>
                        <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                    </div>
                    <p class="text-muted-foreground">${escapeHtml(project.purpose)}</p>
                </div>
                <button onclick="closeProjectDetail()" class="text-muted-foreground hover:text-foreground transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            
            <!-- Content -->
            <div class="p-6">
                <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
                    <div class="space-y-6" data-ls-slot="main">
                <!-- Scope & KPI -->
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="card p-4">
                        <h3 class="font-semibold mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                            スコープ
                        </h3>
                        <p class="text-sm text-muted-foreground">${escapeHtml(project.scope)}</p>
                    </div>
                    
                    <div class="card p-4">
                        <h3 class="font-semibold mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                            KPI
                        </h3>
                        <p class="text-sm font-medium">${escapeHtml(project.kpi)}</p>
                    </div>
                </div>
                
                <!-- Tags & People -->
                <div class="flex flex-wrap gap-4">
                    ${project.tags && project.tags.length > 0 ? `
                        <div class="flex-1 min-w-[200px]">
                            <h3 class="font-semibold mb-2 text-sm">タグ</h3>
                            <div class="flex flex-wrap gap-2">
                                ${project.tags.map(tag => `<span class="tag tag-${tag.replace('#', '')}">${escapeHtml(tag)}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${relatedPeople.length > 0 ? `
                        <div class="flex-1 min-w-[200px]">
                            <h3 class="font-semibold mb-2 text-sm">関連する人物</h3>
                            <div class="flex flex-wrap gap-2">
                                ${relatedPeople.map(person => `
                                    <div class="flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted">
                                        <div class="avatar avatar-sm">${escapeHtml(person.avatar)}</div>
                                        <span class="text-sm">${escapeHtml(person.name)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <!-- Location Info -->
                ${project.location ? `
                    <div class="card p-4">
                        <h3 class="font-semibold mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            活動場所
                        </h3>
                        <div class="space-y-1 text-sm">
                            <p class="text-muted-foreground">${escapeHtml(project.location.address)}</p>
                            ${project.location.landmark ? `<p class="text-muted-foreground">📍 ${escapeHtml(project.location.landmark)}</p>` : ''}
                            ${project.location.scope ? `<p class="text-muted-foreground">範囲: ${escapeHtml(project.location.scope)}</p>` : ''}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Approach (if detailed project) -->
                ${project.approach ? `
                    <div class="card p-4">
                        <h3 class="font-semibold mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            アプローチ
                        </h3>
                        <p class="text-sm text-muted-foreground">${escapeHtml(project.approach)}</p>
                        ${project.currentPhase ? `<p class="text-sm font-medium mt-2">現在のフェーズ: ${escapeHtml(project.currentPhase)}</p>` : ''}
                    </div>
                ` : ''}
                
                <!-- KPT Logs -->
                ${project.kptLogs && project.kptLogs.length > 0 ? `
                    <div class="card p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            KPTログ
                        </h3>
                        <div class="space-y-2">
                            ${project.kptLogs.map(log => `
                                <div class="border-l-4 ${
                                    log.type === 'Keep' ? 'border-green-500 bg-green-50' :
                                    log.type === 'Problem' ? 'border-red-500 bg-red-50' :
                                    'border-blue-500 bg-blue-50'
                                } p-3 rounded-r">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="font-semibold text-sm ${
                                            log.type === 'Keep' ? 'text-green-700' :
                                            log.type === 'Problem' ? 'text-red-700' :
                                            'text-blue-700'
                                        }">${log.type}</span>
                                        <span class="text-xs text-muted-foreground">${log.date}</span>
                                    </div>
                                    <p class="text-sm">${escapeHtml(log.content)}</p>
                                    ${log.author ? `<p class="text-xs text-muted-foreground mt-1">by ${escapeHtml(log.author)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Milestones -->
                ${project.nextMilestones && project.nextMilestones.length > 0 ? `
                    <div class="card p-4">
                        <h3 class="font-semibold mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                            </svg>
                            次のマイルストーン
                        </h3>
                        <div class="space-y-2">
                            ${project.nextMilestones.map(m => `
                                <div class="flex items-start gap-3 p-2 rounded border border-border">
                                    <div class="flex-1">
                                        <div class="font-medium text-sm">${escapeHtml(m.title)}</div>
                                        <div class="text-xs text-muted-foreground mt-1">
                                            期限: ${m.deadline} | 担当: ${escapeHtml(m.responsible)}
                                        </div>
                                    </div>
                                    <span class="badge ${
                                        m.status === '完了' ? 'badge-success' :
                                        m.status === '進行中' ? 'badge-warning' :
                                        'badge-secondary'
                                    }">${m.status}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Metadata -->
                <div class="flex flex-wrap gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                    <div>作成日: ${project.createdAt}</div>
                    ${project.completedAt ? `<div>完了日: ${project.completedAt}</div>` : ''}
                    ${project.estimatedDuration ? `<div>期間: ${project.estimatedDuration}</div>` : ''}
                </div>
                    </div>
                    <aside class="ls-similar-panel-container space-y-4 mt-6 lg:mt-0" data-ls-slot="related">
                        <div id="ls-project-similar-${project.id}" class="ls-similar-panel-anchor"></div>
                    </aside>
                </div>
            </div>
            
            <!-- Footer Actions -->
            <div class="sticky bottom-0 bg-white border-t border-border p-4 flex justify-end gap-2">
                <button onclick="closeProjectDetail()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                    閉じる
                </button>
                <button onclick="editProject(${project.id})" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    編集
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const panelAnchor = modal.querySelector(`#ls-project-similar-${project.id}`);
    if (panelAnchor) {
        const mount = () => {
            if (window.LSSimilar) {
                window.LSSimilar.mountPanel({ container: panelAnchor, projectId: project.id });
            }
        };
        if (window.LSSimilar) {
            mount();
        } else {
            document.addEventListener('ls-similar-ready', mount, { once: true });
        }
    }
    document.body.style.overflow = 'hidden';
}

function closeProjectDetail() {
    const modal = document.querySelector('.fixed.inset-0.bg-black');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function editProject(projectId) {
    closeProjectDetail();
    showNotification('プロジェクト編集機能は実装予定です', 'info');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// プロジェクトワークスペース開閉機能（新しいモーダルコンポーネントを使用）
function openIdeationWorkspace(stage = 'ideation') {
    openProjectWorkspaceModal(stage);
}

function getStepActionText(stepNumber) {
    const actionTexts = {
        1: 'アイデアを整理する',
        2: '企画を構成する', 
        3: '関係者を分析する',
        4: '目標を設定する',
        5: '予算/スケジュールを作る',
        6: '資料を作成する'
    };
    return actionTexts[stepNumber] || '開始する';
}

function getStepNumberFromStage(stage) {
    const stageToNumber = {
        'ideation': 1,
        'planning': 2,
        'stakeholder': 3,
        'goal-setting': 4,
        'budget': 5,
        'proposal': 6
    };
    return stageToNumber[stage] || 1;
}

function getStageFromStepNumber(stepNumber) {
    const numberToStage = {
        1: 'ideation',
        2: 'planning',
        3: 'stakeholder',
        4: 'goal-setting',
        5: 'budget',
        6: 'proposal'
    };
    return numberToStage[stepNumber] || 'ideation';
}

function toggleStepContent(stage) {
    console.log('toggleStepContent called with stage:', stage);
    
    const contentArea = document.getElementById(`step-content-${stage}`);
    const allContentAreas = document.querySelectorAll('.step-content-area');
    
    console.log('Content area found:', contentArea);
    console.log('All content areas:', allContentAreas);
    
    // 他のコンテンツエリアを閉じる
    allContentAreas.forEach(area => {
        if (area.id !== `step-content-${stage}`) {
            area.classList.add('hidden');
        }
    });
    
    if (contentArea.classList.contains('hidden')) {
        // コンテンツを展開
        contentArea.classList.remove('hidden');
        loadStepContent(stage, contentArea);
        
        // ボタンテキストを「閉じる」に変更
        updateStepButton(stage, '閉じる', `toggleStepContent('${stage}')`);
        
        // スムーズにスクロール
        setTimeout(() => {
            contentArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // コンテンツを閉じる
        contentArea.classList.add('hidden');
        
        // ボタンテキストを元に戻す
        const stepNumber = getStepNumberFromStage(stage);
        const originalText = getStepActionText(stepNumber);
        updateStepButton(stage, originalText, `toggleStepContent('${stage}')`);
    }
}

function loadStepContent(stage, contentArea) {
    // ローディング表示
    contentArea.innerHTML = `
        <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="ml-3 text-gray-600">コンテンツを読み込み中...</span>
        </div>
    `;
    
    // 各ステップのコンテンツを動的に読み込み
    setTimeout(() => {
        let content = '';
        
        try {
            if (stage === 'ideation') {
                content = typeof renderIdeationContent === 'function' ? renderIdeationContent() : '';
            } else if (stage === 'planning') {
                content = typeof renderPlanningContent === 'function' ? renderPlanningContent() : '';
            } else if (stage === 'goal-setting') {
                content = typeof renderGoalSettingContent === 'function' ? renderGoalSettingContent() : '';
            } else if (stage === 'stakeholder') {
                content = typeof renderStakeholderContent === 'function' ? renderStakeholderContent() : '';
            } else if (stage === 'budget') {
                content = typeof renderBudgetContent === 'function' ? renderBudgetContent() : '';
            } else if (stage === 'proposal') {
                content = typeof renderProposalContent === 'function' ? renderProposalContent() : '';
            }
            
            if (content) {
                contentArea.innerHTML = content;
            } else {
                const stageNames = {
                    'ideation': 'アイデア整理',
                    'planning': '企画構成',
                    'stakeholder': '関係者分析',
                    'goal-setting': '目標設定',
                    'budget': '予算/スケジュール',
                    'proposal': '資料作成'
                };
                
                contentArea.innerHTML = `
                    <div class="text-center py-8">
                        <div class="mb-4">
                            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">${stageNames[stage] || 'このステップ'}</h3>
                        <p class="text-gray-600">コンテンツの準備中です。しばらくお待ちください。</p>
                        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            ページを更新
                        </button>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading step content:', error);
            contentArea.innerHTML = `
                <div class="text-center py-8">
                    <div class="mb-4">
                        <svg class="w-12 h-12 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-red-700 mb-2">エラーが発生しました</h3>
                    <p class="text-gray-600 mb-4">コンテンツの読み込み中にエラーが発生しました。</p>
                    <button onclick="location.reload()" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        ページを更新
                    </button>
                </div>
            `;
        }
    }, 300);
}

function updateStepButton(stage, text, onClick) {
    // 対象のステップの「開始する」/「閉じる」ボタンを見つけて更新
    const stepContentId = `step-content-${stage}`;
    const stepContentArea = document.getElementById(stepContentId);
    
    if (!stepContentArea) return;
    
    // 親要素を辿ってステップコンテナを見つける
    const stepContainer = stepContentArea.closest('.text-center');
    if (!stepContainer) return;
    
    // ボタンを探す
    const buttons = stepContainer.querySelectorAll('button');
    buttons.forEach(button => {
        const currentOnClick = button.getAttribute('onclick');
        const buttonText = button.textContent.trim();
        
        // このボタンが対象のステップのアクションボタンかを判定
        const isTargetButton = currentOnClick && currentOnClick.includes(`toggleStepContent('${stage}')`) ||
            buttonText === '開始する' || buttonText === '閉じる' ||
            buttonText === 'アイデアを整理する' || buttonText === '企画を構成する' ||
            buttonText === '目標を設定する' || buttonText === '関係者を分析する' ||
            buttonText === '提案を作成する';
        
        if (isTargetButton) {
            button.textContent = text;
            button.setAttribute('onclick', onClick);
            
            // ボタンスタイルの更新
            if (text === '閉じる') {
                button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                button.classList.add('bg-gray-600', 'hover:bg-gray-700');
            } else {
                button.classList.remove('bg-gray-600', 'hover:bg-gray-700');
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }
        }
    });
}

function closeIdeationWorkspace() {
    closeProjectWorkspaceModal();
}

function renderIdeationWorkspace(stage = 'ideation') {
    if (stage === 'ideation') {
        return renderIdeationContent();
    } else if (stage === 'planning') {
        return renderPlanningContent();
    } else if (stage === 'goal-setting') {
        return renderGoalSettingContent();
    } else if (stage === 'stakeholder') {
        return renderStakeholderContent();
    } else if (stage === 'proposal') {
        return renderProposalContent();
    }
    
    return renderIdeationContent();
}

// ウィザード制御機能
function updateWizardProgress(currentStep) {
    const stepMapping = {
        'ideation': { number: 1, title: 'アイデア整理', icon: Icons.lightbulb, color: 'blue' },
        'planning': { number: 2, title: '企画構成', icon: Icons.puzzle, color: 'green' },
        'stakeholder': { number: 3, title: '関係者分析', icon: Icons.users, color: 'orange' },
        'goal-setting': { number: 4, title: '目標設定', icon: Icons.target, color: 'purple' },
        'budget': { number: 5, title: '予算/スケジュール', icon: Icons.calendar || Icons.list, color: 'gray' },
        'proposal': { number: 6, title: '資料作成', icon: Icons.check, color: 'red' }
    };

    const stepData = stepMapping[currentStep];
    if (!stepData) return;

    // Update step indicators
    for (let i = 1; i <= 6; i++) {
        const stepIcon = document.querySelector(`.wizard-step-number-${i}`);
        const checkIcon = document.querySelector(`.wizard-check-icon-${i}`);
        const stepCircle = stepIcon?.parentElement;
        
        if (stepIcon && stepCircle) {
            if (i < stepData.number) {
                // Completed step
                stepCircle.className = `w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110`;
                stepIcon.classList.add('hidden');
                if (checkIcon) checkIcon.classList.remove('hidden');
            } else if (i === stepData.number) {
                // Current step
                stepCircle.className = `w-12 h-12 rounded-full bg-${stepData.color}-500 text-white flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110`;
                stepIcon.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            } else {
                // Future step
                stepCircle.className = `w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110`;
                stepIcon.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            }
        }
    }

    // Update step detail content
    updateProjectStepDetail(stepData);
}

function updateProjectStepDetail(stepData) {
    const detailElement = document.getElementById('wizard-step-detail');
    if (!detailElement) return;

    const descriptions = {
        1: 'アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。',
        2: '想いを具体的な企画として構成し、フレームワークを使って体系化しましょう。',
        3: 'プロジェクトに関わる関係者を特定し、影響度と関心度を分析しましょう。',
        4: '明確で測定可能な目標を設定し、成功の指標を定義しましょう。',
        5: '費目別の予算とマイルストーンを設定し、実行計画を固めましょう。',
        6: 'これまでの検討結果をまとめて、説得力のある資料を作成しましょう。'
    };

    // ステップ番号から対応するstageを取得
    const stage = getStageFromStepNumber(stepData.number);
    const actionText = getStepActionText(stepData.number);

    detailElement.innerHTML = `
        <div class="text-center p-6 rounded-lg bg-${stepData.color}-50 border border-${stepData.color}-200">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-${stepData.color}-100 flex items-center justify-center">
                ${stepData.icon}
            </div>
            <h3 class="text-lg font-semibold mb-2 text-${stepData.color}-800">ステップ${stepData.number}: ${stepData.title}</h3>
            <p class="text-${stepData.color}-600 mb-4">${descriptions[stepData.number]}</p>
            <div class="flex justify-center gap-3">
                ${createButton({
                    text: actionText,
                    variant: 'primary',
                    onClick: `toggleStepContent('${stage}')`
                })}
                ${stepData.number < 6 ? createButton({
                    text: '次のステップへ',
                    variant: 'secondary',
                    onClick: `proceedToNextStep('${stage}')`
                }) : ''}
            </div>
        </div>
        
        <!-- 展開可能なコンテンツエリア -->
        <div id="step-content-${stage}" class="step-content-area hidden mt-6">
            <!-- ここに各ステップのコンテンツが動的に挿入されます -->
        </div>
    `;
}

function selectWizardStep(stepName) {
    const container = document.getElementById('main-content');
    if (container) {
        renderProjects(container);
        setTimeout(() => {
            updateWizardProgress(stepName);
        }, 100);
    }
}

function proceedToNextStep(currentStepName) {
    const nextStep = getNextStepName(currentStepName);
    if (nextStep) {
        showStepTransitionMessage(currentStepName, nextStep);
        setTimeout(() => {
            selectWizardStep(nextStep);
        }, 1500);
    }
}

function getNextStepName(currentStepName) {
    const steps = ['ideation', 'planning', 'stakeholder', 'goal-setting', 'budget', 'proposal'];
    const currentIndex = steps.indexOf(currentStepName);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
}

function showStepTransitionMessage(fromStep, toStep) {
    const stepTitles = {
        'ideation': 'アイデア整理',
        'planning': '企画構成',
        'stakeholder': '関係者分析',
        'goal-setting': '目標設定',
        'budget': '予算/スケジュール',
        'proposal': '資料作成'
    };

    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-100 border border-blue-200 text-blue-800 px-6 py-3 rounded-lg z-50 transition-all duration-300';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            ${Icons.arrow}
            <span>「${stepTitles[fromStep]}」から「${stepTitles[toStep]}」に進みます</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Windowオブジェクトに関数を公開
if (typeof window !== 'undefined') {
    window.renderProjects = renderProjects;
    window.openIdeationWorkspace = openIdeationWorkspace;
    window.closeIdeationWorkspace = closeIdeationWorkspace;
    window.toggleStepContent = toggleStepContent;
    window.loadStepContent = loadStepContent;
    // メイン関数をwindowオブジェクトに公開
    window.renderProjects = renderProjects;
    window.toggleStepContent = toggleStepContent;
    window.loadStepContent = loadStepContent;
    window.updateStepButton = updateStepButton;
    window.updateProjectStepDetail = updateProjectStepDetail;
    window.getStepActionText = getStepActionText;
    window.getStepNumberFromStage = getStepNumberFromStage;
    window.getStageFromStepNumber = getStageFromStepNumber;
    // renderIdeationWorkspaceはprojects-wizard.jsで定義されているものを使用
    // updateWizardProgress, selectWizardStep, proceedToNextStepはprojects-wizard.jsで定義されているものを使用
}

// ============== Overview Card (at-a-glance) ==============
function renderProjectOverviewCard() {
    try {
        const ideation = JSON.parse(localStorage.getItem('ideationData')||'{}');
        const planning = JSON.parse(localStorage.getItem('planningData')||'{}');
        const goal = JSON.parse(localStorage.getItem('goalData')||'{}');
        const stakeholder = JSON.parse(localStorage.getItem('stakeholderData')||'{}');
        const budget = JSON.parse(localStorage.getItem('budgetData')||'{}');
        const proposal = JSON.parse(localStorage.getItem('proposalData')||'{}');

        const has = (obj) => obj && Object.keys(obj).length > 0;
        const kpiCount = Array.isArray(goal.kpis)? goal.kpis.length : 0;
        const shCount = Array.isArray(stakeholder.stakeholders)? stakeholder.stakeholders.length : 0;
        const total = Array.isArray(budget.items)? budget.items.reduce((s,i)=> s + (Number(i.cost)||0), 0) : 0;

        return createCard({
            header: {
                title: 'プロジェクト内容の確認',
                description: 'ウィザードで入力中の内容をひと目で確認できます'
            },
            content: `
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">アイデア整理</div>
                        <div class="font-medium">${ideation.solution ? escapeHtml(ideation.solution).slice(0,60) : '—'}</div>
                    </div>
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">企画構成</div>
                        <div class="font-medium">${planning.type ? planning.type : '—'}</div>
                    </div>
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">関係者</div>
                        <div class="font-medium">${shCount} 名</div>
                    </div>
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">目標</div>
                        <div class="font-medium">${goal.smart?.specific ? escapeHtml(goal.smart.specific).slice(0,60) : '—'}</div>
                    </div>
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">KPI</div>
                        <div class="font-medium">${kpiCount} 件</div>
                    </div>
                    <div class="p-4 border rounded-md">
                        <div class="text-xs text-muted-foreground mb-1">予算合計</div>
                        <div class="font-medium">${total ? '¥'+ Number(total).toLocaleString('ja-JP') : '—'}</div>
                    </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${createButton({ text: 'アイデア', variant: 'secondary', onClick: "openIdeationWorkspace('ideation')" })}
                    ${createButton({ text: '企画', variant: 'secondary', onClick: "openIdeationWorkspace('planning')" })}
                    ${createButton({ text: '関係者', variant: 'secondary', onClick: "openIdeationWorkspace('stakeholder')" })}
                    ${createButton({ text: '目標', variant: 'secondary', onClick: "openIdeationWorkspace('goal-setting')" })}
                    ${createButton({ text: '予算/スケジュール', variant: 'secondary', onClick: "openIdeationWorkspace('budget')" })}
                    ${createButton({ text: '資料作成', variant: 'secondary', onClick: "openIdeationWorkspace('proposal')" })}
                </div>
            `
        });
    } catch(e) { return ''; }
}

function escapeHtml(text){return String(text||'').replace(/[&<>\"]/g, s=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[s]));}

if (typeof window !== 'undefined') {
    window.renderProjectOverviewCard = renderProjectOverviewCard;
}