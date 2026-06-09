# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-09 (저녁 — 인쇄 firefight + 구독 코드 수정 미완)
**버전:** v3.54 운영 (※ 오늘 통합티켓 재구조 배포했으나 실프린터 검증 실패 → 버전 미상승 보류)
**작업 상태:** 두 갈래 미완 — (1) 통합티켓 제대로 고치기 (2) 구독 시작일/트라이얼 코드 수정 /검증·/배포

### 🚀 운영 배포됨 (2026-06-09 밤) — Backup 20260609_180706, Smoke 9/9, print-guard bless(8파일)
배포 내용: 인쇄①새주문claim dedup + 인쇄②통합티켓POS행토글 + 스케줄UI2건 + 구독trial필드폴백.
- ✅ **백엔드 라이브 확인**: production-backend restaurants-crud.js에 subscriptionStart||subscription_start 폴백 존재 → 구독 결제버그 운영 해결.
- ⚠️ **프론트 전파 미완 = Cloudflare 캐시**: 운영 nginx가 sw.js까지 `.js immutable 1년`을 걸어 CF엣지가 옛 sw.js(3.46) HIT 캐시 → 매장이 새 SW(3.55) 못 받음(메모리 만성 stale-bundle 진짜 뿌리). 
- ✅ **nginx 고침(완료)**: 운영 `/etc/nginx/sites-enabled/purplehere.com`에 `location = /sw.js { no-store,no-cache }` exact-match 추가(chown 방식, root복원, nginx -t OK, reload). origin이 이제 sw.js no-cache 서빙(해시번들은 immutable 유지=정상). 백업 `.bak-swfix-20260609`. 앞으로 SW bump 자동전파.
- ☐ **남은 단 1건 = Irene Cloudflare 퍼지**: CF 대시보드 Caching→Configuration→Purge `https://purplehere.com/sw.js` (또는 Purge Everything). 그래야 CF가 3.55 재취득→매장 전파. 퍼지 후 cf-cache-status MISS/DYNAMIC 되면 성공.
- ☐ 내일 매장: 새번들 전파 확인 후 ①새주문1장 ②POS행토글→통합티켓 실프린터 종이 확인. 문제시 rollback-production.sh.
- ☐ 버전/릴리즈노트: CF 퍼지+매장 확인 후 결정(Irene).

### 🔧 (배포 전 개발) 인쇄 2건 + 스케줄 + 구독 — Irene "단편적 말고 제대로" 지시

**Irene 질문 답변 확정**: 모든 오더티켓 내용 = 단일 소스. 새주문/테이블이동/취소 모두 단일 폴러 useAutoPrintPoller(+MainLayout._printPollFn) → 백엔드 pending-print(enriched: stationName/set_components/special_instructions) → 단일 mapItem. POS 직접 장바구니 인쇄는 2026-06-04 제거됨. 통합(카운터미러)도 동일 orderData(tagTicketWithStations). App.tsx:472 별도 통합폴러 6/9 제거 → consolidated-print.js/useConsolidatedTicketPoller/consolidatedTicket.ts = 데드코드.

**인쇄①: 새주문 2장 — DEV 수정+빌드+API검증 완료, 실프린터 확인 대기**
  - 근본원인: 새주문은 localStorage 'autoprint-poke'로 모든 창이 동시 폴링 → 두 폴러(useAutoPrintPoller + MainLayout._printPollFn)가 PATCH /printed(락) 전에 둘 다 인쇄 → 2장. 테이블이동/취소는 poke 없어 인터벌 엇갈림 → 1장(그래서 1장).
  - 수정: 두 폴러 kitchen 블록에 **원자적 /print-claim**(needs_print true→false, 이미 백엔드 존재·미사용이던 것) 추가 → 한 창만 win → 1장. 인쇄 실패 시 **/print-rearm**(needs_print 복구)로 재시도(과거 pre-claim 뺐던 "claimed-but-unprinted 영구블록" 사고 방지). 수동 재발행 버튼/취소/이동 호출은 claim 안 함(그대로).
  - SW_VERSION bump: 3.50→**3.55-print-claim-dedup-20260609** (매장 옛 캐시 번들 탈출).
  - 검증: test-print-claim.js 7/7(동시claim 2→1개만, 이미claim→false, rearm후 재claim, printed_at 스탬프) + health-check print 7/7 기능 + 전체 **100/101**(유일 실패=보호파일 무결성 플래그=의도 변경, 실프린터 확인 후 --bless 예정). 빌드 dev 배포 완료.
  - **다음**: Irene /배포(매장 프린터=운영연결이라 실프린터 확인은 배포 후) → 새주문 시 station당 1장+카운터미러 1장만 나오는지 확인 → OK면 `node scripts/check-print-guard.js --bless`. 수정파일🔒: useAutoPrintPoller.ts, MainLayout.tsx, public/sw.js.

