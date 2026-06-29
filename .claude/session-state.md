# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-29 (오프라인 1~6단계 + KDS per-item되돌리기/프린트미확정 — dev 검증완료·미배포)
**버전:** **v3.64 운영 배포 완료** (+ 스탭밀 수량별 이름 + 반응형 헤더 = 추가 배포 LIVE). SW 4.35(오프라인캐시).
**작업 상태:** **오프라인 모드(POS1 허브) 1~6단계 코드 완료(dev, 미배포)** — 접수→로컬 주방인쇄→복구 동기화(무손실·무중복) 전 경로 구현·검증. 잔여=6단계 실프린터 종이확인(Irene 매장) + 7단계 데모 전사이클 + 4단계 잔여 UI(오프라인 중 주문관리·degrade, 비핵심). + 별건 KDS per-item 되돌리기/프린트 미확정 표시(검증완료, 실프린터 대기).

### ▶ 다음 확정 작업 (A) — IOI Mall 매출 API 연동 (담당자 답변 대기 → 구현)
- **맥락**: thefire01 @ IOI Mall Damansara 입점. 몰 POS지원팀이 시간별 매출을 Tangent/Synthesis API로 보내달라 요청(staging 자격증명 제공). 메모리 [[project_ioi_mall_sales_api]] / 설계·계약 `docs/MALL_SALES_API_INTEGRATION.md`.
- ✅ **이번 세션: API 계약 전체 역해독 + staging 전송 성공**(PDF 이미지라 실호출로 해독). OAuth2 password grant 토큰 → POST /SalesHourly {sales:[{sale:{18필드 전부 string}}×24]}, date=YYYYMMDD·hour"00~23" 24개 필수·gstregistered Y/N. **HTTP200 "24 records created".** 우리 데이터로 전필드 생성 가능 확인(card_type=visa/master/amex 1:1, guest_count=noofpax).
- ⏳ **대기**: 담당자에 문의 발송(`docs/IOI_MALL_API_inquiry.txt`, 7개 질문: gto/gst정의·batchid패턴·결제버킷·전송주기·타임존·환불·운영전환).
- ⬜ **답변 후 구현**(`/기능설계`): 신규 `restaurant_sales_integrations` 모델(입점몰명+provider+자격증명 암호화+machineid+env+enabled) + 설정 UI + 시간별 집계·전송 스케줄러(SchedulerRun 패턴·재시도·batchid 멱등). 다른 입점몰 재사용 가능 구조.

