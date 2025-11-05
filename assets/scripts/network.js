(function() {
    /**
     * network.js - Core Network Module
     * Main orchestration layer integrating all network-related modules.
     */

function renderPeople(container) {
    const filteredPeople = window.NetworkFilters.getFilteredPeople();
    const allTags = window.NetworkStats.getAllTags();
    const relationshipStats = window.NetworkStats.getRelationshipStats();
    const currentViewMode = window.NetworkFilters.getCurrentViewMode();
    const searchQuery = window.NetworkFilters.getSearchQuery();
    const selectedTags = window.NetworkFilters.getSelectedTags();
    const sortBy = window.NetworkFilters.getSortBy();
    
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
                ${window.NetworkViews.renderPeopleContent(filteredPeople)}
            </div>
        </div>
        
        ${window.NetworkModals.renderPersonModal()}
        ${window.NetworkModals.renderAddPersonModal()}
        ${window.NetworkModals.renderCategoryDetailModal()}
    `;
}


    // Public API
    window.renderPeople = renderPeople;
})();
