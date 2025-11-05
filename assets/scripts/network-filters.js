// ===============================
// LocalSuccess - Network Filters Module
// ===============================
// Purpose: Search, filter, and sort functionality for network

(function(){
'use strict';

// Filter state
let currentViewMode = 'cards'; // 'cards', 'list', 'network'
let searchQuery = '';
let selectedTags = [];
let sortBy = 'lastContact'; // 'name', 'role', 'lastContact', 'relationship'

/**
 * Get filtered and sorted people based on current filter state
 * @returns {Array} Filtered people array
 */
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
                const strengthA = window.getRelationshipStrength(a);
                const strengthB = window.getRelationshipStrength(b);
                const order = { strong: 3, medium: 2, weak: 1 };
                return order[strengthB] - order[strengthA];
            default:
                return 0;
        }
    });
    
    return filtered;
}

/**
 * Update search query and refresh content
 * @param {string} value - Search query
 */
function updateSearch(value) {
    searchQuery = value;
    refreshPeopleContent();
}

/**
 * Set view mode and refresh content
 * @param {string} mode - View mode ('cards', 'list', 'network')
 */
function setViewMode(mode) {
    currentViewMode = mode;
    refreshPeopleContent();
}

/**
 * Update sort criteria and refresh content
 * @param {string} value - Sort criteria
 */
function updateSort(value) {
    sortBy = value;
    refreshPeopleContent();
}

/**
 * Toggle tag filter dropdown visibility
 */
function toggleTagFilter() {
    const dropdown = document.getElementById('tag-filter-dropdown');
    dropdown.classList.toggle('hidden');
}

/**
 * Toggle tag selection
 * @param {string} tag - Tag to toggle
 */
function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
    } else {
        selectedTags.push(tag);
    }
    refreshPeopleContent();
}

/**
 * Clear all selected tags
 */
function clearTags() {
    selectedTags = [];
    refreshPeopleContent();
}

/**
 * Clear all filters (search and tags)
 */
function clearAllFilters() {
    searchQuery = '';
    selectedTags = [];
    const searchInput = document.getElementById('people-search');
    if (searchInput) {
        searchInput.value = '';
    }
    refreshPeopleContent();
}

/**
 * Refresh people content area
 */
function refreshPeopleContent() {
    const filteredPeople = getFilteredPeople();
    const contentEl = document.getElementById('people-content');
    if (contentEl && window.renderPeopleContent) {
        contentEl.innerHTML = window.renderPeopleContent(filteredPeople);
    }
    
    // Update tag filter dropdown
    const tagFilterDropdown = document.getElementById('tag-filter-dropdown');
    if (tagFilterDropdown && !tagFilterDropdown.classList.contains('hidden')) {
        tagFilterDropdown.classList.add('hidden');
    }
}

// Getters for state access
function getCurrentViewMode() {
    return currentViewMode;
}

function getSearchQuery() {
    return searchQuery;
}

function getSelectedTags() {
    return selectedTags;
}

function getSortBy() {
    return sortBy;
}

// Public API
window.NetworkFilters = {
    getFilteredPeople,
    updateSearch,
    setViewMode,
    updateSort,
    toggleTagFilter,
    toggleTag,
    clearTags,
    clearAllFilters,
    refreshPeopleContent,
    getCurrentViewMode,
    getSearchQuery,
    getSelectedTags,
    getSortBy
};

// Backward compatibility - expose individual functions
window.getFilteredPeople = getFilteredPeople;
window.updateSearch = updateSearch;
window.setViewMode = setViewMode;
window.updateSort = updateSort;
window.toggleTagFilter = toggleTagFilter;
window.toggleTag = toggleTag;
window.clearTags = clearTags;
window.clearAllFilters = clearAllFilters;
window.refreshPeopleContent = refreshPeopleContent;

})();
