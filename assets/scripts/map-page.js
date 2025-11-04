// ===============================
// LocalSuccess - Map Module with Google Maps
// ===============================

let map;
let mapMarkers = [];
let showPeople = true;
let showProjects = true;

// 喜茂别町の中心座標
const KIMOBETSU_CENTER = {
    lat: 42.8329,
    lng: 140.9689
};

function renderMap(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <!-- Header -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">地域マップ</h1>
                    <p class="text-muted-foreground">人脈とプロジェクトの位置を地図上で可視化・管理</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="exportLocationData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background shadow-sm hover:bg-accent h-9 px-4 py-2">
                        <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        データエクスポート
                    </button>
                </div>
            </div>
            
            <!-- Map Controls -->
            <div class="card mb-6">
                <div class="card-content">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <!-- Layer Controls -->
                        <div class="flex items-center space-x-4">
                            <h3 class="text-lg font-semibold">表示レイヤー</h3>
                            <div class="flex items-center space-x-3">
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" id="toggle-people" ${showPeople ? 'checked' : ''} onchange="togglePeopleLayer()" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                                    <span class="flex items-center">
                                        <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                        人脈 (${getPeopleWithLocation().length})
                                    </span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" id="toggle-projects" ${showProjects ? 'checked' : ''} onchange="toggleProjectsLayer()" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                                    <span class="flex items-center">
                                        <div class="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                                        プロジェクト (${getProjectsWithLocation().length})
                                    </span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Area Filter -->
                        <div class="flex items-center space-x-3">
                            <span class="text-sm font-medium">エリア:</span>
                            <select id="area-filter" onchange="updateAreaFilter(this.value)" class="px-3 py-1 border border-input rounded-md text-sm">
                                <option value="all">全て表示</option>
                                <option value="local">地域内のみ</option>
                                <option value="external">地域外のみ</option>
                            </select>
                        </div>
                        
                        <!-- Map Actions -->
                        <div class="flex items-center space-x-2">
                            <button onclick="centerOnKimobetsu()" class="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                                🏠 喜茂別町に移動
                            </button>
                            <button onclick="fitAllMarkers()" class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                🗺️ 全体表示
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Statistics -->
            <div class="grid gap-4 md:grid-cols-4 mb-6">
                <div class="card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-green-700">地域内人脈</p>
                                <p class="text-2xl font-bold text-green-900">${getPeopleWithLocation().filter(p => p.location.area === '地域内').length}人</p>
                            </div>
                            <div class="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-blue-700">地域外人脈</p>
                                <p class="text-2xl font-bold text-blue-900">${getPeopleWithLocation().filter(p => p.location.area === '地域外').length}人</p>
                            </div>
                            <div class="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-orange-700">アクティブプロジェクト</p>
                                <p class="text-2xl font-bold text-orange-900">${getProjectsWithLocation().filter(p => p.status !== 'Done').length}件</p>
                            </div>
                            <div class="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                    <div class="card-content">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-purple-700">総拠点数</p>
                                <p class="text-2xl font-bold text-purple-900">${getPeopleWithLocation().length + getProjectsWithLocation().length}</p>
                            </div>
                            <div class="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Google Map Container -->
            <div class="card">
                <div class="card-content p-0">
                    <div id="google-map" style="height: 600px; width: 100%;" class="rounded-lg overflow-hidden">
                        <!-- Google Map will be rendered here -->
                    </div>
                </div>
            </div>
            
            <!-- Location Info Panel -->
            <div id="location-info-panel" class="hidden mt-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-lg font-semibold">選択した拠点の詳細</h3>
                    </div>
                    <div class="card-content" id="location-info-content">
                        <!-- Selected location details will be shown here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize Google Map
    initializeGoogleMap();
}

function initializeGoogleMap() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined') {
        // Load Google Maps API
        loadGoogleMapsAPI();
        return;
    }
    
    // Create map
    map = new google.maps.Map(document.getElementById('google-map'), {
        center: KIMOBETSU_CENTER,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });
    
    // Add markers
    updateMapMarkers();
}

function loadGoogleMapsAPI() {
    // For demo purposes, we'll use a simple fallback
    // In production, you would load the actual Google Maps API
    console.log('Google Maps API would be loaded here');
    
    // Simulate API loading with a simple map
    createSimpleMap();
}

