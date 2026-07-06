/**
 * ai-ranking.test.js — Track B 랭킹·정책·로컬 프로바이더 계약 (§B-5).
 */
const { cosine, maxPool, rankCandidates, decideMode, capMode } = require('../services/ai/ranking');
const LocalColorProvider = require('../services/ai/LocalColorProvider');
const sharp = require('sharp');

const norm = (v) => { const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1; return v.map(x => x / n); };

describe('cosine / maxPool', () => {
  test('동일 정규화 벡터 = 1', () => {
    const a = norm([1, 2, 3, 4]);
    expect(cosine(a, a)).toBeCloseTo(1, 6);
  });
  test('길이 다르면 0', () => expect(cosine([1, 0], [1, 0, 0])).toBe(0));
  test('직교 = 0', () => expect(cosine([1, 0], [0, 1])).toBeCloseTo(0, 6));
  test('maxPool 은 가장 닮은 레퍼런스', () => {
    const q = norm([1, 0, 0]);
    const refs = [norm([0, 1, 0]), norm([0.9, 0.1, 0]), norm([0.2, 0.8, 0])];
    expect(maxPool(q, refs)).toBeCloseTo(cosine(q, norm([0.9, 0.1, 0])), 6);
  });
  test('레퍼런스 없으면 0', () => expect(maxPool([1, 0], [])).toBe(0));
});

describe('rankCandidates', () => {
  const q = norm([1, 0, 0]);
  const refs = new Map([
    [10, [norm([0.99, 0.01, 0])]],  // 매우 닮음
    [20, [norm([0.2, 0.9, 0])]],    // 덜 닮음
  ]);
  const cands = [
    { product_id: 20, order_id: 2, item_index: 0, comp_index: null, ageMin: 0 },
    { product_id: 10, order_id: 1, item_index: 0, comp_index: null, ageMin: 0 },
  ];
  test('fused 내림차순 정렬 — 닮은 게 1위', () => {
    const r = rankCandidates(q, cands, refs);
    expect(r[0].product_id).toBe(10);
    expect(r[0].fused_score).toBeGreaterThan(r[1].fused_score);
  });
  test('FIFO time prior 가점(오래 기다린 쪽)', () => {
    const same = [
      { product_id: 10, order_id: 1, item_index: 0, ageMin: 0 },
      { product_id: 10, order_id: 2, item_index: 0, ageMin: 20 },
    ];
    const r = rankCandidates(q, same, refs);
    // img 동일 → time_score 높은 order 2 가 위
    expect(r[0].order_id).toBe(2);
  });
});

describe('decideMode 정책 + 로컬 캡', () => {
  const mk = (score, pid = 1, oid = 1) => ({ product_id: pid, order_id: oid, fused_score: score });
  test('후보 0 → no_candidates', () => expect(decideMode([]).mode).toBe('no_candidates'));
  test('>=0.95 는 vertex(auto 허용)면 auto', () => expect(decideMode([mk(0.97)], 'auto').mode).toBe('auto'));
  test('로컬 캡: 0.97 여도 recommend 로 강등(auto 금지)', () => expect(decideMode([mk(0.97)], 'recommend').mode).toBe('recommend'));
  test('0.90~0.95 → recommend', () => expect(decideMode([mk(0.92)], 'auto').mode).toBe('recommend'));
  test('0.80~0.90 → pick', () => expect(decideMode([mk(0.85)], 'auto').mode).toBe('pick'));
  test('<0.80 → reshoot', () => expect(decideMode([mk(0.5)], 'auto').mode).toBe('reshoot'));
  test('동일 메뉴 다중 주문 → 무조건 pick(고확신이어도)', () => {
    const r = decideMode([mk(0.99, 5, 1), mk(0.98, 5, 2)], 'auto');
    expect(r.mode).toBe('pick');
  });
  test('capMode: auto→recommend, 약한 건 유지', () => {
    expect(capMode('auto', 'recommend')).toBe('recommend');
    expect(capMode('pick', 'recommend')).toBe('pick');
  });
});

describe('LocalColorProvider 결정성·유사도 계약', () => {
  const solid = (r, g, b) => sharp({ create: { width: 96, height: 96, channels: 3, background: { r, g, b } } }).jpeg().toBuffer();
  const prov = new LocalColorProvider();

  test('차원 288 · L2 정규화', async () => {
    const v = await prov.embedImage(await solid(200, 50, 50));
    expect(v.length).toBe(288);
    const n = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    expect(n).toBeCloseTo(1, 3);
  });
  test('같은 이미지 → 유사도 1.0 (결정적)', async () => {
    const buf = await solid(30, 160, 90);
    const a = await prov.embedImage(buf);
    const b = await prov.embedImage(buf);
    expect(cosine(a, b)).toBeCloseTo(1, 5);
  });
  test('색이 다른 이미지 → 유사도 하락(구분됨)', async () => {
    const red = await prov.embedImage(await solid(220, 30, 30));
    const blue = await prov.embedImage(await solid(30, 30, 220));
    expect(cosine(red, blue)).toBeLessThan(0.9);
  });
  test('maxMode = recommend (auto 금지)', () => expect(prov.maxMode).toBe('recommend'));
});
