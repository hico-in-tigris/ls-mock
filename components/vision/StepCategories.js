(function () {
    'use strict';

    function renderStepCategories(root, draft, onPrev, onNext) {
        if (!root) return;

        const categories = Array.isArray(draft && draft.categories)
            ? draft.categories.slice(0, 8)
            : [];
        while (categories.length < 8) {
            categories.push('');
        }

        root.innerHTML = `
            <div class="space-y-6 animate-fade-in">
                <div class="space-y-2">
                    <div class="text-sm uppercase tracking-wide text-muted-foreground">STEP 2</div>
                    <h2 class="text-2xl font-semibold">カテゴリを整理</h2>
                    <p class="text-muted-foreground">マンダラの中心を支える8つのカテゴリを設定してください。同じ名前は利用できません。</p>
                </div>
                <div class="grid gap-4 md:grid-cols-2">
                    ${categories.map((category, index) => `
                        <div class="bg-card border border-border rounded-lg p-4 space-y-2">
                            <div class="flex items-center justify-between text-sm text-muted-foreground">
                                <span>カテゴリ ${index + 1}</span>
                                <span class="text-xs uppercase tracking-wide">${['北','北東','東','南東','南','南西','西','北西'][index] || ''}</span>
                            </div>
                            <input data-index="${index}" type="text" value="${(category || '').replace(/"/g, '&quot;')}" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                        </div>
                    `).join('')}
                </div>
                <p data-role="error" class="text-sm text-destructive hidden">8つのカテゴリを重複なく入力してください。</p>
                <div class="flex items-center justify-between gap-3 border-t border-border pt-4 flex-wrap">
                    <button type="button" data-action="prev" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6">戻る</button>
                    <button type="button" data-action="next" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 disabled:opacity-50 disabled:pointer-events-none">次へ</button>
                </div>
            </div>
        `;

        const inputs = Array.from(root.querySelectorAll('input[data-index]'));
        const nextButton = root.querySelector('[data-action="next"]');
        const prevButton = root.querySelector('[data-action="prev"]');
        const errorMessage = root.querySelector('[data-role="error"]');

        function validate(values) {
            const trimmed = values.map(value => value.trim()).filter(Boolean);
            if (trimmed.length !== 8) return false;
            const unique = new Set(trimmed);
            return unique.size === 8;
        }

        function collectValues() {
            return inputs.map(input => input.value || '');
        }

        function updateState() {
            const values = collectValues();
            const isValid = validate(values);
            nextButton.disabled = !isValid;
            errorMessage.classList.toggle('hidden', isValid);
        }

        function persist(values) {
            if (draft && typeof draft === 'object') {
                values.forEach((value, index) => {
                    draft.categories[index] = value;
                });
            }
            if (window.visionDraftStore && typeof window.visionDraftStore.saveDraft === 'function') {
                window.visionDraftStore.saveDraft(draft);
            }
        }

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const values = collectValues();
                updateState();
                persist(values);
            });
        });

        updateState();

        if (prevButton && typeof onPrev === 'function') {
            prevButton.addEventListener('click', () => {
                onPrev();
            });
        }

        nextButton.addEventListener('click', () => {
            const rawValues = collectValues();
            const values = rawValues.map(value => value.trim());
            if (!validate(values)) {
                updateState();
                return;
            }
            persist(values);
            if (typeof onNext === 'function') {
                onNext({ categories: values });
            }
        });
    }

    window.visionSteps = Object.assign({}, window.visionSteps, {
        renderStepCategories
    });
})();
