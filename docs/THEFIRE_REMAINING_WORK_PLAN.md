# The Fire(thefire01) 잔여 작업 기획서 — 그대로 실행 가능하게 박제

> 2026-06-25 작성. 오늘 thefire 종일 대응 중 "나중에 제대로 할 것"을 빠짐없이 남김.
> 원칙: **연결 안정(매장) → 견고화 → 기능**. 각 항목 = 설계→dev→데모 회귀→운영배포→**실프린터 1회**.
> 인쇄 보호규칙: CLAUDE.md 🔒 + [[feedback_professional_disciplined_no_arbitrary_change]] (증상마다 막 바꾸지 말 것, 증거확정 후).

---

## 0. 매장 측 (코드 아님 — 오늘 간헐오류의 뿌리)
- **POS1·POS2 인터넷을 유선 이더넷으로**(프린터는 이미 유선 LAN ✓). POS↔서버가 와이파이라 끊김 → 자동인쇄 지연·Serve 되돌림·설정로드 실패·429 다 여기서 옴.
- POS2(Win7) QZ 안정화([[reference_multipos_print_qz_win7]]).

---

## 1. 하이브리드 인쇄
**목표:** POS가 한 동작(신규주문·이동·취소·void)을 **그 POS가 로컬에서 즉시 인쇄**. 서버경유(폴러)는 **모바일 주문용 + fallback**으로 유지(둘 다 살림 — CLAUDE.md 결정 "하이브리드=선택").

### 1-A. 신규주문 하이브리드 — ✅ 구현·출시 (2026-06-25, v4.16, 검증완료)
- **신규파일 `src/utils/hybridKitchenPrint.ts`** = `printOrderKitchenNow(ord, getStoreInfo)`. billPrint(인쇄 방식/라우팅) **무변경** — "언제/누가 찍나"만 즉시로.
- **연결 위치:** `POSTerminalPage.tsx` 두 생성경로(결제없이 2374 / 결제포함 2674). `savedOrder`(=OrderContext.addOrder 가 반환하는 백엔드 enrich 응답, **snake_case**)를 util 에 전달.
- **검증(30년차 수준, 왜 안전한가):** 생성 시 stationEnrichment 가 이미 돌아 `kitchen_station_id`/`set_components` 박힘 + `needs_print=true` + 전 품목 `printed_at=null` → util 의 `items.filter(!printed_at)`가 **폴러가 `GET /pending-print`로 가져갈 것과 동일 집합**. 옛 "cart 직접인쇄" divergence(useAutoPrintPoller:262-268) 회피. 동일 atomic `print-claim` → POS1 자기주문도 폴러와 한쪽만 승리 = **중복 0**. 실패 시 `print-rearm` → 폴러 fallback.
- **게이트:** 자동인쇄 마스터 OFF / 다중POS 미선택·autoPrint=false 단말 / KDS 화면 → return false(폴러 위임). POS1(autoPrint=true)만 즉시. POS2가 받은 주문은 false → poke → POS1 폴러가 인쇄(서버경유 그대로).
- **수동인쇄(POS2 등):** 기존 수동 버튼(Print Full Order/재발행)은 원래부터 그 기기 billPrint 직접호출 = 이미 로컬 즉시. 무변경.

