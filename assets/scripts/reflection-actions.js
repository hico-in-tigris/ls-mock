// ===============================
// LocalSuccess - Reflection Actions
// ===============================

function addDailyAction() {
    const selectedProject = reflectionData.daily[0].selectedProject;
    
    if (!selectedProject) {
        alert('プロジェクトを選択してください');
        return;
    }
    
    const time = document.getElementById('action-time')?.value;
    const content = document.getElementById('action-content')?.value;
    const type = document.getElementById('action-type')?.value;
    const result = document.getElementById('action-result')?.value;
    
    if (!time || !content || !result) {
        alert('すべての項目を入力してください');
        return;
    }
    
    // Add to reflection data with project ID
    const newAction = {
        time: time,
        action: content,
        result: result,
        type: type,
        projectId: selectedProject
    };
    
    // Add to global actions data
    sampleData.actions.unshift({
        id: sampleData.actions.length + 1,
        time: time,
        action: content,
        result: result,
        type: type,
        projectId: selectedProject,
        date: new Date().toISOString().split('T')[0]
    });
    
    // Clear form
    clearActionForm();
    
    // Save data
    saveReflectionData();
    
    // Refresh the daily reflection view
    renderReflectionContent('daily');
    
    alert('アクションが追加されました！');
}

function clearActionForm() {
    document.getElementById('action-time').value = '';
    document.getElementById('action-content').value = '';
    document.getElementById('action-type').selectedIndex = 0;
    document.getElementById('action-result').value = '';
}

function saveDailyReflection() {
    const good = document.getElementById('daily-good')?.value;
    const challenge = document.getElementById('daily-challenge')?.value;
    const next = document.getElementById('daily-next')?.value;
    
    if (!good && !challenge && !next) {
        alert('少なくとも一つの項目を入力してください');
        return;
    }
    
    // Update reflection data (in a real app, this would save to backend)
    reflectionData.daily[0].reflection = {
        good: good || reflectionData.daily[0].reflection.good,
        challenge: challenge || reflectionData.daily[0].reflection.challenge,
        next: next || reflectionData.daily[0].reflection.next
    };
    
    // Save to localStorage
    saveReflectionData();
    
    alert('今日のふりかえりが保存されました！');
}

function clearDailyReflection() {
    if (confirm('ふりかえりの内容をリセットしますか？')) {
        document.getElementById('daily-good').value = '';
        document.getElementById('daily-challenge').value = '';
        document.getElementById('daily-next').value = '';
    }
}

function saveSummary() {
    saveReflectionData();
    alert('ふりかえりが保存されました');
}

function promoteSelectedToNext() {
    alert('選択された項目が次期プランに反映されました');
}

// Modal functions
function openActionModal() {
    const modal = document.getElementById('action-modal');
    if (modal) {
        modal.classList.remove('hidden');
        // 現在時刻をデフォルトに設定
        const now = new Date();
        const timeString = now.toTimeString().substr(0, 5);
        document.getElementById('modal-action-time').value = timeString;
        
        // フォーカスをアクション内容に設定
        setTimeout(() => {
            document.getElementById('modal-action-content').focus();
        }, 100);
        
        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', handleEscKey);
        
        // 背景クリックでモーダルを閉じる
        modal.addEventListener('click', handleBackgroundClick);
    }
}

function closeActionModal() {
    const modal = document.getElementById('action-modal');
    if (modal) {
        modal.classList.add('hidden');
        clearModalForm();
        
        // イベントリスナーを削除
        document.removeEventListener('keydown', handleEscKey);
        modal.removeEventListener('click', handleBackgroundClick);
    }
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeActionModal();
    }
}

function handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
        closeActionModal();
    }
}

function clearModalForm() {
    document.getElementById('modal-action-time').value = '';
    document.getElementById('modal-action-content').value = '';
    document.getElementById('modal-action-type').value = 'meeting';
    document.getElementById('modal-action-result').value = '';
}

function addActionFromModal() {
    const time = document.getElementById('modal-action-time').value;
    const content = document.getElementById('modal-action-content').value;
    const type = document.getElementById('modal-action-type').value;
    const result = document.getElementById('modal-action-result').value;
    
    if (!time || !content || !result) {
        alert('すべての項目を入力してください。');
        return false;
    }
    
    const selectedProject = reflectionData.daily[0].selectedProject;
    if (!selectedProject) {
        alert('プロジェクトが選択されていません。');
        return false;
    }
    
    const newAction = {
        time: time,
        action: content,
        result: result,
        type: type,
        projectId: selectedProject
    };
    
    // アクションを追加
    reflectionData.daily[0].actions.push(newAction);
    
    // データを保存
    saveReflectionData();
    
    // モーダルを閉じる
    closeActionModal();
    
    // 表示を更新
    renderReflectionContent('daily');
    
    alert('アクションが追加されました！');
    return false;
}

// Expose to global scope
window.addDailyAction = addDailyAction;
window.clearActionForm = clearActionForm;
window.saveDailyReflection = saveDailyReflection;
window.clearDailyReflection = clearDailyReflection;
window.saveSummary = saveSummary;
window.promoteSelectedToNext = promoteSelectedToNext;
window.openActionModal = openActionModal;
window.closeActionModal = closeActionModal;
window.addActionFromModal = addActionFromModal;