### ▶ 다음 확정 작업 (B) — 오프라인 7단계(데모 전사이클) + 6단계 실프린터 확인
- 설계서: **`docs/OFFLINE_MODE_DESIGN.md`** / 메모리 [[project_offline_mode]] (진행상황·결정·재사용맵 전부 있음).
- ✅ 1단계 OfflineContext(/api/health 핑·히스테리시스)+OfflineBanner+App 전역래핑 — 검증완료(배너 실동작 헤드리스 실증).
- ✅ 2단계 sw.js network-first+오프라인 cache-fallback(셸·메뉴캐시, SW_VERSION 4.35) — 검증완료(오프라인 재로드 셸 렌더 실증).
- ✅ **3단계 완료(dev, 미배포)**: IndexedDB LocalStore + append-only op 로그. 신규 `utils/offlineDb.ts`(저수준 IDB 래퍼: 스토어 offline_orders/offline_ops/offline_meta, 트랜잭션·genId·deleteOfflineDb) + `utils/offlineStore.ts`(LocalOrder/OfflineOp 타입 + 원자적 seq발급·createLocalOrderWithOp·appendOp·getUnsyncedOps·markOpSynced·patchOrder·markOrderSynced·pendingOpCount·absorbLegacyQueue). OrderContext에 `initOfflineStore()` 워밍 1줄(데이터 계층만; legacy 흡수/재생은 5단계까지 미호출=유실창 방지). dev 호스트네임 게이트 `window.__offlineStore` seam(운영 apex/www 미노출). **검증: Playwright 실브라우저 IndexedDB 31/31 PASS**(원자적 생성·단조 seq·op순서·markSynced제외·서버매핑·legacy흡수 one-time·**리로드 영속성=정전 재부팅**). build green(신규경고0)·print-guard 8/8(보호파일 무접촉)·health 107/107·POS mount crash0.
- ✅ **4단계 핵심 완료(dev)**: operation-recording 레이어 + create 배선. `utils/offlineOps.ts`(recordOfflineCreate·recordOfflineOp·listOfflineOrders·**printOfflineKitchenTicket**). create=OrderContext 오프라인 catch(보호 POSTerminalPage 무접촉). **18/18 PASS.**
  - ✅ 화면 반영(가시화): **OfflineBanner 에 로컬 보관 주문 건수**("오프라인 — 주문 N건 로컬 보관…", unsyncedOrderCount 폴링, 복구 시 "N건 전송 중…"). 어디서나 보임. i18n offlineBannerHeld/offlineReconnectingHeld 4언어.
  - ✅ **서버 opId 멱등 가드(§8) 완성**: 신규 모델 `ProcessedOp`(processed_ops 테이블, ProcessedOp.sync()로 생성·--alter 안 씀) + `utils/opIdGuard.js`(alreadyProcessed/recordProcessed). **비멱등 op만 가드**: add_items(orders-crud)·pay(orders-payment) — 진입부 early-return + 성공 시 기록. set_stage/move_table/cancel_order(DELETE)/cancel_item(전체배열 set)은 **본질 멱등이라 가드 불요**. **핵심 안전: op_id 는 SyncEngine 재생만 보냄 → 온라인 일반요청엔 없어 동작 100% 동일.** **API 실증: 같은 op_id 재전송→1회만 적용(add_items count·payment count 멱등), op_id 없는 온라인→정상.** SYNC_NONCREATE_ENABLED=true 활성화.
  - ✅ **화면 반영 완료(읽기전용)**: 신규 `components/Offline/OfflineOrdersPanel.tsx` — 미동기화 오프라인 주문을 LiveOrders 상단 **격리 패널**(자체 렌더·DbOrder 매핑 없음 → 라이브목록 크래시 위험 0)로 표시(OFF-번호·테이블·품목수·합계·held/sending). 동기화되면 자동 사라짐. i18n 5키. **실증 2/2(LiveOrders mount crash0 + 패널 렌더).** + 부수 발견·수정: LiveOrders 통계 `total_amount.toString()` null 미가드(잠재버그) → `parseFloat()||0` 방어(오프라인 동기화/이상데이터 크래시 방지).
  - ⬜ 4단계 잔여(비핵심·다음): **오프라인 주문 '편집' 액션 배선** — add/cancel/move/pay/stage 핸들러가 오프라인 주문(localId)에 recordOfflineOp 분기(백엔드 opId 가드 준비완료, 패널은 현재 읽기전용) / FloorPlan 반영 / degrade(비-POS1 차단, POS1 허브 설정 신설). **핵심(신규 접수→로컬인쇄→동기화) 무영향.**
- ✅ **5단계 SyncEngine 완료(dev)**: 신규 `utils/offlineSync.ts` — 복구 시 op로그 seq순 재생. create=idempotency_key(서버 기존 멱등), serverId/번호 매핑, 단일락, 401→재로그인 이벤트, 4xx 스킵·5xx/네트워크 STOP(순서보존). 비-create 전송은 서버 opId가드 전까지 게이트(SYNC_NONCREATE_ENABLED=false, 현재 비-create op 미기록이라 무해). OrderContext init + OfflineContext 복구 트리거. absorbLegacyQueue 흡수. **실증 6/6: 오프라인 생성→runSync→서버 1건+매핑, 재기록·재동기화해도 중복0(무손실·무중복).**
- 🔶 **6단계 로컬 주방인쇄 코드완료(dev, 실프린터 확인 필요)**: ①프론트 `printOfflineKitchenTicket`(클라 QZ/RawBT 직접, 서버無, 스테이션맵·printerSettings·pos_store_info_cache[StoreContext 신규 캐시] 사용) — OrderContext 오프라인 catch에서 주문받은 기기가 즉시 인쇄→printedLocally. ②SyncEngine create가 printedLocally면 `printed_offline:true` 전달. ③**백엔드 orders-crud create가 printed_offline 수용→needs_print=false+item printed_at 스탬프**(폴러 재인쇄0, 보호파일=의도변경). **실증 5/5(printed_offline→서버 needs_print=false+printed_at). ⚠ 실제 종이출력은 매장 프린터 확인 필요(headless 불가).**
- ⬜ **7단계**: 데모 전사이클(오프라인 시뮬→접수→로컬인쇄→복구동기화) + 운영검증.
- 검증 누적: build green(신규경고0)·hydration0·design신규0·i18n0·health106/107(=의도 print-guard)·KDS/POS mount crash0. print-guard 2건(KitchenDisplayPage·orders-crud=의도, 보호블록 무접촉) — **실프린터 확인 후 일괄 bless**.
- **배포 정책**: 6단계 실프린터 확인 + (선택)4단계 잔여까지 본 뒤 한 번에 배포(반쪽 금지).