### 1-B. 이동·취소·void 하이브리드 — ✅ 구현·출시 (2026-06-25, v4.17, 데이터흐름 검증)
- **연결 위치:** `FloorPlanPage.tsx` 이동 핸들러(평범한 이동, merge 제외) / `LiveOrders/LiveOrdersPage.tsx` confirmCancelOrder / `FloorPlan/TableDetailPanel.tsx` performCancelOrder(취소)+performDeleteItem(아이템 void). 각 핸들러의 **자동모드(`_autoOn`) 분기**에서 action 응답 `result.data`(또는 `cancelJson.data`)를 `printOrderKitchenNow` 에 전달.
- **안전가드:** action 경로는 **`result.data.pending_reprint` 가 있을 때만** 호출(=진짜 재발행, 표준 notice 있음). 없으면 호출 안 함 → "주방에 안 나간 주문" 취소 시 plain 티켓 찍히는 "신규주문처럼" 버그 방지.
- **표준 디자인 재사용(Irene 핵심 요구):** util 은 backend 가 set 한 `pending_reprint.notice`(** TABLE CHANGED **+fromTable/toTable / ** ORDER CANCELLED ** / ** ITEM VOIDED **)를 그대로 `noticeHeader` 로 전달 → **폴러가 찍던 것과 동일한 billPrint 표준 티켓**. 새 디자인 0. void 는 `pending_reprint.data.items`(뺀 품목만) 사용.
- **데이터흐름 실증(API):** move→`{type:move,fromTable,toTable,notice}`+printed_at 비움 / cancel→`{type:cancel,notice}` / void→`{type:void,notice,data.items=[뺀 품목]}` 전부 응답에 존재 확인.
- **게이트(Irene 확정 모델):** 자동인쇄=**POS1만**(util master gate). POS2(autoPrint=false)는 게이트로 false → poke → **POS1 폴러가 인쇄(크로스기기 서버경유)**. POS2 는 수동인쇄만 즉시(기존 수동버튼=이미 로컬). merge 이동은 기존 직접 doReissue 유지(backend 미처리).
- **남은 한계:** POS2 가 한 동작의 자동인쇄는 여전히 POS1 폴러(서버경유) 의존 → 매장 연결 불안정하면 지연/누락 가능. 근본해결 = 매장 측 POS↔서버 유선 이더넷(§0).

### 1-C. BAR 스테이션 미인쇄 — ⬜ 인계(물리 도달 확인 필요, 2026-06-25 진단)
**증상:** #260625-055(T-5, 바나나밀크쉐이크·키위주스·소고기김밥) POS1 주문 시 **BAR(station 14) 음료가 BAR 프린터로 안 나옴**(KQ는 나옴).
**실측(운영 raw DB id 16):**
- station 12=`address:"KITCHEN"` / 13=`address:"KITCHEN 2"` / 14=`address:"BAR"` — **설정 살아있음**(프린터 지정은 `name` 아니라 **`address` 필드**에 저장. `name`은 전부 "" — 혼동 주의, 기능 무관).
- 코드도 QZ는 `address`로 지정(`sendToRawBTPrinter` billPrint.js:3382 `const address = printerAddress || ...`). 빌이 `POS-80C`로 잘 나오는 것과 동일. **즉 코드·설정 정상.**
- #055 3품목 다 `printed_at` 찍힘(시스템은 인쇄 성공으로 봄) — 이유: `mirrorToBillPrinter=true`라 전체가 POS-80C 미러로 나가 partial-success가 true 반환.
**결론:** 코드/하이브리드 문제 아님. **POS1의 QZ Tray가 "BAR" 프린터에 미도달**(KITCHEN/KITCHEN 2는 도달). QZ는 이름 못 찾으면 기본프린터 폴백 → BAR 전용 프린터엔 0장.
**인계 결정(Irene 확답 후 착수):**
- (A) BAR가 POS1 네트워크 공유 → **윈도우 프린터 이름이 정확히 "BAR"인지 확인, 안 맞으면 address만 그 이름으로** → 끝.
- (B) BAR가 POS2/바 자리에만 물림 → POS1이 못 쏨 → **POS2가 BAR 스테이션만 자동인쇄**하도록 구조(하이브리드/게이트 조정). [[reference_multipos_print_qz_win7]] 다중POS 모델 참고.

### 1-D. +Round 추가주문 "1 바로 + 1 나중" 2장 — ⬜ 관찰(BAR 해결 후 재확인)
**증상:** POS1에서 기존주문에 품목 추가 시 1장 즉시 + 1장 나중에(2장).
**실측:** 백엔드 claim 중복0 **재현으로 정상 입증**(merge 후 kitchen_items=새 품목만, claim 1st=true/2nd=false, 인쇄 후 pending-print 사라짐). KDS는 order-created/items-added 둘 다 `shouldAutoPrint=false`(표시전용) — **인쇄 안 함**. +Round은 신규주문과 같은 핸들러(addOrder forceMerge) 통과 → 하이브리드 걸림. **코드 누락 아님.**
**의심:** `mirrorToBillPrinter=true`(미러=카운터 사본 1장 + 스테이션 1장 = 정상 2장) 또는 BAR 미도달의 기본프린터 폴백. **진단법:** "2장이 각각 어느 프린터에서 나왔나"로 미러(카운터+주방=정상) vs 진짜중복(같은 프린터 2장) 즉시 판별. **1-C(BAR 도달) 해결 후 재관찰 권장.**

