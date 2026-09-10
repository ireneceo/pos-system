/**
 * getErrorMessage 회귀 테스트 — 2026-09-10 운영 신고(Minified React error #31) 재발 방지.
 *
 * 유틸은 2026-07-03 부터 있었는데 호출부 12곳이 여전히 `data.error` 를 그대로 쓰고 있었고,
 * 그중 브랜드 레시피 화면이 실제로 죽어 신고가 들어왔다
 * (`/pos/recipes?tab=recipes&brandId=2`, iPad, 번들 cff2e9b3).
 * 이 테스트는 **항상 화면에 그릴 수 있는 글자만 나온다**를 못박는다.
 */
import { getErrorMessage } from './apiError';

const FALLBACK = 'fallback';

describe('getErrorMessage — 화면에 그릴 수 있는 글자만 돌려준다', () => {
  it('꾸러미 { message, code } 에서 사유만 꺼낸다 (이게 화면을 죽이던 값)', () => {
    expect(getErrorMessage({ error: { message: 'Recipe name is required', code: 'VALIDATION_ERROR' } }, FALLBACK))
      .toBe('Recipe name is required');
  });

  it('어떤 응답을 넣어도 객체를 돌려주지 않는다', () => {
    const bodies: unknown[] = [
      { error: { message: 'x', code: 'C' } },
      { error: { code: 'NO_MESSAGE' } },
      { error: { message: { nested: true } } },
      { error: {} },
      { error: [] },
      { error: 'plain string' },
      { message: 'top level' },
      { success: false },
      {}, null, undefined,
    ];
    for (const b of bodies) {
      expect(typeof getErrorMessage(b as any, FALLBACK)).toBe('string');
    }
  });

  it('옛 형태(문자열 error)와 { message } 도 그대로 살린다', () => {
    expect(getErrorMessage({ error: 'Legacy failure' }, FALLBACK)).toBe('Legacy failure');
    expect(getErrorMessage({ message: 'Top level message' }, FALLBACK)).toBe('Top level message');
  });

  it('꺼낼 게 없으면 기본 문구를 준다', () => {
    expect(getErrorMessage({ error: { code: 'ONLY_CODE' } }, FALLBACK)).toBe(FALLBACK);
    expect(getErrorMessage(null, FALLBACK)).toBe(FALLBACK);
  });
});
