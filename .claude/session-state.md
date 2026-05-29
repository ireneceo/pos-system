# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-29 (운영 배포 누적, 최신 hotfix #4)
**버전:** v3.43 (버전 미상승 — backstage/critical fix). 아래 전부 **운영 배포 완료**.
**작업 상태:** The Fire 실매출 중 실시간 대응. 다음 = Irene 현장 확인 보고 대기.

### hotfix #4 (Backup 20260529_141604, 번들 main.a2f57813.js) — 결제팝업/Served/Settlement인쇄
- 결제 팝업 SC/Tax 표시 fix (PaymentModal 게이트 값기준) + Floor Plan Takeaway 표시 (table-status takeawayCharge 반환 + 패널 줄)
- Floor Plan Served 클릭 fix (활성주문이면 단계무관 토글 — KDS 표시전용 매장 지원)
- Daily Settlement 인쇄경로 = 빌과 동일 QZ HTML pixel (브라우저 폴백 → sendHTMLViaQZTray) + 제목 리터럴 버그
- ⚠️ Settlement 인쇄 종이 출력 + 결제팝업/Served 현장 확인 대기. **Settlement 내용 Z-리포트 매칭은 그룹3 #8 로 이월(신규 데이터 필요).**

---

## 🔔 다음 세션 진입 시 사용자에게 알려야 할 것

### A. 2026-05-29 운영 배포 완료 (3회, 모두 smoke 10/10 + health 80/80)
**1차 (Backup 20260527→ 071421)** — 이전 dev 5종:
1. 주문 머지 전체 금액 재계산 정합성 (`utils/orderTotals.computeOrderTotals` 단일 공식, 4경로+DELETE)
2. 빌프린트 단가 제거 + 줄간격 축소 (`billPrint.js`)
3. Floor Plan QR 인쇄 + 모바일 메뉴 캐시리스 표시 (4언어)
4. 진단 이메일 자동발송 중단 (POSTerminal `_tele`/`_telemetry` no-op)
5. 카드 결제 카드종류 필수 토글 (`payment_settings.card.requireCardType`)

**1차 직후 DB 정합성 핫픽스 (운영 DB 직접)** — 배포 스키마 sync 가 못 잡던 누락:
- 신규 테이블 `brand_product_restaurants` / `foodcourt_product_restaurants`
- 컬럼 `brand_products.distribution_mode` / `foodcourt_products.distribution_mode` / `suppliers.foodcourt_id`
- `suppliers.owner_type` enum 에 `foodcourt` 추가 (dev=NOT NULL DEFAULT restaurant 로 일치)
- The Fire(16) `categories.kitchen_station_id`: Korean Style Chicken(90)·Ramyun&Noddle(98) → KQ2(13) (NULL 이던 것)

**2차 (Backup 20260529_0817대, 번들 main.114d2bd0.js)** — 자동인쇄 critical 2종:
6. **주방 티켓 station 이름 빈칸 버그** — `utils/stationEnrichment.js` 의 상품ID 추출이 `item.id`(카트라인 "order-…") 를 먼저 잡아 NaN → 상품 못 찾음 → 모든 POS 주문 `kitchen_station_id=null`. `resolveProductId()` 추가(menu_item_id/product_id/menuItem.id 우선, 숫자 id 만 허용). 검증: POS 모양 주문 station 정상 저장.
7. **추가주문(+Round) 시 이전 품목까지 재인쇄** — 품목별 `printed_at` 인쇄 히스토리(order_items JSON 내, 스키마변경 X). `pending-print` 가 `kitchen_items`(미인쇄분만) 반환, `PATCH /:id/printed` 가 printed_at 도장. poller 2곳(useAutoPrintPoller + MainLayout)이 kitchen_items 로 인쇄. 양 경로(소켓/poller) 공유 히스토리 → 재발행 0. 검증: 라운드2 추가 시 kitchen_items=새 품목만, full order_items=빌용 전체.

**3차 (Backup 20260529_083024)** — 이메일 스팸 차단:
8. `POST /api/qz-tray/diagnose` 에서 `scope` 가 `auto-` 로 시작하면(auto-kitchen-skip/auto-bill-skip/auto-*-fail) **티켓·이메일 둘 다 차단(202)**. 수동 "Send to Support"(scope 없음)만 발송. 옛 캐시 단말(K-DINE ARM)이 계속 쏴도 백엔드에서 막힘. 운영 202 확인.

