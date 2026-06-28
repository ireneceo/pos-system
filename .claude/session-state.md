# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-28 19:45, idle 1849s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: _tmp_uname.js,mark-demo-accounts.js admin.json,common.json pos.json,admin.json common.json,pos.json admin.json,common.json pos.json,admin.json
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-28
**버전:** v3.63 (2026-06-27 배포). SW 4.34. **dev 작업 중(미배포)** — 현장 레이아웃 + KDS 보완.
**작업 상태:** 진행 중 ("남은 모든 개발" — Irene 2026-06-28 지시. 안전영역부터 완성도 있게, 보호영역은 컨펌 후)

### 진행 중인 작업 (2026-06-28, dev 미배포 — /검증 통과분)
- **[완료·dev] 현장 레이아웃 묶음**
  - FloorPlan: ▴접기화살표 제거→풀스크린 토글(헤더+통계바 숨김, 존바 나가기) / 테이블맵 여백 제거(가장자리까지) / 테이블 상세 "크게 보기" 팝업(측면패널↔중앙모달, body portal)
  - POS Terminal(보호파일, 레이아웃만·인쇄코드 0줄): 풀스크린 헤더접기 / 카테고리칩 컴팩트(48→44·padding·font) / **카테고리 페이지네이션**(한 줄+‹ ›+n/total, 펼치기 폐지) / 고객검색+테이블넘버 한 행(TopControlsRow)
  - PWA 모바일 상단바: "Solving Real F&B Problems - Purple here" 한 줄 통합 (확인필요: 다른 화면 의미였는지)
  - 검증: build·state-hydration0·timezone신규0·design신규0·i18n0·mount(FloorPlan/POS/KDS/Mobile crash0). print-guard: 내 변경 POSTerminalPage 1건(레이아웃만, 인쇄라인0 diff증명) — **--bless 안 함**(블랭킷이라 6/27 미검증 핫픽스까지 bless될까봐. 실프린터 확인 후 일괄 bless).
- **[완료·dev] KDS 보완 4건 (보호영역, 설계확정 후 구현·검증)** — KitchenDisplayPage 인쇄 라인 diff 0(증명), forward 승급 무변경(보호규칙 유지)
  - ①되돌리기 = **아이템 단위 + 주문 min-stage 파생**: 전 revert 경로(주문뷰 단일/ bulk, 아이템뷰 group, 아이템뷰 ready)를 setStationItemsStage(force)/deriveOrderStatusLocal 로 통일. All탭이 order.status만 내리고 item은 그대로던 "모순" 제거. 백엔드 deriveOrderStatusFromItems(orders-crud 1491·이미존재) 미러. **stage 시나리오 API 5/5**(forward 승급 + 한 품목 되돌리면 주문 min으로).
  - ②아이템뷰 Preparing 잔존 버그: renderItemViewPreparing 두 필터를 주문상태 게이트→쿠킹범위+아이템상태 기준으로(되돌려도 다른 preparing 품목 안 사라짐).
  - ③사운드 탭 기준: 폴링 신규주문 사운드(875)가 아이템 없이 호출돼 All 기준이던 버그→아이템 넘겨 스테이션 필터. table-moved stale audioEnabled→ref. (취소/이동/void 안내음은 이미 탭 게이트됨.)
  - ④취소주문: KDS 상단 "취소 N"(빨강 배지)→ 오늘 취소목록 팝업(표시 전용, 타임존 준수, i18n 4개).
  - 검증: build·KDS mount(order/item) crash0·state-hydration0·design신규0·i18n0. **잔여=#3 스테이션별 사운드 설정 UI(Settings, 데이터모델 alert_sound 이미 있음)**.
