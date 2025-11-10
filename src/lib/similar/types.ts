export interface ProjectLocation {
  readonly region?: string;
}

export interface ProjectMetadata {
  readonly audience?: string;
  readonly category?: string;
  readonly region?: string;
  readonly purpose?: string;
}

export interface ProjectDetails {
  readonly summary?: string;
  readonly description?: string;
}

export interface Project {
  readonly id: string | number;
  readonly title: string;
  readonly purpose?: string;
  readonly audience?: string;
  readonly category?: string;
  readonly region?: string;
  readonly duration?: string;
  readonly budget_range?: string;
  readonly budgetRange?: string;
  readonly durationLabel?: string;
  readonly tags?: string[];
  readonly tagsText?: string;
  readonly summary?: string;
  readonly description?: string;
  readonly scope?: string;
  readonly approach?: string;
  readonly metadata?: ProjectMetadata;
  readonly details?: ProjectDetails;
  readonly location?: ProjectLocation;
  readonly createdAt?: string;
  readonly completedAt?: string | null;
}

export interface SimilarCaseKpi {
  readonly [metric: string]: number;
}

export interface SimilarCase {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly tags?: string[];
  readonly purpose?: string;
  readonly audience?: string;
  readonly category?: string;
  readonly region?: string;
  readonly duration?: string;
  readonly budget_range?: string;
  readonly kpi?: SimilarCaseKpi;
  readonly year?: number;
  readonly owner?: string;
  readonly link?: string;
  readonly quality_score?: number;
  readonly embedding?: readonly number[];
}

export type ScoreComponentKey =
  | 'purposeMatch'
  | 'audienceMatch'
  | 'categoryMatch'
  | 'regionMatch'
  | 'durationClose'
  | 'budgetClose'
  | 'kpiAvailable'
  | 'recent'
  | 'tagOverlap'
  | 'summaryOverlap'
  | 'titleOverlap';

export interface ScoreComponent {
  readonly key: ScoreComponentKey;
  readonly weight: number;
  readonly label: string;
}

export interface SimilarCaseScoreBreakdown {
  readonly bm25: number;
  readonly cosine: number;
  readonly rule: number;
  readonly components: readonly ScoreComponent[];
}

export interface ScoredSimilarCase extends SimilarCase {
  readonly score: number;
  readonly rank: number;
  readonly explanation: readonly string[];
  readonly breakdown: SimilarCaseScoreBreakdown;
}

export interface CaseFeedback {
  readonly caseId: string;
  readonly projectId: string | number;
  readonly vote: 'helpful' | 'meh' | 'irrelevant';
  readonly submittedAt: string;
}

export interface SimilarCaseQueryOptions {
  readonly limit?: number;
}
