// ===============================
// LocalSuccess - Dashboard Module
// ===============================

function renderDashboard(container) {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's tasks and completed tasks
    const todayTasks = sampleData.actions.filter(a => {
        return a.deadline === today && a.status === 'Todo';
    });
    
    const todayCompletedTasks = sampleData.actions.filter(a => {
        return a.deadline === today && a.status === 'Done';
    });
    
    const doingTasks = sampleData.actions.filter(a => a.status === 'Doing');
    
    // Get today's completed tasks with reflection data from localStorage
    const todayReflections = JSON.parse(localStorage.getItem('todayReflections') || '[]');
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">今日のダッシュボード</h1>
                <p class="text-muted-foreground">${new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
            </div>
            
            <div class="grid gap-6 lg:grid-cols-3">
                <!-- 今日やること -->
                <div class="card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">今日やること</h3>
                                    <p class="text-sm text-muted-foreground">${todayTasks.length + doingTasks.length}件のタスク</p>
                                </div>
                            </div>
                            <button onclick="openAddTodayTask()" class="text-blue-600 hover:text-blue-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${doingTasks.length > 0 ? `
                                <div class="mb-4">
                                    <h4 class="text-sm font-medium text-amber-700 mb-2">実行中</h4>
                                    <div class="space-y-2">
                                        ${doingTasks.map(task => `
                                            <div class="flex items-center space-x-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                                                <button onclick="completeTask(${task.id})" class="w-5 h-5 rounded-full border-2 border-amber-400 hover:bg-amber-400 transition-colors"></button>
                                                <div class="flex-1">
                                                    <p class="text-sm font-medium">${task.content}</p>
                                                    <p class="text-xs text-amber-600">${task.type}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${todayTasks.map(task => `
                                <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <button onclick="startTask(${task.id})" class="w-5 h-5 rounded-full border-2 border-blue-400 hover:bg-blue-400 transition-colors"></button>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">${task.content}</p>
                                        <p class="text-xs text-muted-foreground">${task.type}</p>
                                    </div>
                                    <button onclick="editTask(${task.id})" class="text-xs text-muted-foreground hover:text-foreground">
                                        編集
                                    </button>
                                </div>
                            `).join('')}
                            
                            ${todayTasks.length === 0 && doingTasks.length === 0 ? `
                                <div class="text-center py-8 text-muted-foreground">
                                    <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p class="text-sm">今日のタスクはありません</p>
                                    <button onclick="openAddTodayTask()" class="text-blue-600 hover:text-blue-700 text-sm mt-2">
                                        新しいタスクを追加
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- 今日やったこと -->
                <div class="card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">今日やったこと</h3>
                                    <p class="text-sm text-muted-foreground">${todayCompletedTasks.length}件完了</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${todayCompletedTasks.map(task => {
                                const reflection = todayReflections.find(r => r.taskId === task.id);
                                return `
                                    <div class="p-3 rounded-lg bg-green-50 border border-green-200">
                                        <div class="flex items-center justify-between mb-2">
                                            <p class="text-sm font-medium">${task.content}</p>
                                            <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">完了</span>
                                        </div>
                                        ${reflection ? `
                                            <div class="mt-3 space-y-2">
                                                ${reflection.good ? `
                                                    <div class="flex items-start space-x-2">
                                                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">Good</span>
                                                        <p class="text-xs text-muted-foreground flex-1">${reflection.good}</p>
                                                    </div>
                                                ` : ''}
                                                ${reflection.more ? `
                                                    <div class="flex items-start space-x-2">
                                                        <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-medium">More</span>
                                                        <p class="text-xs text-muted-foreground flex-1">${reflection.more}</p>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        ` : `
                                            <button onclick="openReflectionModal(${task.id}, '${task.content}')" class="text-xs text-blue-600 hover:text-blue-700">
                                                振り返りを追加
                                            </button>
                                        `}
                                    </div>
                                `;
                            }).join('')}
                            
                            ${todayCompletedTasks.length === 0 ? `
                                <div class="text-center py-8 text-muted-foreground">
                                    <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p class="text-sm">まだ完了したタスクはありません</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <!-- 次やること -->
                <div class="card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold">次やること</h3>
                                    <p class="text-sm text-muted-foreground">明日以降の予定</p>
                                </div>
                            </div>
                            <button onclick="openAddNextTask()" class="text-purple-600 hover:text-purple-700">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${getUpcomingTasks().slice(0, 5).map(task => `
                                <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div class="w-3 h-3 rounded-full bg-purple-400"></div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">${task.content}</p>
                                        <div class="flex items-center space-x-2 mt-1">
                                            <p class="text-xs text-muted-foreground">${formatDate(task.deadline)}</p>
                                            <span class="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">${task.type}</span>
                                        </div>
                                    </div>
                                    <button onclick="moveToToday(${task.id})" class="text-xs text-purple-600 hover:text-purple-700">
                                        今日に移動
                                    </button>
                                </div>
                            `).join('')}
                            
                            ${getUpcomingTasks().length === 0 ? `
                                <div class="text-center py-8 text-muted-foreground">
                                    <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <p class="text-sm">予定されたタスクはありません</p>
                                    <button onclick="openAddNextTask()" class="text-purple-600 hover:text-purple-700 text-sm mt-2">
                                        新しい予定を追加
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Task Add Modal -->
        <div id="task-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeTaskModal()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-background p-6 shadow-lg border border-border rounded-lg">
                <h3 id="task-modal-title" class="text-lg font-semibold mb-4">新しいタスクを追加</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">タスク内容</label>
                        <input type="text" id="task-content" class="w-full p-2 border border-input rounded-md" placeholder="例：田中さんに連絡">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">タイプ</label>
                        <select id="task-type" class="w-full p-2 border border-input rounded-md">
                            <option value="連絡">連絡</option>
                            <option value="準備">準備</option>
                            <option value="調整">調整</option>
                            <option value="記録">記録</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">期限</label>
                        <input type="date" id="task-deadline" class="w-full p-2 border border-input rounded-md">
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="closeTaskModal()" class="flex-1 px-4 py-2 border border-input rounded-md hover:bg-accent">
                            キャンセル
                        </button>
                        <button onclick="addNewTask()" class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                            追加
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Reflection Modal -->
        <div id="reflection-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeReflectionModal()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-background p-6 shadow-lg border border-border rounded-lg">
                <h3 class="text-lg font-semibold mb-4">タスクの振り返り</h3>
                <p id="reflection-task-name" class="text-sm text-muted-foreground mb-4"></p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Good（良かった点）</label>
                        <textarea id="reflection-good" class="w-full p-2 border border-input rounded-md h-20" placeholder="例：予定より早く完了できた"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">More（改善点・次回への提案）</label>
                        <textarea id="reflection-more" class="w-full p-2 border border-input rounded-md h-20" placeholder="例：もう少し事前準備に時間をかけたい"></textarea>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="closeReflectionModal()" class="flex-1 px-4 py-2 border border-input rounded-md hover:bg-accent">
                            キャンセル
                        </button>
                        <button onclick="saveReflection()" class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions for the dashboard

function getUpcomingTasks() {
    const today = new Date().toISOString().split('T')[0];
    return sampleData.actions.filter(a => {
        return a.status === 'Todo' && a.deadline > today;
    }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

let currentTaskModalMode = 'today';
let currentReflectionTaskId = null;

function openAddTodayTask() {
    currentTaskModalMode = 'today';
    document.getElementById('task-modal-title').textContent = '今日のタスクを追加';
    document.getElementById('task-deadline').value = new Date().toISOString().split('T')[0];
    document.getElementById('task-modal').classList.remove('hidden');
}

function openAddNextTask() {
    currentTaskModalMode = 'next';
    document.getElementById('task-modal-title').textContent = '次のタスクを追加';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('task-deadline').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('task-modal').classList.remove('hidden');
}

function closeTaskModal() {
    document.getElementById('task-modal').classList.add('hidden');
    // Clear form
    document.getElementById('task-content').value = '';
    document.getElementById('task-type').value = '連絡';
}

function addNewTask() {
    const content = document.getElementById('task-content').value.trim();
    const type = document.getElementById('task-type').value;
    const deadline = document.getElementById('task-deadline').value;
    
    if (!content) {
        alert('タスク内容を入力してください');
        return;
    }
    
    const newTask = {
        id: sampleData.actions.length + 1,
        content: content,
        type: type,
        linkedPeople: [],
        linkedProjects: [],
        status: 'Todo',
        deadline: deadline,
        weeklyTarget: false,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newTask);
    saveData();
    closeTaskModal();
    renderCurrentRoute(); // Refresh the dashboard
}

function startTask(taskId) {
    const task = sampleData.actions.find(a => a.id === taskId);
    if (task) {
        task.status = 'Doing';
        saveData();
        renderCurrentRoute();
    }
}

function completeTask(taskId) {
    const task = sampleData.actions.find(a => a.id === taskId);
    if (task) {
        task.status = 'Done';
        saveData();
        renderCurrentRoute();
    }
}

function moveToToday(taskId) {
    const task = sampleData.actions.find(a => a.id === taskId);
    if (task) {
        task.deadline = new Date().toISOString().split('T')[0];
        saveData();
        renderCurrentRoute();
    }
}

function openReflectionModal(taskId, taskName) {
    currentReflectionTaskId = taskId;
    document.getElementById('reflection-task-name').textContent = taskName;
    document.getElementById('reflection-modal').classList.remove('hidden');
}

function closeReflectionModal() {
    document.getElementById('reflection-modal').classList.add('hidden');
    // Clear form
    document.getElementById('reflection-good').value = '';
    document.getElementById('reflection-more').value = '';
    currentReflectionTaskId = null;
}

function saveReflection() {
    const good = document.getElementById('reflection-good').value.trim();
    const more = document.getElementById('reflection-more').value.trim();
    
    if (!good && !more) {
        alert('Good または More のいずれかを入力してください');
        return;
    }
    
    // Get existing reflections
    const reflections = JSON.parse(localStorage.getItem('todayReflections') || '[]');
    
    // Remove existing reflection for this task if any
    const filteredReflections = reflections.filter(r => r.taskId !== currentReflectionTaskId);
    
    // Add new reflection
    filteredReflections.push({
        taskId: currentReflectionTaskId,
        good: good,
        more: more,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('todayReflections', JSON.stringify(filteredReflections));
    closeReflectionModal();
    renderCurrentRoute(); // Refresh the dashboard
}

function editTask(taskId) {
    // Simple edit - just allow changing the content
    const task = sampleData.actions.find(a => a.id === taskId);
    if (task) {
        const newContent = prompt('タスク内容を編集:', task.content);
        if (newContent && newContent.trim()) {
            task.content = newContent.trim();
            saveData();
            renderCurrentRoute();
        }
    }
}

// Expose functions to global scope
window.openAddTodayTask = openAddTodayTask;
window.openAddNextTask = openAddNextTask;
window.closeTaskModal = closeTaskModal;
window.addNewTask = addNewTask;
window.startTask = startTask;
window.completeTask = completeTask;
window.moveToToday = moveToToday;
window.openReflectionModal = openReflectionModal;
window.closeReflectionModal = closeReflectionModal;
window.saveReflection = saveReflection;
window.editTask = editTask;