/**
 * 업로드된 공급업체 인보이스에서 **글자를 읽어낸다** — 브라우저 안에서.
 *
 * 왜 브라우저인가 (2026-09-10 Fable 판정 D1):
 *   운영 서버 자원 부족이 매장 인쇄 지연의 근본이었다. 글자인식은 100~300MB·CPU 수 초를 먹는다 —
 *   인쇄 폴러가 사는 프로세스 옆에 두지 않는다. 브라우저면 서버 영향 0, 외부 전송 0, 자격증명 0.
 *
 * 실측 근거 (발주 33 · TAIYANG FRESH 인보이스, 2033×3018 이미지 전용 PDF):
 *   3.5초에 19줄 전부 수량·단가·금액 인식. 헤더(번호·날짜·조건·총액)도 인식.
 *   오류 1건(금액 28.00→8.00)은 매칭기의 «수량×단가=금액» 검산이 잡는다.
 *
 * ⛔ 외부 CDN 을 쓰지 않는다 — 자산은 `public/tesseract/` 에서 자체 호스팅한다
 *   (매장 네트워크가 막힐 수 있고, SW 캐시 정책과도 충돌한다).
 */

/** 긴 변 상한 — 폰·태블릿 메모리 보호. 이 크기면 인쇄 인보이스 글자가 충분히 읽힌다. */
const MAX_EDGE = 1800;

const ASSETS = {
  workerPath: '/tesseract/worker.min.js',
  corePath: '/tesseract',   // 폴더를 주면 브라우저 지원에 맞는 core 를 스스로 고른다
  langPath: '/tesseract',
};

export interface OcrProgress { status: string; progress: number; }

/** 캔버스에 그린 뒤 긴 변을 MAX_EDGE 로 줄인다. */
function shrink(source: CanvasImageSource, w: number, h: number): HTMLCanvasElement {
  const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function imageToCanvas(url: string): Promise<HTMLCanvasElement> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('image_load_failed'));
    img.src = url;
  });
  return shrink(img, img.naturalWidth || img.width, img.naturalHeight || img.height);
}

/** PDF 첫 장을 캔버스에 그린다. 아이폰·스캐너가 사진을 PDF 로 감싸 올리는 것이 현장 기본형이다. */
async function pdfFirstPageToCanvas(url: string): Promise<HTMLCanvasElement> {
  const pdfjs: any = await import('pdfjs-dist');
  // 워커도 **자체 호스팅** 파일을 쓴다(외부 CDN 금지 — 매장 네트워크가 막힐 수 있다).
  // ⚠ 확장자를 .js 로 둔다 — nginx 가 .mjs 를 모르면 application/octet-stream 으로 내보내고
  //   브라우저가 «module script 가 아니다» 로 거부한다(2026-09-10 실측). 운영 nginx 수정은 sudo 가 필요해
  //   서버를 건드리지 않는 쪽을 택했다.
  pdfjs.GlobalWorkerOptions.workerSrc = '/tesseract/pdf.worker.min.js';
  const doc = await pdfjs.getDocument({ url }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas_unavailable');
  await page.render({ canvasContext: ctx, viewport }).promise;
  return shrink(canvas, canvas.width, canvas.height);
}

/**
 * 인보이스 파일에서 글자를 읽는다.
 * @returns 읽어낸 전체 텍스트. 실패하면 던진다 — 호출부는 붙여넣기 경로로 조용히 떨어진다.
 */
export async function readInvoiceText(
  url: string,
  onProgress?: (p: OcrProgress) => void,
): Promise<string> {
  const isPdf = /\.pdf(\?|$)/i.test(url);
  onProgress?.({ status: 'loading', progress: 0.05 });
  const canvas = isPdf ? await pdfFirstPageToCanvas(url) : await imageToCanvas(url);

  onProgress?.({ status: 'recognizing', progress: 0.2 });
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng', 1, {
    ...ASSETS,
    logger: (m: any) => {
      if (m && typeof m.progress === 'number') {
        onProgress?.({ status: m.status || 'recognizing', progress: 0.2 + m.progress * 0.75 });
      }
    },
  } as any);
  try {
    const { data } = await worker.recognize(canvas);
    onProgress?.({ status: 'done', progress: 1 });
    return data.text || '';
  } finally {
    try { await worker.terminate(); } catch { /* 종료 실패는 무해 */ }
  }
}
