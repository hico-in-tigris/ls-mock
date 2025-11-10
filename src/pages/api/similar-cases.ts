import { scoreSimilarCases, buildProjectQueryText } from '../../lib/similar/scoring.js';
import type {
  Project,
  ScoredSimilarCase,
  SimilarCase,
  SimilarCaseQueryOptions,
} from '../../lib/similar/types.js';

export interface SimilarCasesPayload {
  readonly cases: readonly ScoredSimilarCase[];
  readonly projectId: string | number;
  readonly query: string;
}

export class MissingProjectError extends Error {
  constructor(projectId: string) {
    super(`Project not found: ${projectId}`);
    this.name = 'MissingProjectError';
  }
}

export interface SimilarCasesParams {
  readonly projectId: string;
  readonly limit?: number;
}

export function computeSimilarCases(
  project: Project,
  cases: readonly SimilarCase[],
  options: SimilarCaseQueryOptions = {},
): SimilarCasesPayload {
  const scored = scoreSimilarCases(project, cases, options);
  return {
    cases: scored,
    projectId: project.id,
    query: buildProjectQueryText(project),
  };
}

export function handleSimilarCasesRequest(
  params: SimilarCasesParams,
  projects: readonly Project[],
  cases: readonly SimilarCase[],
): SimilarCasesPayload {
  const project = projects.find((item) => String(item.id) === String(params.projectId));
  if (!project) {
    throw new MissingProjectError(params.projectId);
  }
  const options: SimilarCaseQueryOptions = { limit: params.limit };
  return computeSimilarCases(project, cases, options);
}
