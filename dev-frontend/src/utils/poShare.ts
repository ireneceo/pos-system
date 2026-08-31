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
  /** 수량을 따라다니는 단위(kg/g/pkt/ctn…). 발주 라인에 저장돼 있다 — 메시지에도 실린다. */
  unit?: string | null;
  unit_price: number | string;
  /**
   * 공급업체 자기 판매품목 정체성(백엔드 utils/sellerProductIdentity).
   * 매핑 없는 라인·브랜드/푸드코트 판매자는 null → 내부명 폴백.
   */
  seller_product_name?: string | null;
  seller_product_sku?: string | null;
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

/**
 * 품목 줄목록 (공급업체 상품명 [SKU] × 수량 단위 @ 단가). 이름 없으면 #id.
 *
 * 이 메시지는 **공급업체에게 나간다** → 공급업체 판매품목명 + SKU 만 쓴다.
 *
 * 🔴 2026-08-31 Irene: *"왓츠앱이 공급업체에게 보내는 건데 우리 이름 저장한 것까지 보낼 필요 있어?"*
 *   그전에는 이름이 다르면 `(ref: 우리내부명)` 을 뒤에 붙였다. 받는 쪽에는 쓸모없는 정보고
 *   (자기 창고엔 그 이름이 없다) 우리 내부 재고 명명 규칙만 노출된다 → **제거**.
 *   같은 원칙을 거래 인보이스·발주 메일에도 적용했다(services/purchaseOrderService · utils/poEmailItems).
 *   매핑이 없는 라인(외부 판매자·옛 발주)만 내부명으로 폴백한다 — 빈칸이 되면 뭘 주문했는지도 안 보인다.
 *
 * 단위도 함께 싣는다 — Irene: *"인보이스랑 모든 곳에 다 단위 따라다녀야"*.
 * 수량만 있고 단위가 없으면 받는 쪽이 5개인지 5kg인지 알 수 없다.
 * (설계: docs/PURCHASE_ORDER_SYSTEM.md 발주 알림 메일 품목표 절)
 */
export function poItemLines(po: SharePO, formatQuantity: (q: any) => string): string {
  return (po.items || []).map((it) => {
    const internalName = it.product_name || it.ingredient_name || ('Item #' + it.ingredient_id);
    const mainName = it.seller_product_name || internalName;
    const sku = it.seller_product_sku ? ` [${it.seller_product_sku}]` : '';
    const unit = it.unit ? ` ${it.unit}` : '';
    return `- ${mainName}${sku} x ${formatQuantity(it.quantity_ordered)}${unit} @ ${parseFloat(String(it.unit_price)).toFixed(2)}`;
  }).join('\n');
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
