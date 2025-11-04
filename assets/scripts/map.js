/**
 * 統一マップコンポーネント
 * ネットワークとプロジェクトの両方を地図上で管理
 */

// マップのデフォルト設定
const MAP_CONFIG = {
    defaultCenter: { lat: 42.8329, lng: 140.9689 }, // 喜茂別町役場
    defaultZoom: 12,
    peopleIcon: {
        地域内: { color: '#22c55e', size: 'large' }, // 緑色・大
        地域外: { color: '#3b82f6', size: 'medium' } // 青色・中
    },
    projectIcon: {
        地域内: { color: '#f59e0b', size: 'large' }, // オレンジ色・大
        地域外: { color: '#8b5cf6', size: 'medium' } // 紫色・中
    }
};

function renderMapComponent(containerId, options = {}) {
    const {
        showPeople = true,
        showProjects = true,
        filterArea = null, // 'local', 'external', null (all)
        selectedPersonId = null,
        selectedProjectId = null,
        onPersonClick = null,
        onProjectClick = null,
        height = '500px'
    } = options;

    const container = document.getElementById(containerId);
    if (!container) return;

    const peopleData = showPeople ? getPeopleWithLocation() : [];
    const projectData = showProjects ? getProjectsWithLocation() : [];

    // フィルタリング
    const filteredPeople = filterArea ? 
        peopleData.filter(p => filterArea === 'local' ? p.location.area === '地域内' : p.location.area === '地域外') :
        peopleData;
        
    const filteredProjects = filterArea ?
        projectData.filter(p => filterArea === 'local' ? p.location.area === '地域内' : p.location.area === '地域外') :
        projectData;

    container.innerHTML = `
        <div class="map-container bg-white rounded-lg border border-border overflow-hidden">
            <!-- Map Header -->
            <div class="map-header p-4 bg-gray-50 border-b border-border">
                ${createMapControls({
                    containerId,
                    currentFilter: filterArea,
                    showPeople,
                    showProjects,
                    peopleCount: filteredPeople.length,
                    projectCount: filteredProjects.length
                })}
                
                <!-- Legend -->
                <div class="flex flex-wrap items-center gap-4 mt-3 text-xs">
                    ${createMapLegend({
                        items: [
                            ...(showPeople ? [
                                { 
                                    color: 'green', 
                                    label: '地域内ネットワーク', 
                                    count: filteredPeople.filter(p => p.location.area === '地域内').length 
                                },
                                { 
                                    color: 'blue', 
                                    label: '地域外ネットワーク', 
                                    count: filteredPeople.filter(p => p.location.area === '地域外').length 
                                }
                            ] : []),
                            ...(showProjects ? [
                                { 
                                    color: 'orange', 
                                    label: '地域内プロジェクト', 
                                    count: filteredProjects.filter(p => p.location.area === '地域内').length 
                                },
                                { 
                                    color: 'purple', 
                                    label: '地域外プロジェクト', 
                                    count: filteredProjects.filter(p => p.location.area === '地域外').length 
                                }
                            ] : [])
                        ]
                    })}
                </div>
            </div>
            
            <!-- Map Canvas -->
            <div class="map-canvas relative bg-gray-100" style="height: ${height};">
                <!-- Simplified Map Display -->
                <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 p-4">
                    <!-- Map Grid -->
                    <div class="grid grid-cols-6 grid-rows-6 gap-1 h-full opacity-20">
                        ${Array(36).fill(0).map(() => '<div class="bg-gray-300 rounded-sm"></div>').join('')}
                    </div>
                    
                    <!-- Pins Container -->
                    <div class="absolute inset-0 p-4">
                        ${renderMapPins(filteredPeople, filteredProjects, selectedPersonId, selectedProjectId, onPersonClick, onProjectClick)}
                    </div>
                    
                    <!-- Map Info Overlay -->
                    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded p-3 shadow-sm">
                        <div class="text-xs font-medium text-gray-700">喜茂別町周辺</div>
                        <div class="text-xs text-gray-500">北海道虻田郡</div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="map-footer p-3 bg-gray-50 border-t border-border">
                <div class="flex justify-between items-center text-xs">
                    <div class="flex space-x-4">
                        <button onclick="centerMapOnLocal('${containerId}')" class="text-green-600 hover:text-green-700">
                            🏠 地域内に移動
                        </button>
                        <button onclick="showFullMap('${containerId}')" class="text-blue-600 hover:text-blue-700">
                            🗺️ 全体表示
                        </button>
                    </div>
                    <button onclick="exportMapData('${containerId}')" class="text-gray-600 hover:text-gray-700">
                        📍 位置情報エクスポート
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderMapPins(people, projects, selectedPersonId, selectedProjectId, onPersonClick, onProjectClick) {
    const pins = [];
    
    // People pins
    people.forEach((person, index) => {
        const isSelected = selectedPersonId === person.id;
        const isLocal = person.location.area === '地域内';
        const color = isLocal ? 'bg-green-500' : 'bg-blue-500';
        const size = isLocal ? 'w-6 h-6' : 'w-5 h-5';
        
        // Position calculation (simplified grid-based positioning)
        const gridX = isLocal ? (index % 3) + 1 : (index % 2) + 4;
        const gridY = isLocal ? Math.floor(index / 3) + 1 : Math.floor(index / 2) + 1;
        const left = (gridX / 6) * 100;
        const top = (gridY / 6) * 100;
        
        pins.push(`
            <div class="absolute ${size} ${color} rounded-full border-2 border-white shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-110 ${isSelected ? 'ring-4 ring-yellow-400 scale-125' : ''}"
                 style="left: ${left}%; top: ${top}%; transform: translate(-50%, -50%);"
                 onclick="${onPersonClick ? `${onPersonClick}(${person.id})` : `showPersonLocationDetail(${person.id})`}"
                 title="${getMaskedName(person.name)} - ${person.location.landmark}">
                <div class="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                    ${person.avatar.charAt(0)}
                </div>
                ${isSelected ? `
                    <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        ${getMaskedName(person.name)}
                    </div>
                ` : ''}
            </div>
        `);
    });
    
    // Project pins
    projects.forEach((project, index) => {
        const isSelected = selectedProjectId === project.id;
        const isLocal = project.location.area === '地域内';
        const color = isLocal ? 'bg-orange-500' : 'bg-purple-500';
        const size = isLocal ? 'w-8 h-6' : 'w-7 h-5';
        
        // Position calculation for projects (different area to avoid overlap)
        const gridX = isLocal ? (index % 2) + 2 : (index % 2) + 4;
        const gridY = isLocal ? Math.floor(index / 2) + 3 : Math.floor(index / 2) + 3;
        const left = (gridX / 6) * 100;
        const top = (gridY / 6) * 100;
        
        pins.push(`
            <div class="absolute ${size} ${color} rounded border-2 border-white shadow-lg cursor-pointer transform transition-all duration-200 hover:scale-110 ${isSelected ? 'ring-4 ring-yellow-400 scale-125' : ''}"
                 style="left: ${left}%; top: ${top}%; transform: translate(-50%, -50%);"
                 onclick="${onProjectClick ? `${onProjectClick}(${project.id})` : `showProjectLocationDetail(${project.id})`}"
                 title="${project.title} - ${project.location.landmark}">
                <div class="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                    📋
                </div>
                ${isSelected ? `
                    <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        ${project.title}
                    </div>
                ` : ''}
            </div>
        `);
    });
    
    return pins.join('');
}

function getPeopleWithLocation() {
    return sampleData.people.filter(person => person.location && person.location.lat && person.location.lng);
}

function getProjectsWithLocation() {
    return sampleData.projects.filter(project => project.location && project.location.lat && project.location.lng);
}

function showPersonLocationDetail(personId) {
    const person = sampleData.people.find(p => p.id === personId);
    if (!person || !person.location) return;
    
    const modal = document.getElementById('location-detail-modal') || createLocationDetailModal();
    const content = document.getElementById('location-detail-content');
    
    content.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="avatar avatar-lg">${person.avatar}</div>
            <div class="flex-1">
                <h3 class="text-xl font-bold">${getMaskedName(person.name)}</h3>
                <p class="text-muted-foreground">${person.role}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${person.tags.map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="mt-6 space-y-4">
            <div class="card">
                <div class="card-content">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        位置情報
                    </h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">エリア:</span>
                            <span class="font-medium ${person.location.area === '地域内' ? 'text-green-600' : 'text-blue-600'}">
                                ${person.location.area}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">住所:</span>
                            <span class="text-sm">${person.location.address}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">目印:</span>
                            <span class="text-sm">${person.location.landmark}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">座標:</span>
                            <span class="text-xs text-muted-foreground">${person.location.lat}, ${person.location.lng}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="editPersonLocation(${personId})" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    位置情報編集
                </button>
                <button onclick="openPersonDetail(${personId}); closeLocationDetail();" class="px-4 py-2 border border-border rounded hover:bg-muted">
                    詳細表示
                </button>
                <button onclick="closeLocationDetail()" class="px-4 py-2 border border-border rounded hover:bg-muted">
                    閉じる
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function showProjectLocationDetail(projectId) {
    const project = sampleData.projects.find(p => p.id === projectId);
    if (!project || !project.location) return;
    
    const modal = document.getElementById('location-detail-modal') || createLocationDetailModal();
    const content = document.getElementById('location-detail-content');
    
    content.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
            </div>
            <div class="flex-1">
                <h3 class="text-xl font-bold">${project.title}</h3>
                <p class="text-muted-foreground">${project.purpose}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${project.tags.map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="mt-6 space-y-4">
            <div class="card">
                <div class="card-content">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        位置情報
                    </h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">エリア:</span>
                            <span class="font-medium ${project.location.area === '地域内' ? 'text-green-600' : 'text-blue-600'}">
                                ${project.location.area}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">住所:</span>
                            <span class="text-sm">${project.location.address}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">拠点:</span>
                            <span class="text-sm">${project.location.landmark}</span>
                        </div>
                        ${project.location.scope ? `
                            <div class="flex justify-between">
                                <span class="text-muted-foreground">対象範囲:</span>
                                <span class="text-sm">${project.location.scope}</span>
                            </div>
                        ` : ''}
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">座標:</span>
                            <span class="text-xs text-muted-foreground">${project.location.lat}, ${project.location.lng}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="editProjectLocation(${projectId})" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                    位置情報編集
                </button>
                <button onclick="showProjectDetail(${projectId}); closeLocationDetail();" class="px-4 py-2 border border-border rounded hover:bg-muted">
                    詳細表示
                </button>
                <button onclick="closeLocationDetail()" class="px-4 py-2 border border-border rounded hover:bg-muted">
                    閉じる
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function createLocationDetailModal() {
    const modal = document.createElement('div');
    modal.id = 'location-detail-modal';
    modal.className = 'fixed inset-0 z-50 hidden';
    modal.innerHTML = `
        <div class="fixed inset-0 bg-black/50" onclick="closeLocationDetail()"></div>
        <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl bg-background p-6 shadow-lg border border-border rounded-lg max-h-[90vh] overflow-y-auto">
            <div id="location-detail-content">
                <!-- Content will be loaded here -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function closeLocationDetail() {
    const modal = document.getElementById('location-detail-modal');
    if (modal) modal.classList.add('hidden');
}

function toggleMapFilter(containerId, filter) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const currentOptions = JSON.parse(container.dataset.mapOptions || '{}');
    currentOptions.filterArea = filter === 'all' ? null : filter === 'local' ? 'local' : 'external';
    container.dataset.mapOptions = JSON.stringify(currentOptions);
    
    renderMapComponent(containerId, currentOptions);
}

