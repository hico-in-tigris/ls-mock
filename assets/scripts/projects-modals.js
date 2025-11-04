// ===============================
// LocalSuccess - Project Pipeline Modal Components
// ===============================

// アイコン定義（共通アイコンライブラリより）
const ModalIcons = {
    lightbulb: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
    puzzle: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1z"/></svg>`,
    target: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-7 3-3 7-4-9z"/></svg>`,
    users: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    check: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
};

/**
 * プロジェクトワークスペースモーダル（ウィザード形式）
 * @param {string} stage - 現在のステップ（ideation, planning, goal-setting, stakeholder, proposal）
 * @returns {Object} モーダル管理オブジェクト
 */
function createProjectWorkspaceModal(stage = 'ideation') {
    const modalId = 'project-modal'; // 既存のIDを維持
    
    // 既存のモーダルを削除
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 z-50 hidden';
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/50" onclick="closeProjectWorkspaceModal()"></div>
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-7xl bg-background shadow-lg border border-border rounded-lg max-h-[95vh] overflow-y-auto">
            <div id="modal-content"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    return {
        open: () => openProjectWorkspaceModal(stage),
        close: closeProjectWorkspaceModal,
        updateContent: (newStage) => updateWorkspaceModalContent(newStage),
        element: modal
    };
}

/**
 * ワークスペースモーダルを開く
 * @param {string} stage - ステップ
 */
function openProjectWorkspaceModal(stage = 'ideation') {
    const modal = document.getElementById('project-modal');
    if (!modal) {
        createProjectWorkspaceModal(stage);
        return;
    }
    
    updateWorkspaceModalContent(stage);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // ステップ固有の初期化処理
    setTimeout(() => {
        if (typeof updateWizardProgress === 'function') {
            updateWizardProgress(stage);
        }
        
        if (stage === 'stakeholder' && typeof generateStakeholderMatrix === 'function') {
            generateStakeholderMatrix();
        }
    }, 100);
}

/**
 * ワークスペースモーダルを閉じる
 */
function closeProjectWorkspaceModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/**
 * ワークスペースモーダルのコンテンツを更新
 * @param {string} stage - ステップ
 */
function updateWorkspaceModalContent(stage) {
    const content = document.getElementById('modal-content');
    if (!content) return;
    
    let renderedContent = '';
    
    // 各ステップのレンダー関数が存在するかチェックして呼び出し
    switch (stage) {
        case 'ideation':
            renderedContent = typeof renderIdeationContent === 'function' ? renderIdeationContent() : '<p>アイデア整理機能を読み込んでいます...</p>';
            break;
        case 'planning':
            renderedContent = typeof renderPlanningContent === 'function' ? renderPlanningContent() : '<p>企画構成機能を読み込んでいます...</p>';
            break;
        case 'goal-setting':
            renderedContent = typeof renderGoalSettingContent === 'function' ? renderGoalSettingContent() : '<p>目標設定機能を読み込んでいます...</p>';
            break;
        case 'stakeholder':
            renderedContent = typeof renderStakeholderContent === 'function' ? renderStakeholderContent() : '<p>関係者分析機能を読み込んでいます...</p>';
            break;
        case 'proposal':
            renderedContent = typeof renderProposalContent === 'function' ? renderProposalContent() : '<p>提案作成機能を読み込んでいます...</p>';
            break;
        default:
            renderedContent = typeof renderIdeationContent === 'function' ? renderIdeationContent() : '<p>機能を読み込んでいます...</p>';
    }
    
    content.innerHTML = renderedContent;
}

/**
 * プロジェクト詳細モーダル
 * @param {Object} project - プロジェクトデータ
 * @returns {Object} モーダル管理オブジェクト
 */
function createProjectDetailModal(project) {
    const modalId = `project-detail-modal-${project.id}`;
    
    // 既存のモーダルを削除
    const existingModal = document.querySelector('.project-detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'project-detail-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = generateProjectDetailModalContent(project);
    
    // 背景クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    return {
        close: () => {
            modal.remove();
            document.body.style.overflow = '';
        },
        element: modal
    };
}

/**
 * プロジェクト詳細モーダルのコンテンツ生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} モーダルのHTML
 */
function generateProjectDetailModalContent(project) {
    return `
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-2xl font-bold">${project.title}</h2>
                        <p class="text-gray-600 mt-1">${project.description}</p>
                    </div>
                    <button onclick="this.closest('.project-detail-modal').remove(); document.body.style.overflow = '';" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-6 space-y-6">
                ${generateProgressSection(project)}
                ${generateGoalsSection(project)}
                ${generateKPIsSection(project)}
                ${generateTagsSection(project)}
                ${generateActionsSection(project)}
            </div>
        </div>
    `;
}

/**
 * 進捗セクション生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} 進捗セクションHTML
 */
