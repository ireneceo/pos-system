// 키오스크 유휴 타이머 — «연기» 뒤에 **다시 울리는가**.
//
// 배경 (2026-09-10 Fable 게이트 F2): 결제 요청이 나가 있으면 유휴 리셋을 미뤄야 한다.
// 그런데 콜백이 그냥 `return` 하면 타이머가 재무장되지 않아 **다시는 울리지 않는다** —
// 카드가 거절되고 손님이 떠나면 앞사람 장바구니가 결제 화면에 영구히 남는다.
// 이번에 고치려던 바로 그 증상이라, «연기 → 재호출» 을 기계로 못박는다.
import { watchKioskIdle } from './kioskMode';

describe('watchKioskIdle — 연기(false) 뒤 재무장', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); });

  it('false 를 돌려주면 같은 간격으로 다시 부른다', () => {
    let calls = 0;
    let deferring = true;
    const stop = watchKioskIdle(() => { calls += 1; return deferring ? false : undefined; }, 1000);

    jest.advanceTimersByTime(1000);
    expect(calls).toBe(1);                 // 1차 — 연기

    jest.advanceTimersByTime(1000);
    expect(calls).toBe(2);                 // 재무장돼 다시 울렸다 (이게 F2 의 핵심)

    deferring = false;                     // 이번엔 실제로 리셋한다
    jest.advanceTimersByTime(1000);
    expect(calls).toBe(3);

    jest.advanceTimersByTime(5000);        // 연기가 아니었으므로 더 울리지 않는다
    expect(calls).toBe(3);
    stop();
  });

  it('정리 함수를 부르면 더 울리지 않는다', () => {
    let calls = 0;
    const stop = watchKioskIdle(() => { calls += 1; return false; }, 1000);
    jest.advanceTimersByTime(1000);
    expect(calls).toBe(1);
    stop();
    jest.advanceTimersByTime(10000);
    expect(calls).toBe(1);
  });
});
