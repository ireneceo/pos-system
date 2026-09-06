// @ts-check
/**
 * 달력 월 라벨 — 브라우저 타임존이 달라도 월 이름이 밀리지 않는다.
 * ------------------------------------------------------------------------------
 * 배경 (2026-09-05): 배송 모달 달력이 9월인데 헤더에 "August" 로 떴다.
 *   원인은 월 이름을 `Date` 로 만들면서 브라우저 로컬 시각으로 밀린 것.
 *   2026-07-05 에 CalendarPicker 는 고쳤는데 **DateField 가 빠져 있었고**,
 *   09-05 에 `getMonthLabel` 을 export 해 두 부품이 같은 함수를 쓰게 했다(복사 금지).
 *   jest 4/4 로 로직은 박았지만 **실제 화면에서 확인한 적이 없었다** → 이 spec 이 그 자리.
 *
 * 방법: 브라우저 존을 **America/Los_Angeles(UTC-7)** 에 두고 매장(MYT, UTC+8) 화면을 연다.
 *   ⚠ 방향이 중요하다 — 라벨을 UTC 기준 날짜에서 파생시키면 UTC 보다 **뒤진** 존에서만
 *   하루 뒤로 밀린다. 처음 KST(UTC+9)로 썼을 때는 고장주입이 그대로 통과했다(2026-09-06).
 *   읽기 전용(데이터 무변경) — demo rid=38.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, bodyLooksCrashed } = require('./fixtures/demo-guard');

// 브라우저 존을 매장(Asia/Kuala_Lumpur, UTC+8)과 다르게, 그리고 **UTC 보다 뒤로** 둔다.
//   ⚠ 방향이 중요하다 — 라벨을 UTC 기준 날짜에서 파생시키면 UTC 보다 **뒤진** 존에서만
//   하루 뒤로 밀린다. KST(UTC+9)로 두면 밀려도 같은 날이라 결함이 안 드러난다
//   (2026-09-06 실측: KST 로 쓴 첫 spec 이 고장주입을 통과시켰다).
test.use({ timezoneId: 'America/Los_Angeles' });

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

test.describe('달력 월 라벨 — 타임존이 달라도 안 밀린다', () => {
  test('브라우저 존이 UTC 보다 뒤져도 달력 헤더가 "이번 달" 이름과 일치 (crash 0)', async ({ page, request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await page.goto(`/restaurant/${user.restaurant_id}/reports`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // 기준일을 **그 달 1일**로 만든다 — 하루 밀림은 월 경계에서만 달 이름을 바꾸므로,
    //   월 중간이 기준이면 결함이 있어도 라벨이 그대로여서 검사가 무의미해진다.
    const monthBtn = page.getByText('Month', { exact: true }).first();
    if (await monthBtn.count()) { await monthBtn.click(); await page.waitForTimeout(800); }
    let body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 5000);
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
    expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();

    // 달력 열기 — 범위 트리거. 라벨은 범위가 잡혀 있으면 "2026-09-01 ~ 2026-09-06",
    //   비어 있으면 "Custom Range" 다(DatePeriodFilter). 둘 다 받는다.
    const trigger = page.getByText(/Custom Range|\d{4}-\d{2}-\d{2}\s*~\s*\d{4}-\d{2}-\d{2}/).first();
    await expect(trigger, '날짜 범위 트리거 존재').toHaveCount(1);
    await trigger.click();
    await page.waitForTimeout(700);

    // 달력이 여는 달의 **기준**은 오늘이 아니라 선택된 범위의 시작일이다
    //   (CalendarPicker:108 `anchor = startDate || endDate || new Date()`).
    //   그래서 기대값을 트리거에 적힌 날짜 문자열(YYYY-MM-DD)에서 뽑는다 —
    //   문자열의 숫자를 그대로 읽으므로 Date·타임존을 한 번도 거치지 않는다.
    //   범위가 비어 있으면(Custom Range) 오늘이 기준이다.
    const triggerText = (await trigger.innerText()).trim();
    const m = triggerText.match(/(\d{4})-(\d{2})-(\d{2})/);
    let expected;
    if (m) {
      expected = `${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
    } else {
      const now = await page.evaluate(() => ({ y: new Date().getFullYear(), m: new Date().getMonth() }));
      expected = `${MONTHS[now.m]} ${now.y}`;
    }

    expect(pageErrors, '달력 연 뒤 pageerror').toHaveLength(0);

    // ⚠ 페이지 전체 텍스트로 재면 안 된다 — 리포트 표에도 월 이름이 있어 오탐이 난다
    //   (2026-09-06 실측: 본문에 "August 2026" 이 있어 넓은 단언이 헛되이 실패했다).
    //   **달력 헤더 요소 자체**를 잡아 그 텍스트만 본다.
    const header = page.getByText(
      /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/
    ).first();
    await expect(header, '달력 헤더(월 라벨) 존재').toHaveCount(1);
    const headerText = (await header.innerText()).trim();
    expect(headerText, `달력 헤더는 "${expected}"(기준 "${triggerText}") 여야 한다 — 월 이름을 시각에서 파생시키면 브라우저 존과 UTC 차이만큼 밀린다`)
      .toBe(expected);
  });
});