**4차 (Backup 20260529_085244, 번들 main.b9a45753.js)** — 오더티켓 중복(3장) 차단:
**5차 (Backup 20260529_090546, 번들 main.a751d308.js)** — station 분배 안 됨(통합만 POS) fix:
10. **printKitchenTicketsByStation QZ 게이트** — The Fire는 각 station을 method:'qztray'로 지정했는데 마스터 `kitchenPrinter.method`가 비어 `getPrinterMode()`(기본 'rawbt')로 폴백 → QZ 분기 skip → 통합 티켓 붕괴 + mirrorToBillPrinter=true라 통합본이 POS-80C에만 인쇄. `billPrint.js` 게이트를 `shouldUseQZTray('kitchen') || stationIds.some(method==='qztray')`로 변경 → station 자체 qztray면 per-station 라우팅. **남은 변수**: station address "KITCHEN"/"KITCHEN 2"/"BAR"가 POS 기기 QZ Tray의 실제 프린터명과 일치해야 함(미일치 시 여전히 무음 실패 → Irene 현장 확인 필요).

**실매출 시작 (2026-05-29 12:21)**: Irene 요청 — The Fire(16) **모든 주문 데이터 삭제** (제로부터 실매출). orders 82→0, order_payments 3→0, order_actions 288→0, restaurant_daily_stats 26→0, point_transactions 0, reservations.deposit_order_id FK null 처리. 백업 `/var/www/backups/thefire-orders-20260529_122101.sql.gz`. 운영 백엔드 재시작(메모리 정리). **이 시점 이후 16번 주문 = 실매출.** (테스트 주문 더 넣지 말 것 / 넣으면 실매출에 섞임)

**13차 (번들 main.5ecbbef5.js)** — 인쇄 속도 개선 (지연시간만, 로직 무관):
31. poller 첫발사 2000→800ms, 주기 10000→5000ms (useAutoPrintPoller + MainLayout). mirror 600→200ms(×2). 스테이션간 1500→800ms. POS직접 800→300/400→250ms. 멀티스테이션 모바일 ~5.6s→~2.6s. **인쇄 방식/라우팅 로직 안 건드림** (CLAUDE.md 보호규칙 준수, Irene 속도개선 요청 기반).

**조사중 — 안드로이드 모바일주문 자동인쇄 간헐 실패**: 인쇄는 카운터 POS(메인 워크스테이션) poller가 담당(디바이스 무관). 최근 모바일주문(12238 BARPR/12239 KQ2)은 station 정상+printed_at 찍힘. 아이폰(12239) 정상. 안드로이드 간헐 실패 — 원인 미상(주문 데이터 차이? 특정 station 프린터 오프라인 phantom?). 안드로이드 주문 raw 데이터 vs 아이폰 1:1 비교 대기중. (KDS 표시전용 유지 — 카운터가 인쇄 주체)

**12차** — 모바일 station 이름폴백 + 캐시리스 복원:
29. **모바일 주문 station 라우팅 fix**: 모바일 item 은 상품 id 없이 **이름만** (menu_item_id=null, id="item-<order>-<idx>") → enrich 가 station 못 박아 st=None → 첫 station 으로 잘못 감(밀크쉐이크가 BAR 안 감). "안드로이드 안나옴"은 OS 무관, 모바일 전체 문제였음. `utils/stationEnrichment.js` 에 **이름 기반 폴백** 추가 (id 실패 시 Product.name 매칭). POS 는 id로 풀려 추가쿼리 없음. 검증: 이름만 item → station 25 ✓.
30. **운영16 캐시리스 복원**: payment 복구 때 내가 cash.enabled=true 로 잘못 켬 → The Fire 는 캐시리스(현금 비활성). cash.enabled=false 로 되돌림 → QR CASHLESS 표시 재출현 + 모바일 현금 숨김. (cashless = cash.enabled===false 로 판정, TableDetailPanel)

