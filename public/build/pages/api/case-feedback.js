import { access, mkdir, readFile, writeFile } from 'fs/promises';
const DEFAULT_FEEDBACK_PATH = 'public/data/feedback.json';
function dirName(path) {
    const index = path.lastIndexOf('/');
    if (index <= 0) {
        return '.';
    }
    return path.slice(0, index);
}
async function ensureFeedbackFile(path) {
    try {
        await access(path);
    }
    catch {
        await mkdir(dirName(path), { recursive: true });
        await writeFile(path, '[]', { encoding: 'utf8' });
    }
}
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
function isCaseFeedbackArray(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    return value.every((item) => {
        if (!isRecord(item)) {
            return false;
        }
        const { caseId, projectId, vote, submittedAt } = item;
        return (typeof caseId === 'string' &&
            (typeof projectId === 'string' || typeof projectId === 'number') &&
            (vote === 'helpful' || vote === 'meh' || vote === 'irrelevant') &&
            typeof submittedAt === 'string');
    });
}
export async function appendFeedback(feedback, path = DEFAULT_FEEDBACK_PATH) {
    await ensureFeedbackFile(path);
    const rawContent = await readFile(path, { encoding: 'utf8' });
    const content = typeof rawContent === 'string' ? rawContent : new TextDecoder('utf-8').decode(rawContent);
    const parsed = content.length ? JSON.parse(content) : [];
    const current = isCaseFeedbackArray(parsed) ? parsed : [];
    const updated = [...current, feedback];
    await writeFile(path, `${JSON.stringify(updated, null, 2)}\n`, { encoding: 'utf8' });
}
