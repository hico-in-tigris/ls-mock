(function () {
    'use strict';

    function renderStepPreview(root, draft, onPrev, onCreate) {
        if (!root) return;

        const centerText = (draft && typeof draft.centerText === 'string') ? draft.centerText.trim() : '';
        const categories = Array.isArray(draft && draft.categories) ? draft.categories.slice(0, 8) : [];
        while (categories.length < 8) {
            categories.push('');
        }

        function normalizeItemsForPreview(rawItems, categories) {
            if (!categories.length) return [];
            if (Array.isArray(rawItems)) {
                return categories.map((category, index) => {
                    const list = Array.isArray(rawItems[index]) ? rawItems[index] : [];
                    return list
                        .slice(0, 8)
                        .map(value => String(value || '').trim())
                        .filter(Boolean);
                });
            }
            if (rawItems && typeof rawItems === 'object') {
                return categories.map((category) => {
                    const list = Array.isArray(rawItems[category]) ? rawItems[category] : [];
                    return list
                        .slice(0, 8)
                        .map(item => {
                            if (typeof item === 'string') return item.trim();
                            if (item && typeof item === 'object') {
                                return typeof item.text === 'string' ? item.text.trim() : '';
                            }
                            return '';
                        })
                        .filter(Boolean);
                });
            }
            return categories.map(() => []);
        }

        const normalizedItems = normalizeItemsForPreview(draft && draft.items, categories);

        root.innerHTML = `
            <div class="space-y-6 animate-fade-in">
                <div class="space-y-2">
                    <div class="text-sm uppercase tracking-wide text-muted-foreground">STEP 4</div>
                    <h2 class="text-2xl font-semibold">マンダラプレビュー</h2>
                    <p class="text-muted-foreground">入力内容を確認してから「作成」を押してください。プレビューは自動保存されます。</p>
                </div>
                <div class="space-y-4">
                    <div class="bg-card border border-border rounded-lg p-6" id="vision-preview-grid"></div>
                    <div class="bg-muted/40 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                        プレビューと同じ内容でマンダラを作成します。必要であれば戻って修正してください。
                    </div>
                </div>
                <div class="flex items-center justify-between gap-3 border-t border-border pt-4 flex-wrap">
                    <button type="button" data-action="prev" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6">戻る</button>
                    <div class="flex items-center gap-3">
                        <button type="button" data-action="create" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6">作成</button>
                    </div>
                </div>
            </div>
        `;

        const previewContainer = root.querySelector('#vision-preview-grid');
        let gridMatrix = null;
        if (window.visionPreview && typeof window.visionPreview.renderPreviewGrid === 'function') {
            const previewDraft = Object.assign({}, draft, { items: normalizedItems });
            gridMatrix = window.visionPreview.renderPreviewGrid(previewContainer, previewDraft);
        }

        if (window.visionDraftStore && typeof window.visionDraftStore.saveDraft === 'function') {
            window.visionDraftStore.saveDraft(draft);
        }

        const prevButton = root.querySelector('[data-action="prev"]');
        const createButton = root.querySelector('[data-action="create"]');

        if (prevButton && typeof onPrev === 'function') {
            prevButton.addEventListener('click', () => {
                onPrev();
            });
        }

        if (createButton) {
            createButton.addEventListener('click', () => {
                if (typeof onCreate === 'function') {
                    const payload = {
                        centerText,
                        categories,
                        items: normalizedItems,
                        grid: gridMatrix
                    };
                    onCreate(payload);
                }
            });
        }
    }

    window.visionSteps = Object.assign({}, window.visionSteps, {
        renderStepPreview
    });
})();
