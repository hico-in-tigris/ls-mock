// ===============================
// LocalSuccess - Projects Wizard Module
// ===============================

function updateWizardProgress(currentStep) {
    const steps = [
        { name: 'ideation', number: 1, title: 'アイデア整理', color: 'blue', icon: 'circle', description: 'アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。' },
        { name: 'planning', number: 2, title: '企画構成', color: 'green', icon: 'document', description: '想いを具体的な企画として構成し、フレームワークを使って体系化しましょう。' },
        { name: 'goal-setting', number: 3, title: '目標設定', color: 'purple', icon: 'target', description: '明確で測定可能な目標を設定し、成功の指標を定義しましょう。' },
        { name: 'stakeholder', number: 4, title: '関係者分析', color: 'orange', icon: 'users', description: 'プロジェクトに関わる関係者を特定し、影響度と関心度を分析しましょう。' },
        { name: 'proposal', number: 5, title: '提案作成', color: 'indigo', icon: 'presentation', description: 'これまでの検討結果をまとめて、説得力のある提案資料を作成しましょう。' }
    ];
    
    const currentStepIndex = steps.findIndex(step => step.name === currentStep);
    const completedSteps = JSON.parse(localStorage.getItem('wizardProgress') || '[]');
    
    // Update step indicators
    steps.forEach((step, index) => {
        const stepElement = document.querySelector(`.wizard-step-number-${step.number}`);
        const checkIcon = document.querySelector(`.wizard-check-icon-${step.number}`);
        const labelElement = stepElement?.closest('.flex').querySelector('.text-sm');
        
        if (stepElement && labelElement) {
            const circleElement = stepElement.parentElement;
            
            // Reset classes
            circleElement.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110';
            labelElement.className = 'text-sm font-medium text-center';
            
            if (completedSteps.includes(step.name)) {
                // Completed step
                circleElement.classList.add(`bg-${step.color}-500`, 'text-white');
                labelElement.classList.add(`text-${step.color}-600`);
                stepElement.classList.add('hidden');
                if (checkIcon) checkIcon.classList.remove('hidden');
            } else if (index === currentStepIndex) {
                // Current step
                circleElement.classList.add(`bg-${step.color}-500`, 'text-white');
                labelElement.classList.add(`text-${step.color}-600`);
                stepElement.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            } else {
                // Future step
                circleElement.classList.add('bg-gray-300', 'text-gray-600');
                labelElement.classList.add('text-gray-500');
                stepElement.classList.remove('hidden');
                if (checkIcon) checkIcon.classList.add('hidden');
            }
        }
    });
    
    // Update step detail section
    const currentStepData = steps[currentStepIndex];
    if (currentStepData) {
        updateStepDetail(currentStepData);
    }
    
    // Update progress text
    const progressText = document.getElementById('wizard-progress-text');
    if (progressText) {
        const completedCount = completedSteps.length;
        const totalSteps = steps.length;
        progressText.textContent = `ステップ ${currentStepIndex + 1} / ${totalSteps} - ${currentStepData.title}`;
    }
    
    // Update connector arrows color
    const arrows = document.querySelectorAll('.flex.items-center.mx-4');
    arrows.forEach((arrow, index) => {
        const line = arrow.querySelector('.h-0\\.5');
        const arrowIcon = arrow.querySelector('svg');
        
        if (index < currentStepIndex || completedSteps.length > index) {
            // Completed connection
            line.classList.remove('bg-gray-300');
            line.classList.add('bg-green-400');
            arrowIcon.classList.remove('text-gray-400');
            arrowIcon.classList.add('text-green-400');
        } else {
            // Future connection
            line.classList.remove('bg-green-400');
            line.classList.add('bg-gray-300');
            arrowIcon.classList.remove('text-green-400');
            arrowIcon.classList.add('text-gray-400');
        }
    });
}

function updateStepDetail(stepData) {
    const detailElement = document.getElementById('wizard-step-detail');
    if (!detailElement) return;
    
    const icons = {
        circle: `<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
        document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>`,
        target: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
        users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
        presentation: `<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`
    };
    
    // Get next step name
    const nextStepName = getNextStepName(stepData.name);
    
    detailElement.className = `text-center p-6 rounded-lg bg-${stepData.color}-50 border border-${stepData.color}-200`;
    detailElement.innerHTML = `
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-${stepData.color}-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-${stepData.color}-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${icons[stepData.icon]}
            </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2 text-${stepData.color}-800">ステップ${stepData.number}: ${stepData.title}</h3>
        <p class="text-${stepData.color}-600 mb-4">${stepData.description}</p>
        <div class="flex justify-center gap-3">
            <button class="design-btn px-6 py-2 bg-${stepData.color}-600 text-white rounded-md hover:bg-${stepData.color}-700 transition-colors" data-mode="${stepData.name}">
                開始する
            </button>
            ${stepData.name === 'proposal' ? `
                <button onclick="createProjectFromWizard()" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
                    プロジェクトを開始する
                </button>
            ` : nextStepName ? `
                <button onclick="proceedToNextStep('${stepData.name}')" class="px-6 py-2 border border-${stepData.color}-600 text-${stepData.color}-600 rounded-md hover:bg-${stepData.color}-50 transition-colors">
                    次のステップへ
                </button>
            ` : ''}
        </div>
    `;
}

