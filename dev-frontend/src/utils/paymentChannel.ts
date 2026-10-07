/**
 * 결제수단이 어느 채널에서 열려 있는가 — 화면 쪽 단일 규칙 (서버 utils/paymentMethodGuard.methodOpenIn 과 같은 규칙).
 *
 * 채널 3개: pos(계산대) · mobile(손님 폰) · kiosk(등록된 매장 태블릿).
 * 키오스크 열은 매장이 한 번이라도 만지기 전까지 **모바일과 같다**(`_kioskSplit` 표시가 없으면 mobile 값을 따른다).
 * 그래서 기존 매장은 아무것도 바꾸지 않아도 오늘과 똑같이 동작한다(마이그·데이터 쓰기 0).
 * Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D3.
 */
export type PaymentChannel = 'pos' | 'mobile' | 'kiosk';

/** 키오스크 열에서 아예 보이지 않는 수단 — 공용 기기에 맞지 않는다(현금·직원식·송금 증빙 업로드). */
export const KIOSK_HIDDEN_METHODS = ['cash', 'staffMeal', 'bankTransfer'];

export function isKioskSplit(settings: any): boolean {
  return !!(settings && settings._kioskSplit === true);
}

/** 이 수단이 이 채널에서 열려 있나. method = settings[key]. */
export function methodOpenIn(settings: any, key: string, channel: PaymentChannel): boolean {
  const m = settings?.[key];
  if (!m || typeof m !== 'object' || !Array.isArray(m.availableIn)) return false;
  if (channel === 'kiosk') {
    if (KIOSK_HIDDEN_METHODS.includes(key)) return false;
    if (isKioskSplit(settings)) return m.availableIn.includes('kiosk');
    // 미분리: 모바일 값을 따르되 온라인 결제(카드번호 입력)는 공용 기기라 기본 OFF — 매장이 Kiosk 토글로 켠다
    if (key === 'online') return false;
    return m.availableIn.includes('mobile');
  }
  return m.availableIn.includes(channel);
}

/**
 * 키오스크 열을 처음 만질 때 — 지금 화면에 보이던 값(= 모바일 값)을 키오스크 값으로 굳힌다.
 * 이 뒤로는 키오스크와 모바일이 따로 저장된다. 이미 나뉘어 있으면 그대로 돌려준다.
 */
export function splitKioskFromMobile(settings: any): any {
  if (!settings || isKioskSplit(settings)) return settings;
  const out: any = { ...settings, _kioskSplit: true };
  for (const key of Object.keys(settings)) {
    const m = settings[key];
    if (!m || typeof m !== 'object' || !Array.isArray(m.availableIn)) continue;
    const mirrored = methodOpenIn(settings, key, 'kiosk');
    const rest = m.availableIn.filter((c: string) => c !== 'kiosk');
    out[key] = { ...m, availableIn: mirrored ? [...rest, 'kiosk'] : rest };
  }
  return out;
}
