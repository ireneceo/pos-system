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
 *
 * 🔴 2026-08-31 Irene(2차): *"왓츠앱으로 주는 형태가 보기가 너무 어려운데. 공급업체가 체크하고
 *   주문 내역대로 정리하기 어려울 것 같아. 몇개인지도 모르겠고 … 이름 옆에도 내용이 따라 붙어서
 *   이름이 잘 안보이는데 이름만 굵게하는 건 어때?"*
 *   그전엔 한 줄에 이름·SKU·수량·단가를 다 붙여 이름이 묻혔고, 품목이 몇 개인지도 셀 수 없었다.
 *   (매장은 이 화면 대신 **캡처를 보내는 게 더 낫다**고 느끼고 있었다 — 그게 실패 신호였다.)
 *   → ①품목명 **굵게**(WhatsApp `*bold*`) ②이름과 수량을 **줄 분리** ③**번호 매김**(받는 쪽이
 *     하나씩 체크하며 담을 수 있게) ④줄마다 **소계** ⑤머리말에 **품목 수** 명시.
 *   `bold()` 는 채널별로 다르다 — 왓츠앱은 `*..*`, 메일(mailto 평문)은 굵게가 없어 그대로 둔다.
 * (설계: docs/PURCHASE_ORDER_SYSTEM.md 발주 알림 메일 품목표 절)
 */
/**
 * 공급업체가 **실제로 쓰는 품목코드**인지 판정 — 단일 소스(화면·왓츠앱·메일이 같은 규칙).
 *
 * 🔴 2026-08-31 Irene: "여기에 나오는 리스트는 코드들 왜 없앴어?"
 *   화면에서 뺀 적은 없었다(원래 없었다). 문제는 반대로 **왓츠앱에 쓸모없는 코드를 넣은 것**이었다.
 *   실측: `SP-10-0011` 류는 **우리 시스템 자동 채번**이라 공급업체는 모르는 번호다.
 *   진짜 공급업체 코드를 가진 곳은 LSH 뿐(61개 중 57개 · 예 `1100-013`, `2017-013`);
 *   TaiYangFresh 36 / AIM 11 / Guan Kee 10 / Hokkaido 1 은 **실제코드 0개**.
 *   → `SP-<숫자>-<숫자>` 패턴은 감춘다. 받는 쪽이 모르는 번호는 소음일 뿐이다.
 */
export function isRealSupplierSku(sku?: string | null): boolean {
  if (!sku) return false;
  return !/^SP-\d+-\d+$/i.test(sku.trim());
}

export function poItemLines(
  po: SharePO,
  formatQuantity: (q: any) => string,
  bold: (s: string) => string = (s) => s,
): string {
  return (po.items || []).map((it) => {
    const internalName = it.product_name || it.ingredient_name || ('Item #' + it.ingredient_id);
    const mainName = it.seller_product_name || internalName;
    const qty = `${formatQuantity(it.quantity_ordered)}${it.unit ? ' ' + it.unit : ''}`;
    const price = parseFloat(String(it.unit_price)).toFixed(2);
    const lineTotal = (Number(it.quantity_ordered) * Number(it.unit_price)).toFixed(2);
    const sku = isRealSupplierSku(it.seller_product_sku) ? `  [${it.seller_product_sku}]` : '';
    // 🔴 2026-08-31 Irene(3차): "단위랑 단가를 2줄로 내렸어? 번호를 붙인거랑 줄이 이상하게
    //   나열되서 보기 어렵잖아. 이럴거면 그냥 한줄이 낫겠어" → 번호·줄바꿈 철회, **한 줄**로 환원.
    //   남기는 개선은 ①이름 굵게(원래 Irene 제안) ②단위 ③줄별 소계 ④머리말 품목 수.
    //   교훈: 정보를 더 넣는 것보다 **한 줄에서 이름이 먼저 읽히는 것**이 중요했다.
    return `- ${bold(mainName)}${sku}  ${qty} × ${price} = ${lineTotal}`;
  }).join('\n');
}

/**
 * WhatsApp 발송 — 판매자 번호가 있으면 그 번호로, 없으면 연락처 선택 화면으로.
 * WhatsApp 은 `*텍스트*` 를 굵게 렌더한다 → 품목명·합계를 굵게 해 스캔이 쉽게.
 */
export function sharePoViaWhatsApp(po: SharePO, formatQuantity: (q: any) => string): void {
  const cur = po.currency || 'MYR';
  const b = (s: string) => `*${s}*`;
  const count = (po.items || []).length;
  const text = encodeURIComponent(
    `${b('PURCHASE ORDER')}\n` +
    `${po.po_number || '#' + po.id}\n` +
    `${po.seller?.name ? po.seller.name + '\n' : ''}` +
    `\n${b(`Items (${count})`)}\n` +
    `${poItemLines(po, formatQuantity, b) || '(none)'}\n\n` +
    `${b(`TOTAL: ${cur} ${parseFloat(String(po.total_amount || '0')).toFixed(2)}`)}\n` +
    `${po.expected_delivery_date ? '\nExpected delivery: ' + po.expected_delivery_date : ''}` +
    `${po.delivery_address ? '\nDeliver to: ' + po.delivery_address : ''}` +
    `\n\nPlease confirm this order.`
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
    `Items (${(po.items || []).length}):\n${poItemLines(po, formatQuantity) || '(none)'}\n\n` +
    `Total: ${po.currency || 'MYR'} ${parseFloat(String(po.total_amount || '0')).toFixed(2)}\n` +
    `${po.expected_delivery_date ? 'Expected: ' + po.expected_delivery_date + '\n' : ''}` +
    `${po.delivery_address ? 'Deliver to: ' + po.delivery_address + '\n' : ''}` +
    `\nPlease confirm receipt of this order.\n\nThank you.`
  );
  window.location.href = `mailto:${po.seller.email}?subject=${subject}&body=${body}`;
  return true;
}
