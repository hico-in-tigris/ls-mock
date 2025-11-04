// Stakeholder Analysis Functions

// Stakeholder data storage
let stakeholders = [];
let stakeholderIdCounter = 1;

function initializeStakeholderMatrix() {
    // Load saved stakeholders if any
    const saved = localStorage.getItem('stakeholders');
    if (saved) {
        stakeholders = JSON.parse(saved);
        stakeholderIdCounter = Math.max(...stakeholders.map(s => s.id), 0) + 1;
        updateStakeholderDisplay();
    }
}

function addStakeholder() {
    const name = document.getElementById('stakeholder-name').value.trim();
    const role = document.getElementById('stakeholder-role').value.trim();
    const influence = document.getElementById('stakeholder-influence').value;
    const interest = document.getElementById('stakeholder-interest').value;
    const expectations = document.getElementById('stakeholder-expectations').value.trim();
    
    if (!name) {
        alert('ステークホルダー名を入力してください。');
        return;
    }
    
    const stakeholder = {
        id: stakeholderIdCounter++,
        name,
        role,
        influence,
        interest,
        expectations,
        position: calculateMatrixPosition(influence, interest)
    };
    
    stakeholders.push(stakeholder);
    saveStakeholders();
    updateStakeholderDisplay();
    clearStakeholderForm();
}

function clearStakeholderForm() {
    document.getElementById('stakeholder-name').value = '';
    document.getElementById('stakeholder-role').value = '';
    document.getElementById('stakeholder-influence').value = 'medium';
    document.getElementById('stakeholder-interest').value = 'medium';
    document.getElementById('stakeholder-expectations').value = '';
}

function calculateMatrixPosition(influence, interest) {
    const influenceMap = { low: 0.25, medium: 0.5, high: 0.75 };
    const interestMap = { low: 0.75, medium: 0.5, high: 0.25 }; // 関心度は上が高い
    
    return {
        x: interestMap[interest] * 100, // left percentage
        y: influenceMap[influence] * 100  // top percentage
    };
}

function addSampleStakeholders() {
    const samples = [
        {
            name: '経営陣',
            role: '意思決定者',
            influence: 'high',
            interest: 'high',
            expectations: 'ROI向上とブランド価値向上を期待'
        },
        {
            name: '開発チーム',
            role: '実行者',
            influence: 'medium',
            interest: 'high',
            expectations: '技術的実現可能性と工数の適正化を重視'
        },
        {
            name: '営業部門',
            role: '利用者',
            influence: 'medium',
            interest: 'medium',
            expectations: '顧客満足度向上と売上増加を期待'
        },
        {
            name: '顧客',
            role: '受益者',
            influence: 'high',
            interest: 'medium',
            expectations: 'サービス品質向上と利便性向上を求める'
        },
        {
            name: 'パートナー企業',
            role: '協力者',
            influence: 'low',
            interest: 'medium',
            expectations: '相互利益の最大化を期待'
        },
        {
            name: '規制当局',
            role: '監督者',
            influence: 'high',
            interest: 'low',
            expectations: 'コンプライアンス遵守を要求'
        }
    ];
    
    stakeholders = [];
    stakeholderIdCounter = 1;
    
    samples.forEach(sample => {
        const stakeholder = {
            id: stakeholderIdCounter++,
            ...sample,
            position: calculateMatrixPosition(sample.influence, sample.interest)
        };
        stakeholders.push(stakeholder);
    });
    
    saveStakeholders();
    updateStakeholderDisplay();
}

function updateStakeholderDisplay() {
    updateStakeholderList();
    updateStakeholderMatrix();
}