---

## 2. 수량 빼는 취소 (부분수량 void)
**목표:** "3개 중 1개만 취소". 지금은 줄 통째 삭제만 됨.
**설계:** 삭제/void 흐름(PIN·void로그 재사용)에 **수량 스텝퍼 UI**. 백엔드 `DELETE /items/:idx`를 qty 차감 지원으로(또는 PATCH). 차감 후 `computeOrderTotals` 재계산.
- **취소빌**: "ITEM CANCELLED — 계란찜 x1" (남은 수량 명시).
- **주방 팝업/티켓**: "1개 취소 — 나머지 N개는 계속 만드세요" 명확. (KDS order-items 갱신 + 취소 안내)
**파일:** `LiveOrders`/`FloorPlan` 삭제 핸들러+모달, `routes/orders-crud.js`(부분 차감), `billPrint`(취소빌 문구 — 보호, 실프린터 필수).
**수용기준:** qty 2→1 시 빌·주방 모두 "1 취소, 1 잔존" 명확. 금액 정확.

---

## 3. 테이크웨이+테이블 합본 빌 (혼합 차지)
**목표:** 테이블번호 있는 테이크웨이 = **기존 주문에 머지**(별도/덮어쓰기 금지). 플로어플랜 합본 표시(이전 dine-in 안 가려짐).
**설계:**
- **품목별 order_type 태그** 보존. 합본 주문 안에서 테이크웨이 품목 줄에만 "TAKEAWAY" 표시(혼란 0 — Irene 확인).
- **서비스차지 = dine-in 품목 합계만**, **테이크웨이 surcharge = 테이크웨이 품목만**, **세금 = 전체**. → `computeOrderTotals` 혼합차지 확장.
- 머지: `findMergeableOrder`(mobile+POS)가 테이크웨이+테이블도 같은 테이블 open 주문에 합치게.
- 플로어플랜: 테이크웨이가 테이블 점유해 이전 주문 가리던 표시버그 수정(둘 다 한 테이블 카드/합본).
**파일:** `routes/mobile-orders.js`·`orders-crud.js`(머지+혼합차지), `utils/orderTotals.js`, `FloorPlan`(표시), `billPrint`(혼합차지 빌 — 보호).
**수용기준:** 테이블에서 테이크웨이 추가 → 한 빌, 테이크웨이 품목 구분표시, 서비스차지 dine-in만, 세금 전체.

---

