# Fable 게이트 판정 — 2026-10-04 고객화면 자동열림·대시보드 나가기·POS 언어 (SW 5.80)

**최종 판정 (2회차): PASS — §3 보완 1줄 반영 확인 · bless 2026-10-04T14:53:22Z · 마커 찍음. §6 참조.**
(1회차 판정: 조건부 보류 — 1줄 보완 후 2회차 게이트에서 bless·마커.)
판정 세션: Fable 5.1 (Agent) · 작성 2026-10-04 · 판정문 경로 `.claude/fable-verdict-20261004-display-language-gate.md`

## 0. 대상
Irene 원문: 「포스 열었을 때 듀얼 아니면 고객화면 안열려야 할 것 같아. … 포스터미널 열었는데 고객화면이 가려버려. 앱에서는 창을 닫지도 못하잖아. 고객 디스플레이도 대시보드로 가기 있어야겠는데? 테스트 할 수가 없음. 그리고 한글로 설정했는데 포스터미널만 영어로 표시되네」
기기: 안드로이드 태블릿 앱, 화면 1개. 맥락: 매장 13 카드단말기 Echo 승인 직후 RM1 테스트가 막힘.

check-sensitive-diff: ① 🔒 POSTerminalPage.tsx · ② PaymentModal.tsx / CheckoutDisplayPage.tsx → 게이트 대상. 이번이 이 사안 **1회차**.

## 1. diff 범위 대조 (설계 외 변경 0 인지)
| 파일 | 실측 | 판정 |
|---|---|---|
| 🔒 `POSTerminalPage.tsx` | 32 hunk 전부 JSX 텍스트·title·placeholder → `t('pos:posScreen.*', '<영문>')`. `t` 는 1302줄 `useTranslation('pos')` 하나(다른 t 선언 0). `+/-` 줄 중 'print' 포함 **0**(내가 재집계). 직접 인쇄 블록·주문 로직·데이터 비교 문자열 무접촉. | 통과 |
| `OrderCompleteModal.tsx` | 마지막 hunk 486줄 — 510줄 이후 영수증 인쇄 템플릿 무접촉. Print Bill/Ticket 은 **라벨만**, 핸들러 그대로. | 통과 |
| `PaymentModal.tsx` | 라벨 37곳 → 기존 `tPos`(304줄). 금액 계산식·결제 흐름 줄 변경 0. | 통과 |
| `CashierPinModal.tsx` | useTranslation 추가 + 라벨 5. | 통과 |
| `customerDisplay.ts` | `tryAutoReopen` 에 `screen.isExtended !== true → return` 1조건. 수동 버튼(`openCustomerDisplay`) 호출부 4곳(POS 3281·FloorPlan 2곳·Settings 2곳) 무접촉. `window.open(... noopener=no ...)` → 팝업은 opener 를 가진다(실측 230줄). | 통과 |
| `AuthContext.tsx` | 세션 복원(587) 1곳에 `!deviceLang` 조건. 이메일 로그인(667)·데모 로그인(734)·`loginWithPin`(752~, changeLanguage 호출 없음) 무접촉. `i18nextLng` 쓰는 곳 = LanguageSelector·updateLanguage 2곳만(i18n `caches: []`) → «기기에서 사람이 고른 언어»라는 전제 성립. | 통과 |
| `CheckoutDisplayPage.tsx` | `!window.opener` 면 헤더에 Dashboard 버튼. 라우트 `/restaurant/:id/dashboard` 실존(App.tsx 377). | **보완 필요 — §3** |
| locales 4개 · sw.js 5.80 · releases json · e2e spec | 키 92×4, i18n:verify 0, 글로서리 준수(매장식사·포장·소계·할인·합계). | 통과 |

## 2. 기계 게이트 (내가 직접 재실행)
- `check-print-guard`: 변경 1건 = POSTerminalPage(의도된 라벨 변경, bless 대기). 다른 보호파일 7개 무변경.
- `verify-all` 23 게이트: 통과 20 · 실패 = print-guard(위) · health-check 282/283(실패 1 = 같은 무결성 항목) · type-baseline 은 PlanQ `tsc -b` 와 겹쳐 «확인 불가» → **단독 재실행 통과**.
- e2e `pos-display-language` **4/4 (내 실행 18.5s)** · 팀 보고 ×3 + pos-terminal/card-terminal 11/11.
- 고장주입(팀): isExtended 검사 제거 + deviceLang 조건 제거 → 해당 2건 실패 재현 → cp 원복 cmp 동일 → 4/4. 반증 있음.
- 승인된 부분의 diff 지문(POSTerminalPage·customerDisplay·AuthContext·PaymentModal·OrderCompleteModal·CashierPinModal·locales·sw.js): `sha256 cc0ab6ac9d1b34752186ace75a8d625c52274faccaa740b8676820e71e9e98bb` — 2회차는 이 지문이 같으면 §1 재검토 생략.

