// ===============================
// LocalSuccess - Projects Proposal Module
// ===============================

function renderProposalContent() {
    return `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold">ステップ5: 提案作成</h2>
                        <p class="text-sm text-muted-foreground">分析結果をもとに、説得力のある提案書を作成しましょう</p>
                    </div>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Left Column: Template Selection -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">提案テンプレートを選択</h3>
                            <p class="text-sm text-muted-foreground">プロジェクトの性質に合ったテンプレートを選んでください</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="grid gap-4">
                                <div onclick="selectProposalTemplate('business')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">ビジネス提案書</h4>
                                            <p class="text-sm text-gray-600">事業提案・新規事業・収益化</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div onclick="selectProposalTemplate('project')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">プロジェクト企画書</h4>
                                            <p class="text-sm text-gray-600">プロジェクト・施策・イベント</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div onclick="selectProposalTemplate('simple')" class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 transition-colors">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 class="font-semibold">シンプル提案</h4>
                                            <p class="text-sm text-gray-600">アイデア・改善提案・社内提案</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">提案書生成</h3>
                        </div>
                        <div class="card-content">
                            <div class="space-y-4">
                                <button onclick="generateProposal()" class="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                    </svg>
                                    提案書を生成
                                </button>
                                
                                <div class="text-center">
                                    <p class="text-sm text-gray-600">または</p>
                                </div>
                                
                                <button onclick="manualProposalEntry()" class="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    手動で作成
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Generated Proposal -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">生成された提案書</h3>
                            <p class="text-sm text-muted-foreground">これまでのステップのデータから自動生成</p>
                        </div>
                        <div class="card-content">
                            <div id="generated-proposal" class="min-h-[400px] text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-6">
                                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <p>「提案書を生成」ボタンを押すと、ここに提案書が表示されます</p>
                                <p class="text-sm mt-2">これまでのステップで入力した内容を自動的に整理します</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="card">
                        <div class="card-content">
                            <div class="space-y-3">
                                <button onclick="saveProposal()" class="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                                    </svg>
                                    提案書を保存
                                </button>
                                
                                <button onclick="exportProposal()" class="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                    エクスポート
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Final Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button onclick="openIdeationWorkspace('stakeholder')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    ← 関係者分析に戻る
                </button>
                <div class="text-center">
                    <div class="text-sm text-muted-foreground mb-2">ステップ 5 / 5</div>
                    <div class="w-64 h-2 bg-gray-200 rounded-full mx-auto">
                        <div class="w-full h-2 bg-indigo-600 rounded-full"></div>
                    </div>
                </div>
                <button onclick="createProjectFromWizard()" class="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
                    プロジェクトを開始する
                </button>
            </div>
        </div>
    `;
}

// Proposal generation functions
let selectedTemplate = 'business';

function selectProposalTemplate(templateType) {
    selectedTemplate = templateType;
    
    // Update visual selection
    const templates = document.querySelectorAll('[onclick*="selectProposalTemplate"]');
    templates.forEach(template => {
        template.classList.remove('border-blue-500', 'border-green-500', 'border-purple-500');
        template.classList.add('border-gray-200');
    });
    
    const selectedElement = document.querySelector(`[onclick="selectProposalTemplate('${templateType}')"]`);
    if (selectedElement) {
        selectedElement.classList.remove('border-gray-200');
        if (templateType === 'business') {
            selectedElement.classList.add('border-blue-500');
        } else if (templateType === 'project') {
            selectedElement.classList.add('border-green-500');
        } else if (templateType === 'simple') {
            selectedElement.classList.add('border-purple-500');
        }
    }
}

function generateProposal() {
    // Collect all data from previous steps
    const ideationData = JSON.parse(localStorage.getItem('ideationData') || '{}');
    const planningData = JSON.parse(localStorage.getItem('planningData') || '{}');
    const goalData = JSON.parse(localStorage.getItem('goalData') || '{}');
    const stakeholderData = JSON.parse(localStorage.getItem('stakeholderData') || '{}');
    
    let proposal = '';
    
    if (selectedTemplate === 'business') {
        proposal = generateBusinessProposal(ideationData, planningData, goalData, stakeholderData);
    } else if (selectedTemplate === 'project') {
        proposal = generateProjectProposal(ideationData, planningData, goalData, stakeholderData);
    } else if (selectedTemplate === 'simple') {
        proposal = generateSimpleProposal(ideationData, planningData, goalData, stakeholderData);
    }
    
    const proposalContainer = document.getElementById('generated-proposal');
    if (proposalContainer) {
        proposalContainer.innerHTML = proposal;
        proposalContainer.className = 'min-h-[400px] bg-white border border-gray-200 rounded-lg p-6 text-left';
    }
}

