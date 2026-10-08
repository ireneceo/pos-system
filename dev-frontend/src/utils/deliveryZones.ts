/**
 * 판매자 배송 지역 — 화면 쪽 정의 (2026-10-07 Fable 판정 `.claude/fable-verdict-20261007-seller-delivery-zones.md`)
 *
 * 매칭·검증의 진실은 서버 `dev-backend/utils/deliveryZones.js` 한 곳이다. 여기는 체크 목록(정본 16개)과
 * 타입만 둔다 — 화면이 지역을 따로 판정하지 않는다(담기 목록 API 가 이 매장에 대해 고른 지역을 내려준다).
 */
export const MY_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Penang', 'Perak',
  'Perlis', 'Sabah', 'Sarawak', 'Selangor', 'Terengganu', 'Kuala Lumpur', 'Labuan', 'Putrajaya',
] as const;

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number | string;
  states: string[];
  description?: string;
}

/** 저장할 수 있는 줄 = 이름 · 배송비(0 이상) · 주 하나 이상 */
export function isZoneComplete(z: DeliveryZone): boolean {
  const fee = z.fee === '' || z.fee === null || z.fee === undefined ? NaN : Number(z.fee);
  return !!String(z.name || '').trim() && Number.isFinite(fee) && fee >= 0 && Array.isArray(z.states) && z.states.length > 0;
}

/** 서버로 보낼 값 — 완성된 줄만, 배송비는 숫자로 */
export function zonesForSave(zones: DeliveryZone[]): Array<Omit<DeliveryZone, 'fee'> & { fee: number }> {
  return zones.filter(isZoneComplete).map(z => ({
    id: z.id,
    name: String(z.name).trim(),
    fee: Number(z.fee),
    states: z.states,
    ...(z.description && String(z.description).trim() ? { description: String(z.description).trim() } : {}),
  }));
}

export function readZones(v: unknown): DeliveryZone[] {
  return Array.isArray(v) ? (v as DeliveryZone[]).map(z => ({ ...z, states: Array.isArray(z.states) ? z.states : [] })) : [];
}
