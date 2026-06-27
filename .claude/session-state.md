# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-27 09:05, idle 9091s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: probe_tmp.js
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-27 (🆕 모바일오더 더블오더 방지 + 애드온 카드 버그수정 **운영 배포 완료**. #7 인쇄가시성은 배포에서 격리(미배포 유지)). SW 4.23.
**버전:** v3.63 (2026-06-27 배포). SW 4.23-mobile-addon-cards.

### ✅ 운영 배포 완료 (2026-06-27) — 모바일 애드온/더블오더 UX (Smoke 9/9, Backup 20260627_061214)
> 모바일오더 더블오더 방지(자동복귀+스티키 카트바) + 애드온 추천 버그 4개(emoji/사진 폴백·재진입 유지·자동이동제거·이모지 기본글리프) + 자동폴백(토글만 켜도). **인쇄/주문/단계 무접촉.**
> **🔒 배포 격리(중요)**: HEAD에 직전세션 #7 인쇄가시성(KitchenDisplayPage +203줄·print-events 백엔드)이 미배포 커밋돼 있어, 배포 시 #7 파일 11개를 직전배포본(e9ef2e40)으로 임시 되돌려 **add-on만** 내보냄. **print-guard 8/8 무변경·health 107/107·운영번들 print-events 참조 0건 확인**(= 운영 KDS/인쇄 완전 무변경). 배포 후 #7은 dev에 복원(여전히 미배포·Task4/5/6 미완).
> 변경: crossSell.js(emoji+③폴백)·RecommendationSheet/ItemDetailPage/MenuPage·menu.json×4·sw.js(4.23). 설계근거 docs/MOBILE_ADDON_CROSS_SELL.md.

### 🆕 DEV 완료·검증 (2026-06-27) — 모바일오더 더블오더 방지 UX (Irene 삽입 요청, 미배포)
> 문제: 모바일 상세페이지에서 담은 뒤 **막다른 화면(dead-end)** 에 머물러 "주문된 건가?" 불안 → 같은 상품 이중주문. Irene 지시 = 담으면 리스트로 돌려보내기 + 애드온 ON 시 "계속/완료" 인지 안 되는 문제 고급 UX 해결. **AskUserQuestion 으로 애드온 ON 흐름 = A안(추천시트+명확한 2버튼) Irene 선택.**
>
> **원칙**: 담은 직후 막다른 상세 제거 → 메뉴 리스트로 자동 복귀 + 항상 보이는 스티키 카트바(담길 때 수량 톡 튀는 애니메이션)로 "담겼다+주문하기" 단일 경로. 손님이 카트 커지는 걸 눈으로 봄 = 더블오더 차단.
>
> **구현(5파일, 생명선 무접촉)**: ①`ItemDetailPage.tsx` — 담은 뒤 추천 없으면(애드온 OFF/추천0) 0.55초 "✓담음" 후 navigate(-1) 자동복귀, 추천 있으면 시트. 시트 닫기/No thanks/추천 다담음 전부 리스트 복귀(데드엔드 제거). ②`RecommendationSheet.tsx` — 헤더 초록✓"장바구니에 담았어요" 확인 + "이것도 함께?" 부제, 좌버튼 "Keep adding"→"No thanks"(닫고 리스트로), menu/common ns. ③`MenuPage.tsx` — 꺼져있던 FloatingCartButton(`{false&&}`) 제거 → 풀폭 스티키 CartBar(🛒[수량] View cart ··· RM합계 ›) + qtyBump/슬라이드업 + 하단 여백 spacer. ④locales en/ko/zh/ms menu.json(recommend.added/title/subtitle/noThanks/viewCart + cartBar.viewCart).
> **검증(실측)**: build green(67초, 경고=기존 baseline) · i18n verify Errors0(4언어 키 OK) · design-guard 신규0(exit0) · **print-guard = 내 변경 무관(KitchenDisplay 델타는 #7 print-visibility 펜딩분, 내 working-tree 아님)** · **실 브라우저 헤드리스 플로우: order-type→menu→item191 mount OK·crash0·EB0 → Add=메뉴 자동복귀 → 스티키 카트바 present, console/page err NONE**. 스크린샷 /tmp/mobile-cart-final.png.
> **남음(Irene)**: 개발서버 실기기 확인 — 특히 **애드온 ON 매장의 추천시트 경로**(데모 cross-sell 데이터 없어 헤드리스론 자동복귀 경로만 탐, 시트 onClose→navigate(-1) 로직은 동일). 배포는 /배포 지시 시. SW bump 필요(모바일 번들).
> **신규 검증 스크립트(보관)**: `dev-frontend/scripts/mount-check-mobile-cart.js`.

### 🆕 DEV 완료·검증 (2026-06-27 이어서) — 애드온(크로스셀) 버그 3개 수정 + 자동폴백 (Irene "이랬다저랬다 엉망" 신고)
> Irene 신고: 애드온이 "처음엔 잘 나오다 클릭하면 리스트 사라지고 재진입하면 안나오고 이랬다저랬다" + "이모지·사진 안나옴". **헤드리스로 kdine-korean 상품15(추천 279·335) 전과정 재현해 버그 3개 확정·수정**(추측 아님).
>
> **재현·근본원인·수정:**
> - **B1 이모지/사진 안나옴**: 추천 API가 `emoji` 미반환 + 카드 Thumb 이모지 폴백 없음 → 이모지상품(대부분)·이미지없는상품 빈칸. **수정**: `crossSell.js` PUBLIC_PRODUCT_ATTRS+출력에 emoji 추가, `RecommendationSheet` Thumb에 `<ThumbEmoji>` 폴백(이미지>이모지>그라데이션). (이미지 URL은 200 정상, 헤드리스는 컬러이모지 폰트없어 □ — DOM에 🍚 들어감 확인.)
> - **B2 재진입 시 추천 사라짐**: 담은 추천을 장바구니 필터로 제외 → 같은 상품 다시 들어가면 0개. **수정**: `ItemDetailPage.fetchAndOpenRecommendations` 장바구니 필터 제거(자기자신만 제외) → 추천 항상 동일 표시, 담긴 건 카드에 **✓ + 재탭 무효**(addedIds prop).
> - **B3 마지막 카드 탭→메뉴로 튐**: 시트 비면 `navigate(-1)` 자동이동. **수정**: `handleAddRecommended`에서 카드제거·navigate 제거(카드 안 사라지고 ✓로). 이동은 명시적 No thanks/장바구니/닫기만.
> - **자동폴백(③, Irene 승인 "토글만 켜도 뜨게")**: `crossSell.js` ①수동·②추천카테고리 둘 다 없으면 **다른 카테고리 노출상품**을 보완추천(같은카테고리 제외, 세트 제외, limit40). 검증: 추천소스 없던 상품 279가 6개 추천 반환.
> **재검증(헤드리스 재현 v2)**: 첫Add→시트2카드 / 추천탭→카드 ✓유지(안사라짐) / 마지막탭→**item 유지(메뉴 안튐)** / **재진입→시트 그대로(둘다✓)** / cart 정상증가 / emoji DOM 🍚 YES. build green(main.e5cf4604) · design-guard exit0 · health 106/107(동일 pre-existing KitchenDisplay뿐, crossSell 회귀0) · 데모 mount crash0·EB0. **pm2 restart dev-backend 함(crossSell.js).** 데모 crossSell·335.emoji 임시변경 전부 원복.
> **신규 검증 스크립트(보관)**: `dev-frontend/scripts/repro-addon-flow.js`.
> **남음(Irene)**: 실기기에서 ①애드온 켠 매장 추천 이모지/사진 ②추천 담고 재진입 시 ✓유지 ③토글만 켜도 폴백으로 뜨는지. 배포는 /배포 시(SW bump).
>
> **B4 (추가 신고: "이모티콘/사진 아무것도 안나와") — 근본수정**: 메뉴는 이모지 없는 상품에 기본 `🍽️` 를 줌(`MenuPage:631,1092` `item.emoji||'🍽️'`)는데 추천 카드는 raw emoji(null) 그대로라 빈칸. rid5 실측: active 19개 중 **9개가 이모지·이미지 둘 다 없음**(Bibimbap·Steamed Rice·Soju 등) → 빈 카드. **수정**: `RecommendationSheet` Thumb 를 메뉴와 동일하게 `이미지>이모지>기본글리프('\\u{1F37D}')` 로 → 모든 카드가 사진/이모지/🍽 중 하나 보장(빈 카드 0). 폴백 추천에 이모지 상품(🍽️🍜) 섞이는 것도 확인. 이스케이프 사용은 design-guard decorative-emoji 회피(메뉴 리터럴은 baseline). 검증: DOM 카드 279=IMAGE, 335=🍽. build green(main.31a3ef85)·design-guard exit0. (헤드리스는 컬러폰트 없어 □처럼 보여도 DOM엔 글리프 존재 = 실폰 정상.)

### 🆕 진행중 (2026-06-26 #7) — 인쇄 가시성 & 진단 (Irene 아이디어, DEV·미배포)
> 목적: 매장 인쇄 누락을 직원이 "솔루션 문제"로 오해 → **안됐을 때만 표시 + 취소처럼 팝업 + 이유 + 누적기록(환경/인터넷 추적) + 주방에서 수동 인쇄**. 설계 = `docs/PRINT_VISIBILITY_DIAGNOSTICS.md`. **생명선(카운터 폴러 자동인쇄)은 한 줄도 안 바뀜 — KDS는 원래 인쇄주체 아님 = 순수 신규 추가**(Irene 정정: "새로운거니까 지금 문제 또 만드는 거 아니잖아" = 맞음).
>
> **Irene 확정 스코프**: ①안됐을 때만 알림+취소같은 팝업 ②스테이션별 인쇄(각자 거) + All=모든 스테이션 분배 ③이유=누적로그+진단화면 ④가짜초록(BAR처럼 다른프린터로 나가 printed_at만 찍힘) 같이 잡기 ⑤플로어플랜=표시만(인쇄는 KDS).

**✅ 완료(DEV, 검증됨):**
- **Task1 백엔드 토대**: `models/PrintEvent.js` + `scripts/migrate-create-print-events.js`(print_events 테이블, 멱등·실행완료) + `routes/print-events.js`(POST 로그 / GET `/restaurant/:id/status` 미인쇄+사유 / GET `/restaurant/:id/summary` 진단집계) + server.js 마운트 + models/index.js 등록. **orders-crud 생명선 무접촉.** API **7/7** PASS(익명401·검증400·로그·미인쇄감지·가짜초록 fallback표면화·집계·교차매장403). 테스트 데이터·파일 정리완료.
- **Task2+3 KDS 팝업/표시/스테이션 인쇄**(`KitchenDisplayPage.tsx`): ①print-status 15초 폴링 → 현재 스테이션 스코프 미인쇄만 카드 배지("NOT PRINTED" 빨강 / fallback "WRONG PRINTER" 앰버) + 취소팝업 미러 팝업("인쇄 안 됨/이유/[지금 인쇄][닫기]") ②`printOrderTicket`이 kitchen_station_id 보존 → `printKitchenTicketViaRawBT`가 자동 스테이션 라우팅(스테이션탭=그 스테이션만, All=전품목 각 스테이션 분배) ③`printUnprintedNow`=카운터 폴러와 동일 안전계약(print-claim→인쇄→/printed, 실패시 /print-rearm, 중복0). i18n 4언어(notice.* + badge.*). **build green(경고는 전부 기존 baseline), mount OK(KDS/items/floor-plan/display 크래시0·EB0)**.

**⬜ 남음(미착수):**
- **Task4 생명선 접점(관찰만)**: `useAutoPrintPoller.ts` 사유분기(master_off/qz_error/backlog)에서 POST /print-events 기록 + `billPrint.js` QZ함수가 `qz.printers.find()`로 의도프린터 미도달 대조→usedFallback 보고(라우팅/타이밍/방식 무변경=가짜초록 소스). **billPrint=진짜 생명선 → 신중+print-guard bless+실프린터 1회.** (qz.printers.find 587/607, getDefault 폴백 657-659 확인 = 감지 가능 입증됨)
- **Task5 플로어플랜 표시(표시만)+진단화면**: FloorPlan/TableDetailPanel print-status 배지+사유모달(인쇄버튼 없음) + Settings/Reports 인쇄진단 패널(사유별 카운트/타임라인, RA 표준).
- **Task6 검증 전부 + 실프린터 1회**(Irene): 스테이션/All 수동인쇄 라우팅·폴백 앰버·미인쇄 팝업.

**수정/신규 파일(이번 #7)**: (신규) `models/PrintEvent.js`·`scripts/migrate-create-print-events.js`·`routes/print-events.js`·`docs/PRINT_VISIBILITY_DIAGNOSTICS.md`·`dev-frontend/scripts/mount-check-print-visibility.js` / (수정) `server.js`·`models/index.js`·`pages/KitchenDisplay/KitchenDisplayPage.tsx`·locales(en/ko/zh/ms kitchen.json notice+badge). **billPrint·useAutoPrintPoller·orders-crud 무접촉(생명선 안전).**
**재개 시**: docs/PRINT_VISIBILITY_DIAGNOSTICS.md §9 구현순서 4→5→6. billPrint 폴백감지는 Irene 승인+실프린터 동반 필요.
**(보류) 다음 확정 작업이었던 풀스크린 Floor Plan**: 이 기능 요청으로 잠시 보류 — 미착수.

### 🔴 인쇄 장애 + 근본수정 (2026-06-26 #6, SW 4.21→4.22) — heartbeat 사고 교훈
- **사고**: +Round 중복수정 때 넣은 **heartbeat(인쇄 중 print_claimed_at 5초 갱신)가 "죽은-claim 자동복구(10초)" 분실 안전망을 무력화** → thefire 와이파이로 QZ 인쇄가 hang하면 영영 복구·재시도 안 됨 → **신규주문 통째 무인쇄(통합·KQ1·KQ2 전부)**. 06:43 긴급 롤백으로 즉시 복구 확인(=heartbeat가 범인 확정). **회차별 인쇄는 무죄**(신규 단일주문 = 회차1개 = 기존과 동일 경로, 논리적으로 증명).
- **근본수정(forward, 롤백 아님)**: **heartbeat 완전 제거** + **회차별(order_group) 인쇄만 유지** + 취소/이동 served 제외 재적용. 신규주문 경로 무변경. autoprint regression 44 + 빌드 검증 후 배포(SW 4.21, Backup 070015). 중복은 회차별로 티켓 작아져 자연 감소.
- **교훈**: claim 갱신류는 **분실 복구 안전망을 끄지 않는지** 반드시 검토. 분실>중복(분실이 훨씬 치명적). 인쇄 변경은 **배포 전 build(autoprint regression) 필수**. [[reference_round_print_duplication_fix]] 갱신요.
- **서브드 주문 결제 전 편집** (SW 4.22, Backup 071218): 백엔드 가드 4곳('served' 제외, 결제완료는 차단 유지) + FloorPlan Add Items 버튼 노출. mergeItemsIntoOrder가 추가 시 status→pending+needs_print(주방 재발행). 데모 실API 통과. PIN 게이트는 추후.
- **Takeaway walk-in 테이블 / 고객디스플레이 #3 재탭(cdNonce)** 도 이 배포에 포함.

### (이전) 운영 배포 (2026-06-26 #6 초반) — 추가주문 인쇄 중복 근본수정 (SW 4.19, 사고로 롤백됨)
- **추가주문(+Round) 인쇄 2번/누적/통합재전송/스테이션2-3번 = 단일 근본원인 stale-claim 10초 재무장.** 운영 주문 014(rid16 T-5) printed_at 실데이터로 확정. 수정 3종(생명선): ①**heartbeat**(인쇄 중 5초 claim 갱신→재무장중복0, hybrid+poller) ②**회차(order_group)별 1장**(통합도 회차별, 미인쇄 회차 쌓여도 따로, pending_reprint 분할안함) ③**취소/이동 티켓 served 제외**(printed_at 유지→kitchen_items 제외). **신규주문 무변경**(단일회차=1장, heartbeat는 5초 초과 시만). 상세 [[reference_round_print_duplication_fix]].
- 검증: autoprint regression **44/44** · health **107/107** · field-contract · **cancel/move served-제외 실API PASS** · print-guard bless. Backup 20260626_053737, Smoke 9/9.
- **실프린터 확인 필요(Irene)**: POS1에서 추가주문 2~3번 연속 → 회차별 1장씩·중복0 / 통합도 회차별 / 취소·이동표에 이미 served 품목 빠짐.
- **모바일 애드온 기본 OFF**(미설정=꺼짐, 관리자가 설정 토글로 켬) — 운영 `data:[]` 확인. 이미지 버그(객체→문자열 URL)·같은카테고리 자동제외 포함. crossSell.js·mobile-public.js·settingsGuard(crossSellEnabled)·SettingsPage·4언어. (Backup 045303)
- **할인 PIN 금액경로** — 프리셋 금액버튼(RM5/10/15) handleApplyDiscount 가 PIN 게이트 우회하던 버그 수정(커스텀 금액·%와 동일). [[reference_discount_pin_gate]]
- **Takeaway walk-in 테이블번호** — FloorPlan "+Walk-in"이 직전 선택테이블을 붙이던 버그. walkIn 플래그로 walk-in은 테이블 강제 미부착(카운터픽업).
- **KDS Item뷰 Ready 보류**: Item뷰 Ready의 ready판정이 선택주방 미스코프(다른주방 ready면 이 탭에 뜸) 발견했으나, Irene가 인쇄 우선으로 redirect → KDS 미수정(보호규칙: 동작확정 후). 다음.
- **(이전 #5)** thefire 잔여 #2·#3·#6·#9·#11c 전부 + 합본주문 UI 운영배포.

### 운영 배포 완료 (2026-06-26, 다회) — thefire 잔여 전부 + 합본주문 UI 정돈
- **#2 부분수량 취소 / #3 합본빌(혼합차지) / #6 주방매수 / #9 오프라인큐 / #11c 크로스셀(RA Add·Edit·세트·카테고리·BG·모바일)** — 전 진입점 전수감사 후 갭(모바일머지·테이블합본·add-items·단일스테이션·QR/Bank/POS오프라인·Add모달추천) 수정. jest 20/20.
- **#3 합본주문 완성**: 머지 시 takeaway 포장비(설정 takeawayPricing대로) 적용 누락 버그 수정 + 서비스차지 비율분모=newBase(포장비 안섞임). 빌 "Type: TAKEAWAY" 휴리스틱(포장비>0→takeaway) 버그수정→실제 order_type. 빌·상세·Live Orders에 품목 TAKEAWAY 태그 + 합본주문 Takeaway 배지(기존색). 색 #0EA5E9(비표준) 제거→#F59E0B만.
- **터치 UX**: Floor Plan 회색버튼(ActionBtn/IconButton/CloseBtn/DeleteItemBtn/ConfirmBtn/ZoneChip) hover→@media(hover) + :active만(터치 탭 후 색 굳음 해결). 고대비 대응.
- **리마크(#11b)**: 칩 나열→검색 자동완성 입력란(프리셋+이전리마크, 대소문자·언어무관) + No rice.
- **TableNode**: 테이블번호 13→20px, 주문수 배지 키움(단계색 유지).
- **우측패널 정돈**: Customer→Walk-in, Phone 실번호만, Type·Payment 제거(2줄↓), Time 1줄.
- **⚠️ 배포 스크립트 불안정**: deploy4/6/7이 "Building frontend"에서 멈춰 프론트 미반영 → 수동 `rsync dev-frontend/build/ → 운영 production-frontend/build/` + nginx reload로 처리. **별도로 deploy-to-production.sh 안정화 필요**(다음 세션 후보).
- **실프린터 확인 대기(Irene)**: #6 매수 N장 / #2 부분취소표 "Cancelled N of M / KEEP" / #3 합본빌(Type DINE-IN·품목 TAKEAWAY 태그·서비스차지 dine-in·포장비 takeaway).
- **남은 것**: 풀스크린 Floor Plan(▴접기 제거 + Main/Takeout/Items 라인 우측 풀스크린 토글로 헤더+하단통계 숨김) — 코드 미착수, 다음.

### 완료된 작업 (이번 세션 2026-06-27)
- **모바일 더블오더 방지 + 애드온 추천 카드 버그수정 → v3.63 운영 배포** (Smoke 9/9, SW 4.23). 상세 ↑ "✅ 운영 배포 완료 (2026-06-27)" 블록. (line 98 "모바일 더블오더 인지 보조" 아이디어 중 카트-UX 측면을 이걸로 해결 — 소스측 "방금 같은 주문" 확인은 여전히 후속 후보.)

### 진행 중인 작업
- **인쇄 가시성 & 진단 (2026-06-26 #7)** — Task1·2·3 DEV 완료·검증, Task4(billPrint 폴백·poller 로그)·5(플로어플랜·진단화면)·6(검증·실프린터) 남음. 상세 ↑ "🆕 진행중" 블록 + docs/PRINT_VISIBILITY_DIAGNOSTICS.md. **미배포(v3.63 배포 때 격리됨) — Irene 개발서버 확인 후 재개.**

### 🆕 계획 저장됨 (2026-06-26 #7, 설계만 — 아직 구현 0, Irene "지금 말고")
- **안정감(Perceived Stability) 이니셔티브** = `docs/PERCEIVED_STABILITY_INITIATIVE.md`. 배경: Irene "다른 POS는 안정적인데 우리 건 어설프고 자잘한 문제". 진단=버그 무한정 아님, "만지는 느낌(상호작용 계층)" 미정비. Phase0(증거)→1(핫스크린 폴리시)→2(일관성)→3(가드레일). **Irene 선택 = "증거 먼저".**
- **제대로된 검증 방법** = `docs/SYSTEM_VERIFICATION_METHOD.md`. 7계층(L0 정적가드/L1 헬스/L2 전체흐름시뮬/L3 카오스race/L4 불변식/L5 체감품질스캔/L6 실프린터·실눈). **🔒 안전계약: 인쇄=상태만 검증(종이 출력 안 함)·모바일오더=데모 공개경로+정리·생명선 무수정·운영은 읽기전용.** 기존 verify-order-lifecycle.js 확장. 신규 5스크립트(verify-order-flow/chaos/invariants·perceived-quality-scan·게이트묶음).
- **재개 시 시작순서**: 검증엔진 L2/L3/L5 1차 구축(데모,안전) → 핫스크린 Top20 증거 → 백로그 보고 → Irene 우선순위 → Phase1. **인쇄·모바일오더 무접촉 불변.**

### 🔻 대기 — 다음 세션 (2026-06-26 #6 미완)
1. **고객디스플레이 #1·#2 (미완, 화면확인 필요)**: #3 재탭(cdNonce 강제 재emit)은 ✅배포(4.22). 남은 #1 "주문입력 중 고객화면 안 보임"(POS오버레이 iframe vs FloorPlan 부모 emit 경쟁) + #2 "결제팝업 뜨면 CD 닫힘"(PaymentModal·POS오버레이 닫기 둘 다 cart-clear 안 쏨 — 정적코드로 blank 트리거 못 잡음). **Irene 5초 화면확인 필요**: ⓐ주문입력 중 CD에 뭐? ⓑ결제팝업 직후 CD 뭐로 바뀜? ⓒ결제는 오버레이 안/밖? (키패드·빈화면=cart-clear 수신 / "Thank you"=checkout-complete 일찍 쏘임 — 고칠 곳 다름). 결제흐름이라 추측수정 금지. CheckoutDisplayPage(수신)·FloorPlanPage 822 미러effect·POSTerminal 2888.
2. **KDS 추가주문 표시 — 추가분만 + "추가주문" 라벨** (밤): 인쇄는 회차별 분리 완료, KDS 표시도 같은 원칙. 보호영역(동작확정+실측 후).
3. **삭제 안되던 진짜 원인 후속**: 서브드 결제전 삭제·추가는 ✅허용 배포. 단 그 400 에러를 POS UI가 명확히 안 보여줘 "안 없어지는 에러"로 보였음 — 에러 안내 개선 검토.

### 다음 작업 (Irene 2026-06-26 #6 저녁/후속 — 저장만, 밤에 수정)
1. **KDS 추가주문 표시 — 추가분만 + "추가주문" 라벨** (밤에 수정): 주방디스플레이에 추가주문(+Round) 들어갈 때 **이전 주문 품목까지 같이 표시 말고, 그 추가분만** 보이고 **"추가주문"이라고 명시**. (인쇄는 이미 회차별 1장으로 분리 완료 — KDS 표시도 같은 원칙. KDS는 보호영역이라 동작확정+실측 후 수정.) **검증·저장만 했고 밤에 구현.**
2. **고객디스플레이 — 결제팝업 떠도 우측패널 미러링 유지** (소통만): 현재 고객디스플레이가 POS 우측패널(주문내역)을 미러링하는데, **PaymentModal 열리면 미러링이 끊김**. 결제창 떠 있어도 우측 주문패널이 계속 고객화면에 보여야 함. CustomerDisplay/checkoutSocket 경로. 미구현, 소통만.
3. **모바일 더블오더 인지 보조 (아이디어 회의)**: 고객이 모바일로 같은 주문 2번 하는 일 잦음 → POS1이 취소해야 함. "친절·다정하게" 중복 인지 돕는 UX 아이디어. ①고객측 발주 직전 "방금 같은 주문 하셨어요, 또 주문할까요?" 부드러운 확인(소스에서 차단=가장 친절) ②POS/KDS 도착 시 "같은 테이블 비슷한 주문 방금 들어옴 — 중복일 수 있어요" 비차단 안내배너 ③같은테이블 모바일주문 그룹+중복가능 태그. (idempotency_key는 기술적 더블탭만 막음, 고객 의도적 재주문은 못 막음 → ①이 핵심.) 미확정 브레인스토밍.

### 다음 확정 작업
- **풀스크린 Floor Plan** (Irene 명시 지시): ①헤더의 ▴ 접기 버튼(#10에서 넣은 것) 제거 ②"Main/Takeout/Items + Takeaway" 라인 우측에 풀스크린 토글 아이콘 → 누르면 맨 위 헤더 + 맨 아래 통계바(FloorPlanStatsBar) 숨겨 업무영역만 풀로. FloorPlanPage.tsx headerCollapsed(352)/toggle(355)/버튼(1779-1785)/`{!headerCollapsed&&}`(1794) 제거 + fullScreen 상태로 Header(1773)·StatsBar 조건부.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- **deploy-to-production.sh 안정화** — "Building frontend"에서 멈춰 프론트 미반영 빈번(deploy4/6/7). 매번 수동 rsync 처리 중. 근본수리 필요.
- **우측 패널 버튼 숨김 토글**(Table Actions 영역 위 버튼 접기) — Irene "어때?" 제안, 미확정.
- 실프린터 종이 확인(Irene): #6 매수 / #2 부분취소표 / #3 합본빌.

### (이전) DEV 완료·검증 (2026-06-26 #2) — #11c 모바일 크로스셀 전체 완성

### DEV 완료·검증 (2026-06-26 #2) — #11c 모바일 크로스셀 전체 완성
- **남았던 UI 3개 + i18n 완료**:
  - ④ **RA 상품**(MenuManagementPage): 편집모달에 "함께 추천할 상품" multi-select(OptionGroups 칩 패턴 재사용). 매장분 편집/브랜드 잠금분 표시만. handleSaveEdit 에서 PUT recommendations(`recommended_ids`). 편집 진입 시 GET 로드.
  - ④ **RA 카테고리**(CategoryManagementPage): 편집모달에 "Show in Recommendations" 3-state select(Auto/Always/Never=null/true/false) + 자동감지 힌트. 전용 PATCH `/categories/:id/recommendation-source`. (이 페이지는 기존부터 i18n 미적용 → 영어 라벨 유지)
  - ⑤ **BG**(BrandMenusPage BrandMenuEditModal): "추천 메뉴 연결" multi-select(SearchableSelect+칩). 저장 후 PUT `/brand-menus/:id/recommendations`(`recommended_brand_menu_ids`)→가맹점 동기화. 세트메뉴 제외.
  - **백엔드 배선**: menu.js 카테고리 직렬화에 `is_recommendation_source` 추가(pm2 restart 반영) + MenuContext MenuCategory 타입/매핑 추가.
  - **i18n**: menu ns(crossSell.* 5키)·brand ns(recommend* 5키) 4언어(en/ko/zh/ms) 추가. 모바일 itemDetail.recommend.* 는 기존 완료.
- **검증 중 BG 버그 발견·수정**: `routes/brand-menus.js` GET /:id/recommendations 가 BrandMenu 에서 없는 `image` 컬럼 조회(실제=`image_url`)→ 추천 있는 메뉴 편집 시 **500**(기존 추천 로드 깨짐). `image`→`image_url` 2곳 수정 + pm2 restart. BG 추천 API 재검증 7/7 PASS.
- **검증(전부 실측)**: build 성공+dev배포(`main.28277df4.js` 898K, 서빙 200) · health 107/107(백엔드 수정 후 재확인) · hydration0 · timezone신규0 · print-guard 8/8(인쇄 무접촉) · design-guard 신규0(모바일 RecommendationSheet bless) · i18n Errors0 · 실 브라우저 mount: RA메뉴/RA카테고리/BG브랜드메뉴 ErrorBoundary0·console0, 모바일 메뉴/상세 crash0.
- **API 실 HTTP 전 경로**: RA 경로①(수동) 8/8 + RA 경로②(카테고리 자동, 임시데이터 원복) 2/2 + BG GET/PUT/소유권/cross-brand/익명/sync 7/7 + 카테고리 플래그 wipe 회귀 3/3 + menu API 플래그 반영. 데모 rid=38·brand17 전부 원복.
- **API 실 HTTP 증명**: 경로①(수동추천) 8/8 PASS(RA PUT/GET round-trip·모바일 익명 노출·익명401·제거) + 경로②(카테고리 자동추천) 2/2 PASS(true→노출/false→제외, 임시데이터 원복) + menu API 플래그 반영. 데모 rid=38, 데이터 전부 원복.
- 수정파일: `routes/menu.js`·`routes/brand-menus.js`(image_url 버그수정)·`contexts/MenuContext.tsx`·`pages/MenuManagement/MenuManagementPage.tsx`·`pages/CategoryManagement/CategoryManagementPage.tsx`·`pages/BrandGeneral/BrandMenusPage.tsx`·locales(menu/brand 4언어)·`scripts/design-guard-baseline.json`(bless). 설계=docs/MOBILE_ADDON_CROSS_SELL.md §5.

### DEV 완료·검증 (2026-06-26 #3) — thefire 잔여 운영 이슈 #2·#3·#6·#9·#11a 전부
> "지금 테스트·내일 운영" 목표로 리스트업된 잔여 전부 개발. 인쇄 방식·트리거 무변경(내용/매수/멱등만). 자동검증 전부 통과, 실프린터만 Irene 1회.
- **#2 부분수량 취소(3개 중 1개)**: 백엔드 DELETE qty 차감(전량=하위호환) + computeOrderTotals 재계산 + VOID 안내 "Cancelled N of M / KEEP R"(기존 인쇄필드, billPrint 무변경) + 소켓 isPartial. UI: LiveOrders·TableDetailPanel 수량 스텝퍼(터치44px) + KDS "N 취소, R 잔존". **API 9/9**.
- **#3 합본 빌(혼합차지)**: 테이블번호 있는 takeaway = 기존 dine-in 에 머지(auto-merge 조건 완화) + 품목 item_order_type 태깅 + computeOrderTotals `dineInSubtotal`(서비스차지=dine-in만, 세금=전체) **완전 하위호환**(순수주문 null=기존). 재계산 4경로 연결. **API 7/7 + jest 18/18**(혼합 7신규). 빌 품목 "TAKEAWAY" 라벨은 보류(금액은 정확, 라벨은 billPrint 4곳 렌더 위험 대비 가치 낮음).
- **#6 주방 스테이션 매수(1~3장)**: billPrint 첫장(기존)+copies-1 추가발행(방식/라우팅 무변경) + Settings 스테이션별 select + settingsGuard 보존 + **getter strip 회귀 2/2**.
- **#9 오프라인 주문 큐**: 마이그 orders.idempotency_key(UNIQUE, 배포등록) + POST /orders 멱등(같은key→기존주문) **API 6/6** + 신규 `utils/offlineOrderQueue.ts`(enqueue/flush/online-listener) + PaymentPage 네트워크실패 큐잉 + MobileApp init.
- **#11a takeout 뷰**: 1024px 실측 — body 가로넘침 0px·내부 오버플로 0 → **수정 불필요**(측정 우선 규칙).
- **검증**: build 69초 배포 · jest 18/18 · health 107/107(print-guard bless 8/8) · i18n Errors0 · design 신규0 · mount(LiveOrders/FloorPlan/KDS/Settings/모바일) EB0·err0.
- **수정/신규**: `routes/orders-crud.js`(#2·#3·#9) · `utils/orderTotals.js`(#3 혼합차지+테스트) · `utils/billPrint.js`(#6 copies) · `pages/Settings/SettingsPage.tsx`(#6) · `pages/LiveOrders/LiveOrdersPage.tsx`·`pages/FloorPlan/TableDetailPanel.tsx`·`pages/KitchenDisplay/KitchenDisplayPage.tsx`(#2) · `models/Order.js`+`scripts/migrate-add-order-idempotency.js`(#9, 배포등록) · `utils/offlineOrderQueue.ts`(신규)·`mobile/pages/PaymentPage.tsx`·`mobile/MobileApp.tsx`(#9) · locales(settings/orders/common 4언어) · print-guard manifest bless.
- **실프린터 확인 필요(Irene, 배포 후 1회)**: ①#6 매수 2~3장 실제 N장 출력 ②#2 부분취소 VOID 표 "Cancelled 1 of 3 / KEEP 2" 종이 확인 ③#3 혼합주문 빌 금액(서비스차지 dine-in만).

### 운영 배포 완료 (2026-06-26 #4) — 오늘 전부 + 전수감사 갭수정 라이브
- **2회 배포**: #11c+#2·#3·#6·#9 (Backup 20260625_215956) → 전수감사 갭수정 (Backup 20260625_231210). Smoke 9/9 ×2, 스키마 146=146.
- **전수 루트 감사로 찾은 실제 갭 수정(Irene 지적: "모든 루트 찾았냐")**:
  - #11c: RA "Add new item" + 세트메뉴 모달에 추천 누락 → 추가(MenuContext addMenuItem 생성 id 반환).
  - #3 혼합차지: mobile-orders.js 머지·orders-crud 테이블합본(1204)·add-items(2251/2353) 태깅+dineInSubtotal 누락 → 수정. 결제/인보이스/POS calculateTotal은 stored값/단일타입이라 SAFE.
  - #6 매수: 단일스테이션·RawBT·Browser 분기 누락(1-station 매장 1장) → `sendStation` 헬퍼로 전 분기 통일.
  - #9 오프라인: 주문생성 6곳 중 1곳만 보호 → pendingOrderData(QR/Bank)·온라인결제·OrderContext(POS) 멱등키 + POS 오프라인큐+"saved offline" 안내. /mobile/order는 미사용(dead).
  - #2 부분취소·#11c 모바일표시: 감사 결과 갭 0(전 진입점 funnel 확인).
- **운영 실검증(rid13 데모)**: 종합 11/11 PASS(2회) + 모바일머지 혼합차지 2/2 + idempotency. 잔여 잔재 데이터 정리.
- **남은 것 = thefire01 실프린터 종이 확인(Irene)**: ①합본 빌 서비스차지 dine-in만 ②부분취소표 "Cancelled N of M / KEEP" ③매수 2~3장 실제 N장. 매장 POS 켜진 상태에서 테스트주문 생성→인쇄→확인→삭제.

### 이전 진행 작업 (참고 — #11c 백엔드/모바일 기반, 위 #2 에서 UI 완성)
- **#11c 모바일 크로스셀 백엔드/모바일 기반(완성됨)**: 마이그2(product-recommendations·category-recommendation-flag, 배포등록)+모델2(ProductRecommendation·BrandMenuRecommendation)+Category.is_recommendation_source. RA 라우트(routes/recommendations.js)+모바일 공개(mobile-public.js)+BG(brand-menus.js GET/PUT /:id/recommendations)+동기화(brandMenuSyncService)+해석 util(utils/crossSell.js ①수동→②카테고리자동감지→[]). 모바일 RecommendationSheet+ItemDetailPage. 설계 docs/MOBILE_ADDON_CROSS_SELL.md.

### DEV 완료·검증 (2026-06-26, 인쇄방식 무접촉) — 운영 미배포
- **#4 머지 served·미결제 분리 버그**: findMergeableOrder/Mobile/GET mergeable 3곳 'served' 제외 해제 + table_cleared!=true 가드. API 2/2.
- **#5 stale-write OCC**: PATCH /:id/items 에 base_updated_at 버전가드(stale→409 STALE_WRITE, 수량 보존). 클라 4곳(LiveOrders/FloorPlan serve/TableDetailPanel/derive updatedAt). KDS 제외(opt-in). API 4/4.
- **#7 설정 로드-resilience**: SettingsPage printer 탭 로드실패 배너+재시도(useCallback)+printerSettingsError 저장가드. mount OK.
- **#10 FloorPlan UI**: FloorPlanStatsBar canTakePayment 게이트(서빙 숨김) + 헤더 접기 토글(localStorage).
- **#11b 리마크**: orders.notes 신규컬럼(migrate-add-order-notes.js, 배포등록) + Order 모델. POS 리마크 UI(빠른선택칩+자동저장) + 모바일 주문메모(전 주문유형) + LiveOrders 직원표시. billPrint는 이미 notes 인쇄(무접촉). API 3/3.
- **공통 검증**: build · health 107/107 · print-guard bless(orders-crud/POSTerminal, 인쇄블록 무접촉) · design-guard 신규0 · i18n verify Errors0(60키) · 실브라우저 mount 49/49(crash0).
- 디자인 기준: 모든 UI/UX 30년차 글로벌 디자이너 수준(메모리 [[feedback_world_class_uiux_bar]]).

### 완료된 작업 (2026-06-25 #2)
- **하이브리드 로컬 인쇄 — 운영배포(SW 4.16 신규주문, 4.17 이동/취소/void. Backup 20260625_140705·142900, Smoke 9/9 ×2)**: thefire 와이파이 불안정으로 폴러(서버경유) 자동인쇄 지연/누락 → **POS1이 자기 동작(신규·이동·취소·void)을 폴러 안 기다리고 즉시 로컬(QZ) 인쇄**. 신규파일 `hybridKitchenPrint.ts`(`printOrderKitchenNow`), billPrint 무변경, atomic claim 중복0, 표준 noticeHeader 재사용, master gate(POS1만·POS2 게이트로 폴러위임). POSTerminal(2)·FloorPlanPage(이동)·LiveOrders(취소)·TableDetailPanel(취소+void) 연결. 검증: build·autoprint44·health107·hydration0·design0·print-guard8/8(POSTerminal bless)·mount crash0·데이터흐름 API 실증. 상세=[[project_hybrid_local_print]], docs/THEFIRE_REMAINING_WORK_PLAN.md §1.
- **BAR 미인쇄 원인 진단(코드/설정 정상, 물리 도달 문제)**: station 14(BAR) `address="BAR"` 살아있음, 코드도 `.address`로 QZ 지정(billPrint:3382, 빌이 POS-80C로 잘 나오는 것과 동일). **원인=POS1 QZ가 "BAR" 프린터 미도달**(KITCHEN/KITCHEN 2는 잡힘). 이름 못 찾으면 기본프린터 폴백 + mirror로 printed_at만 찍힘 → BAR 전용 프린터엔 0장. **신규주문 하이브리드는 정상 동작 확인(Irene "신규 잘 나옴").**
- **(참고) 직전 세션 #1 완료분**: 설정 wipe 방지 자물쇠3개(v4.x) + 소켓 즉시화 + 백로그 컷오프(SW 4.12). 인쇄 구조 결정 CLAUDE.md 박제. 운영 디스크 83%→21%.

### 다음 확정 작업
- **BAR 미인쇄 — Irene가 물리 연결 확인 후 수정**: (A) BAR가 POS1 네트워크 공유인데 윈도우 프린터 이름이 "BAR" 맞나 → 이름만 맞추면 끝 / (B) BAR가 POS2에만 물림 → POS2가 BAR 스테이션만 자동인쇄하는 구조로 게이트 조정. **A/B 확답 받고 착수.**
- **하이브리드 실프린터 확인(이동/취소/void)**: POS1 강력새로고침 후 이동→TABLE CHANGED 1장 / 취소→ORDER CANCELLED 1장 / void→ITEM VOIDED 1장(표준 디자인, 중복0). 문제 시 롤백 Backup 20260625_142900.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **+Round 추가주문 "1 바로 + 1 나중" 2장 조사**: 백엔드 claim 중복0 재현으로 정상 입증, KDS 표시전용(인쇄 안 함) 확인 → 코드 누락 아님. 의심=`mirrorToBillPrinter=true`(미러 카운터 사본) 또는 BAR 미도달의 기본프린터 폴백. **BAR 도달 해결 후 재관찰 권장.** (실측: 진단은 "어느 프린터에서 2장 나왔나"로 미러 vs 진짜중복 즉시 판별 가능.)
- **#8 다른기기 결제 빌 즉시 트리거**: thefire는 빌프린터 POS에서만 결제 → 현재 불필요. 다른기기 결제 운영 시에만.
- **프린터 설정 `name` 빈 필드 정리**: QZ는 `address`로 동작(정상)이나 `name`이 전부 ""라 혼동. getter([[reference_model_getter_key_strip]]) 점검 겸 정리 검토(기능 영향 없음).
- **모바일 크로스셀 구현**: 설계 완료(docs/MOBILE_ADDON_CROSS_SELL.md). Irene "구현 시작" 지시 시.
- 매장 측(코드 아님): POS1·POS2 유선 이더넷(와이파이 혼잡이 크로스기기 인쇄 지연 근본). docs/THEFIRE_REMAINING_WORK_PLAN.md §0.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
