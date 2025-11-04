// ===============================
// LocalSuccess - Follow Module  
// ===============================

function renderFollow(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Follow</h1>
                <p class="text-muted-foreground">継続的なフォローアップとリレーション管理</p>
            </div>
            
            <div class="grid gap-6">
                ${sampleData.people.map(person => {
                    const daysSinceContact = daysSince(person.lastContact);
                    const needsFollow = daysSinceContact > 7;
                    
                    return `
                        <div class="card ${needsFollow ? 'border-orange-200 bg-orange-50' : ''}">
                            <div class="card-content">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">${person.avatar}</div>
                                        <div>
                                            <h3 class="font-semibold">${getMaskedName(person.name)}</h3>
                                            <p class="text-sm text-muted-foreground">${person.role}</p>
                                            <p class="text-xs ${needsFollow ? 'text-orange-600' : 'text-muted-foreground'}">
                                                最終連絡: ${daysSinceContact}日前
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex space-x-2">
                                        ${needsFollow ? `
                                            <button onclick="createFollowAction(${person.id})" class="text-sm bg-orange-600 text-white px-3 py-1 rounded">
                                                フォローアップ
                                            </button>
                                        ` : ''}
                                        <button onclick="copyLastConversation(${person.id})" class="text-sm border border-gray-300 px-3 py-1 rounded">
                                            前回の会話
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function copyLastConversation(personId) {
    const person = getPersonById(personId);
    const mockConversation = `前回の${getMaskedName(person.name)}さんとの会話内容がクリップボードにコピーされました。`;
    
    navigator.clipboard.writeText(mockConversation).then(() => {
        alert('前回の会話内容をクリップボードにコピーしました');
    });
}

function createFollowAction(personId) {
    const person = getPersonById(personId);
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}さんにフォローアップ連絡`,
        type: '連絡',
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
        weeklyTarget: true,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    
    alert('フォローアップアクションが作成されました！');
    renderCurrentRoute();
}

// Expose to global scope
window.renderFollow = renderFollow;
window.copyLastConversation = copyLastConversation;
window.createFollowAction = createFollowAction;