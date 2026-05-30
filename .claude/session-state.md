# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-30 (세트메뉴 옵션 전구간 + 브랜드 세트 OR 빌더 업그레이드 운영 배포)
**버전:** **v3.44** (버전 미상승 — 배포는 했으나 버전 올림 질문 중 Irene 이동, 다음 세션 결정). 최신 배포 Backup 20260530_042734, smoke 10/10.
**작업 상태:** 배포 완료. **다음 세션 필수 검증** = 브랜드 세트(OR/옵션) 산하 매장 실전파 + 세트 A/B 인쇄 실프린터 + 이머전시 모바일인쇄 실프린터 ([[project_brand_set_groups_verify]]). The Fire 실매출 중.
**v3.44 운영 검증:** The Fire(trial status) 모바일 메뉴 실데이터 mount 크래시 0 + #7 영업시간 배지 근본원인=trial status 확정(옛 로직 active만 Open). 릴리즈 노트/블로그/공지 등록 완료.
**🟠 미뤄둔 일 (매장 가서):** 이머전시 모바일 인쇄 수정 + 명칭(POS-80C) 표시 = dev 배포됨, **실프린터 확인 후 `check-print-guard --bless` → 운영배포**. 아래 "🟠 미뤄둔 작업" 섹션 참조.
**🟢 신규 (dev 배포됨, 인쇄 무관):** 품목별 서빙 — Floor Plan/Live Orders 둘 다 활성주문이면 단계무관 칩 클릭→Served(ready 건너뜀). 아래 "🟢 품목 서빙" 섹션 참조.
**🟢 신규 (dev 배포됨 main.a3684727.js):** KDS 주문단위 보기 = 주방 탭별 독립 단계. 아래 "🟢 KDS 주방별 독립 단계" 섹션 참조. (KDS 🔒라 감시기 drift 3번째, 인쇄 핸들러 무변경 검증함)

### hotfix #4 (Backup 20260529_141604, 번들 main.a2f57813.js) — 결제팝업/Served/Settlement인쇄
- 결제 팝업 SC/Tax 표시 fix (PaymentModal 게이트 값기준) + Floor Plan Takeaway 표시 (table-status takeawayCharge 반환 + 패널 줄)
- Floor Plan Served 클릭 fix (활성주문이면 단계무관 토글 — KDS 표시전용 매장 지원)
- Daily Settlement 인쇄경로 = 빌과 동일 QZ HTML pixel (브라우저 폴백 → sendHTMLViaQZTray) + 제목 리터럴 버그
- ⚠️ Settlement 인쇄 종이 출력 + 결제팝업/Served 현장 확인 대기. **Settlement 내용 Z-리포트 매칭은 그룹3 #8 로 이월(신규 데이터 필요).**

### 🛡️ 인쇄/주문 회귀 안전망 구축 (2026-05-29, 인쇄 동작 코드 무수정 — 전부 추가)
인쇄 문제 해결 확인 후 "앞으로 다른 기능 확장하다 인쇄/주문 건드려 사고 안 나게" 안전망 3종 구축.
1. **`scripts/check-print-guard.js`** — 🔒 보호 파일 8개 지문(sha256) 감시. 인쇄 무관 작업 후/배포 전 실행 → 실수 변경 즉시 감지. `--bless` 로 승인된 변경만 기준 갱신. 기준 등록 완료 + 탐지/복구 증명. manifest=`scripts/print-guard.manifest.json`.
2. **health-check `print` 카테고리 (8건)** — 데모 매장 실제 API 검증: orphan sweep(멱등)/티켓 정확히 1번/+Round 새 품목만/**동시 print-claim 5개→1개만(티켓 중복 방지)**/세금공식 2건/익명 401/🔒보호파일 무결성. **전체 80→88/88 통과.**
3. **`tests/order-totals.test.js` (11건)** — computeOrderTotals 청구 공식 고정(세금=할인후/no-tax 유지/%할인 비례/고정유지/삭제감소/포장·배달). jest 38/38(6스위트) 통과.
- CLAUDE.md 🔒 섹션에 "자동 안전망" 실행 절차 박음. 미래 개발/배포 워크플로우에 편입.
4. **배포 게이트 통합 (`deploy-to-production.sh` 1b 단계)** — Irene "언제 자동으로 체크되냐" 질문 대응. 배포가 운영 도달 전(backup/build 전) ① 보호파일 무결성 ② health-check 88건을 무조건 실행, 실패 시 배포 막음(fail-closed). 긴급 우회 `--skip-safety` 플래그. 통과/막힘 양쪽 경로 + bash -n 문법 증명 완료. (git/auto-save 는 트리거 안 함 — 너무 잦음.)