- **[완료·dev] 1-2 브랜드메뉴 드래그 재정렬 버그** (안전·비보호): 백엔드 reorder/bulk `sort_order: i`→`i+1`(1-based). 0-based면 1번 위치 메뉴가 sort_order 0 → sortItems('custom')이 "미설정=맨뒤"로 보내 재정렬이 깨졌음(증명: 드래그 A,B,C → 0-based=B,C,A / 1-based=A,B,C). + 프론트 persistBrandOrder r.ok 확인·setError 표면화(silent catch 제거). 파일: routes/brand-menus.js, BrandGeneral/BrandMenusPage.tsx. 데이터 마이그 불필요(다음 재정렬 시 정상화). dev 빌드/가드 통과.
- **#3 스테이션별 사운드 설정 UI = 기존에 이미 존재**(SettingsPage 7964~ alert_sound 셀렉트+미리듣기+저장). 신규작업 없었음.
- **[완료·dev] 1-4 브랜드 잠금메뉴 이미지 저장 버그** (안전·비보호): 편집모달이 name/price/category만 잠금 disabled, image 잠금은 UI 미반영→편집되는 듯하나 저장 안 됨. 수정=locks.image 시 ImageUploadDropzone 대신 읽기전용 미리보기+안내. 신규모달 무영향. menu.json 3키×4언어. 파일: MenuManagement/MenuManagementPage.tsx. 옵션잠금은 1-3(매장 자체옵션 추가 허용) 때문에 의도적으로 안 막음.
- **[완료·dev] 1-3 옵션잠금 메뉴에 매장 옵션 추가 허용(superset)** (안전·비보호): ①menu.js update가드 optionGroups 잠금=전면차단→superset(브랜드 미러 OptionGroup.brand_menu_option_group_id≠null 모두 유지 시 허용, 제거 400) ②brandMenuSyncService 잠금 시 매장옵션 wipe→항상 merge(매장 자체옵션 보존). 통합테스트 3/3(추가200·브랜드제거400·name허용), fixture 잔여0. 비브랜드 무회귀200·health106/107. 파일: routes/menu.js(+Op import), services/brandMenuSyncService.js.
- **[완료·dev] 2-1 옵션 솔드아웃** (DB+백엔드+RA+POS+모바일, 비보호): ①DB `options.sold_out`(멱등 마이그 `scripts/20260628_add_option_sold_out.js` — **배포 목록 등록 필요**, sync--alter 금지) ②백엔드 `PUT /menu/option/:id/toggle-soldout`(직원 허용·소켓 `option-soldout`·익명401·IDOR) + optionGroups.js/mobile-public.js 응답에 sold_out ③RA OptionManagementPage 옵션별 토글 ④POS OptionModal 롱프레스(600ms) 토글 + 품절 선택불가/회색 ⑤모바일 ItemDetailPage 품절 선택불가. 검증: 토글 API 200/401/재조회 sold_out, mount(POS/RA/모바일) crash0, build·hydration0·design0·i18n0(4언어), print-guard 불변(비보호). 세트 구성품 UI 표시는 추후(Irene 확정). 참고: mobile-public.js는 routes/mobile.js 경유 `/api/mobile` 라이브.
- **[진행·dev] 3-1 현금관리 PIN** (권한·설정, 비보호):
  - ✅ 백엔드 완성·검증(6/6): `utils/cashPinGuard.js`(voidPinGuard 미러, 결제권한 PIN), cash-management 쓰기 라우트를 `requirePosCounter`→`cashWriteGate`(①결제권한 access_payment로 좁힘 ②설정 ON 시 enforceCashPin). settingsGuard 화이트리스트 `requirePinForCashMgmt`. 게이트테스트: round-trip·PIN없음400·무권한403·결제권한PIN(0430)통과·익명401·OFF통과, 설정 원복. 마운트=`/api/cash`.
  - ✅ 설정 UI 토글(Irene 필수 "핀 설정 꼭 있어야") SettingsPage 추가, **기본 OFF=안전**(OFF면 기존+access_payment만 좁힘). mount clean.
  - ✅ **PIN 진입 UX 완료**: CashPinModal(VoidPinModal 미러, verify-pin-permission access_payment) + 3개 컴포넌트(CashDrawerOps·CashLedger·FinalSettlementPanel)에 withCashPin 게이트 + cash_pin 동봉(첫 쓰기 전 PIN 1회→세션 보유, CASH_PIN_* 오류 시 재요청). design-guard numpad bless. 게이트API 6/6 재검증·cash-up/settings mount0·hydration0·i18n0·build green. **3-1 완성** — 토글 ON 시 정상 동작.
