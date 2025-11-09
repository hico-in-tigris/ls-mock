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

    function createDefaultDraft() {
        return {
            centerText: '',
            categories: DEFAULT_CATEGORIES.slice(),
            items: DEFAULT_CATEGORIES.map(() => [])
        };
    }

    function sanitizeDraft(rawDraft) {
        const base = createDefaultDraft();
        if (!rawDraft || typeof rawDraft !== 'object') {
            return base;
        }

        const draft = {
            centerText: typeof rawDraft.centerText === 'string' ? rawDraft.centerText : '',
            categories: Array.isArray(rawDraft.categories) ? rawDraft.categories.slice(0, 8) : [],
            items: Array.isArray(rawDraft.items) ? rawDraft.items.slice(0, 8) : []
        };

        while (draft.categories.length < 8) {
            draft.categories.push('');
        }

        while (draft.items.length < 8) {
            draft.items.push([]);
        }

        draft.categories = draft.categories.map((value, index) => {
            if (typeof value !== 'string' || !value.trim()) {
                return base.categories[index] || '';
            }
            return value;
        });

        draft.items = draft.items.map((list) => {
            if (!Array.isArray(list)) return [];
            return list
                .filter(item => typeof item === 'string')
                .map(item => item.trim())
                .filter(Boolean)
                .slice(0, 8);
        });

        return draft;
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