function createSimpleMap() {
    const mapContainer = document.getElementById('google-map');
    
    mapContainer.innerHTML = `
        <div class="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center" onclick="hideAllTooltips()">
            <!-- Map Grid Background -->
            <div class="absolute inset-0 opacity-20">
                <div class="grid grid-cols-12 grid-rows-12 gap-1 h-full p-4">
                    ${Array(144).fill(0).map(() => '<div class="bg-gray-300 rounded-sm"></div>').join('')}
                </div>
            </div>
            
            <!-- Map Content -->
            <div class="relative w-full h-full p-8" onclick="event.stopPropagation()">
                <!-- Center Marker (Kimobetsu) -->
                <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div class="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                        喜茂別町役場
                    </div>
                </div>
                
                <!-- People Markers -->
                <div id="people-markers" class="absolute inset-0">
                    ${renderPeopleMarkers()}
                </div>
                
                <!-- Project Markers -->
                <div id="project-markers" class="absolute inset-0">
                    ${renderProjectMarkers()}
                </div>
                
                <!-- Map Legend -->
                <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-4 shadow-lg">
                    <h4 class="font-semibold mb-2 text-sm">凡例</h4>
                    <div class="space-y-2 text-xs">
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span>人脈</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 bg-orange-500 rounded"></div>
                            <span>プロジェクト</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span>喜茂別町役場</span>
                        </div>
                    </div>
                </div>
                
                <!-- Scale -->
                <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded px-3 py-2 text-xs">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-0.5 bg-gray-600"></div>
                        <span>1km</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPeopleMarkers() {
    if (!showPeople) return '';
    
    return getPeopleWithLocation().map((person, index) => {
        const isLocal = person.location.area === '地域内';
        
        // Position calculation (spread around center)
        const angle = (index / getPeopleWithLocation().length) * 2 * Math.PI;
        const radius = isLocal ? 25 : 40; // % from center
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        
        return `
            <div class="absolute cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10"
                 style="left: ${Math.max(5, Math.min(95, x))}%; top: ${Math.max(5, Math.min(95, y))}%; transform: translate(-50%, -50%);"
                 onclick="showPersonTooltip(${person.id}, this)"
                 title="${getMaskedName(person.name)} - ${person.location.landmark}">
                <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <span class="text-white text-xs font-bold">${person.avatar.charAt(0)}</span>
                </div>
                ${isLocal ? '' : '<div class="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full border border-white"></div>'}
                
                <!-- Tooltip -->
                <div id="person-tooltip-${person.id}" class="hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[250px] z-20">
                    <div class="flex items-start space-x-3">
                        <div class="avatar">${person.avatar}</div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm">${getMaskedName(person.name)}</h4>
                            <p class="text-xs text-gray-600">${person.role}</p>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${person.tags.slice(0, 2).map(tag => `<span class="text-xs px-1 py-0.5 bg-blue-100 text-blue-700 rounded">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-2 pt-2 border-t border-gray-100">
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span class="text-gray-500">エリア:</span>
                                <span class="font-medium ${isLocal ? 'text-green-600' : 'text-blue-600'}">${person.location.area}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">最終連絡:</span>
                                <span class="font-medium">${daysSince(person.lastContact)}日前</span>
                            </div>
                        </div>
                        <div class="mt-1">
                            <span class="text-gray-500">目印:</span>
                            <span class="text-xs">${person.location.landmark}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2 mt-3">
                        <button onclick="quickContact(${person.id}); hideAllTooltips();" class="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                            連絡
                        </button>
                        <button onclick="showPersonDetails(${person.id}); hideAllTooltips();" class="text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-50">
                            詳細
                        </button>
                    </div>
                    
                    <!-- Tooltip Arrow -->
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderProjectMarkers() {
    if (!showProjects) return '';
    
    return getProjectsWithLocation().map((project, index) => {
        const isLocal = project.location.area === '地域内';
        
        // Position calculation (different area to avoid overlap)
        const angle = (index / getProjectsWithLocation().length) * 2 * Math.PI + Math.PI/4;
        const radius = isLocal ? 20 : 35;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        
        return `
            <div class="absolute cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10"
                 style="left: ${Math.max(5, Math.min(95, x))}%; top: ${Math.max(5, Math.min(95, y))}%; transform: translate(-50%, -50%);"
                 onclick="showProjectTooltip(${project.id}, this)"
                 title="${project.title} - ${project.location.landmark}">
                <div class="w-6 h-5 bg-orange-500 rounded border-2 border-white shadow-lg flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                ${isLocal ? '' : '<div class="absolute -top-1 -right-1 w-3 h-3 bg-orange-300 rounded border border-white"></div>'}
                
                <!-- Tooltip -->
                <div id="project-tooltip-${project.id}" class="hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[280px] z-20">
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-orange-200 rounded flex items-center justify-center">
                            <svg class="w-4 h-4 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm">${project.title}</h4>
                            <p class="text-xs text-gray-600 line-clamp-2">${project.purpose}</p>
                            <div class="flex flex-wrap gap-1 mt-1">
                                ${project.tags.slice(0, 2).map(tag => `<span class="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-2 pt-2 border-t border-gray-100">
                        <div class="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span class="text-gray-500">ステータス:</span>
                                <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'Try' ? 'bg-blue-100 text-blue-800' : project.status === 'Plan' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">${project.status}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">エリア:</span>
                                <span class="font-medium ${isLocal ? 'text-green-600' : 'text-blue-600'}">${project.location.area}</span>
                            </div>
                        </div>
                        <div class="mt-1">
                            <span class="text-gray-500">拠点:</span>
                            <span class="text-xs">${project.location.landmark}</span>
                        </div>
                        <div class="mt-1">
                            <span class="text-gray-500">KPI:</span>
                            <span class="text-xs font-medium">${project.kpi}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2 mt-3">
                        <button onclick="showProjectDetails(${project.id}); hideAllTooltips();" class="text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700">
                            詳細
                        </button>
                        <button onclick="openProjectWorkspace(${project.id}); hideAllTooltips();" class="text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-50">
                            ワークスペース
                        </button>
                    </div>
                    
                    <!-- Tooltip Arrow -->
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white"></div>
                </div>
            </div>
        `;
    }).join('');
}

function updateMapMarkers() {
    // Update people markers
    const peopleContainer = document.getElementById('people-markers');
    if (peopleContainer) {
        peopleContainer.innerHTML = renderPeopleMarkers();
    }
    
    // Update project markers
    const projectContainer = document.getElementById('project-markers');
    if (projectContainer) {
        projectContainer.innerHTML = renderProjectMarkers();
    }
}

// Event handlers
function togglePeopleLayer() {
    showPeople = document.getElementById('toggle-people').checked;
    updateMapMarkers();
}

function toggleProjectsLayer() {
    showProjects = document.getElementById('toggle-projects').checked;
    updateMapMarkers();
}

function updateAreaFilter(filter) {
    // This would filter markers based on area
    console.log('Filtering by area:', filter);
    // Implementation would filter the data and update markers
}

function centerOnKimobetsu() {
    // Center map on Kimobetsu
    console.log('Centering on Kimobetsu');
}

function fitAllMarkers() {
    // Fit all markers in view
    console.log('Fitting all markers');
}

// Tooltip functions
function showPersonTooltip(personId, element) {
    hideAllTooltips();
    const tooltip = document.getElementById(`person-tooltip-${personId}`);
    if (tooltip) {
        tooltip.classList.remove('hidden');
        // Add click outside to close
        setTimeout(() => {
            document.addEventListener('click', handleTooltipClickOutside);
        }, 10);
    }
}

function showProjectTooltip(projectId, element) {
    hideAllTooltips();
    const tooltip = document.getElementById(`project-tooltip-${projectId}`);
    if (tooltip) {
        tooltip.classList.remove('hidden');
        // Add click outside to close
        setTimeout(() => {
            document.addEventListener('click', handleTooltipClickOutside);
        }, 10);
    }
}

function hideAllTooltips() {
    document.querySelectorAll('[id^="person-tooltip-"], [id^="project-tooltip-"]').forEach(tooltip => {
        tooltip.classList.add('hidden');
    });
    document.removeEventListener('click', handleTooltipClickOutside);
}

function handleTooltipClickOutside(event) {
    // Check if click is outside of any tooltip or marker
    const isTooltip = event.target.closest('[id^="person-tooltip-"], [id^="project-tooltip-"]');
    const isMarker = event.target.closest('[onclick*="Tooltip"]');
    
    if (!isTooltip && !isMarker) {
        hideAllTooltips();
    }
}

function openProjectWorkspace(projectId) {
    // Navigate to project workspace
    window.location.hash = '#/projects';
    // Could add specific project opening logic here
}

function showPersonDetails(personId) {
    const person = sampleData.people.find(p => p.id === personId);
    if (!person) return;
    
    const panel = document.getElementById('location-info-panel');
    const content = document.getElementById('location-info-content');
    
    content.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="avatar avatar-lg">${person.avatar}</div>
            <div class="flex-1">
                <h4 class="text-lg font-semibold">${getMaskedName(person.name)}</h4>
                <p class="text-muted-foreground">${person.role}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${person.tags.map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 mt-4">
            <div>
                <h5 class="font-medium mb-2">位置情報</h5>
                <div class="text-sm space-y-1">
                    <p><span class="text-muted-foreground">エリア:</span> ${person.location.area}</p>
                    <p><span class="text-muted-foreground">住所:</span> ${person.location.address}</p>
                    <p><span class="text-muted-foreground">目印:</span> ${person.location.landmark}</p>
                </div>
            </div>
            <div>
                <h5 class="font-medium mb-2">連絡情報</h5>
                <div class="text-sm space-y-1">
                    <p><span class="text-muted-foreground">最終連絡:</span> ${daysSince(person.lastContact)}日前</p>
                    <p><span class="text-muted-foreground">電話:</span> ${person.phone}</p>
                    <p><span class="text-muted-foreground">メール:</span> ${person.email}</p>
                </div>
            </div>
        </div>
        
        <div class="flex space-x-2 mt-4">
            <button onclick="quickContact(${person.id})" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                連絡する
            </button>
            <button onclick="openPersonDetail(${person.id})" class="px-3 py-2 border border-border rounded hover:bg-muted">
                詳細表示
            </button>
            <button onclick="hideLocationPanel()" class="px-3 py-2 border border-border rounded hover:bg-muted">
                閉じる
            </button>
        </div>
    `;
    
    panel.classList.remove('hidden');
}

function showProjectDetails(projectId) {
    const project = sampleData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const panel = document.getElementById('location-info-panel');
    const content = document.getElementById('location-info-content');
    
    content.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
            </div>
            <div class="flex-1">
                <h4 class="text-lg font-semibold">${project.title}</h4>
                <p class="text-muted-foreground">${project.purpose}</p>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${project.tags.map(tag => `<span class="tag ${tag.slice(1)} text-xs">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 mt-4">
            <div>
                <h5 class="font-medium mb-2">拠点情報</h5>
                <div class="text-sm space-y-1">
                    <p><span class="text-muted-foreground">エリア:</span> ${project.location.area}</p>
                    <p><span class="text-muted-foreground">住所:</span> ${project.location.address}</p>
                    <p><span class="text-muted-foreground">拠点:</span> ${project.location.landmark}</p>
                    ${project.location.scope ? `<p><span class="text-muted-foreground">対象範囲:</span> ${project.location.scope}</p>` : ''}
                </div>
            </div>
            <div>
                <h5 class="font-medium mb-2">プロジェクト情報</h5>
                <div class="text-sm space-y-1">
                    <p><span class="text-muted-foreground">ステータス:</span> <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.status === 'Try' ? 'bg-blue-100 text-blue-800' : project.status === 'Plan' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">${project.status}</span></p>
                    <p><span class="text-muted-foreground">KPI:</span> ${project.kpi}</p>
                    <p><span class="text-muted-foreground">関係者:</span> ${project.relatedPeople.length}人</p>
                </div>
            </div>
        </div>
        
        <div class="flex space-x-2 mt-4">
            <button onclick="showProjectDetail(${project.id})" class="px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                プロジェクト詳細
            </button>
            <button onclick="hideLocationPanel()" class="px-3 py-2 border border-border rounded hover:bg-muted">
                閉じる
            </button>
        </div>
    `;
    
    panel.classList.remove('hidden');
}

function hideLocationPanel() {
    document.getElementById('location-info-panel').classList.add('hidden');
}

function exportLocationData() {
    const locationData = {
        people: getPeopleWithLocation().map(p => ({
            id: p.id,
            name: getMaskedName(p.name),
            role: p.role,
            location: p.location,
            lastContact: p.lastContact
        })),
        projects: getProjectsWithLocation().map(p => ({
            id: p.id,
            title: p.title,
            status: p.status,
            location: p.location
        })),
        exportDate: new Date().toISOString(),
        center: KIMOBETSU_CENTER
    };
    
    const blob = new Blob([JSON.stringify(locationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kimobetsu-location-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Helper functions
function getPeopleWithLocation() {
    return sampleData.people.filter(person => person.location && person.location.lat && person.location.lng);
}

function getProjectsWithLocation() {
    return sampleData.projects.filter(project => project.location && project.location.lat && project.location.lng);
}

// Export functions to global scope
window.renderMap = renderMap;
window.togglePeopleLayer = togglePeopleLayer;
window.toggleProjectsLayer = toggleProjectsLayer;
window.updateAreaFilter = updateAreaFilter;
window.centerOnKimobetsu = centerOnKimobetsu;
window.fitAllMarkers = fitAllMarkers;
window.showPersonDetails = showPersonDetails;
window.showProjectDetails = showProjectDetails;
window.hideLocationPanel = hideLocationPanel;
window.exportLocationData = exportLocationData;
window.showPersonTooltip = showPersonTooltip;
window.showProjectTooltip = showProjectTooltip;
window.hideAllTooltips = hideAllTooltips;
window.openProjectWorkspace = openProjectWorkspace;