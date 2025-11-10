import { handleSimilarCasesRequest } from '../pages/api/similar-cases.js';
import type { CaseFeedback, Project, ScoredSimilarCase, SimilarCase } from '../lib/similar/types.js';

export interface SimilarCasesClientOptions {
  readonly casesUrl: string;
  readonly getProjects: () => readonly Project[];
  readonly storageKey?: string;
}

export interface FetchSimilarCasesParams {
  readonly projectId: string | number;
  readonly limit?: number;
}

export interface SimilarCasesResult {
  readonly cases: readonly ScoredSimilarCase[];
  readonly query: string;
  readonly projectId: string | number;
}

interface FeedbackStorage {
  readonly read: () => CaseFeedback[];
  readonly write: (feedback: readonly CaseFeedback[]) => void;
}

function createLocalStorageAdapter(key: string): FeedbackStorage {
  return {
    read: () => {
      try {
        const payload = localStorage.getItem(key);
        if (!payload) {
          return [];
        }
        const parsed: unknown = JSON.parse(payload);
        if (Array.isArray(parsed)) {
          return parsed.flatMap((item) => {
            if (typeof item === 'object' && item !== null) {
              const { caseId, projectId, vote, submittedAt } = item as Record<string, unknown>;
              if (
                typeof caseId === 'string' &&
                (typeof projectId === 'string' || typeof projectId === 'number') &&
                (vote === 'helpful' || vote === 'meh' || vote === 'irrelevant') &&
                typeof submittedAt === 'string'
              ) {
                return [{ caseId, projectId, vote, submittedAt }];
              }
            }
            return [] as CaseFeedback[];
          });
        }
      } catch {
        // ignore parse errors
      }
      return [];
    },
    write: (feedback: readonly CaseFeedback[]) => {
      try {
        localStorage.setItem(key, JSON.stringify(feedback));
      } catch {
        // ignore write failures
      }
    },
  };
}

export class SimilarCasesClient {
  private readonly casesUrl: string;
  private readonly getProjectsFn: () => readonly Project[];
  private readonly storage: FeedbackStorage;
  private cache: readonly SimilarCase[] | null = null;
  private loadingPromise: Promise<readonly SimilarCase[]> | null = null;
  private fetchInstalled = false;

  constructor(options: SimilarCasesClientOptions) {
    this.casesUrl = options.casesUrl;
    this.getProjectsFn = options.getProjects;
    this.storage = createLocalStorageAdapter(options.storageKey ?? 'ls-similar-feedback');
  }

  private async loadCases(): Promise<readonly SimilarCase[]> {
    if (this.cache) {
      return this.cache;
    }
    if (!this.loadingPromise) {
      this.loadingPromise = fetch(this.casesUrl)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to load cases: ${response.status}`);
          }
          const json = (await response.json()) as unknown;
          if (!Array.isArray(json)) {
            return [] as SimilarCase[];
          }
          const sanitized = json.flatMap((item) => {
            if (typeof item === 'object' && item !== null && typeof (item as { id?: unknown }).id === 'string') {
              return [item as SimilarCase];
            }
            return [] as SimilarCase[];
          });
          this.cache = sanitized;
          return sanitized;
        })
        .finally(() => {
          this.loadingPromise = null;
        });
    }
    return this.loadingPromise;
  }

  private resolveProject(projectId: string | number): Project | undefined {
    const projects = this.getProjectsFn();
    return projects.find((project) => String(project.id) === String(projectId));
  }

  async fetchSimilarCases(params: FetchSimilarCasesParams): Promise<SimilarCasesResult> {
    const cases = await this.loadCases();
    const project = this.resolveProject(params.projectId);
    if (!project) {
      throw new Error(`Project not found: ${params.projectId}`);
    }
    const payload = handleSimilarCasesRequest(
      { projectId: String(params.projectId), limit: params.limit },
      this.getProjectsFn(),
      cases,
    );
    return payload;
  }

  readFeedback(): CaseFeedback[] {
    return this.storage.read();
  }

  private writeFeedback(feedback: readonly CaseFeedback[]): void {
    this.storage.write(feedback);
  }

  async submitFeedback(feedback: Omit<CaseFeedback, 'submittedAt'>): Promise<void> {
    const entry: CaseFeedback = {
      ...feedback,
      submittedAt: new Date().toISOString(),
    };
    const allFeedback = [...this.readFeedback(), entry];
    this.writeFeedback(allFeedback);
  }

  notifyAction(action: string, caseTitle: string): void {
    if (typeof window !== 'undefined') {
      const maybeNotifier = (window as unknown as {
        showNotification?: (message: string, type?: string) => void;
      }).showNotification;
      if (typeof maybeNotifier === 'function') {
        maybeNotifier(`${caseTitle} に対して「${action}」を準備中`, 'info');
        return;
      }
    }
    console.info(`[SimilarCases] ${action} on ${caseTitle}`);
  }

  installFetchInterceptor(): void {
    if (typeof window === 'undefined' || this.fetchInstalled) {
      return;
    }
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const request = input instanceof Request ? input : new Request(input, init);
      const url = new URL(request.url, window.location.origin);
      if (url.pathname === '/api/similar-cases') {
        const projectId = url.searchParams.get('projectId');
        if (!projectId) {
          return new Response(JSON.stringify({ error: 'projectId is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        try {
          const result = await this.fetchSimilarCases({ projectId, limit: Number(url.searchParams.get('limit') ?? '8') });
          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
      if (url.pathname === '/api/case-feedback' && request.method.toUpperCase() === 'POST') {
        try {
          const body = (await request.clone().json()) as unknown;
          if (
            typeof body === 'object' &&
            body !== null &&
            typeof (body as { caseId?: unknown }).caseId === 'string' &&
            ((typeof (body as { projectId?: unknown }).projectId === 'string') ||
              typeof (body as { projectId?: unknown }).projectId === 'number') &&
            ((body as { vote?: unknown }).vote === 'helpful' ||
              (body as { vote?: unknown }).vote === 'meh' ||
              (body as { vote?: unknown }).vote === 'irrelevant')
          ) {
            await this.submitFeedback({
              caseId: (body as { caseId: string }).caseId,
              projectId: (body as { projectId: string | number }).projectId,
              vote: (body as { vote: 'helpful' | 'meh' | 'irrelevant' }).vote,
            });
            return new Response(JSON.stringify({ status: 'ok' }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ error: 'Invalid payload' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
      return originalFetch(request);
    };
    this.fetchInstalled = true;
  }
}

