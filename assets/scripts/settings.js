// ===============================
// LocalSuccess - Settings Module
// ===============================

function renderSettings(container) {
    container.innerHTML = `
        <div class="animate-fade-in">
            <div class="mb-8">
                <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
                <p class="text-muted-foreground">システム設定とユーザー設定</p>
            </div>
            
            <div class="space-y-6">
                <!-- User Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">ユーザー設定</h3>
                        <p class="text-sm text-muted-foreground">プロフィールと地域設定の管理</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="grid gap-4">
                            <button onclick="navigateToProfile()" 
                                    class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-3">
                                    <svg class="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <div class="text-left">
                                        <h4 class="font-medium">プロフィール設定</h4>
                                        <p class="text-sm text-gray-600">スキル、経験、志向の設定</p>
                                    </div>
                                </div>
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </button>
                            
                            <button onclick="navigateToRegion()" 
                                    class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center space-x-3">
                                    <svg class="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <div class="text-left">
                                        <h4 class="font-medium">地域設定</h4>
                                        <p class="text-sm text-gray-600">所属地域と地域情報の管理</p>
                                    </div>
                                </div>
                                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9,18 15,12 9,6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Privacy Settings -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">プライバシー設定</h3>
                        <p class="text-sm text-muted-foreground">投資家向けデモ時の個人情報保護</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="font-medium">匿名化表示</h4>
                                <p class="text-sm text-muted-foreground">人物名を「Aさん」「Bさん」で表示</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" ${appState.masking ? 'checked' : ''} class="sr-only peer" onchange="toggleMasking()">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        
                        <div class="p-3 rounded-lg bg-muted/50">
                            <p class="text-sm">
                                <strong>現在の表示:</strong> ${appState.masking ? '匿名化モード（個人情報は非表示）' : '通常表示（個人情報表示）'}
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Data Management -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">データ管理</h3>
                        <p class="text-sm text-muted-foreground">データの初期化とバックアップ</p>
                    </div>
                    <div class="card-content space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">
                            <button onclick="exportData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7,10 12,15 17,10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                データエクスポート
                            </button>
                            
                            <label class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 cursor-pointer">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="17,8 12,3 7,8"/>
                                    <line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                                データインポート
                                <input type="file" accept=".json" onchange="importData(event)" class="hidden">
                            </label>
                        </div>
                        
                        <div class="border-t border-border pt-4">
                            <button onclick="confirmResetData()" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 h-9 px-4 py-2">
                                <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="1,4 1,10 7,10"/>
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                                </svg>
                                データを初期化
                            </button>
                            <p class="text-xs text-muted-foreground mt-2">
                                ⚠️ この操作により、すべてのカスタムデータが削除され、初期状態に戻ります
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- System Info -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="font-semibold">システム情報</h3>
                    </div>
                    <div class="card-content space-y-3">
                        <div class="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">バージョン</h4>
                                <p class="text-sm">LocalSuccess v1.0.0</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">最終更新</h4>
                                <p class="text-sm">${new Date().toLocaleDateString('ja-JP')}</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">データ件数</h4>
                                <p class="text-sm">People: ${sampleData.people.length}件, Projects: ${sampleData.projects.length}件, Actions: ${sampleData.actions.length}件</p>
                            </div>
                            <div>
                                <h4 class="text-sm font-medium text-muted-foreground">ストレージ使用量</h4>
                                <p class="text-sm">${Math.round(JSON.stringify(sampleData).length / 1024)}KB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleMasking() {
    appState.masking = !appState.masking;
    saveData();
    renderCurrentRoute(); // Re-render current page with new masking setting
}

function exportData() {
    const dataToExport = {
        data: sampleData,
        state: appState,
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `localsuccess-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.data && importedData.state) {
                Object.assign(sampleData, importedData.data);
                Object.assign(appState, importedData.state);
                saveData();
                renderCurrentRoute();
                alert('データのインポートが完了しました。');
            } else {
                alert('無効なデータファイルです。');
            }
        } catch (error) {
            alert('ファイルの読み込みに失敗しました。');
        }
    };
    reader.readAsText(file);
}

function confirmResetData() {
    if (confirm('本当にすべてのデータを初期化しますか？この操作は取り消せません。')) {
        resetData();
    }
}

// Navigation functions (placeholders)
function navigateToProfile() {
    window.location.hash = '#/profile';
}

function navigateToRegion() {
    window.location.hash = '#/region';
}

function navigateToIssues() {
    window.location.hash = '#/issues';
}

// Expose to global scope
window.renderSettings = renderSettings;
window.toggleMasking = toggleMasking;
window.exportData = exportData;
window.importData = importData;
window.confirmResetData = confirmResetData;
window.navigateToProfile = navigateToProfile;
window.navigateToRegion = navigateToRegion;
window.navigateToIssues = navigateToIssues;