# Fable 게이트 판정 (2026-11-05) — 브랜드제너럴 «주문 준비 보드» 구현 완료 검증

> 설계: `.claude/fable-verdict-20261105-bg-order-kds.md` (권고 A · Irene «권고대로 진행해 줘»).
> 호출 조건: 공용 기준 ② 되돌리기 어려운 변경의 완료 검증(운영 DB 칸 추가 마이그 포함 배포 · check-sensitive-diff ③). 이 사안의 Fable 호출은 설계 1 + 게이트 1(이 문서)로 끝 — 아래 조건을 고친 뒤 결과 숫자는 **이 세션에 SendMessage** 로 주면 같은 게이트 안에서 마커를 찍는다(새 Fable 호출 아님).
> 운영 서버·운영 DB 접속 0. 코드 변경 0(읽기·실호출·스크립트 실행만).

---

## 판정: **PASS** (처음 조건부 → F1·F2 고침 확인 뒤 마커 찍음 — 아래 «실행 기록»)

설계 범위 밖 변경 0 · 가드 전부 통과 · 서버 계약 실호출 증명 · 배포 안전(마이그 멱등·레지스트리 deploy·ENUM 무변경·되돌리기 쉬움). 막는 것은 둘뿐이고 둘 다 화면 파일(순수 함수 1 · CSS 1)이다. 서버·마이그는 그대로 PASS.

### F1 (고침 필수) — `boardColumn.ts`: «일부 받음(partial_received)» 을 통째로 «끝» 에 넣으면 안 보낸 줄이 보드에서 사라진다
- 사실: 매장은 판매자가 보내기 전에도·일부만 보냈어도 받을 수 있다(`purchase-orders-workflow.js:1296` — 일부 받으면 `partial_received`). 판매자가 3줄 중 2줄만 보내고 매장이 그 2줄을 받으면 주문은 `partial_received` 인데 **3번째 줄은 아직 안 보낸 상태**다. 보내기 라우트는 이 상태를 허용한다(`NOT_SHIPPABLE` 에 없음 · 목록 표도 1508·1596줄에서 «보내기» 를 보여 준다).
- 지금 코드: `DONE` 집합에 `partial_received` → «끝» 칸 → «오늘» 만 보이고 단추 없음 → 내일부터 보드에서 사라진다. 보드의 존재 이유(«빠뜨리지 않는 화면»)와 어긋난다. 개발 DB 에 이 조합은 현재 0건이지만 흐름상 생긴다.
- 고칠 것(순수 함수 한 갈래):
  ```ts
  if (st === 'partial_received') {
    if (row.is_service_only) return 'done';
    const { unshipped, unprepared } = lineCounts(row);
    if (unshipped === 0) return 'done';          // 다 보냈고 매장이 받는 중 → 판매자 할 일 없음
    return unprepared > 0 ? 'preparing' : 'ready'; // 아직 보낼 줄이 남음 → 지금 규칙대로(보내기 창은 이 상태를 허용)
  }
  ```
  `DONE` 에서 `partial_received` 를 뺀다. `delivered`·`received`·`closed` 는 그대로 «끝»(`received` + 안 보낸 줄 = 공급업체 «보내기 없이 수령» 경로 8건 — 판매자 할 일 없음, 맞다).
- jest: 기존 «끝난 주문 → done» 사례에서 `partial_received` 를 빼고 ① `partial_received` + 안 보낸 줄 미준비 → `preparing` ② + 준비됨 → `ready` ③ + 전부 보냄 → `done` 세 줄 추가. (13 → 16건 예상)

### F2 (고침 필수) — `IncomingOrdersBoard.tsx` `Board`: 1280 폭에서 4번째 «보냄» 칸이 잘린다
- 사실: `repeat(4, minmax(260px, 1fr))` + 사이드바 열림 → 내용 폭 ≈1036px < 4×260+36=1076 → 4번째 칸이 오른쪽에서 잘리고 보드 안 가로 스크롤(`board-1280.png` 실측 · 팀원 보고와 같음). 창고 태블릿·노트북의 주 폭이다.
- 고칠 것: `grid-template-columns: repeat(4, minmax(220px, 1fr))`. 1280 에선 칸당 250px 로 4칸이 다 들어가고, 1024 가로 태블릿(사이드바 열림)에선 설계대로 보드 안 가로 스크롤, 900 이하는 지금처럼 세로 쌓임. 카드 내용(단추 2개 44px·품목 줄)은 220 에서도 접히지 않는다(390 폭 사진으로 확인됨).