function generateProgressSection(project) {
    if (!project.progress) return '';
    
    return `
        <div>
            <h3 class="text-lg font-semibold mb-3">進捗状況</h3>
            <div class="flex items-center space-x-4">
                <div class="flex-1">
                    <div class="w-full bg-gray-200 rounded-full h-4">
                        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full" style="width: ${project.progress}%"></div>
                    </div>
                </div>
                <span class="text-xl font-bold text-indigo-600">${project.progress}%</span>
            </div>
        </div>
    `;
}

/**
 * SMART目標セクション生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} 目標セクションHTML
 */
function generateGoalsSection(project) {
    if (!project.goals || Object.keys(project.goals).length === 0) return '';
    
    const goalItems = [
        { key: 'specific', label: '具体的', color: 'blue' },
        { key: 'measurable', label: '測定可能', color: 'green' },
        { key: 'achievable', label: '達成可能', color: 'yellow' },
        { key: 'relevant', label: '関連性', color: 'purple' },
        { key: 'timebound', label: '期限', color: 'red' }
    ].filter(item => project.goals[item.key]);
    
    return `
        <div>
            <h3 class="text-lg font-semibold mb-3">SMART目標</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${goalItems.map(item => `
                    <div class="p-3 bg-${item.color}-50 rounded-lg">
                        <strong>${item.label}:</strong> ${project.goals[item.key]}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * KPIセクション生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} KPIセクションHTML
 */
function generateKPIsSection(project) {
    if (!project.kpis || project.kpis.length === 0) return '';
    
    return `
        <div>
            <h3 class="text-lg font-semibold mb-3">重要業績評価指標 (KPI)</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                ${project.kpis.map(kpi => `
                    <div class="text-center p-4 border border-gray-200 rounded-lg">
                        <div class="text-2xl font-bold text-indigo-600">
                            ${kpi.target}${kpi.unit === 'percent' ? '%' : kpi.unit === 'number' ? '' : kpi.unit}
                        </div>
                        <div class="text-sm text-gray-600">${kpi.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * タグセクション生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} タグセクションHTML
 */
function generateTagsSection(project) {
    if (!project.tags || project.tags.length === 0) return '';
    
    return `
        <div>
            <h3 class="text-lg font-semibold mb-3">タグ</h3>
            <div class="flex flex-wrap gap-2">
                ${project.tags.map(tag => `
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${tag}</span>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * アクションセクション生成
 * @param {Object} project - プロジェクトデータ
 * @returns {string} アクションセクションHTML
 */
function generateActionsSection(project) {
    return `
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button onclick="this.closest('.project-detail-modal').remove(); document.body.style.overflow = '';" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                閉じる
            </button>
            <button onclick="editProject(${project.id})" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                編集する
            </button>
        </div>
    `;
}

/**
 * プロジェクト一覧モーダル
 * @param {Array} projects - プロジェクト配列
 * @returns {Object} モーダル管理オブジェクト
 */
function createProjectListModal(projects = []) {
    const modalId = 'project-list-modal';
    
    // 既存のモーダルを削除
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'fixed inset-0 z-50 hidden';
    modal.innerHTML = generateProjectListModalContent(projects);
    
    document.body.appendChild(modal);
    
    return {
        open: () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        },
        close: () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        },
        updateProjects: (newProjects) => {
            const content = modal.querySelector('.modal-content');
            if (content) {
                content.innerHTML = generateProjectListContent(newProjects);
            }
        },
        element: modal
    };
}

/**
 * プロジェクト一覧モーダルのコンテンツ生成
 * @param {Array} projects - プロジェクト配列
 * @returns {string} モーダルのHTML
 */
function generateProjectListModalContent(projects) {
    return `
        <div class="fixed inset-0 bg-black/50" onclick="closeModal('project-list-modal')"></div>
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl bg-background shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold">プロジェクト一覧</h2>
                    <button onclick="closeModal('project-list-modal')" class="text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="modal-content p-6">
                ${generateProjectListContent(projects)}
            </div>
        </div>
    `;
}

/**
 * プロジェクト一覧コンテンツ生成
 * @param {Array} projects - プロジェクト配列
 * @returns {string} プロジェクト一覧HTML
 */