- **[완료·dev] 4-1 POS 아이템별 메모** (POS 보호파일, 인쇄 라인 diff 0): 장바구니 각 품목에 "Add note"→표준 input(터치=OS 온스크린 키보드, 물리키보드 매장도 그대로 — 별도 키보드 컴포넌트 불요). special_instructions 를 OrderItemType + 양쪽 주문 페이로드(handleAddOrder/handleConfirmPayment)에 연결 → 주방티켓/빌 출력은 billPrint가 기존 처리. 주문단위 메모 잘림은 #11(6/26)에서 이미 스크롤영역 재배치. mount0·hydration0·design0·build green. (남은 4-1 항목 없음.)
- **[완료·dev] 머지(R8) 2건** (Irene 원래 "다음 확정 작업"): ①orders-crud 머지 재발행 printedItems 에 served/completed 제외(clean-move 1252 패턴 일치) — API검증(머지 시 served 제외·ready 포함). ②FloorPlanPage 머지 티켓 tableNumber "출발 + 목적지"(sourceTableNumber 사용), 헤더 ** TABLE CHANGED + MERGED ** 유지. 일반 이동은 목적지만. guards hydration0/design0, FloorPlan SPA mount 정상(test-critical ❌는 콜드딥링크 인증레이스 아티팩트). **⚠ 인쇄 라우팅 → 실프린터 종이 확인 후 배포.**
- **[코드리뷰·보완 2026-06-28] 서브에이전트 전체 diff 리뷰 → 실보완 3건 수정**: M1 옵션 솔드아웃이 로컬상태만→MenuContext.applyOptionSoldOut 추가(토글/소켓 option-soldout 반영, 재오픈·타기기 일관) / M2 POS i18n 6키(terminal.prev/next/fullscreen/exitFullscreen·itemNote·addItemNote) 4언어 추가 / M3 zreport-printed 인쇄마커라 PIN게이트 제외(requirePaymentAccess, 수동 재인쇄 400 해소). cash-management 미사용 requirePosCounter import 정리. 잔여 L1~L4=경미/설계상(set메뉴 revert 프론트백 일치 등). 재검증 전부 green.
- **[완료·dev] 3-2 할인 RM 표시** (자잘): POS 주문요약이 할인/쿠폰/정책 라인을 맨숫자로 표시하던 갭 → 전 요약 라인(Subtotal·Takeaway·Discount·Coupon·Policy·ServiceCharge·Tax)에 통화(currency) 일관 추가. 결제팝업은 원래 RM 표시됨. POSTerminalPage 인쇄라인 diff 0·mount✓·hydration0·design0.
- **[관찰·기존] FloorPlan 콜드 딥링크 redirect-to-/** = 인증 부트스트랩 레이스(대시보드도 동일, 콜드 goto 시 auth 해소 전 가드가 / 로). 워밍/인앱 네비에선 정상 렌더(title=1 확정). 내 변경(라우팅/인증 무접촉) 무관·기존 동작. test-critical "✓ Floor Plan"=크래시0 의미(렌더 보장 아님). 필요 시 별도 개선 후보(딥링크 auth 레이스).
- **[검증] 운영검증 read-only 통과**: 운영 health·역할 스모크·익명401·**운영 백엔드 KDS 되돌리기 min-stage 파생 정상**(is_test 매장5 생성→검증→삭제). 실고객매장 무변경. dashboard "실패"=테스트경로 오타(실경로 200).
- **공통:** 전부 dev만, **운영 미배포**. print-guard 5건(POSTerminalPage·KitchenDisplayPage=의도된 레이아웃/KDS, 인쇄라인 diff0 / billPrint·poller·orders-crud=6/27 미검증 핫픽스). 블랭킷 bless라 **실프린터 확인 때 일괄 bless** — 임의 bless 금지.

### (이전) 다음 확정 작업 — 위 "남은 모든 개발"에 흡수됨
- 머지(R8) served제외 + "Table1+Table2" 표시, 자동발행/KDS 검토 등은 백로그(POS_MENU_IMPROVEMENT_BACKLOG / THEFIRE_REMAINING_WORK_PLAN)와 함께 순차 진행.

### 완료된 작업 (이번 세션 — thefire02 라이브 인쇄 긴급대응, 운영 배포)
- **QZ keepalive** (SW 4.33): QZ 웹소켓이 idle(20분) 끊김 → 첫 인쇄가 재연결로 ~16초 멈추던 근본 해결. 20초마다 getVersion ping + idle중 백그라운드 선재연결. (billPrint.js connectQZTray)
- **발송 순서 = 주방 스테이션 먼저 → 통합** (SW 4.34): 통합 2장(POS1=CASHIER + KQ POS=MASTER, 전체오더라 길다)이 QZ 한줄큐에서 BAR 앞을 막던 것. printKitchenTicketViaRawBT가 스테이션 라우팅 await 후 sendUnifiedTickets. MASTER는 설정상 Main POS 뒤라 맨 끝.
- **통합티켓 "정확히 1번" 가드**: 하이브리드+폴러 중복("POS1 통합 2장") → consolidated-print/:id/claim atomic 가드.
- **아이템취소 = 그 회차(order_group) 오더티켓 기준**: 취소품목이 원래 찍힌 회차 품목만 + 줄긋기(전체합본 아님). API+DB 실검증 완료(회차1취소→회차1만 / 회차0→회차0만, served 제외).
- **안정 검증루트**: backend `PATCH /:id/station-printed` + `[print-trace]` 운영로그(타이밍 직접 진단).
- 인쇄 발송 단일기준 정리 + 디테일 코드감사(세트구성품옵션·특별요청·부분취소·미배정폴백·served제외 — 대부분 구현 확인).

> ⚠️ 이번 세션은 종일 추측·되돌리기 반복으로 Irene 신뢰 손상. 교훈: **인쇄는 추측 금지, print-trace 로그로 실측 후 한 번에. "검증하라"면 바꾸지 말고 검증·보고 먼저.**

### 다음 확정 작업
> Irene 이번 세션 명시 지시 — 다음 섹션에서 진행:

1. **머지(R8) 2개 수정 — Irene "고칠거냐?"에 다음 섹션에서 결정/구현:**
   - ① 점유 테이블로 이동(=머지 R8) 재발행에서 **served 제외**. 현재 `orders-crud.js:1223` `printedItems = myItems.filter(printed_at||printed)` 에 served 필터 없음 → 다른 액션(clean이동 1252·취소 1605·아이템취소 _vNotServed)과 불일치. 서브된 품목이 머지 시 주방 재발행됨(Irene "서브해서 한참 지난 걸 뜬금없이 보내면 안돼"). 1줄 수정.
   - ② 머지 티켓 테이블 줄 = **"Table1 + Table2"** (소스+목적지). 현재 `FloorPlanPage.tsx:1564` `destTable` 하나만. 헤더 `** TABLE CHANGED + MERGED **`(1557-1559)는 유지. Irene: "테이블번호 + 테이블번호2 표시하고 위에 합쳐졌다 안내".
   - (라이브오더 `/merge` 두주문 병합은 별도 티켓 추가 **안 함** — Irene "그대로 할거야". R8=테이블이동과 동일 개념으로 본다.)
2. **프린트 자동발행(autoPrint) 기준 검토 + KDS(주방디스플레이) 안내·표시 검토**: 자동발행 ON/OFF·백로그컷오프 기준이 코드와 일치하는지, KDS 취소/이동/머지 팝업이 탭(현재 station)기준으로 제대로 뜨고 표시되는지 검토. (PRINT_RULES_MATRIX §9 대조)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 실프린터 눈 확인: 옵션 있는 세트구성품 옵션 렌더 + 4.34 발송순서/keepalive/아이템취소 회차 종이확인 → 확인 후 `cd dev-backend && node scripts/check-print-guard.js --bless` (보호파일 8개 지문 갱신, 현재 의도변경으로 1건 떠있음).
- brandMenuSyncService.js 세트 전파 영구수정 — 아직 /배포 대기(2026-06-27 #2 세션).
- POS 메뉴 개선 백로그 13건 (`docs/POS_MENU_IMPROVEMENT_BACKLOG.md`).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
