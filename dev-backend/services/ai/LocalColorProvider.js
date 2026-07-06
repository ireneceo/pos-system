const sharp = require('sharp');
const AIVisionProvider = require('./AIVisionProvider');

/**
 * LocalColorProvider (local-color-v1) — 외부 호출 0·비용 0 색·공간 특징 임베딩 (Track B / B1).
 *
 * sharp 로 96×96 정규화 → 4×4 공간 그리드(16 셀) × [HSV 히스토그램 h8·s4·v4 + 밝기평균 + 텍스처(v 표준편차)]
 * = 셀당 18 → 288-dim → L2 정규화 → 코사인 유사도. 결정적(같은 입력=같은 벡터), <50ms.
 *
 * 정확도: 색·플레이팅이 뚜렷이 다른 메뉴 구분에 유효(제약매칭 §1.2 로 후보 3~8개 중 선별).
 * 비슷한 음식 구분은 약함 → maxMode='recommend'(auto 자동확정 금지). B2 에서 vertex 로 교체.
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-2 (LocalColorProvider 스펙).
 */

const GRID = 4;               // 4×4 셀
const SIZE = 96;              // 정규화 크기 (GRID 로 나누어 떨어짐: 셀 24×24)
const H_BINS = 8, S_BINS = 4, V_BINS = 4;
const PER_CELL = H_BINS + S_BINS + V_BINS + 2; // +밝기평균 +텍스처 = 18
const DIM = GRID * GRID * PER_CELL;             // 288

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return [h, s, max]; // v = max
}

class LocalColorProvider extends AIVisionProvider {
  get name() { return 'local-color-v1'; }
  get model() { return 'local-color-v1'; }
  get dim() { return DIM; }
  get maxMode() { return 'recommend'; }

  async embedImage(buffer) {
    // EXIF 회전 반영 + 정사각 채움(fill) → RGB raw (알파 제거).
    const { data } = await sharp(buffer)
      .rotate()
      .resize(SIZE, SIZE, { fit: 'fill' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const vec = new Array(DIM).fill(0);
    const cellPx = SIZE / GRID; // 24
    // 셀별 누적
    const counts = new Array(GRID * GRID).fill(0);
    const vSum = new Array(GRID * GRID).fill(0);
    const vSqSum = new Array(GRID * GRID).fill(0);

    for (let y = 0; y < SIZE; y++) {
      const gy = Math.min(GRID - 1, Math.floor(y / cellPx));
      for (let x = 0; x < SIZE; x++) {
        const gx = Math.min(GRID - 1, Math.floor(x / cellPx));
        const cell = gy * GRID + gx;
        const idx = (y * SIZE + x) * 3;
        const [h, s, v] = rgbToHsv(data[idx], data[idx + 1], data[idx + 2]);
        const base = cell * PER_CELL;
        // 히스토그램 (채도 낮으면 hue 불안정 → s 로 가중해 hue 오염 완화)
        const hBin = Math.min(H_BINS - 1, Math.floor((h / 360) * H_BINS));
        const sBin = Math.min(S_BINS - 1, Math.floor(s * S_BINS));
        const vBin = Math.min(V_BINS - 1, Math.floor(v * V_BINS));
        vec[base + hBin] += s;                 // hue 는 채도 가중
        vec[base + H_BINS + sBin] += 1;
        vec[base + H_BINS + S_BINS + vBin] += 1;
        vSum[cell] += v; vSqSum[cell] += v * v; counts[cell]++;
      }
    }
    // 셀별 정규화 + 밝기평균/텍스처
    for (let c = 0; c < GRID * GRID; c++) {
      const base = c * PER_CELL;
      const n = counts[c] || 1;
      // 히스토그램 3종 각각 셀 픽셀수로 정규화
      for (let i = 0; i < H_BINS + S_BINS + V_BINS; i++) vec[base + i] /= n;
      const mean = vSum[c] / n;
      const variance = Math.max(0, vSqSum[c] / n - mean * mean);
      vec[base + H_BINS + S_BINS + V_BINS] = mean;                 // 밝기 평균
      vec[base + H_BINS + S_BINS + V_BINS + 1] = Math.sqrt(variance); // 텍스처(표준편차)
    }
    // L2 정규화
    let norm = 0;
    for (let i = 0; i < DIM; i++) norm += vec[i] * vec[i];
    norm = Math.sqrt(norm) || 1;
    for (let i = 0; i < DIM; i++) vec[i] = vec[i] / norm;
    return vec;
  }
}

module.exports = LocalColorProvider;
