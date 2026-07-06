const AIVisionProvider = require('./AIVisionProvider');

/**
 * VertexEmbeddingProvider (vertex/multimodalembedding@001) — B2 스켈레톤.
 *
 * B1 에서는 어댑터 파일만 존재하고 실배선은 안 함(키 0개). 팩토리가 키 없으면 이 프로바이더를
 * 선택하지 않고 LocalColorProvider 로 폴백한다. B2(Irene 키 확보 후): google-auth-library +
 * REST predict 배선 + 전 레퍼런스 재임베딩 + auto 모드 해금.
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-2 (VertexEmbeddingProvider).
 */
class VertexEmbeddingProvider extends AIVisionProvider {
  constructor(opts = {}) {
    super();
    this.projectId = opts.projectId || process.env.VERTEX_PROJECT_ID;
    this.location = opts.location || process.env.VERTEX_LOCATION || 'us-central1';
  }
  get name() { return 'vertex-mme001'; }
  get model() { return 'vertex/multimodalembedding@001'; }
  get dim() { return 1408; }
  get maxMode() { return 'auto'; }

  /** 사용 가능 여부 — 키/프로젝트 있어야 함. 팩토리가 이걸로 폴백 결정. */
  isConfigured() {
    return !!(this.projectId && process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }

  async embedImage(_buffer) {
    // B2 에서 구현: google-auth-library SA 토큰 → REST predict → embedding 반환.
    throw new Error('VertexEmbeddingProvider not wired (B2) — no credentials configured');
  }
}

module.exports = VertexEmbeddingProvider;