**11차 (번들 main.842b6a95.js)** — 오더티켓 중복 제거 + DELETE-ITEM 수정 + 인쇄보호:
26. **KDS 표시 전용** (order-created + order-items-added `shouldAutoPrint=false`). 카운터 POS 직접인쇄 + poller 가 인쇄 주체. KDS 도 인쇄해서 **티켓 2장 중복**이던 것 제거. (전제: 카운터가 station 프린터에 닿음 — 2copy 중 1개가 카운터본인 게 증거)
27. **DELETE-ITEM `newTotal is not defined` 수정** (검증 3단계에서 발견. computeOrderTotals 리팩토링 잔재). `const newTotal = order.total_amount` 추가. 운영에도 있던 버그.
28. **CLAUDE.md 인쇄 코드 보호 절대규칙** 박음 (인쇄 무관 작업 시 인쇄파일 열지 말것 / 변경은 Irene 승인+실프린터 확인 / KDS 표시전용 / HTML pixel=한글OK raw=깨짐 / qzHasPrinter 게이트 재도입 금지).
**미해결(비인쇄)**: ① `purplehere.com/restaurant/16/floor-plan-editor` 에러(편집화면 안뜸) — 원격 재현 못함(인증), 실제 에러메시지 필요. ② Floor Plan 확대 개선 + 라운드박스 제거 요청. ③ 인쇄 느림/줄겹침-글자잘림(프린터 큐 밀림) — 중복제거로 작업 절반 → 개선 가능성, Irene 재테스트 후 판단(한 번에 하나, 실프린터 확인).

**캐시/전파 진단 (중요)**: index.html = `max-age=300`(5분) + Cloudflare `cf-cache-status: DYNAMIC`(엣지 캐시 안 함) → **번들은 배포 후 ~5분 내 자동 전파** (해시 박힌 main.[hash].js URL + index.html 짧은 캐시). 수동 캐시삭제 불필요. **단 `sw.js`는 nginx `location ~* \.(js|css)$` 가 `immutable max-age=31536000`(1년) 걸어 서비스워커가 영영 갱신 안 됨** → SW 의 force-reload-on-activate 안 뜸(번들 전파엔 무해). 고치려면 nginx `location = /sw.js` no-cache 추가 필요(sudo 필요, 현재 불가). 운영 nginx: `/etc/nginx/sites-available/purplehere.com`, root `/var/www/production-frontend/build`.

**10차 (번들 main.4640bb7f.js)** — 주방 HTML 복귀(한글) + printer anti-wipe + 운영16 printer 복구:
23. 주방 station 인쇄 raw ESC/POS→**HTML pixel 복귀** (raw 는 한글 깨짐; 카운터 미러가 HTML로 한글 정상인 게 증거). 카운터 미러/빌 HTML 그대로 보존.
24. **printer_settings anti-wipe 가드** (restaurants-crud PUT): incoming 이 빌주소/워크스테이션/스테이션 비우면 기존 보존. 운영16 printer_settings stale-save 로 billPrinter.address/autoPrint/workstations 날아간 것 **세션 초 기록값으로 복구** (POS-80C, autoPrint true, mirror true, ws 2, st 12/13/14).
25. 운영16 kitchenPrinter.autoPrint=false→true 복구 → POS 직접인쇄 발사 재개(카운터 통합본 다시 나옴). 모바일 통합본은 이미 정상(HTML/POS-80C).

**9차 (번들 main.77abe1ab.js, sw 3.43.1-printfix-20260529)** — 주방 raw ESC/POS + 자동갱신:
20. **주방 자동인쇄 = raw ESC/POS** (`billPrint.js` sendToRawBTPrinter qztray 분기): 이름 프린터에 HTML 픽셀(sendHTMLViaQZTray) 대신 **sendViaQZTray(generateKitchenTicketContent)** — 작동 확인된 Test 인쇄(qzTrayTestPrint→sendViaQZTray)와 동일 경로. HTML 픽셀은 주방 thermal 에서 출력 안 됐음(빌 POS-80C 는 HTML OK라 유지). 이게 "Test는 되는데 자동 안됨"의 진짜 원인.
21. **printer-availability 게이트 완전 제거** (8차에서 제거, 이게 수동인쇄/다른매장까지 막았던 주범). qzHasPrinter 함수만 미사용 잔존.
22. **SW 자동갱신**: `public/sw.js` SW_VERSION '3.43.0'→'3.43.1-printfix-20260529'. SW 가 install 시 캐시 전부 wipe + activate 시 모든 탭 navigate(reload) → 매장 기기가 **수동 캐시삭제 없이 자동으로** 최신 번들 받음. ("배포해도 안바뀜" = SW 버전 고정이라 갱신 안 됐던 것). 향후 배포마다 SW_VERSION 올려야 자동 전파.