function centerMapOnLocal(containerId) {
    alert('地域内の拠点に地図を中央揃えしました');
}

function showFullMap(containerId) {
    alert('全体表示に切り替えました');
}

function exportMapData(containerId) {
    const peopleData = getPeopleWithLocation();
    const projectData = getProjectsWithLocation();
    
    const exportData = {
        people: peopleData.map(p => ({
            name: getMaskedName(p.name),
            role: p.role,
            area: p.location.area,
            address: p.location.address,
            landmark: p.location.landmark,
            coordinates: `${p.location.lat},${p.location.lng}`
        })),
        projects: projectData.map(p => ({
            title: p.title,
            area: p.location.area,
            address: p.location.address,
            landmark: p.location.landmark,
            scope: p.location.scope || '',
            coordinates: `${p.location.lat},${p.location.lng}`
        }))
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'location-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function openAddLocationModal(containerId) {
    alert('位置追加機能は準備中です。直接データ編集で位置情報を追加してください。');
}

function editPersonLocation(personId) {
    alert(`人物ID ${personId}の位置情報編集機能は準備中です。`);
}

function editProjectLocation(projectId) {
    alert(`プロジェクトID ${projectId}の位置情報編集機能は準備中です。`);
}

// Export functions to global scope
window.renderMapComponent = renderMapComponent;
window.showPersonLocationDetail = showPersonLocationDetail;
window.showProjectLocationDetail = showProjectLocationDetail;
window.closeLocationDetail = closeLocationDetail;
window.toggleMapFilter = toggleMapFilter;
window.centerMapOnLocal = centerMapOnLocal;
window.showFullMap = showFullMap;
window.exportMapData = exportMapData;
window.openAddLocationModal = openAddLocationModal;
window.editPersonLocation = editPersonLocation;
window.editProjectLocation = editProjectLocation;
window.getPeopleWithLocation = getPeopleWithLocation;
window.getProjectsWithLocation = getProjectsWithLocation;