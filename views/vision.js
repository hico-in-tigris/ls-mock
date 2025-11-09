(function () {
    'use strict';

    function renderVision(container) {
        if (!container) return;

        container.innerHTML = `
            <div class="container px-4 py-6">
                <div class="max-w-5xl mx-auto space-y-6">
                    <div class="space-y-2">
                        <h1 class="text-3xl font-bold tracking-tight">Vision</h1>
                        <p class="text-muted-foreground">9×9で10年→四半期→週次の整合をつくるマンダラ（将来拡張予定）</p>
                    </div>
                    <div class="border border-dashed border-border rounded-lg bg-muted/40">
                        <div class="px-6 py-12 text-center space-y-4">
                            <svg class="w-12 h-12 mx-auto text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"/>
                                <rect x="14" y="3" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/>
                                <rect x="3" y="14" width="7" height="7"/>
                            </svg>
                            <div class="space-y-2">
                                <h2 class="text-xl font-semibold">マンダラビジョンを準備中です</h2>
                                <p class="text-sm text-muted-foreground">10年ビジョンから週次アクションまでを整合させるマンダラ構造の設計は現在検討中です。正式リリースまでお待ちください。</p>
                            </div>
                            <button type="button" onclick="console.info('Vision CTA clicked');" class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                                連絡を受け取る
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.renderVision = renderVision;
})();
