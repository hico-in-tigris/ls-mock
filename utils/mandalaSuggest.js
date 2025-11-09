(function () {
    'use strict';

    const MAX_ITEMS = 8;

    function hashString(input) {
        if (!input) return 0;
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = (hash << 5) - hash + input.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    function buildLocalSuggestion(center, category, index) {
        const verbs = ['磨く', '描く', '整える', '深める', '発信する', '連携する', '計測する', '挑戦する', '習慣化する', '観察する'];
        const cadences = [
            '毎週火曜19時に',
            '毎朝30分',
            '隔週木曜20時に',
            '毎月第1土曜に',
            '週3回20分',
            '月2回90分',
            '四半期ごとに',
            '週末の朝7時に'
        ];
        const metrics = [
            '進捗を25%振り返る',
            'KPIを2件記録する',
            '成果を3人へ共有する',
            '改善案を5件洗い出す',
            '達成率65%を測定する',
            '次の30日計画を確定する',
            '90日ゴールを逆算する',
            '10日以内の課題を定義する'
        ];

        const baseKey = `${center || ''}:${category || ''}`;
        const actionIndex = (index + hashString(baseKey)) % verbs.length;
        const cadenceIndex = (index * 3 + hashString(category || '')) % cadences.length;
        const metricIndex = (index * 5 + hashString(center || '目標')) % metrics.length;

        const verb = verbs[actionIndex];
        const cadence = cadences[cadenceIndex];
        const metric = metrics[metricIndex];
        const focus = category || 'テーマ';
        const destination = center || '中心目標';

        return `${verb} ${cadence}${focus}の実践を整理し、${destination}へ向けて${metric}`;
    }

    function suggestItemsLocal(center, category) {
        return Array.from({ length: MAX_ITEMS }, (_, index) => ({
            text: buildLocalSuggestion(center, category, index),
            source: 'ai'
        }));
    }

    async function suggestItemsWithAI(center, category) {
        try {
            return suggestItemsLocal(center, category);
        } catch (error) {
            console.warn('[MandalaSuggest] AI suggestion fallback triggered:', error);
            return suggestItemsLocal(center, category);
        }
    }

    async function suggestAllCategories(center, categories) {
        const result = {};
        const safeCategories = Array.isArray(categories) ? categories.slice(0, 8) : [];
        for (const category of safeCategories) {
            const key = typeof category === 'string' ? category : '';
            try {
                result[key] = await suggestItemsWithAI(center, key);
            } catch (error) {
                console.warn('[MandalaSuggest] Failed to suggest category, using local:', key, error);
                result[key] = suggestItemsLocal(center, key);
            }
        }
        return result;
    }

    window.mandalaSuggest = Object.assign({}, window.mandalaSuggest, {
        suggestItemsLocal,
        suggestAllCategories,
        suggestItemsWithAI
    });
})();
