(function () {
    'use strict';

    const MAX_ITEMS = 8;
    const MIN_ITEMS_FOR_NEXT = 3;

    function renderStepItems(root, draft, onPrev, onNext) {
        if (!root) return;

        const categories = Array.isArray(draft && draft.categories)
            ? draft.categories.slice(0, 8)
            : [];
        while (categories.length < 8) {
            categories.push('');
        }

        const items = Array.isArray(draft && draft.items)
            ? draft.items.map(list => Array.isArray(list) ? list.slice(0, MAX_ITEMS) : [])
            : [];
        while (items.length < 8) {
            items.push([]);
        }

        function serializeItems(index) {
            const list = items[index] || [];
            if (!list.length) {
                return `<p class="text-sm text-muted-foreground">まだ項目がありません。追加してください。</p>`;
            }
            return list.map((value, itemIndex) => `
                <div class="flex items-center gap-2" data-item-row>
                    <div class="flex-1">
                        <input data-item-input data-category-index="${index}" data-item-index="${itemIndex}" type="text" value="${(value || '').replace(/"/g, '&quot;')}" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                    <button type="button" data-action="remove-item" data-category-index="${index}" data-item-index="${itemIndex}" class="inline-flex items-center justify-center rounded-md border border-input bg-background text-sm px-2 py-1 text-muted-foreground hover:text-destructive hover:border-destructive">削除</button>
                </div>
            `).join('');
        }

        root.innerHTML = `
            <div class="space-y-6 animate-fade-in">
                <div class="space-y-2">
                    <div class="text-sm uppercase tracking-wide text-muted-foreground">STEP 3</div>
                    <h2 class="text-2xl font-semibold">カテゴリごとのアイテムを発想</h2>
                    <p class="text-muted-foreground">各カテゴリにつき最低3件のアイデアを入力してください。最大8件まで追加できます。</p>
                </div>
                <div class="grid gap-4 md:grid-cols-2">
                    ${categories.map((category, index) => `
                        <div class="bg-card border border-border rounded-lg p-4 space-y-3" data-category-card data-category="${index}">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs uppercase tracking-wide text-muted-foreground">カテゴリ ${index + 1}</p>
                                    <h3 class="text-lg font-semibold text-foreground">${category}</h3>
                                </div>
                                <span class="text-sm text-muted-foreground"><span data-role="count">${items[index].filter(item => item && item.trim()).length}</span> / ${MAX_ITEMS}</span>
                            </div>
                            <div class="space-y-2" data-role="items" data-category-index="${index}">
                                ${serializeItems(index)}
                            </div>
                            <button type="button" data-action="add-item" data-category-index="${index}" class="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium px-3 py-2 w-full disabled:opacity-50 disabled:pointer-events-none">項目を追加</button>
                        </div>
                    `).join('')}
                </div>
                <p data-role="error" class="text-sm text-destructive hidden">すべてのカテゴリで3件以上のアイテムを入力してください。</p>
                <div class="flex items-center justify-between gap-3 border-t border-border pt-4 flex-wrap">
                    <button type="button" data-action="prev" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6">戻る</button>
                    <button type="button" data-action="next" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 disabled:opacity-50 disabled:pointer-events-none">プレビューへ</button>
                </div>
            </div>
        `;

        const errorMessage = root.querySelector('[data-role="error"]');
        const prevButton = root.querySelector('[data-action="prev"]');
        const nextButton = root.querySelector('[data-action="next"]');

        function getTrimmedCounts() {
            return items.map(list => list.filter(item => typeof item === 'string' && item.trim().length > 0));
        }

        function validate() {
            const trimmed = getTrimmedCounts();
            return trimmed.every(list => list.length >= MIN_ITEMS_FOR_NEXT);
        }

        function persist() {
            if (draft && typeof draft === 'object') {
                draft.items = items.map(list => list.slice(0, MAX_ITEMS));
            }
            if (window.visionDraftStore && typeof window.visionDraftStore.saveDraft === 'function') {
                window.visionDraftStore.saveDraft(draft);
            }
        }

        function updateState() {
            const trimmed = getTrimmedCounts();
            root.querySelectorAll('[data-category-card]').forEach(card => {
                const index = parseInt(card.getAttribute('data-category'), 10);
                const countElement = card.querySelector('[data-role="count"]');
                if (countElement) {
                    countElement.textContent = trimmed[index].length;
                }
                const addButton = card.querySelector('[data-action="add-item"]');
                if (addButton) {
                    addButton.disabled = trimmed[index].length >= MAX_ITEMS;
                }
            });

            const valid = validate();
            nextButton.disabled = !valid;
            errorMessage.classList.toggle('hidden', valid);
        }

        root.addEventListener('input', (event) => {
            const target = event.target;
            if (!target.matches('[data-item-input]')) return;
            const categoryIndex = Number(target.getAttribute('data-category-index'));
            const itemIndex = Number(target.getAttribute('data-item-index'));
            if (!Number.isNaN(categoryIndex) && !Number.isNaN(itemIndex)) {
                items[categoryIndex][itemIndex] = target.value;
                persist();
                updateState();
            }
        });

        root.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('[data-action="add-item"]')) {
                const categoryIndex = Number(target.getAttribute('data-category-index'));
                if (!Number.isNaN(categoryIndex)) {
                    if (items[categoryIndex].length < MAX_ITEMS) {
                        items[categoryIndex].push('');
                        const container = root.querySelector(`[data-role="items"][data-category-index="${categoryIndex}"]`);
                        if (container) {
                            container.innerHTML = serializeItems(categoryIndex);
                        }
                        persist();
                        updateState();
                    }
                }
            } else if (target.matches('[data-action="remove-item"]')) {
                const categoryIndex = Number(target.getAttribute('data-category-index'));
                const itemIndex = Number(target.getAttribute('data-item-index'));
                if (!Number.isNaN(categoryIndex) && !Number.isNaN(itemIndex)) {
                    items[categoryIndex].splice(itemIndex, 1);
                    const container = root.querySelector(`[data-role="items"][data-category-index="${categoryIndex}"]`);
                    if (container) {
                        container.innerHTML = serializeItems(categoryIndex);
                    }
                    persist();
                    updateState();
                }
            }
        });

        if (prevButton && typeof onPrev === 'function') {
            prevButton.addEventListener('click', () => {
                persist();
                onPrev();
            });
        }

        nextButton.addEventListener('click', () => {
            const valid = validate();
            if (!valid) {
                updateState();
                return;
            }
            persist();
            if (typeof onNext === 'function') {
                onNext({ items: items.map(list => list.map(value => value.trim()).filter(Boolean)) });
            }
        });

        updateState();
    }

    window.visionSteps = Object.assign({}, window.visionSteps, {
        renderStepItems
    });
})();
