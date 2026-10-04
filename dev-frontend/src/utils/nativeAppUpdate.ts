/**
 * 안드로이드 계산대 앱 업데이트 안내 — 순수 함수 + 피드 읽기 1개 (Fable 설계 .claude/fable-design-20261004-android-update.md §4-1)
 * Irene 2026-10-04 「바꿔. 업데이트 뜨게 해.」
 *
 * 피드 = /desktop/android-latest.json — mobile-app/scripts/build-release.sh 만 만든다(손 편집 금지).
 * 상대경로라 dev 앱은 dev 피드, 운영 앱은 운영 피드를 읽는다.
 * ⛔ 검증 안 된 피드 텍스트로 URL 을 만들지 않는다 — file 이 정규식에 맞을 때만(데스크탑 피드와 같은 원칙).
 */
export interface AndroidFeed { versionName: string; versionCode: number | null; file: string; sha256: string; size: number }
export const ANDROID_FEED_URL = '/desktop/android-latest.json';
const FILE_RE = /^PurplePOS-\d+\.\d+\.\d+\.apk$/;
const DISMISS_KEY = 'pos.native-update.dismissed';

/** 모양 검증 — 틀리면 null (throw 금지) */
export function parseFeed(raw: unknown): AndroidFeed | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.versionName !== 'string' || !parseVersion(r.versionName)) return null;
  if (typeof r.file !== 'string' || !FILE_RE.test(r.file)) return null;
  if (typeof r.sha256 !== 'string' || !/^[0-9a-fA-F]{64}$/.test(r.sha256)) return null;
  const size = Number(r.size);
  if (!Number.isFinite(size) || size <= 0) return null;
  const vc = r.versionCode == null ? null : Number(r.versionCode);
  return { versionName: r.versionName, versionCode: Number.isInteger(vc) ? (vc as number) : null, file: r.file, sha256: r.sha256, size };
}

/** "0.3.1-dev" → [0,3,1]. 못 읽으면 null */
export function parseVersion(v: string | null | undefined): number[] | null {
  if (typeof v !== 'string') return null;
  const m = v.trim().replace(/-.*$/, '').match(/^(\d+)\.(\d+)\.(\d+)$/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

/**
 * 피드가 지금 앱보다 새것인가. 둘 다 versionCode 가 있으면 정수 비교, 아니면 versionName(semver) 비교.
 * 현재 버전을 못 읽으면(브릿지가 못 채움) true — 그런 앱은 어차피 고장이고, 안내가 떠도 «같은 버전 덮어쓰기» 이상의 해가 없다.
 * 숨기면 고장이 안 보인다(검증 규율 4조).
 */
export function isNewer(feed: AndroidFeed, current: { versionName: string | null; versionCode: number | null }): boolean {
  if (feed.versionCode != null && current.versionCode != null) return feed.versionCode > current.versionCode;
  const cur = parseVersion(current.versionName);
  if (!cur) return true;
  const nxt = parseVersion(feed.versionName) as number[];
  for (let i = 0; i < 3; i++) {
    if (nxt[i] !== cur[i]) return nxt[i] > cur[i];
  }
  return false;
}

export function readDismiss(): { version: string; until: number } | null {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return null;
    const j = JSON.parse(raw);
    return j && typeof j.version === 'string' && Number.isFinite(j.until) ? j : null;
  } catch { return null; }
}

export function writeDismiss(version: string, hours = 24): void {
  try { localStorage.setItem(DISMISS_KEY, JSON.stringify({ version, until: Date.now() + hours * 3600 * 1000 })); } catch { /* 저장 불가 = 다음에 또 뜸 */ }
}

/** «나중에» 는 그 버전·24시간 한정 — 더 새 버전이 오면 즉시 다시 뜬다 */
export function isDismissed(feed: AndroidFeed): boolean {
  const d = readDismiss();
  return !!d && d.version === feed.versionName && Date.now() < d.until;
}

export function currentNativeVersion(): { versionName: string | null; versionCode: number | null } {
  const p = (window as any).__NATIVE_PRINT;
  const vc = p?.versionCode == null ? null : Number(p.versionCode);
  return { versionName: typeof p?.version === 'string' ? p.version : null, versionCode: Number.isInteger(vc) ? vc : null };
}

export function isAndroidNativeApp(): boolean {
  return (window as any).__PURPLE_DESKTOP?.platform === 'android';
}

export async function fetchAndroidFeed(): Promise<AndroidFeed | null> {
  try {
    const res = await fetch(ANDROID_FEED_URL, { cache: 'no-store' });
    if (!res.ok) return null;
    return parseFeed(await res.json());
  } catch { return null; }
}

/**
 * 0.2.0/0.3.0(앱 안 설치 기능 없음) → 시스템 브라우저로 넘긴다(설계 D6).
 *   Capacitor Bridge.launchIntent 는 scheme·host 가 앱 URL 과 다르면 ACTION_VIEW 로 외부 앱(Chrome)에 넘기고 WebView 는 머문다.
 *   http 는 nginx/CF 가 301 → https 로 돌려 Chrome 이 .apk 를 받는다.
 *   ⛔ `download` 속성·`_blank` 는 WebView 에 DownloadListener/onCreateWindow 가 없어 아무 일도 안 일어난다.
 */
export function externalHandoffUrl(file: string): string {
  return `http://${window.location.host}/desktop/${file}`;
}

/**
 * 도움말 › «다운로드» — 기기에 맞는 계산대 앱으로 (2026-10-04 Irene 「좌측 도움말 하위메뉴에 다운로드도 다시 넣어줘. 기종에 맞게 다운되게」).
 *   안드로이드 앱 안 → 시스템 브라우저로 넘겨 APK(앱 WebView 는 다운로드를 못 한다 — externalHandoffUrl 과 같은 이유)
 *   안드로이드 브라우저 → APK 별칭 · Windows 브라우저 → 설치본 별칭 · 그 밖(아이폰·맥·Windows 앱) → /download 페이지
 *   파일은 항상-최신 별칭만 쓴다(버전 리터럴 금지 — check-desktop-feed).
 */
export function appDownloadTarget(): { kind: 'handoff' | 'file' | 'page'; href: string } {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const desk = (window as any).__PURPLE_DESKTOP;
  if (desk?.platform === 'android') return { kind: 'handoff', href: `http://${window.location.host}/desktop/PurplePOS.apk` };
  if (desk) return { kind: 'page', href: '/download' };
  if (/Android/i.test(ua)) return { kind: 'file', href: '/desktop/PurplePOS.apk' };
  if (/Windows/i.test(ua)) return { kind: 'file', href: '/desktop/PurplePOS-Setup.exe' };
  return { kind: 'page', href: '/download' };
}