// Select wizard step without opening modal
function selectWizardStep(stepName) {
    const steps = [
        { name: 'ideation', number: 1, title: 'アイデア整理', color: 'blue', icon: 'circle', description: 'アイデアや想いを整理して、プロジェクトの核となる部分を明確化しましょう。' },
        { name: 'planning', number: 2, title: '企画構成', color: 'green', icon: 'document', description: '想いを具体的な企画として構成し、フレームワークを使って体系化しましょう。' },
        { name: 'goal-setting', number: 3, title: '目標設定', color: 'purple', icon: 'target', description: '明確で測定可能な目標を設定し、成功の指標を定義しましょう。' },
        { name: 'stakeholder', number: 4, title: '関係者分析', color: 'orange', icon: 'users', description: 'プロジェクトに関わる関係者を特定し、影響度と関心度を分析しましょう。' },
        { name: 'proposal', number: 5, title: '提案作成', color: 'indigo', icon: 'presentation', description: 'これまでの検討結果をまとめて、説得力のある提案資料を作成しましょう。' }
    ];
    
    const selectedStep = steps.find(step => step.name === stepName);
    
    if (selectedStep) {
        updateStepDetail(selectedStep);
        updateWizardProgress(stepName);
    }
}

// Get next step name
function getNextStepName(currentStepName) {
    const stepOrder = ['ideation', 'planning', 'goal-setting', 'stakeholder', 'proposal'];
    const currentIndex = stepOrder.indexOf(currentStepName);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
}

// Proceed to next step
function proceedToNextStep(currentStepName) {
    const nextStepName = getNextStepName(currentStepName);
    if (nextStepName) {
        // Mark current step as completed
        markStepCompleted(currentStepName);
        
        // Move to next step
        selectWizardStep(nextStepName);
        
        // Show confirmation message (projects.js style)
        showStepTransitionMessage(currentStepName, nextStepName);
    }
}

// Show step transition message
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
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg>
            <span>「${stepTitles[fromStep]}」から「${stepTitles[toStep]}」に進みます</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function markStepCompleted(stepName) {
    const completedSteps = JSON.parse(localStorage.getItem('wizardProgress') || '[]');
    if (!completedSteps.includes(stepName)) {
        completedSteps.push(stepName);
        localStorage.setItem('wizardProgress', JSON.stringify(completedSteps));
    }
}

function getNextStep(currentStep) {
    const stepOrder = ['ideation', 'planning', 'goal-setting'];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
}

// Initialize wizard on page load
function initializeWizard() {
    updateWizardProgress('ideation');
    bindDesignButtons();
}

// Bind design button event listeners
function bindDesignButtons() {
    console.log('Binding design button event listeners');
    document.querySelectorAll('.design-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const mode = e.currentTarget.dataset.mode;
            if (!mode) {
                console.warn('design-btn に data-mode がありません', e.currentTarget);
                return;
            }
            console.log('Design button clicked with mode:', mode);
            openIdeationWorkspace(mode);
        });
    });
}

// Modal management functions - projects.jsの関数を使用
function openIdeationWorkspace(mode) {
    console.log('openIdeationWorkspace called with mode:', mode);
    
    if (!mode) {
        console.error('openIdeationWorkspace: mode が未指定です');
        return;
    }
    
    // projects-modals.jsのopenProjectWorkspaceModalを使用
    if (typeof openProjectWorkspaceModal === 'function') {
        openProjectWorkspaceModal(mode);
    } else {
        console.error('openProjectWorkspaceModal function not available');
    }
}

function closeIdeationWorkspace() {
    // projects-modals.jsのcloseProjectWorkspaceModalを使用
    if (typeof closeProjectWorkspaceModal === 'function') {
        closeProjectWorkspaceModal();
    } else {
        console.error('closeProjectWorkspaceModal function not available');
        // フォールバック
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
}

function renderIdeationWorkspace(mode) {
    console.log('renderIdeationWorkspace called with mode:', mode);
    
    if (!mode) {
        console.error('renderIdeationWorkspace: mode が未指定です');
        return '<div class="p-6"><p class="text-red-600">エラー: モードが指定されていません</p></div>';
    }
    
    // Check if required functions are available
    const requiredFunctions = {
        'ideation': 'renderIdeationContent',
        'planning': 'renderPlanningContent',
        'goal-setting': 'renderGoalSettingContent',
        'stakeholder': 'renderStakeholderContent',
        'proposal': 'renderProposalContent'
    };
    
    const functionName = requiredFunctions[mode];
    if (functionName && typeof window[functionName] !== 'function') {
        console.error(`Required function ${functionName} is not available`);
        return `<div class="p-6"><p class="text-red-600">エラー: ${functionName}関数が見つかりません。スクリプトの読み込み順序を確認してください。</p></div>`;
    }
    
    if (mode === 'ideation') {
        console.log('Rendering ideation content');
        return renderIdeationContent();
    } else if (mode === 'planning') {
        console.log('Rendering planning content');
        return renderPlanningContent();
    } else if (mode === 'goal-setting') {
        console.log('Rendering goal setting content');
        return renderGoalSettingContent();
    } else if (mode === 'stakeholder') {
        console.log('Rendering stakeholder content');
        return renderStakeholderContent();
    } else if (mode === 'proposal') {
        console.log('Rendering proposal content');
        return renderProposalContent();
    }
    
    console.warn('Unknown mode:', mode, 'Fallback to ideation content');
    return renderIdeationContent();
}

// Export functions to global scope
window.updateWizardProgress = updateWizardProgress;
window.updateStepDetail = updateStepDetail;
window.selectWizardStep = selectWizardStep;
window.getNextStepName = getNextStepName;
window.proceedToNextStep = proceedToNextStep;
window.showStepTransitionMessage = showStepTransitionMessage;
window.markStepCompleted = markStepCompleted;
window.getNextStep = getNextStep;
window.initializeWizard = initializeWizard;
window.bindDesignButtons = bindDesignButtons;
window.openIdeationWorkspace = openIdeationWorkspace;
window.closeIdeationWorkspace = closeIdeationWorkspace;
window.renderIdeationWorkspace = renderIdeationWorkspace;