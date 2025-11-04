// ===============================
// LocalSuccess - Summary Module
// ===============================

function renderSummary(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Summary</h1>
                <p class="text-muted-foreground">活動の振り返りと次期計画への反映</p>
            </div>
            
            <div class="space-y-6">
                <!-- Summary Input -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">今期の振り返り</h3>
                    </div>
                    <div class="card-content space-y-4">
                        <div>
                            <label class="text-sm font-medium">よかったこと</label>
                            <textarea class="w-full mt-1 p-2 border rounded-md" rows="3" 
                                      placeholder="今期うまくいったことを記録してください..."
                                      value="${sampleData.summary.current.good}"></textarea>
                        </div>
                        <div>
                            <label class="text-sm font-medium">もっとできること</label>
                            <textarea class="w-full mt-1 p-2 border rounded-md" rows="3"
                                      placeholder="改善できる点や課題を記録してください..."
                                      value="${sampleData.summary.current.more}"></textarea>
                        </div>
                        <div>
                            <label class="text-sm font-medium">次にやること</label>
                            <textarea class="w-full mt-1 p-2 border rounded-md" rows="3"
                                      placeholder="次期に向けた具体的なアクションを記録してください..."
                                      value="${sampleData.summary.current.next}"></textarea>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="saveSummary()" class="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                                保存
                            </button>
                            <button onclick="promoteSelectedToNext()" class="border border-gray-300 px-4 py-2 rounded-md">
                                次期プランに反映
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Project Status -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">プロジェクト状況</h3>
                    </div>
                    <div class="card-content">
                        <div class="space-y-3">
                            ${sampleData.projects.map(project => `
                                <div class="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 class="font-medium">${project.title}</h4>
                                        <p class="text-sm text-muted-foreground">${project.kpi}</p>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <span class="badge status-${project.status.toLowerCase()}">${project.status}</span>
                                        ${project.status === 'Try' ? `
                                            <input type="checkbox" class="rounded border-border">
                                            <label class="text-sm">次期に昇格</label>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function saveSummary() {
    // In a real implementation, this would save the textarea values
    alert('サマリーが保存されました');
}

function promoteSelectedToNext() {
    alert('選択されたプロジェクトが次期プランに反映されました');
}

// Expose to global scope
window.renderSummary = renderSummary;
window.saveSummary = saveSummary;
window.promoteSelectedToNext = promoteSelectedToNext;