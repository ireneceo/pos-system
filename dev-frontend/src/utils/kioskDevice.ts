/**
 * 등록된 키오스크 기기 — 이 기기가 매장에 등록돼 있는가 (Fable 판정 .claude/fable-verdict-20261007-kiosk-payment-split.md D2).
 *
 * «키오스크» 는 URL(`?kiosk=1`)이 아니라 이 토큰이다. 매장 관리자가 그 태블릿에서 «이 기기를 키오스크로 등록» 을
 * 누르면 서버가 토큰을 한 번 준다 → 여기 저장 → 직원 로그인은 지운다.
 *   - 토큰이 있으면: 키오스크 결제 채널(설정의 Kiosk 열) + 단말기 결제 + 주문 꼬리표 «Kiosk».
 *   - 토큰이 없으면(손님 폰·미등록 태블릿): `?kiosk=1` 이어도 화면만 넓어지고 결제수단은 모바일과 같다.
 * 토큰은 /api/orders · /api/terminal · /api/kiosk-devices/me 요청에만 실린다(utils/httpClient 한 곳).
 * 서버가 401 KIOSK_REVOKED 를 주면(매장이 등록 해제) 토큰을 지우고 직원 로그인 화면으로 간다.
 */
const TOKEN_KEY = 'kiosk_device_token';
const INFO_KEY = 'kiosk_device_info';

export interface KioskDeviceInfo { id: number; name: string; restaurantId: number; slug: string }

export function getKioskToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function hasKioskToken(): boolean {
  return !!getKioskToken();
}

export function getKioskInfo(): KioskDeviceInfo | null {
  try {
    const raw = localStorage.getItem(INFO_KEY);
    return raw ? JSON.parse(raw) as KioskDeviceInfo : null;
  } catch { return null; }
}

export function saveKioskDevice(token: string, info: KioskDeviceInfo): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(INFO_KEY, JSON.stringify(info));
  } catch { /* 저장 불가(사생활 보호 모드) — 등록 화면이 실패로 알린다 */ }
}

export function clearKioskDevice(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(INFO_KEY);
  } catch { /* ignore */ }
}

/** 이 요청에 기기 토큰을 실어야 하는가 — 키오스크가 실제로 쓰는 경로만. */
export function needsKioskHeader(url: string): boolean {
  return /\/api\/(orders(\/|\?|$)|terminal\/|kiosk-devices\/me)/.test(url);
}

/** 키오스크 첫 화면 주소 — 등록된 기기는 언제나 이 매장의 키오스크로 연다. */
export function kioskHomePath(info: KioskDeviceInfo | null = getKioskInfo()): string | null {
  return info?.slug ? `/mobile/${info.slug}?kiosk=1` : null;
}

/**
 * 등록이 아직 살아 있는지 서버에 묻는다. 해제됐으면 토큰을 지우고 false.
 * 네트워크 오류는 «모름» 이라 그대로 둔다(true) — 잠깐 끊겼다고 키오스크를 풀지 않는다.
 */
export async function verifyKioskRegistration(): Promise<boolean> {
  if (!hasKioskToken()) return false;
  try {
    const res = await fetch('/api/kiosk-devices/me');
    if (res.status === 401) { clearKioskDevice(); return false; }
    if (res.ok) {
      const j = await res.json().catch(() => null);
      const d = j?.data;
      if (d?.slug) saveKioskDevice(getKioskToken() as string, { id: d.id, name: d.name, restaurantId: d.restaurant_id, slug: d.slug });
    }
    return true;
  } catch {
    return true;
  }
}
