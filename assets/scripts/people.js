// ===============================
// LocalSuccess - People Module
// ===============================

function renderPeople(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">People</h1>
                    <p class="text-muted-foreground">地域の関係者とのネットワークを管理</p>
                </div>
                <button class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    新しい人物を追加
                </button>
            </div>
            
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                ${sampleData.people.map(person => `
                    <div class="card cursor-pointer hover:shadow-md transition-shadow" onclick="openPersonDetail(${person.id})">
                        <div class="card-content">
                            <div class="flex items-start space-x-3">
                                <div class="avatar">${person.avatar}</div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-semibold">${getMaskedName(person.name)}</h3>
                                    <p class="text-sm text-muted-foreground">${person.role}</p>
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        ${person.tags.map(tag => `<span class="tag ${tag.slice(1)}">${tag}</span>`).join('')}
                                    </div>
                                    <p class="text-xs text-muted-foreground mt-2">
                                        最終連絡: ${daysSince(person.lastContact)}日前
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Person Detail Modal -->
        <div id="person-detail-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closePersonDetail()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="person-detail-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    `;
}

function openPersonDetail(personId) {
    const person = getPersonById(personId);
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    const suggestions = generateSuggestions(person);
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-4">
                <div class="avatar avatar-lg">${person.avatar}</div>
                <div>
                    <h2 class="text-2xl font-bold">${getMaskedName(person.name)}</h2>
                    <p class="text-muted-foreground">${person.role}</p>
                </div>
            </div>
            <button onclick="closePersonDetail()" class="text-muted-foreground hover:text-foreground">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2">
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">基本情報</h3>
                    </div>
                    <div class="card-content space-y-3">
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">連絡先</h4>
                            <p class="text-sm">${appState.masking ? '非表示' : person.email}</p>
                            <p class="text-sm">${appState.masking ? '非表示' : person.phone}</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">最終連絡</h4>
                            <p class="text-sm">${formatDate(person.lastContact)} (${daysSince(person.lastContact)}日前)</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground">タグ</h4>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${person.tags.map(tag => `<span class="tag ${tag.slice(1)}">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">提案アクション</h3>
                    </div>
                    <div class="card-content space-y-3">
                        ${suggestions.map((suggestion, index) => `
                            <div class="p-3 border rounded-lg">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h4 class="font-medium text-sm">${suggestion.title}</h4>
                                        <p class="text-xs text-muted-foreground mt-1">${suggestion.description}</p>
                                    </div>
                                    <button onclick="createActionFromSuggestion(${person.id}, ${index})" class="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                        実行
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closePersonDetail() {
    document.getElementById('person-detail-modal').classList.add('hidden');
}

function createActionFromSuggestion(personId, suggestionIndex) {
    const person = getPersonById(personId);
    const suggestions = generateSuggestions(person);
    const suggestion = suggestions[suggestionIndex];
    
    const newAction = {
        id: sampleData.actions.length + 1,
        content: suggestion.title,
        type: suggestion.actionType,
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        weeklyTarget: suggestion.priority === 'high',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    
    alert('新しいアクションが作成されました！');
    closePersonDetail();
}

// Expose to global scope
window.renderPeople = renderPeople;
window.openPersonDetail = openPersonDetail;
window.closePersonDetail = closePersonDetail;
window.createActionFromSuggestion = createActionFromSuggestion;