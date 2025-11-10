const TOKEN_REGEX = /[\p{Letter}\p{Number}]+/gu;
const FINAL_WEIGHTS = {
    bm25: 0.5,
    cosine: 0.4,
    rule: 0.1,
};
function normalizeWhitespace(value) {
    return value.replace(/\s+/g, ' ').trim();
}
function toLower(value) {
    return value.toLowerCase();
}
export function tokenize(value) {
    if (!value) {
        return [];
    }
    const matches = value.match(TOKEN_REGEX);
    if (!matches) {
        return [];
    }
    return matches.map((token) => toLower(token));
}
function uniqueTokens(tokens) {
    return Array.from(new Set(tokens));
}
function joinNonEmpty(values) {
    return values
        .map((value) => (value ? normalizeWhitespace(value) : ''))
        .filter((value) => value.length > 0)
        .join(' ');
}
function fallbackSummary(project) {
    const candidates = [
        project.summary,
        project.details?.summary,
        project.description,
        project.details?.description,
        project.scope,
        project.approach,
    ];
    const summary = candidates.find((value) => value && value.trim().length > 0);
    return summary ?? project.title;
}
function projectTags(project) {
    const explicitTags = project.tags ?? [];
    const extractedFromText = project.tagsText ? tokenize(project.tagsText) : [];
    return uniqueTokens([...explicitTags.map(toLower), ...extractedFromText]);
}
function caseTags(candidate) {
    return uniqueTokens((candidate.tags ?? []).map(toLower));
}
function buildProjectQuery(project) {
    const summary = fallbackSummary(project);
    return joinNonEmpty([
        project.purpose ?? project.metadata?.purpose,
        project.audience ?? project.metadata?.audience,
        project.category ?? project.metadata?.category,
        project.region ?? project.metadata?.region ?? project.location?.region,
        project.duration ?? project.durationLabel,
        project.budget_range ?? project.budgetRange,
        project.tags ? project.tags.join(' ') : undefined,
        summary,
        project.title,
    ]);
}
function buildCaseDocument(candidate) {
    return joinNonEmpty([
        candidate.title,
        candidate.summary,
        candidate.tags ? candidate.tags.join(' ') : undefined,
        candidate.purpose,
        candidate.audience,
        candidate.category,
        candidate.region,
    ]);
}
function bm25Like(queryTokens, documentTokens) {
    if (queryTokens.length === 0 || documentTokens.length === 0) {
        return { score: 0, matchedTokens: [] };
    }
    const querySet = new Set(queryTokens);
    const documentCounts = new Map();
    for (const token of documentTokens) {
        documentCounts.set(token, (documentCounts.get(token) ?? 0) + 1);
    }
    const matched = new Set();
    let scoreAccumulator = 0;
    for (const token of querySet) {
        const occurrences = documentCounts.get(token);
        if (occurrences) {
            matched.add(token);
            scoreAccumulator += Math.min(occurrences, 3);
        }
    }
    const normalizer = Math.max(querySet.size, 1);
    const score = scoreAccumulator / (normalizer * 3);
    return { score: Math.min(score, 1), matchedTokens: Array.from(matched) };
}
function jaccardOverlap(a, b) {
    if (a.size === 0 || b.size === 0) {
        return 0;
    }
    let intersection = 0;
    for (const token of a) {
        if (b.has(token)) {
            intersection += 1;
        }
    }
    const union = a.size + b.size - intersection;
    return intersection / union;
}
function intersectTokens(a, b) {
    const intersection = [];
    for (const token of a) {
        if (b.has(token)) {
            intersection.push(token);
        }
    }
    return intersection;
}
function cosineLike(queryTokens, documentTokens, projectTagTokens, caseTagTokens) {
    const querySet = new Set(queryTokens);
    const documentSet = new Set(documentTokens);
    const textOverlap = jaccardOverlap(querySet, documentSet);
    const projectTagSet = new Set(projectTagTokens);
    const caseTagSet = new Set(caseTagTokens);
    const tagOverlap = jaccardOverlap(projectTagSet, caseTagSet);
    const weightTag = projectTagSet.size > 0 && caseTagSet.size > 0 ? 0.4 : 0;
    const weightText = 1 - weightTag;
    const score = textOverlap * weightText + tagOverlap * weightTag;
    return {
        score,
        textOverlap,
        tagOverlap,
        textTokens: intersectTokens(querySet, documentSet),
        tagTokens: intersectTokens(projectTagSet, caseTagSet),
    };
}
function overlapScore(a, b) {
    if (!a || !b) {
        return 0;
    }
    const tokensA = new Set(tokenize(a));
    const tokensB = new Set(tokenize(b));
    if (tokensA.size === 0 || tokensB.size === 0) {
        return 0;
    }
    const intersection = intersectTokens(tokensA, tokensB).length;
    const normalizer = Math.max(tokensA.size, tokensB.size, 1);
    return intersection / normalizer;
}
function compareLoose(a, b) {
    if (!a || !b) {
        return false;
    }
    const normalizedA = toLower(normalizeWhitespace(a));
    const normalizedB = toLower(normalizeWhitespace(b));
    return normalizedA.includes(normalizedB) || normalizedB.includes(normalizedA);
}
function durationIsClose(projectDuration, caseDuration) {
    if (!projectDuration || !caseDuration) {
        return false;
    }
    const normalizedProject = toLower(projectDuration);
    const normalizedCase = toLower(caseDuration);
    if (normalizedProject === normalizedCase) {
        return true;
    }
    const digitsProject = normalizedProject.replace(/[^0-9]/g, '');
    const digitsCase = normalizedCase.replace(/[^0-9]/g, '');
    if (digitsProject && digitsCase && digitsProject === digitsCase) {
        return true;
    }
    return overlapScore(normalizedProject, normalizedCase) >= 0.5;
}
function budgetIsClose(projectBudget, caseBudget) {
    if (!projectBudget || !caseBudget) {
        return false;
    }
    const normalizedProject = toLower(projectBudget);
    const normalizedCase = toLower(caseBudget);
    if (normalizedProject === normalizedCase) {
        return true;
    }
    const digitsProject = normalizedProject.replace(/[^0-9~\-]/g, '');
    const digitsCase = normalizedCase.replace(/[^0-9~\-]/g, '');
    if (digitsProject && digitsCase && digitsProject === digitsCase) {
        return true;
    }
    return overlapScore(normalizedProject, normalizedCase) >= 0.4;
}
function hasKpi(candidate) {
    const kpi = candidate.kpi;
    if (!kpi) {
        return false;
    }
    return Object.keys(kpi).length > 0;
}
function isRecent(candidate) {
    if (!candidate.year) {
        return false;
    }
    const now = new Date().getFullYear();
    return candidate.year >= now - 1;
}
function createComponent(key, weight, label) {
    return { key, weight, label };
}
function ruleBoost(project, candidate) {
    let score = 0;
    const components = [];
    const purposeOverlap = Math.max(overlapScore(project.purpose, candidate.purpose), overlapScore(project.metadata?.purpose, candidate.purpose));
    if (purposeOverlap >= 0.4) {
        score += 0.3;
        components.push(createComponent('purposeMatch', 0.3, `目的が近い (${candidate.purpose ?? ''})`));
    }
    const audienceOverlap = Math.max(overlapScore(project.audience, candidate.audience), overlapScore(project.metadata?.audience, candidate.audience));
    if (audienceOverlap >= 0.5) {
        score += 0.2;
        components.push(createComponent('audienceMatch', 0.2, `対象が類似 (${candidate.audience ?? ''})`));
    }
    const categoryOverlap = overlapScore(project.category ?? project.metadata?.category, candidate.category);
    if (categoryOverlap >= 0.5) {
        score += 0.15;
        components.push(createComponent('categoryMatch', 0.15, `カテゴリ一致 (${candidate.category ?? ''})`));
    }
    const regionMatch = compareLoose(project.region ?? project.location?.region, candidate.region);
    if (regionMatch) {
        score += 0.1;
        components.push(createComponent('regionMatch', 0.1, `同じ地域 (${candidate.region ?? ''})`));
    }
    const durationMatch = durationIsClose(project.duration ?? project.durationLabel, candidate.duration);
    if (durationMatch) {
        score += 0.1;
        components.push(createComponent('durationClose', 0.1, `実施期間が近い (${candidate.duration ?? ''})`));
    }
    const budgetMatch = budgetIsClose(project.budget_range ?? project.budgetRange, candidate.budget_range);
    if (budgetMatch) {
        score += 0.1;
        components.push(createComponent('budgetClose', 0.1, `予算規模が近い (${candidate.budget_range ?? ''})`));
    }
    if (hasKpi(candidate)) {
        score += 0.1;
        components.push(createComponent('kpiAvailable', 0.1, 'KPIが定義されている'));
    }
    if (isRecent(candidate)) {
        score += 0.1;
        components.push(createComponent('recent', 0.1, '直近1年以内の事例'));
    }
    return { score: Math.min(score, 1), components };
}
function buildBreakdown(bm25, cosine, rule) {
    const components = [...rule.components];
    if (cosine.tagOverlap > 0 && cosine.tagTokens.length > 0) {
        const tags = cosine.tagTokens.slice(0, 3).map((token) => token).join(', ');
        components.push(createComponent('tagOverlap', cosine.tagOverlap, `共通タグ: ${tags}`));
    }
    if (cosine.textOverlap > 0 && cosine.textTokens.length > 0) {
        const keywords = cosine.textTokens.slice(0, 3).join(', ');
        components.push(createComponent('summaryOverlap', cosine.textOverlap, `概要キーワード一致: ${keywords}`));
    }
    if (bm25.matchedTokens.length > 0) {
        const tokens = bm25.matchedTokens.slice(0, 3).join(', ');
        components.push(createComponent('titleOverlap', Math.min(0.3, bm25.score), `注目キーワード: ${tokens}`));
    }
    return {
        bm25: bm25.score,
        cosine: cosine.score,
        rule: rule.score,
        components,
    };
}
function explanationFromComponents(components) {
    const sorted = [...components].sort((a, b) => b.weight - a.weight);
    return sorted.slice(0, 2).map((component) => component.label);
}
export function scoreSimilarCases(project, candidates, options = {}) {
    const query = buildProjectQuery(project);
    const queryTokens = tokenize(query);
    const projectTagTokens = projectTags(project);
    const scored = candidates.map((candidate) => {
        const documentTokens = tokenize(buildCaseDocument(candidate));
        const candidateTagTokens = caseTags(candidate);
        const bm25 = bm25Like(queryTokens, documentTokens);
        const cosine = cosineLike(queryTokens, documentTokens, projectTagTokens, candidateTagTokens);
        const rule = ruleBoost(project, candidate);
        const breakdown = buildBreakdown(bm25, cosine, rule);
        const score = FINAL_WEIGHTS.bm25 * bm25.score + FINAL_WEIGHTS.cosine * cosine.score + FINAL_WEIGHTS.rule * rule.score;
        return {
            ...candidate,
            score,
            explanation: explanationFromComponents(breakdown.components),
            breakdown,
        };
    });
    const sorted = scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({ ...item, rank: index + 1 }));
    const limit = options.limit ?? 8;
    return sorted.slice(0, limit);
}
export function buildProjectQueryText(project) {
    return buildProjectQuery(project);
}
