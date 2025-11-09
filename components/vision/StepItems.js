(function () {
    'use strict';

    const MAX_ITEMS = 8;

    function createPlaceholderItem() {
        return { text: '', source: 'user', isPlaceholder: true };
    }

    function cloneItem(item) {
        return {
            text: item.text,
            source: item.source === 'user' ? 'user' : 'ai'
        };
    }

    function sanitizeItemsForCategory(rawItems) {
        if (Array.isArray(rawItems)) {
            return rawItems
                .slice(0, MAX_ITEMS)
                .map((entry) => {
                    if (!entry) return null;
                    if (typeof entry === 'string') {
                        const text = entry.trim();
                        if (!text) return null;
                        return { text, source: 'user' };
                    }
                    if (typeof entry !== 'object') return null;
                    const text = typeof entry.text === 'string' ? entry.text.trim() : '';
                    if (!text) return null;
                    const source = entry.source === 'user' ? 'user' : 'ai';
                    return { text, source };
                })
                .filter(Boolean);
        }
        return [];
    }

    function extractTextItems(itemsMap, categories) {
        const result = {};
        categories.forEach((category) => {
            const list = Array.isArray(itemsMap[category]) ? itemsMap[category] : [];
            result[category] = list
                .filter(item => item && !item.isPlaceholder && typeof item.text === 'string')
                .map(item => ({
                    text: item.text.trim(),
                    source: item.source === 'user' ? 'user' : 'ai'
                }))
                .filter(item => item.text);
        });
        return result;
    }

    function renderStepItems(root, draft, onPrev, onNext, options) {
        if (!root) return;

        const safeDraft = draft && typeof draft === 'object' ? draft : {};
        const categories = Array.isArray(safeDraft.categories)
            ? safeDraft.categories.slice(0, 8)
            : [];

        while (categories.length < 8) {
            categories.push('');
        }

        const baseItems = safeDraft.items && typeof safeDraft.items === 'object' && !Array.isArray(safeDraft.items)
            ? safeDraft.items
            : Array.isArray(safeDraft.items)
                ? categories.reduce((acc, category, index) => {
                    acc[category] = sanitizeItemsForCategory(safeDraft.items[index]);
                    return acc;
                }, {})
                : {};

        const itemsMap = {};
        const aiSnapshots = {};

        categories.forEach((category) => {
            const sanitized = sanitizeItemsForCategory(baseItems[category]);
            itemsMap[category] = sanitized.map(item => Object.assign({}, item));
            aiSnapshots[category] = sanitized.filter(item => item.source !== 'user').map(cloneItem);
            ensurePlaceholder(category);
        });

        let activeCategoryIndex = 0;
        let isLoading = false;

        const triggerSuggestion = options && options.triggerSuggestion;

        root.innerHTML = `
            <div class="space-y-6 animate-fade-in" data-step-items-root>
                <div class="space-y-2">
                    <div class="text-sm uppercase tracking-wide text-muted-foreground">STEP 3</div>
                    <h2 class="text-2xl font-semibold">AI提案をもとにカテゴリを磨く</h2>
                    <p class="text-muted-foreground">カテゴリごとにAIが最大8件のアイテムを提案します。気になる案を編集・削除・再生成して調整してください。</p>
                </div>
                <div class="grid gap-4 lg:grid-cols-[220px_1fr]">
                    <div class="bg-card border border-border rounded-lg p-3 space-y-2" data-role="category-tabs"></div>
                    <div class="bg-card border border-border rounded-lg p-5 space-y-4" data-role="editor-panel">
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p class="text-xs uppercase tracking-wide text-muted-foreground">選択中のカテゴリ</p>
                                <h3 class="text-xl font-semibold text-foreground" data-role="active-category-title"></h3>
                            </div>
                            <div class="flex flex-wrap gap-2" data-role="panel-actions">
                                <button type="button" data-action="regenerate-category" class="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-medium h-9 px-3 disabled:opacity-50 disabled:pointer-events-none">カテゴリ再生成</button>
                                <button type="button" data-action="restore-category" class="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-medium h-9 px-3 disabled:opacity-50 disabled:pointer-events-none">元に戻す</button>
                                <button type="button" data-action="clear-category" class="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs font-medium h-9 px-3 disabled:opacity-50 disabled:pointer-events-none">すべてクリア</button>
                            </div>
                        </div>
                        <div data-role="suggest-status"></div>
                        <div class="space-y-2" data-role="item-list"></div>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-3 border-t border-border pt-4 flex-wrap">
                    <button type="button" data-action="prev" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6">戻る</button>
                    <button type="button" data-action="next" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 disabled:opacity-50 disabled:pointer-events-none">プレビューへ</button>
                </div>
            </div>
            <div data-role="toast-root" class="fixed top-6 right-6 z-50 space-y-2 pointer-events-none"></div>
        `;

        const categoryTabs = root.querySelector('[data-role="category-tabs"]');
        const itemList = root.querySelector('[data-role="item-list"]');
        const activeTitle = root.querySelector('[data-role="active-category-title"]');
        const statusElement = root.querySelector('[data-role="suggest-status"]');
        const toastRoot = root.querySelector('[data-role="toast-root"]');
        const prevButton = root.querySelector('[data-action="prev"]');
        const nextButton = root.querySelector('[data-action="next"]');
        const regenerateCategoryButton = root.querySelector('[data-action="regenerate-category"]');
        const restoreCategoryButton = root.querySelector('[data-action="restore-category"]');
        const clearCategoryButton = root.querySelector('[data-action="clear-category"]');
        const store = window.visionDraftStore || {};

        function getActiveCategory() {
            return categories[activeCategoryIndex] || '';
        }

        function hasItems(category) {
            const list = itemsMap[category] || [];
            return list.some(item => item && !item.isPlaceholder && item.text && item.text.trim());
        }

        function ensurePlaceholder(category) {
            const list = itemsMap[category] || (itemsMap[category] = []);
            while (list.length && list[list.length - 1] && list[list.length - 1].isPlaceholder && list[list.length - 1].text && list[list.length - 1].text.trim()) {
                list.pop();
            }
            const last = list[list.length - 1];
            if (!last || (last && !last.isPlaceholder && last.text && last.text.trim())) {
                if (list.length < MAX_ITEMS) {
                    list.push(createPlaceholderItem());
                }
            } else if (!last) {
                list.push(createPlaceholderItem());
            }
        }

        function getNormalizedItems() {
            return extractTextItems(itemsMap, categories);
        }

        function persist() {
            if (!safeDraft || typeof safeDraft !== 'object') return;
            const normalized = getNormalizedItems();
            safeDraft.items = normalized;
            if (store && typeof store.saveDraft === 'function') {
                const saved = store.saveDraft(safeDraft);
                if (saved && typeof saved === 'object') {
                    Object.assign(safeDraft, saved);
                }
            }
        }

        function showToast(message) {
            if (!toastRoot) return;
            const item = document.createElement('div');
            item.className = 'pointer-events-auto rounded-md bg-destructive text-destructive-foreground shadow px-4 py-2 text-sm opacity-0 transition duration-300';
            item.textContent = message;
            toastRoot.appendChild(item);
            requestAnimationFrame(() => {
                item.classList.add('opacity-100');
            });
            setTimeout(() => {
                item.classList.remove('opacity-100');
                item.classList.add('opacity-0');
            }, 2800);
            setTimeout(() => {
                if (item.parentNode === toastRoot) {
                    toastRoot.removeChild(item);
                }
            }, 3200);
        }

        function renderCategoryTabs() {
            if (!categoryTabs) return;
            const normalized = getNormalizedItems();
            categoryTabs.innerHTML = categories.map((category, index) => {
                const isActive = index === activeCategoryIndex;
                const list = normalized[category] || [];
                const count = list.length;
                return `
                    <button type="button" data-role="category-tab" data-index="${index}" class="w-full text-left px-3 py-2 rounded-md border transition-colors ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'}">
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-sm font-medium truncate">${category}</span>
                            <span class="text-xs text-muted-foreground">${count} / ${MAX_ITEMS}</span>
                        </div>
                    </button>
                `;
            }).join('');
        }

        function renderStatus() {
            if (!statusElement) return;
            if (isLoading) {
                statusElement.innerHTML = `
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>AI案を生成中です…</span>
                    </div>
                `;
                return;
            }
            const category = getActiveCategory();
            const list = (itemsMap[category] || []).filter(item => item && !item.isPlaceholder && item.text && item.text.trim());
            if (!list.length) {
                statusElement.innerHTML = '<p class="text-sm text-muted-foreground">AI案が空です。カテゴリ再生成をお試しください。</p>';
                return;
            }
            const aiCount = list.filter(item => item.source !== 'user').length;
            const userCount = list.length - aiCount;
            statusElement.innerHTML = `
                <div class="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>✨AI案 ${aiCount}件</span>
                    <span>✏️修正 ${userCount}件</span>
                </div>
            `;
        }

        function renderItems() {
            if (!itemList || !activeTitle) return;
            const category = getActiveCategory();
            const list = itemsMap[category] || [];
            activeTitle.textContent = category;
            ensurePlaceholder(category);
            itemList.innerHTML = list.map((item, index) => {
                const value = typeof item.text === 'string' ? item.text : '';
                const badge = !value.trim()
                    ? ''
                    : `<span class="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">${item.source === 'user' ? '✏️修正' : '✨AI案'}</span>`;
                const disabledAttr = isLoading ? 'disabled' : '';
                return `
                    <div class="flex items-start gap-2 rounded-md border border-border bg-background px-3 py-2" data-item-row data-index="${index}">
                        <div class="flex-1 space-y-2">
                            <input ${item.isPlaceholder ? '' : ''} ${disabledAttr} data-item-input data-index="${index}" type="text" value="${value.replace(/"/g, '&quot;')}" class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" />
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            ${badge}
                            <div class="flex items-center gap-1">
                                <button type="button" data-action="regen-item" data-index="${index}" class="inline-flex items-center justify-center rounded-md border border-input bg-background text-xs px-2 py-1 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none" ${disabledAttr}>↺</button>
                                <button type="button" data-action="remove-item" data-index="${index}" class="inline-flex items-center justify-center rounded-md border border-input bg-background text-xs px-2 py-1 hover:text-destructive hover:border-destructive disabled:opacity-50 disabled:pointer-events-none" ${disabledAttr}>×</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            renderStatus();
        }

        function setLoading(value) {
            isLoading = !!value;
            renderStatus();
            updateActionStates();
        }

        function updateActionStates() {
            const disable = isLoading;
            if (prevButton) prevButton.disabled = disable;
            if (nextButton) nextButton.disabled = disable;
            if (regenerateCategoryButton) regenerateCategoryButton.disabled = disable;
            if (restoreCategoryButton) restoreCategoryButton.disabled = disable || !(aiSnapshots[getActiveCategory()] && aiSnapshots[getActiveCategory()].length);
            if (clearCategoryButton) clearCategoryButton.disabled = disable;
            if (itemList) {
                itemList.querySelectorAll('button').forEach(button => {
                    button.disabled = disable;
                });
                itemList.querySelectorAll('input').forEach(input => {
                    input.disabled = disable && !input.value;
                });
            }
        }

        function setActiveCategory(index) {
            if (index < 0 || index >= categories.length) return;
            activeCategoryIndex = index;
            renderCategoryTabs();
            renderItems();
            updateActionStates();
        }

        function addPlaceholderIfNeeded(category) {
            const list = itemsMap[category] || [];
            ensurePlaceholder(category);
            if (list.length > MAX_ITEMS) {
                list.length = MAX_ITEMS;
            }
        }

        function regenerateAllCategories() {
            const suggest = window.mandalaSuggest || {};
            const centerText = typeof safeDraft.centerText === 'string' ? safeDraft.centerText : '';
            if (!suggest || typeof suggest.suggestAllCategories !== 'function') {
                showToast('AI提案機能が利用できません。');
                return;
            }
            setLoading(true);
            suggest.suggestAllCategories(centerText, categories)
                .then((result) => {
                    categories.forEach((category) => {
                        const nextItems = sanitizeItemsForCategory(result[category]);
                        itemsMap[category] = nextItems.map(item => Object.assign({}, item));
                        aiSnapshots[category] = nextItems.map(cloneItem);
                        ensurePlaceholder(category);
                    });
                    persist();
                    setActiveCategory(0);
                })
                .catch((error) => {
                    console.warn('[VisionStepItems] Failed to suggest all categories:', error);
                    showToast('AI提案に失敗しました。ローカル案を表示します。');
                    categories.forEach((category) => {
                        const fallbackList = (suggest && typeof suggest.suggestItemsLocal === 'function')
                            ? sanitizeItemsForCategory(suggest.suggestItemsLocal(centerText, category))
                            : [];
                        itemsMap[category] = fallbackList.map(item => Object.assign({}, item));
                        aiSnapshots[category] = fallbackList.map(cloneItem);
                        ensurePlaceholder(category);
                    });
                    persist();
                    renderCategoryTabs();
                    renderItems();
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        function regenerateCategory(category) {
            const suggest = window.mandalaSuggest || {};
            const centerText = typeof safeDraft.centerText === 'string' ? safeDraft.centerText : '';
            if (!suggest || typeof suggest.suggestItemsWithAI !== 'function') {
                showToast('AI提案機能が利用できません。');
                return;
            }
            setLoading(true);
            suggest.suggestItemsWithAI(centerText, category)
                .then((list) => {
                    const normalized = sanitizeItemsForCategory(list);
                    itemsMap[category] = normalized.map(item => Object.assign({}, item));
                    aiSnapshots[category] = normalized.map(cloneItem);
                    ensurePlaceholder(category);
                    persist();
                    if (category === getActiveCategory()) {
                        renderItems();
                        updateActionStates();
                        renderCategoryTabs();
                    }
                })
                .catch((error) => {
                    console.warn('[VisionStepItems] Failed to regenerate category:', error);
                    if (suggest && typeof suggest.suggestItemsLocal === 'function') {
                        const fallbackList = sanitizeItemsForCategory(suggest.suggestItemsLocal(centerText, category));
                        itemsMap[category] = fallbackList.map(item => Object.assign({}, item));
                        aiSnapshots[category] = fallbackList.map(cloneItem);
                        ensurePlaceholder(category);
                        persist();
                        if (category === getActiveCategory()) {
                            renderItems();
                            updateActionStates();
                            renderCategoryTabs();
                        }
                        showToast('AI再生成に失敗したためローカル案を適用しました。');
                    } else {
                        showToast('カテゴリの再生成に失敗しました。');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        function regenerateItem(category, index) {
            const suggest = window.mandalaSuggest || {};
            const centerText = typeof safeDraft.centerText === 'string' ? safeDraft.centerText : '';
            if (!suggest || typeof suggest.suggestItemsWithAI !== 'function') {
                showToast('AI提案機能が利用できません。');
                return;
            }
            const currentList = itemsMap[category] || [];
            if (!currentList[index] || currentList[index].isPlaceholder) {
                return;
            }
            setLoading(true);
            suggest.suggestItemsWithAI(centerText, category)
                .then((list) => {
                    const normalized = sanitizeItemsForCategory(list);
                    if (!normalized.length) {
                        throw new Error('No suggestions received');
                    }
                    const replacement = normalized[index % normalized.length] || normalized[0];
                    currentList[index] = Object.assign({}, replacement);
                    if (!aiSnapshots[category]) {
                        aiSnapshots[category] = [];
                    }
                    aiSnapshots[category][index] = cloneItem(replacement);
                    addPlaceholderIfNeeded(category);
                    persist();
                    if (category === getActiveCategory()) {
                        renderItems();
                        updateActionStates();
                        renderCategoryTabs();
                    }
                })
                .catch((error) => {
                    console.warn('[VisionStepItems] Failed to regenerate item:', error);
                    if (suggest && typeof suggest.suggestItemsLocal === 'function') {
                        const fallbackList = sanitizeItemsForCategory(suggest.suggestItemsLocal(centerText, category));
                        if (fallbackList.length) {
                            const replacement = fallbackList[index % fallbackList.length] || fallbackList[0];
                            currentList[index] = Object.assign({}, replacement);
                            if (!aiSnapshots[category]) {
                                aiSnapshots[category] = [];
                            }
                            aiSnapshots[category][index] = cloneItem(replacement);
                            addPlaceholderIfNeeded(category);
                            persist();
                            if (category === getActiveCategory()) {
                                renderItems();
                                updateActionStates();
                                renderCategoryTabs();
                            }
                            showToast('AI再生成に失敗したためローカル案を適用しました。');
                        } else {
                            showToast('アイテムの再生成に失敗しました。');
                        }
                    } else {
                        showToast('アイテムの再生成に失敗しました。');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        function clearCategory(category) {
            itemsMap[category] = [];
            ensurePlaceholder(category);
            persist();
            renderCategoryTabs();
            renderItems();
            updateActionStates();
        }

        function restoreCategory(category) {
            const snapshot = aiSnapshots[category];
            if (!snapshot || !snapshot.length) {
                showToast('復元できるAI案がありません。');
                return;
            }
            itemsMap[category] = snapshot.map(cloneItem);
            ensurePlaceholder(category);
            persist();
            renderCategoryTabs();
            renderItems();
            updateActionStates();
        }

        categoryTabs.addEventListener('click', (event) => {
            const target = event.target.closest('[data-role="category-tab"]');
            if (!target) return;
            const index = Number(target.getAttribute('data-index'));
            if (Number.isNaN(index)) return;
            setActiveCategory(index);
        });

        itemList.addEventListener('input', (event) => {
            const target = event.target;
            if (!target.matches('[data-item-input]')) return;
            const index = Number(target.getAttribute('data-index'));
            if (Number.isNaN(index)) return;
            const category = getActiveCategory();
            const list = itemsMap[category] || [];
            const item = list[index];
            if (!item) return;
            const value = target.value || '';
            item.text = value;
            item.source = 'user';
            if (value.trim()) {
                item.isPlaceholder = false;
            } else {
                item.isPlaceholder = true;
            }
            ensurePlaceholder(category);
            persist();
            renderCategoryTabs();
            renderStatus();
        });

        itemList.addEventListener('click', (event) => {
            const actionButton = event.target.closest('button[data-action]');
            if (!actionButton) return;
            const index = Number(actionButton.getAttribute('data-index'));
            const category = getActiveCategory();
            if (actionButton.dataset.action === 'remove-item') {
                if (!Number.isNaN(index)) {
                    const list = itemsMap[category] || [];
                    if (list[index]) {
                        list.splice(index, 1);
                        ensurePlaceholder(category);
                        persist();
                        renderItems();
                        renderCategoryTabs();
                        updateActionStates();
                    }
                }
            } else if (actionButton.dataset.action === 'regen-item') {
                if (!Number.isNaN(index)) {
                    regenerateItem(category, index);
                }
            }
        });

        if (regenerateCategoryButton) {
            regenerateCategoryButton.addEventListener('click', () => {
                regenerateCategory(getActiveCategory());
            });
        }

        if (restoreCategoryButton) {
            restoreCategoryButton.addEventListener('click', () => {
                restoreCategory(getActiveCategory());
            });
        }

        if (clearCategoryButton) {
            clearCategoryButton.addEventListener('click', () => {
                clearCategory(getActiveCategory());
            });
        }

        if (prevButton && typeof onPrev === 'function') {
            prevButton.addEventListener('click', () => {
                persist();
                onPrev();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                persist();
                if (typeof onNext === 'function') {
                    onNext({ items: getNormalizedItems() });
                }
            });
        }

        renderCategoryTabs();
        renderItems();
        updateActionStates();

        if (triggerSuggestion || !categories.some(category => hasItems(category))) {
            regenerateAllCategories();
        }
    }

    window.visionSteps = Object.assign({}, window.visionSteps, {
        renderStepItems
    });
})();