function updateStakeholderList() {
    const container = document.getElementById('stakeholder-list');
    
    if (stakeholders.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">まだステークホルダーが登録されていません</p>';
        return;
    }
    
    container.innerHTML = stakeholders.map(stakeholder => {
        const influenceLabel = { low: '低', medium: '中', high: '高' }[stakeholder.influence];
        const interestLabel = { low: '低', medium: '中', high: '高' }[stakeholder.interest];
        const quadrant = getQuadrant(stakeholder.influence, stakeholder.interest);
        
        return `
            <div class="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                            <h5 class="font-medium text-gray-800">${stakeholder.name}</h5>
                            <span class="text-sm text-gray-600">${stakeholder.role}</span>
                            <span class="px-2 py-1 text-xs rounded-full ${quadrant.color}">${quadrant.label}</span>
                        </div>
                        <div class="text-sm text-gray-600 mb-2">
                            影響度: ${influenceLabel} | 関心度: ${interestLabel}
                        </div>
                        ${stakeholder.expectations ? `<p class="text-sm text-gray-700">${stakeholder.expectations}</p>` : ''}
                    </div>
                    <button onclick="removeStakeholder(${stakeholder.id})" class="text-red-500 hover:text-red-700 ml-4">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateStakeholderMatrix() {
    const matrix = document.getElementById('stakeholder-matrix');
    
    // Remove existing stakeholder dots
    const existingDots = matrix.querySelectorAll('.stakeholder-dot');
    existingDots.forEach(dot => dot.remove());
    
    // Add stakeholder dots
    stakeholders.forEach(stakeholder => {
        const dot = document.createElement('div');
        dot.className = 'stakeholder-dot absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer';
        dot.style.left = `${stakeholder.position.x}%`;
        dot.style.top = `${stakeholder.position.y}%`;
        
        const quadrant = getQuadrant(stakeholder.influence, stakeholder.interest);
        
        dot.innerHTML = `
            <div class="w-3 h-3 ${quadrant.dotColor} rounded-full border-2 border-white shadow-md"></div>
            <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                ${stakeholder.name}
            </div>
        `;
        
        matrix.appendChild(dot);
    });
}

function getQuadrant(influence, interest) {
    if (influence === 'high' && interest === 'high') {
        return { 
            label: '重要・積極関与', 
            color: 'bg-red-100 text-red-700',
            dotColor: 'bg-red-500'
        };
    } else if (influence === 'high' && (interest === 'medium' || interest === 'low')) {
        return { 
            label: '監視・情報提供', 
            color: 'bg-orange-100 text-orange-700',
            dotColor: 'bg-orange-500'
        };
    } else if ((influence === 'medium' || influence === 'low') && interest === 'high') {
        return { 
            label: '協力確保', 
            color: 'bg-green-100 text-green-700',
            dotColor: 'bg-green-500'
        };
    } else {
        return { 
            label: '最低限対応', 
            color: 'bg-gray-100 text-gray-700',
            dotColor: 'bg-gray-500'
        };
    }
}

function removeStakeholder(id) {
    if (confirm('このステークホルダーを削除しますか？')) {
        stakeholders = stakeholders.filter(s => s.id !== id);
        saveStakeholders();
        updateStakeholderDisplay();
    }
}

function saveStakeholders() {
    localStorage.setItem('stakeholders', JSON.stringify(stakeholders));
}

function generateStakeholderMatrix() {
    if (stakeholders.length === 0) {
        alert('まずステークホルダーを追加してください。');
        return;
    }
    
    const analysis = analyzeStakeholders();
    const resultContainer = document.getElementById('stakeholder-analysis-result');
    const contentContainer = document.getElementById('analysis-content');
    
    contentContainer.innerHTML = `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h5 class="font-medium text-red-800 mb-3">重要・積極関与（影響度:高 / 関心度:高）</h5>
                    <p class="text-sm text-red-700 mb-3">最も重要なステークホルダー。積極的な関与とコミュニケーションが必要。</p>
                    ${analysis.highHighStakeholders.length > 0 ? 
                        `<ul class="space-y-1">${analysis.highHighStakeholders.map(s => `<li class="text-sm">• ${s.name} (${s.role})</li>`).join('')}</ul>` :
                        '<p class="text-sm text-gray-500">該当なし</p>'
                    }
                </div>
                
                <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h5 class="font-medium text-orange-800 mb-3">監視・情報提供（影響度:高 / 関心度:低）</h5>
                    <p class="text-sm text-orange-700 mb-3">影響力は大きいが関心は低い。定期的な情報提供で満足度を維持。</p>
                    ${analysis.highLowStakeholders.length > 0 ? 
                        `<ul class="space-y-1">${analysis.highLowStakeholders.map(s => `<li class="text-sm">• ${s.name} (${s.role})</li>`).join('')}</ul>` :
                        '<p class="text-sm text-gray-500">該当なし</p>'
                    }
                </div>
                
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 class="font-medium text-green-800 mb-3">協力確保（影響度:低 / 関心度:高）</h5>
                    <p class="text-sm text-green-700 mb-3">関心は高いが影響力は限定的。協力を得るための配慮が重要。</p>
                    ${analysis.lowHighStakeholders.length > 0 ? 
                        `<ul class="space-y-1">${analysis.lowHighStakeholders.map(s => `<li class="text-sm">• ${s.name} (${s.role})</li>`).join('')}</ul>` :
                        '<p class="text-sm text-gray-500">該当なし</p>'
                    }
                </div>
                
                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h5 class="font-medium text-gray-800 mb-3">最低限対応（影響度:低 / 関心度:低）</h5>
                    <p class="text-sm text-gray-700 mb-3">最低限の情報提供とモニタリングで十分。</p>
                    ${analysis.lowLowStakeholders.length > 0 ? 
                        `<ul class="space-y-1">${analysis.lowLowStakeholders.map(s => `<li class="text-sm">• ${s.name} (${s.role})</li>`).join('')}</ul>` :
                        '<p class="text-sm text-gray-500">該当なし</p>'
                    }
                </div>
            </div>
            
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 class="font-medium text-blue-800 mb-3">推奨アクション</h5>
                <div class="space-y-2 text-sm text-blue-700">
                    ${analysis.recommendations.map(rec => `<p>• ${rec}</p>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    resultContainer.classList.remove('hidden');
}

function analyzeStakeholders() {
    const highHighStakeholders = stakeholders.filter(s => s.influence === 'high' && s.interest === 'high');
    const highLowStakeholders = stakeholders.filter(s => s.influence === 'high' && (s.interest === 'medium' || s.interest === 'low'));
    const lowHighStakeholders = stakeholders.filter(s => (s.influence === 'medium' || s.influence === 'low') && s.interest === 'high');
    const lowLowStakeholders = stakeholders.filter(s => (s.influence === 'medium' || s.influence === 'low') && (s.interest === 'medium' || s.interest === 'low'));
    
    const recommendations = [];
    
    if (highHighStakeholders.length > 0) {
        recommendations.push(`重要な${highHighStakeholders.length}名のステークホルダーには定期的な進捗報告と意見交換の場を設ける`);
    }
    
    if (highLowStakeholders.length > 0) {
        recommendations.push(`影響力の高い${highLowStakeholders.length}名には簡潔な進捗レポートを定期送付する`);
    }
    
    if (lowHighStakeholders.length > 0) {
        recommendations.push(`関心の高い${lowHighStakeholders.length}名には詳細情報を提供し、協力を求める`);
    }
    
    if (stakeholders.length > 6) {
        recommendations.push('ステークホルダーが多いため、コミュニケーション計画を体系化することを推奨');
    }
    
    return {
        highHighStakeholders,
        highLowStakeholders,
        lowHighStakeholders,
        lowLowStakeholders,
        recommendations
    };
}

function exportStakeholderAnalysis() {
    if (stakeholders.length === 0) {
        alert('まずステークホルダーを追加してください。');
        return;
    }
    
    const analysis = analyzeStakeholders();
    
    const exportData = {
        timestamp: new Date().toISOString(),
        stakeholders: stakeholders,
        analysis: analysis,
        summary: {
            total: stakeholders.length,
            highImpact: stakeholders.filter(s => s.influence === 'high').length,
            highInterest: stakeholders.filter(s => s.interest === 'high').length
        }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `stakeholder-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('関係者分析結果をダウンロードしました。');
}

// Expose to global scope
window.initializeStakeholderMatrix = initializeStakeholderMatrix;
window.addStakeholder = addStakeholder;
window.clearStakeholderForm = clearStakeholderForm;
window.calculateMatrixPosition = calculateMatrixPosition;
window.addSampleStakeholders = addSampleStakeholders;
window.updateStakeholderDisplay = updateStakeholderDisplay;
window.updateStakeholderList = updateStakeholderList;
window.updateStakeholderMatrix = updateStakeholderMatrix;
window.getQuadrant = getQuadrant;
window.removeStakeholder = removeStakeholder;
window.saveStakeholders = saveStakeholders;
window.generateStakeholderMatrix = generateStakeholderMatrix;
window.analyzeStakeholders = analyzeStakeholders;
window.exportStakeholderAnalysis = exportStakeholderAnalysis;