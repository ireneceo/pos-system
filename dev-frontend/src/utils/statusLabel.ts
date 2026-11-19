// react-i18next 의 t 와 i18next 의 TFunction 은 버전마다 모양이 달라, 쓰는 만큼만 받는다
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFunction = (key: string, options?: any) => any;

/**
 * 상태·우선순위·종류 «값» → 지금 언어의 낱말 (2026-11-18 · Fable 설계 E2).
 *
 * 화면마다 DB 값을 그대로 찍어 한국어 화면에 ACTIVE / active / Active 가 섞여 보였다.
 * 값 하나를 받아 common 번역의 status 묶음(이미 있음 — 활성·대기중·결제완료 …)에서 찾고,
 * 없으면 extra 묶음(우선순위·공지 중요도 등)에서, 그래도 없으면 첫 글자만 대문자로 돌려준다
 * (원자료 소문자·밑줄이 그대로 보이지 않게).
 */
const toKey = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/_([a-z])/g, (_m, c: string) => c.toUpperCase());

export const prettyValue = (raw: string): string => {
  const s = String(raw).replace(/[_-]+/g, ' ').trim().toLowerCase();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
};

export function statusLabel(t: TFunction, raw: unknown): string {
  if (raw === null || raw === undefined || raw === '') return '';
  const v = String(raw);
  const key = toKey(v);
  const fallback = prettyValue(v);
  const a = t(`common:status.${key}`, { defaultValue: '' }) as string;
  if (a) return a;
  const b = t(`common:statusExtra.${key}`, { defaultValue: '' }) as string;
  return b || fallback;
}

export default statusLabel;
