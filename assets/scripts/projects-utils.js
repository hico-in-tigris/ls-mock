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
    // Show project list modal
    let modal = document.getElementById('project-list-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-list-modal';
        modal.className = 'fixed inset-0 z-50 hidden';
        modal.innerHTML = `
            <div class="fixed inset-0 bg-black/50" onclick="closeProjectList()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl bg-background shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold">全プロジェクト一覧</h2>
                        <button onclick="closeProjectList()" class="text-muted-foreground hover:text-foreground">
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <div id="project-list-content">
                        <div class="text-center py-12">
                            <p class="text-muted-foreground">プロジェクト一覧機能は開発中です</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.classList.remove('hidden');
}

function closeProjectList() {
    const modal = document.getElementById('project-list-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
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