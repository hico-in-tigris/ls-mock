// ===============================
// LocalSuccess - Diff Module
// ===============================

function renderDiff(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Diff</h1>
                <p class="text-muted-foreground">プロジェクトとプランの変更履歴を比較</p>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="font-semibold">プランバージョン比較</h3>
                </div>
                <div class="card-content">
                    <div class="grid gap-6 md:grid-cols-2">
                        <!-- Version 1.0 -->
                        <div class="border rounded-lg p-4">
                            <h4 class="font-semibold text-red-600 mb-3">Version 1.0 (変更前)</h4>
                            <div class="space-y-3">
                                <div>
                                    <h5 class="text-sm font-medium">プロジェクト</h5>
                                    <p class="text-sm">${sampleData.planVersions.v1.projects[0].title}</p>
                                </div>
                                <div>
                                    <h5 class="text-sm font-medium">アプローチ</h5>
                                    <p class="text-sm">${sampleData.planVersions.v1.projects[0].approach}</p>
                                </div>
                                <div>
                                    <h5 class="text-sm font-medium">KPI</h5>
                                    <div class="text-sm space-y-1">
                                        ${Object.entries(sampleData.planVersions.v1.kpiSnapshot).map(([key, value]) => 
                                            `<p>${key}: ${value}</p>`
                                        ).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Version 2.0 -->
                        <div class="border rounded-lg p-4 border-green-200 bg-green-50">
                            <h4 class="font-semibold text-green-600 mb-3">Version 2.0 (変更後)</h4>
                            <div class="space-y-3">
                                <div>
                                    <h5 class="text-sm font-medium">プロジェクト</h5>
                                    <p class="text-sm">${sampleData.planVersions.v2.projects[0].title}</p>
                                </div>
                                <div>
                                    <h5 class="text-sm font-medium">アプローチ</h5>
                                    <p class="text-sm">${sampleData.planVersions.v2.projects[0].approach}</p>
                                </div>
                                <div>
                                    <h5 class="text-sm font-medium">KPI</h5>
                                    <div class="text-sm space-y-1">
                                        ${Object.entries(sampleData.planVersions.v2.kpiSnapshot).map(([key, value]) => 
                                            `<p class="text-green-700">${key}: ${value}</p>`
                                        ).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">変更理由</h4>
                        <p class="text-sm text-blue-700">${sampleData.planVersions.v2.changeReason}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Expose to global scope
window.renderDiff = renderDiff;