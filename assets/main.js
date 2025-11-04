// ===============================
// LocalSuccess - Main JavaScript (Refactored)
// Core Application Logic Only
// ===============================

// ============= Core Application Functions =============

// Navigation and Routing
function navigate(route) {
    // Update active nav item
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-link-active');
        if (link.dataset.page === route) {
            link.classList.add('nav-link-active');
        }
    });
    
    // Update mobile dropdown
    const currentPageMobile = document.getElementById('current-page-mobile');
    if (currentPageMobile) {
        const pageNames = {
            'dashboard': 'Dashboard',
            'projects': 'Projects',
            'people': 'People',
            'actions': 'Actions',
            'summary': 'Summary',
            'settings': 'Settings',
            'profile': 'Profile',
            'region': 'Region',
            'issues': 'Issues',
            'map': 'Map'
        };
        currentPageMobile.textContent = pageNames[route] || 'Dashboard';
    }
    
    window.appState.currentRoute = route;
    // Use core.js renderCurrentRoute function
    if (typeof window.renderCurrentRoute === 'function') {
        window.renderCurrentRoute();
    } else {
        console.error('renderCurrentRoute function not found in core.js');
    }
}

// Hash-based routing
function handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    navigate(hash);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Demo guide functions
function toggleDemoGuide() {
    const guide = document.getElementById('demo-guide');
    guide.classList.toggle('translate-y-full');
    guide.classList.toggle('translate-y-0');
}

function nextDemoStep() {
    if (window.appState.demoStep < 5) {
        window.appState.demoStep++;
        updateDemoGuide();
    }
}

function prevDemoStep() {
    if (window.appState.demoStep > 1) {
        window.appState.demoStep--;
        updateDemoGuide();
    }
}

function updateDemoGuide() {
    const steps = [
        {
            title: 'Peopleから始めよう',
            content: '田中さんのカードをクリックして、提案アクション「次の打診」を選択してください。',
            action: 'navigate("people")'
        },
        {
            title: 'Actionsで期限を設定',
            content: '作成されたアクションの期限を設定し、ステータスをDoneに変更してください。',
            action: 'navigate("actions")'
        },
        {
            title: 'Summaryで昇格',
            content: '完了したアクションを選択して「次期プランに昇格」をクリックしてください。',
            action: 'navigate("summary")'
        },
        {
            title: 'Projectsで確認',
            content: '新しく追加されたPlanを確認し、Try→Plan昇格を実行してください。',
            action: 'navigate("projects")'
        },
        {
            title: 'Diffで比較',
            content: '変更前後の比較を確認して、改善サイクルを体験完了です！',
            action: 'navigate("diff")'
        }
    ];
    
    const step = steps[window.appState.demoStep - 1];
    document.getElementById('demo-title').textContent = `ステップ ${window.appState.demoStep}: ${step.title}`;
    document.getElementById('demo-content').textContent = step.content;
    document.getElementById('demo-action').setAttribute('onclick', step.action);
    
    // Update progress
    document.getElementById('demo-progress').textContent = `${window.appState.demoStep}/5`;
    
    // Update step indicators
    document.querySelectorAll('.demo-step').forEach((indicator, index) => {
        if (index < window.appState.demoStep) {
            indicator.classList.add('bg-primary', 'text-primary-foreground');
            indicator.classList.remove('bg-muted', 'text-muted-foreground');
        } else {
            indicator.classList.remove('bg-primary', 'text-primary-foreground');
            indicator.classList.add('bg-muted', 'text-muted-foreground');
        }
    });
    
    // Hide prev button on first step
    document.getElementById('demo-prev').style.display = window.appState.demoStep === 1 ? 'none' : 'block';
    
    // Hide next button on last step
    document.getElementById('demo-next').style.display = window.appState.demoStep === 5 ? 'none' : 'block';
}

// Masking functions
function toggleMasking() {
    window.appState.masking = !window.appState.masking;
    localStorage.setItem('appMasking', window.appState.masking);
    renderCurrentRoute();
}

function maskData(text) {
    if (!window.appState.masking) return text;
    return text.replace(/[あ-ん]/g, 'あ').replace(/[ア-ン]/g, 'ア').replace(/[一-龯]/g, '田').replace(/[a-zA-Z]/g, 'A');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
        'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize application
function initializeApp() {
    // Wait for appState to be available from core.js
    if (typeof window.appState === 'undefined') {
        console.warn('appState not available yet, retrying...');
        setTimeout(initializeApp, 100);
        return;
    }
    
    // Load saved settings
    const savedMasking = localStorage.getItem('appMasking');
    if (savedMasking !== null) {
        window.appState.masking = savedMasking === 'true';
    }
    
    // Initialize demo guide
    updateDemoGuide();
    
    console.log('LocalSuccess application initialized');
}

// Export global functions
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleDemoGuide = toggleDemoGuide;
window.nextDemoStep = nextDemoStep;
window.prevDemoStep = prevDemoStep;
window.updateDemoGuide = updateDemoGuide;
window.toggleMasking = toggleMasking;
window.maskData = maskData;
window.showNotification = showNotification;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadData();  // Load saved data from localStorage
    initRouter(); // Initialize routing system from core.js
    initializeApp(); // Initialize main app
});