function generateBusinessProposal(ideation, planning, goal, stakeholder) {
    return `
        <div class="space-y-6">
            <div class="text-center border-b pb-4">
                <h1 class="text-2xl font-bold">${ideation.solution || '新規事業提案書'}</h1>
                <p class="text-gray-600 mt-2">${new Date().toLocaleDateString('ja-JP')}</p>
            </div>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">1. エグゼクティブサマリー</h2>
                <p class="text-sm leading-relaxed">${ideation.problem || '課題の概要'}</p>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">2. 事業機会・市場分析</h2>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-medium mb-2">解決すべき課題</h3>
                    <p class="text-sm">${ideation.problem || '未設定'}</p>
                </div>
                <div class="mt-3 bg-green-50 p-4 rounded-lg">
                    <h3 class="font-medium mb-2">対象市場</h3>
                    <p class="text-sm">${ideation.target || '未設定'}</p>
                </div>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">3. ソリューション・価値提案</h2>
                <p class="text-sm leading-relaxed">${ideation.solution || '未設定'}</p>
                <div class="mt-3 bg-purple-50 p-4 rounded-lg">
                    <h3 class="font-medium mb-2">期待される効果</h3>
                    <p class="text-sm">${ideation.impact || '未設定'}</p>
                </div>
            </section>
            
            ${goal.smart ? `
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">4. 目標・KPI</h2>
                <div class="space-y-2 text-sm">
                    ${goal.smart.specific ? `<div><strong>具体的目標:</strong> ${goal.smart.specific}</div>` : ''}
                    ${goal.smart.measurable ? `<div><strong>測定指標:</strong> ${goal.smart.measurable}</div>` : ''}
                    ${goal.smart.timebound ? `<div><strong>期限:</strong> ${goal.smart.timebound}</div>` : ''}
                </div>
            </section>
            ` : ''}
            
            ${stakeholder.stakeholders && stakeholder.stakeholders.length > 0 ? `
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">5. ステークホルダー</h2>
                <div class="grid grid-cols-2 gap-3">
                    ${stakeholder.stakeholders.slice(0, 4).map(sh => `
                        <div class="bg-gray-50 p-3 rounded text-sm">
                            <div class="font-medium">${sh.name}</div>
                            <div class="text-gray-600">${sh.role}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-blue-800">6. 次のステップ</h2>
                <ol class="list-decimal list-inside text-sm space-y-1">
                    <li>詳細な市場調査の実施</li>
                    <li>プロトタイプの開発</li>
                    <li>パイロットテストの実行</li>
                    <li>本格展開の準備</li>
                </ol>
            </section>
        </div>
    `;
}

function generateProjectProposal(ideation, planning, goal, stakeholder) {
    return `
        <div class="space-y-6">
            <div class="text-center border-b pb-4">
                <h1 class="text-2xl font-bold">${ideation.solution || 'プロジェクト企画書'}</h1>
                <p class="text-gray-600 mt-2">${new Date().toLocaleDateString('ja-JP')}</p>
            </div>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">1. プロジェクト概要</h2>
                <div class="bg-green-50 p-4 rounded-lg">
                    <p class="text-sm leading-relaxed">${ideation.problem || '課題設定が必要です'}</p>
                </div>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">2. 背景・課題</h2>
                <p class="text-sm leading-relaxed">${ideation.problem || '未設定'}</p>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">3. 解決策・アプローチ</h2>
                <p class="text-sm leading-relaxed">${ideation.solution || '未設定'}</p>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">4. 対象・受益者</h2>
                <p class="text-sm leading-relaxed">${ideation.target || '未設定'}</p>
            </section>
            
            ${goal.smart ? `
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">5. プロジェクト目標</h2>
                <div class="space-y-3">
                    ${goal.smart.specific ? `
                    <div class="bg-blue-50 p-3 rounded">
                        <h3 class="font-medium text-sm mb-1">具体的目標</h3>
                        <p class="text-sm">${goal.smart.specific}</p>
                    </div>
                    ` : ''}
                    ${goal.kpis && goal.kpis.length > 0 ? `
                    <div class="bg-yellow-50 p-3 rounded">
                        <h3 class="font-medium text-sm mb-2">主要KPI</h3>
                        <ul class="text-sm space-y-1">
                            ${goal.kpis.map(kpi => `<li>• ${kpi.name}: ${kpi.target}${kpi.unit === 'percent' ? '%' : kpi.unit === 'number' ? '人' : kpi.unit}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            </section>
            ` : ''}
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">6. 期待される効果</h2>
                <div class="space-y-2">
                    ${goal.impact ? `
                        ${goal.impact.short ? `<div><strong>短期効果:</strong> ${goal.impact.short}</div>` : ''}
                        ${goal.impact.medium ? `<div><strong>中期効果:</strong> ${goal.impact.medium}</div>` : ''}
                        ${goal.impact.long ? `<div><strong>長期効果:</strong> ${goal.impact.long}</div>` : ''}
                    ` : `<p class="text-sm">${ideation.impact || '未設定'}</p>`}
                </div>
            </section>
            
            <section>
                <h2 class="text-lg font-semibold mb-3 text-green-800">7. 実施体制</h2>
                ${stakeholder.stakeholders && stakeholder.stakeholders.length > 0 ? `
                <div class="space-y-2">
                    ${stakeholder.stakeholders.map(sh => `
                        <div class="flex justify-between bg-gray-50 p-2 rounded text-sm">
                            <span class="font-medium">${sh.name}</span>
                            <span class="text-gray-600">${sh.role}</span>
                        </div>
                    `).join('')}
                </div>
                ` : '<p class="text-sm text-gray-500">実施体制を設定してください</p>'}
            </section>
        </div>
    `;
}

function generateSimpleProposal(ideation, planning, goal, stakeholder) {
    return `
        <div class="space-y-4">
            <div class="text-center border-b pb-3">
                <h1 class="text-xl font-bold">${ideation.solution || 'アイデア提案'}</h1>
                <p class="text-gray-600 text-sm mt-1">${new Date().toLocaleDateString('ja-JP')}</p>
            </div>
            
            <section>
                <h2 class="text-base font-semibold mb-2 text-purple-800">💡 提案内容</h2>
                <p class="text-sm leading-relaxed bg-purple-50 p-3 rounded">${ideation.solution || '未設定'}</p>
            </section>
            
            <section>
                <h2 class="text-base font-semibold mb-2 text-purple-800">❓ 解決したい課題</h2>
                <p class="text-sm leading-relaxed">${ideation.problem || '未設定'}</p>
            </section>
            
            <section>
                <h2 class="text-base font-semibold mb-2 text-purple-800">🎯 期待される効果</h2>
                <p class="text-sm leading-relaxed">${ideation.impact || '未設定'}</p>
            </section>
            
            ${goal.smart && goal.smart.specific ? `
            <section>
                <h2 class="text-base font-semibold mb-2 text-purple-800">📋 実施方法</h2>
                <p class="text-sm leading-relaxed">${goal.smart.specific}</p>
            </section>
            ` : ''}
            
            <section>
                <h2 class="text-base font-semibold mb-2 text-purple-800">✅ 次のアクション</h2>
                <ul class="text-sm space-y-1 list-disc list-inside">
                    <li>詳細検討・調査</li>
                    <li>関係者との調整</li>
                    <li>実施計画の策定</li>
                    <li>リソース確保</li>
                </ul>
            </section>
        </div>
    `;
}

function manualProposalEntry() {
    const proposalContainer = document.getElementById('generated-proposal');
    if (proposalContainer) {
        proposalContainer.innerHTML = `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold">手動入力モード</h3>
                <textarea 
                    id="manual-proposal-text" 
                    class="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none" 
                    placeholder="提案書の内容を自由に入力してください...&#10;&#10;例:&#10;■ 提案概要&#10;■ 背景・課題&#10;■ 解決策&#10;■ 期待効果&#10;■ 実施計画"
                ></textarea>
                <div class="flex gap-2">
                    <button onclick="saveManualProposal()" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        保存
                    </button>
                    <button onclick="generateProposal()" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        自動生成に戻る
                    </button>
                </div>
            </div>
        `;
        proposalContainer.className = 'min-h-[400px] bg-white border border-gray-200 rounded-lg p-6';
    }
}

function saveManualProposal() {
    const text = document.getElementById('manual-proposal-text').value;
    if (!text.trim()) {
        alert('提案内容を入力してください');
        return;
    }
    
    const proposalData = {
        type: 'manual',
        content: text,
        template: selectedTemplate,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('proposalData', JSON.stringify(proposalData));
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    message.textContent = '手動入力の提案書を保存しました';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function saveProposal() {
    const proposalContainer = document.getElementById('generated-proposal');
    if (!proposalContainer || proposalContainer.innerHTML.includes('提案書を生成')) {
        alert('まず提案書を生成してください');
        return;
    }
    
    const proposalData = {
        type: 'generated',
        template: selectedTemplate,
        content: proposalContainer.innerHTML,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('proposalData', JSON.stringify(proposalData));
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    message.textContent = '提案書を保存しました';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function exportProposal() {
    const proposalContainer = document.getElementById('generated-proposal');
    if (!proposalContainer || proposalContainer.innerHTML.includes('提案書を生成')) {
        alert('まず提案書を生成してください');
        return;
    }
    
    // Show export options
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg z-50';
    message.textContent = 'エクスポート機能は開発中です';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Export functions to global scope
window.renderProposalContent = renderProposalContent;
window.selectProposalTemplate = selectProposalTemplate;
window.generateProposal = generateProposal;
window.generateBusinessProposal = generateBusinessProposal;
window.generateProjectProposal = generateProjectProposal;
window.generateSimpleProposal = generateSimpleProposal;
window.manualProposalEntry = manualProposalEntry;
window.saveManualProposal = saveManualProposal;
window.saveProposal = saveProposal;
window.exportProposal = exportProposal;