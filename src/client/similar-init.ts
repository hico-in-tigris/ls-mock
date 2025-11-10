import { SimilarCasesClient } from './similarService.js';
import { mountSimilarCasesTab } from '../components/SimilarCasesTab.js';
import { mountSimilarCasesPanel } from '../components/SimilarCasesPanel.js';
import type { Project } from '../lib/similar/types.js';

interface WindowWithState {
  readonly appState?: { readonly projects?: readonly Project[] };
  readonly sampleData?: { readonly projects?: readonly Project[] };
  LSSimilar?: SimilarCasesRuntime;
}

export interface MountTabArgs {
  readonly container: HTMLElement;
  readonly initialProjectId?: string | number;
}

export interface MountPanelArgs {
  readonly container: HTMLElement;
  readonly projectId: string | number;
}

export interface SimilarCasesRuntime {
  readonly client: SimilarCasesClient;
  readonly mountTab: (args: MountTabArgs) => void;
  readonly mountPanel: (args: MountPanelArgs) => void;
}

function collectProjects(windowRef: WindowWithState): readonly Project[] {
  const fromState = windowRef.appState?.projects;
  if (fromState && fromState.length > 0) {
    return fromState;
  }
  const fromSample = windowRef.sampleData?.projects;
  return fromSample ?? [];
}

function createRuntime(client: SimilarCasesClient, windowRef: WindowWithState): SimilarCasesRuntime {
  return {
    client,
    mountTab: (args: MountTabArgs) => {
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
    mountPanel: (args: MountPanelArgs) => {
      const projects = collectProjects(windowRef);
      if (!projects.some((project) => String(project.id) === String(args.projectId))) {
        args.container.innerHTML = '<p class="ls-similar-panel-error">プロジェクト情報がありません</p>';
        return;
      }
      mountSimilarCasesPanel({ container: args.container, client, projectId: args.projectId });
    },
  };
}

function init(): void {
  const windowRef = window as WindowWithState;
  const client = new SimilarCasesClient({
    casesUrl: '/public/data/cases.json',
    getProjects: () => collectProjects(windowRef),
    storageKey: 'ls-similar-feedback',
  });
  client.installFetchInterceptor();

  const runtime = createRuntime(client, windowRef);
  windowRef.LSSimilar = runtime;

  document.dispatchEvent(
    new CustomEvent('ls-similar-ready', {
      detail: { client },
    }),
  );
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}
