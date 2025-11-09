(function () {
    'use strict';

    const CATEGORY_BLOCKS = [
        { index: 0, blockRow: 0, blockCol: 1, centerCell: [3, 4] },
        { index: 1, blockRow: 0, blockCol: 2, centerCell: [3, 5] },
        { index: 2, blockRow: 1, blockCol: 2, centerCell: [4, 5] },
        { index: 3, blockRow: 2, blockCol: 2, centerCell: [5, 5] },
        { index: 4, blockRow: 2, blockCol: 1, centerCell: [5, 4] },
        { index: 5, blockRow: 2, blockCol: 0, centerCell: [5, 3] },
        { index: 6, blockRow: 1, blockCol: 0, centerCell: [4, 3] },
        { index: 7, blockRow: 0, blockCol: 0, centerCell: [3, 3] }
    ];

    function ensureArray(value, length) {
        const array = Array.isArray(value) ? value.slice(0, length) : [];
        while (array.length < length) {
            array.push('');
        }
        return array;
    }

    function normalizeItemValues(items, categories) {
        if (Array.isArray(items)) {
            return ensureArray(items, categories.length).map(list => {
                const values = Array.isArray(list) ? list.slice(0, 8).map(value => String(value || '').trim()).filter(Boolean) : [];
                return ensureArray(values, 8);
            });
        }
        if (items && typeof items === 'object') {
            return categories.map((category) => {
                const list = Array.isArray(items[category]) ? items[category] : [];
                const values = list
                    .slice(0, 8)
                    .map((entry) => {
                        if (typeof entry === 'string') return entry.trim();
                        if (entry && typeof entry === 'object') {
                            return typeof entry.text === 'string' ? entry.text.trim() : '';
                        }
                        return '';
                    })
                    .filter(Boolean);
                return ensureArray(values, 8);
            });
        }
        return categories.map(() => ensureArray([], 8));
    }

    function buildMandalaGrid(draft) {
        const grid = Array.from({ length: 9 }, () => Array(9).fill(''));
        const categories = ensureArray(draft && draft.categories, 8);
        const items = normalizeItemValues(draft && draft.items, categories);
        const centerText = (draft && typeof draft.centerText === 'string') ? draft.centerText.trim() : '';

        grid[4][4] = centerText;

        CATEGORY_BLOCKS.forEach(({ index, blockRow, blockCol, centerCell }) => {
            const categoryName = categories[index] || '';
            const blockStartRow = blockRow * 3;
            const blockStartCol = blockCol * 3;
            const blockCenterRow = blockStartRow + 1;
            const blockCenterCol = blockStartCol + 1;

            grid[blockCenterRow][blockCenterCol] = categoryName;
            grid[centerCell[0]][centerCell[1]] = categoryName;

            const cellPositions = [];
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (r === 1 && c === 1) continue;
                    cellPositions.push([blockStartRow + r, blockStartCol + c]);
                }
            }

            const values = items[index];
            cellPositions.forEach(([row, col], positionIndex) => {
                grid[row][col] = values[positionIndex] || '';
            });
        });

        return {
            grid,
            categories,
            items,
            centerText
        };
    }

    function renderPreviewGrid(root, draft) {
        if (!root) return null;
        const { grid } = buildMandalaGrid(draft);
        const categoryCenters = new Set();
        const itemCenters = new Set();

        CATEGORY_BLOCKS.forEach(({ blockRow, blockCol, centerCell }) => {
            const blockCenterRow = blockRow * 3 + 1;
            const blockCenterCol = blockCol * 3 + 1;
            categoryCenters.add(`${blockCenterRow}-${blockCenterCol}`);
            itemCenters.add(`${centerCell[0]}-${centerCell[1]}`);
        });

        const cells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const key = `${row}-${col}`;
                const value = grid[row][col];
                let cellClass = 'border border-border -ml-px -mt-px min-h-[48px] flex items-center justify-center text-center px-1 py-2 text-xs md:text-sm bg-background';

                if (row === 4 && col === 4) {
                    cellClass += ' bg-primary text-primary-foreground font-semibold';
                } else if (categoryCenters.has(key)) {
                    cellClass += ' bg-muted font-medium';
                } else if (itemCenters.has(key)) {
                    cellClass += ' bg-muted/60 font-medium';
                }

                cells.push(`<div class="${cellClass}"><span class="block leading-snug break-words">${value || ''}</span></div>`);
            }
        }

        root.innerHTML = `
            <div class="grid grid-cols-9 border border-border rounded-lg overflow-hidden">
                ${cells.join('')}
            </div>
        `;

        return grid;
    }

    window.visionPreview = Object.assign({}, window.visionPreview, {
        buildMandalaGrid,
        renderPreviewGrid
    });
})();
