# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-18 (저녁 세션 — 운영시간+라스트오더 **기획 확정**. 코드 변경 0, 구현 다음 세션.)
**버전:** v3.59 운영 배포됨 (2026-06-19, Backup 20260619_065629). (버전은 /배포 시에만 갱신)
**작업 상태:** 기획 확정 완료. 구현 미착수. + 직전 이미지/i18n 작업 미배포 잔존.

### 진행 중인 작업 (이미지 파일명 영어화 + i18n 전수 — DEV 완료, 미배포)
직전 세션 작업. 이번 세션에선 미접촉. 여전히 배포 대기.
- ① 이미지 파일명 영어화(`imageProcessor.js` slugify/generateImageFilename) + 고아정리(menu DELETE 공유가드 + `sweep-orphan-images.js`)
- ② 백엔드 한글 영어화 ~111건/10라우트 + ③ 프론트 i18n 키누락 33건 4언어 + 하드코딩 다수
- **남은 일**: (1) headless mount sweep 확인(새 useTranslation hook 추가 critical 페이지 — POS OptionModal/모바일 ItemDetailPage/FloorPlan TableDetailPanel/AutoPrintFailureBanner 크래시 0). sweep 중단된 채 미확인. (2) 통과 시 Irene /배포 대기(SW_VERSION bump 필요). (3) locale owner=lua 파일은 sudo write.
- 안전: print-guard 8/8 무변경 + health 101/101 통과 확인됨.

### 완료된 작업 (이번 세션, 2026-06-18 — 기획만, 코드 0)
- **운영시간(요일별)+라스트오더 게이트 기획 확정**: UI/UX 디자이너 + 서비스기획자 관점 교차검증 후 설계 보강.
  - 핵심 결정: **주문유형 차등 게이트** — dine-in/takeaway(즉시)=마감 차단 / **pickup(예약)=차단 X, 운영시간으로 픽업시간 유도**(업계 표준, Irene 6/18 지시) / delivery=성격따라.
  - 게이트 단일소스 `utils/businessHours.js`(신규): `getOrderingState`(즉시) + `getPickupSlots`(예약, 프론트·서버 공유).
  - 재사용 발견: `PaymentPage.generateTimeSlots`(1142~) + `Order.scheduled_pickup_time` 기존 골격 → businessHours 확장(신규 UI 아님).
  - UI/UX: "주문불가" 화면 통일(공통 배너, 이모지 제거), 배너 위치, 장바구니 in-flight, 설정 7행표 복사단축/시드.
  - 안전: DB 마이그 불필요(operation_settings JSON 키), settingsGuard 화이트리스트 필수, 인쇄/주문코드 무접촉.
  - 문서: `docs/BUSINESS_HOURS_LAST_ORDER.md` §9 + WBS(§9-7) + 검증게이트(§9-8). DEVELOPMENT_PLAN.md 상단 기획 섹션.

### 진행 중인 작업 (운영시간+라스트오더 구현 — **A+B+C 완료·검증, dev 반영, 미커밋/미배포**)
2026-06-19 세션. `docs/BUSINESS_HOURS_LAST_ORDER.md` §9-7 WBS 전 단계 구현 완료. dev 빌드·배포(dev-frontend-build)+백엔드 pm2 반영. **Irene /배포 대기.**
**백엔드(A):** A1 `utils/businessHours.js`(getOrderingState+getPickupSlots+isValidPickupTime) / A2 settingsGuard OPERATION_KEYS+businessHours / A3 mobile-public `/store ordering`블록 + 신규 `GET /pickup-slots/:slug` / A4 mobile-orders POST /order Defence D(즉시=ORDERING_CLOSED, 예약=INVALID_PICKUP_TIME). orders-crud/POS/인쇄 무접촉.
**프론트(B):** B2 MobileOrderContext `OrderingState` 타입+Store.ordering / B3 신규 `mobile/components/OrderingBanner.tsx`(이모지無) + OrderTypePage 배너+즉시유형 비활성(pickup 유지) / B5 PaymentPage 픽업 피커 `/pickup-slots` 소비(일자별 그룹, ASAP는 영업중만, 레거시 폴백) + getScheduledPickupDateTime 일자 처리 / B1 SettingsPage 운영탭 businessHours 카드(마스터토글+7행표+평일복사+휴무dim+첫enable 시드, 타입/기본/로드 배선) / B4 sw.js SW_VERSION 3.65.
**i18n(C):** settings.json+orders.json 4언어(en/ko/zh/ms) businessHours 키 29개(flat). 인라인 영어 기본값 폴백.
**검증 전부 통과:** businessHours 단위 24/25(1=테스트기대오류) / 실API 게이트(하위호환·ORDERING_CLOSED·INVALID_PICKUP_TIME·ASAP·영업중, 데모r38 오염0) / settingsGuard 저장+omit-merge 보존 / build 내파일 TS0+배포 / i18n:verify Errors0 / print-guard 8/8 / health 101/101 / 실mount(RA 운영탭+모바일 마감배너) pageerr0·ErrorBoundary0.
**잔여(경미):** PaymentPage 픽업 피커는 컴파일·로직 검증됨이나 풀 카트 흐름 실브라우저 미통과 — Irene가 dev에서 픽업 예약 클릭스루 1회 확인 권장.

