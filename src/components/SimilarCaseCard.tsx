import type { ScoredSimilarCase } from '../lib/similar/types.js';

export interface SimilarCaseCardOptions {
  readonly variant?: 'full' | 'compact';
  readonly showActions?: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function truncate(text: string, min: number, max: number): string {
  if (text.length <= max) {
    return text.length < min ? text : text;
  }
  return `${text.slice(0, max)}…`;
}

function renderTags(tags: readonly string[] | undefined, limit: number): string {
  if (!tags || tags.length === 0) {
    return '';
  }
  return tags
    .slice(0, limit)
    .map((tag) => `<span class="ls-similar-tag">${escapeHtml(tag)}</span>`)
    .join('');
}

function formatKpi(kpi: Record<string, number> | undefined): string | null {
  if (!kpi) {
    return null;
  }
  const first = Object.keys(kpi)[0];
  if (!first) {
    return null;
  }
  const value = kpi[first];
  return `${first}: ${value}`;
}

function renderExplanation(explanation: readonly string[]): string {
  if (explanation.length === 0) {
    return '';
  }
  return `
    <ul class="ls-similar-explanation">
      ${explanation
        .slice(0, 2)
        .map((line) => `<li>• ${escapeHtml(line)}</li>`)
        .join('')}
    </ul>
  `;
}

function renderActions(caseData: ScoredSimilarCase): string {
  return `
    <div class="ls-similar-actions" data-case-actions="${escapeHtml(caseData.id)}">
      ${['保存', '共有', '詳細', '比較に追加']
        .map(
          (label) => `
            <button type="button" class="ls-similar-action-btn" data-action="${escapeHtml(label)}">
              ${escapeHtml(label)}
            </button>
          `,
        )
        .join('')}
    </div>
  `;
}

function renderMeta(caseData: ScoredSimilarCase): string {
  const parts: string[] = [];
  if (caseData.region) {
    parts.push(caseData.region);
  }
  if (caseData.year) {
    parts.push(`${caseData.year}年`);
  }
  if (caseData.duration) {
    parts.push(caseData.duration);
  }
  return parts.join(' / ');
}

export function renderSimilarCaseCard(caseData: ScoredSimilarCase, options: SimilarCaseCardOptions = {}): string {
  const variant = options.variant ?? 'full';
  const summary = truncate(caseData.summary, 140, 180);
  const kpiText = formatKpi(caseData.kpi);
  const explanation = renderExplanation(caseData.explanation);
  const meta = renderMeta(caseData);

  if (variant === 'compact') {
    return `
      <article class="ls-similar-card ls-similar-card-compact" data-similar-case-id="${escapeHtml(caseData.id)}">
        <div class="ls-similar-card-header">
          <h4 class="ls-similar-card-title">${escapeHtml(caseData.title)}</h4>
          <span class="ls-similar-card-score">${caseData.score.toFixed(2)}</span>
        </div>
        <p class="ls-similar-card-summary">${escapeHtml(summary)}</p>
        <div class="ls-similar-card-meta">
          <span>${escapeHtml(meta)}</span>
          ${kpiText ? `<span class="ls-similar-kpi">${escapeHtml(kpiText)}</span>` : ''}
        </div>
        ${explanation}
      </article>
    `;
  }

  return `
    <article class="ls-similar-card" data-similar-case-id="${escapeHtml(caseData.id)}">
      <div class="ls-similar-card-header">
        <div>
          <h3 class="ls-similar-card-title">${escapeHtml(caseData.title)}</h3>
          <p class="ls-similar-card-summary">${escapeHtml(summary)}</p>
        </div>
        <div class="ls-similar-card-score">
          <span class="ls-similar-score-label">適合度</span>
          <span class="ls-similar-score-value">${caseData.score.toFixed(2)}</span>
        </div>
      </div>
      <div class="ls-similar-card-tags">
        ${renderTags(caseData.tags, 3)}
      </div>
      <div class="ls-similar-card-meta">
        <span>${escapeHtml(meta)}</span>
        ${kpiText ? `<span class="ls-similar-kpi">${escapeHtml(kpiText)}</span>` : ''}
        ${caseData.quality_score ? `<span class="ls-similar-quality">品質 ${Math.round(caseData.quality_score * 100)}%</span>` : ''}
      </div>
      ${explanation}
      ${options.showActions === false ? '' : renderActions(caseData)}
    </article>
  `;
}
