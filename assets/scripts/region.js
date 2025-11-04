// ===============================
// LocalSuccess - Region Module
// 地域設定・地域情報管理・地域課題整理
// ===============================

function renderRegion(container) {
    const userRegion = getUserRegion();
    const regionIssues = getRegionIssues();
    
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">地域設定・情報管理</h1>
                    <p class="text-muted-foreground">地域の基本情報、特性、課題を一元管理し、効果的な地域活動を推進します</p>
                </div>
            </div>
            
            <!-- Region Basic Settings -->
            ${createCard({
                header: {
                    title: '基本地域設定',
                    description: '活動拠点となる地域の基本情報を設定'
                },
                content: `
                    <div class="grid gap-6 md:grid-cols-2">
                        ${createFormGroup({
                            label: '都道府県',
                            children: createSelect({
                                id: 'region-prefecture',
                                options: [
                                    { value: '', text: '選択してください', selected: !userRegion.prefecture },
                                    { value: '北海道', text: '北海道', selected: userRegion.prefecture === '北海道' },
                                    { value: '青森県', text: '青森県', selected: userRegion.prefecture === '青森県' },
                                    { value: '岩手県', text: '岩手県', selected: userRegion.prefecture === '岩手県' }
                                ],
                                onChange: 'updateRegionMunicipalities()'
                            })
                        })}
                        ${createFormGroup({
                            label: '市町村',
                            children: createSelect({
                                id: 'region-municipality',
                                options: userRegion.prefecture === '北海道'
                                    ? [
                                        { value: '', text: '市町村を選択してください', selected: !userRegion.municipality },
                                        { value: '喜茂別町', text: '喜茂別町', selected: userRegion.municipality === '喜茂別町' },
                                        { value: '真狩村', text: '真狩村', selected: userRegion.municipality === '真狩村' },
                                        { value: '留寿都村', text: '留寿都村', selected: userRegion.municipality === '留寿都村' },
                                        { value: 'ニセコ町', text: 'ニセコ町', selected: userRegion.municipality === 'ニセコ町' }
                                    ]
                                    : [
                                        { value: '', text: userRegion.prefecture ? '選択してください' : '都道府県を選択してください', selected: true }
                                    ]
                            })
                        })}
                    </div>
                    
                    <div class="mt-6 flex space-x-4">
                        ${createButton({
                            text: '地域設定を保存',
                            variant: 'primary',
                            onClick: 'saveRegion()'
                        })}
                        ${createButton({
                            text: '地域データを取得・更新',
                            variant: 'secondary',
                            onClick: 'loadRegionDataAndRefreshIssues()'
                        })}
                    </div>
                `
            })}
            
            <!-- Region Profile and Statistics -->
            <div class="grid gap-6 md:grid-cols-2 mb-6">
                <!-- Region Profile -->
                ${createCard({
                    header: {
                        title: '地域プロフィール',
                        description: '地域の基本データと特徴'
                    },
                    content: `<div id="region-profile-content">${renderRegionProfile(userRegion)}</div>`
                })}
                
                <!-- Key Metrics -->
                ${createCard({
                    header: {
                        title: '主要指標',
                        description: '地域の重要な統計データ'
                    },
                    content: `<div id="region-metrics-content">${renderRegionMetrics(userRegion)}</div>`
                })}
            </div>
            
            <!-- Region Characteristics -->
            ${createCard({
                header: {
                    title: '地域特性・資源',
                    description: '地域の強みと活用可能な資源'
                },
                content: `
                    <div class="grid gap-6 md:grid-cols-3">
                        <!-- Industries -->
                        <div>
                            <h3 class="font-medium text-gray-900 mb-3">主要産業</h3>
                            <div id="region-industries" class="space-y-2">
                                ${renderRegionIndustries(userRegion)}
                            </div>
                            ${createButton({
                                text: '+ 産業を追加',
                                variant: 'link',
                                size: 'sm',
                                onClick: 'addIndustry()'
                            })}
                        </div>
                        
                        <!-- Tourism Spots -->
                        <div>
                            <h3 class="font-medium text-gray-900 mb-3">観光・文化資源</h3>
                            <div id="region-tourism" class="space-y-2">
                                ${renderRegionTourism(userRegion)}
                            </div>
                            ${createButton({
                                text: '+ 資源を追加',
                                variant: 'link',
                                size: 'sm',
                                onClick: 'addTourismSpot()'
                            })}
                        </div>
                        
                        <!-- Infrastructure -->
                        <div>
                            <h3 class="font-medium text-gray-900 mb-3">インフラ・施設</h3>
                            <div id="region-infrastructure" class="space-y-2">
                                ${renderRegionInfrastructure(userRegion)}
                            </div>
                            ${createButton({
                                text: '+ 施設を追加',
                                variant: 'link',
                                size: 'sm',
                                onClick: 'addInfrastructure()'
                            })}
                        </div>
                    </div>
                `
            })}
            
            <!-- Region Issues Management -->
            ${createCard({
                header: {
                    title: '地域課題管理',
                    description: '地域の課題を整理・分析し、解決策を検討',
                    actions: `
                        <div class="flex space-x-2">
                            ${createButton({
                                text: 'AI課題推定',
                                variant: 'secondary',
                                size: 'sm',
                                onClick: 'inferIssuesInRegion()'
                            })}
                            ${createButton({
                                text: '+ 手動追加',
                                variant: 'primary',
                                size: 'sm',
                                onClick: 'addManualIssueInRegion()'
                            })}
                        </div>
                    `
                },
                content: `
                    <div class="space-y-4">
                        <div class="flex flex-wrap gap-2">
                            <button class="px-3 py-1 text-xs rounded border ${getIssueFilter() === 'all' ? 'bg-gray-900 text-white' : 'hover:bg-accent'}" onclick="filterIssuesByCategory('all')">すべて</button>
                            <button class="px-3 py-1 text-xs rounded border ${getIssueFilter() === 'demographic' ? 'bg-red-600 text-white' : 'hover:bg-accent'}" onclick="filterIssuesByCategory('demographic')">人口・高齢化</button>
                            <button class="px-3 py-1 text-xs rounded border ${getIssueFilter() === 'economy' ? 'bg-green-600 text-white' : 'hover:bg-accent'}" onclick="filterIssuesByCategory('economy')">経済・産業</button>
                            <button class="px-3 py-1 text-xs rounded border ${getIssueFilter() === 'infrastructure' ? 'bg-blue-600 text-white' : 'hover:bg-accent'}" onclick="filterIssuesByCategory('infrastructure')">インフラ・交通</button>
                            <button class="px-3 py-1 text-xs rounded border ${getIssueFilter() === 'community' ? 'bg-purple-600 text-white' : 'hover:bg-accent'}" onclick="filterIssuesByCategory('community')">コミュニティ</button>
                        </div>
                        <div id="region-issues-list">
                            ${regionIssues.length === 0 
                                ? createEmptyState('まだ課題が登録されていません。', null, { text: '+ 手動追加', onClick: 'addManualIssueInRegion()', className: 'text-primary' })
                                : renderRegionIssuesList(regionIssues)}
                        </div>
                    </div>
                `
            })}
            
            ${createCard({
                header: {
                    title: '推奨アクション',
                    description: '地域の課題・特性に基づく具体的な活動提案'
                },
                content: `${renderRegionRecommendations(userRegion, regionIssues)}`
            })}
        </div>
    `;
}

function renderRegionProfile(userRegion) {
    if (!userRegion.municipality) {
        return `
            <div class="text-center py-6 text-gray-500">
                <p>地域を選択してください</p>
            </div>
        `;
    }
    
    // Demo data for Kimobetsu
    if (userRegion.municipality === '喜茂別町') {
        return `
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        🏔️
                    </div>
                    <div>
                        <h3 class="font-medium">喜茂別町</h3>
                        <p class="text-sm text-gray-600">北海道虻田郡</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">面積</span>
                        <p class="font-medium">189.42 km²</p>
                    </div>
                    <div>
                        <span class="text-gray-600">人口</span>
                        <p class="font-medium">2,234人</p>
                    </div>
                    <div>
                        <span class="text-gray-600">高齢化率</span>
                        <p class="font-medium">38.2%</p>
                    </div>
                    <div>
                        <span class="text-gray-600">世帯数</span>
                        <p class="font-medium">1,156世帯</p>
                    </div>
                </div>
                
                <div>
                    <span class="text-gray-600 text-sm">特徴</span>
                    <p class="text-sm mt-1">羊蹄山麓の農業と観光の町。じゃがいも生産とスキー場を中心とした四季型観光地。</p>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="text-center py-6 text-gray-500">
            <p>${userRegion.municipality}の詳細データを取得中...</p>
            <button onclick="loadRegionData()" class="text-blue-600 hover:text-blue-700 text-sm mt-2">データを取得</button>
        </div>
    `;
}

function renderRegionMetrics(userRegion) {
    if (!userRegion.municipality) {
        return `<div class="text-center py-6 text-gray-500"><p>地域を選択してください</p></div>`;
    }
    
    if (userRegion.municipality === '喜茂別町') {
        return `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">人口増減率</span>
                    <span class="text-sm font-medium text-red-600">-2.3%/年</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">出生率</span>
                    <span class="text-sm font-medium">1.42</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">移住者数</span>
                    <span class="text-sm font-medium text-green-600">+12人/年</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">空き家率</span>
                    <span class="text-sm font-medium text-orange-600">14.8%</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">観光客数</span>
                    <span class="text-sm font-medium">約85万人/年</span>
                </div>
            </div>
        `;
    }
    
    return `<div class="text-center py-6 text-gray-500"><p>データを取得してください</p></div>`;
}

function renderRegionIndustries(userRegion) {
    const industries = getRegionData().industries || ['農業（じゃがいも・酪農）', '観光業（スキー場・温泉）', '食品加工業'];
    
    return industries.map(industry => `
        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-sm">${industry}</span>
            <button onclick="removeIndustry('${industry}')" class="text-xs text-red-600 hover:text-red-700">削除</button>
        </div>
    `).join('');
}

function renderRegionTourism(userRegion) {
    const tourism = getRegionData().tourism || ['中山峠スキー場', '喜茂別温泉', '道の駅望羊中山', '羊蹄山ビューポイント'];
    
    return tourism.map(spot => `
        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-sm">${spot}</span>
            <button onclick="removeTourismSpot('${spot}')" class="text-xs text-red-600 hover:text-red-700">削除</button>
        </div>
    `).join('');
}

function renderRegionInfrastructure(userRegion) {
    const infrastructure = getRegionData().infrastructure || ['JR函館本線', '国道230号', '町営バス', '喜茂別町立診療所', '町立図書館'];
    
    return infrastructure.map(facility => `
        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-sm">${facility}</span>
            <button onclick="removeInfrastructure('${facility}')" class="text-xs text-red-600 hover:text-red-700">削除</button>
        </div>
    `).join('');
}

function renderRegionIssuesList(issues) {
    const currentFilter = getIssueFilter();
    const filteredIssues = currentFilter === 'all' ? issues : issues.filter(issue => issue.category === currentFilter);
    
    if (filteredIssues.length === 0) {
        return `
            <div class="text-center py-6 text-gray-500">
                <p>該当する課題はありません</p>
            </div>
        `;
    }
    
    return `
        <div class="space-y-4">
            ${filteredIssues.map(issue => `
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-2">
                                <h3 class="font-medium text-gray-900">${issue.title}</h3>
                                <span class="px-2 py-1 text-xs rounded ${getCategoryBadgeClass(issue.category)}">${getCategoryLabel(issue.category)}</span>
                                <span class="px-2 py-1 text-xs rounded ${issue.source === 'inference' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}">
                                    ${issue.source === 'inference' ? 'AI推定' : '手動追加'}
                                </span>
                            </div>
                            <p class="text-sm text-gray-600 mb-3">${issue.reason || issue.description || ''}</p>
                            
                            <!-- Priority and Status -->
                            <div class="flex items-center space-x-4 text-xs">
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-500">優先度:</span>
                                    <select onchange="updateIssuePriority('${issue.id}', this.value)" class="text-xs border-gray-300 rounded">
                                        <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>低</option>
                                        <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>中</option>
                                        <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>高</option>
                                    </select>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="text-gray-500">状態:</span>
                                    <select onchange="updateIssueStatus('${issue.id}', this.value)" class="text-xs border-gray-300 rounded">
                                        <option value="identified" ${issue.status === 'identified' ? 'selected' : ''}>特定済み</option>
                                        <option value="analyzing" ${issue.status === 'analyzing' ? 'selected' : ''}>分析中</option>
                                        <option value="planning" ${issue.status === 'planning' ? 'selected' : ''}>計画中</option>
                                        <option value="in_progress" ${issue.status === 'in_progress' ? 'selected' : ''}>取組中</option>
                                        <option value="completed" ${issue.status === 'completed' ? 'selected' : ''}>完了</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col space-y-1">
                            <button onclick="createProjectFromIssueInRegion('${issue.id}')" 
                                    class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                プロジェクト化
                            </button>
                            <button onclick="editIssueInRegion('${issue.id}')" 
                                    class="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                編集
                            </button>
                            <button onclick="removeIssueInRegion('${issue.id}')" 
                                    class="px-3 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50 transition-colors">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderRegionRecommendations(userRegion, issues) {
    const recommendations = generateRegionRecommendations(userRegion, issues);
    
    if (recommendations.length === 0) {
        return `
            <div class="text-center py-6 text-gray-500">
                <p>推奨アクションがありません</p>
                <p class="text-sm mt-1">地域課題を追加すると、具体的な活動提案が表示されます</p>
            </div>
        `;
    }
    
    return `
        <div class="grid gap-4 md:grid-cols-2">
            ${recommendations.map(rec => `
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-sm font-medium">
                            ${rec.priority}
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900 mb-1">${rec.title}</h4>
                            <p class="text-sm text-gray-600 mb-2">${rec.description}</p>
                            <div class="flex items-center space-x-2">
                                <span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">${rec.category}</span>
                                <span class="text-xs text-gray-500">期間: ${rec.timeframe}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Support Functions
function getUserRegion() {
    const stored = localStorage.getItem('user.region');
    return stored ? JSON.parse(stored) : {};
}

function getRegionData() {
    const stored = localStorage.getItem('region.data');
    return stored ? JSON.parse(stored) : {
        industries: [],
        tourism: [],
        infrastructure: []
    };
}

function getRegionIssues() {
    const stored = localStorage.getItem('region.issues');
    return stored ? JSON.parse(stored) : [];
}

function saveRegion() {
    const region = {
        prefecture: document.getElementById('region-prefecture').value,
        municipality: document.getElementById('region-municipality').value,
        updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('user.region', JSON.stringify(region));
    showRegionNotification('地域設定を保存しました！', 'success');
}

function updateRegionMunicipalities() {
    const prefecture = document.getElementById('region-prefecture').value;
    const municipalitySelect = document.getElementById('region-municipality');
    
    municipalitySelect.innerHTML = '<option value="">市町村を選択してください</option>';
    
    if (prefecture === '北海道') {
        const municipalities = ['喜茂別町', '真狩村', '留寿都村', 'ニセコ町', '倶知安町', '京極町'];
        municipalities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            municipalitySelect.appendChild(option);
        });
    }
    // Other prefectures would be added in real implementation
}

function loadRegionDataAndRefreshIssues() {
    const userRegion = getUserRegion();
    if (!userRegion.municipality) {
        showRegionNotification('先に地域を選択してください', 'warning');
        return;
    }
    
    // Simulate API call
    showRegionNotification('地域データを取得中...', 'info');
    
    setTimeout(() => {
        // Save sample data for Kimobetsu
        if (userRegion.municipality === '喜茂別町') {
            const regionData = {
                industries: ['農業（じゃがいも・酪農）', '観光業（スキー場・温泉）', '食品加工業'],
                tourism: ['中山峠スキー場', '喜茂別温泉', '道の駅望羊中山', '羊蹄山ビューポイント'],
                infrastructure: ['JR函館本線', '国道230号', '町営バス', '喜茂別町立診療所', '町立図書館'],
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem('region.data', JSON.stringify(regionData));
        }
        
        renderRegion(document.getElementById('main-content'));
        showRegionNotification('地域データを更新しました', 'success');
    }, 1500);
}

function inferIssuesInRegion() {
    const userRegion = getUserRegion();
    const userProfile = (typeof getUserProfile === 'function') 
        ? getUserProfile() 
        : (function(){ try { return JSON.parse(localStorage.getItem('userProfile') || '{}'); } catch(e) { return {}; } })();
    
    if (!userRegion.municipality) {
        showRegionNotification('先に地域を選択してください', 'warning');
        return;
    }
    
    // Use the inference logic from region-inference.js
    const regionProfile = {
        population: 2234,
        agingRate: 38.2,
        industries: ['農業', '観光'],
        tourismSpots: ['中山峠スキー場', '喜茂別温泉', '道の駅望羊中山', '羊蹄山ビューポイント']
    };
    
    const inferredIssues = inferRegionIssues(regionProfile, userProfile);
    const existingIssues = getRegionIssues();
    
    // Add inferred issues that don't already exist
    inferredIssues.forEach(issue => {
        if (!existingIssues.some(existing => existing.title === issue.title)) {
            issue.id = Date.now() + Math.random();
            issue.category = categorizeIssue(issue.title);
            issue.priority = 'medium';
            issue.status = 'identified';
            issue.createdAt = new Date().toISOString();
            existingIssues.push(issue);
        }
    });
    
    localStorage.setItem('region.issues', JSON.stringify(existingIssues));
    renderRegion(document.getElementById('main-content'));
    showRegionNotification(`${inferredIssues.length}件の課題を推定しました`, 'success');
}

function addManualIssueInRegion() {
    const title = prompt('課題のタイトルを入力してください:');
    if (!title) return;
    
    const description = prompt('課題の詳細説明を入力してください:');
    if (!description) return;
    
    const issue = {
        id: Date.now(),
        title: title,
        description: description,
        reason: description,
        category: categorizeIssue(title),
        priority: 'medium',
        status: 'identified',
        source: 'manual',
        createdAt: new Date().toISOString()
    };
    
    const issues = getRegionIssues();
    issues.push(issue);
    localStorage.setItem('region.issues', JSON.stringify(issues));
    
    renderRegion(document.getElementById('main-content'));
    showRegionNotification('課題を追加しました', 'success');
}

function removeIssueInRegion(issueId) {
    if (!confirm('この課題を削除しますか？')) return;
    
    const issues = getRegionIssues();
    const filteredIssues = issues.filter(issue => issue.id != issueId);
    localStorage.setItem('region.issues', JSON.stringify(filteredIssues));
    
    renderRegion(document.getElementById('main-content'));
    showRegionNotification('課題を削除しました', 'success');
}

function createProjectFromIssueInRegion(issueId) {
    const issues = getRegionIssues();
    const issue = issues.find(i => i.id == issueId);
    
    if (!issue) return;
    
    // Navigate to projects page with pre-filled data
    localStorage.setItem('project.draft', JSON.stringify({
        title: issue.title + '解決プロジェクト',
        purpose: issue.description || issue.reason || '',
        scope: '地域課題「' + issue.title + '」の解決',
        sourceIssue: issueId
    }));
    
    window.location.hash = '#/projects';
    showRegionNotification('プロジェクト草案を作成しました', 'success');
}

function editIssueInRegion(issueId) {
    const issues = getRegionIssues();
    const index = issues.findIndex(i => i.id == issueId);
    if (index === -1) return;

    const issue = { ...issues[index] };
    const newTitle = prompt('タイトルを編集:', issue.title);
    if (newTitle === null) return; // キャンセル
    const newDescription = prompt('説明を編集:', issue.description || issue.reason || '');
    if (newDescription === null) return; // キャンセル

    issue.title = newTitle.trim() || issue.title;
    issue.description = (newDescription || '').trim();
    issue.reason = issue.description;

    issues[index] = issue;
    localStorage.setItem('region.issues', JSON.stringify(issues));

    // リストのみ再描画
    const issuesList = document.getElementById('region-issues-list');
    if (issuesList) {
        issuesList.innerHTML = renderRegionIssuesList(issues);
    } else {
        renderRegion(document.getElementById('main-content'));
    }
    showRegionNotification('課題を更新しました', 'success');
}

function updateIssuePriority(issueId, priority) {
    const issues = getRegionIssues();
    const index = issues.findIndex(i => i.id == issueId);
    if (index === -1) return;
    issues[index].priority = priority;
    localStorage.setItem('region.issues', JSON.stringify(issues));
}

function updateIssueStatus(issueId, status) {
    const issues = getRegionIssues();
    const index = issues.findIndex(i => i.id == issueId);
    if (index === -1) return;
    issues[index].status = status;
    localStorage.setItem('region.issues', JSON.stringify(issues));
}

// Filter and Category Functions
let currentIssueFilter = 'all';

function getIssueFilter() {
    return currentIssueFilter;
}

function filterIssuesByCategory(category) {
    currentIssueFilter = category;
    const issuesList = document.getElementById('region-issues-list');
    if (issuesList) {
        issuesList.innerHTML = renderRegionIssuesList(getRegionIssues());
    }
}

function categorizeIssue(title) {
    const keywords = {
        demographic: ['高齢', '人口', '移住', '定住', '子育て'],
        economy: ['産業', '観光', '農業', '経済', '収入', '雇用', '起業'],
        infrastructure: ['交通', 'インフラ', '道路', '施設', '医療', '買い物'],
        community: ['コミュニティ', 'つながり', '活動', 'イベント', '文化']
    };
    
    for (const [category, keywordList] of Object.entries(keywords)) {
        if (keywordList.some(keyword => title.includes(keyword))) {
            return category;
        }
    }
    
    return 'community';
}

function getCategoryLabel(category) {
    const labels = {
        demographic: '人口・高齢化',
        economy: '経済・産業',
        infrastructure: 'インフラ・交通',
        community: 'コミュニティ'
    };
    return labels[category] || 'その他';
}

function getCategoryBadgeClass(category) {
    const classes = {
        demographic: 'bg-red-100 text-red-700',
        economy: 'bg-green-100 text-green-700',
        infrastructure: 'bg-blue-100 text-blue-700',
        community: 'bg-purple-100 text-purple-700'
    };
    return classes[category] || 'bg-gray-100 text-gray-700';
}

function generateRegionRecommendations(userRegion, issues) {
    const recommendations = [];
    
    if (issues.length === 0) return recommendations;
    
    // High priority issues
    const highPriorityIssues = issues.filter(i => i.priority === 'high');
    if (highPriorityIssues.length > 0) {
        recommendations.push({
            priority: 1,
            title: '緊急課題への取り組み',
            description: `${highPriorityIssues.length}件の高優先度課題があります。まずはこれらの解決策を検討しましょう。`,
            category: '課題解決',
            timeframe: '1-3ヶ月'
        });
    }
    
    // Community issues
    const communityIssues = issues.filter(i => i.category === 'community');
    if (communityIssues.length >= 2) {
        recommendations.push({
            priority: 2,
            title: 'コミュニティ活動の企画',
            description: 'コミュニティ関連の課題が複数あります。住民参加型のイベントや活動を企画しましょう。',
            category: 'コミュニティ',
            timeframe: '2-6ヶ月'
        });
    }
    
    // Economic issues
    const economicIssues = issues.filter(i => i.category === 'economy');
    if (economicIssues.length >= 1) {
        recommendations.push({
            priority: 3,
            title: '地域経済活性化の検討',
            description: '経済・産業課題への取り組みとして、地域資源を活用した新しい取り組みを検討しましょう。',
            category: '経済活動',
            timeframe: '3-12ヶ月'
        });
    }
    
    return recommendations;
}

function showRegionNotification(message, type = 'info') {
    // Reuse the notification function from profile.js
    if (typeof showNotification === 'function') {
        showNotification(message, type);
    } else {
        alert(message);
    }
}

// Add/Remove Functions for Region Characteristics
function addIndustry() {
    const industry = prompt('追加する産業を入力してください:');
    if (!industry) return;
    
    const regionData = getRegionData();
    if (!regionData.industries.includes(industry)) {
        regionData.industries.push(industry);
        localStorage.setItem('region.data', JSON.stringify(regionData));
        renderRegion(document.getElementById('main-content'));
    }
}

function removeIndustry(industry) {
    const regionData = getRegionData();
    regionData.industries = regionData.industries.filter(i => i !== industry);
    localStorage.setItem('region.data', JSON.stringify(regionData));
    renderRegion(document.getElementById('main-content'));
}

function addTourismSpot() {
    const spot = prompt('追加する観光・文化資源を入力してください:');
    if (!spot) return;
    
    const regionData = getRegionData();
    if (!regionData.tourism.includes(spot)) {
        regionData.tourism.push(spot);
        localStorage.setItem('region.data', JSON.stringify(regionData));
        renderRegion(document.getElementById('main-content'));
    }
}

function removeTourismSpot(spot) {
    const regionData = getRegionData();
    regionData.tourism = regionData.tourism.filter(t => t !== spot);
    localStorage.setItem('region.data', JSON.stringify(regionData));
    renderRegion(document.getElementById('main-content'));
}

function addInfrastructure() {
    const facility = prompt('追加するインフラ・施設を入力してください:');
    if (!facility) return;
    
    const regionData = getRegionData();
    if (!regionData.infrastructure.includes(facility)) {
        regionData.infrastructure.push(facility);
        localStorage.setItem('region.data', JSON.stringify(regionData));
        renderRegion(document.getElementById('main-content'));
    }
}

function removeInfrastructure(facility) {
    const regionData = getRegionData();
    regionData.infrastructure = regionData.infrastructure.filter(i => i !== facility);
    localStorage.setItem('region.data', JSON.stringify(regionData));
    renderRegion(document.getElementById('main-content'));
}

// Expose to global scope
window.renderRegion = renderRegion;
window.getUserRegion = getUserRegion;
window.saveRegion = saveRegion;
window.updateRegionMunicipalities = updateRegionMunicipalities;
window.loadRegionDataAndRefreshIssues = loadRegionDataAndRefreshIssues;
window.inferIssuesInRegion = inferIssuesInRegion;
window.addManualIssueInRegion = addManualIssueInRegion;
window.removeIssueInRegion = removeIssueInRegion;
window.createProjectFromIssueInRegion = createProjectFromIssueInRegion;
window.editIssueInRegion = editIssueInRegion;
window.updateIssuePriority = updateIssuePriority;
window.updateIssueStatus = updateIssueStatus;
window.filterIssuesByCategory = filterIssuesByCategory;
window.addIndustry = addIndustry;
window.removeIndustry = removeIndustry;
window.addTourismSpot = addTourismSpot;
window.removeTourismSpot = removeTourismSpot;
window.addInfrastructure = addInfrastructure;
window.removeInfrastructure = removeInfrastructure;