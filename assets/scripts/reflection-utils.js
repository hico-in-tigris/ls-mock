// ===============================
// LocalSuccess - Reflection Utils
// ===============================

// Project selection
function selectProject(projectId) {
    // Update selected project
    reflectionData.daily[0].selectedProject = projectId;
    
    // Update visual state
    document.querySelectorAll('.project-selector-btn').forEach(btn => {
        const isSelected = parseInt(btn.dataset.projectId) === projectId;
        btn.classList.toggle('border-primary', isSelected);
        btn.classList.toggle('bg-primary/5', isSelected);
        btn.classList.toggle('border-border', !isSelected);
        
        // Update check icon
        const icon = btn.querySelector('svg');
        if (isSelected) {
            icon.innerHTML = '<polyline points="20,6 9,17 4,12"/>';
            icon.classList.add('text-primary');
            icon.classList.remove('text-muted-foreground');
        } else {
            icon.innerHTML = '<circle cx="12" cy="12" r="10"/>';
            icon.classList.add('text-muted-foreground');
            icon.classList.remove('text-primary');
        }
    });
    
    // Save to localStorage
    saveReflectionData();
    
    // Re-render reflection content
    renderReflectionContent('daily');
}

// Filter actions by selected project
function getProjectActions(projectId) {
    return sampleData.actions.filter(action => action.projectId === projectId);
}

// Helper to get project data
function getProject(projectId) {
    return sampleData.projects.find(project => project.id === projectId);
}

// Save reflection data to localStorage
function saveReflectionData() {
    localStorage.setItem('reflectionData', JSON.stringify(reflectionData));
}

// Load reflection data from localStorage
function loadReflectionData() {
    const saved = localStorage.getItem('reflectionData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Merge with default structure to ensure all fields exist
            Object.keys(reflectionData).forEach(period => {
                if (parsed[period]) {
                    reflectionData[period] = parsed[period];
                }
            });
        } catch (e) {
            console.log('Failed to load reflection data:', e);
        }
    }
}

// Render reflection content based on period
function renderReflectionContent(period) {
    const contentContainer = document.getElementById('reflection-content');
    if (!contentContainer) return;
    
    // Show/hide project selector based on period
    const projectSelector = document.getElementById('project-selector');
    if (projectSelector) {
        projectSelector.style.display = period === 'daily' ? 'block' : 'none';
    }
    
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