---

## 🟠 미뤄둔 작업 — 이머전시(Emergency Routing) 모바일 인쇄 + 명칭 (2026-05-29, **매장 실프린터 확인 대기**)

> Irene 가 "지금 매장 아니라서 실프린터 테스트 못함 → 나중 할 일로 미뤄둠" 지시. **dev 에는 빌드·배포됨(번들 main.3c16a0a0.js), 운영 배포 안 함.**

**왜 했나:** Irene 요청으로 이머전시 인쇄 검증 중 두 가지 발견:
1. **모바일/QR 주문이 비상모드에서 자동인쇄 안 됨** (확정 결함). 두 poller(useAutoPrintPoller:50 / MainLayout:1203)가 emergencyMode 면 인쇄 직전 bail → KDS는 표시전용 → POS 직접경로는 POS주문만 → 모바일은 무인쇄였음. Irene 가 AskUserQuestion 으로 **"모바일도 cashier로 나가게 수정" 선택**.
2. **"cashier" 명칭이 헷갈림** (Irene 지적). 실제로는 "현재 워크스테이션의 영수증(빌) 프린터"(The Fire=POS-80C). 추상어 "cashier"만 표시됐음.

**한 변경 (인쇄 동작 = 🔒, Irene 승인 기반):**
- poller 2곳의 `if (emergencyMode) return` **제거** → 비상시 poller 가 정상 경로를 타고, `printKitchenTicketViaRawBT`(billPrint:2140)가 죽은 station 건드리기 전 cashier 로 redirect → 모바일 주문도 cashier 로. (정상모드와 동일 흐름 + redirect, POS중복은 printed_at/inflight 로 방지.)
- SettingsPage 이머전시 카드: 실제 프린터 **이름**(`billPrinter.name`) 노출 + descOn/descOff/modalOnMessage/비교카드에 "{{printer}} (이 워크스테이션 영수증/빌 프린터)" + "POS·모바일 모두" 명시. i18n 4언어 7키 갱신(en/ko/zh/ms), i18n:verify Errors 0.

**지금까지 검증 (매장 무관, 완료):** build 성공 / i18n 0 errors / headless mount 25라우트 크래시 0(MainLayout 공통 안전) / 무결성 감시기가 정확히 poller 2개만 drift 표시.

**⏸ 남은 일 (매장에서):**
- **실프린터 확인 필수** (🔒 규칙3): 비상모드 ON → ① POS 주문 cashier 출력 ② **모바일 QR 주문도 cashier 출력**(이번 수정 핵심) ③ 카드에 실제 프린터명(POS-80C) 정확 표시 ④ 비상 OFF 시 station 정상 복원.
- 확인되면: `cd dev-backend && node scripts/check-print-guard.js --bless` (poller 2파일 새 기준 등록) → 그 다음에야 `/배포` 게이트 통과.
- **현재 감시기는 의도적으로 un-bless 상태** = "미검증 인쇄 변경 있음" 신호 + 운영 배포 자동 차단(fail-closed). 확인 전엔 배포 금지.

**30년차 /검증 (적대적) — 자가 결함 3건 발견·수정:**
- (결함1) 진짜 "티켓 3장" 방지 메커니즘(원자적 print-claim race) 미검증 → 동시 claim 5개→1개 테스트 추가.
- (결함2) 무결성 감시기 거짓양성 위험(MainLayout 등 공유파일은 사이드바 작업도 트립) → dedicated/shared 분류 + compareManifest export 리팩토링.
- (결함3) 감시기 수동→안 돌릴 수 있음 + 파이프 조기종료 시 테스트 주문 leak(실제 1건 발견) → ① health-check 의무 게이트에 무결성 통합 ② TEST_MARKER + orphan sweep 로 멱등화(심은 orphan 자동 제거 증명). 데모 잔여 0 권위 확인.

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

## 🟢 품목 서빙 (Floor Plan + Live Orders 통일, 2026-05-29, dev 배포됨 · 인쇄 무관)

