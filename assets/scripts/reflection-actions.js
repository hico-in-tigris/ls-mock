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