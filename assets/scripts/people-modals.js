// ===============================
// LocalSuccess - People Modals Module
// ===============================
// Purpose: Modal management (person detail, add, edit, category detail)

(function(){
'use strict';

/**
 * Quick contact action - create task and update last contact
 */
function quickContact(personId) {
    const person = getPersonById(personId);
    
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
    person.lastContact = new Date().toISOString().split('T')[0];
    saveData();
    
    alert(`${getMaskedName(person.name)}さんへの連絡タスクを今日のタスクに追加しました！`);
    window.refreshPeopleContent();
}

/**
 * Open person detail modal
 */
function openPersonDetail(personId) {
    const person = getPersonById(personId);
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    
    const relationshipStrength = window.getRelationshipStrength(person);
    const daysSinceLastContact = daysSince(person.lastContact);
    const urgency = window.getUrgencyLevel(daysSinceLastContact);
    
    // Simplified detail view
    content.innerHTML = `
        <div class="flex justify-between items-start mb-6">
            <div class="flex items-center space-x-4">
                <div class="avatar avatar-xl">${person.avatar}</div>
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
        
        <div class="space-y-4">
            <div class="card">
                <div class="card-content">
                    <h3 class="font-semibold mb-2">連絡先</h3>
                    <p class="text-sm"><strong>Email:</strong> ${person.email}</p>
                    <p class="text-sm"><strong>電話:</strong> ${person.phone}</p>
                    <p class="text-sm"><strong>最終連絡:</strong> ${daysSinceLastContact}日前</p>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="quickContact(${person.id})" class="btn btn-primary">連絡タスク作成</button>
                <button onclick="editPerson(${person.id})" class="btn btn-secondary">編集</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

/**
 * Close person detail modal
 */
function closePersonDetail() {
    document.getElementById('person-detail-modal').classList.add('hidden');
}

/**
 * Open add person modal
 */
function openAddPersonModal() {
    document.getElementById('add-person-modal').classList.remove('hidden');
}

/**
 * Close add person modal
 */
function closeAddPersonModal() {
    const modal = document.getElementById('add-person-modal');
    modal.classList.add('hidden');
    
    // Clear form
    ['new-person-name', 'new-person-role', 'new-person-email', 'new-person-phone', 
     'new-person-tags', 'new-person-address', 'new-person-lat', 'new-person-lng',
     'new-person-landmark', 'new-person-notes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    const areaEl = document.getElementById('new-person-area');
    if (areaEl) areaEl.value = '地域内';
}

/**
 * Add new person to database
 */
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
    
    const tags = tagsInput ? tagsInput.split(',').map(tag => {
        const cleanTag = tag.trim();
        return cleanTag.startsWith('#') ? cleanTag : '#' + cleanTag;
    }) : [];
    
    const avatar = name.split(' ').map(part => part.charAt(0).toUpperCase()).join('').slice(0, 2);
    
    const newPerson = {
        id: sampleData.people.length + 1,
        name: name,
        role: role,
        tags: tags,
        lastContact: new Date().toISOString().split('T')[0],
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
    renderCurrentRoute();
    
    alert(`${name}さんをネットワークに追加しました！`);
}

/**
 * Open edit modal for person
 */
function editPerson(personId) {
    const person = getPersonById(personId);
    const modal = document.getElementById('person-detail-modal');
    const content = document.getElementById('person-detail-content');
    
    // Simplified edit form
    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">人物情報を編集</h2>
        <form onsubmit="savePersonEdit(event, ${person.id})" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">名前 *</label>
                <input type="text" id="edit-person-name" value="${person.name}" class="w-full p-2 border rounded" required>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">役職 *</label>
                <input type="text" id="edit-person-role" value="${person.role}" class="w-full p-2 border rounded" required>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">メール</label>
                <input type="email" id="edit-person-email" value="${person.email}" class="w-full p-2 border rounded">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">電話</label>
                <input type="tel" id="edit-person-phone" value="${person.phone}" class="w-full p-2 border rounded">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">タグ</label>
                <input type="text" id="edit-person-tags" value="${person.tags.join(', ')}" class="w-full p-2 border rounded">
            </div>
            <div class="flex space-x-2">
                <button type="submit" class="btn btn-primary">保存</button>
                <button type="button" onclick="openPersonDetail(${person.id})" class="btn btn-secondary">キャンセル</button>
            </div>
        </form>
    `;
    
    modal.classList.remove('hidden');
}

/**
 * Save person edit
 */
function savePersonEdit(event, personId) {
    event.preventDefault();
    
    const person = getPersonById(personId);
    
    person.name = document.getElementById('edit-person-name').value.trim();
    person.role = document.getElementById('edit-person-role').value.trim();
    person.email = document.getElementById('edit-person-email').value.trim();
    person.phone = document.getElementById('edit-person-phone').value.trim();
    
    const tagsInput = document.getElementById('edit-person-tags').value.trim();
    person.tags = tagsInput ? tagsInput.split(',').map(tag => {
        const cleanTag = tag.trim();
        return cleanTag.startsWith('#') ? cleanTag : '#' + cleanTag;
    }) : [];
    
    saveData();
    openPersonDetail(personId);
    window.refreshPeopleContent();
    
    showNotification('人物情報を更新しました', 'success');
}

/**
 * Export people data
 */
function exportPeopleData() {
    const dataStr = JSON.stringify(sampleData.people, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `people-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('人物データをエクスポートしました', 'success');
}

/**
 * Render modal skeletons (called from main render)
 */
function renderPersonModal() {
    return `
        <div id="person-detail-modal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div id="person-detail-content"></div>
            </div>
        </div>
    `;
}

function renderAddPersonModal() {
    return `
        <div id="add-person-modal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 class="text-2xl font-bold mb-4">新しい人物を追加</h2>
                <form onsubmit="addNewPerson(event)" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">名前 *</label>
                        <input type="text" id="new-person-name" class="w-full p-2 border rounded" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">役職 *</label>
                        <input type="text" id="new-person-role" class="w-full p-2 border rounded" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">メールアドレス</label>
                        <input type="email" id="new-person-email" class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">電話番号</label>
                        <input type="tel" id="new-person-phone" class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">タグ（カンマ区切り）</label>
                        <input type="text" id="new-person-tags" class="w-full p-2 border rounded" placeholder="例: #移住相談, #農業">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">エリア</label>
                        <select id="new-person-area" class="w-full p-2 border rounded">
                            <option value="地域内">地域内</option>
                            <option value="地域外">地域外</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">住所</label>
                        <input type="text" id="new-person-address" class="w-full p-2 border rounded">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">緯度</label>
                            <input type="number" step="any" id="new-person-lat" class="w-full p-2 border rounded">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">経度</label>
                            <input type="number" step="any" id="new-person-lng" class="w-full p-2 border rounded">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">目印</label>
                        <input type="text" id="new-person-landmark" class="w-full p-2 border rounded">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">メモ</label>
                        <textarea id="new-person-notes" class="w-full p-2 border rounded h-24"></textarea>
                    </div>
                    <div class="flex space-x-2">
                        <button type="submit" class="btn btn-primary">追加</button>
                        <button type="button" onclick="closeAddPersonModal()" class="btn btn-secondary">キャンセル</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function renderCategoryDetailModal() {
    return `
        <div id="category-detail-modal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div id="category-detail-content"></div>
            </div>
        </div>
    `;
}

// Stub functions for compatibility
function scheduleMeeting(personId) {
    alert('ミーティング機能は実装予定です');
}

function addPersonToProject(personId) {
    alert('プロジェクト追加機能は実装予定です');
}

function createActionFromSuggestion(personId, suggestionIndex) {
    alert('アクション作成機能は実装予定です');
}

function showCategoryDetail(category) {
    alert(`カテゴリ詳細表示: ${category}`);
}

function closeCategoryDetail() {
    document.getElementById('category-detail-modal').classList.add('hidden');
}

function getCommonConnections(person) {
    const others = sampleData.people.filter(p => p.id !== person.id);
    return others.slice(0, Math.min(3, others.length));
}

// Public API
window.PeopleModals = {
    quickContact,
    openPersonDetail,
    closePersonDetail,
    openAddPersonModal,
    closeAddPersonModal,
    addNewPerson,
    editPerson,
    savePersonEdit,
    exportPeopleData,
    renderPersonModal,
    renderAddPersonModal,
    renderCategoryDetailModal,
    scheduleMeeting,
    addPersonToProject,
    createActionFromSuggestion,
    showCategoryDetail,
    closeCategoryDetail
};

// Backward compatibility
window.quickContact = quickContact;
window.openPersonDetail = openPersonDetail;
window.closePersonDetail = closePersonDetail;
window.openAddPersonModal = openAddPersonModal;
window.closeAddPersonModal = closeAddPersonModal;
window.addNewPerson = addNewPerson;
window.editPerson = editPerson;
window.savePersonEdit = savePersonEdit;
window.exportPeopleData = exportPeopleData;
window.renderPersonModal = renderPersonModal;
window.renderAddPersonModal = renderAddPersonModal;
window.renderCategoryDetailModal = renderCategoryDetailModal;
window.scheduleMeeting = scheduleMeeting;
window.addPersonToProject = addPersonToProject;
window.createActionFromSuggestion = createActionFromSuggestion;
window.showCategoryDetail = showCategoryDetail;
window.closeCategoryDetail = closeCategoryDetail;

})();