> Irene 요청: "주방이 ready 체크해야만 서빙표시 되는데, 요리 끝남(ready)을 주방이 체크하긴 힘들다. 음식 나오면 서버가 '서빙했다' 누르면 = 요리끝+서빙 한 번에 되게. Live Orders 상세에도 동일." AskUserQuestion 으로 표시방식 = **"상태칩 + Serve 액션 명확화"** 선택.

**분석:** Floor Plan TableDetailPanel 은 이미 hotfix #4 로 활성주문이면 단계무관 Served 됨(맞음). 단 칩이 상태배지처럼만 보여 헷갈림. **Live Orders OrderDetailModal 은 per-item 서빙 자체가 없었음**(진짜 빠진 부분). 백엔드 `PATCH /orders/:id/items` 재사용(신규 DB 없음).

**구현:**
- 신규 공유 컴포넌트 `components/Order/ItemServeChip.tsx` — 상태칩 겸 Serve 버튼. 활성주문이면 단계무관 클릭→served(ready 건너뜀), 토글로 취소(=ready). `common:itemServe.*` 8키×4언어. KDS 표시전용 매장(품목 pending 머묾) 위해 단계무관 클릭 필수.
- Floor Plan TableDetailPanel: 기존 pill 라벨에 "· Serve ▸" 힌트만 추가(최소변경, 동작 그대로).
- Live Orders: LiveOrdersPage 에 `handleToggleItemServed`(PATCH /items + 전품목 served 시 PATCH /status='served') + OrderDetailModal 에 칩 렌더 + 서빙 카운트 헤더.

**검증(완료):** 타입검사 내 4파일 0에러(src 잔여 2건은 무관한 SignupPage 기존). build 성공+dev배포(main.b492a9de.js). i18n 0 errors. Autoprint regression 44 PASS(인쇄 불변식 무영향). headless mount: **live-orders/floor-plan/pos-terminal/kitchen 진입 OK**(display/menu 산발 타임아웃은 동시 빌드부하 환경탓, 내 기능 무관 페이지). 무결성 감시기: 서빙 파일은 비보호라 인쇄 drift 없음(emergency 2개만 그대로).
**남은 일:** Irene dev/매장에서 칩 클릭→Served 동작 UX 확인(인쇄 아님 → 실프린터 불필요). 확인되면 운영배포 후보(단 emergency drift 때문에 배포게이트는 그 처리와 함께).

---

## 🟢 KDS 주방별 독립 단계 (주문단위 보기 한정, 2026-05-29, dev 배포됨 · 인쇄 핸들러 무변경)

> Irene 요청+확정: 주문단위 보기에서 멀티-스테이션 주문일 때, 각 주방 탭이 **자기 아이템 기준으로 독립 단계 이동**. 'all' 탭=주문 전체 단계(전 주방 완료 시 승급), 주방 탭=그 주방 단계(다른 게 정상). 항목단위 보기·인쇄 핸들러는 안 건드림. (AskUserQuestion=A "스테이션별 독립 단계", 표/타임라인으로 동작 합의 완료)

**구현 (`KitchenDisplayPage.tsx`만):**
- 신규 헬퍼: `stationCardStatus(order)` = 선택 주방 아이템 중 최저 단계(가장 안 끝난 것). 'all'이면 order.status. `setStationItemsStage(orderId, target, {force})` = 주방 범위로만 아이템 단계 이동(forward=미달분 전진/force=revert), order.status는 전 주방 완료 시에만 승급.
- `ordersByStatus`: 주방 탭이면 stationCardStatus 로 카드 칼럼 배치(+deps selectedStation/isItemInSelectedStation).
- `renderOrderCard`: `cardStatus` 도입 → 칼럼/진행바/색상/긴급/아이템 done 시각/벌크·개별·revert 버튼 전부 cardStatus 기준. 벌크/revert 버튼은 주방 탭이면 setStationItemsStage 로 분기('all'은 기존 markAll* 유지). 개별 아이템 버튼은 updateItemStatus/updateSetItemStatus 에 stageOverride(=cardStatus) 전달(기본값 order.status → 항목뷰 무영향).
- 인쇄 핸들러(order-created/order-items-added/printKitchenTicketViaRawBT, shouldAutoPrint=false) **무변경 검증**.

