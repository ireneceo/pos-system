import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Scan upward from `targetY` for a row of nearly-white pixels so we never
// slice through a line of text. Returns pixel y to cut at.
function findSafeBreakY(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  targetY: number,
  searchBack: number,
  minY: number
): number {
  const lowerBound = Math.max(minY + 1, targetY - searchBack);
  for (let y = targetY; y >= lowerBound; y--) {
    const row = ctx.getImageData(0, y, canvasWidth, 1).data;
    let isBlank = true;
    for (let i = 0; i < row.length; i += 4) {
      // Treat anything darker than #F5 as content
      if (row[i] < 245 || row[i + 1] < 245 || row[i + 2] < 245) {
        isBlank = false;
        break;
      }
    }
    if (isBlank) return y;
  }
  // No blank row found — fall back to the target cut
  return targetY;
}

// A4 배치 상수 — 모든 장 공통
const PAGE_W_MM = 210, PAGE_H_MM = 297;      // A4
const MARGIN_X_MM = 12, MARGIN_Y_MM = 14;    // 종이 여백(모든 장 공통)

/** iframe 안 문서를 폰트·이미지가 다 뜬 뒤 캔버스로 찍는다. */
async function snapshotIframe(iframe: HTMLIFrameElement): Promise<HTMLCanvasElement> {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) throw new Error('Cannot access iframe document');

  // Wait for fonts + images to settle before snapshotting
  try {
    if ((iframeDoc as any).fonts?.ready) {
      await (iframeDoc as any).fonts.ready;
    }
  } catch { /* ignore */ }

  const images = Array.from(iframeDoc.querySelectorAll('img'));
  await Promise.all(
    images.map(img =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>(r => {
            img.onload = () => r();
            img.onerror = () => r();
          })
    )
  );
  await new Promise(r => setTimeout(r, 100));

  const contentHeight = iframeDoc.body.scrollHeight;
  iframe.style.height = `${contentHeight}px`;

  return html2canvas(iframeDoc.body, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800,
    windowHeight: contentHeight
  });
}

/**
 * 캔버스 한 장을 A4 여러 장으로 잘라 pdf 에 붙인다. 글자 줄 한가운데를 자르지 않도록 흰 줄에서 자른다.
 * @param startOnNewPage 첫 조각을 새 장에서 시작할지(두 번째 문서부터 true)
 * @returns 붙인 장 수
 */
function appendCanvasPages(pdf: jsPDF, canvas: HTMLCanvasElement, startOnNewPage: boolean): number {
  // 🔴 2026-08-31 Irene: "PDF도 다음 장 2번째 장부터 맨 위로 들러붙어. 여백이 들어가야 하는 거
  //   아니야? 페이지 잘 나눠야지"
  //   원인: 이미지를 (0,0) 에 A4 폭 그대로 얹어서 **모든 장의 여백이 0** 이었다. 화면의 CSS padding 은
  //   캡처 이미지 안에 들어가므로 1장 위쪽에만 보이고, 2장부터는 잘린 지점이 곧 종이 맨 위가 된다.
  //   → 종이 여백을 PDF 배치 단계에서 준다. 폭도 여백만큼 줄여야 좌우가 잘리지 않는다.
  const imgWidthMm = PAGE_W_MM - MARGIN_X_MM * 2;   // 실제 그림 폭 186mm
  const usableHeightMm = PAGE_H_MM - MARGIN_Y_MM * 2; // 한 장에 담기는 높이 269mm
  const mmPerPx = imgWidthMm / canvas.width;
  const pageHeightPx = Math.floor(usableHeightMm / mmPerPx);
  const safetyMarginPx = Math.floor(40 / mmPerPx); // ~40mm scan window

  const ctx = canvas.getContext('2d');

  // Single-page fast path
  if (!ctx || canvas.height <= pageHeightPx) {
    if (startOnNewPage) pdf.addPage();
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', MARGIN_X_MM, MARGIN_Y_MM, imgWidthMm, canvas.height * mmPerPx);
    return 1;
  }

  let cursorY = 0;
  let pageIndex = 0;

  while (cursorY < canvas.height) {
    const remaining = canvas.height - cursorY;
    let sliceHeight: number;

    if (remaining <= pageHeightPx) {
      sliceHeight = remaining;
    } else {
      const targetCut = cursorY + pageHeightPx;
      const safeCut = findSafeBreakY(ctx, canvas.width, targetCut, safetyMarginPx, cursorY);
      sliceHeight = safeCut - cursorY;
      if (sliceHeight <= 0) sliceHeight = pageHeightPx; // defensive fallback
    }

    // Render this slice onto a temp canvas, then into the PDF
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const pageCtx = pageCanvas.getContext('2d');
    if (!pageCtx) throw new Error('Failed to get page canvas context');
    pageCtx.fillStyle = '#ffffff';
    pageCtx.fillRect(0, 0, canvas.width, sliceHeight);
    pageCtx.drawImage(
      canvas,
      0, cursorY, canvas.width, sliceHeight,
      0, 0, canvas.width, sliceHeight
    );

    if (pageIndex > 0 || startOnNewPage) pdf.addPage();
    // 모든 장에 동일한 여백을 준다 — 2장부터 종이 맨 위에 붙던 것의 실제 수정 지점.
    pdf.addImage(
      pageCanvas.toDataURL('image/png'),
      'PNG',
      MARGIN_X_MM,
      MARGIN_Y_MM,
      imgWidthMm,
      sliceHeight * mmPerPx
    );

    cursorY += sliceHeight;
    pageIndex += 1;
  }
  return pageIndex;
}

