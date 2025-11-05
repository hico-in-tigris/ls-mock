// ===============================
// LocalSuccess - Enhanced People Module
// ===============================

let currentViewMode = 'cards'; // 'cards', 'list', 'network'
let searchQuery = '';
let selectedTags = [];
let sortBy = 'lastContact'; // 'name', 'role', 'lastContact', 'relationship'

function renderPeople(container) {
    const filteredPeople = getFilteredPeople();
    const allTags = getAllTags();
    const relationshipStats = getRelationshipStats();
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
            <!-- Header -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div>
                    <h1 class="text-2xl font-bold">ネットワーク</h1>
                    <p class="text-muted-foreground">地域の関係者とのつながりを戦略的に管理</p>
                    <div class="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>総人数: ${sampleData.people.length}人</span>
                        <span>今週連絡: ${relationshipStats.weeklyContacts}人</span>
                        <span>要フォロー: ${relationshipStats.needsFollow}人</span>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button onclick="openAddPersonModal()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        新しい人物を追加
                    </button>
                    <button onclick="exportPeopleData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        エクスポート
                    </button>
                </div>
            </div>
            
            <!-- Quick Stats Cards -->
            <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                ${createStatsCard({
                    title: 'アクティブ',
                    value: relationshipStats.active,
                    color: 'blue',
                    icon: `<svg class="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>`,
                    onClick: { name: 'showCategoryDetail', params: 'active' }
                })}
                
                ${createStatsCard({
                    title: '強いつながり',
                    value: relationshipStats.strong,
                    color: 'green',
                    icon: Icons.heart,
                    onClick: { name: 'showCategoryDetail', params: 'strong' }
                })}
                
                ${createStatsCard({
                    title: '要フォロー',
                    value: relationshipStats.needsFollow,
                    color: 'orange',
                    icon: Icons.clock,
                    onClick: { name: 'showCategoryDetail', params: 'needsFollow' }
                })}
                
                ${createStatsCard({
                    title: '新規',
                    value: relationshipStats.recent,
                    color: 'purple',
                    icon: `<svg class="w-4 h-4 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>`,
                    onClick: { name: 'showCategoryDetail', params: 'recent' }
                })}
                
                ${createStatsCard({
                    title: '平均関係期間',
                    value: `${relationshipStats.avgDuration}ヶ月`,
                    color: 'gray',
                    icon: `<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>`
                })}
            </div>
            
            <!-- Filters and Search -->
            <div class="card">
                <div class="card-content">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <!-- Search -->
                        <div class="flex-1 max-w-md">
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                </svg>
                                <input 
                                    type="text" 
                                    id="people-search"
                                    placeholder="名前、役職、タグで検索..." 
                                    class="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                                    value="${searchQuery}"
                                    oninput="updateSearch(this.value)"
                                >
                            </div>
                        </div>
                        
                        <!-- View Mode and Sort -->
                        <div class="flex items-center space-x-4">
                            <!-- Tag Filter -->
                            <div class="relative">
                                <button onclick="toggleTagFilter()" class="flex items-center space-x-2 px-3 py-2 border border-input rounded-md hover:bg-accent">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                                        <line x1="7" y1="7" x2="7.01" y2="7"/>
                                    </svg>
                                    <span>タグ</span>
                                    ${selectedTags.length > 0 ? `<span class="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">${selectedTags.length}</span>` : ''}
                                </button>
                                <div id="tag-filter-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-10">
                                    <div class="p-3">
                                        <div class="flex flex-wrap gap-2">
                                            ${allTags.map(tag => `
                                                <button onclick="toggleTag('${tag}')" class="text-xs px-2 py-1 rounded-full border transition-colors ${selectedTags.includes(tag) ? 'bg-primary text-primary-foreground border-primary' : 'border-input hover:bg-accent'}">
                                                    ${tag}
                                                </button>
                                            `).join('')}
                                        </div>
                                        ${selectedTags.length > 0 ? `
                                            <button onclick="clearTags()" class="mt-3 text-xs text-muted-foreground hover:text-foreground">
                                                すべてクリア
                                            </button>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sort -->
                            <select onchange="updateSort(this.value)" class="px-3 py-2 border border-input rounded-md">
                                <option value="lastContact" ${sortBy === 'lastContact' ? 'selected' : ''}>最終連絡日</option>
                                <option value="name" ${sortBy === 'name' ? 'selected' : ''}>名前</option>
                                <option value="role" ${sortBy === 'role' ? 'selected' : ''}>役職</option>
                                <option value="relationship" ${sortBy === 'relationship' ? 'selected' : ''}>関係の強さ</option>
                            </select>
                            
                            <!-- View Mode -->
                            <div class="flex border border-input rounded-md">
                                <button onclick="setViewMode('cards')" class="px-3 py-2 ${currentViewMode === 'cards' ? 'bg-accent' : 'hover:bg-accent'} rounded-l-md">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="7" height="7"/>
                                        <rect x="14" y="3" width="7" height="7"/>
                                        <rect x="14" y="14" width="7" height="7"/>
                                        <rect x="3" y="14" width="7" height="7"/>
                                    </svg>
                                </button>
                                <button onclick="setViewMode('list')" class="px-3 py-2 ${currentViewMode === 'list' ? 'bg-accent' : 'hover:bg-accent'} border-l border-r border-input">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="8" y1="6" x2="21" y2="6"/>
                                        <line x1="8" y1="12" x2="21" y2="12"/>
                                        <line x1="8" y1="18" x2="21" y2="18"/>
                                        <line x1="3" y1="6" x2="3.01" y2="6"/>
                                        <line x1="3" y1="12" x2="3.01" y2="12"/>
                                        <line x1="3" y1="18" x2="3.01" y2="18"/>
                                    </svg>
                                </button>
                                <button onclick="setViewMode('network')" class="px-3 py-2 ${currentViewMode === 'network' ? 'bg-accent' : 'hover:bg-accent'} rounded-r-md">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- People Content -->
            <div id="people-content">
                ${renderPeopleContent(filteredPeople)}
            </div>
        </div>
        
        ${renderPersonModal()}
        ${renderAddPersonModal()}
        ${renderCategoryDetailModal()}
    `;
}

function renderPeopleContent(people) {
    if (currentViewMode === 'cards') {
        return renderCardsView(people);
    } else if (currentViewMode === 'list') {
        return renderListView(people);
    } else if (currentViewMode === 'network') {
        return renderNetworkView(people);
    }
}

function renderCardsView(people) {
    if (people.length === 0) {
        return `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                <h3 class="text-lg font-medium text-muted-foreground mb-2">検索結果がありません</h3>
                <p class="text-sm text-muted-foreground mb-4">検索条件を変更してお試しください</p>
                <button onclick="clearAllFilters()" class="text-sm text-primary hover:underline">
                    フィルターをクリア
                </button>
            </div>
        `;
    }
    
    return `
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            ${people.map(person => {
                const relationshipStrength = getRelationshipStrength(person);
                const daysSinceLastContact = daysSince(person.lastContact);
                const urgency = getUrgencyLevel(daysSinceLastContact);
                
                return `
                    <div class="card cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 ${urgency === 'high' ? 'border-red-200 bg-red-50' : urgency === 'medium' ? 'border-yellow-200 bg-yellow-50' : ''}">
                        <div class="card-content">
                            <div class="flex items-start space-x-3">
                                <div class="relative">
                                    <div class="avatar avatar-lg">${person.avatar}</div>
                                    <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${relationshipStrength === 'strong' ? 'bg-green-500' : relationshipStrength === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'}"></div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-semibold truncate">${getMaskedName(person.name)}</h3>
                                        ${urgency === 'high' ? '<span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">緊急</span>' : ''}
                                    </div>
                                    <p class="text-sm text-muted-foreground">${person.role}</p>
                                    <div class="flex flex-wrap gap-1 mt-2">
                                        ${person.tags.slice(0, 3).map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                        ${person.tags.length > 3 ? `<span class="text-xs text-muted-foreground">+${person.tags.length - 3}</span>` : ''}
                                    </div>
                                    <div class="flex items-center justify-between mt-3">
                                        <p class="text-xs text-muted-foreground">
                                            最終連絡: <span class="${urgency === 'high' ? 'text-red-600 font-medium' : urgency === 'medium' ? 'text-yellow-600 font-medium' : ''}">${daysSinceLastContact}日前</span>
                                        </p>
                                        <div class="flex space-x-1">
                                            <button onclick="quickContact(${person.id})" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                                                連絡
                                            </button>
                                            <button onclick="openPersonDetail(${person.id})" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                                                詳細
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderListView(people) {
    if (people.length === 0) {
        return `
            <div class="text-center py-12">
                <p class="text-muted-foreground">検索結果がありません</p>
            </div>
        `;
    }
    
    return `
        <div class="card">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b border-border">
                            <th class="text-left p-4 font-medium">名前</th>
                            <th class="text-left p-4 font-medium">役職</th>
                            <th class="text-left p-4 font-medium">タグ</th>
                            <th class="text-left p-4 font-medium">最終連絡</th>
                            <th class="text-left p-4 font-medium">関係の強さ</th>
                            <th class="text-left p-4 font-medium">アクション</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${people.map(person => {
                            const relationshipStrength = getRelationshipStrength(person);
                            const daysSinceLastContact = daysSince(person.lastContact);
                            const urgency = getUrgencyLevel(daysSinceLastContact);
                            
                            return `
                                <tr class="border-b border-border hover:bg-muted/50 transition-colors">
                                    <td class="p-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">${person.avatar}</div>
                                            <div>
                                                <p class="font-medium">${getMaskedName(person.name)}</p>
                                                ${urgency === 'high' ? '<span class="text-xs text-red-600">要フォロー</span>' : ''}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4 text-sm">${person.role}</td>
                                    <td class="p-4">
                                        <div class="flex flex-wrap gap-1">
                                            ${person.tags.slice(0, 2).map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                            ${person.tags.length > 2 ? `<span class="text-xs text-muted-foreground">+${person.tags.length - 2}</span>` : ''}
                                        </div>
                                    </td>
                                    <td class="p-4 text-sm ${urgency === 'high' ? 'text-red-600 font-medium' : urgency === 'medium' ? 'text-yellow-600' : ''}">${daysSinceLastContact}日前</td>
                                    <td class="p-4">
                                        <div class="flex items-center">
                                            <div class="w-3 h-3 rounded-full ${relationshipStrength === 'strong' ? 'bg-green-500' : relationshipStrength === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'} mr-2"></div>
                                            <span class="text-sm capitalize">${relationshipStrength === 'strong' ? '強い' : relationshipStrength === 'medium' ? '普通' : '弱い'}</span>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="flex space-x-2">
                                            <button onclick="quickContact(${person.id})" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                                                連絡
                                            </button>
                                            <button onclick="openPersonDetail(${person.id})" class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                                                詳細
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderNetworkView(people) {
    // Simple network visualization using CSS positioning
    const networkData = generateNetworkData(people);
    
    return `
        <div class="card">
            <div class="card-content">
                <div class="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg" style="height: 600px; overflow: hidden;">
                    <div class="absolute inset-4">
                        ${networkData.map(person => `
                            <div 
                                class="absolute w-16 h-16 cursor-pointer group"
                                style="left: ${person.x}%; top: ${person.y}%;"
                                onclick="openPersonDetail(${person.id})"
                            >
                                <div class="avatar avatar-lg mx-auto ${getRelationshipStrength(person) === 'strong' ? 'ring-4 ring-green-300' : getRelationshipStrength(person) === 'medium' ? 'ring-2 ring-yellow-300' : 'ring-1 ring-gray-300'}">${person.avatar}</div>
                                <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                    ${getMaskedName(person.name)}<br>
                                    <span class="text-gray-300">${person.role}</span>
                                </div>
                            </div>
                        `).join('')}
                        
                        <!-- Center: You -->
                        <div class="absolute w-20 h-20" style="left: 50%; top: 50%; transform: translate(-50%, -50%);">
                            <div class="avatar avatar-xl mx-auto ring-4 ring-blue-400 bg-blue-600 text-white">私</div>
                            <p class="text-center text-sm font-medium mt-1">あなた</p>
                        </div>
                    </div>
                    
                    <!-- Legend -->
                    <div class="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg">
                        <h4 class="text-sm font-medium mb-2">関係の強さ</h4>
                        <div class="space-y-1">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                <span class="text-xs">強い（2週間以内）</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span class="text-xs">普通（1ヶ月以内）</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 rounded-full bg-gray-400"></div>
                                <span class="text-xs">弱い（1ヶ月以上）</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions
function getFilteredPeople() {
    let filtered = sampleData.people;
    
    // Search filter
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(person => 
            person.name.toLowerCase().includes(query) ||
            person.role.toLowerCase().includes(query) ||
            person.tags.some(tag => tag.toLowerCase().includes(query)) ||
            person.notes.toLowerCase().includes(query)
        );
    }
    
    // Tag filter
    if (selectedTags.length > 0) {
        filtered = filtered.filter(person =>
            selectedTags.some(tag => person.tags.includes(tag))
        );
    }
    
    // Sort
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'role':
                return a.role.localeCompare(b.role);
            case 'lastContact':
                return new Date(b.lastContact) - new Date(a.lastContact);
            case 'relationship':
                const strengthA = getRelationshipStrength(a);
                const strengthB = getRelationshipStrength(b);
                const order = { strong: 3, medium: 2, weak: 1 };
                return order[strengthB] - order[strengthA];
            default:
                return 0;
        }
    });
    
    return filtered;
}

function getAllTags() {
    const allTags = new Set();
    sampleData.people.forEach(person => {
        person.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
}

function getRelationshipStats() {
    const now = new Date();
    const people = sampleData.people;
    
    let active = 0;
    let strong = 0;
    let needsFollow = 0;
    let recent = 0;
    let totalDuration = 0;
    
    people.forEach(person => {
        const daysSinceContact = daysSince(person.lastContact);
        const relationshipStrength = getRelationshipStrength(person);
        
        if (daysSinceContact <= 30) active++;
        if (relationshipStrength === 'strong') strong++;
        if (daysSinceContact > 14) needsFollow++;
        if (daysSinceContact <= 7) recent++;
        
        // Assume 6 months average relationship duration for demo
        totalDuration += 6;
    });
    
    return {
        active,
        strong,
        needsFollow,
        recent,
        weeklyContacts: recent,
        avgDuration: Math.round(totalDuration / people.length)
    };
}

function getRelationshipStrength(person) {
    const daysSinceContact = daysSince(person.lastContact);
    if (daysSinceContact <= 14) return 'strong';
    if (daysSinceContact <= 30) return 'medium';
    return 'weak';
}

function getUrgencyLevel(daysSinceContact) {
    if (daysSinceContact > 30) return 'high';
    if (daysSinceContact > 14) return 'medium';
    return 'low';
}

function generateNetworkData(people) {
    return people.map((person, index) => {
        const angle = (index / people.length) * 2 * Math.PI;
        const radius = 35; // 35% from center
        const x = 50 + radius * Math.cos(angle); // 50% is center
        const y = 50 + radius * Math.sin(angle);
        
        return {
            ...person,
            x: Math.max(5, Math.min(85, x)), // Keep within bounds
            y: Math.max(5, Math.min(85, y))
        };
    });
}

// Event handlers
function updateSearch(value) {
    searchQuery = value;
    refreshPeopleContent();
}

function setViewMode(mode) {
    currentViewMode = mode;
    refreshPeopleContent();
}

function updateSort(value) {
    sortBy = value;
    refreshPeopleContent();
}

function toggleTagFilter() {
    const dropdown = document.getElementById('tag-filter-dropdown');
    dropdown.classList.toggle('hidden');
}

function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
    } else {
        selectedTags.push(tag);
    }
    refreshPeopleContent();
}

function clearTags() {
    selectedTags = [];
    refreshPeopleContent();
}

function clearAllFilters() {
    searchQuery = '';
    selectedTags = [];
    document.getElementById('people-search').value = '';
    refreshPeopleContent();
}

function refreshPeopleContent() {
    const filteredPeople = getFilteredPeople();
    document.getElementById('people-content').innerHTML = renderPeopleContent(filteredPeople);
    
    // Update tag filter dropdown
    const tagFilterDropdown = document.getElementById('tag-filter-dropdown');
    if (tagFilterDropdown && !tagFilterDropdown.classList.contains('hidden')) {
        tagFilterDropdown.classList.add('hidden');
    }
}

function quickContact(personId) {
    const person = getPersonById(personId);
    
    // Create a quick contact action
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}さんに連絡`,
        type: '連絡',
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date().toISOString().split('T')[0],
        weeklyTarget: true,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    
    // Update last contact to today
    person.lastContact = new Date().toISOString().split('T')[0];
    saveData();
    
    alert(`${getMaskedName(person.name)}さんへの連絡タスクを今日のタスクに追加しました！`);
    refreshPeopleContent();
}

// Export functions to global scope
window.renderPeople = renderPeople;
window.updateSearch = updateSearch;
window.setViewMode = setViewMode;
window.updateSort = updateSort;
window.toggleTagFilter = toggleTagFilter;
window.toggleTag = toggleTag;
window.clearTags = clearTags;
window.clearAllFilters = clearAllFilters;
window.quickContact = quickContact;

// Modal rendering functions
function renderPersonModal() {
    return `
        <!-- Person Detail Modal -->
        <div id="person-detail-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closePersonDetail()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-6xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="person-detail-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    `;
}

function renderAddPersonModal() {
    return `
        <!-- Add Person Modal -->
        <div id="add-person-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeAddPersonModal()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <h3 class="text-xl font-semibold mb-6">新しい人物を追加</h3>
                <form onsubmit="addNewPerson(event)">
                    <div class="grid gap-4 md:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium mb-2">名前 *</label>
                            <input type="text" id="new-person-name" class="w-full p-2 border border-input rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">役職 *</label>
                            <input type="text" id="new-person-role" class="w-full p-2 border border-input rounded-md" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">メールアドレス</label>
                            <input type="email" id="new-person-email" class="w-full p-2 border border-input rounded-md">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">電話番号</label>
                            <input type="tel" id="new-person-phone" class="w-full p-2 border border-input rounded-md">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium mb-2">タグ（カンマ区切り）</label>
                        <input type="text" id="new-person-tags" class="w-full p-2 border border-input rounded-md" placeholder="例: #移住相談, #農業, #イベント">
                    </div>
                    <div class="grid gap-4 md:grid-cols-2 mt-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">エリア</label>
                            <select id="new-person-area" class="w-full p-2 border border-input rounded-md">
                                <option value="地域内">地域内</option>
                                <option value="地域外">地域外</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">住所</label>
                            <input type="text" id="new-person-address" class="w-full p-2 border border-input rounded-md" placeholder="例: 北海道虻田郡喜茂別町字喜茂別123">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium mb-2">ランドマーク・目印</label>
                        <input type="text" id="new-person-landmark" class="w-full p-2 border border-input rounded-md" placeholder="例: 喜茂別駅から徒歩5分">
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium mb-2">メモ</label>
                        <textarea id="new-person-notes" class="w-full p-2 border border-input rounded-md h-24" placeholder="この人との関係や特記事項を記録"></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" onclick="closeAddPersonModal()" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                            キャンセル
                        </button>
                        <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                            追加
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function openPersonDetail(personId) {
    const person = getPersonById(personId);
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    const suggestions = generateSuggestions(person);
    const relationshipStrength = getRelationshipStrength(person);
    const daysSinceContact = daysSince(person.lastContact);
    const urgency = getUrgencyLevel(daysSinceContact);
    
    // Get related actions
    const relatedActions = sampleData.actions.filter(action => 
        action.linkedPeople.includes(personId)
    ).slice(0, 5);
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <div class="avatar avatar-xl">${person.avatar}</div>
                    <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${relationshipStrength === 'strong' ? 'bg-green-500' : relationshipStrength === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'}"></div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold">${getMaskedName(person.name)}</h2>
                    <p class="text-muted-foreground">${person.role}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <span class="text-sm px-2 py-1 rounded-full ${relationshipStrength === 'strong' ? 'bg-green-100 text-green-700' : relationshipStrength === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
                            関係: ${relationshipStrength === 'strong' ? '強い' : relationshipStrength === 'medium' ? '普通' : '弱い'}
                        </span>
                        ${urgency === 'high' ? '<span class="text-sm px-2 py-1 rounded-full bg-red-100 text-red-700">要フォロー</span>' : ''}
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="editPerson(${person.id})" class="px-3 py-2 border border-input rounded-md hover:bg-accent">
                    編集
                </button>
                <button onclick="closePersonDetail()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="grid gap-6 lg:grid-cols-3">
            <!-- Left Column: Basic Info -->
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">基本情報</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-1">連絡先</h4>
                            <p class="text-sm">${appState.masking ? '非表示' : person.email}</p>
                            <p class="text-sm">${appState.masking ? '非表示' : person.phone}</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-1">拠点</h4>
                            ${person.location ? `
                                <div class="space-y-1">
                                    <p class="text-sm">
                                        <span class="inline-block px-2 py-1 text-xs rounded-full ${person.location.area === '地域内' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${person.location.area}</span>
                                    </p>
                                    ${person.location.address ? `<p class="text-sm text-gray-700">${person.location.address}</p>` : ''}
                                    ${person.location.landmark ? `<p class="text-xs text-muted-foreground">${person.location.landmark}</p>` : ''}
                                    ${person.location.lat && person.location.lng ? `
                                        <p class="text-xs text-muted-foreground">
                                            座標: ${person.location.lat.toFixed(4)}, ${person.location.lng.toFixed(4)}
                                            <button onclick="openMapWithLocation(${person.location.lat}, ${person.location.lng})" class="ml-2 text-blue-600 hover:text-blue-800">
                                                <svg class="inline-block w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                                    <circle cx="12" cy="10" r="3"/>
                                                </svg>
                                                地図で確認
                                            </button>
                                        </p>
                                    ` : ''}
                                </div>
                            ` : '<p class="text-sm text-muted-foreground">拠点情報が設定されていません</p>'}
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-1">最終連絡</h4>
                            <p class="text-sm ${urgency === 'high' ? 'text-red-600 font-medium' : urgency === 'medium' ? 'text-yellow-600' : ''}">${formatDate(person.lastContact)} (${daysSinceContact}日前)</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-1">タグ</h4>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${person.tags.map(tag => `<span class="tag ${tag.slice(1)}">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-1">メモ</h4>
                            <p class="text-sm text-gray-700">${person.notes}</p>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">クイックアクション</h3>
                    </div>
                    <div class="card-content space-y-2">
                        <button onclick="quickContact(${person.id}); closePersonDetail();" class="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center space-x-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span>今日連絡する</span>
                        </button>
                        <button onclick="scheduleMeeting(${person.id})" class="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center space-x-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>ミーティング予約</span>
                        </button>
                        <button onclick="addPersonToProject(${person.id})" class="w-full text-left px-3 py-2 rounded-md hover:bg-accent flex items-center space-x-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <span>プロジェクトに追加</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Middle Column: Suggestions -->
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">提案アクション</h3>
                    </div>
                    <div class="card-content space-y-3">
                        ${suggestions.length > 0 ? suggestions.map((suggestion, index) => `
                            <div class="p-3 border rounded-lg">
                                <div class="flex items-start justify-between">
                                    <div class="flex-1">
                                        <h4 class="font-medium text-sm">${suggestion.title}</h4>
                                        <p class="text-xs text-muted-foreground mt-1">${suggestion.description}</p>
                                        <span class="inline-block mt-2 text-xs px-2 py-1 rounded-full ${suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
                                            ${suggestion.priority === 'high' ? '高優先度' : suggestion.priority === 'medium' ? '中優先度' : '低優先度'}
                                        </span>
                                    </div>
                                    <button onclick="createActionFromSuggestion(${person.id}, ${index})" class="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                                        実行
                                    </button>
                                </div>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">現在提案がありません</p>'}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">関連アクション履歴</h3>
                    </div>
                    <div class="card-content space-y-3">
                        ${relatedActions.length > 0 ? relatedActions.map(action => `
                            <div class="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                                <span class="badge action-${action.type} text-xs">${action.type}</span>
                                <div class="flex-1">
                                    <p class="text-sm">${action.content}</p>
                                    <p class="text-xs text-muted-foreground">${formatDate(action.deadline)}</p>
                                </div>
                                <span class="badge status-${action.status.toLowerCase()} text-xs">${action.status}</span>
                            </div>
                        `).join('') : '<p class="text-sm text-muted-foreground">関連アクションがありません</p>'}
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Analytics -->
            <div class="space-y-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">関係性分析</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-2">連絡頻度</h4>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="h-2 rounded-full ${relationshipStrength === 'strong' ? 'bg-green-600 w-5/6' : relationshipStrength === 'medium' ? 'bg-yellow-600 w-3/6' : 'bg-gray-600 w-1/6'}"></div>
                            </div>
                            <p class="text-xs text-muted-foreground mt-1">
                                ${relationshipStrength === 'strong' ? '活発な関係' : relationshipStrength === 'medium' ? '定期的な関係' : '希薄な関係'}
                            </p>
                        </div>
                        
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-2">コミュニケーション統計</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span>総アクション数</span>
                                    <span class="font-medium">${relatedActions.length}件</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>完了率</span>
                                    <span class="font-medium">${relatedActions.length > 0 ? Math.round((relatedActions.filter(a => a.status === 'Done').length / relatedActions.length) * 100) : 0}%</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span>平均レスポンス</span>
                                    <span class="font-medium">2.3日</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="text-sm font-medium text-muted-foreground mb-2">推奨アクション</h4>
                            <div class="text-sm space-y-1">
                                ${urgency === 'high' ? '<p class="text-red-600">• 早急な連絡が必要です</p>' : ''}
                                ${relationshipStrength === 'weak' ? '<p class="text-yellow-600">• 関係性の強化を検討してください</p>' : ''}
                                ${person.tags.includes('#イベント') ? '<p class="text-blue-600">• イベント関連の情報共有を検討</p>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">ネットワーク</h3>
                    </div>
                    <div class="card-content">
                        <p class="text-sm text-muted-foreground mb-3">共通のつながり</p>
                        <div class="flex flex-wrap gap-2">
                            ${getCommonConnections(person).map(connection => `
                                <div class="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded-full">
                                    <div class="avatar avatar-xs">${connection.avatar}</div>
                                    <span>${getMaskedName(connection.name)}</span>
                                </div>
                            `).join('')}
                        </div>
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

function openAddPersonModal() {
    document.getElementById('add-person-modal').classList.remove('hidden');
}

function closeAddPersonModal() {
    document.getElementById('add-person-modal').classList.add('hidden');
    // Clear form
    document.getElementById('new-person-name').value = '';
    document.getElementById('new-person-role').value = '';
    document.getElementById('new-person-email').value = '';
    document.getElementById('new-person-phone').value = '';
    document.getElementById('new-person-tags').value = '';
    document.getElementById('new-person-area').value = '地域内';
    document.getElementById('new-person-address').value = '';
    document.getElementById('new-person-lat').value = '';
    document.getElementById('new-person-lng').value = '';
    document.getElementById('new-person-landmark').value = '';
    document.getElementById('new-person-notes').value = '';
}

function addNewPerson(event) {
    event.preventDefault();
    
    const name = document.getElementById('new-person-name').value.trim();
    const role = document.getElementById('new-person-role').value.trim();
    const email = document.getElementById('new-person-email').value.trim();
    const phone = document.getElementById('new-person-phone').value.trim();
    const tagsInput = document.getElementById('new-person-tags').value.trim();
    const area = document.getElementById('new-person-area').value;
    const address = document.getElementById('new-person-address').value.trim();
    const lat = parseFloat(document.getElementById('new-person-lat').value) || null;
    const lng = parseFloat(document.getElementById('new-person-lng').value) || null;
    const landmark = document.getElementById('new-person-landmark').value.trim();
    const notes = document.getElementById('new-person-notes').value.trim();
    
    // Process tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => {
        const cleanTag = tag.trim();
        return cleanTag.startsWith('#') ? cleanTag : '#' + cleanTag;
    }) : [];
    
    // Generate avatar
    const avatar = name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').slice(0, 2);
    
    const newPerson = {
        id: sampleData.people.length + 1,
        name: name,
        role: role,
        tags: tags,
        lastContact: new Date().toISOString().split('T')[0], // Today
        email: email || 'example@email.com',
        phone: phone || '090-0000-0000',
        notes: notes || '',
        avatar: avatar,
        location: {
            area: area,
            address: address || '',
            lat: lat,
            lng: lng,
            landmark: landmark || ''
        }
    };
    
    sampleData.people.push(newPerson);
    saveData();
    closeAddPersonModal();
    renderCurrentRoute(); // Refresh the people page
    
    alert(`${name}さんをネットワークに追加しました！`);
}

function getCommonConnections(person) {
    // Simple demo: return random 2-3 people as common connections
    const others = sampleData.people.filter(p => p.id !== person.id);
    return others.slice(0, Math.min(3, others.length));
}

function editPerson(personId) {
    const person = getPersonById(personId);
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-4">
                <div class="avatar avatar-xl">${person.avatar}</div>
                <div>
                    <h2 class="text-2xl font-bold">人物情報を編集</h2>
                    <p class="text-muted-foreground">${getMaskedName(person.name)}</p>
                </div>
            </div>
            <button onclick="openPersonDetail(${person.id})" class="text-muted-foreground hover:text-foreground">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        <form onsubmit="savePersonEdit(event, ${person.id})" class="space-y-6">
            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Left Column: Basic Info -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">基本情報</h3>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">名前 *</label>
                                <input type="text" id="edit-person-name" value="${person.name}" class="w-full p-2 border border-input rounded-md" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">役職 *</label>
                                <input type="text" id="edit-person-role" value="${person.role}" class="w-full p-2 border border-input rounded-md" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">メールアドレス</label>
                                <input type="email" id="edit-person-email" value="${person.email}" class="w-full p-2 border border-input rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">電話番号</label>
                                <input type="tel" id="edit-person-phone" value="${person.phone}" class="w-full p-2 border border-input rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">タグ（カンマ区切り）</label>
                                <input type="text" id="edit-person-tags" value="${person.tags.join(', ')}" class="w-full p-2 border border-input rounded-md" placeholder="例: #移住相談, #農業, #イベント">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">メモ</label>
                                <textarea id="edit-person-notes" class="w-full p-2 border border-input rounded-md h-24" placeholder="この人との関係や特記事項を記録">${person.notes}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column: Location Info -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">拠点情報</h3>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">エリア</label>
                                <select id="edit-person-area" class="w-full p-2 border border-input rounded-md">
                                    <option value="地域内" ${person.location?.area === '地域内' ? 'selected' : ''}>地域内</option>
                                    <option value="地域外" ${person.location?.area === '地域外' ? 'selected' : ''}>地域外</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">住所</label>
                                <input type="text" id="edit-person-address" value="${person.location?.address || ''}" class="w-full p-2 border border-input rounded-md" placeholder="例: 北海道虻田郡喜茂別町字喜茂別123">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium mb-2">緯度</label>
                                    <input type="number" step="any" id="edit-person-lat" value="${person.location?.lat || ''}" class="w-full p-2 border border-input rounded-md" placeholder="42.8314">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-2">経度</label>
                                    <input type="number" step="any" id="edit-person-lng" value="${person.location?.lng || ''}" class="w-full p-2 border border-input rounded-md" placeholder="140.9678">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-2">ランドマーク・目印</label>
                                <input type="text" id="edit-person-landmark" value="${person.location?.landmark || ''}" class="w-full p-2 border border-input rounded-md" placeholder="例: 喜茂別駅から徒歩5分">
                            </div>
                            <div class="bg-blue-50 border border-blue-200 rounded-md p-3">
                                <p class="text-sm text-blue-700 mb-2">
                                    <svg class="inline-block w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                    住所や緯度経度を設定すると、マップページに表示されます
                                </p>
                                <button type="button" onclick="getCurrentLocation()" class="text-sm text-blue-600 hover:text-blue-800 underline">
                                    現在地を取得する
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h3 class="font-semibold">最終連絡日</h3>
                        </div>
                        <div class="card-content">
                            <div>
                                <label class="block text-sm font-medium mb-2">最終連絡日</label>
                                <input type="date" id="edit-person-lastcontact" value="${person.lastContact}" class="w-full p-2 border border-input rounded-md">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-6 border-t">
                <button type="button" onclick="openPersonDetail(${person.id})" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    キャンセル
                </button>
                <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    保存
                </button>
            </div>
        </form>
    `;
    
    modal.classList.remove('hidden');
}

function savePersonEdit(event, personId) {
    event.preventDefault();
    
    const name = document.getElementById('edit-person-name').value.trim();
    const role = document.getElementById('edit-person-role').value.trim();
    const email = document.getElementById('edit-person-email').value.trim();
    const phone = document.getElementById('edit-person-phone').value.trim();
    const tagsInput = document.getElementById('edit-person-tags').value.trim();
    const notes = document.getElementById('edit-person-notes').value.trim();
    const area = document.getElementById('edit-person-area').value;
    const address = document.getElementById('edit-person-address').value.trim();
    const lat = parseFloat(document.getElementById('edit-person-lat').value) || null;
    const lng = parseFloat(document.getElementById('edit-person-lng').value) || null;
    const landmark = document.getElementById('edit-person-landmark').value.trim();
    const lastContact = document.getElementById('edit-person-lastcontact').value;
    
    // Process tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => {
        const cleanTag = tag.trim();
        return cleanTag.startsWith('#') ? cleanTag : '#' + cleanTag;
    }) : [];
    
    // Find and update the person
    const personIndex = sampleData.people.findIndex(p => p.id === personId);
    if (personIndex !== -1) {
        const person = sampleData.people[personIndex];
        
        // Update basic info
        person.name = name;
        person.role = role;
        person.email = email;
        person.phone = phone;
        person.tags = tags;
        person.notes = notes;
        person.lastContact = lastContact;
        
        // Update location info
        if (!person.location) {
            person.location = {};
        }
        person.location.area = area;
        person.location.address = address;
        person.location.lat = lat;
        person.location.lng = lng;
        person.location.landmark = landmark;
        
        // Update avatar if name changed
        person.avatar = name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').slice(0, 2);
        
        saveData();
        openPersonDetail(personId); // Return to detail view
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        successMessage.textContent = '人物情報を更新しました';
        document.body.appendChild(successMessage);
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    }
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('このブラウザでは位置情報を取得できません');
        return;
    }
    
    const latInput = document.getElementById('edit-person-lat');
    const lngInput = document.getElementById('edit-person-lng');
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            latInput.value = position.coords.latitude.toFixed(6);
            lngInput.value = position.coords.longitude.toFixed(6);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
            successMessage.textContent = '現在地を取得しました';
            document.body.appendChild(successMessage);
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 3000);
        },
        function(error) {
            let message = '位置情報の取得に失敗しました';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = '位置情報の使用が許可されていません';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = '位置情報が利用できません';
                    break;
                case error.TIMEOUT:
                    message = '位置情報の取得がタイムアウトしました';
                    break;
            }
            alert(message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

function scheduleMeeting(personId) {
    const person = getPersonById(personId);
    
    const newAction = {
        id: sampleData.actions.length + 1,
        content: `${getMaskedName(person.name)}さんとミーティング`,
        type: '調整',
        linkedPeople: [personId],
        linkedProjects: [],
        status: 'Todo',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        weeklyTarget: true,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    
    alert('ミーティングのタスクを作成しました！');
}

function addPersonToProject(personId) {
    alert('プロジェクト追加機能は今後実装予定です');
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
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        weeklyTarget: suggestion.priority === 'high',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    sampleData.actions.push(newAction);
    saveData();
    
    alert('新しいアクションが作成されました！');
    closePersonDetail();
}

function exportPeopleData() {
    const data = {
        people: sampleData.people,
        exportDate: new Date().toISOString(),
        totalCount: sampleData.people.length
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `people-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function renderCategoryDetailModal() {
    return `
        <!-- Category Detail Modal -->
        <div id="category-detail-modal" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" onclick="closeCategoryDetail()"></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-4xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
                <div id="category-detail-content">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    `;
}

function showCategoryDetail(category) {
    const modal = document.getElementById('category-detail-modal');
    const content = document.getElementById('category-detail-content');
    
    const categoryData = getCategoryPeople(category);
    const categoryInfo = getCategoryInfo(category);
    
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 ${categoryInfo.bgColor} rounded-lg flex items-center justify-center">
                    ${categoryInfo.icon}
                </div>
                <div>
                    <h2 class="text-2xl font-bold">${categoryInfo.title}</h2>
                    <p class="text-muted-foreground">${categoryInfo.description}</p>
                    <p class="text-sm text-muted-foreground mt-1">${categoryData.length}人が該当します</p>
                </div>
            </div>
            <button onclick="closeCategoryDetail()" class="text-muted-foreground hover:text-foreground">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        
        ${categoryData.length > 0 ? `
            <div class="space-y-4">
                ${categoryData.map(person => {
                    const relationshipStrength = getRelationshipStrength(person);
                    const daysSinceContact = daysSince(person.lastContact);
                    const urgency = getUrgencyLevel(daysSinceContact);
                    
                    return `
                        <div class="card hover:shadow-md transition-all duration-200 ${urgency === 'high' ? 'border-red-200 bg-red-50' : urgency === 'medium' ? 'border-yellow-200 bg-yellow-50' : ''}">
                            <div class="card-content">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <div class="relative">
                                            <div class="avatar avatar-lg">${person.avatar}</div>
                                            <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${relationshipStrength === 'strong' ? 'bg-green-500' : relationshipStrength === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'}"></div>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center space-x-2">
                                                <h3 class="font-semibold">${getMaskedName(person.name)}</h3>
                                                ${urgency === 'high' ? '<span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">緊急</span>' : ''}
                                                ${category === 'strong' ? '<span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">強いつながり</span>' : ''}
                                                ${category === 'recent' ? '<span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">新規</span>' : ''}
                                            </div>
                                            <p class="text-sm text-muted-foreground">${person.role}</p>
                                            <div class="flex flex-wrap gap-1 mt-2">
                                                ${person.tags.slice(0, 3).map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                                                ${person.tags.length > 3 ? `<span class="text-xs text-muted-foreground">+${person.tags.length - 3}</span>` : ''}
                                            </div>
                                            <div class="flex items-center justify-between mt-3">
                                                <p class="text-xs text-muted-foreground">
                                                    最終連絡: <span class="${urgency === 'high' ? 'text-red-600 font-medium' : urgency === 'medium' ? 'text-yellow-600 font-medium' : ''}">${daysSinceContact}日前</span>
                                                </p>
                                                ${category === 'needsFollow' ? `
                                                    <div class="text-xs text-orange-600">
                                                        ${daysSinceContact > 30 ? '1ヶ月以上連絡なし' : daysSinceContact > 14 ? '2週間以上連絡なし' : ''}
                                                    </div>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex flex-col space-y-2">
                                        ${category === 'needsFollow' ? `
                                            <button onclick="quickContact(${person.id}); closeCategoryDetail(); refreshPeopleContent();" class="text-xs bg-orange-100 text-orange-700 px-3 py-2 rounded hover:bg-orange-200 font-medium">
                                                今すぐ連絡
                                            </button>
                                        ` : `
                                            <button onclick="quickContact(${person.id}); closeCategoryDetail(); refreshPeopleContent();" class="text-xs bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200">
                                                連絡
                                            </button>
                                        `}
                                        <button onclick="openPersonDetail(${person.id}); closeCategoryDetail();" class="text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200">
                                            詳細
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            ${category === 'needsFollow' && categoryData.length > 0 ? `
                <div class="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-medium text-orange-800">一括アクション</h4>
                            <p class="text-sm text-orange-700">該当する全員に対して連絡タスクを作成できます</p>
                        </div>
                        <button onclick="createBulkFollowTasks('${category}')" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                            全員に連絡タスク作成
                        </button>
                    </div>
                </div>
            ` : ''}
            
            ${category === 'strong' && categoryData.length > 0 ? `
                <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-medium text-green-800">強いつながりを活用</h4>
                            <p class="text-sm text-green-700">これらの方々にプロジェクトへの協力や新しいネットワークの紹介を依頼できます</p>
                        </div>
                        <button onclick="suggestNetworkingOpportunities('${category}')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            ネットワーキング提案
                        </button>
                    </div>
                </div>
            ` : ''}
        ` : `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-muted-foreground mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
                <h3 class="text-lg font-medium text-muted-foreground mb-2">該当する人がいません</h3>
                <p class="text-sm text-muted-foreground">${categoryInfo.emptyMessage}</p>
            </div>
        `}
    `;
    
    modal.classList.remove('hidden');
}

function getCategoryPeople(category) {
    const people = sampleData.people;
    
    switch (category) {
        case 'active':
            return people.filter(person => daysSince(person.lastContact) <= 30);
        case 'strong':
            return people.filter(person => getRelationshipStrength(person) === 'strong');
        case 'needsFollow':
            return people.filter(person => daysSince(person.lastContact) > 14);
        case 'recent':
            return people.filter(person => daysSince(person.lastContact) <= 7);
        default:
            return [];
    }
}

function getCategoryInfo(category) {
    const categories = {
        active: {
            title: 'アクティブなネットワーク',
            description: '30日以内に連絡を取った人たち',
            emptyMessage: 'アクティブなネットワークがありません。定期的な連絡を心がけましょう。',
            bgColor: 'bg-blue-200',
            icon: `<svg class="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>`
        },
        strong: {
            title: '強いつながりのネットワーク',
            description: '2週間以内に連絡を取った関係の深い人たち',
            emptyMessage: '強いつながりがありません。定期的なコミュニケーションで関係を深めましょう。',
            bgColor: 'bg-green-200',
            icon: `<svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>`
        },
        needsFollow: {
            title: 'フォローが必要なネットワーク',
            description: '2週間以上連絡を取っていない人たち',
            emptyMessage: 'フォローが必要な人はいません。素晴らしい関係管理です！',
            bgColor: 'bg-orange-200',
            icon: `<svg class="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`
        },
        recent: {
            title: '新規・最近のネットワーク',
            description: '1週間以内に連絡を取った新しいつながり',
            emptyMessage: '最近の新しいつながりがありません。新しいネットワーク作りを検討しましょう。',
            bgColor: 'bg-purple-200',
            icon: `<svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>`
        }
    };
    
    return categories[category] || categories.active;
}

function closeCategoryDetail() {
    document.getElementById('category-detail-modal').classList.add('hidden');
}

function createBulkFollowTasks(category) {
    const people = getCategoryPeople(category);
    let createdTasks = 0;
    
    people.forEach(person => {
        const newAction = {
            id: sampleData.actions.length + 1 + createdTasks,
            content: `${getMaskedName(person.name)}さんにフォローアップ連絡`,
            type: '連絡',
            linkedPeople: [person.id],
            linkedProjects: [],
            status: 'Todo',
            deadline: new Date(Date.now() + (createdTasks * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], // Spread over days
            weeklyTarget: true,
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        sampleData.actions.push(newAction);
        createdTasks++;
    });
    
    saveData();
    closeCategoryDetail();
    
    alert(`${createdTasks}人に対するフォローアップタスクを作成しました！`);
    refreshPeopleContent();
}

function suggestNetworkingOpportunities(category) {
    const people = getCategoryPeople(category);
    
    const suggestions = [
        'イベント企画への協力依頼',
        '新しいネットワークの紹介をお願い',
        'プロジェクトへの参加打診',
        '意見交換・相談の機会設定',
        'コラボレーション企画の提案'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    alert(`強いつながりを活用した提案:\n\n"${randomSuggestion}"\n\n${people.length}人の強いつながりがあります。この関係性を活用して新しい機会を創出しましょう！`);
}
window.closePersonDetail = closePersonDetail;
window.openAddPersonModal = openAddPersonModal;
window.closeAddPersonModal = closeAddPersonModal;
window.addNewPerson = addNewPerson;
window.editPerson = editPerson;
window.scheduleMeeting = scheduleMeeting;
window.addPersonToProject = addPersonToProject;
window.createActionFromSuggestion = createActionFromSuggestion;
window.exportPeopleData = exportPeopleData;
window.showCategoryDetail = showCategoryDetail;
window.closeCategoryDetail = closeCategoryDetail;
window.createBulkFollowTasks = createBulkFollowTasks;
window.suggestNetworkingOpportunities = suggestNetworkingOpportunities;
window.addLocationToPerson = addLocationToPerson;

function addLocationToPerson(personId) {
    const person = sampleData.people.find(p => p.id === personId);
    if (!person) return;
    
    const location = prompt(`${getMaskedName(person.name)}さんの位置情報を入力してください。\n\n形式: 地域内/地域外, 住所, 目印\n例: 地域内, 北海道虻田郡喜茂別町字喜茂別123, 喜茂別駅から徒歩5分`);
    
    if (location) {
        const parts = location.split(',').map(s => s.trim());
        if (parts.length >= 3) {
            person.location = {
                area: parts[0],
                address: parts[1],
                landmark: parts[2],
                lat: 42.8329 + (Math.random() - 0.5) * 0.1, // Random position around Kimobetsu
                lng: 140.9689 + (Math.random() - 0.5) * 0.1
            };
            
            saveData();
            refreshPeopleContent();
            alert('位置情報を登録しました！');
        } else {
            alert('正しい形式で入力してください。');
        }
    }
}

function openMapWithLocation(lat, lng) {
    // Save the location to highlight on map
    sessionStorage.setItem('highlightLocation', JSON.stringify({ lat, lng }));
    
    // Navigate to map page
    window.location.hash = '#map';
    closePersonDetail();
}

// Export new functions to window for global access
window.savePersonEdit = savePersonEdit;
window.getCurrentLocation = getCurrentLocation;
window.openMapWithLocation = openMapWithLocation;