**인쇄②: 통합티켓 = POS행마다 토글로 재기획 — DEV 완료, 실프린터 확인 대기**
  - Irene가 기존 UI 혼란 지적("같은 동작 3군데 중복, POS 3·4개 불명확"). 재기획 승인=**각 POS(워크스테이션) 행에 "Print full order ticket here" 토글 1개**. 별도 Consolidated 카드 + 중복 mirrorToBillPrinter 체크박스 **둘 다 제거**. POS는 "+ Add Workstation"으로 1·2·3·4 확장, 행마다 토글.
  - 동작: 토글 ON인 모든 POS의 실제 billPrinter로 통합티켓 미러(주소 중복 제거). 레거시 consolidatedOrderTicket/mirrorToBillPrinter는 billPrint 폴백만 유지(UI 없음, back-compat).
  - 수정파일🔒: `models/Restaurant.js`(워크스테이션 getter consolidatedTicket 보존 3곳), `utils/billPrint.js`(mirror 2462~ 단일→__unifiedTargets 루프), `SettingsPage.tsx`(워크스테이션 행에 토글 추가 + Consolidated 카드 sed 삭제 + mirror 체크박스 삭제 + 미사용 mirrorToBillPrinterRef 제거).
  - 검증: test-consolidated-ws 7/7(저장/재조회/스트립X/다중), **E2E 토글 클릭→handleSave→DB CT=true 저장 확인**, Consolidated카드/mirror체크박스 제거 확인, 스샷 POS행 토글 정상, health-check print 7/7, state-hydration 0, i18n Errors 0, Settings/Printer mount 0 pageerror. 데모 CT 원복(false).
  - **다음**: 내일 매장 — POS행 토글 ON 시 해당 POS 프린터로 통합티켓 1장씩 + ①새주문 1장 동시 확인 → OK면 check-print-guard --bless(보호파일 useAutoPrintPoller/MainLayout/billPrint 3건 변경=정상).

**스케줄 UI 2건 (Irene 현장 지적, mobileOrder 탭) — DEV 수정+빌드+실측검증 완료**
  - ① Item Time Restrictions time 입력 오버플로우: **현재 dev 빌드 코드엔 오버플로우 없음**(실측 360/414/1024 모두 overflow −1px, 스토어 2열그리드 카드 378px서도 −5px, 클립 스샷 정상). Irene 화면은 옛 SW 캐시 번들 의심. 방어적 하드닝(ItemScheduleEditor inputStyle: maxWidth/minWidth/boxSizing/display:block)으로 어떤 폭/줌/로케일서도 초과 불가하게 함.
  - ② Category Time Restrictions 추가 컨트롤이 리스트 **아래**→Item처럼 **위로** 이동(검색-상단 패턴 통일). 클립 스샷 확인.
  - 수정파일: `MenuManagement/ItemScheduleEditor.tsx`, `Settings/SettingsPage.tsx`. state-hydration 0, Settings/Mobile mount ✓.

### 구독 시작일/트라이얼 — /검증이 실 버그 발견·수정, DEV 완료·미배포
  - 프론트: Manager/RestaurantsPage.tsx:991 `status:'active'`→`newRestaurant.status` (빌드·배포됨).
  - **🐞 /검증이 잡은 실 버그**: 백엔드 create 핸들러가 `req.body.subscriptionStart`(camelCase)만 읽는데 프론트는 `subscription_start`(snake)를 보냄 → **미래 날짜가 백엔드에 안 닿아 항상 오늘로 default → trial 파생 전혀 작동 안 함**(thefire 지점 즉시 청구의 진짜 원인). planType/billingCycle은 양쪽 폴백 있는데 subscriptionStart만 없었음. 이전 세션이 백엔드만 만들고 end-to-end 미검증이라 못 잡음.
  - **수정**: `routes/restaurants-crud.js` create(1082~) + put(1498~) 둘 다 `subscriptionStart || subscription_start` snake 폴백 추가. (edit PUT은 구독필드 안 보내지만 방어적으로 통일)
  - **검증 9/9 (실 생성 API)**: 미래시작(+30d)→status=trial+trial_end=start-1d+subscription_start=미래+**인보이스 billing_period_start=시작일(오늘 아님)** / 당일시작→active+trial_end null+인보이스 오늘. 테스트 레스토랑/인보이스/아이템 정리 완료. health-check 100/101(인쇄플래그만), state-hydration 0, Manager 페이지 mount tdz0/EB0/UI정상.
  - **다음**: 결제 코드라 Irene `/배포` 지시 시 배포. (인쇄와 독립 — 실프린터 무관, 바로 배포 가능)

### 미완 — 이전 (둘 다 미배포·미검증)

