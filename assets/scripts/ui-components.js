/**
 * UI Components Library
 * 共通UIコンポーネントのライブラリ
 */

// ===========================
// Theme (Monochrome mode)
// ===========================
let __uiThemeMono = true; // 単色テーマをデフォルト有効
function setMonochrome(enabled = true) {
    __uiThemeMono = !!enabled;
}

// ===========================
// Card Components
// ===========================

/**
 * 基本的なカードコンポーネント
 * @param {Object} options - カードのオプション
 * @param {string} options.header - ヘッダーのHTML
 * @param {string} options.content - コンテンツのHTML
 * @param {string} options.footer - フッターのHTML（オプション）
 * @param {string} options.className - 追加のCSSクラス（オプション）
 * @returns {string} カードのHTML
 */
function createCard({ header, content, footer, className = '' }) {
    // ヘッダーは文字列または { title, description, actions } のオブジェクトを受け付ける
    let headerHtml = '';
    if (header) {
        if (typeof header === 'string') {
            headerHtml = `<div class="card-header">${header}</div>`;
        } else if (typeof header === 'object') {
            const { title, description, actions } = header;
            headerHtml = `
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            ${title ? `<h3 class="text-lg font-semibold">${title}</h3>` : ''}
                            ${description ? `<p class="text-sm text-muted-foreground">${description}</p>` : ''}
                        </div>
                        ${actions ? `<div class="flex space-x-2">${actions}</div>` : ''}
                    </div>
                </div>
            `;
        } else {
            headerHtml = `<div class="card-header">${String(header)}</div>`;
        }
    }

    return `
        <div class="card border border-border rounded-lg bg-background shadow-sm ${className}">
            ${headerHtml ? headerHtml.replace('class="card-header"', 'class="card-header px-6 py-4 border-b border-border"') : ''}
            ${content ? `<div class=\"card-content p-6 space-y-4\">${content}</div>` : ''}
            ${footer ? `<div class=\"card-footer px-6 py-4 border-t border-border\">${footer}</div>` : ''}
        </div>
    `;
}

/**
 * ヘッダーカード（旧版：後方互換性のため残す）
 * @param {string} title - タイトル
 * @param {string} subtitle - サブタイトル（オプション）
 * @param {string} content - コンテンツ
 * @param {string} className - 追加のクラス名
 * @returns {string} カードのHTML
 */
function createHeaderCard(title, subtitle, content, className = '') {
    // オブジェクト形式で呼ばれた場合の対応
    if (typeof title === 'object') {
        const { title: pageTitle, description, actions } = title;
        return `
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold">${pageTitle}</h1>
                    <p class="text-muted-foreground">${description}</p>
                </div>
                ${actions ? `<div class="flex space-x-2">${actions}</div>` : ''}
            </div>
        `;
    }
    
    // 従来の形式
    const header = `
        <h3 class="text-lg font-semibold">${title}</h3>
        ${subtitle ? `<p class="text-sm text-muted-foreground">${subtitle}</p>` : ''}
    `;
    
    return createCard({ header, content, className });
}

/**
 * 統計カード
 * @param {Object} options - 統計カードのオプション
 * @param {string} options.title - タイトル
 * @param {string|number} options.value - 値
 * @param {string} options.subtitle - サブタイトル（オプション）
 * @param {string} options.icon - アイコンのSVG（オプション）
 * @param {string} options.color - カラーテーマ（blue, green, orange, purple など）
 * @param {Object} options.onClick - クリックイベント（オプション）{name, params}
 * @returns {string} 統計カードのHTML
 */
function createStatsCard({ title, value, subtitle, icon, color = 'blue', onClick }) {
    const clickHandler = onClick ? `onclick="${onClick.name}('${onClick.params || ''}')"` : '';
    const cursor = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

    // 単色テーマでは色を固定のグレイスケールに
    const titleClass = __uiThemeMono ? 'text-gray-700' : `text-${color}-700`;
    const valueClass = __uiThemeMono ? 'text-gray-900' : `text-${color}-900`;
    const subClass = __uiThemeMono ? 'text-gray-600' : `text-${color}-600`;
    const iconBg = __uiThemeMono ? 'bg-gray-200' : `bg-${color}-200`;
    const cardClass = __uiThemeMono 
        ? 'bg-white border border-gray-200'
        : `bg-gradient-to-r from-${color}-50 to-${color}-100 border-${color}-200`;

    const content = `
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm font-medium ${titleClass}">${title}</p>
                <p class="text-2xl font-bold ${valueClass}">${value}</p>
                ${subtitle ? `<p class="text-xs ${subClass}">${subtitle}</p>` : ''}
            </div>
            ${icon ? `
                <div class="w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center">
                    ${icon}
                </div>
            ` : ''}
        </div>
    `;

    return `
        <div class="card ${cardClass} ${cursor}" ${clickHandler}>
            <div class="card-content">
                ${content}
            </div>
        </div>
    `;
}

// ===========================
// List Components
// ===========================

/**
 * アイテムリスト
 * @param {Array} items - アイテムの配列
 * @param {function} renderItem - アイテムをレンダリングする関数
 * @param {string} emptyMessage - 空の場合のメッセージ
 * @param {string} className - 追加のCSSクラス
 * @returns {string} リストのHTML
 */
function createItemList(items, renderItem, emptyMessage = 'アイテムがありません', className = 'space-y-3') {
    if (!items || items.length === 0) {
        return createEmptyState(emptyMessage);
    }
    
    return `
        <div class="${className}">
            ${items.map(renderItem).join('')}
        </div>
    `;
}

/**
 * 空状態コンポーネント
 * @param {string} message - メッセージ
 * @param {string} icon - アイコンのSVG（オプション）
 * @param {Object} action - アクションボタンの設定（オプション）
 * @returns {string} 空状態のHTML
 */
function createEmptyState(message, icon, action) {
    const defaultIcon = `
        <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
    `;
    
    return `
        <div class="text-center py-8 text-muted-foreground">
            ${icon || defaultIcon}
            <p class="text-sm">${message}</p>
            ${action ? `
                <button onclick="${action.onClick}" class="${action.className || 'text-primary hover:underline text-sm mt-2'}">
                    ${action.text}
                </button>
            ` : ''}
        </div>
    `;
}

/**
 * 設定項目コンポーネント
 * @param {Object} options - 設定項目のオプション
 * @param {string} options.title - タイトル
 * @param {string} options.description - 説明
 * @param {string} options.icon - アイコンのSVG
 * @param {string} options.iconColor - アイコンの色クラス
 * @param {string} options.onClick - クリックイベント
 * @returns {string} 設定項目のHTML
 */
function createSettingItem({ title, description, icon, iconColor = 'text-blue-600', onClick }) {
    const ic = __uiThemeMono ? 'text-gray-700' : iconColor;
    return `
        <button onclick="${onClick}" 
                class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
                <div class="h-5 w-5 ${ic}">
                    ${icon}
                </div>
                <div class="text-left">
                    <h4 class="font-medium">${title}</h4>
                    <p class="text-sm text-gray-600">${description}</p>
                </div>
            </div>
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
            </svg>
        </button>
    `;
}

/**
 * タブコンポーネント
 * @param {Array} tabs - タブの配列 [{id, text, active, onClick}]
 * @returns {string} タブのHTML
 */
function createTabs(tabs) {
    const activeClass = __uiThemeMono ? 'border-black text-black' : 'border-primary text-primary';
    const hoverClass = __uiThemeMono ? 'hover:text-black' : 'hover:text-primary';
    return `
        <div class="flex space-x-2 border-b border-border">
            ${tabs.map(tab => `
                <button onclick="${tab.onClick}" 
                        class="px-4 py-2 text-sm font-medium transition-colors ${hoverClass} border-b-2 ${
                            tab.active 
                                ? activeClass
                                : 'border-transparent text-muted-foreground'
                        }" 
                        data-tab="${tab.id}">
                    ${tab.text}
                </button>
            `).join('')}
        </div>
    `;
}

// ===========================
// Form Components
// ===========================

/**
 * フォームフィールド
 * @param {Object} options - フィールドのオプション
 * @param {string} options.label - ラベル
 * @param {string} options.type - input type（text, email, password など）
 * @param {string} options.id - ID
 * @param {string} options.placeholder - プレースホルダー
 * @param {string} options.value - 初期値
 * @param {boolean} options.required - 必須フラグ
 * @param {string} options.className - 追加のCSSクラス
 * @returns {string} フォームフィールドのHTML
 */
function createFormField({ label, type = 'text', id, placeholder = '', value = '', required = false, className = '' }) {
    return `
        <div class="space-y-2 ${className}">
            ${label ? `
            <label for="${id}" class="text-sm font-medium leading-none">
                ${label}${required ? ' <span class="text-red-500">*</span>' : ''}
            </label>
            ` : ''}
            <input 
                type="${type}"
                id="${id}"
                name="${id}"
                placeholder="${placeholder}"
                value="${value}"
                ${required ? 'required' : ''}
                class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
        </div>
    `;
}

/**
 * テキストエリアフィールド
 * @param {Object} options - テキストエリアのオプション
 * @param {string} options.label - ラベル
 * @param {string} options.id - ID
 * @param {string} options.placeholder - プレースホルダー
 * @param {string} options.value - 初期値
 * @param {number} options.rows - 行数
 * @param {boolean} options.required - 必須フラグ
 * @param {string} options.className - 追加のCSSクラス
 * @returns {string} テキストエリアのHTML
 */
function createTextArea({ label, id, placeholder = '', value = '', rows = 3, required = false, className = '' }) {
    return `
        <div class="space-y-2 ${className}">
            ${label ? `
            <label for="${id}" class="text-sm font-medium leading-none">
                ${label}${required ? ' <span class="text-red-500">*</span>' : ''}
            </label>
            ` : ''}
            <textarea 
                id="${id}"
                name="${id}"
                rows="${rows}"
                placeholder="${placeholder}"
                ${required ? 'required' : ''}
                class="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >${value}</textarea>
        </div>
    `;
}

// ===========================
// Button Components
// ===========================

/**
 * ボタンコンポーネント
 * @param {Object} options - ボタンのオプション
 * @param {string} options.text - ボタンテキスト
 * @param {string} options.variant - バリアント（primary, secondary, destructive など）
 * @param {string} options.size - サイズ（sm, md, lg）
 * @param {string} options.onClick - クリックイベント
 * @param {string} options.icon - アイコンのSVG（オプション）
 * @param {boolean} options.disabled - 無効フラグ
 * @param {string} options.className - 追加のCSSクラス
 * @returns {string} ボタンのHTML
 */
function createButton({ text, variant = 'primary', size = 'md', onClick, icon, disabled = false, className = '' }) {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
    
    const variantClasses = __uiThemeMono ? {
        primary: 'bg-black text-white shadow hover:bg-black/90',
        secondary: 'border border-gray-300 bg-white shadow-sm hover:bg-gray-100',
        destructive: 'bg-gray-800 text-white shadow-sm hover:bg-gray-700',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'text-black underline-offset-4 hover:underline'
    } : {
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
    };
    
    const sizeClasses = {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-8'
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    return `
        <button 
            ${onClick ? `onclick="${onClick}"` : ''}
            ${disabled ? 'disabled' : ''}
            class="${classes}"
        >
            ${icon ? `${icon}` : ''}
            ${icon && text ? '<span class="ml-2">' : ''}${text}${icon && text ? '</span>' : ''}
        </button>
    `;
}

/**
 * 検索コンポーネント
 * @param {Object} options - 検索オプション
 * @param {string} options.id - input要素のID
 * @param {string} options.placeholder - プレースホルダー
 * @param {string} options.onInput - 入力イベントハンドラー
 * @param {string} options.className - 追加のCSSクラス
 * @returns {string} 検索コンポーネントのHTML
 */
function createSearchField({ id, placeholder = '検索...', onInput, className = '' }) {
    return `
        <div class="relative ${className}">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
                type="text" 
                id="${id}"
                placeholder="${placeholder}" 
                ${onInput ? `oninput="${onInput}"` : ''}
                class="pl-10 pr-4 py-2 w-full border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
        </div>
    `;
}

/**
 * セレクトコンポーネント
 * @param {Object} options - セレクトオプション
 * @param {string} options.id - select要素のID
 * @param {Array} options.options - オプションの配列 [{value, text, selected}]
 * @param {string} options.onChange - 変更イベントハンドラー
 * @param {string} options.className - 追加のCSSクラス
 * @returns {string} セレクトコンポーネントのHTML
 */
function createSelect({ id, options, onChange, className = '' }) {
    return `
        <select 
            ${id ? `id="${id}"` : ''}
            ${onChange ? `onchange="${onChange}"` : ''}
            class="px-3 py-2 border border-input rounded-md bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}"
        >
            ${options.map(option => `
                <option value="${option.value}" ${option.selected ? 'selected' : ''}>
                    ${option.text}
                </option>
            `).join('')}
        </select>
    `;
}

/**
 * タグフィルターコンポーネント
 * @param {Object} options - タグフィルターオプション
 * @param {Array} options.allTags - 全タグの配列
 * @param {Array} options.selectedTags - 選択されたタグの配列
 * @param {string} options.onToggle - タグトグルイベントハンドラー
 * @param {string} options.onClear - クリアイベントハンドラー
 * @returns {string} タグフィルターコンポーネントのHTML
 */
function createTagFilter({ allTags, selectedTags, onToggle, onClear }) {
    return `
        <div class="relative">
            <button onclick="toggleTagFilter()" class="flex items-center space-x-2 px-3 py-2 border border-input rounded-md hover:bg-accent">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                <span>タグ</span>
                ${selectedTags.length > 0 ? `<span class="${__uiThemeMono ? 'bg-black text-white' : 'bg-primary text-primary-foreground'} text-xs px-2 py-1 rounded-full">${selectedTags.length}</span>` : ''}
            </button>
            <div id="tag-filter-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-10">
                <div class="p-3">
                    <div class="flex flex-wrap gap-2">
                        ${allTags.map(tag => `
                            <button onclick="${onToggle}('${tag}')" class="text-xs px-2 py-1 rounded-full border transition-colors ${selectedTags.includes(tag) ? (__uiThemeMono ? 'bg-black text-white border-black' : 'bg-primary text-primary-foreground border-primary') : 'border-input hover:bg-accent'}">
                                ${tag}
                            </button>
                        `).join('')}
                    </div>
                    ${selectedTags.length > 0 ? `
                        <button onclick="${onClear}()" class="mt-3 text-xs text-muted-foreground hover:text-foreground">
                            すべてクリア
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ===========================
// Badge Components
// ===========================

/**
 * バッジコンポーネント
 * @param {string} text - バッジテキスト
 * @param {string} variant - バリアント（default, secondary, destructive, outline）
 * @param {string} className - 追加のCSSクラス
 * @returns {string} バッジのHTML
 */
function createBadge(text, variant = 'default', className = '') {
    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border border-border'
    };
    
    return `
        <span class="badge ${variantClasses[variant]} ${className}">
            ${text}
        </span>
    `;
}

// ===========================
// Modal Components
// ===========================

/**
 * モーダルコンポーネント
 * @param {Object} options - モーダルのオプション
 * @param {string} options.id - モーダルID
 * @param {string} options.title - タイトル
 * @param {string} options.content - コンテンツ
 * @param {Array} options.actions - アクションボタンの配列
 * @param {string} options.size - サイズ（sm, md, lg, xl）
 * @param {boolean} options.closeOnBackdrop - 背景クリックで閉じるか
 * @returns {string} モーダルのHTML
 */
function createModal({ id, title, content, actions = [], size = 'md', closeOnBackdrop = true }) {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };
    
    const backdropClick = closeOnBackdrop ? `onclick="closeModal('${id}')"` : '';
    
    return `
        <div id="${id}" class="fixed inset-0 z-50 hidden">
            <div class="fixed inset-0 bg-black/50" ${backdropClick}></div>
            <div class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full ${sizeClasses[size]} bg-background p-6 shadow-lg border border-border rounded-lg">
                <div class="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h3 class="text-lg font-semibold leading-none tracking-tight">${title}</h3>
                </div>
                <div class="py-4">
                    ${content}
                </div>
                ${actions.length > 0 ? `
                    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                        ${actions.map(action => createButton(action)).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ===========================
// Utility Functions
// ===========================

/**
 * モーダルを開く
 * @param {string} modalId - モーダルID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * モーダルを閉じる
 * @param {string} modalId - モーダルID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/**
 * アイコンライブラリ
 */
const Icons = {
    plus: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>`,
    check: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    edit: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    delete: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
    search: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    download: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    user: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    users: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    heart: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
    clock: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
    calendar: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    lightbulb: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 21h6"/><path d="M12 17v4"/><path d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M12 7v10"/></svg>`,
    target: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    puzzle: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19.439 7.85c-.049.322-.059.648-.026.975.033.327.086.650.175.968.075.267.149.535.218.805.058.227.114.455.165.684.047.214.09.429.127.645.032.189.059.379.08.569.018.169.031.338.039.508.007.15.009.301.005.452-.004.132-.013.264-.026.396-.016.159-.037.317-.063.475-.021.128-.047.256-.077.383-.024.1-.051.2-.081.299-.025.081-.052.161-.081.241-.024.066-.05.131-.078.196-.022.051-.046.102-.071.152-.020.04-.041.079-.063.118-.017.029-.035.058-.054.087-.014.021-.029.042-.044.063-.011.015-.023.030-.035.045-.008.01-.016.020-.025.030-.006.007-.012.014-.019.021-.004.004-.008.008-.013.012-.003.002-.006.005-.009.007-.002.001-.004.002-.006.003-.001 0-.002.001-.003.001h-.001z"/></svg>`,
    star: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    check: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>`,
    arrow: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg>`
};

// ウィザードステップコンポーネント
function createWizardStep(options = {}) {
    const {
        number = 1,
        title = '',
        isActive = false,
        isCompleted = false,
        onClick = null
    } = options;

    const stepClass = isCompleted ? 'bg-green-500 text-white' : 
                     isActive ? 'bg-blue-500 text-white' : 
                     'bg-gray-300 text-gray-600';

    return `
        <div class="flex flex-col items-center cursor-pointer" ${onClick ? `onclick="${onClick}"` : ''}>
            <div class="w-12 h-12 rounded-full ${stepClass} flex items-center justify-center font-bold text-lg mb-2 relative transition-all duration-300 hover:scale-110">
                ${isCompleted ? Icons.check : `<span>${number}</span>`}
            </div>
            <span class="text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'} text-center">${title}</span>
        </div>
    `;
}

// ウィザードコンポーネント
function createWizard(steps = [], currentStep = 0) {
    const stepsHtml = steps.map((step, index) => {
        const stepElement = createWizardStep({
            number: index + 1,
            title: step.title,
            isActive: index === currentStep,
            isCompleted: index < currentStep,
            onClick: step.onClick
        });

        const arrow = index < steps.length - 1 ? `
            <div class="flex items-center mx-4">
                <div class="h-0.5 w-12 bg-gray-300"></div>
                ${Icons.arrow}
            </div>
        ` : '';

        return stepElement + arrow;
    }).join('');

    return `
        <div class="mb-8">
            <div class="flex items-center justify-center">
                ${stepsHtml}
            </div>
        </div>
    `;
}

// プログレスバーコンポーネント
function createProgressBar(options = {}) {
    const {
        percentage = 0,
        color = 'blue',
        showLabel = true,
        size = 'medium'
    } = options;

    const sizeClass = size === 'small' ? 'h-2' : size === 'large' ? 'h-4' : 'h-3';
    const colorClass = `bg-${color}-500`;

    return `
        <div class="w-full">
            ${showLabel ? `<div class="flex justify-between text-sm mb-1">
                <span>進捗</span>
                <span>${percentage}%</span>
            </div>` : ''}
            <div class="w-full bg-gray-200 rounded-full ${sizeClass}">
                <div class="${colorClass} ${sizeClass} rounded-full transition-all duration-300" style="width: ${percentage}%"></div>
            </div>
        </div>
    `;
}

// フォームグループコンポーネント
function createFormGroup(options = {}) {
    const {
        label = '',
        required = false,
        error = '',
        help = '',
        children = ''
    } = options;

    return `
        <div class="mb-4">
            ${label ? `
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ${label}${required ? ' <span class="text-red-500">*</span>' : ''}
                </label>
            ` : ''}
            ${children}
            ${error ? `<p class="mt-1 text-sm text-red-600">${error}</p>` : ''}
            ${help ? `<p class="mt-1 text-sm text-gray-500">${help}</p>` : ''}
        </div>
    `;
}

// チェックボックスグループコンポーネント
function createCheckboxGroup(options = {}) {
    const {
        items = [],
        name = '',
        selectedValues = [],
        onChange = null
    } = options;

    const checkboxesHtml = items.map(item => `
        <label class="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" 
                   name="${name}" 
                   value="${item.value}"
                   ${selectedValues.includes(item.value) ? 'checked' : ''}
                   ${onChange ? `onchange="${onChange}"` : ''}
                   class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="text-sm text-gray-700">${item.label}</span>
        </label>
    `).join('');

    return `
        <div class="space-y-2">
            ${checkboxesHtml}
        </div>
    `;
}

// ラジオボタングループコンポーネント
function createRadioGroup(options = {}) {
    const {
        items = [],
        name = '',
        selectedValue = '',
        onChange = null
    } = options;

    const radiosHtml = items.map(item => `
        <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" 
                   name="${name}" 
                   value="${item.value}"
                   ${selectedValue === item.value ? 'checked' : ''}
                   ${onChange ? `onchange="${onChange}"` : ''}
                   class="border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="text-sm text-gray-700">${item.label}</span>
        </label>
    `).join('');

    return `
        <div class="space-y-2">
            ${radiosHtml}
        </div>
    `;
}

// ファイルアップロードコンポーネント
function createFileUpload(options = {}) {
    const {
        id = '',
        name = '',
        accept = '',
        multiple = false,
        onChange = null,
        dragText = 'ファイルをドラッグ&ドロップまたはクリックして選択'
    } = options;

    return `
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input type="file" 
                   id="${id}" 
                   name="${name}"
                   ${accept ? `accept="${accept}"` : ''}
                   ${multiple ? 'multiple' : ''}
                   ${onChange ? `onchange="${onChange}"` : ''}
                   class="hidden">
            <label for="${id}" class="cursor-pointer">
                <div class="text-gray-500">
                    ${Icons.upload}
                    <p class="mt-2">${dragText}</p>
                </div>
            </label>
        </div>
    `;
}

// windowオブジェクトに関数を公開
if (typeof window !== 'undefined') {
    window.setMonochrome = setMonochrome;
    window.createCard = createCard;
    window.createHeaderCard = createHeaderCard;
    window.createStatsCard = createStatsCard;
    window.createItemList = createItemList;
    window.createEmptyState = createEmptyState;
    window.createFormField = createFormField;
    window.createTextArea = createTextArea;
    window.createSearchField = createSearchField;
    window.createSelect = createSelect;
    window.createTagFilter = createTagFilter;
    window.createSettingItem = createSettingItem;
    window.createTabs = createTabs;
    window.createButton = createButton;
    window.createBadge = createBadge;
    window.createModal = createModal;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.createWizardStep = createWizardStep;
    window.createWizard = createWizard;
    window.createProgressBar = createProgressBar;
    window.createFormGroup = createFormGroup;
    window.createCheckboxGroup = createCheckboxGroup;
    window.createRadioGroup = createRadioGroup;
    window.createFileUpload = createFileUpload;
    window.createActionCard = createActionCard;
    window.createMapFilter = createMapFilter;
    window.createMapLegend = createMapLegend;
    window.createMapControls = createMapControls;
    window.Icons = Icons;
}

// アクションカードコンポーネント
function createActionCard(icon, title, description, onClick) {
    return `
        <div class="p-6 border border-border rounded-lg hover:border-blue-300 transition-colors cursor-pointer group" ${onClick ? `onclick="${onClick}"` : ''}>
            <div class="text-4xl mb-3">${icon}</div>
            <h3 class="font-semibold mb-2 group-hover:text-blue-600">${title}</h3>
            <p class="text-sm text-muted-foreground">${description}</p>
        </div>
    `;
}

// マップフィルターコンポーネント
function createMapFilter(options = {}) {
    const {
        containerId = '',
        currentFilter = null,
        filters = [
            { value: 'all', label: '全て' },
            { value: 'local', label: '地域内' },
            { value: 'external', label: '地域外' }
        ]
    } = options;

    return filters.map(filter => {
        const isActive = currentFilter === filter.value || (!currentFilter && filter.value === 'all');
        const activeClass = isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
        
        return `
            <button onclick="toggleMapFilter('${containerId}', '${filter.value}')" 
                    class="px-3 py-1 text-xs rounded ${activeClass}">
                ${filter.label}
            </button>
        `;
    }).join('');
}

// マップレジェンドコンポーネント
function createMapLegend(options = {}) {
    const {
        items = [],
        showCounts = true
    } = options;

    return items.map(item => `
        <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full bg-${item.color}-500"></div>
            <span>${item.label}${showCounts && item.count !== undefined ? ` (${item.count})` : ''}</span>
        </div>
    `).join('');
}

// マップコントロールコンポーネント
function createMapControls(options = {}) {
    const {
        containerId = '',
        currentFilter = null,
        showPeople = true,
        showProjects = true,
        peopleCount = 0,
        projectCount = 0
    } = options;

    return `
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <h3 class="text-lg font-semibold">地域マップ</h3>
                <div class="flex items-center space-x-2 text-sm text-muted-foreground">
                    ${showPeople ? `<span>ネットワーク: ${peopleCount}件</span>` : ''}
                    ${showProjects ? `<span>プロジェクト: ${projectCount}件</span>` : ''}
                </div>
            </div>
            
            <div class="flex items-center space-x-2">
                <div class="flex items-center space-x-1">
                    ${createMapFilter({ containerId, currentFilter })}
                </div>
                
                ${createButton({
                    text: '+ 場所追加',
                    variant: 'primary',
                    size: 'xs',
                    onClick: `openAddLocationModal('${containerId}')`
                })}
            </div>
        </div>
    `;
}