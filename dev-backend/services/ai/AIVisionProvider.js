/**
 * AIVisionProvider — 비전 임베딩 프로바이더 계약 (Track B, §2.2).
 *
 * 구현체(LocalColorProvider / VertexEmbeddingProvider)가 이 인터페이스를 만족.
 * 임베딩 모델이 바뀌면 벡터 공간이 달라지므로 `model` 로 버전 태깅 → 서로 다른 모델 벡터끼리 비교 금지
 * (조회 시 embedding_model = 현재 모델 필터). 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §2.2 / §B-2.
 */
class AIVisionProvider {
  /** 프로바이더 식별자 (recognition_logs.provider) — ex 'local-color-v1' */
  get name() { throw new Error('not implemented'); }
  /** 임베딩 모델 태그 (menu_reference_photos.embedding_model) */
  get model() { throw new Error('not implemented'); }
  /** 벡터 차원 */
  get dim() { throw new Error('not implemented'); }
  /**
   * 이 프로바이더가 허용하는 최대 정책 모드. 로컬(색 기반)은 정확도 한계로 'recommend' 캡
   * (자동 확정 금지), 실 임베딩(vertex)은 'auto'. 정책 단계에서 min 적용.
   */
  get maxMode() { return 'recommend'; }
  /**
   * 이미지 버퍼 → L2 정규화 float 벡터.
   * @param {Buffer} buffer 원본 이미지(무보존 — 메모리에서만)
   * @returns {Promise<number[]>}
   */
  async embedImage(buffer) { throw new Error('not implemented'); }
}

module.exports = AIVisionProvider;
