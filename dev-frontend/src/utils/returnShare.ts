/**
 * 반품서를 외부 공급업체에 보내는 문구 — 발주(poShare.ts)와 같은 모양 (2026-09-08)
 *
 * Irene: "외부공급업체는 발주처럼 왓츠앱 메일, pdf 로 보내게 해줘야지."
 *   외부(솔루션 미가입) 공급업체는 로그인이 없어 시스템에서 반품을 확인할 수 없다.
 *   그래서 발주와 똑같이 **밖으로 보낸다** — 왓츠앱 / 메일 / PDF 세 경로.
 *
 * ⛔ 여기서는 서버를 부르지 않는다. 창을 열어줄 뿐이고, "보냈다"는 기록은 호출부가
 *    `mark-sent-external` 로 남긴다 — 안 그러면 보냈는지 아닌지가 화면에서 사라진다.
 */

export interface ShareReturnLine {
  name: string;
  quantity: number | string;
  unit?: string | null;
  unit_price?: number | string | null;
  reason?: string | null;
}

export interface ShareReturn {
  po_number: string;
  seller?: { name?: string | null; phone?: string | null; email?: string | null } | null;
  currency?: string | null;
  lines: ShareReturnLine[];
}

const money = (v: unknown) => (parseFloat(String(v ?? 0)) || 0).toFixed(2);

function lineText(r: ShareReturn, bold: (s: string) => string = (s) => s): string {
  const cur = r.currency || 'MYR';
  return (r.lines || []).map((l) => {
    const qty = `${l.quantity}${l.unit ? ' ' + l.unit : ''}`;
    const amount = l.unit_price != null
      ? ` — ${cur} ${money((parseFloat(String(l.quantity)) || 0) * (parseFloat(String(l.unit_price)) || 0))}`
      : '';
    const why = l.reason ? ` (${l.reason})` : '';
    return `• ${bold(l.name)} × ${qty}${amount}${why}`;
  }).join('\n');
}

function totalOf(r: ShareReturn): number {
  return (r.lines || []).reduce((sum, l) =>
    sum + (parseFloat(String(l.quantity)) || 0) * (parseFloat(String(l.unit_price ?? 0)) || 0), 0);
}

/** 왓츠앱 — 번호가 없으면 wa.me 가 번호 입력 화면을 연다(발주와 같은 동작). */
export function shareReturnViaWhatsApp(r: ShareReturn): void {
  const cur = r.currency || 'MYR';
  const b = (s: string) => `*${s}*`;
  const text = encodeURIComponent(
    `${b('RETURN REQUEST')}\n` +
    `${r.po_number}\n` +
    `${r.seller?.name ? r.seller.name + '\n' : ''}` +
    `\n${b(`Items (${(r.lines || []).length})`)}\n` +
    `${lineText(r, b) || '(none)'}\n\n` +
    `${b(`TOTAL: ${cur} ${money(totalOf(r))}`)}\n` +
    `\nPlease confirm this return and the credit amount.`
  );
  const phone = r.seller?.phone ? r.seller.phone.replace(/\D/g, '') : '';
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

/** 메일 앱 열기 — 주소가 없으면 false(호출부가 안내). 서버 발송은 별도 버튼이다. */
export function shareReturnViaEmail(r: ShareReturn): boolean {
  if (!r.seller?.email) return false;
  const subject = encodeURIComponent(`Return Request ${r.po_number}`);
  const body = encodeURIComponent(
    `Dear ${r.seller.name || 'Supplier'},\n\nWe are returning the following items from ${r.po_number}:\n\n` +
    `${lineText(r) || '(none)'}\n\n` +
    `Total: ${r.currency || 'MYR'} ${money(totalOf(r))}\n\n` +
    `Please confirm this return and the credit amount.\n\nThank you.`
  );
  window.location.href = `mailto:${r.seller.email}?subject=${subject}&body=${body}`;
  return true;
}

/** 인쇄(PDF) — 브라우저 인쇄 창을 띄운다. 받는 쪽이 종이로 받아도 같은 서식이 되게. */
export function printReturnSheet(r: ShareReturn): void {
  const cur = r.currency || 'MYR';
  const rows = (r.lines || []).map((l) => `
    <tr>
      <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">${escapeHtml(l.name)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;text-align:right;white-space:nowrap;">${escapeHtml(String(l.quantity))}${l.unit ? ' ' + escapeHtml(l.unit) : ''}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;text-align:right;white-space:nowrap;">${l.unit_price != null ? cur + ' ' + money(l.unit_price) : '-'}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;text-align:right;white-space:nowrap;">${escapeHtml(l.reason || '')}</td>
    </tr>`).join('');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Return ${escapeHtml(r.po_number)}</title></head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;padding:24px;">
      <h1 style="font-size:20px;margin:0 0 4px;">Return Request</h1>
      <div style="font-size:13px;color:#4B5563;margin:0 0 16px;">
        ${escapeHtml(r.po_number)}${r.seller?.name ? ' · ' + escapeHtml(r.seller.name) : ''}
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;">
        <thead><tr style="background:#F9FAFB;">
          <th style="padding:8px 10px;text-align:left;font-size:12px;color:#6B7280;">Item</th>
          <th style="padding:8px 10px;text-align:right;font-size:12px;color:#6B7280;">Qty</th>
          <th style="padding:8px 10px;text-align:right;font-size:12px;color:#6B7280;">Unit</th>
          <th style="padding:8px 10px;text-align:right;font-size:12px;color:#6B7280;">Reason</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr style="background:#F9FAFB;">
          <td colspan="3" style="padding:10px;text-align:right;font-weight:600;">Total</td>
          <td style="padding:10px;text-align:right;font-weight:700;">${cur} ${money(totalOf(r))}</td>
        </tr></tfoot>
      </table>
      <p style="font-size:12px;color:#6B7280;margin-top:16px;">Please confirm this return and the credit amount.</p>
    </body></html>`;

  const w = window.open('', '_blank');
  if (!w) return;
  w.document.write(html);
  w.document.close();
  // 인쇄 창은 내용이 그려진 뒤에 띄운다 — 바로 부르면 빈 종이가 나온다.
  w.onload = () => { w.focus(); w.print(); };
}

function escapeHtml(s: string): string {
  return String(s == null ? '' : s).replace(/[<>&"]/g, (ch) => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' } as Record<string, string>)[ch]);
}
