// ===============================
// LocalSuccess - Projects Main Module
// プロジェクトのメイン画面とウィザード制御
// ===============================

function renderProjects(container) {
    const headerButtons = [
        createButton({
            text: '企画ワークスペース',
            variant: 'secondary',
            icon: Icons.lightbulb,
            onClick: 'openIdeationWorkspace()'
        }),
        createButton({
            text: '新規プロジェクト',
            variant: 'primary',
            icon: Icons.star,
            onClick: 'generateAIOutline()'
        }),
        createButton({
            text: '全プロジェクト一覧',
            variant: 'secondary',
            icon: Icons.list,
            onClick: 'openProjectList()'
        })
    ];

    const wizardSteps = [
        { title: 'アイデア整理', onClick: 'selectWizardStep("ideation")' },
        { title: '企画構成', onClick: 'selectWizardStep("planning")' },
        { title: '目標設定', onClick: 'selectWizardStep("goal-setting")' },
        { title: '関係者分析', onClick: 'selectWizardStep("stakeholder")' },
        { title: '提案作成', onClick: 'selectWizardStep("proposal")' }
    ];

    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
            ${createHeaderCard({
                title: 'プロジェクト',
                description: '企画から実行まで、プロジェクトライフサイクル全体をサポート',
                actions: headerButtons.join('')
            })}

            <!-- Project Planning Pipeline -->
            ${createCard({
                header: {
                    title: 'プロジェクト企画パイプライン',
                    description: '想いから実行まで、段階的にプロジェクトを形にしていきます'
                },
                content: `
                    ${createWizard(wizardSteps, 0)}
                    
                    <!-- Current Step Details -->
                    <div class="space-y-4">
                        <div id="wizard-step-detail" class="text-center p-6 rounded-lg bg-blue-50 border border-blue-200">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                ${Icons.lightbulb}
                            </div>
                            <h3 class="text-lg font-semibold mb-2 text-blue-800">ステップ1: アイデア整理</h3>
                            <p class="text-blue-600 mb-4">アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。</p>
                            <div class="flex justify-center gap-3">
                                ${createButton({
                                    text: 'アイデアを整理する',
                                    variant: 'primary',
                                    onClick: 'openIdeationWorkspace("ideation")'
                                })}
                                ${createButton({
                                    text: '次のステップへ',
                                    variant: 'secondary',
                                    onClick: 'proceedToNextStep("ideation")'
                                })}
                            </div>
                        </div>
                    </div>
                `
            })}

            <!-- Quick Actions -->
            ${createCard({
                header: {
                    title: 'クイックアクション',
                    description: '今すぐ始められるプロジェクト活動'
                },
                content: `
                    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        ${createActionCard('💡', '新しいアイデア登録', 'アイデアを素早く記録', 'registerNewIdea()')}
                        ${createActionCard('🎯', '目標設定', '明確な目標を設定', 'openGoalSetting()')}
                        ${createActionCard('👥', '関係者マップ', '関係者を整理', 'openStakeholderMapping()')}
                        ${createActionCard('📋', 'プロジェクト一覧', '進行中のプロジェクト', 'openProjectList()')}
                        ${createActionCard('📊', '進捗確認', 'プロジェクトの状況', 'openProgressTracking()')}
                        ${createActionCard('🤝', 'ネットワーク連携', '人脈を活用', 'openNetworkIntegration()')}
                    </div>
                `
            })}
        </div>
    `;
}

// プロジェクトワークスペース開閉機能（新しいモーダルコンポーネントを使用）
function openIdeationWorkspace(stage = 'ideation') {
    openProjectWorkspaceModal(stage);
}

function getStepActionText(stepNumber) {
    const actionTexts = {
        1: 'アイデアを整理する',
        2: '企画を構成する', 
        3: '目標を設定する',
        4: '関係者を分析する',
        5: '提案を作成する'
    };
    return actionTexts[stepNumber] || '開始する';
}

function getStepNumberFromStage(stage) {
    const stageToNumber = {
        'ideation': 1,
        'planning': 2,
        'goal-setting': 3,
        'stakeholder': 4,
        'proposal': 5
    };
    return stageToNumber[stage] || 1;
}

function getStageFromStepNumber(stepNumber) {
    const numberToStage = {
        1: 'ideation',
        2: 'planning',
        3: 'goal-setting',
        4: 'stakeholder',
        5: 'proposal'
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
            } else if (stage === 'proposal') {
                content = typeof renderProposalContent === 'function' ? renderProposalContent() : '';
            }
            
            if (content) {
                contentArea.innerHTML = content;
            } else {
                const stageNames = {
                    'ideation': 'アイデア整理',
                    'planning': '企画構成',
                    'goal-setting': '目標設定',
                    'stakeholder': '関係者分析',
                    'proposal': '提案作成'
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
        'goal-setting': { number: 3, title: '目標設定', icon: Icons.target, color: 'purple' },
        'stakeholder': { number: 4, title: '関係者分析', icon: Icons.users, color: 'orange' },
        'proposal': { number: 5, title: '提案作成', icon: Icons.check, color: 'red' }
    };

    const stepData = stepMapping[currentStep];
    if (!stepData) return;

    // Update step indicators
    for (let i = 1; i <= 5; i++) {
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
        3: '明確で測定可能な目標を設定し、成功の指標を定義しましょう。',
        4: 'プロジェクトに関わる関係者を特定し、影響度と関心度を分析しましょう。',
        5: 'これまでの検討結果をまとめて、説得力のある提案資料を作成しましょう。'
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
                ${stepData.number < 5 ? createButton({
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
    const steps = ['ideation', 'planning', 'goal-setting', 'stakeholder', 'proposal'];
    const currentIndex = steps.indexOf(currentStepName);
    return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
}

function showStepTransitionMessage(fromStep, toStep) {
    const stepTitles = {
        'ideation': 'アイデア整理',
        'planning': '企画構成',
        'goal-setting': '目標設定',
        'stakeholder': '関係者分析',
        'proposal': '提案作成'
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

// クイックアクション関数
function registerNewIdea() {
    openIdeationWorkspace('ideation');
}

function openGoalSetting() {
    openIdeationWorkspace('goal-setting');
}

function openStakeholderMapping() {
    openIdeationWorkspace('stakeholder');
}

function openProjectList() {
    // プロジェクト一覧画面を開く
    alert('プロジェクト一覧機能は開発中です');
}

function openProgressTracking() {
    // 進捗確認画面を開く
    alert('進捗確認機能は開発中です');
}

function openNetworkIntegration() {
    // ネットワーク連携画面を開く
    alert('ネットワーク連携機能は開発中です');
}

function generateAIOutline() {
    // AI企画生成機能
    alert('AI企画生成機能は開発中です');
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
    window.registerNewIdea = registerNewIdea;
    window.openGoalSetting = openGoalSetting;
    window.openStakeholderMapping = openStakeholderMapping;
    window.openProjectList = openProjectList;
    window.openProgressTracking = openProgressTracking;
    window.openNetworkIntegration = openNetworkIntegration;
    window.generateAIOutline = generateAIOutline;
}