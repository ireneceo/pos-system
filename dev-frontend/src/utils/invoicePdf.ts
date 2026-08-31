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

/**
 * Render an already-populated iframe to a multi-page A4 PDF, slicing at
 * whitespace rows so text is never cut in half.
 */
export async function renderIframeToPdf(iframe: HTMLIFrameElement, filename: string): Promise<void> {
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

  const canvas = await html2canvas(iframeDoc.body, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 800,
    windowHeight: contentHeight
  });

  // 🔴 2026-08-31 Irene: "PDF도 다음 장 2번째 장부터 맨 위로 들러붙어. 여백이 들어가야 하는 거
  //   아니야? 페이지 잘 나눠야지"
  //   원인: 이미지를 (0,0) 에 A4 폭 그대로 얹어서 **모든 장의 여백이 0** 이었다. 화면의 CSS padding 은
  //   캡처 이미지 안에 들어가므로 1장 위쪽에만 보이고, 2장부터는 잘린 지점이 곧 종이 맨 위가 된다.
  //   → 종이 여백을 PDF 배치 단계에서 준다. 폭도 여백만큼 줄여야 좌우가 잘리지 않는다.
  const PAGE_W_MM = 210, PAGE_H_MM = 297;      // A4
  const MARGIN_X_MM = 12, MARGIN_Y_MM = 14;    // 종이 여백(모든 장 공통)
  const imgWidthMm = PAGE_W_MM - MARGIN_X_MM * 2;   // 실제 그림 폭 186mm
  const usableHeightMm = PAGE_H_MM - MARGIN_Y_MM * 2; // 한 장에 담기는 높이 269mm
  const mmPerPx = imgWidthMm / canvas.width;
  const pageHeightPx = Math.floor(usableHeightMm / mmPerPx);
  const safetyMarginPx = Math.floor(40 / mmPerPx); // ~40mm scan window

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const ctx = canvas.getContext('2d');

  // Single-page fast path
  if (!ctx || canvas.height <= pageHeightPx) {
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', MARGIN_X_MM, MARGIN_Y_MM, imgWidthMm, canvas.height * mmPerPx);
    pdf.save(filename);
    return;
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

    if (pageIndex > 0) pdf.addPage();
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

  pdf.save(filename);
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