### 고친 뒤 할 것 (순서 — 빌드 1회)
1. F1·F2 수정 → `npm test -- --watchAll=false src/pages/IncomingOrders/boardColumn.test.ts`(react-scripts 로 — `npx jest` 직접은 설정 없어 실패한다) 숫자.
2. `npm run build:dev` 1회 → `verify-all --full` 1회(sweep 캐시는 번들 지문이라 다시 11분 — 프론트 바뀌었으니 규칙대로 1회).
3. `clickflow-board.js` 다시(15/15) + 1280 사진에서 «보냄» 칸 오른쪽 테두리가 보이는지.
4. 이 세션에 SendMessage: jest N/N · verify-all N/N(✗ 는 releases 기록 1건만) · 클릭 15/15 · 1280 사진 경로. → 마커 `fable-gate.js pass`.

---

## 검증 내용 (4항 — 코드 리뷰만으로 PASS 아님)

### ① diff 범위 대조 — 설계 외 변경 0
- 패치(1311줄 · 16파일) = 작업트리(`git diff HEAD` + 새 파일 4개) **일치**(diff 빈 출력).
- 🔒 보호 파일 무접촉: `check-print-guard.js` **8/8 변경 없음**. `KitchenDisplayPage` import 0(보드는 원리만).
- 서버: `attachShipmentState` 에 `unprepared_count` 추가(unshipped 세는 자리 옆 · 레거시 전량출고 분기 같이 0) · `POST /:id/prepare`(라우터 가드 `authenticateToken`+`requireSellerRole` 아래 · PO 행 잠금 · `checkSellerOwnership` 404 · `NOT_PREPARABLE` 409 · 남의 줄 400 `BAD_ITEM` · 서비스 줄 조용히 뺌 · 보낸 줄 400 `ALREADY_SHIPPED_LINE`(레거시 헤더 출고 포함) · 재고·금액·tracking 무접촉 · 이력 안 남김 · `emitPoEvent`) · `/ship` 은 `shipped_at` 채우는 줄 바로 뒤에 `prepared_at IS NULL` 인 줄만 채움(10-09 가드·차감 분기 무접촉 — 실측). 설계 Ⅱ-2 그대로.
- 모델 칸 1 · 마이그 1(멱등 · 백필 없음) · 레지스트리 `deploy` · ENUM 무변경 · 새 표 0 · `TRADE_STRUCTURE.md` 무관.
- 화면: 새 파일 3(보드·칸 함수·jest) · View 는 보기 전환·보드 연결·`postSimpleAction` 만(표 인라인 호출 무접촉) · 4언어 `orders.board.*`(키 집합 동일) · 문서 2.
- 팀원이 «설계와 다르게 정한 것» 7건 판정:
  1. 상태별 따로 불러오기(진행 100 · 끝 30) — **수용**. 목록 API 상한이 100 이라 «전체 한 번» 으로는 잘린다; 주문량(매장당 주 1~2회)에 넉넉. 소켓 신호마다 7회 호출은 양이 작아 무해.
  2. 시간대 고정값 `Asia/Kuala_Lumpur` — **수용**(목록 화면과 같은 값 · Market=MY). 브라우저 시간은 안 씀(`calculatePeriodDateRange`·`getDateStringInTimezone`).
  3. `delivery_failed` 숨김 — **수용**(이 상태를 쓰는 코드 0 — routes/services grep). `partial_received` → done — **F1 로 고침**. 서비스만 주문이 confirmed 아니면 `shipped` — **수용**(완료 처리 뒤 received 로 가므로 실제로는 done).
  4. 보내기 창 재사용·기본값 그대로 — **수용**(«보낼 준비 끝» 은 정의상 안 보낸 줄 = 준비된 줄).
  5. «끝» 은 접힌 단추+목록 — **수용**(설계 «접힌 줄»).
  6. `postSimpleAction` 새로 — **수용**(표 호출 무접촉 · 같은 라우트).
  7. 확인용 데이터(데모 38 ← 브랜드 17 · «[확인용]») — **수용**(규칙대로).

