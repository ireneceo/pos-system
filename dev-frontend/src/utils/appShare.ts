/**
 * «카톡·다른 앱으로 보내기» — 휴대폰 공유하기 창, 없으면 글 복사 (2026-10-30 Irene «권고대로»).
 *
 * Irene: "발주할 때 여기 저기에 있는 왓츠앱으로 보내기처럼 카톡으로 보내기도 가능해?"
 *   카톡에는 wa.me 같은 «번호 + 글 채운 대화 열기» 링크가 없다 → 받는 사람은 카톡 안에서 고른다.
 *   휴대폰: 공유하기 창(navigator.share)에 카톡·라인·텔레그램 등이 뜬다.
 *   PC: 공유하기 창에 카톡이 없다 → 글을 복사하고 «카톡에 붙여 넣기» 안내(호출부가 결과로 띄운다).
 *
 * 글은 왓츠앱과 같은 빌더에서 굵게 표시(`*`)만 뺀 것이다 — 카톡은 `*` 를 굵게 바꾸지 않는다.
 * ⛔ 클릭 핸들러 안에서 await 없이 바로 부를 것 — 공유하기 창은 «방금 누름» 이 있어야 열린다.
 */
export type AppShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

/** 손가락 화면(휴대폰·태블릿)인가 — PC 공유하기 창에는 카톡이 없어 복사가 낫다. */
function isTouchDevice(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return false;
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* 아래 옛 방식으로 */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export async function shareTextViaApps(text: string, title?: string): Promise<AppShareResult> {
  const nav: any = typeof navigator !== 'undefined' ? navigator : null;
  if (nav?.share && isTouchDevice()) {
    try {
      await nav.share(title ? { title, text } : { text });
      return 'shared';
    } catch (e: any) {
      if (e?.name === 'AbortError') return 'cancelled';
      // 막힌 경우(권한·형식) — 복사로 넘어간다
    }
  }
  return (await copyText(text)) ? 'copied' : 'failed';
}
