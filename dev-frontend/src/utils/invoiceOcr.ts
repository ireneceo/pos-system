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

/**
 * 한 번에 읽을 PDF 쪽 수 상한 — 폰·태블릿 메모리·시간 보호. 공급업체 인보이스는 대개 1~2쪽이다.
 */
const MAX_PDF_PAGES = 4;

/**
 * PDF **모든 쪽**(상한 MAX_PDF_PAGES)을 캔버스로 그린다. 아이폰·스캐너가 사진을 PDF 로 감싸 올리는 것이 현장 기본형이다.
 *
 * ⚠ 첫 장만 읽으면 안 된다 (2026-11-04 운영 발주 93 · LOW SEAT HOONG 실측):
 *   CamScanner 가 «2쪽 중 2쪽»(합계만 있는 쪽)을 PDF 첫 장에, 품목 17줄이 있는 «2쪽 중 1쪽»을 둘째 장에 넣었다.
 *   첫 장만 읽어 품목 줄 0 → 발주 16줄 중 짝 0, 고르기 목록엔 머리글 조각 2줄만 떴다(Irene «매칭을 전혀 못해»).
 *   두 장 다 읽으면 16줄 중 12줄이 채워진다. 쪽 순서는 믿을 수 없으니 **전부** 읽어 이어 붙인다.
 */
async function pdfPagesToCanvases(url: string): Promise<HTMLCanvasElement[]> {
  const pdfjs: any = await import('pdfjs-dist');
  // 워커도 **자체 호스팅** 파일을 쓴다(외부 CDN 금지 — 매장 네트워크가 막힐 수 있다).
  // ⚠ 확장자를 .js 로 둔다 — nginx 가 .mjs 를 모르면 application/octet-stream 으로 내보내고
  //   브라우저가 «module script 가 아니다» 로 거부한다(2026-09-10 실측). 운영 nginx 수정은 sudo 가 필요해
  //   서버를 건드리지 않는 쪽을 택했다.
  pdfjs.GlobalWorkerOptions.workerSrc = '/tesseract/pdf.worker.min.js';
  const doc = await pdfjs.getDocument({ url }).promise;
  const count = Math.min(doc.numPages || 1, MAX_PDF_PAGES);
  const out: HTMLCanvasElement[] = [];
  for (let n = 1; n <= count; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas_unavailable');
    await page.render({ canvasContext: ctx, viewport }).promise;
    out.push(shrink(canvas, canvas.width, canvas.height));
    canvas.width = 0; canvas.height = 0;   // 큰 원본 캔버스 메모리를 바로 놓는다
  }
  return out;
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
  const canvases = isPdf ? await pdfPagesToCanvases(url) : [await imageToCanvas(url)];

  onProgress?.({ status: 'recognizing', progress: 0.2 });
  // 쪽마다 진행률을 나눠 준다 — 워커 logger 는 쪽 하나 안의 진행률(0~1)만 알려 준다.
  let pageIdx = 0;
  const share = 0.75 / canvases.length;
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng', 1, {
    ...ASSETS,
    logger: (m: any) => {
      if (m && typeof m.progress === 'number') {
        onProgress?.({ status: m.status || 'recognizing', progress: 0.2 + share * (pageIdx + m.progress) });
      }
    },
  } as any);
  try {
    const texts: string[] = [];
    for (pageIdx = 0; pageIdx < canvases.length; pageIdx++) {
      const { data } = await worker.recognize(canvases[pageIdx]);
      texts.push(data.text || '');
    }
    onProgress?.({ status: 'done', progress: 1 });
    return texts.join('\n');
  } finally {
    try { await worker.terminate(); } catch { /* 종료 실패는 무해 */ }
  }
}