### 완료된 작업 (이번 세션 추가, 2026-06-19 — 주문취소 사유 캡처, dev 반영/미배포)
Irene 질문("취소 사유 설정 어딨어")으로 발견한 갭 수정. 별도 설정 토글 없이 **아이템 보이드처럼 사유 퀵픽**을 주문 전체 취소에도 추가(Irene 승인).
- 갭: 아이템 보이드는 사유 퀵픽 있으나 **주문 전체 취소는 사유 입력 UI 없음** → 'No reason provided'로만 기록(손실방지 리포트 일관성 깨짐). LiveOrders + Floor Plan 둘 다.
- 수정: `LiveOrdersPage.tsx`(confirmCancelOrder reason 인자 + beginCancelOrderWithReason + 취소모달 사유 퀵픽) + `FloorPlan/TableDetailPanel.tsx`(performCancelOrder reason + beginCancelWithReason + Modal 사유 퀵픽). 사유=voidItem 4종 재사용(품절/고객변심/주문실수/기타). requireVoidPin 매장은 사유 선택 후 PIN 게이트.
- 백엔드 무변경(orders-crud PATCH /:id/status 가 이미 req.body.reason 기록). i18n orderCancel.title/confirm 4언어 추가.
- 검증: build 내파일 TS0+배포 / **실제 취소→order_actions.reason="Order mistake" 기록 확인**(딜레이 후, logOrderActionSafe 비동기) / i18n:verify 0 / print-guard 8/8 / health 101/101 / mount(LiveOrders+FloorPlan) pageerr0.
- 인쇄 영향 없음(LiveOrders/TableDetailPanel은 비보호 파일, printCancellationTicket 호출 미변경).

### ✅ 운영 배포 완료 (2026-06-19, Backup 20260619_065629, Smoke 9/9)
아래 누적분 일괄 배포 + 운영검증 통과: 이미지/i18n(전세션) + 운영시간·라스트오더 + 취소사유(설정+서버강제) + P0-1 통화버그 + P0-2 QZ노이즈 + 이메일 is_test 가드. 마이그 2종 실행(통화 RM→MYR·QZ→diagnostic, 잔존 0). 운영 데모 rid13 라이프사이클(생성→단계전구간→결제→+Round→취소+사유) + print계약 7/7 통과. (전체 health 100/101 — 1건은 print-guard 매니페스트 dev경로 아티팩트, 실결함 아님.)