**8차 (Backup 20260529_103331, 번들 main.4640bb7f.js)** — 게이트 롤백(수동인쇄 복구) + master 토글 존중:
18. **printer-availability 게이트 제거** — 7차에 넣은 qzHasPrinter 게이트가 **수동인쇄/Test/다른 매장까지 막음**(over-block). 제거. QZ Tray 는 없는 프린터로 보내면 자연히 에러나므로 각 기기가 제 프린터로만 출력됨(게이트 불필요했음). qzHasPrinter 함수는 남아있으나 미사용.
19. **kitchen 자동인쇄 = master 토글만 게이트**. Settings "Auto-print kitchen ticket the moment an order is created" = `kitchenPrinter.autoPrint`. 기존 `kpAuto || stationAutoPrint`(station OR-우회)가 master 꺼도 인쇄 → 6곳 모두 `kpEnabled && kpAuto` 로 변경. master 끄면 주방 자동인쇄 안 함(Irene 요구). [[reference_autoprint_master_gate]] 원칙 복원.

**7차 (Backup 20260529_101207, 번들 main.b102986b.js)** — 상용 POS 방식 인쇄 + 결제 anti-wipe:
13. **프린터-가용성 라우팅** (`billPrint.js` sendHTMLViaQZTray/sendViaQZTray): `qzHasPrinter()` — 각 기기는 QZ Tray에 **실제로 있는 프린터에만** 인쇄, 없으면 조용히 return false. → 가로채기/유령성공("printed_at 찍혔는데 종이 X") 제거. 몇 대를 열어두든 주방프린터 달린 기기가 주방티켓, 빌프린터 달린 기기가 빌을. (IP 주소는 가용성 체크 없이 네트워크 전송)
14. **KDS 자동인쇄 복구** (6차에서 끈 게 "잘 나오던 걸" 망친 핵심 — 주방 프린터가 KDS기기에 달렸으면 KDS가 인쇄해야 함). claim 없는 print-then-mark. 가용성 게이트가 없는 프린터는 알아서 skip하므로 카운터/KDS 어느 쪽에 프린터가 있든 정확히 동작.
15. **실패 배너 제거** (가용성 skip을 실패로 오인 표시 방지. autoprint-failed dispatch는 no-op으로 남음).
16. **결제 anti-wipe 가드** (`restaurants-crud.js` PUT /:id ~1603): 기존 결제수단 ≥3개인데 incoming ≤1개면 payment_settings 교체 **거부**(기존 유지). staffMeal만 남던 wipe 재발 차단. **원인**: stale/half-loaded 클라이언트가 staffMeal-only state를 저장 → 7→1 붕괴. (마이그 아님)
17. **운영 16번 결제 복구**: id 8 표준 7종 복사 + 현금 활성. (백업에 DB덤프 없어 통합표준으로 복구). dev id5도 동일 wipe 상태(미복구).

> 미해결 가능 edge: 모바일 주문의 카운터 통합본 — KDS가 needs_print 먼저 clear 시 카운터 poller가 skip할 수 있음(POS 주문은 카운터 direct가 통합본 인쇄하므로 정상). 필요시 needs_counter_print 분리 플래그 추가.

**6차 (Backup 20260529_093927, 번들 main.247ca5c2.js)** — 안정성 재설계 (claim 폐기):
11. **사전 claim 폐기 → post-print 기록**. claim 이 인쇄 못 하는 기기(KDS) 선점→실패 시 "아무것도 안 나옴" 유발. 이제 인쇄 성공 후에만 printed_at 도장, 실패 시 needs_print 유지(poller 재시도). **KDS 표시 전용**(자동인쇄 비활성). 카운터 POS/FloorPlan poller+직접인쇄가 단일 주체. 실패 시 `AutoPrintFailureBanner`(빨간 배너, autoprint-failed 이벤트). **규칙 `docs/PRINT_RULES_MATRIX.md` 🔒 6개 고정** (Irene 확정). 모든 게이트 설정 기준(autoPrint/mirrorToBillPrinter/billPrinter.autoPrint). **수정**: useAutoPrintPoller.ts·MainLayout.tsx(claim→post-print+실패이벤트)·KitchenDisplayPage.tsx(shouldAutoPrint=false ×2)·POSTerminalPage.tsx(직접인쇄 ×2 claim 제거)·AutoPrintFailureBanner.tsx 신규.
12. **남은 변수(미해결 가능성)**: station address `KITCHEN`/`KITCHEN 2`/`BAR` 가 QZ Tray 실제 프린터명과 불일치면 무음 실패. 빌(`POS-80C`)은 동작 확인됨. Irene 에게 station별 Settings Test Print 로 이름 검증 요청함.