## 4. 머지 수정 (served·미결제 분리 버그)
**증거:** `findMergeableOrderMobile`(mobile-orders.js)·orders-crud 가 후보에서 `status NOT IN ('served',...)`로 **served 제외** → 손님이 다 먹고(served) 미결제 상태에서 추가주문하면 **새 주문으로 갈라짐**(B-5 #026/#030 사례). 주석은 "같은테이블+결제대기=같은빌"인데 쿼리가 모순.
**설계:** 제외에서 **'served' 빼고**(=`NOT IN ('completed','cancelled')`), **`table_cleared != true`** 가드 추가(비운 테이블엔 머지 금지). mobile+POS 양쪽 일관. **인쇄 무관.**
**수용기준:** served·미결제 테이블에 재주문 → 같은 빌 머지. 결제완료/비운 테이블 → 새 주문.

---

## 5. stale-write 방지 (주문수정 덮어쓰기)
**증거:** T-3 계란찜 1로 줄였는데, 그 직후 다른 기기가 'served' 처리하며 **캐시된 옛 order_items(계란찜2)로 통째 덮어씀**(total만 새값). 여러 기기가 옛 데이터로 서로 덮어씀 = 오늘 연결 불안정의 또다른 얼굴.
**설계:** 주문 쓰기(`PATCH /items`, status 등)에 **버전가드(updatedAt/version)** 또는 **필드머지**(order_items 통째 교체 금지). 충돌 시 재조회·머지. (서버측 chokepoint.)
**파일:** `orders-crud.js` 주문 쓰기 경로. **인쇄 무관.**
**수용기준:** 동시 편집 시 옛 데이터가 새 데이터를 안 덮음.

---

## 6. 주방 스테이션 매수(2~3장)
**목표:** 빌의 copiesAfterPayment처럼 **스테이션별 인쇄 매수** 설정(원하면 2~3장).
**설계:** `kitchenStationPrinters[id].copies`(기본1) 추가(settingsGuard 화이트리스트). `printKitchenTicketsByStation` 각 스테이션 send를 copies회 루프. 설정 UI에 스테이션별 매수 입력.
**파일:** `SettingsPage`(UI), `billPrint`(루프 — 보호), `settingsGuard`. **실프린터 필수.**

---

## 7. 설정화면 로드-resilience ("프린터 사라짐" 방지)
**증거:** 연결 깜빡여 설정 로드 실패 시 화면이 "프린터 없음"처럼 그림(DB는 멀쩡). wipe자물쇠가 저장은 막아 데이터는 안전했음.
**설계:** 로드 실패 시 **"못 불러왔습니다 — 연결 확인 후 재시도"** 명확 표시 + 로드 전 빈값 렌더·편집·저장 차단. (설정화면 — 인쇄코드 아님.)
**파일:** `SettingsPage`(프린터 탭 로드 상태).

---

## 8. 결제후 빌 즉시화 (다른 기기 결제)
**증거:** 같은기기 결제는 빌 즉시(POSTerminal 직접인쇄). **결제기기≠프린터기기**(모바일/카운터)면 빌이 5초 폴링 대기(결제는 order-updated만 쏘는데 폴러가 그건 구독 안 함).
**설계:** 결제 완료 시 폴러를 즉시 트리거(전용 이벤트 또는 needs_bill 트리거). 인쇄 보호 — dev검증+실프린터.

---

## 9. 오프라인 주문 큐
**목표:** 끊긴 중 모바일/POS 주문이 분실 안 되게 큐잉 후 복구 시 전송. (예전부터 계획 — [[reference_prod_server_resource_constraint]])
**설계:** 클라 localStorage 큐 + 재연결 시 flush + 서버 멱등(중복생성 방지 키). 큰 작업, 별도 설계문서 권장.

---

## 10. FloorPlan UI (서빙/헤더)
- **서빙 역할 통계바 숨김:** `FloorPlanStatsBar`(FloorPlanPage:2313)를 `{canTakePayment && ...}`로 감싸 서빙(!canTakePayment)엔 미표시(2줄 차지 제거).
- **헤더 접기:** Header(FloorPlanPage:1734) 접기 토글 + localStorage 기억.

---

## 11. 기타 (저우선)
- **리마크 기능**: 모바일 품목별 메모는 있음. 추가 = POS 리마크(자동저장+빠른선택) + **온스크린 키보드**(POS 전 텍스트입력 재사용) + 모바일 주문메모 전 주문유형. (티켓 인쇄는 이미 됨 — billPrint가 notes/special_instructions 찍음.) 설계 결정 끝(2026-06-25 Irene): 자동저장+빠른선택 / 키보드 전체 재사용 / 모바일 주문메모 확대.
- **모바일 크로스셀**: `docs/MOBILE_ADDON_CROSS_SELL.md` 설계 완료, 미구현.
- **FloorPlan takeout 뷰 정돈**: items 뷰 기준 글자크기·반응형(스타일 변경 금지).

---

## 진행 규칙
1. **하나씩** 제대로. 인쇄는 dev→데모 회귀(autoprint·health print)→운영→**실프린터 1회**.
2. 연결 불안정 중엔 실프린터 검증 불가 → 그때 배포 보류.
3. 추측 변경 금지, 증거 확정 후([[feedback_investigate_dont_ask]]).
