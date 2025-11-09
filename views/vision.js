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
(function () {
    'use strict';

    const MODULE_SCRIPTS = [
        'state/visionDraftStore.js',
        'components/vision/PreviewGrid.js',
        'components/vision/StepCenter.js',
        'components/vision/StepCategories.js',
        'components/vision/StepItems.js',
        'components/vision/StepPreview.js'
    ];
    const MANDALA_STORAGE_KEY = 'vision:mandalas';
    const MIN_ITEMS_PER_CATEGORY = 3;

    let modulesPromise = null;
    let compatibilityHandlerRegistered = false;

    window.__visionRequestedId = window.__visionRequestedId || null;
    window.__visionActiveMandalaId = window.__visionActiveMandalaId || null;
    window.__visionFromDeepLink = window.__visionFromDeepLink || false;

    function ensureHashCompatibility() {
        if (compatibilityHandlerRegistered) return;
        compatibilityHandlerRegistered = true;

        function normalizeHash() {
            const hash = window.location.hash || '';
            const match = hash.match(/^#\/vision\/(.+)$/);
            if (match) {
                const decoded = decodeURIComponent(match[1]);
                window.__visionRequestedId = decoded;
                window.__visionFromDeepLink = true;
                if (history.replaceState) {
                    history.replaceState(null, '', '#/vision');
                } else {
                    window.removeEventListener('hashchange', normalizeHash);
                    window.location.hash = '#/vision';
                    window.addEventListener('hashchange', normalizeHash);
                }
            } else if (hash === '#/vision' || hash === '#/vision/') {
                if (!window.__visionFromDeepLink) {
                    window.__visionRequestedId = null;
                    window.__visionActiveMandalaId = null;
                }
                window.__visionFromDeepLink = false;
            }
        }

        normalizeHash();
        window.addEventListener('hashchange', normalizeHash);
    }

    ensureHashCompatibility();

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[data-vision-module="${src}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.dataset.visionModule = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }

    function ensureModules() {
        if (!modulesPromise) {
            modulesPromise = MODULE_SCRIPTS.reduce((promise, src) => {
                return promise.then(() => loadScript(src));
            }, Promise.resolve());
        }
        return modulesPromise;
    }

    function extractMandalaId(hash) {
        if (!hash) return null;
        const match = hash.match(/^#\/vision\/(.+)$/);
        return match ? decodeURIComponent(match[1]) : null;
    }

    function ensureArray(value, length, filler = '') {
        const result = Array.isArray(value) ? value.slice(0, length) : [];
        while (result.length < length) {
            result.push(typeof filler === 'function' ? filler() : filler);
        }
        return result;
    }

    function sanitizeMandalaInput(data) {
        const sanitized = {
            centerText: data && data.centerText ? String(data.centerText).trim() : '',
            categories: ensureArray(data && data.categories, 8, '').map(value => String(value || '').trim()),
            items: ensureArray(data && data.items, 8, () => []).map(list => ensureArray(list, 8, '').map(value => String(value || '').trim()))
        };
        return sanitized;
    }

    function loadMandalaCollection() {
        try {
            const stored = localStorage.getItem(MANDALA_STORAGE_KEY);
            if (!stored) return {};
            const parsed = JSON.parse(stored);
            if (parsed && typeof parsed === 'object') {
                return parsed;
            }
        } catch (error) {
            console.warn('[Vision] Failed to load mandalas:', error);
        }
        return {};
    }

    function saveMandalaCollection(collection) {
        try {
            localStorage.setItem(MANDALA_STORAGE_KEY, JSON.stringify(collection));
        } catch (error) {
            console.warn('[Vision] Failed to save mandalas:', error);
        }
    }

    function getMandala(id) {
        if (!id) return null;
        const collection = loadMandalaCollection();
        return collection[id] || null;
    }

    function createMandalaRecord(data) {
        const sanitized = sanitizeMandalaInput(data);
        const gridResult = (window.visionPreview && typeof window.visionPreview.buildMandalaGrid === 'function')
            ? window.visionPreview.buildMandalaGrid(sanitized)
            : { grid: [], categories: sanitized.categories, items: sanitized.items, centerText: sanitized.centerText };

        const id = `mandala-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
        const timestamp = new Date().toISOString();
        const record = Object.assign({}, sanitized, {
            id,
            grid: gridResult.grid,
            createdAt: timestamp,
            updatedAt: timestamp
        });

        const collection = loadMandalaCollection();
        collection[id] = record;
        saveMandalaCollection(collection);
        return record;
    }

    function formatDate(isoString) {
        if (!isoString) return '';
        try {
            return new Date(isoString).toLocaleString('ja-JP', { hour12: false });
        } catch (error) {
            return isoString;
        }
    }

    function isCenterValid(draft) {
        return !!(draft && typeof draft.centerText === 'string' && draft.centerText.trim().length >= 1);
    }

    function areCategoriesValid(draft) {
        if (!draft || !Array.isArray(draft.categories)) return false;
        const values = draft.categories.map(value => String(value || '').trim()).filter(Boolean);
        if (values.length !== 8) return false;
        return new Set(values).size === 8;
    }

    function areItemsValid(draft) {
        if (!draft || !Array.isArray(draft.items)) return false;
        return draft.items.slice(0, 8).every(list => {
            if (!Array.isArray(list)) return false;
            const trimmed = list.map(value => String(value || '').trim()).filter(Boolean);
            return trimmed.length >= MIN_ITEMS_PER_CATEGORY;
        });
    }

    function determineStartingStep(draft) {
        if (!isCenterValid(draft)) return 1;
        if (!areCategoriesValid(draft)) return 2;
        if (!areItemsValid(draft)) return 3;
        return 4;
    }

    function renderWizard(container) {
        if (history.replaceState) {
            history.replaceState(null, '', '#/vision');
        } else {
            window.location.hash = '#/vision';
        }

        window.__visionRequestedId = null;
        window.__visionActiveMandalaId = null;
        window.__visionFromDeepLink = false;

        const store = window.visionDraftStore || {};
        let draft = null;
        if (store && typeof store.loadDraft === 'function') {
            draft = store.loadDraft();
        }
        if (!draft && store && typeof store.createDefaultDraft === 'function') {
            draft = store.createDefaultDraft();
        }
        if (!draft) {
            draft = {
                centerText: '',
                categories: ensureArray(null, 8, ''),
                items: ensureArray(null, 8, () => [])
            };
        }

        draft.categories = ensureArray(draft.categories, 8, '');
        draft.items = ensureArray(draft.items, 8, () => []);

        const startStep = determineStartingStep(draft);
        let currentStep = startStep;

        container.innerHTML = `
            <div class="container px-4 py-6">
                <div class="max-w-5xl mx-auto space-y-6">
                    <div class="space-y-2">
                        <h1 class="text-3xl font-bold tracking-tight">Vision</h1>
                        <p class="text-muted-foreground">マンダラチャートでビジョンを体系化します。4ステップで中心目標からアクションまで整理しましょう。</p>
                    </div>
                    <div class="bg-card border border-border rounded-lg shadow-sm">
                        <div class="border-b border-border px-6 py-4">
                            <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                ${[1, 2, 3, 4].map(step => `
                                    <div data-step-index="${step}" class="flex items-center gap-3 rounded-md px-3 py-2 ${step === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}">
                                        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full border ${step === currentStep ? 'border-primary-foreground' : 'border-border'} text-sm font-semibold">${step}</span>
                                        <span class="text-sm font-medium">
                                            ${step === 1 ? 'メイン目標' : ''}
                                            ${step === 2 ? 'カテゴリ' : ''}
                                            ${step === 3 ? 'アイテム' : ''}
                                            ${step === 4 ? 'プレビュー' : ''}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="px-6 py-6" data-role="step-root"></div>
                    </div>
                </div>
            </div>
        `;

        const stepRoot = container.querySelector('[data-role="step-root"]');

        function updateStepIndicator(step) {
            container.querySelectorAll('[data-step-index]').forEach(element => {
                const stepIndex = Number(element.getAttribute('data-step-index'));
                const isActive = stepIndex === step;
                element.classList.toggle('bg-primary', isActive);
                element.classList.toggle('text-primary-foreground', isActive);
                element.classList.toggle('bg-muted', !isActive);
                element.classList.toggle('text-muted-foreground', !isActive);
            });
        }

        function goToStep(step) {
            currentStep = step;
            updateStepIndicator(step);
            if (!stepRoot) return;

            const steps = window.visionSteps || {};
            switch (step) {
                case 1:
                    if (typeof steps.renderStepCenter === 'function') {
                        steps.renderStepCenter(stepRoot, draft, (update) => {
                            draft.centerText = update.centerText;
                            if (store && typeof store.saveDraft === 'function') {
                                store.saveDraft(draft);
                            }
                            goToStep(2);
                        });
                    }
                    break;
                case 2:
                    if (typeof steps.renderStepCategories === 'function') {
                        steps.renderStepCategories(stepRoot, draft, () => goToStep(1), (update) => {
                            draft.categories = ensureArray(update.categories, 8, '');
                            if (store && typeof store.saveDraft === 'function') {
                                store.saveDraft(draft);
                            }
                            goToStep(3);
                        });
                    }
                    break;
                case 3:
                    if (typeof steps.renderStepItems === 'function') {
                        steps.renderStepItems(stepRoot, draft, () => goToStep(2), (update) => {
                            draft.items = ensureArray(update.items, 8, () => []);
                            if (store && typeof store.saveDraft === 'function') {
                                store.saveDraft(draft);
                            }
                            goToStep(4);
                        });
                    }
                    break;
                case 4:
                default:
                    if (typeof steps.renderStepPreview === 'function') {
                        steps.renderStepPreview(stepRoot, draft, () => goToStep(3), (payload) => {
                            const record = createMandalaRecord(payload);
                            if (store && typeof store.clearDraft === 'function') {
                                store.clearDraft();
                            }
                            window.__visionActiveMandalaId = record.id;
                            window.__visionRequestedId = record.id;
                            renderMandalaDetail(container, record.id);
                        });
                    }
                    break;
            }
        }

        goToStep(currentStep);
    }

    function renderMandalaDetail(container, mandalaId) {
        const record = getMandala(mandalaId);
        if (!record) {
            console.warn('[Vision] Mandala not found:', mandalaId);
            window.__visionRequestedId = null;
            window.__visionActiveMandalaId = null;
            if (window.visionDraftStore && typeof window.visionDraftStore.clearDraft === 'function') {
                window.visionDraftStore.clearDraft();
            }
            renderWizard(container);
            return;
        }

        window.__visionRequestedId = mandalaId;
        window.__visionActiveMandalaId = mandalaId;
        window.__visionFromDeepLink = false;

        if (history.replaceState) {
            history.replaceState(null, '', `#/vision/${encodeURIComponent(mandalaId)}`);
        }

        container.innerHTML = `
            <div class="container px-4 py-6">
                <div class="max-w-5xl mx-auto space-y-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div class="space-y-1">
                            <h1 class="text-3xl font-bold tracking-tight">Mandala Vision</h1>
                            <p class="text-muted-foreground">作成済みのマンダラチャートを表示しています。</p>
                            <p class="text-xs text-muted-foreground">作成日時: ${formatDate(record.createdAt)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" data-action="create-new" class="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm font-medium h-10 px-4">新しく作成</button>
                        </div>
                    </div>
                    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
                        <div class="bg-card border border-border rounded-lg p-6" data-role="mandala-grid"></div>
                        <div class="space-y-4">
                            <div class="bg-card border border-border rounded-lg p-4 space-y-3">
                                <div>
                                    <p class="text-xs uppercase tracking-wide text-muted-foreground">メイン目標</p>
                                    <p class="text-lg font-semibold text-foreground">${record.centerText}</p>
                                </div>
                                <div class="space-y-3">
                                    <p class="text-xs uppercase tracking-wide text-muted-foreground">カテゴリ</p>
                                    <ul class="space-y-1 text-sm text-muted-foreground">
                                        ${record.categories.map((category, index) => `<li><span class="text-foreground font-medium mr-2">${index + 1}.</span>${category}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                            <div class="bg-muted/40 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                                9×9マンダラは読み取り専用です。新しいビジョンを作成する場合は「新しく作成」をクリックしてください。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const gridRoot = container.querySelector('[data-role="mandala-grid"]');
        if (gridRoot && window.visionPreview && typeof window.visionPreview.renderPreviewGrid === 'function') {
            window.visionPreview.renderPreviewGrid(gridRoot, record);
        }

        const createNewButton = container.querySelector('[data-action="create-new"]');
        if (createNewButton) {
            createNewButton.addEventListener('click', () => {
                if (window.visionDraftStore && typeof window.visionDraftStore.clearDraft === 'function') {
                    window.visionDraftStore.clearDraft();
                }
                window.__visionRequestedId = null;
                window.__visionActiveMandalaId = null;
                renderWizard(container);
            });
        }
    }

    function renderVision(container) {
        if (!container) return;

        ensureModules().then(() => {
            const hashId = extractMandalaId(window.location.hash);
            if (hashId && hashId !== window.__visionRequestedId) {
                window.__visionRequestedId = hashId;
            }
            if (!hashId && (window.location.hash === '#/vision' || window.location.hash === '#/vision/' || !window.location.hash)) {
                if (!window.__visionActiveMandalaId && !window.__visionFromDeepLink) {
                    window.__visionRequestedId = null;
                }
            }

            const requestedId = window.__visionRequestedId;
            if (requestedId) {
                renderMandalaDetail(container, requestedId);
            } else {
                renderWizard(container);
            }
        }).catch(error => {
            console.error('[Vision] Failed to initialize:', error);
            container.innerHTML = `
                <div class="container px-4 py-6">
                    <div class="max-w-3xl mx-auto">
                        <div class="bg-destructive/10 border border-destructive text-destructive rounded-lg p-6 space-y-2">
                            <h2 class="text-xl font-semibold">Visionページの読み込みに失敗しました</h2>
                            <p class="text-sm">ページを再読み込みしてもう一度お試しください。</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    window.renderVision = renderVision;
})();
