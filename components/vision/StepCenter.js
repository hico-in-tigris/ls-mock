(function () {
    'use strict';

    function renderStepCenter(root, draft, onNext) {
        if (!root) return;

        const currentText = (draft && typeof draft.centerText === 'string') ? draft.centerText : '';

        root.innerHTML = `
            <div class="space-y-6 animate-fade-in">
                <div class="space-y-2">
                    <div class="text-sm uppercase tracking-wide text-muted-foreground">STEP 1</div>
                    <h2 class="text-2xl font-semibold">メイン目標を記入</h2>
                    <p class="text-muted-foreground">マンダラチャートの中心に配置する最重要テーマを一言で表現してください。</p>
                </div>
                <div class="bg-card border border-border rounded-lg p-6 space-y-4">
                    <label class="block text-sm font-medium text-foreground" for="vision-center-text">中心となる目標</label>
                    <input id="vision-center-text" type="text" value="${currentText.replace(/"/g, '&quot;')}" placeholder="例：地域の未来を支える人材育成" class="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    <p data-role="error" class="text-sm text-destructive hidden">目標を入力してください。</p>
                </div>
                <div class="flex items-center justify-end gap-3 border-t border-border pt-4">
                    <button type="button" data-action="next" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 disabled:opacity-50 disabled:pointer-events-none">次へ</button>
                </div>
            </div>
        `;

        const input = root.querySelector('#vision-center-text');
        const nextButton = root.querySelector('[data-action="next"]');
        const errorMessage = root.querySelector('[data-role="error"]');

        function validate(value) {
            return value.trim().length >= 1;
        }

        function updateState() {
            const value = input.value;
            const isValid = validate(value);
            nextButton.disabled = !isValid;
            errorMessage.classList.toggle('hidden', isValid);
        }

        updateState();

        function persist(value) {
            if (draft && typeof draft === 'object') {
                draft.centerText = value;
            }
            if (window.visionDraftStore && typeof window.visionDraftStore.saveDraft === 'function') {
                window.visionDraftStore.saveDraft(draft);
            }
        }

        input.addEventListener('input', () => {
            updateState();
            persist(input.value);
        });

        nextButton.addEventListener('click', () => {
            const value = input.value.trim();
            if (!validate(value)) {
                updateState();
                return;
            }
            persist(value);
            if (typeof onNext === 'function') {
                onNext({ centerText: value });
            }
        });
    }

    window.visionSteps = Object.assign({}, window.visionSteps, {
        renderStepCenter
    });
})();
