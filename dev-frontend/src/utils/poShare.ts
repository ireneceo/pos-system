/**
 * 발주서 공유(WhatsApp / Email) 메시지 빌더 — 단일 소스.
 *
 * 외부공급업체(솔루션 미가입)는 시스템이 자동 발송하지 않으므로 사람이 WhatsApp/이메일로 보낸다.
 * 이 빌더를 화면마다 복사하면 곧 문구가 갈라진다 → 발주 확정(Staging)과 발주 상세가 같은 함수를 쓴다.
 *
 * ⚠ 오너 승인이 필요한 매장에서는 **승인 전에 보내면 안 된다**(docs/PURCHASE_ORDER_SYSTEM.md §G-5).
 *   Staging 은 승인 필요 시 발송 버튼을 잠그고, 승인 후 상세 페이지에서 발송한다.
 */

interface SharePOItem {
  product_name?: string | null;
  ingredient_name?: string | null;
  ingredient_id?: number;
  quantity_ordered: number | string;
  unit_price: number | string;
}

export interface SharePO {
  id: number;
  po_number?: string | null;
  currency?: string | null;
  total_amount?: number | string | null;
  expected_delivery_date?: string | null;
  delivery_address?: string | null;
  items?: SharePOItem[];
  seller?: { name?: string | null; phone?: string | null; email?: string | null } | null;
}

/** 품목 줄목록 (이름 × 수량 @ 단가). 이름 없으면 #id. */
export function poItemLines(po: SharePO, formatQuantity: (q: any) => string): string {
  return (po.items || []).map((it) =>
    `- ${it.product_name || it.ingredient_name || ('Item #' + it.ingredient_id)} x ${formatQuantity(it.quantity_ordered)} @ ${parseFloat(String(it.unit_price)).toFixed(2)}`
  ).join('\n');
}

/** WhatsApp 발송 — 판매자 번호가 있으면 그 번호로, 없으면 연락처 선택 화면으로. */
export function sharePoViaWhatsApp(po: SharePO, formatQuantity: (q: any) => string): void {
  const cur = po.currency || 'MYR';
  const text = encodeURIComponent(
    `[Purchase Order ${po.po_number || '#' + po.id}]\n` +
    `${po.seller?.name ? 'Supplier: ' + po.seller.name + '\n' : ''}\n` +
    `Items:\n${poItemLines(po, formatQuantity) || '(none)'}\n\n` +
    `Total: ${cur} ${parseFloat(String(po.total_amount || '0')).toFixed(2)}\n` +
    `${po.expected_delivery_date ? 'Expected delivery: ' + po.expected_delivery_date + '\n' : ''}` +
    `${po.delivery_address ? 'Deliver to: ' + po.delivery_address + '\n' : ''}` +
    `\nPlease confirm this order.`
  );
  const phone = po.seller?.phone ? po.seller.phone.replace(/\D/g, '') : '';
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

/** Email 발송 — 판매자 이메일이 없으면 false 반환(호출부가 안내). */
export function sharePoViaEmail(po: SharePO, formatQuantity: (q: any) => string): boolean {
  if (!po.seller?.email) return false;
  const subject = encodeURIComponent(`Purchase Order ${po.po_number || '#' + po.id}`);
  const body = encodeURIComponent(
    `Dear ${po.seller.name},\n\nWe would like to place a purchase order:\n\n` +
    `PO #: ${po.po_number || po.id}\n\n` +
    `Items:\n${poItemLines(po, formatQuantity) || '(none)'}\n\n` +
    `Total: ${po.currency || 'MYR'} ${parseFloat(String(po.total_amount || '0')).toFixed(2)}\n` +
    `${po.expected_delivery_date ? 'Expected: ' + po.expected_delivery_date + '\n' : ''}` +
    `${po.delivery_address ? 'Deliver to: ' + po.delivery_address + '\n' : ''}` +
    `\nPlease confirm receipt of this order.\n\nThank you.`
  );
  window.location.href = `mailto:${po.seller.email}?subject=${subject}&body=${body}`;
  return true;
}