### [진행·dev 2026-06-29] KDS 주문뷰 per-item 되돌리기 + 프린트 미확정 표시 (보호파일, Irene 직접 지시·반복 iteration)
- **A. 주문뷰 per-item 되돌리기**(확정: 아이템 최저 min-stage 파생): `revertItemStage`/`revertSetItemStage` 추가 — 진행된 아이템마다 ↺, 그 아이템만 한 단계↓ + `deriveOrderStatusLocal`로 주문 min 강등(allowItemRevert:true). 멀티품목 주문뷰에서 일괄만 되던 것 해소. **API 실증: both→preparing=preparing / revert one→pending(min)**.
- **B. 프린트 미확정 표시**(확정: needs_print 기반, DB 무변경): KitchenOrder에 needsPrint/createdAtMs + item.printed_at 노출. `hasPrintProblem`(needs_print+grace 30s 롤업)·`itemNotPrinted`(item.printed_at 미스탬프=정밀). 주문뷰 빨강 배지+Reprint, 아이템 ● 마크, **헤더 "미인쇄 N" 칩(양뷰 공통=아이템뷰도 보임)**, 아이템뷰 Ready 카드 배지. **강력 팝업**(NoticeCard $kind=order-cancel 빨강, 한 건씩 큐 "N more", Reprint+OK, 버튼 여백 수정). 재인쇄=printOrderTicket(printPerItem 자동분할)+스테이션 stamp(/station-printed) 또는 /printed. **실증 6/6**(생성·needs_print·min-stage·칩·팝업+Reprint).
- **설계 의견(Irene 질문 답)**: 인쇄 데이터가 2층(주문 needs_print + 아이템 printed_at)이라 표시도 2층. per-item ●=printPerItem 모드 정밀신호, 주문배지=롤업. 아이템뷰 pending/preparing은 메뉴그룹이라 주문배지 모호 → 헤더 칩으로 해결.
- **라우팅 검증(Irene 요청)**: 코드 정상(item.kitchen_station_id→kitchenStationPrinters[id]→프린터, 미매핑=첫스테이션 병합, 스테이션별 재시도). **단 rid5 "Test3"=프린터 미설정**(method=browser·name/addr 빈값)·autoPrint OFF·30개중 7개만 스테이션매핑·station26 매핑0 → 실프린터로 안 감. 실라우팅 테스트는 kitchenStationPrinters 설정+아이템 매핑된 매장 필요.
- 검증: build green(신규경고0)·print-guard=KDS 1건(의도, order-created/items-added 핸들러 무접촉)·hydration0·design신규0·i18n0·KDS mount(order/item) crash0. **bless 안 함**(실프린터 확인 후). i18n 키 추가(kitchen 6키×4언어).
- ⚠ **실프린터 확인 필요**(재인쇄=인쇄 동작). 매장 종이확인 후 일괄 bless.

### (이전) 진행 중인 작업 (2026-06-28 — v3.64로 운영 배포 완료분)
- **[배포완료]** 현장 레이아웃 묶음

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