/**
 * Render an already-populated iframe to a multi-page A4 PDF, slicing at
 * whitespace rows so text is never cut in half.
 */
export async function renderIframeToPdf(iframe: HTMLIFrameElement, filename: string): Promise<void> {
  const canvas = await snapshotIframe(iframe);
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  appendCanvasPages(pdf, canvas, false);
  pdf.save(filename);
}

/**
 * 여러 HTML 문서를 **한 PDF** 로 — 각 문서는 새 장에서 시작한다 (2026-09-29 soa2 §5-C).
 * 정산서(SOA) = 표지 + 묶인 청구서 전부를 한 번에 내려받게 하려고 만들었다.
 * (html2canvas 는 CSS page-break 를 모르므로 문서마다 따로 찍어 이어 붙인다.)
 * @returns 만든 장 수
 */
export async function renderHtmlDocumentsToPdf(htmlDocs: string[], filename: string): Promise<number> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  let pages = 0;
  for (let i = 0; i < htmlDocs.length; i += 1) {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-10000px';
    iframe.style.top = '-10000px';
    iframe.style.width = '800px';
    iframe.style.height = '1200px';
    iframe.style.visibility = 'hidden';
    iframe.style.pointerEvents = 'none';
    document.body.appendChild(iframe);
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) throw new Error('Could not access iframe document');
      doc.open();
      doc.write(htmlDocs[i]);
      doc.close();
      const canvas = await snapshotIframe(iframe);
      pages += appendCanvasPages(pdf, canvas, i > 0);
    } finally {
      document.body.removeChild(iframe);
    }
  }
  pdf.save(filename);
  return pages;
}

/**
 * Inject print-specific CSS into invoice HTML templates so browser Print
 * (Ctrl+P) splits cleanly on row/section boundaries.
 * Call from every `generateInvoiceHTML` function.
 */
export const INVOICE_PRINT_CSS = `
@media print {
  body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .invoice-container { padding: 20mm !important; }
  .no-print { display: none !important; }
  .bank-section, .summary-section, .summary-row, .summary-box,
  .registration-info, .footer, .billing-info, .info-section,
  .header, .bill-to-section {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  table { page-break-inside: auto; }
  .items-table tr, .invoice-table tr {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .items-table thead, .invoice-table thead {
    display: table-header-group;
  }
  .items-table tfoot, .invoice-table tfoot {
    display: table-footer-group;
  }
}
`;