function generateProjectListContent(projects) {
    if (projects.length === 0) {
        return `
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">プロジェクトがありません</h3>
                <p class="mt-1 text-sm text-gray-500">新しいプロジェクトを開始して企画を始めましょう。</p>
                <div class="mt-6">
                    <button onclick="openProjectWorkspaceModal('ideation')" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        新しいプロジェクト
                    </button>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${projects.map(project => `
                <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" onclick="showProjectDetailModal(${JSON.stringify(project).replace(/"/g, '&quot;')})">
                    <div class="flex items-start justify-between">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">${project.title}</h3>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${project.status || 'アクティブ'}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${project.description}</p>
                    ${project.progress ? `
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-1">
                                <span class="text-gray-600">進捗</span>
                                <span class="font-medium">${project.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: ${project.progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    <div class="flex flex-wrap gap-1">
                        ${project.tags ? project.tags.slice(0, 3).map(tag => `
                            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">${tag}</span>
                        `).join('') : ''}
                        ${project.tags && project.tags.length > 3 ? `
                            <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">+${project.tags.length - 3}</span>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * ヘルプモーダル
 * @param {string} step - 現在のステップ
 * @returns {Object} モーダル管理オブジェクト
 */
function createProjectHelpModal(step) {
    const modalId = 'project-help-modal';
    
    const helpContent = getStepHelpContent(step);
    
    return createModal({
        id: modalId,
        title: `${helpContent.title} - ヘルプ`,
        content: helpContent.content,
        actions: [
            {
                text: '閉じる',
                variant: 'outline',
                onClick: `closeModal('${modalId}')`
            }
        ],
        size: 'lg'
    });
}

/**
 * ステップごとのヘルプコンテンツ取得
 * @param {string} step - ステップ名
 * @returns {Object} ヘルプコンテンツ
 */
function getStepHelpContent(step) {
    const helpData = {
        ideation: {
            title: 'アイデア整理',
            content: `
                <div class="space-y-4">
                    <h4 class="font-semibold">このステップの目的</h4>
                    <p class="text-sm text-gray-600">プロジェクトの核となるアイデアを整理し、明確にします。</p>
                    
                    <h4 class="font-semibold">進め方</h4>
                    <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>解決したい課題や達成したい目標を明確にする</li>
                        <li>アイデアを自由に発想し、書き出す</li>
                        <li>類似のアイデアをグループ化する</li>
                        <li>実現可能性と影響度を考慮して優先順位をつける</li>
                    </ul>
                    
                    <h4 class="font-semibold">ヒント</h4>
                    <p class="text-sm text-gray-600">最初は批判せずに多くのアイデアを出すことが重要です。量から質は生まれます。</p>
                </div>
            `
        },
        planning: {
            title: '企画構成',
            content: `
                <div class="space-y-4">
                    <h4 class="font-semibold">このステップの目的</h4>
                    <p class="text-sm text-gray-600">アイデアを具体的な企画として構成し、実行可能な計画に落とし込みます。</p>
                    
                    <h4 class="font-semibold">進め方</h4>
                    <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>プロジェクトの全体像を描く</li>
                        <li>必要なリソースと制約を洗い出す</li>
                        <li>タイムラインとマイルストーンを設定する</li>
                        <li>リスクと対策を検討する</li>
                    </ul>
                </div>
            `
        },
        'goal-setting': {
            title: '目標設定',
            content: `
                <div class="space-y-4">
                    <h4 class="font-semibold">SMARTな目標設定</h4>
                    <ul class="text-sm text-gray-600 space-y-2 list-disc list-inside">
                        <li><strong>Specific（具体的）:</strong> 明確で具体的な目標</li>
                        <li><strong>Measurable（測定可能）:</strong> 数値で測定できる</li>
                        <li><strong>Achievable（達成可能）:</strong> 現実的に達成可能</li>
                        <li><strong>Relevant（関連性）:</strong> 事業や組織の目標と関連</li>
                        <li><strong>Time-bound（期限）:</strong> 明確な期限がある</li>
                    </ul>
                </div>
            `
        },
        stakeholder: {
            title: '関係者分析',
            content: `
                <div class="space-y-4">
                    <h4 class="font-semibold">関係者マッピング</h4>
                    <p class="text-sm text-gray-600">プロジェクトに影響を与える、または影響を受ける人・組織を特定し、その影響力と関心度を分析します。</p>
                    
                    <h4 class="font-semibold">分析の軸</h4>
                    <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li><strong>影響力:</strong> プロジェクトに対する影響力の大きさ</li>
                        <li><strong>関心度:</strong> プロジェクトへの関心の高さ</li>
                    </ul>
                </div>
            `
        },
        proposal: {
            title: '提案作成',
            content: `
                <div class="space-y-4">
                    <h4 class="font-semibold">効果的な提案書の構成</h4>
                    <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
                        <li>エグゼクティブサマリー</li>
                        <li>現状分析と課題</li>
                        <li>提案する解決策</li>
                        <li>実行計画とタイムライン</li>
                        <li>必要リソースと予算</li>
                        <li>期待される成果とROI</li>
                    </ul>
                </div>
            `
        }
    };
    
    return helpData[step] || {
        title: 'ヘルプ',
        content: '<p class="text-sm text-gray-600">このステップのヘルプ情報は準備中です。</p>'
    };
}

// Global関数としてwindowオブジェクトに追加
if (typeof window !== 'undefined') {
    window.createProjectWorkspaceModal = createProjectWorkspaceModal;
    window.openProjectWorkspaceModal = openProjectWorkspaceModal;
    window.closeProjectWorkspaceModal = closeProjectWorkspaceModal;
    window.updateWorkspaceModalContent = updateWorkspaceModalContent;
    window.createProjectDetailModal = createProjectDetailModal;
    window.createProjectListModal = createProjectListModal;
    window.createProjectHelpModal = createProjectHelpModal;
    window.generateProjectDetailModalContent = generateProjectDetailModalContent;
    
    // プロジェクト詳細モーダル表示関数
    window.showProjectDetailModal = function(project) {
        return createProjectDetailModal(project);
    };
}