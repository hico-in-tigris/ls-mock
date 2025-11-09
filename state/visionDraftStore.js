(function () {
    'use strict';

    const STORAGE_KEY = 'vision:draft';
    const DEFAULT_CATEGORIES = [
        'キャリア',
        '学習・成長',
        '健康',
        '家族・パートナー',
        'コミュニティ',
        '趣味・創造',
        '財務・仕事',
        '社会貢献'
    ];

    const MAX_ITEMS = 8;

    function createEmptyItemsMap(categories) {
        const map = {};
        categories.forEach((category) => {
            map[category] = [];
        });
        return map;
    }

    function createDefaultDraft() {
        const categories = DEFAULT_CATEGORIES.slice();
        return {
            centerText: '',
            categories,
            items: createEmptyItemsMap(categories)
        };
    }

    function normalizeItemEntry(entry) {
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
    }

    function normalizeItems(rawItems, categories) {
        const normalized = {};
        const safeCategories = Array.isArray(categories) ? categories : [];
        let sourceObject = null;
        let sourceArray = null;

        if (rawItems && typeof rawItems === 'object' && !Array.isArray(rawItems)) {
            sourceObject = rawItems;
        } else if (Array.isArray(rawItems)) {
            sourceArray = rawItems.slice(0, safeCategories.length);
        }

        safeCategories.forEach((category, index) => {
            const key = typeof category === 'string' ? category : '';
            let list = [];
            if (sourceObject && Array.isArray(sourceObject[key])) {
                list = sourceObject[key];
            } else if (sourceArray && Array.isArray(sourceArray[index])) {
                list = sourceArray[index];
            }

            normalized[key] = Array.isArray(list)
                ? list
                    .slice(0, MAX_ITEMS)
                    .map(normalizeItemEntry)
                    .filter(Boolean)
                : [];
        });

        return normalized;
    }

    function sanitizeDraft(rawDraft) {
        const base = createDefaultDraft();
        if (!rawDraft || typeof rawDraft !== 'object') {
            return base;
        }

        const categories = Array.isArray(rawDraft.categories)
            ? rawDraft.categories.slice(0, 8)
            : [];

        while (categories.length < 8) {
            categories.push('');
        }

        const sanitizedCategories = categories.map((value, index) => {
            if (typeof value !== 'string' || !value.trim()) {
                return base.categories[index] || '';
            }
            return value;
        });

        return {
            centerText: typeof rawDraft.centerText === 'string' ? rawDraft.centerText : '',
            categories: sanitizedCategories,
            items: normalizeItems(rawDraft.items, sanitizedCategories)
        };
    }

    function loadDraft() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return createDefaultDraft();
            }
            const parsed = JSON.parse(stored);
            return sanitizeDraft(parsed);
        } catch (error) {
            console.warn('[VisionDraftStore] Failed to load draft:', error);
            return createDefaultDraft();
        }
    }

    function saveDraft(draft) {
        try {
            const sanitized = sanitizeDraft(draft);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
            return sanitized;
        } catch (error) {
            console.warn('[VisionDraftStore] Failed to save draft:', error);
        }
    }

    function clearDraft() {
        localStorage.removeItem(STORAGE_KEY);
    }

    window.visionDraftStore = Object.assign({}, window.visionDraftStore, {
        loadDraft,
        saveDraft,
        clearDraft,
        createDefaultDraft
    });
})();
