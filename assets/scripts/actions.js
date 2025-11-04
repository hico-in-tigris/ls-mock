// ===============================
// LocalSuccess - Actions Module
// ===============================

function renderActions(container) {
    const todoActions = sampleData.actions.filter(a => a.status === 'Todo');
    const doingActions = sampleData.actions.filter(a => a.status === 'Doing');
    const doneActions = sampleData.actions.filter(a => a.status === 'Done');
    
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">Actions</h1>
                    <p class="text-muted-foreground">タスクとアクションの管理</p>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    新しいアクション
                </button>
            </div>
            
                        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <!-- Todo -->
                ${createHeaderCard(
                    'Todo',
                    `${todoActions.length}件のタスク`,
                    createItemList(
                        todoActions,
                        action => `
                            <div class="p-3 border rounded-lg">
                                <h4 class="font-medium text-sm">${action.content}</h4>
                                <p class="text-xs text-muted-foreground">期限: ${formatDate(action.deadline)}</p>
                                <div class="flex justify-between items-center mt-2">
                                    ${createBadge(action.type, 'secondary', `action-${action.type}`)}
                                    ${createButton({
                                        text: '開始',
                                        size: 'sm',
                                        variant: 'primary',
                                        onClick: `updateActionStatus(${action.id}, 'Doing')`,
                                        className: 'bg-blue-600 hover:bg-blue-700'
                                    })}
                                </div>
                            </div>
                        `,
                        'Todoタスクはありません'
                    ),
                    'border-orange-200'
                )}
                
                <!-- Doing -->
                ${createHeaderCard(
                    'Doing',
                    `${doingActions.length}件実行中`,
                    createItemList(
                        doingActions,
                        action => `
                            <div class="p-3 border rounded-lg border-blue-200 bg-blue-50">
                                <h4 class="font-medium text-sm">${action.content}</h4>
                                <p class="text-xs text-muted-foreground">期限: ${formatDate(action.deadline)}</p>
                                <div class="flex justify-between items-center mt-2">
                                    ${createBadge(action.type, 'secondary', `action-${action.type}`)}
                                    ${createButton({
                                        text: '完了',
                                        size: 'sm',
                                        variant: 'primary',
                                        onClick: `updateActionStatus(${action.id}, 'Done')`,
                                        className: 'bg-green-600 hover:bg-green-700'
                                    })}
                                </div>
                            </div>
                        `,
                        '実行中のタスクはありません'
                    ),
                    'border-blue-200'
                )}
                
                <!-- Done -->
                ${createHeaderCard(
                    'Done',
                    `${doneActions.length}件完了`,
                    createItemList(
                        doneActions.slice(0, 5),
                        action => `
                            <div class="p-3 border rounded-lg border-green-200 bg-green-50">
                                <h4 class="font-medium text-sm">${action.content}</h4>
                                <p class="text-xs text-muted-foreground">期限: ${formatDate(action.deadline)}</p>
                                ${createBadge(action.type, 'secondary', `action-${action.type}`)}
                            </div>
                        `,
                        '完了したタスクはありません'
                    ),
                    'border-green-200'
                )}
            </div>
        </div>
    `;
}

function updateActionStatus(actionId, newStatus) {
    const action = sampleData.actions.find(a => a.id === actionId);
    if (action) {
        action.status = newStatus;
        saveData();
        renderCurrentRoute();
    }
}

// Expose to global scope
window.renderActions = renderActions;
window.updateActionStatus = updateActionStatus;