import { access, mkdir, readFile, writeFile } from 'fs/promises';
import type { CaseFeedback } from '../../lib/similar/types.js';

const DEFAULT_FEEDBACK_PATH = 'public/data/feedback.json';

function dirName(path: string): string {
  const index = path.lastIndexOf('/');
  if (index <= 0) {
    return '.';
  }
  return path.slice(0, index);
}

async function ensureFeedbackFile(path: string): Promise<void> {
  try {
    await access(path);
  } catch {
    await mkdir(dirName(path), { recursive: true });
    await writeFile(path, '[]', { encoding: 'utf8' });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCaseFeedbackArray(value: unknown): value is CaseFeedback[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every((item) => {
    if (!isRecord(item)) {
      return false;
    }
    const { caseId, projectId, vote, submittedAt } = item as Record<string, unknown>;
    return (
      typeof caseId === 'string' &&
      (typeof projectId === 'string' || typeof projectId === 'number') &&
      (vote === 'helpful' || vote === 'meh' || vote === 'irrelevant') &&
      typeof submittedAt === 'string'
    );
  });
}

export async function appendFeedback(feedback: CaseFeedback, path: string = DEFAULT_FEEDBACK_PATH): Promise<void> {
  await ensureFeedbackFile(path);
  const rawContent = await readFile(path, { encoding: 'utf8' });
  const content = typeof rawContent === 'string' ? rawContent : new TextDecoder('utf-8').decode(rawContent);
  const parsed: unknown = content.length ? JSON.parse(content) : [];
  const current = isCaseFeedbackArray(parsed) ? parsed : [];
  const updated = [...current, feedback];
  await writeFile(path, `${JSON.stringify(updated, null, 2)}\n`, { encoding: 'utf8' });
}