### 운영 피드백 구현 진행 (2026-06-19, dev 반영/미배포 — "순서대로 다 해")
- **P0-1 발주 통화 MYR/RM 버그 [완료·검증]**: `utils/currency.js`(normalizeCurrencyCode/sameCurrency) 신설 + purchase-orders-crud.js:801 정규화 비교 + 프론트 통화 옵션값 ISO화(SettingsPage select value=displayCode 버그가 'RM' 저장원인이었음) + 4곳 기본값 'RM'→'MYR' + `scripts/migrate-currency-rm-to-myr.js`(dev 2건 정규화). 검증: sameCurrency 단위, RM잔존0, health101, print-guard8/8, build0, mount0.
- **P0-2 QZ 진단 티켓 노이즈 [완료·검증]**: SupportTicket.category ENUM에 'diagnostic' + qz-tray.js(실오류시만 생성 + category='diagnostic') + inbox.js/support-tickets.js 매장뷰 diagnostic 제외 + `scripts/migrate-qz-diagnostic-category.js`(dev 3건 recategorize). 검증: QZ API 6/6(정상→202무생성/오류→201 diagnostic/매장 인박스·리스트 제외).
- **이메일 바운스 가드 [완료·검증]**: dev test-admin@purplehere.com(id24, is_test 시드 System Admin, verified=true라 기존가드 통과→바운스). `emailService.js screenRecipients`에 is_test=true 항상 차단 추가. 운영엔 해당계정 0(무영향, 방어적). 검증: test-admin DROP/실계정 KEEP, health101.
- **배포 시 마이그 2종**: migrate-currency-rm-to-myr + migrate-qz-diagnostic-category (둘 다 멱등). deploy-to-production.sh 등록 필요.
- **P1-3 취소/삭제 사유 설정화 [핵심 완료·검증]**: `operation_settings.requireCancelReason` off|optional|required(기본 required). settingsGuard 화이트리스트 + SettingsPage 운영탭 Manager PIN Approvals 옆 세그먼트 컨트롤. 프론트 게이트 4흐름 mode 분기: LiveOrders(취소+아이템보이드) + FloorPlan(취소+**아이템삭제 신규 사유캡처** — merchant "그냥 바로 됨" 지적 해소). off=확인만/optional=사유+건너뛰기/required=사유강제. i18n 4언어(settings+5, orders+6). 검증: build0·mount(LiveOrders/FloorPlan/설정)0크래시·health101·print-guard8/8·i18n0·settingsGuard 보존.
  - **서버측 required 강제 [완료·검증]**: orders-crud cancel+item-delete에 가드(명시적 'required'+사유없음→400 CANCEL_REASON_REQUIRED, 미설정/optional은 관대=자동취소 무영향). print-neutral 확인(print 회귀 8/8 통과) 후 check-print-guard **--bless**로 orders-crud 지문 갱신(보호파일 무결성 8/8 회복). 검증: required→400/required+reason→200/미설정·optional→200(코드상 'required'만 차단). 교훈 메모리 [[feedback_print_protect_not_block_deploy]] 보강(print 계약은 dev health-check로 검증, 배포 불필요).
  - **P1-3 리포트 = 이미 완성·배포됨(v3.56)**: `order-audit.js /void-log` + ReportsPage **Void & Cancel Log 탭**(누가·단계·사유·금액·시각 + 필터) + 사이드바(RA/Owner). 재구축 불필요 — 매장에 위치 안내만. 데일리스테이트먼트는 요약(건수·금액) 유지, 상세는 이 리포트 담당. **→ P1-3 전체 완료.**
  - **(미배포 동봉) PayPal 웹훅 알림 노이즈**: webhooks-payments.js paypal 서명실패 error→warn 강등 + 출처 기록(PayPal 미사용 매장이라 봇 노이즈). 다음 배포에 포함.

### 운영 피드백 기획설계 (2026-06-19 — with MIN Cafe 실매장, 설계완료/구현 미착수)
실매장 피드백 6건 코드 실측 후 설계: `docs/PRODUCTION_FEEDBACK_DESIGN_2026-06.md`.
- **P0(소,영업차단)**: ① 발주 통화 MYR/RM 버그(purchase-orders-crud.js:801 문자열완전일치+프론트 'RM'저장 → normalizeCurrencyCode+마이그) ② QZ 진단 티켓 노이즈(qz-tray.js:343 생성→inbox.js:128 category미필터 → 'diagnostic' 분리+조건축소+운영정리쿼리[승인필요])
- **P1(중)**: ③ 취소/삭제 사유 설정화(requireCancelReason off|optional|required, 기본required + 데일리 감사표시 + Void&Cancel Log) ④ 스탭 PIN 로그인 UI(verify-pin 인프라 존재, UI만)
- **P2(대,단독스프린트)**: ⑤ 시재/현금관리 마감 Cash-up(신규 모델4: CashierShift/CashReconciliation/ZReport/PaymentMethodSettings) ⑥ 예약↔플로어플랜(floor_plan_table_id+Order.reservation_id 정식화+테이블 reserved/closed+통계)
- 추천 순서: P0 묶음배포 → P1 → P2 각 /기능설계. Irene go 대기.

### 다음 확정 작업
- 위 운영시간+라스트오더 **Irene /배포 대기**(배포 시 SW 3.65 + 운영 operation_settings는 JSON이라 마이그 불필요, 하위호환 enabled:false라 기존 매장 무변화).
- (병행 가능) 이미지/i18n headless sweep 확인 후 Irene /배포 대기.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **특정일/기간 운영시간 오버라이드(라마단 등)** — operation_tickets DEMO-OT-001 실수요. businessHours 요일 단위 다음 우선 후속(availabilitySchedule start/end 패턴).
- 마감 차단된 모바일 주문 시도 카운트 로깅 → 라스트오더 시각 조정 시그널.
- **구독역할 무료화 전략(Irene 검토중, 한번에 적용)** — Owner/Foodcourt General/Supplier Admin/Brand General 통합 대시보드 무료 + 매장단위 POS만 과금(land&expand) 검토. 4역할 동시 결정 예정. 지금 손대지 말 것.
- pending-print cancelled 주문 윈도우 점유 검토(orders-crud 보호파일 → Irene 승인+실프린터 필요).
- FG-6 쿠폰 ManagerPromotionsPage 실구현.
- nginx www→apex 301(인프라 하드닝, 선택).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
