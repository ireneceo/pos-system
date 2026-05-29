# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-29 (3회 운영 배포 완료)
**버전:** v3.43 (버전 미상승 — backstage/critical fix). 아래 전부 **운영 배포 완료**.
**작업 상태:** The Fire 자동인쇄 현장 테스트 진행 중. 다음 = Irene 현장 결과 보고 대기 → 어긋나면 즉시 수정.

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

9. **자동 주방인쇄 EXACTLY-ONCE (원자적 claim)** — 같은 주문에 POS 직접인쇄 + KDS 소켓 + poller(2곳) 가 조율 없이 각각 찍어 최대 3장. 신규 `PATCH /orders/:id/print-claim`(원자적 `needs_print true→false`, claimed 반환) + `/print-rearm`(실패 재시도) + `/bill-printed`(bill-only needs_bill clear). 모든 자동경로가 인쇄 전 claim → 이긴 1개만 인쇄, 나머지 skip. 실패 시 rearm. 수동 재인쇄(KDS printOrderTicket / OrderCompleteModal)는 claim 안 함(의도적). 검증: 3 동시 claim → 정확히 1 승리(초기+ +Round), +Round kitchen_items=새 품목만. **수정 파일**: backend orders-crud.js(claim/rearm/bill-printed/printed/pending-print), frontend useAutoPrintPoller.ts·MainLayout.tsx·KitchenDisplayPage.tsx(order-created+items-added)·POSTerminalPage.tsx(send-to-kitchen+payment).

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
