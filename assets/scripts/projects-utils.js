// ===============================
// LocalSuccess - Projects Utilities Module
// ===============================

// Project creation and management functions
function createProjectFromWizard() {
    // Collect all wizard data
    const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
    const planningData = JSON.parse(localStorage.getItem('planningData') || '{}');
    const goalData = JSON.parse(localStorage.getItem('goalData') || '{}');
    const stakeholderData = JSON.parse(localStorage.getItem('stakeholderData') || '{}');
    const proposalData = JSON.parse(localStorage.getItem('proposalData') || '{}');
    
    // Generate project title from ideation data
    const projectTitle = ideationData.solution ? 
        extractTagsFromIdea(ideationData.solution)[0] || '新しいプロジェクト' : 
        '新しいプロジェクト';
    
    // Create new project
    const newProject = {
        id: Date.now(),
        title: projectTitle,
        description: ideationData.problem || 'ウィザードから作成されたプロジェクト',
        status: 'active',
        createdAt: new Date().toISOString(),
        tags: extractTagsFromIdea(ideationData.rawIdeas || ''),
        framework: getFrameworkData(planningData),
        goals: goalData.smart || {},
        kpis: goalData.kpis || [],
        stakeholders: stakeholderData.stakeholders || [],
        risks: goalData.risks || [],
        impact: goalData.impact || {},
        proposal: proposalData
    };
    
    // Save to localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Clear wizard data
    localStorage.removeItem('ideationData');
    localStorage.removeItem('planningData');
    localStorage.removeItem('goalData');
    localStorage.removeItem('stakeholderData');
    localStorage.removeItem('proposalData');
    localStorage.removeItem('wizardProgress');
    
    // Show success message and redirect
    showProjectCreationSuccess(newProject);
    closeIdeationWorkspace();
    
    // Reload projects page
    setTimeout(() => {
        loadActiveProjects();
        initializeWizard();
    }, 2000);
}

function extractTagsFromIdea(ideaText) {
    if (!ideaText) return [];
    
    const tags = [];
    const words = ideaText.split(/\s+/);
    
    // Extract meaningful words (more than 2 characters, not common words)
    const commonWords = ['です', 'ます', 'から', 'まで', 'として', 'について', 'により', 'の', 'が', 'を', 'に', 'は', 'で', 'と', 'も'];
    
    words.forEach(word => {
        // Remove tags and punctuation
        const cleanWord = word.replace(/[\[\]！？。、]/g, '');
        if (cleanWord.length > 2 && !commonWords.includes(cleanWord)) {
            if (!tags.includes(cleanWord)) {
                tags.push(cleanWord);
            }
        }
    });
    
    return tags.slice(0, 5); // Return first 5 tags
}

function getFrameworkData(planningData) {
    if (!planningData.type) return null;
    
    return {
        type: planningData.type,
        data: planningData
    };
}

function showProjectCreationSuccess(project) {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm';
    message.innerHTML = `
        <div class="flex items-start">
            <svg class="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <div class="font-medium">プロジェクト作成完了</div>
                <div class="text-sm mt-1">「${project.title}」が作成されました</div>
                <div class="text-xs mt-2 text-green-600">進行中のプロジェクトに追加されました</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            document.body.removeChild(message);
        }
    }, 5000);
}

// Project utility functions
function generateAIOutline() {
    // Show coming soon message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg z-50';
    message.textContent = 'AI機能は開発中です。ウィザードをご利用ください。';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function openProjectList() {
    // 現在のプロジェクト一覧を取得（実際にはデータベースから取得）
    const projects = getCurrentProjects();
    
    // 新しいモーダルコンポーネントを使用
    const modalManager = createProjectListModal(projects);
    modalManager.open();
}

function closeProjectList() {
    // 新しいモーダルコンポーネントのcloseModal関数を使用
    closeModal('project-list-modal');
}

// 現在のプロジェクト一覧を取得するダミー関数
function getCurrentProjects() {
    // 実際の実装では、ローカルストレージやAPIからプロジェクトデータを取得
    return [
        {
            id: 1,
            title: "地域活性化プロジェクト",
            description: "地域の観光資源を活用した地域活性化のための包括的なプロジェクト",
            progress: 65,
            tags: ["観光", "地域活性化", "まちづくり"],
            status: "進行中"
        },
        {
            id: 2,
            title: "スマート農業導入計画",
            description: "IoTとAIを活用した持続可能な農業システムの構築",
            progress: 30,
            tags: ["農業", "IoT", "AI", "DX"],
            status: "計画中"
        }
    ];
}

function openStakeholderAnalysis() {
    openIdeationWorkspace('stakeholder');
}

function openGoalSetting() {
    openIdeationWorkspace('goal-setting');
}

function openProposalCreation() {
    openIdeationWorkspace('proposal');
}

function viewProject(projectId) {
    // Show project detail view
    console.log('Viewing project:', projectId);
}

// Date formatting utility
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Export functions to global scope
window.createProjectFromWizard = createProjectFromWizard;
window.extractTagsFromIdea = extractTagsFromIdea;
window.getFrameworkData = getFrameworkData;
window.showProjectCreationSuccess = showProjectCreationSuccess;
window.generateAIOutline = generateAIOutline;
window.openProjectList = openProjectList;
window.closeProjectList = closeProjectList;
window.openStakeholderAnalysis = openStakeholderAnalysis;
window.openGoalSetting = openGoalSetting;
window.openProposalCreation = openProposalCreation;
window.viewProject = viewProject;
window.formatDate = formatDate;