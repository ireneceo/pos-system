/**
 * services/ai/index.js — 비전 프로바이더 팩토리 + 랭킹 재노출 (Track B).
 *
 * env AI_VISION_PROVIDER (기본 'local-color'). 'vertex' 선택 시 키 미설정이면 경고 1회 후
 * local-color 폴백 — B1(키 0개)에서도 항상 동작. 설계: §B-2.
 */
const LocalColorProvider = require('./LocalColorProvider');
const VertexEmbeddingProvider = require('./VertexEmbeddingProvider');
const ranking = require('./ranking');

let _provider = null;
let _warned = false;

function createProvider() {
  const want = (process.env.AI_VISION_PROVIDER || 'local-color').toLowerCase();
  if (want === 'vertex') {
    const v = new VertexEmbeddingProvider();
    if (v.isConfigured()) return v;
    if (!_warned) { console.warn('[ai] AI_VISION_PROVIDER=vertex 지만 자격증명 없음 → local-color 폴백(B1)'); _warned = true; }
  }
  return new LocalColorProvider();
}

/** 싱글턴 프로바이더 (프로세스당 1개). */
function getProvider() {
  if (!_provider) _provider = createProvider();
  return _provider;
}

module.exports = { getProvider, LocalColorProvider, VertexEmbeddingProvider, ...ranking };
