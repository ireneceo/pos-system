const sharp = require('sharp');
const AIVisionProvider = require('./AIVisionProvider');

/**
 * VertexEmbeddingProvider (vertex/multimodalembedding@001) — Track B-2, 실배선 2026-07-27.
 *
 * 진짜 이미지 임베딩. LocalColorProvider(색·배치 히스토그램)는 비슷하게 생긴 음식을 못 가려
 * `maxMode='recommend'`(자동확정 금지)로 묶여 있었는데, 이 프로바이더는 의미 임베딩이라
 * `maxMode='auto'` — 확신도가 충분하면 자동 확정까지 간다.
 *
 * 비용 모델(설계 §9): **호출당 과금, 상시 비용 0.**
 *   - 인식 1회 = 이미지 1건 임베딩 1회. 촬영이 없으면 호출도 없고 청구도 없다.
 *   - 후보가 ready 품목 3~15개뿐이라 유사도는 우리 서버에서 브루트포스 코사인으로 계산한다
 *     → **벡터 검색 인덱스(상시 과금 리소스)를 띄우지 않는다.** 이게 "안 쓰면 0원"의 근거다.
 *   - 원본 사진 무보존 → 스토리지 비용 0.
 *
 * 자격증명 (둘 다 있어야 활성):
 *   VERTEX_PROJECT_ID=<gcp project id>
 *   GOOGLE_APPLICATION_CREDENTIALS=/opt/secrets/vertex-sa.json   (역할: Vertex AI User)
 *   VERTEX_LOCATION=us-central1 (기본값)
 * 하나라도 없으면 팩토리가 LocalColorProvider 로 폴백한다 — 키가 없다고 기능이 죽지 않는다.
 *
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-2.
 */

const ENDPOINT_TIMEOUT_MS = 4000;   // recognize 는 3s 레이스 안에서 돈다 — 그보다 약간 길게 잡아 소켓 누수 방지
const MAX_EDGE = 512;               // 업로드 전 정규화 (비용·지연 절감, 설계 §2.1 ②)

class VertexEmbeddingProvider extends AIVisionProvider {
  constructor(opts = {}) {
    super();
    this.projectId = opts.projectId || process.env.VERTEX_PROJECT_ID;
    this.location = opts.location || process.env.VERTEX_LOCATION || 'us-central1';
    this._authClient = null;
  }

  get name() { return 'vertex-mme001'; }
  get model() { return 'vertex/multimodalembedding@001'; }
  get dim() { return 1408; }
  get maxMode() { return 'auto'; }

  /** 사용 가능 여부 — 프로젝트 + 서비스계정 키 둘 다 있어야 함. 팩토리가 이걸로 폴백 결정. */
  isConfigured() {
    return !!(this.projectId && process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }

  /**
   * 서비스 계정 → 액세스 토큰. GoogleAuth 가 토큰을 캐시하고 만료 전 자동 갱신하므로
   * 클라이언트를 프로세스당 1개만 만든다(요청마다 새로 만들면 매번 토큰 교환 = 지연·쿼터 낭비).
   */
  async _getAuth() {
    if (this._authClient) return this._authClient;
    const { GoogleAuth } = require('google-auth-library');
    const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
    this._authClient = await auth.getClient();
    return this._authClient;
  }

  /**
   * 이미지 버퍼 → L2 정규화 1408차 벡터.
   * 실패는 그대로 throw — 호출부(recognize)가 3초 레이스에서 잡아 `mode:'fallback'`
   * (직접 고르기)으로 우아하게 강등한다. 여기서 삼키면 "빈 벡터로 엉뚱한 1등"이 된다.
   */
  async embedImage(buffer) {
    if (!this.isConfigured()) {
      throw new Error('VERTEX_NOT_CONFIGURED');
    }
    // 긴 변 512px JPEG 로 정규화 + EXIF 회전 보정. 클라이언트가 이미 줄여 보내지만
    // 레퍼런스 시드(서버 보유 원본)는 클 수 있어 여기서도 반드시 줄인다 = 비용 상한.
    const normalized = await sharp(buffer)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();

    const client = await this._getAuth();
    const url = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}` +
                `/locations/${this.location}/publishers/google/models/multimodalembedding@001:predict`;

    const res = await client.request({
      url,
      method: 'POST',
      timeout: ENDPOINT_TIMEOUT_MS,
      data: {
        instances: [{ image: { bytesBase64Encoded: normalized.toString('base64') } }],
        parameters: { dimension: this.dim }
      }
    });

    const vec = res?.data?.predictions?.[0]?.imageEmbedding;
    if (!Array.isArray(vec) || vec.length === 0) {
      throw new Error('VERTEX_EMPTY_EMBEDDING');
    }
    return l2normalize(vec);
  }
}

// 랭킹이 코사인 유사도를 내적으로 계산하므로 벡터는 반드시 L2 정규화되어 들어가야 한다
// (LocalColorProvider 도 동일 규약). Vertex 응답은 대체로 정규화돼 있지만 보장은 아니다.
function l2normalize(vec) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) sum += vec[i] * vec[i];
  const n = Math.sqrt(sum);
  if (!n || !isFinite(n)) return vec.map(() => 0);
  return vec.map((v) => v / n);
}

module.exports = VertexEmbeddingProvider;
