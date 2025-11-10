import test from 'node:test';
import assert from 'node:assert/strict';

import { scoreSimilarCases, buildProjectQueryText } from '../../public/build/lib/similar/scoring.js';

const sampleProject = {
  id: 1,
  title: '移住促進プログラムv2',
  purpose: 'UI/UXを改善し、移住相談から定住までの期間を短縮する',
  audience: '移住希望者',
  category: '移住支援',
  region: '北海道・後志',
  duration: '2日',
  budget_range: '〜50万円',
  tags: ['#移住相談', '#UI改善'],
  summary: '移住相談をオンラインとオフラインで統合し、関係人口を増やす取り組み',
};

const candidateCases = [
  {
    id: 'case_a',
    title: '移住UI改善ワークショップ',
    summary: 'UI改善と相談導線の再設計で移住希望者の不安を軽減した2日間の集中プログラム',
    tags: ['移住相談', 'ワークショップ'],
    purpose: '関係人口創出',
    audience: '移住希望者',
    region: '北海道・後志',
    duration: '2日',
    budget_range: '〜50万円',
    kpi: { participants: 25 },
    year: new Date().getFullYear(),
    embedding: [],
  },
  {
    id: 'case_b',
    title: '農業体験キャンプ',
    summary: '都市部の親子を対象にした農業体験キャンプで関係人口を拡大',
    tags: ['農業', '親子'],
    purpose: '交流人口拡大',
    audience: '親子',
    region: '北海道',
    duration: '3日',
    budget_range: '50–150万円',
    embedding: [],
  },
];

test('scoreSimilarCases ranks the most relevant case first', () => {
  const results = scoreSimilarCases(sampleProject, candidateCases, { limit: 2 });
  const [top, second] = results;
  assert.equal(top.id, 'case_a');
  if (second) {
    assert.ok(top.score >= second.score, 'top case should score higher than alternatives');
  } else {
    assert.ok(top.score > 0);
  }
  assert.ok(top.explanation.length > 0, 'explanation should be generated');
});

test('scoreSimilarCases respects limit', () => {
  const results = scoreSimilarCases(sampleProject, candidateCases, { limit: 1 });
  assert.equal(results.length, 1);
});

test('buildProjectQueryText includes key fields', () => {
  const query = buildProjectQueryText(sampleProject);
  assert.ok(query.includes('移住相談')); 
  assert.ok(query.includes('北海道・後志'));
});
