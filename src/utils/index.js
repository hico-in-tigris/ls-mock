
/**
 * ページ名からURLを生成する
 * @param {string} pageName - ページ名
 * @returns {string} URLパス
 */
export function createPageUrl(pageName) {
    return '/' + pageName.toLowerCase().replace(/ /g, '-');
}