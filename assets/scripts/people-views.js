// ===============================
// LocalSuccess - People Views Module
// ===============================
// Purpose: Render different view modes (cards, list, network)

(function(){
'use strict';

/**
 * Render people content based on current view mode
 * @param {Array} people - Filtered people array
 * @returns {string} HTML string
 */
function renderPeopleContent(people) {
    const viewMode = window.PeopleFilters.getCurrentViewMode();
    
    if (viewMode === 'cards') {
        return renderCardsView(people);
    } else if (viewMode === 'list') {
        return renderListView(people);
    } else if (viewMode === 'network') {
        return renderNetworkView(people);
    }
}

/**
 * Render card view
 * @param {Array} people - People to display
 * @returns {string} HTML string
 */
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
                const relationshipStrength = window.getRelationshipStrength(person);
                const daysSinceLastContact = daysSince(person.lastContact);
                const urgency = window.getUrgencyLevel(daysSinceLastContact);
                
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

/**
 * Render list view
 * @param {Array} people - People to display
 * @returns {string} HTML string
 */
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
                            const relationshipStrength = window.getRelationshipStrength(person);
                            const daysSinceLastContact = daysSince(person.lastContact);
                            const urgency = window.getUrgencyLevel(daysSinceLastContact);
                            
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

/**
 * Render network view (visual network graph)
 * @param {Array} people - People to display
 * @returns {string} HTML string
 */
function renderNetworkView(people) {
    const networkData = window.PeopleNetwork.generateNetworkData(people);
    
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
                                <div class="avatar avatar-lg mx-auto ${window.getRelationshipStrength(person) === 'strong' ? 'ring-4 ring-green-300' : window.getRelationshipStrength(person) === 'medium' ? 'ring-2 ring-yellow-300' : 'ring-1 ring-gray-300'}">${person.avatar}</div>
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

// Public API
window.PeopleViews = {
    renderPeopleContent,
    renderCardsView,
    renderListView,
    renderNetworkView
};

// Backward compatibility
window.renderPeopleContent = renderPeopleContent;
window.renderCardsView = renderCardsView;
window.renderListView = renderListView;
window.renderNetworkView = renderNetworkView;

})();