### ② 가드 스크립트 (이 세션에서 직접 실행)
- `check-print-guard.js` 8/8 ✓ · `check-design-guard.js` 신규 0(합계 299 = baseline 295 + 이 묶음 전 변경분 — 이 묶음 신규 0) ✓ · `timezone-check.js` 신규 0 ✓ · `check-migration-registry.js` 미분류·유령·중복 0 ✓ · `npm run i18n:verify` Errors 0 ✓ · `check-sensitive-diff.js` → ③ 마이그 ·⚠ health-check.js(이 묶음) = 게이트 대상(맞음). server.js·verify-all.js·check-type-baseline.js 는 운영 스냅샷 대비 다른 커밋의 것.
- jest `boardColumn.test.ts` **13/13**(react-scripts).

### ③ 실호출 (개발서버 · 데모 브랜드 user 22 · 확인용 주문 62928)
- 토큰 없음 → **401** · 다른 역할(user 23) → **403**(판매자 역할 아님) · 상세 GET → `unshipped 2 · unprepared 1` · 줄 `[64294 prepared, 64295 null]` · prepare 64295 → **200** `unprepared_count 0` · 되돌리기 → **200** `unprepared_count 1`(원상복구) · 목록 GET `status=confirmed&limit=100` 행에 `is_service_only·unshipped_count·unprepared_count·received_at·updated_at·ordered_at` 전부 있음(보드가 읽는 칸).
- 개발 DB: `purchase_order_items.prepared_at datetime NULL` 존재(마이그 적용됨).
- health-check `--category=inventory`: 이 세션에서 다시 실행 → **106/106**(P1·P2 포함 · exit 0 · 실패 0).
- 팀원 숫자(사실 그대로): inventory 106/106 · 고장주입 ship 의 prepared 채움 제거 → P2 ✗ 105/106 → 원복 106/106 · verify-all --full 23/24(✗ = 배포 기록 파일 1건 · 배포 때 채워짐) · mount sweep 8역할 크래시 0 · 실브라우저 클릭 15/15 · 폰 390 가로 넘침 0(사진 확인 — 머리 단추가 3줄로 접히지만 넘침 없음 · 수용).

### ④ 배포 안전성
- 마이그 `migrate-po-item-prepared-at.js`: information_schema 확인 뒤 ADD COLUMN · 2회차 «이미 있음»(팀원 실측) · 레지스트리 `deploy` · `check-enum-parity` 무관(ENUM 무변경).
- 되돌리기: 칸은 NULL 허용·기본 NULL 이라 옛 코드와 공존(읽지 않으면 무해). 코드 롤백만으로 복구, 칸 삭제 불필요.
- 소켓: 기존 `seller-order-updated` 재사용 — 구매자 화면은 새로고침만.
- SW 버전: 프론트 변경 포함 → `/개발완료` 규칙대로 마지막에 올림(이번 패치에 없음 — 정상).
- 운영 반영: 다음 배포 때(이 방은 배포를 묻지 않는다).

### 확인 못 한 것
- 운영 DB 상태(접속 안 함). 11-02 배포에 `shipped_at` 마이그가 나간 것은 배포 기록으로만 — 이번 `prepared_at` 도 배포 루프가 레지스트리로 실행한다.
- 실태블릿(1024 가로) 손가락 조작 — 사진·클릭 스크립트로만.

---

## 실행 기록
- 2026-11-05 Fable: 위 ①②③ 실행(health-check inventory 106/106 · jest 13/13 · 실호출 401/403/200/되돌리기) · 판정 조건부 PASS(F1·F2). 마커 아직 안 찍음.
- 2026-11-05 팀원 F1·F2 고침(같은 게이트 안 · F1·F2 외 변경 0) → Fable 재확인: `boardColumn.ts` DONE 에서 partial_received 제거 + 분기 판정문 그대로 · `Board` `minmax(220px, 1fr)` · jest **16/16**(직접 재실행 · 새 3건 통과) · build:dev exit 0 · verify-all --full 23/24(✗ = releases 기록 파일 1건 — 배포 때 채움 · mount sweep 8역할 크래시 0 · 타입 기준선 신규 0 — 9.9s 는 저장소 밖 tsbuildinfo 증분 캐시라 정상) · clickflow 15/15 · 1280 사진에서 «Shipped» 칸 오른쪽 테두리까지 4칸 다 보임(직접 확인) · 390 사진 넘침 0.
- **마커**: `fable-gate.js pass` 찍음(지문은 이 파일 갱신 뒤 다시 찍은 것). 워킹트리가 바뀌면 무효 — 그 뒤 손대면 다시 게이트.
- 운영 반영: 다음 배포 때(마이그 `migrate-po-item-prepared-at.js` 는 레지스트리 deploy 로 배포 루프가 실행).
