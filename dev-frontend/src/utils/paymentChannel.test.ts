import { methodOpenIn, splitKioskFromMobile, isKioskSplit } from './paymentChannel';

// 서버 utils/paymentMethodGuard.methodOpenIn 과 같은 규칙 — 키오스크 열은 따로 정하기 전까지 모바일과 같다.
const base = {
  cash: { enabled: true, availableIn: ['pos', 'mobile'] },
  card: { enabled: true, availableIn: ['pos'] },
  ewallet: { enabled: true, availableIn: ['pos', 'mobile'] },
  counter: { enabled: true, availableIn: ['mobile'] },
  bankTransfer: { enabled: true, availableIn: ['mobile'] },
  online: { enabled: true, availableIn: ['mobile'] },
  _order: ['cash', 'card', 'ewallet', 'counter', 'bankTransfer', 'online'],
};

describe('paymentChannel', () => {
  it('미분리 매장: 키오스크 = 모바일 (숨김 3종 제외)', () => {
    expect(methodOpenIn(base, 'ewallet', 'kiosk')).toBe(true);
    expect(methodOpenIn(base, 'counter', 'kiosk')).toBe(true);
    expect(methodOpenIn(base, 'card', 'kiosk')).toBe(false);
    expect(methodOpenIn(base, 'cash', 'kiosk')).toBe(false);
    expect(methodOpenIn(base, 'bankTransfer', 'kiosk')).toBe(false);
    expect(methodOpenIn(base, '_order', 'kiosk')).toBe(false);
  });

  it('미분리 매장: 온라인 결제(카드번호 입력)는 키오스크에서 기본 OFF · 모바일은 그대로', () => {
    expect(methodOpenIn(base, 'online', 'kiosk')).toBe(false);
    expect(methodOpenIn(base, 'online', 'mobile')).toBe(true);
    // 처음 나눠도 OFF 로 굳는다 — 매장이 Kiosk 토글로 켜야 열린다
    const split = splitKioskFromMobile(base);
    expect(methodOpenIn(split, 'online', 'kiosk')).toBe(false);
    split.online = { ...split.online, availableIn: ['mobile', 'kiosk'] };
    expect(methodOpenIn(split, 'online', 'kiosk')).toBe(true);
  });

  it('처음 나누면 지금 보이던 값을 그대로 굳힌다 · 모바일·POS 값은 그대로', () => {
    const split = splitKioskFromMobile(base);
    expect(isKioskSplit(split)).toBe(true);
    for (const k of ['cash', 'card', 'ewallet', 'counter', 'bankTransfer', 'online']) {
      expect(methodOpenIn(split, k, 'kiosk')).toBe(methodOpenIn(base, k, 'kiosk'));
      expect(methodOpenIn(split, k, 'mobile')).toBe(methodOpenIn(base, k, 'mobile'));
      expect(methodOpenIn(split, k, 'pos')).toBe(methodOpenIn(base, k, 'pos'));
    }
    expect(split._order).toEqual(base._order);
    expect(splitKioskFromMobile(split)).toBe(split);
  });

  it('나눈 뒤에는 키오스크·모바일이 따로 움직인다', () => {
    const split = splitKioskFromMobile(base);
    split.card = { ...split.card, availableIn: ['pos', 'kiosk'] };
    split.ewallet = { ...split.ewallet, availableIn: ['pos', 'mobile'] };
    expect(methodOpenIn(split, 'card', 'kiosk')).toBe(true);
    expect(methodOpenIn(split, 'card', 'mobile')).toBe(false);
    expect(methodOpenIn(split, 'ewallet', 'kiosk')).toBe(false);
    expect(methodOpenIn(split, 'ewallet', 'mobile')).toBe(true);
  });
});
