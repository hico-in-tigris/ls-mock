import { SimilarCasesClient } from '../client/similarService.js';
import type { Project, ScoredSimilarCase } from '../lib/similar/types.js';
import { renderSimilarCaseCard } from './SimilarCaseCard.js';

export interface SimilarCasesTabMountOptions {
  readonly container: HTMLElement;
  readonly client: SimilarCasesClient;
  readonly projects: readonly Project[];
  readonly initialProjectId?: string | number;
}

interface TabState {
  readonly selectedProjectId: string | null;
  readonly loading: boolean;
  readonly cases: readonly ScoredSimilarCase[];
  readonly error?: string;
  readonly query?: string;
}

const STORAGE_KEY = 'ls-similar-selected-project';

function persistSelection(projectId: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, projectId);
  } catch {
    // ignore storage failures
  }
}

function readPersistedSelection(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function renderEmptyState(): string {
  return `
    <div class="ls-similar-empty">
      <p>目的・対象・カテゴリを入力すると、より精度の高いレコメンドになります。</p>
      <button type="button" class="ls-similar-edit-btn" data-edit-project>プロジェクト情報を編集</button>
    </div>
  `;
}

function renderLoading(): string {
  return `<div class="ls-similar-loading">類似事例を分析しています…</div>`;
}

function renderError(message: string): string {
  return `<div class="ls-similar-error">${message}</div>`;
}

function renderCases(cases: readonly ScoredSimilarCase[]): string {
  if (cases.length === 0) {
    return renderEmptyState();
  }
  return `
    <div class="ls-similar-grid">
      ${cases.map((item) => renderSimilarCaseCard(item)).join('')}
    </div>
  `;
}

function formatProjectOption(project: Project): string {
  const purpose = project.purpose ?? project.metadata?.purpose ?? '';
  return `${project.title}${purpose ? `｜${purpose}` : ''}`;
}

export function mountSimilarCasesTab(options: SimilarCasesTabMountOptions): void {
  const { container, client, projects } = options;
  if (projects.length === 0) {
    container.innerHTML = renderError('プロジェクトが見つかりませんでした');
    return;
  }

  const initial =
    options.initialProjectId !== undefined
      ? String(options.initialProjectId)
      : readPersistedSelection() ?? String(projects[0].id);

  let state: TabState = {
    selectedProjectId: initial,
    loading: false,
    cases: [],
  };

  const setState = (patch: Partial<TabState>) => {
    state = { ...state, ...patch };
    render();
  };

  const handleProjectChange = (projectId: string) => {
    setState({ selectedProjectId: projectId, loading: true, error: undefined });
    persistSelection(projectId);
    client
      .fetchSimilarCases({ projectId })
      .then((result) => {
        setState({ cases: result.cases, loading: false, query: result.query });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : '類似事例を取得できませんでした';
        setState({ error: message, loading: false, cases: [] });
      });
  };

  const render = () => {
    const selected = state.selectedProjectId ?? String(projects[0].id);
    const selectOptions = projects
      .map(
        (project) =>
          `<option value="${project.id}" ${String(project.id) === selected ? 'selected' : ''}>${formatProjectOption(project)}</option>`,
      )
      .join('');

    container.innerHTML = `
      <section class="ls-similar-tab">
        <header class="ls-similar-tab-header">
          <div>
            <h2>類似事例</h2>
            <p>選択したプロジェクトに近い取り組みをレコメンドします。</p>
          </div>
          <div class="ls-similar-tab-controls">
            <label>
              <span class="ls-similar-select-label">プロジェクト</span>
              <select class="ls-similar-select" data-project-select>
                ${selectOptions}
              </select>
            </label>
            <button type="button" class="ls-similar-refresh" data-refresh>再取得</button>
          </div>
        </header>
        <div class="ls-similar-content">
          ${state.error ? renderError(state.error) : state.loading ? renderLoading() : renderCases(state.cases)}
        </div>
        ${state.query ? `<p class="ls-similar-query">検索クエリ: ${state.query}</p>` : ''}
      </section>
    `;

    const select = container.querySelector<HTMLSelectElement>('[data-project-select]');
    if (select) {
      select.addEventListener('change', (event) => {
        const target = event.target as HTMLSelectElement;
        handleProjectChange(target.value);
      });
    }

    const refresh = container.querySelector<HTMLButtonElement>('[data-refresh]');
    if (refresh) {
      refresh.addEventListener('click', () => {
        if (state.selectedProjectId) {
          handleProjectChange(state.selectedProjectId);
        }
      });
    }

    const editButton = container.querySelector<HTMLButtonElement>('[data-edit-project]');
    if (editButton) {
      editButton.addEventListener('click', () => {
        window.location.hash = '#/projects';
      });
    }

    container.querySelectorAll<HTMLButtonElement>('.ls-similar-action-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.action ?? '保存';
        const card = button.closest('[data-similar-case-id]');
        const caseId = card?.getAttribute('data-similar-case-id');
        const caseTitle = card?.querySelector('.ls-similar-card-title')?.textContent ?? '事例';
        if (caseId) {
          client.notifyAction(action, caseTitle);
        }
      });
    });
  };

  client.installFetchInterceptor();
  handleProjectChange(initial);
}