9. **자동 주방인쇄 EXACTLY-ONCE (원자적 claim)** [폐기 — 11번으로 대체] — 같은 주문에 POS 직접인쇄 + KDS 소켓 + poller(2곳) 가 조율 없이 각각 찍어 최대 3장. 신규 `PATCH /orders/:id/print-claim`(원자적 `needs_print true→false`, claimed 반환) + `/print-rearm`(실패 재시도) + `/bill-printed`(bill-only needs_bill clear). 모든 자동경로가 인쇄 전 claim → 이긴 1개만 인쇄, 나머지 skip. 실패 시 rearm. 수동 재인쇄(KDS printOrderTicket / OrderCompleteModal)는 claim 안 함(의도적). 검증: 3 동시 claim → 정확히 1 승리(초기+ +Round), +Round kitchen_items=새 품목만. **수정 파일**: backend orders-crud.js(claim/rearm/bill-printed/printed/pending-print), frontend useAutoPrintPoller.ts·MainLayout.tsx·KitchenDisplayPage.tsx(order-created+items-added)·POSTerminalPage.tsx(send-to-kitchen+payment).

→ **커밋/`/개발완료` 미실행 — 작업 트리에만 있음** (운영엔 rsync 로 나감). 다음 세션 진입 시 git 정리 여부 확인.

### A-2. The Fire 현장 자동인쇄 테스트 (진행 중)
재개 시: POS+KDS Ctrl+Shift+R → 새 주문으로 (1) POS 3-station (2) +Round 추가분만 (3) 모바일. 옛 주문(12160 등)은 station=null 옛 데이터라 무시. Irene 결과 → 서버 DB 대조.

### B. v3.43 운영 매장 현장 검증 (이전 세션 이월, The Fire 도입)
AutoPrint master gate / 신규주문 banner / Customer Display reconnect·자동오픈 / Receipt logo 인쇄 / Brand Menu / KDS +Round N — 현장 동작 확인 여부 확인.

---

## 다음 확정 작업 (Irene 명시 지시 + 결정 확정 완료 — 바로 구현)

> 2026-05-29 Irene 가 AskUserQuestion 으로 전부 컨펌함. 재질문 없이 구현.

### 그룹 1 — Floor Plan / POS 운영 개선 (중규모, 바로 구현 가능)
1. **우측 패널 접기** (`TableDetailPanel.tsx`) — 항상 노출: 주문 상태진행 버튼 + 결제 + Add Items. 접이식 "테이블 작업 ▾"(기본 접힘): QR Reprint/Expire/정보, 프린트 아이콘, Cancel/Leaved. → 주문내역 가독성 확보.
2. **"Open in POS Terminal" 링크 제거** — `TableDetailPanel.tsx` 2곳(occupied ~1798 / available ~1837). 신규주문은 기존 "+ New Order" iframe POSOverlay(`handleNewOrder`)로 충분.
3. **테이블 점 재정의** (`TableNode.tsx` `MobileOrderDot`) — 기준을 "**미접수 새 주문**"으로: `orderStatus === 'pending'`(+outstanding), **출처 무관**. 색=빨강(needs-attention 토큰). 직원이 접수(Start Cooking 등 상태 진행)하면 사라짐. 테이블 색은 주문상태, 점은 "확인 필요" 직교 신호. **범례(legend) 추가** (Floor Plan 화면).
4. **POS 품절(sold-out)** — `Product.soldOut` 필드 이미 존재(is_active=활성/비활성과 별개). 메뉴 타일 **길게누르기 → 품절/재고복구 토글**. 즉시 회색+SOLD OUT + **socket 브로드캐스트**(전 POS/모바일 반영). 백엔드: `PUT /menu/product/:id/toggle-soldout`(toggle-active 미러, `checkProductTenant` → Staff 허용). Staff 권한 OK.
5. **할인 PIN 승인** — 매장 설정 토글 "할인 시 PIN 승인 필요"(operation_settings 권장). ON 시 할인 적용에 PIN 입력 → **신규 경량 엔드포인트** `POST /api/staff/verify-pin-permission`(PIN 이 *할인 승인 권한* 가진 직원인지 서버 검증, **JWT 재발급/세션 전환 없이** `{authorized, by}` 반환) + 감사로그. **하드코딩 `MANAGER123` 제거**(`POSTerminalPage.tsx:1914`). 권한 모델: User.permissions JSON 에 `discount_authorize` 추가 or Restaurant Admin/Owner/Manager 자동 허용 — 구현 시 확정.