**1. 통합 오더티켓 — 운영 배포했으나 실프린터 검증 실패 → 설정으로 임시 OFF**
  - 오늘 통합티켓 재구조(billPrint.js)를 **운영 배포**(Backup `20260609_130201`, smoke 9/9, print-guard 오늘 bless). Irene 선택=배포 후 매장 확인.
  - **실프린터 결과 실패**: 통합티켓 안 나옴 + BAR 2장 중복. 원인 확정 = `consolidatedOrderTicket.address="MASTER"` 인데 **MASTER 라는 실제 프린터가 없음**(실제명: KQ1/KQ2/KITCHEN 1·2/BAR/POS-80C) → QZ 인쇄 조용히 실패. BAR 2장은 SW_VERSION 미bump(운영 3.50 그대로)로 기기가 옛 v3.54 캐시 번들(별도폴러 중복) 가능성.
  - **임시 안정화 완료**: thefire02/03(rest 24/25) `consolidatedOrderTicket.enabled=false` raw-update(주소 MASTER 보존). 백업 운영 `/tmp/printer-settings-backup-2026-06-09T13-54-33-295Z.json`. → 스테이션 티켓만 인쇄(검증된 동작). rest16은 원래 null.
  - **다음**: Irene 매장 새로고침 후 재테스트(BAR 여전히 2장이면 SW bump/롤백). 통합티켓 제대로 = **(A) 실제 프린터 목록에서 선택하는 단일 설정** 또는 **(B) 스테이션별 "통합티켓도 보내기" 옵션** 중 Irene 결정 → dev 구현 + **실프린터 확인 후에만 재배포 + --bless**. ("MASTER" 직접 타이핑 제거가 핵심)
  - billPrint.js 는 현재 운영에 재구조 코드 있음(통합은 설정 OFF로 비활성). print-guard 는 오늘 bless 된 새 기준.

**2. 구독 시작일/트라이얼 코드 수정 — 백엔드 완료, 프론트 미완, 미검증·미배포**
  - 배경: thefire(BG)가 Manager/RestaurantsPage 로 지점 추가 시 `status:'active'` 하드코딩 + create 핸들러에 trial 파생 로직 없음 → 미래 시작일·트라이얼 불가 → thefire02/03 가 오늘부터 즉시 유료/청구됨. (운영 데이터는 정정 완료 — 아래 완료 항목)
  - **DEV 수정 완료(백엔드)**: `routes/restaurants-crud.js` create 핸들러에 "미래 시작 → trial 자동 + trial_end_date 설정 + startTrial 클로버/이중인보이스 제거(createInitialInvoice 단일경로)" 추가. update 핸들러는 미래시작 시 trial 강제. (signup=authService startTrial 경로는 그대로)
  - **미완(프론트)**: `dev-frontend/src/pages/Manager/RestaurantsPage.tsx:991` `status:'active'` 하드코딩을 `newRestaurant.status`(폼값)로 교체 — **아직 안 함**(인쇄 firefight 로 중단). 폼엔 시작일 DateField 이미 있음(line 2150).
  - **다음**: 프론트 1줄 수정 → build → **/검증**(데모매장 실API: 미래시작 생성→trial+trial_end+인보이스 1장 시작일 기준 / 당일시작→active 정상) → **/배포**. ⚠ 결제/청구 코드라 실API 검증 필수, 미검증 배포 절대 금지.

### 완료된 작업 (이번 세션 — 운영 반영 완료)
- **통합티켓 재구조 배포 + 임시 OFF** (Backup 20260609_130201) — 위 1번 참조. 배포는 됐으나 실프린터 실패로 통합 기능은 설정 OFF.
- **thefire01/02/03 구독/인보이스 운영 데이터 정정**: 3지점 모두 status=trial, subscription_start=2026-07-01, trial_end=2026-06-30 으로 정정. 잘못 발행된 6/9청구 2건(INV76/77) void, rest16 8월→7월(INV51 RM179), rest24/25 신규 7월 인보이스(INV-260609003/004 RM99). 백업 운영 `/tmp/thefire-billing-backup-2026-06-09T13-12-38-239Z.json`. ※ INV-260412003(RM12,880)은 **진짜 하드웨어 청구서**(Xiaomi Pad/모니터/셋업, 4/20 연체)라 안 건드림 — Irene 별도 결정 필요.
- **v3.52~v3.54** (Backup 071746/084352/103649): 브런치명 입력 / QZ 원클릭 설치 / 통합티켓 v1 + 미리보기 다국어. (오전 배포)

### 다음 확정 작업
1. **구독 코드 수정 마무리**: Manager/RestaurantsPage.tsx:991 프론트 1줄 → /검증 → /배포 (위 2번)
2. **통합티켓 제대로**: 설계 A/B Irene 결정 → dev 구현 → 실프린터 확인 → 재배포 (위 1번)
3. **INV-260412003 RM12,880 하드웨어 청구서** 처리 방향 Irene 결정

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 통합티켓 dead code 정리(consolidated-print route/column/poller·util·hook·migrate, App import 흔적)
- 통합티켓을 "카운터+지정프린터 둘 다" 옵션으로 확장할지 (현재는 1곳)
- 설정 화면이 "비어 보이는" 표시 이슈(DB는 정상, 표시/캐시) — 재현 시 점검
- 첫 유료 멀티지점 출시 하드닝 Phase 4(전파) — 브랜드 제품 "Distribution" i18n 고아키(productsTab.distribution.*) 재사용

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
