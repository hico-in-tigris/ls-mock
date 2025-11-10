import { renderSimilarCaseCard } from './SimilarCaseCard';
function renderPanelCases(cases) {
    if (cases.length === 0) {
        return '<p class="ls-similar-panel-empty">該当する事例が見つかりませんでした</p>';
    }
    return cases
        .slice(0, 3)
        .map((item) => renderSimilarCaseCard(item, { variant: 'compact', showActions: false }))
        .join('');
}
export function mountSimilarCasesPanel(options) {
    const { container, client, projectId } = options;
    let state = {
        loading: true,
        cases: [],
    };
    const setState = (patch) => {
        state = { ...state, ...patch };
        render();
    };
    const render = () => {
        container.innerHTML = `
      <section class="ls-similar-panel">
        <header class="ls-similar-panel-header">
          <h3>関連する類似事例</h3>
          <button type="button" class="ls-similar-panel-link" data-open-dashboard>すべて見る</button>
        </header>
        <div class="ls-similar-panel-content">
          ${state.error ? `<p class="ls-similar-panel-error">${state.error}</p>` : state.loading ? '<p class="ls-similar-panel-loading">読み込み中…</p>' : renderPanelCases(state.cases)}
        </div>
      </section>
    `;
        const link = container.querySelector('[data-open-dashboard]');
        if (link) {
            link.addEventListener('click', () => {
                window.location.hash = '#/dashboard';
            });
        }
    };
    client
        .fetchSimilarCases({ projectId, limit: 3 })
        .then((result) => {
        setState({ cases: result.cases, loading: false });
    })
        .catch((error) => {
        const message = error instanceof Error ? error.message : '類似事例を取得できませんでした';
        setState({ error: message, loading: false, cases: [] });
    });
    render();
}
