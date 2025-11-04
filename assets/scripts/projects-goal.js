// ===============================
// LocalSuccess - Projects Goal Setting Module
// ===============================

function renderGoalSettingContent() {
    return `
        <div class="p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">目標設定ワークスペース</h2>
                    <p class="text-muted-foreground">SMART目標とKPI設計で成功指標を明確化</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <!-- Progress Navigation -->
            <div class="mb-6">
                <div class="flex items-center space-x-4">
                    <button onclick="openIdeationWorkspace('ideation')" class="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                            <line x1="9" y1="9" x2="9.01" y2="9"/>
                            <line x1="15" y1="9" x2="15.01" y2="9"/>
                        </svg>
                        想いの整理
                    </button>
                    <button onclick="openIdeationWorkspace('planning')" class="flex items-center px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">
                        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                        </svg>
                        企画構成
                    </button>
                    <div class="text-purple-600 font-medium px-3 py-2 bg-purple-50 rounded-md border border-purple-200">
                        <svg class="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                        目標設定
                    </div>
                </div>
            </div>
            
            <div class="grid gap-6 lg:grid-cols-2">
                <!-- Left Column: Goal Setting Framework -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">SMART目標設定</h3>
                            <p class="text-sm text-muted-foreground">具体的で測定可能な目標を設定</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Specific（具体的）
                                    <span class="text-muted-foreground text-xs ml-1">何を達成するか明確に</span>
                                </label>
                                <textarea id="goal-specific" rows="3" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 地域の高齢者100名に対してデジタル技術教育プログラムを提供する"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Measurable（測定可能）
                                    <span class="text-muted-foreground text-xs ml-1">数値で測れる指標</span>
                                </label>
                                <textarea id="goal-measurable" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 参加者100名、プログラム完了率80%以上、満足度4.0以上"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Achievable（達成可能）
                                    <span class="text-muted-foreground text-xs ml-1">実現可能性の根拠</span>
                                </label>
                                <textarea id="goal-achievable" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 既存の公民館ネットワークと講師陣を活用、予算200万円確保済み"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Relevant（関連性）
                                    <span class="text-muted-foreground text-xs ml-1">なぜ重要か</span>
                                </label>
                                <textarea id="goal-relevant" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: デジタル格差解消による高齢者の社会参加促進、地域活性化に寄与"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">
                                    Time-bound（期限）
                                    <span class="text-muted-foreground text-xs ml-1">いつまでに</span>
                                </label>
                                <input type="text" id="goal-timebound" class="w-full p-3 border border-input rounded-md" placeholder="例: 2024年12月末までに第1期プログラムを完了">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Success Metrics -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">成功指標・KPI</h3>
                            <p class="text-sm text-muted-foreground">目標達成を測る具体的指標</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">主要指標（KPI）</label>
                                <div id="kpi-list" class="space-y-2">
                                    <div class="flex items-center space-x-2">
                                        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="指標名（例: プログラム完了率）">
                                        <input type="text" class="w-24 p-2 border border-input rounded-md text-sm" placeholder="目標値">
                                        <select class="p-2 border border-input rounded-md text-sm">
                                            <option value="percent">%</option>
                                            <option value="number">人</option>
                                            <option value="score">点</option>
                                            <option value="days">日</option>
                                        </select>
                                        <button type="button" onclick="removeKPI(this)" class="text-red-500 hover:text-red-700">
                                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" onclick="addKPI()" class="mt-2 text-sm text-blue-600 hover:text-blue-800">+ KPIを追加</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Column: Impact & Timeline -->
                <div class="space-y-6">
                    <!-- Impact Analysis -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">インパクト分析</h3>
                            <p class="text-sm text-muted-foreground">期待される影響と効果</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">短期的効果（1-3ヶ月）</label>
                                <textarea id="impact-short" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 参加者のスマートフォン操作スキル向上、デジタルサービス利用開始"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">中期的効果（3-12ヶ月）</label>
                                <textarea id="impact-medium" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: 地域コミュニティでのデジタル活用促進、高齢者の社会参加増加"></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">長期的効果（1年以上）</label>
                                <textarea id="impact-long" rows="2" class="w-full p-3 border border-input rounded-md resize-none" placeholder="例: デジタル格差の解消、持続可能な地域デジタル化モデルの確立"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Risk Assessment -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">リスク評価</h3>
                            <p class="text-sm text-muted-foreground">目標達成への阻害要因</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div id="risk-list" class="space-y-3">
                                <div class="p-3 border border-gray-200 rounded-md">
                                    <div class="flex items-center justify-between mb-2">
                                        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="リスク要因（例: 参加者の確保困難）">
                                        <select class="ml-2 p-2 border border-input rounded-md text-sm">
                                            <option value="high">高</option>
                                            <option value="medium">中</option>
                                            <option value="low">低</option>
                                        </select>
                                    </div>
                                    <textarea rows="2" class="w-full p-2 border border-input rounded-md text-sm resize-none" placeholder="対策・軽減策"></textarea>
                                </div>
                            </div>
                            <button type="button" onclick="addRisk()" class="text-sm text-blue-600 hover:text-blue-800">+ リスクを追加</button>
                        </div>
                    </div>
                    
                    <!-- Goal Summary -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">目標サマリー</h3>
                            <p class="text-sm text-muted-foreground">設定した目標の要約</p>
                        </div>
                        <div class="card-content">
                            <div id="goal-summary" class="text-sm text-muted-foreground p-4 bg-gray-50 rounded-md">
                                目標設定項目を入力すると、ここにサマリーが表示されます
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex justify-between items-center mt-8 pt-6 border-t">
                <button onclick="openIdeationWorkspace('planning')" class="px-4 py-2 border border-input rounded-md hover:bg-accent">
                    ← 企画構成に戻る
                </button>
                
                <div class="flex space-x-3">
                    <button onclick="generateGoalSummary()" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                        目標サマリー生成
                    </button>
                    <button onclick="saveGoalData(); markStepCompleted('goal-setting')" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        目標を保存して完了
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Goal setting helper functions
function addKPI() {
    const kpiList = document.getElementById('kpi-list');
    const newKPI = document.createElement('div');
    newKPI.className = 'flex items-center space-x-2';
    newKPI.innerHTML = `
        <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="指標名">
        <input type="text" class="w-24 p-2 border border-input rounded-md text-sm" placeholder="目標値">
        <select class="p-2 border border-input rounded-md text-sm">
            <option value="percent">%</option>
            <option value="number">人</option>
            <option value="score">点</option>
            <option value="days">日</option>
        </select>
        <button type="button" onclick="removeKPI(this)" class="text-red-500 hover:text-red-700">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    kpiList.appendChild(newKPI);
}