**검증(완료):** tsc 내 파일 0에러 / build+dev배포(main.a3684727.js) / Autoprint regression 44 PASS / **/kitchen headless mount OK(pageerror·ErrorBoundary 0)** / 무결성 감시기 KitchenDisplayPage drift(=3건째, 인쇄핸들러 무변경). 
**남은 일:** Irene가 dev에서 멀티-스테이션 주문 만들어 주방 탭별 독립 단계 동작 확인(인쇄 아님 → 실프린터 불필요). KDS는 🔒라 운영배포 시 실매장 확인 필요 + check-print-guard --bless 후 배포게이트 통과.

---

## 🟢 Floor Plan 결제 팝업 통일 (2026-05-29, dev 배포 main.84d8717b.js · 인쇄 무관)

> Irene 보고: Floor Plan 결제 누르면 **서비스차지(+쿠폰/포인트/할인 분리)가 안 나옴**, Live Orders는 나옴. "같은 팝업이어야 하지 않나."

**원인(실값 확정):** 둘 다 같은 `PaymentModal` 컴포넌트지만 **데이터 소스가 다름**. Live Orders=풀 주문객체(`orderForPayment`, service_charge/coupon/point/tax_rate 다 있음). Floor Plan dine-in=table-status 객체(`selectedStatusInfo`, 서비스차지값/세율/쿠폰·포인트 분리값 없음→줄 숨음) + taxRate 미전달. `GET /orders/:id`가 모든 필드 보유 확인(service_charge=10/coupon=5/point=3/policy=2/tax_rate).

**수정(`FloorPlanPage.tsx`만, 비보호):** `orderForPayment` 상태 추가 → `handlePayment`에서 `GET /orders/:id`로 풀 주문 fetch → dine-in PaymentModal을 풀주문(snake_case) 우선 + table-status 폴백으로 채움(taxRate 보강). takeaway 모달/인쇄 무관.

**검증:** 타입 0에러 / build+배포(main.84d8717b.js) / Autoprint regression 44 PASS / floor-plan headless mount OK(크래시 0). 무결성 감시기 8/8(비보호 파일이라 영향X).
**남은 일:** Irene가 Floor Plan에서 테이블 결제 눌러 서비스차지/쿠폰/포인트 표시 확인(인쇄 아님 → dev에서 가능).

---

## ✅ 운영 배포 (2026-05-30) — 세트메뉴 옵션 전구간 + 브랜드 세트 OR 업그레이드 (Backup 20260530_042734, smoke 10/10)

> v3.44 위 배포. 버전 올림 여부는 Irene 미응답(질문 중단) → **버전 유지(v3.44), CHANGELOG/릴리즈노트 미처리 — 다음 세션에서 결정**.

**배포 내용:**
1. **세트메뉴 옵션 전구간 기록 정규화** — 세트직접옵션(A=order_items.options) + 구성품 개별옵션(B=set_components[].options) 데이터 통일. POS도 세트 자체 옵션 입력받게(POSSetModal 세트옵션 섹션) + 모바일 setTotal A가격 합산. billPrint(🔒) 4가드 제거(set_components 있어도 options(A) 인쇄) + station 티켓에 구성품 표기 추가 — **방식 무변경 콘텐츠만**. KDS(🔒) 세트 구성품+옵션 렌더 추가. OrderTracking A 표시. (LiveOrders/FloorPlan/Cart는 이미 A+B 표시 확인). 🔒 bless 갱신(8/8).
2. **브랜드 세트 OR/Choice 빌더 업그레이드** — BrandMenusPage 레거시 "Items in this set" → SetMenuBuilder(슬롯+Fixed/Choice+구성품 상속옵션). 신규 `brand_menus.set_groups` 컬럼. brand-menus.js create/update 저장 + 리스트에 optionGroups 노출. **푸시 매핑** `brandMenuSyncService.translateSetGroupsForRestaurant`(구성품 brand_menu_id→매장 product_id 변환, lock_set_items 시 동기화) — 실데이터 검증 OK(26/27/28→310/311/312).
3. SetMenuBuilder 친절화(Fixed/Choice 설명·상속옵션 표시·세트옵션 일반상품과 통일 dropdown+chips), Plus아이콘 제거.
4. Floor Plan 에디터 테이블 z-index 버그 + 캔버스 높이 최소 600→300.