## 3. 보류 사유 — Dashboard 버튼의 `!window.opener` 판정이 **문서화된 설치법 하나를 놓친다**
`SettingsPage.tsx:4653` 이 안내하는 공식 설치법: Windows 부팅 시 `chrome.exe --kiosk --new-window --window-position=1920,0 …/checkout-display` 로 **둘째 모니터에 키오스크 창을 직접** 띄운다.
- 이 창은 `window.open` 으로 열린 게 아니라 **opener 가 없다** → 이번 변경으로 손님 화면 헤더에 «Dashboard» 버튼이 생긴다.
- 고객 화면은 전화번호 등록 입력이 있는 **손님이 터치하는 화면**이다. 손님이 누르면 키오스크 창(로그인 세션 = 보통 RA)이 **매장 대시보드(매출)** 로 넘어가고, 키오스크엔 주소창이 없어 직원이 되돌리기도 번거롭다.
- 즉 Irene 태블릿 사례는 고치면서, 듀얼 모니터 키오스크 매장엔 손님 노출 + 화면 이탈 회귀를 **새로 만든다**. 배포 전 닫아야 한다.

**요구 보완(1조건, 설계 일관):** 자동열림과 같은 기준을 쓴다.
```ts
const takesMainScreen = typeof window !== 'undefined' && !window.opener
  && (window.screen as any)?.isExtended !== true;
```
- 모니터 2대(키오스크·팝업 어느 쪽이든) → 버튼 없음. 화면 1대 기기(태블릿·안드로이드 앱, isExtended undefined) → 버튼 있음 = Irene 요구 그대로.
- e2e 에 반증 1건 추가: `{ extended: true }` + `/checkout-display` 직접 진입 → Dashboard 버튼 **없음**. (기존 3번 테스트는 헤드리스에서 isExtended 가 true 가 아니므로 그대로 통과 — 1번 테스트가 그 사실을 증명한다.)

**닫지 못하는 남은 틈(기록·비차단):** «손님 전용 단일 태블릿»을 고객 화면으로 쓰는 매장은 opener 도 없고 화면도 1대라 브라우저 신호로 POS 태블릿과 구분이 불가 → 버튼이 보인다. 현재 그런 설치법은 문서·설정에 없다. 후속 후보 = 길게 눌러 나가기(2초) 또는 직원 PIN. 이번 배포 범위 밖, Irene 판단으로 넘긴다.

## 4. 그 외 판정 메모
- `screen.isExtended` 는 크로미움(크롬·엣지·Electron 데스크탑앱) 전용. Firefox/Safari 듀얼 모니터는 자동열림이 멈추지만 수동 버튼은 살아 있고, 매장 환경(QZ Tray·Windows·크롬)에 Firefox/Safari 는 없다 → 수용.
- 실제 안드로이드 태블릿의 `isExtended` 값·수동 Customer Display 버튼이 WebView 에서 어떻게 뜨는지(새 창 vs 같은 창)는 **확인 불가** — 배포 후 Irene 태블릿에서 1회 확인. 자동열림이 막힌 것만으로 Irene 이 겪은 막힘은 해소된다.
- 언어: 태블릿에 `i18nextLng` 가 저장돼 있지 않으면 여전히 직원 'en' 이 적용된다. **배포 후 태블릿 언어 선택기에서 한국어 1번 선택**이 필요(팀 보고와 같음). 매장 단위 언어 설정은 없다 — 이번엔 범위 밖, 재발하면 설계 사안.
- 남은 영어: ConfirmDialog/AlertDialog 의 message·confirmText·cancelText, CheckoutDisplay «Connected/Connecting», PaymentModal 안내 문장 몇 줄. 기능 아님, releases json «remaining» 에 반영 권고.
- CheckoutDisplay 버튼이 공용 Button 아닌 인라인 `<button>` — 고객 화면은 자체 디자인 영역이라 디자인 가드 비대상, 수용.

## 5. 2회차 게이트 범위(최소)
1. §3 1줄 + e2e 반증 1건 → 빌드 1회 → `pos-display-language` 5/5 · `check-print-guard`(여전히 POSTerminalPage 1건만) · health-check print 카테고리.
2. §2 지문 재계산 동일 → §1 생략. 다르면 달라진 파일만 본다.
3. Fable 이 bless → bless-log → `fable-gate.js pass`.

## 6. 2회차 판정 (실행 완료) — PASS
- **승인 부분 지문 재계산 = `cc0ab6ac…9e98bb` 동일** → §1 재검토 생략. 바뀐 파일은 CheckoutDisplayPage·e2e spec·releases json 셋뿐(git status 대조).
- `CheckoutDisplayPage.tsx` 173~174: `!window.opener && (window.screen as any)?.isExtended !== true` — §3 요구 그대로. 다른 줄 변경 없음.
- e2e 반증 추가 «모니터 2대(반증) — 손님 화면에는 대시보드 버튼 없음»(extended:true → `toHaveCount(0)`) → **5/5, Fable 직접 실행 retries=0, 19.9s**. 1·4번이 서로 반증 쌍(화면 1대 = 자동열림 없음·버튼 있음 / 화면 2대 = 자동열림·버튼 없음).
- releases json `remaining` 에 남은 영어·손님 전용 단일 태블릿 틈 기록 확인.
- 순서(직전 게이트와 동일, manifest 가 git 추적 파일): `check-print-guard --bless` → 기준 등록 **2026-10-04T14:53:22Z** → 재검 **8/8 변경 없음** → `health-check --category=print` **11/11** → `scripts/print-guard.bless-log.md` 기록 → 이 판정문 → `fable-gate.js pass`.
- 배포 후 Irene 확인 2건: ① 태블릿 POS 진입 시 고객 화면이 자동으로 안 뜨는지 ② 태블릿 언어 선택기에서 한국어 1회 선택 후 POS 가 한국어인지. 확인 불가 항목(실기기 isExtended 값·WebView 수동 버튼 동작)은 §4 그대로.
