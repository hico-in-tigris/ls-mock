import { SimilarCasesClient } from './similarService.js';
import { mountSimilarCasesTab } from '../components/SimilarCasesTab.js';
import { mountSimilarCasesPanel } from '../components/SimilarCasesPanel.js';
function collectProjects(windowRef) {
    const fromState = windowRef.appState?.projects;
    if (fromState && fromState.length > 0) {
        return fromState;
    }
    const fromSample = windowRef.sampleData?.projects;
    return fromSample ?? [];
}
function createRuntime(client, windowRef) {
    return {
        client,
        mountTab: (args) => {
            const projects = collectProjects(windowRef);
            if (projects.length === 0) {
                args.container.innerHTML = '<p class="ls-similar-error">プロジェクトが見つかりませんでした</p>';
                return;
            }
            mountSimilarCasesTab({
                container: args.container,
                client,
                projects,
                initialProjectId: args.initialProjectId,
            });
        },
        mountPanel: (args) => {
            const projects = collectProjects(windowRef);
            if (!projects.some((project) => String(project.id) === String(args.projectId))) {
                args.container.innerHTML = '<p class="ls-similar-panel-error">プロジェクト情報がありません</p>';
                return;
            }
            mountSimilarCasesPanel({ container: args.container, client, projectId: args.projectId });
        },
    };
}
function init() {
    const windowRef = window;
    const client = new SimilarCasesClient({
        casesUrl: '/public/data/cases.json',
        getProjects: () => collectProjects(windowRef),
        storageKey: 'ls-similar-feedback',
    });
    client.installFetchInterceptor();
    const runtime = createRuntime(client, windowRef);
    windowRef.LSSimilar = runtime;
    document.dispatchEvent(new CustomEvent('ls-similar-ready', {
        detail: { client },
    }));
}
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    }
    else {
        init();
    }
}
