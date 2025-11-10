import { handleSimilarCasesRequest } from '../pages/api/similar-cases.js';
function createLocalStorageAdapter(key) {
    return {
        read: () => {
            try {
                const payload = localStorage.getItem(key);
                if (!payload) {
                    return [];
                }
                const parsed = JSON.parse(payload);
                if (Array.isArray(parsed)) {
                    return parsed.flatMap((item) => {
                        if (typeof item === 'object' && item !== null) {
                            const { caseId, projectId, vote, submittedAt } = item;
                            if (typeof caseId === 'string' &&
                                (typeof projectId === 'string' || typeof projectId === 'number') &&
                                (vote === 'helpful' || vote === 'meh' || vote === 'irrelevant') &&
                                typeof submittedAt === 'string') {
                                return [{ caseId, projectId, vote, submittedAt }];
                            }
                        }
                        return [];
                    });
                }
            }
            catch {
                // ignore parse errors
            }
            return [];
        },
        write: (feedback) => {
            try {
                localStorage.setItem(key, JSON.stringify(feedback));
            }
            catch {
                // ignore write failures
            }
        },
    };
}
export class SimilarCasesClient {
    constructor(options) {
        this.cache = null;
        this.loadingPromise = null;
        this.fetchInstalled = false;
        this.casesUrl = options.casesUrl;
        this.getProjectsFn = options.getProjects;
        this.storage = createLocalStorageAdapter(options.storageKey ?? 'ls-similar-feedback');
    }
    async loadCases() {
        if (this.cache) {
            return this.cache;
        }
        if (!this.loadingPromise) {
            this.loadingPromise = fetch(this.casesUrl)
                .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load cases: ${response.status}`);
                }
                const json = (await response.json());
                if (!Array.isArray(json)) {
                    return [];
                }
                const sanitized = json.flatMap((item) => {
                    if (typeof item === 'object' && item !== null && typeof item.id === 'string') {
                        return [item];
                    }
                    return [];
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
    resolveProject(projectId) {
        const projects = this.getProjectsFn();
        return projects.find((project) => String(project.id) === String(projectId));
    }
    async fetchSimilarCases(params) {
        const cases = await this.loadCases();
        const project = this.resolveProject(params.projectId);
        if (!project) {
            throw new Error(`Project not found: ${params.projectId}`);
        }
        const payload = handleSimilarCasesRequest({ projectId: String(params.projectId), limit: params.limit }, this.getProjectsFn(), cases);
        return payload;
    }
    readFeedback() {
        return this.storage.read();
    }
    writeFeedback(feedback) {
        this.storage.write(feedback);
    }
    async submitFeedback(feedback) {
        const entry = {
            ...feedback,
            submittedAt: new Date().toISOString(),
        };
        const allFeedback = [...this.readFeedback(), entry];
        this.writeFeedback(allFeedback);
    }
    notifyAction(action, caseTitle) {
        if (typeof window !== 'undefined') {
            const maybeNotifier = window.showNotification;
            if (typeof maybeNotifier === 'function') {
                maybeNotifier(`${caseTitle} に対して「${action}」を準備中`, 'info');
                return;
            }
        }
        console.info(`[SimilarCases] ${action} on ${caseTitle}`);
    }
    installFetchInterceptor() {
        if (typeof window === 'undefined' || this.fetchInstalled) {
            return;
        }
        const originalFetch = window.fetch.bind(window);
        window.fetch = async (input, init) => {
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
                }
                catch (error) {
                    return new Response(JSON.stringify({ error: error.message }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
            }
            if (url.pathname === '/api/case-feedback' && request.method.toUpperCase() === 'POST') {
                try {
                    const body = (await request.clone().json());
                    if (typeof body === 'object' &&
                        body !== null &&
                        typeof body.caseId === 'string' &&
                        ((typeof body.projectId === 'string') ||
                            typeof body.projectId === 'number') &&
                        (body.vote === 'helpful' ||
                            body.vote === 'meh' ||
                            body.vote === 'irrelevant')) {
                        await this.submitFeedback({
                            caseId: body.caseId,
                            projectId: body.projectId,
                            vote: body.vote,
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
                }
                catch (error) {
                    return new Response(JSON.stringify({ error: error.message }), {
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
