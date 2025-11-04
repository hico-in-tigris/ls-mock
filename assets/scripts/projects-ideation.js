// ===============================
// LocalSuccess - Projects Ideation Module
// ===============================

function renderIdeationContent() {
    return `
        <div class="p-6">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">アイデア整理ワークスペース</h2>
                    <p class="text-muted-foreground">アイデアから具体的な企画へ</p>
                </div>
                <button onclick="closeIdeationWorkspace()" class="text-muted-foreground hover:text-foreground">
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Left Side: Raw Ideas -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">想いの入力</h3>
                            <p class="text-sm text-muted-foreground">自由にアイデアや想いを書き出してください</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div class="flex flex-wrap gap-2 mb-4">
                                <button onclick="addIdeaTag('課題')" class="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
                                    [課題] 追加
                                </button>
                                <button onclick="addIdeaTag('解決策')" class="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
                                    [解決策] 追加
                                </button>
                                <button onclick="addIdeaTag('対象者')" class="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors">
                                    [対象者] 追加
                                </button>
                                <button onclick="addIdeaTag('効果')" class="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors">
                                    [効果] 追加
                                </button>
                            </div>
                            <textarea 
                                id="raw-ideas"
                                placeholder="例:
[課題] 地域の若者が地元を離れてしまう
[解決策] オンラインで地域と繋がれるプラットフォーム
[対象者] 18-25歳の地元出身者
[効果] 地域活性化と若者の帰郷促進"
                                class="w-full h-64 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            ></textarea>
                            <div class="flex gap-2">
                                <button onclick="extractKeywords()" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex-1">
                                    キーワード抽出
                                </button>
                                <button onclick="applyKeywordsToStructure()" class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 flex-1">
                                    構造化へ反映
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Extracted Keywords -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">抽出されたキーワード</h3>
                            <p class="text-sm text-muted-foreground">タグ別に整理された要素</p>
                        </div>
                        <div class="card-content">
                            <div id="extracted-keywords">
                                <p class="text-gray-500 text-center py-8">「キーワード抽出」ボタンを押してください</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Side: Structured Ideas -->
                <div class="space-y-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="text-lg font-semibold">構造化された想い</h3>
                            <p class="text-sm text-muted-foreground">整理された内容を確認・編集できます</p>
                        </div>
                        <div class="card-content space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-2">解決したい課題</label>
                                <textarea 
                                    id="structured-problem"
                                    placeholder="具体的な課題を記述してください"
                                    class="w-full h-20 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">提案する解決策</label>
                                <textarea 
                                    id="structured-solution"
                                    placeholder="課題に対する解決策を記述してください"
                                    class="w-full h-20 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">対象者・受益者</label>
                                <textarea 
                                    id="structured-target"
                                    placeholder="誰のための解決策か記述してください"
                                    class="w-full h-20 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium mb-2">期待される効果</label>
                                <textarea 
                                    id="structured-impact"
                                    placeholder="実現した時の効果・インパクトを記述してください"
                                    class="w-full h-20 p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="card">
                        <div class="card-content">
                            <div class="flex gap-3">
                                <button onclick="proceedToNextStage('planning')" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                                    企画構成へ進む →
                                </button>
                                <button onclick="saveIdeationData()" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    保存
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addIdeaTag(tag) {
    const textarea = document.getElementById('raw-ideas');
    if (textarea) {
        const currentText = textarea.value;
        const newText = currentText + (currentText ? '\n\n' : '') + `[${tag}] `;
        textarea.value = newText;
        textarea.focus();
        textarea.setSelectionRange(newText.length, newText.length);
    }
}

function extractKeywords() {
    const rawIdeas = document.getElementById('raw-ideas').value;
    if (!rawIdeas.trim()) {
        alert('まず、アイデアを入力してください。');
        return;
    }
    
    // Simple keyword extraction simulation
    const keywordsContainer = document.getElementById('extracted-keywords');
    const lines = rawIdeas.split('\n').filter(line => line.trim());
    
    const categories = {
        '課題': [],
        '解決策': [],
        '対象者': [],
        '効果': []
    };
    
    lines.forEach(line => {
        if (line.includes('[課題]')) {
            categories['課題'].push(line.replace('[課題]', '').trim());
        } else if (line.includes('[解決策]')) {
            categories['解決策'].push(line.replace('[解決策]', '').trim());
        } else if (line.includes('[対象者]')) {
            categories['対象者'].push(line.replace('[対象者]', '').trim());
        } else if (line.includes('[効果]')) {
            categories['効果'].push(line.replace('[効果]', '').trim());
        }
    });
    
    let html = '';
    Object.keys(categories).forEach(category => {
        if (categories[category].length > 0) {
            html += `
                <div class="mb-4">
                    <h5 class="font-medium text-sm text-gray-700 mb-2">${category}</h5>
                    <div class="flex flex-wrap gap-2">
                        ${categories[category].map(item => `
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${item}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    if (html) {
        keywordsContainer.innerHTML = html;
    } else {
        keywordsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">タグ付きテキストから要素を抽出します。[課題]、[解決策]、[対象者]、[効果]のタグを使用してください。</p>';
    }
}

function applyKeywordsToStructure() {
    const rawIdeas = document.getElementById('raw-ideas').value;
    const lines = rawIdeas.split('\n');
    
    const categories = {
        problem: [],
        solution: [],
        target: [],
        impact: []
    };
    
    lines.forEach(line => {
        if (line.includes('[課題]')) {
            categories.problem.push(line.replace('[課題]', '').trim());
        } else if (line.includes('[解決策]')) {
            categories.solution.push(line.replace('[解決策]', '').trim());
        } else if (line.includes('[対象者]')) {
            categories.target.push(line.replace('[対象者]', '').trim());
        } else if (line.includes('[効果]')) {
            categories.impact.push(line.replace('[効果]', '').trim());
        }
    });
    
    // Apply to structured fields
    const problemField = document.getElementById('structured-problem');
    const solutionField = document.getElementById('structured-solution');
    const targetField = document.getElementById('structured-target');
    const impactField = document.getElementById('structured-impact');
    
    if (problemField) problemField.value = categories.problem.join('\n');
    if (solutionField) solutionField.value = categories.solution.join('\n');
    if (targetField) targetField.value = categories.target.join('\n');
    if (impactField) impactField.value = categories.impact.join('\n');
    
    // Save to localStorage for use in planning phase
    const structuredData = {
        problem: categories.problem.join('\n'),
        solution: categories.solution.join('\n'),
        target: categories.target.join('\n'),
        impact: categories.impact.join('\n'),
        rawIdeas: rawIdeas,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ideationData', JSON.stringify(structuredData));
}

function saveIdeationData() {
    const rawIdeas = document.getElementById('raw-ideas')?.value || '';
    const problem = document.getElementById('structured-problem')?.value || '';
    const solution = document.getElementById('structured-solution')?.value || '';
    const target = document.getElementById('structured-target')?.value || '';
    const impact = document.getElementById('structured-impact')?.value || '';
    
    const ideationData = {
        rawIdeas,
        problem,
        solution,
        target,
        impact,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ideationData', JSON.stringify(ideationData));
    
    // Show save confirmation
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg z-50';
    message.textContent = 'アイデア整理を保存しました';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function proceedToNextStage(stage) {
    if (stage === 'planning') {
        // Save current data before proceeding
        saveIdeationData();
        markStepCompleted('ideation');
        openIdeationWorkspace('planning');
    } else if (stage === 'goal-setting') {
        saveIdeationData();
        markStepCompleted('ideation');
        openIdeationWorkspace('goal-setting');
    }
}

// Export functions to global scope
window.renderIdeationContent = renderIdeationContent;
window.addIdeaTag = addIdeaTag;
window.extractKeywords = extractKeywords;
window.applyKeywordsToStructure = applyKeywordsToStructure;
window.saveIdeationData = saveIdeationData;
window.proceedToNextStage = proceedToNextStage;