### 그룹 2 — 세트메뉴(콤보) 재설계 (대규모 → `/기능설계` 6단계)
- 설계 문서: **`docs/SET_MENU_REDESIGN.md`** (작성 완료).
- 핵심: ① OR(택1) 슬롯 `set_groups` 구조 ② 구성품 Product live 참조 + 옵션 상속 + 주문라인 구성품 분해 → 단품/세트 통합 통계 + 구성품 레시피 재고차감 ③ 품절 연동(fixed=상품품절 시 차단, choice=전 선택지 품절 시만 차단).
- 기존 set_items → set_groups[fixed] 무손실 마이그.
- 구성품 선택 UI는 이미 검색 가능(확인됨).

### 그룹 3 — 주문 상세/추가 흐름 (2026-05-29 Irene 현장 추가, 분석 완료)

6. **옵션이 상세에서 제대로 안 나옴** (POS / Floor Plan / LiveOrders 상세).
   - **분석 결과: 데이터는 정상.** 운영16 실주문 확인 → `order_items[].options` 가 깔끔한 `string[]` 로 저장됨 (예: `["Beef"]`, `["꿀간장치킨 I Soy Honey Sauce","버터갈릭 I Butter Garlic"]`). `selectedOptions` 는 undefined(주문 저장 후엔 options 만 남음).
   - **즉 렌더(표시) 측 버그.** 어느 상세뷰가 options 줄을 빠뜨리는지 특정 필요. 후보:
     - `LiveOrders/OrderDetailModal.tsx`(~715): `Array.isArray(item.options)? join(', ') : item.options` — string[] 이면 OK여야 함. 실제 누락 지점 확인 필요.
     - `FloorPlan/TableDetailPanel.tsx`(~1562): `options.map(o => typeof o==='string'? o : o?.name)` — string 처리 OK.
     - `POSTerminalPage.tsx`: 기존 주문을 카트로 재구성/추가할 때 options 복원 누락 가능 (selectedOptions 없어서 가격/표시 깨질 수 있음).
   - **할 일**: 3개 상세뷰 실제 렌더 1:1 점검 → options 줄 통일 표시 (string[] 기준). set/combo 구성품 표시도 함께 점검.

7. **Floor Plan "Add Items" → 첫 New Order 처럼 POS(오버레이) 열기**.
   - 현재: `TableDetailPanel.tsx` 의 인라인 미니카트(`addItemsCart`, ~639/714/1302) 로 추가.
   - 요청: New Order 와 동일하게 **POSOverlay(iframe)** 로 열어 전체 POS 메뉴/검색/옵션으로 추가 (메모리 [[reference_floor_plan_pos_overlay]] 일관성). 이러면 6번 옵션 문제도 POS 정식 흐름으로 흡수됨.
   - 연계: 그룹1 #2("Open in POS Terminal 링크 제거")와 같은 방향 — 모든 진입을 POSOverlay 로 통일. POS 가 기존 주문 테이블에 핀(table_number/forceMergeIntoOrderId)되도록 컨텍스트 전달.

8. **Daily Settlement 내용 = 매장 제공 Z-리포트 샘플에 정밀 매칭** (2026-05-29 배포에서 인쇄경로만 우선 수정, 내용은 이월).
   - 이미 가능(현 데이터): GROSS/DISCOUNT/NET SALES, EXCLUSIVE TAX(Service Tax @6%)/EXCLUSIVE CHARGES(Service Charge @10%), 결제수단별→Total Credit Card/Total Others/Total Tender 그룹, TOTAL TRANSACTIONS, ATV(net/gross), Non-Sales(Staff Meal), 주문유형(Dine In/Takeaway).
   - **신규 데이터 필요(현 모델에 없음)**: POS ID, BOD/EOD 시각, BILL ROUNDING, VOIDED BILLS/VOIDED ITEMS(New/Saved/Billed) 분해, Cash Movement/FLOAT, ITEM ENTRY COUNT(Scan/Key/Menu). → 백엔드 집계/스키마 작업 + 실프린터 반복검증 동반 별도 사이클.
   - 샘플 원본: 대화 2026-05-29 (THE FIRE Z DAILY SALES).

---

## 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님.
- station-only 매장 패턴 검증 / Customer Display PWA popup 우회 / Brand Menu lock 토글 UI / Staff 권한 fine-grained

---

## 서버 재시작 후 복구 가이드
새 Claude 세션 시작 시:
```
이전 세션 이어서 할게. /var/www/.claude/session-state.md 읽어줘.
```
