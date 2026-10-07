
## 2026-09-04 — MainLayout.tsx bless (인쇄 동작 변경 아님)

**변경 내용**: 사이드바 nav 항목 1줄 삭제(`Shared Ingredients` — 재료 목록 통합으로 없앤 화면)
  + 같은 화면을 두 이름으로 부르던 라벨 통일(`nav.ingredients` → `nav.stockItems`, 주석 3줄).
**왜 이 파일인가**: 그 nav 항목은 `AuthContext` 허용 목록이 아니라 `MainLayout` 배열에 있고,
  허용은 `'/pos/brand/general/*'` **와일드카드**라 목록에서 뺄 수 없다(빼면 BG 다른 화면이 같이 막힘).
**승인**: Irene 명시 지시 — "쉐어드 재로 지워. 이거 없던 메뉴야. 당장 지워."(2026-09-04)
**인쇄 무접촉 증명** (종이 확인 대체 — 인쇄 동작 변경이 아니므로 기계 증명, Fable 판정):
  - 파일 내 인쇄 심볼(`_printPollFn` 등) 14곳 그대로
  - `health-check --category=print` → **11/11 통과**
  - `verify-all --only print-routes`(자동인쇄 전 루트 실제 실행) → **통과**
  - `verify-all --only print-field-contract` → **통과**
  - `check-print-guard` → 재등록 후 **8/8 변경 없음**

## 2026-10-04T12:00Z — MainLayout.tsx (사이드바 프로필 칸 여백·두 줄 표시 + 앱 안 도움말 «새로고침») — Fable 게이트 PASS 뒤 bless
- Irene 원문 「이 내용 위아래 좌우에 여백 왜 안줄였어?」 · 「안드로이드앱에 리플래시 있어야해」
- diff 안 'print' 문자열 0줄 · `_printPollFn` 무접촉 · 새로고침은 `window.location.reload()`(주방인쇄는 POS1 폴러 DB 단일경로라 분실 없음)
- `health-check --category=print` → **11/11** · `check-print-guard` → 재등록 후 **8/8 변경 없음**
- 판정문 `.claude/fable-verdict-20261004-terminal-direct-gate.md` §5 — manifest 가 git 추적 파일이라 **bless → 마커** 순서

## 2026-10-04T14:53Z — POSTerminalPage.tsx (화면 문구 32곳 → t() 번역, 인쇄 동작 변경 아님) — Fable 게이트 2회차 PASS 뒤 bless
- Irene 원문 「한글로 설정했는데 포스터미널만 영어로 표시되네」 (+ 「듀얼 아니면 고객화면 안열려야」 · 「고객 디스플레이도 대시보드로 가기」 같은 묶음, SW 5.80)
- diff `+/-` 줄 안 'print' 문자열 **0** · `t` 는 1302줄 `useTranslation('pos')` 하나 · 직접 인쇄 블록·주문 로직·데이터 비교 문자열 무접촉 · 'Drawer error' 는 안내창 제목만
- OrderCompleteModal(보호파일 아님)은 Print Bill/Ticket **라벨만**, 핸들러·510줄 이후 영수증 템플릿 무접촉
- e2e `pos-display-language` **5/5**(Fable 직접 실행, retries=0) · `health-check --category=print` → **11/11** · `check-print-guard` → 재등록 후 **8/8 변경 없음**
- 판정문 `.claude/fable-verdict-20261004-display-language-gate.md` — manifest 가 git 추적 파일이라 **bless → 마커** 순서

## 2026-10-07T15:46Z — orders-crud.js · MainLayout.tsx · useAutoPrintPoller.ts (키오스크 결제 분리 + 설정 › Kiosk) — Fable 최종 게이트 PASS 뒤 bless
- Irene 원문 「Fable 권고대로 해. 우리 완벽한 키오스크 필요해. 카드단말기랑 자동 연동 된」 · 「좌측메뉴에 키오스크 링크 모바일오더처럼 안나오는데 어떻게 접속해?」 · 실프린터 확인 「다 확인했어」(키오스크 주문 → 주방 티켓 1장 · 계산원 칸 «Kiosk» · 중복 0)
- `orders-crud.js` 243·287·331-334·559-565·582·629·645-647 — 손님 주문 계열 = mobile+kiosk(머지 상대·채널 가드·테이블 필수·상태), 키오스크 카드는 승인 전 outstanding. pending-print / printed / print-claim / kitchen_items **무접촉**
- `useAutoPrintPoller.ts` 176 — 티켓 계산원 칸 `'Kiosk'` 글자뿐. 폴러 판정·발행 로직 무접촉
- `MainLayout.tsx` 24(Tablet 아이콘 import) · 1241(알림 판정 kiosk) · 1390(계산원 칸 'Kiosk') · 1573(타입 kiosk?) · 2013-2015(상단 Kiosk 열기) · 2099-2100(설정 › Kiosk) · 2686-2691(열기 클릭 분기) — 전부 메뉴·클릭 분기, `_printPollFn` 무접촉
- `health-check --category=print` 10/10(지문 제외) · 인쇄 라우트 가드 ✓ · 동시 print-claim N→1 ✓ · `check-print-guard` → 재등록 후 **8/8 변경 없음**
- 판정문 `.claude/fable-verdict-20261007-kiosk-final-gate.md`(앞선 §7 PASS: `…-kiosk-payment-split-gate.md`) — manifest 가 git 추적 파일이라 **bless → 마커** 순서