function removeKPI(button) {
    button.parentElement.remove();
}

function addRisk() {
    const riskList = document.getElementById('risk-list');
    const newRisk = document.createElement('div');
    newRisk.className = 'p-3 border border-gray-200 rounded-md';
    newRisk.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <input type="text" class="flex-1 p-2 border border-input rounded-md text-sm" placeholder="リスク要因">
            <select class="ml-2 p-2 border border-input rounded-md text-sm">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
            </select>
            <button type="button" onclick="removeRisk(this)" class="ml-2 text-red-500 hover:text-red-700">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <textarea rows="2" class="w-full p-2 border border-input rounded-md text-sm resize-none" placeholder="対策・軽減策"></textarea>
    `;
    riskList.appendChild(newRisk);
}

function removeRisk(button) {
    button.closest('.p-3').remove();
}

function generateGoalSummary() {
    const specific = document.getElementById('goal-specific').value;
    const measurable = document.getElementById('goal-measurable').value;
    const achievable = document.getElementById('goal-achievable').value;
    const relevant = document.getElementById('goal-relevant').value;
    const timebound = document.getElementById('goal-timebound').value;
    
    const summaryContainer = document.getElementById('goal-summary');
    
    if (!specific && !measurable && !achievable && !relevant && !timebound) {
        summaryContainer.innerHTML = '<p class="text-muted-foreground">目標設定項目を入力してください</p>';
        return;
    }
    
    let summary = '<div class="space-y-2">';
    
    if (specific) {
        summary += `<div><strong>目標:</strong> ${specific}</div>`;
    }
    
    if (measurable) {
        summary += `<div><strong>成功指標:</strong> ${measurable}</div>`;
    }
    
    if (timebound) {
        summary += `<div><strong>期限:</strong> ${timebound}</div>`;
    }
    
    if (relevant) {
        summary += `<div><strong>意義:</strong> ${relevant}</div>`;
    }
    
    if (achievable) {
        summary += `<div><strong>実現根拠:</strong> ${achievable}</div>`;
    }
    
    // Add KPIs
    const kpiInputs = document.querySelectorAll('#kpi-list .flex');
    if (kpiInputs.length > 0) {
        summary += '<div><strong>主要KPI:</strong><ul class="ml-4 mt-1">';
        kpiInputs.forEach(kpiRow => {
            const inputs = kpiRow.querySelectorAll('input, select');
            if (inputs[0].value && inputs[1].value) {
                summary += `<li>• ${inputs[0].value}: ${inputs[1].value}${inputs[2].value === 'percent' ? '%' : inputs[2].value === 'number' ? '人' : inputs[2].value === 'score' ? '点' : '日'}</li>`;
            }
        });
        summary += '</ul></div>';
    }
    
    summary += '</div>';
    summaryContainer.innerHTML = summary;
}

function saveGoalData() {
    const goalData = {
        smart: {
            specific: document.getElementById('goal-specific').value,
            measurable: document.getElementById('goal-measurable').value,
            achievable: document.getElementById('goal-achievable').value,
            relevant: document.getElementById('goal-relevant').value,
            timebound: document.getElementById('goal-timebound').value
        },
        kpis: [],
        impact: {
            short: document.getElementById('impact-short').value,
            medium: document.getElementById('impact-medium').value,
            long: document.getElementById('impact-long').value
        },
        risks: [],
        timestamp: new Date().toISOString()
    };
    
    // Collect KPIs
    const kpiInputs = document.querySelectorAll('#kpi-list .flex');
    kpiInputs.forEach(kpiRow => {
        const inputs = kpiRow.querySelectorAll('input, select');
        if (inputs[0].value && inputs[1].value) {
            goalData.kpis.push({
                name: inputs[0].value,
                target: inputs[1].value,
                unit: inputs[2].value
            });
        }
    });
    
    // Collect risks
    const riskInputs = document.querySelectorAll('#risk-list .p-3');
    riskInputs.forEach(riskRow => {
        const inputs = riskRow.querySelectorAll('input, select, textarea');
        if (inputs[0].value) {
            goalData.risks.push({
                factor: inputs[0].value,
                level: inputs[1].value,
                mitigation: inputs[2].value
            });
        }
    });
    
    localStorage.setItem('goalData', JSON.stringify(goalData));
    
    // Show save confirmation
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    message.textContent = '目標設定を保存しました';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Export functions to global scope
window.renderGoalSettingContent = renderGoalSettingContent;
window.addKPI = addKPI;
window.removeKPI = removeKPI;
window.addRisk = addRisk;
window.removeRisk = removeRisk;
window.generateGoalSummary = generateGoalSummary;
window.saveGoalData = saveGoalData;