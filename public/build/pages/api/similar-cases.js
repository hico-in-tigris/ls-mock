import { scoreSimilarCases, buildProjectQueryText } from '../../lib/similar/scoring.js';
export class MissingProjectError extends Error {
    constructor(projectId) {
        super(`Project not found: ${projectId}`);
        this.name = 'MissingProjectError';
    }
}
export function computeSimilarCases(project, cases, options = {}) {
    const scored = scoreSimilarCases(project, cases, options);
    return {
        cases: scored,
        projectId: project.id,
        query: buildProjectQueryText(project),
    };
}
export function handleSimilarCasesRequest(params, projects, cases) {
    const project = projects.find((item) => String(item.id) === String(params.projectId));
    if (!project) {
        throw new MissingProjectError(params.projectId);
    }
    const options = { limit: params.limit };
    return computeSimilarCases(project, cases, options);
}