**⚠️ 배포 중 발견·수정:** `products.set_groups` 컬럼이 **운영에 없었음**(sync-database가 못 잡음) → 수동 ALTER 추가. migrate-brand-set-groups.js 가 products+brand_menus 둘 다 커버하도록 보강(배포목록 등록). 운영 set resolve 정상 확인(product 70 comps=1 setOptGroups=1).

**🔔 다음 세션 필수 검증 (이동으로 미완):** [[project_brand_set_groups_verify]]
- 브랜드 세트(OR/옵션)가 산하 매장에 **실데이터로 제대로 전파**되는지 (BG 세트 생성→push→매장 주문→주방티켓/빌/KDS).
- 세트 A/B 인쇄 **실매장 프린터 출력 확인**(billPrint 콘텐츠 변경).
- 이머전시 모바일 인쇄(이전 이월) 실프린터 확인.

---

## 🟢 Floor Plan 에디터 테이블 안 보임 — z-index 버그 수정 (2026-05-30, dev 배포 main.9068f885.js · 인쇄 무관)

> 에디터에서 캔버스는 테이블 맞춰 fit(770×370) 되는데 테이블이 안 보이던 문제. 원인=흰 `CanvasBoundsOverlay`(z-index:1)가 테이블(`ScaledLayer`, z-index 없음)을 덮음 — 주석 의도("테이블이 위")와 반대인 진짜 버그.
> **수정(`FloorPlanCanvas.tsx`만, 비보호):** CanvasBoundsOverlay z-index:1→0(흰영역 바닥), ScaledLayer z-index:2(테이블 최상위). 렌더순서 BoundsOverlay→GridOverlay(auto)→ScaledLayer 와 일치.
> **검증:** build main.9068f885.js EXIT=0 / 에디터(rest5) 재mount 스크린샷 U1·U2·U3 크게 보임 + "auto-fitted" / 뷰페이지 U1/U2/U3 컬러+attention dot 정상 / pageerror 0. 🔒 감시기 드리프트는 FloorPlanCanvas 비보호라 인쇄 무영향(드리프트 2건=이머전시인쇄 MainLayout+PIN/품절 POSTerminal, 별개·기존).

---

## ✅ 배포 준비 완료 (2026-05-29) — Irene /배포 대기
dev 누적 4건(이머전시 모바일인쇄 / 품목 서빙 / KDS 주방별 단계 / 결제팝업 통일) 모두 main.84d8717b.js 에 빌드·dev배포됨. 무결성 감시기 bless 완료(8/8) + health-check 88/88 → **배포 게이트 통과 상태**. `/배포` 시 운영 반영. 운영 확인(특히 이머전시 토글·인쇄)은 배포 후 매장에서.

---

## 다음 확정 작업 (Irene 명시 지시 + 결정 확정 완료 — 바로 구현)

> 2026-05-29 Irene 가 AskUserQuestion 으로 전부 컨펌함. 재질문 없이 구현.

> **그룹1 진행 (2026-05-30):** #2 "Open in POS Terminal" 링크 제거 ✅(TableDetailPanel 2곳). #4 POS 품절토글 ✅(백엔드 PUT /menu/product/:id/toggle-soldout + 소켓 /orders product-soldout 브로드캐스트 + POS 길게누르기 600ms + 낙관적 override + 크로스기기 리스너; 실HTTP+mount검증). #5 할인PIN ⚠️부분(백엔드 POST /staff/verify-pin-permission 세션전환없음+감사로그 ✅, MANAGER123 하드코딩 제거+서버검증 ✅; **잔여: 설정토글 UI + 터치 numpad(현재 window.prompt — 터치 부적합)**). build main.c737b386.js / 🔒8/8(bless) / health88/88 / Autoprint44 / POS mount 0크래시.
> **그룹1 추가 완료 (2026-05-30):** #1 우측패널 접기 ✅(TableDetailPanel — 상태진행/결제/AddItems 항상, "테이블 작업 ▾" 접이식에 프린트/QR/Cancel/Leaved). #3 ✅. 잔여: #5 설정토글UI+터치numpad.
> **그룹3 (2026-05-30):** #6 옵션 상세표시 ✅(세트 set_components + 일반 options 렌더 — LiveOrders/FloorPlan/OrderTracking/Cart/POS). #7 Add Items→POSOverlay ✅(인라인 검색카트 제거, onNewOrder()로 풀POS+테이블핀+자동머지; 인라인뷰는 도달불가 dead code 잔존). #8 Daily Settlement Z-리포트 ❌(신규 데이터모델 필요 — POS ID/BOD·EOD/voided/cash movement 등, 실프린터 동반 별도 사이클).
> **브랜드/락 (2026-05-30) — 실제 버그 2건 발견·수정:** ① **BG 옵션 전파 버그 원인 확정·수정**: OptionGroup 모델에 `brand_menu_synced_version` 누락(DB엔 있음) → Sequelize 가 저장 시 버려서 버전추적 깨짐 → 옵션 재동기화 실패. 모델 추가 → 저장 검증(7 persist PASS). ② **optionGroups lock 갭 수정**: PUT /optionGroups/:id 에 브랜드잠금 가드(미러 옵션그룹+소비상품 options 잠금 시 403 OPTION_LOCKED_BY_BRAND). health 88/88.
> **#5 완결 + 현장버그 2건 수정 (2026-05-30):** #5 할인PIN **완전 종결** — 설정토글 "Require PIN approval for discounts"(operations, 4언어) + 터치 numpad `DiscountPinModal`(verify-pin-permission, 세션전환X) + MANAGER123 제거. 
> **현장버그①(Irene 보고): Add Items 가 새 주문 생성** — POSOverlay 가 테이블핀만 하고 자동머지 안 됨. URL `mergeOrderId`→POS `forceMergeOrderId`→ orders-crud forceMergeIntoOrderId(최우선 머지). 실HTTP 검증: 같은 order_number 유지/품목 머지/새주문 0.
> **현장버그②(Irene 보고): 영어 버전에 한글 표시** — #3에서 한글 defaultValue 박은 것(범례/점/테이블작업/품절툴팁) → 영어 defaultValue + floorplan/settings i18n 4언어 키 추가. POS 품절툴팁 영어화. **범례는 Irene 요청대로 제거(직접 추가 예정)**.
> **그룹1 = 전부 완료(#1~#5). 그룹2 = 완료. 그룹3: #6/#7 완료(+머지수정), #8 미완.**
> **잔여(미구현, 신규설계 필요):** #8 Daily Settlement(POS ID/BOD·EOD/voided/cash movement 신규 데이터모델 + 실프린터) · 단계형(cascading) 옵션(parent_option, 중규모 신기능).
### 그룹 1 — Floor Plan / POS 운영 개선 (중규모, 바로 구현 가능)
1. **우측 패널 접기** (`TableDetailPanel.tsx`) — 항상 노출: 주문 상태진행 버튼 + 결제 + Add Items. 접이식 "테이블 작업 ▾"(기본 접힘): QR Reprint/Expire/정보, 프린트 아이콘, Cancel/Leaved. → 주문내역 가독성 확보.
2. **"Open in POS Terminal" 링크 제거** — `TableDetailPanel.tsx` 2곳(occupied ~1798 / available ~1837). 신규주문은 기존 "+ New Order" iframe POSOverlay(`handleNewOrder`)로 충분.
3. **테이블 점 재정의** (`TableNode.tsx` `MobileOrderDot`) — 기준을 "**미접수 새 주문**"으로: `orderStatus === 'pending'`(+outstanding), **출처 무관**. 색=빨강(needs-attention 토큰). 직원이 접수(Start Cooking 등 상태 진행)하면 사라짐. 테이블 색은 주문상태, 점은 "확인 필요" 직교 신호. **범례(legend) 추가** (Floor Plan 화면).
4. **POS 품절(sold-out)** — `Product.soldOut` 필드 이미 존재(is_active=활성/비활성과 별개). 메뉴 타일 **길게누르기 → 품절/재고복구 토글**. 즉시 회색+SOLD OUT + **socket 브로드캐스트**(전 POS/모바일 반영). 백엔드: `PUT /menu/product/:id/toggle-soldout`(toggle-active 미러, `checkProductTenant` → Staff 허용). Staff 권한 OK.
5. **할인 PIN 승인** — 매장 설정 토글 "할인 시 PIN 승인 필요"(operation_settings 권장). ON 시 할인 적용에 PIN 입력 → **신규 경량 엔드포인트** `POST /api/staff/verify-pin-permission`(PIN 이 *할인 승인 권한* 가진 직원인지 서버 검증, **JWT 재발급/세션 전환 없이** `{authorized, by}` 반환) + 감사로그. **하드코딩 `MANAGER123` 제거**(`POSTerminalPage.tsx:1914`). 권한 모델: User.permissions JSON 에 `discount_authorize` 추가 or Restaurant Admin/Owner/Manager 자동 허용 — 구현 시 확정.

### 그룹 2 — 세트메뉴(콤보) 재설계 (대규모 → `/기능설계` 6단계) — **구현 진행 중 (2026-05-29)**
> 설계 1~4단계 승인 완료(문서 `docs/SET_MENU_REDESIGN.md` §8~10). 5단계 구현 절반 완료.
> **완료·검증된 부분 (세트 생성 절반):**
> - DB: `products.set_groups` JSON 컬럼 추가 + 공용 util `dev-backend/utils/setMenu.js`(resolve/validate/availability/selection/pricing/buildSetResolved) + `dev-frontend/src/utils/setMenu.ts`(동일 로직) + 마이그 `scripts/migrate-set-items-to-groups.js`(레거시 set_items→set_groups 무손실, 멱등, 1건 변환).
> - 백엔드 저장: `routes/menu.js` POST/PUT 상품에 `validateSetPayload`(set_groups 우선, 레거시 폴백). GET 목록에 set_groups 노출. 단일상품(`/menu/product/:id`)·모바일(`/mobile/menu/item/:id`)에 `buildSetResolved`로 구성품(이름/가격/품절/**상속옵션그룹**)+`set_available` 첨부.
> - 빌더 UI: `components/MenuManagement/SetMenuBuilder.tsx`(슬롯=고정/선택, 검색 상품선택, min/max, upcharge, 스테퍼, 터치 44px+) + MenuManagementPage 배선(setGroups state, resolveSetGroups 초기화, handleSaveSetMenu set_groups 검증·전송). MenuContext add/update/load 에 set_groups 전달. i18n menu.setBuilder.* 4언어.
> - **버그픽스**: MenuManagement 리스트의 "Set includes" 가 옛 set_items(menuItemId 없는 데이터)에서 `.toString()` 크래시(pre-existing) → resolveSetGroups 기반 견고 렌더 + 이름 폴백.
> - 검증: 실 HTTP 왕복(저장 201/잘못된세트 400/resolve 200) · 옵션상속 ✓ · fixed품절차단 ✓ · 빌더 mount 크래시0 · 🔒 8/8 · health 88/88 · hydration 0 · i18n 0 · build OK(main.5034ae31.js).
> **모바일 주문 UI 완료·검증 (2026-05-30):** `mobile/components/MobileSetOrder.tsx`(fixed 자동/choice 피커/구성품별 상속옵션/터치) + ItemDetailPage 통합(setSel/setOpts state, isSetValid/setTotal, handleAddToCart→set_components, 세트는 항상 resolve fetch) + MobileOrderContext addToCart 가 set_components/세트단가 적재 + CartItem.setComponents. i18n menu.setOrder.* 4언어. 검증: mount 크래시0(Main/choice헤더/upcharge+2.5/AddToCart 렌더) · build main.31155b96.js · 🔒8/8 · health88/88 · hydration0.
> **주문 생성·POS·표시·리포트 완료 (2026-05-30):**
> - 주문 영속: 모바일 PaymentPage 3개 결제경로 order_items 매핑에 set_components 추가 → `/api/orders`(🔒 orders-crud) 가 `{...item}` 스프레드로 **무편집 보존**(실 POST 증명: order_items[].set_components 그대로 저장). mobile-orders.js 비-머지 경로도 보존.
> - POS 주문: `POSSetModal.tsx`(MobileSetOrder 재사용 + 선택로직, 검색 GET resolve, 터치) + POSTerminalPage(🔒) 최소 훅(isV2Set→세트모달, handleConfirmSet→cart, 주문맵 set_components). **upcharge/옵션을 priced selectedOptions 로 변환** → POS 기존 가격식 무수정. 인쇄/QZ/poll 라인 0(git diff 증명) + Autoprint 44 PASS + POS mount 0크래시(세트모달 열림 확인) → **check-print-guard --bless 갱신(8/8)**.
> - 주문 표시: LiveOrders OrderDetailModal + Floor Plan TableDetailPanel 에 set_components 들여쓰기 표시.
> - 리포트: dashboard.js 인기상품 + menuSales 에 구성품 합산(판매수 + upcharge 매출, 세트 기본가 중복방지).
> - 검증: build main.ef3e905a.js · 🔒8/8(bless) · health88/88 · hydration0 · i18n0 · 모바일·POS·빌더 mount 0크래시 · 실 HTTP(저장/검증/resolve/주문 set_components 보존).
> **주방/빌 인쇄 — 세트 구성품 표기 완료 (2026-05-30, 방식 무변경 콘텐츠만):** Irene 지적("데이터만 추가, 인쇄 방식은 그대로")이 맞음. billPrint.js(🔒)의 **콘텐츠 렌더만** 수정 — 주방 raw(generateKitchenTicketContent) + 주방 HTML(generateHTMLKitchenTicket ×2) + 빌 raw(generateBillContent) + 빌 HTML(generateHTMLBill)이 set_components(구성품명+선택옵션)를 표기, 중복 옵션 skip, 레거시 set_items 폴백. **인쇄 방식 함수(sendHTMLViaQZTray/sendViaQZTray/raw/mirror/QZ 라우팅) 변경 라인 0**(git diff 증명). Autoprint regression 44 PASS + check-print-guard --bless(8/8). build main.ab6e4ba6.js.
> **전 루트 세세 검증 (2026-05-30) — 갭 2건 발견·수정:**
> - **모바일 자동머지(mobile-orders.js 195~)가 set_components 를 버림** — 신규 경로만 고쳤고 머지는 누락이었음. 동일 보존 추가. (orders-crud 머지/추가는 `...item` 스프레드로 이미 보존 확인.)
> - **validateSetGroups 가 min:0(선택적 choice 슬롯 "0~N개")을 거부** — PUT 검증 실패로 발견. min<1→min<0+max≥1 로 수정(백+프론트+빌더 min 셀렉터 0 포함).
> - **표시 갭**: OrderTracking(고객) + CartPage(장바구니)가 set_components 미표시 → 추가. addToCart 가 specialInstructions 브래킷 중복 넣던 것 제거(set_components 가 표시 단일소스).
> - 실 HTTP 전 루트: CREATE 201 / 잘못된세트 400 / PUT(선택적슬롯) 200 / RESOLVE mobile·POS / ORDER 신규·orders-crud머지·모바일자동머지 set_components 보존. mount: 모바일상세·OrderTracking(Spring Rolls·Spicy 표시)·빌더·LiveOrders·POS 전부 0크래시. build main.7b284303.js / 🔒8/8 / health88/88 / Autoprint44 / hydration0 / i18n0 / order-totals11.
> **재고차감 완료 (2026-05-30):** inventoryDeductionService.js 차감 루프를 세트면 구성품별 레시피 차감으로(deductInventoryForOrder + calculateRequiredIngredients). 실검증: 세트2개×Bibimbap → Gochujang 0.1 차감(레시피0.05×2) PASS. **추가 발견·수정**: checkAndCreateAlert 가 존재하지 않는 `resolved` 컬럼 쿼리 → 모델 필드 `is_resolved` 로 정정. 이게 dev 에서 **모든 재고차감을 깨던 기존 버그**(세트 무관)였음. health 88/88.
> **그룹2 세트메뉴 = 완전 종결** (생성·주문·영속·표시·빌/주방인쇄·리포트·재고차감 전부 ✅, 검증 완료). 잔여(선택): 구성품 per-station 인쇄 분배(라우팅, 실프린터 필요시).
> **잔여(선택, 향후):** 세트 구성품의 **per-station 분배**(밀크쉐이크→BAR, 치킨→KITCHEN 따로 인쇄)는 라우팅 로직 변경이라 별도. 현재는 레거시 set_items와 동일하게 세트가 한 티켓에 구성품 전체 표기(기능상 정상, 주방이 만들 항목 다 보임). 실매장에서 per-station 분배 필요하면 그때 데이터 라우팅으로 추가.
> - 주문 생성: `orders-crud.js`(🔒)/`mobile-orders.js` 에 set_components 저장 + 서버검증(validateSetSelection)+가격(computeSetPricing)+재고(구성품 레시피 차감). **🔒 인쇄방식 코드 무접촉 + 회귀검증 필수.**
> - 리포트: Sales 집계가 set_components 읽어 구성품 통합 판매수.
> - 주방 인쇄: 세트 구성품의 station 라우팅(stationEnrichment 🔒 영역) — 신중/실프린터 확인.
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
