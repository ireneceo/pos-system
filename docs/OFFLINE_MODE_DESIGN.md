# 오프라인 모드 (POS1 허브) — 기능 설계서

> 작성 2026-06-28. 30년차 솔루션 아키텍트 기준 설계. 승인: Irene (POS1 단일 허브 / 전 결제수단 기록 / 단일 완결 범위).
> 전제 문서: `THEFIRE_REMAINING_WORK_PLAN.md §A·§B`(부분 안전망 — 본 설계의 전신), `PRINT_DB_DRIVEN_DISPATCH.md`(인쇄 표준), `project_hybrid_local_print`(POS1=인쇄 주체).
> 🔒 인쇄 보호규칙 적용 대상: 본 설계의 "로컬 인쇄"는 billPrint 경로를 **재사용**하되 인쇄 동작 변경이므로 **실프린터 종이 확인 + bless** 필수.

---

## 0. 목표 / 원칙

**한 줄:** 인터넷이 끊기면 POS1이 자동으로 오프라인 전환 → 카운터에서 주문·결제·취소·주방인쇄를 평소대로 → 복구되면 발생 순서대로 서버에 전부 저장(중복 0·유실 0).

**설계 원칙**
1. **오프라인 = 영업 생명선 연속성**이지 전 기능 복제가 아니다. 보장 대상 = ①주문 접수 ②주방 티켓 ③정보 저장. 분석·다기기 실시간은 복구 후.
2. **POS1 단일 오프라인 허브.** 오프라인 동안 진실의 소스 = POS1 로컬. 분산 합의/충돌해소 없음(다기기 오프라인 실시간은 비범위).
3. **무손실·무중복은 구조로 보장**한다(낙관적 재시도 아님): idempotency + 단일노드 + 순서보존 재생.
4. **기존 검증 자산 재사용**: billPrint 클라이언트 HTML 인쇄, `offlineOrderQueue`(idempotency_key), SW 버전 인프라, hybrid print(POS1 주체).

---

## 1. 기능 정의

### 1-1. 범위 (오프라인에서 되는 것)
| # | 기능 | 비고 |
|---|------|------|
| F1 | 앱·메뉴·설정 오프라인 로드 | PWA 셸+데이터 캐시. 새로고침/재접속해도 안 죽음 |
| F2 | 오프라인 자동 감지 + 배너 | health 핑 기반(navigator.onLine 단독 신뢰 X) |
| F3 | 주문 신규 생성 | 임시번호 부여, 로컬 저장 |
| F4 | 추가주문(+Round) / 수정 | 로컬 op 로그 |
| F5 | 주문 취소 / 아이템 취소 | 로컬 op 로그 |
| F6 | 단계 이동(pending→…→served) | 로컬 상태, 복구 시 재생 |
| F7 | 결제(전 수단: 현금/카드/이지갑/카운터 — 기록) | 우리 카운터 결제는 기록이라 전 수단 가능 |
| F8 | **로컬 주방 티켓 + 빌 자동발행** | POS1 프린터로 서버 없이(client HTML→QZ/RawBT). 이머전시 자동 |
| F9 | 복구 시 자동 동기화 | 발생 순서대로 서버 재생, 정식번호 확정 |

### 1-2. 비범위 (오프라인에 물리적으로 불가 — 합의됨)
- **모바일/QR 손님 주문**: 손님 폰이 인터넷 필요 → 끊기면 애초에 도달 불가.
- **다기기 오프라인 실시간 동기화**: LAN 로컬 브로커 없으면 불가. POS1 허브로 합의 → 복구 후 합쳐짐.
- **카드 실승인**: 외부 게이트웨이 인터넷 필요(우리는 기록만이라 무영향).
- **서버 검증 필수 즉시 반영**(재고 차감 확정·쿠폰 유효성·포인트 적립): 오프라인엔 **낙관적 적용 → 복구 시 서버 검증·정정**(§10 엣지).

### 1-3. 핵심 시나리오
1. **블립(수 초~수 분)**: Wi-Fi 깜빡임. 직원 체감 거의 없이 주문·인쇄 계속, 복구 시 조용히 동기화.
2. **장애(수십 분~시간)**: 인터넷/동글 다운. POS1로 카운터 전 영업 + 주방 로컬 인쇄. 복구 시 일괄 동기화.
3. **정전 후 재부팅**: 기기 꺼졌다 켜짐 → 캐시된 셸로 앱 로드 + 로컬 큐(영속 저장) 복구 → 미동기화분 재생.

---

## 2. 아키텍처

```
[온라인]  POS/모바일/KDS  ──HTTP──>  서버(진실)  ──폴러/소켓──>  인쇄·동기화
[오프라인] POS1(허브, 진실=로컬)  ──로컬──>  IndexedDB(주문·op로그)  +  QZ/RawBT(로컬 인쇄)
                                   └─(복구)─> SyncEngine ──순서재생──> 서버 ──정식번호/인쇄마커──> 정합
```

- **OnlineController**: health 핑으로 online/offline 상태 단일 판정 → 전 앱에 상태 제공(Context).
- **LocalStore (IndexedDB)**: 오프라인 주문 + append-only **operation log**. localStorage 아님(용량·동시성·영속성 위해 IndexedDB).
- **LocalPrint**: billPrint의 client-HTML 생성 재사용 + QZ/RawBT 직접 발행 + 로컬 인쇄 마커.
- **SyncEngine**: 복구 시 op 로그를 순서대로 서버에 재생, id/번호 매핑, 인쇄 중복 방지.
- **PWA(Workbox)**: 셸 + 메뉴/설정 캐시.

---

## 3. 데이터 모델

### 3-1. 로컬 주문 (IndexedDB `offline_orders`)
```ts
interface LocalOrder {
  localId: string;              // uuid (오프라인 식별)
  idempotencyKey: string;       // 서버 생성 멱등키
  provisionalNumber: string;    // 화면/영수증용 임시번호 "OFF-001"
  serverId?: number;            // 동기화 후 매핑
  serverNumber?: string;        // 동기화 후 서버 정식번호
  items: LocalItem[];
  payments: LocalPayment[];     // {method, amount, info...} 전 수단 기록
  status: 'pending'|'preparing'|'ready'|'served'|'cancelled';
  orderType, tableNumber, ...;  // 기존 주문 필드
  createdAt: number;
  syncState: 'local'|'syncing'|'synced'|'failed';
  printedLocally: boolean;      // 로컬 인쇄 완료 → 서버 폴러 중복인쇄 방지용
}
```

### 3-2. Operation log (IndexedDB `offline_ops`, append-only)
```ts
interface OfflineOp {
  opId: string;                 // uuid (op 멱등)
  type: 'create'|'add_items'|'update_items'|'cancel_item'|'cancel_order'|'move_table'|'set_stage'|'pay';
  localOrderId: string;
  payload: any;                 // 해당 작업의 서버 페이로드
  seq: number;                  // 발생 순서(매장 단조증가)
  at: number;
  synced: boolean;
}
```
> **왜 op 로그인가:** 주문 1건의 최종 상태만 보내면 "추가→취소→재추가" 같은 중간 인쇄/감사이력이 사라진다. op 로그를 **순서대로 재생**해야 주방 티켓·취소표·감사로그가 온라인과 동일해진다.

### 3-3. 서버 측
- 신규 컬럼 불필요(주문은 기존 스키마 + `idempotency_key` 이미 존재). 
- 인쇄 중복방지: 로컬인쇄된 주문은 동기화 시 `printed_at`(또는 print-claim)에 마커를 찍어 **폴러가 재인쇄 안 하게**(기존 메커니즘 재사용).
- 임시번호→정식번호: 서버 create가 `order_number` 부여(기존). 로컬 provisionalNumber는 화면 표시용일 뿐 서버 미저장.

---

## 4. 동기화 엔진 (SyncEngine)

### 4-1. 트리거
- `online` 이벤트 + health 핑 성공(서버 실제 도달 확인) + 주기 재시도(예: 15s) + 앱 진입.
- 단일 실행 락(`_syncing`)으로 중복 flush 방지(기존 패턴).

### 4-2. 재생 알고리즘 (순서 보존)
```
ops = offline_ops where !synced, order by seq ASC
for op in ops:
  resolve serverId from localOrderId map (create 후 채워짐)
  POST/PATCH 해당 엔드포인트 with op.payload + idempotency(opId or order key)
  on 2xx:
     if op.type=='create': map[localOrderId] = res.serverId; localOrder.serverNumber=res.order_number
     mark op.synced=true
  on 4xx(검증영구실패, !408/429): mark synced + 기록(스킵, 블록 안 함)
  on 5xx/network: STOP (다음 트리거에서 backoff 재시도)  ← 순서 보존 위해 멈춤
```
- **순서 보존이 핵심**: create 실패 시 그 주문의 후속 op(add/pay)는 보류. 한 주문 체인은 원자적 순서로.
- **멱등**: create=주문 idempotency_key, 후속 op=opId 기반 멱등(서버가 같은 opId 재적용 무시 — §8 신규).

### 4-3. 충돌 정책
- 오프라인 동안 POS1만 진실 → **충돌 거의 없음**. 예외(오프라인 주문의 테이블을 온라인 타기기가 점유)는 **서버가 검증**해서 거부 시 op 4xx → 직원에게 "수동 확인" 알림(드묾).
- 재고/쿠폰/포인트: 복구 시 서버 검증 — 초과/만료면 경고 리포트(주문은 유지, 정정 안내).

---

## 5. 오프라인 감지 + UI

### 5-1. 감지 (OnlineController)
- `navigator.onLine` 은 **불충분**(라우터 연결됐지만 인터넷 死 = onLine true). → `/api/health` **핑(예 5s, 타임아웃 3s)** 으로 실제 서버 도달 판정.
- 상태 머신: `online → (핑 N회 연속 실패) → offline → (핑 성공) → reconnecting(동기화) → online`.
- 전 앱에 `OfflineContext`로 상태 제공.

### 5-2. UI
- **상단 배너**: 오프라인 시 "오프라인 — POS1 로컬 영업 중 (주문 N건 보관, 연결되면 자동 전송)". 색=경고. (`reference_session_state_stale_banner` 식.)
- **동기화 중**: "연결 복구 — N건 전송 중…" → 완료 시 조용히 사라짐.
- **degrade 표시** ✅(구현 2026-06-29, dev): 비-메인POS 기기는 오프라인 시 **전체화면 잠금 오버레이**(`components/Offline/OfflineLockOverlay.tsx`, App 전역) "오프라인 — 주문은 메인 POS에서". **미지정 매장 lockout 방지 자가승격 버튼**("이 기기를 메인 POS로" → 즉시 해제+허브). 연결 복구 시 자동 해제.
- **메인POS 지정** ✅(구현 2026-06-29, dev): 기기단위 localStorage(`utils/offlineMainPos.ts`: isOfflineMainPos/setOfflineMainPos/useOfflineMainPos). 설정 ▸ 프린터에 "오프라인 메인 POS(이 기기)" 토글 카드(평이한 말). 메인POS 오프라인 배너 = "이 기기가 모든 주문·인쇄 처리, 다른기기 잠김, 주방프린터 실패 시 비상모드 켜기" (= 프린트 모두 메인으로 안내 + 기존 emergencyMode 라우팅 재사용, **인쇄코드 0줄 변경**). OrderContext 오프라인 create 로컬기록·인쇄는 메인POS에서만(보조기기 고아데이터 방지). i18n 4언어. Playwright 8/8.

---

## 6. 로컬 인쇄 (가장 신중 — 🔒 인쇄 보호)

### 6-1. 흐름
- 오프라인 주문 생성/추가 시: **billPrint의 client-side 티켓 HTML 생성 함수 재사용**(이미 enriched 데이터로 HTML 만듦) → **QZ Tray / RawBT 직접 발행**(서버 왕복 0). 주방 스테이션 라우팅도 클라이언트 stationEnrichment 재사용.
- 빌 인쇄도 동일(POS1 빌 프린터).

### 6-2. 중복 인쇄 방지 (핵심)
- 로컬 인쇄 성공 → `localOrder.printedLocally=true`.
- 동기화 시 서버 create payload에 `printed_offline:true` 포함 → 서버가 `printed_at` 세팅 → **폴러/자동인쇄가 재인쇄 안 함**. (기존 printed_at/print-claim 재사용 = 검증된 중복방지.)
- 엣지: 로컬 인쇄 실패(프린터 꺼짐)인데 주문은 저장된 경우 → printedLocally=false → 복구 시 서버가 정상 인쇄(누락 0).

### 6-3. 보호규칙
- billPrint **발송 함수 무변경**(호출만). 변경되는 건 "언제/무엇으로 트리거하느냐"(오프라인 로컬 트리거) → **인쇄 동작 변경 = 실프린터 종이 확인 + bless 필수**. print-guard 대상.

---

## 7. 번호 / 영수증 정책
- 오프라인 주문 = **임시번호 "OFF-{일자}-{seq}"** + 영수증에 "임시(오프라인) — 정산 시 정식번호" 표기.
- 동기화 후 서버 정식 order_number 매핑. 빌 재발행은 선택(보통 불필요 — 주방 티켓은 이미 나갔고 정식번호는 정산서/리포트에서 정합).

## 8. API (신규/변경)
- **신규 `POST /api/orders/sync-batch`** (선택, 최적화): op 배열을 한 번에 순서 재생 + 결과맵 반환. 또는 기존 단건 엔드포인트(`POST /orders`, `/:id/add-items`, `/:id/payments`, `/:id/status`, `/:id/move-table`, `DELETE /:id/items/:idx`) 재사용 + **opId 멱등 가드 추가**.
- **opId 멱등**: 각 변경 엔드포인트가 `op_id` 받으면 처리이력 테이블/캐시로 중복 무시(재생 안전). (최소: `processed_ops` 경량 테이블.)
- `printed_offline` 플래그 수용(create/add-items).
- 전부 기존 인증/`checkRestaurantAccess`/`requirePaymentAccess` 유지.

## 9. 보안 / 권한
- 오프라인 영업은 **POS1 + 결제권한 직원**(access_payment) 전제. 오프라인 PIN 게이트는 기존 로컬 검증 가능분만(서버검증 PIN은 복구 후).
- **JWT 만료 엣지**: 오프라인 중 토큰 만료 가능 → 동기화 시 401이면 **재로그인 후 op 재생**(토큰 갱신 → 보관 op 그대로 전송). 설계: SyncEngine이 401 감지 시 로그인 유도 + 재생 재개.
- 오프라인 데이터는 기기 localStorage/IndexedDB(기존 PWA와 동일 신뢰경계). 민감정보 최소.

## 10. 엣지 케이스
| 케이스 | 처리 |
|---|---|
| 정전 후 재부팅 | IndexedDB 영속 → 미동기화 op 복구·재생 |
| 큐 용량 폭증 | IndexedDB(수천건 OK) + 경고 배지("미전송 N건") |
| 다중 탭/창 | 단일 SyncEngine 락(BroadcastChannel/leader election) |
| 부분 동기화 실패(중간 5xx) | 순서 멈춤·backoff 재시도, 이미 동기화분 안 건드림(멱등) |
| 토큰 만료 | §9 재로그인 후 재생 |
| 재고/쿠폰 초과(복구검증) | 주문 유지 + 정정 경고 리포트(차감 음수 방지) |
| 오프라인 중 같은 테이블 온라인 점유 | 서버 검증 거부 → 수동확인 알림 |
| 로컬 인쇄 실패 | printedLocally=false → 복구 시 서버 정상 인쇄 |

## 11. 구현 순서 (한 릴리즈로 출시, 내부 작업 순서)
> "쪼개서 반쪽 출시"가 아니라 **완결 1릴리즈**. 단 구현·검증은 아래 순서로 안전하게.
1. **OnlineController + OfflineContext + 배너**(감지·표시, 무위험).
2. **PWA Workbox 셸+메뉴/설정 캐시**(끊겨도 앱·메뉴) + SW_VERSION bump.
3. **LocalStore(IndexedDB) + op 로그** + 기존 `offlineOrderQueue` 흡수/대체.
4. **오프라인 주문 전 작업**(create/add/cancel/pay/stage) 로컬 기록 + 화면 반영.
5. **SyncEngine**(순서재생·멱등·번호매핑·401복구) + 서버 opId 멱등 가드.
6. **로컬 인쇄**(billPrint 재사용 + printedLocally + 서버 printed_offline 마커) — 🔒 마지막, 실프린터 검증.
7. 데모 전 사이클 회귀 + 운영 검증.

## 12. 테스트 시나리오 (수용 기준)
- **무손실·무중복**: 오프라인 10주문(추가·취소·결제 포함)→복구→서버에 정확히 10건·중복0·금액일치·순서보존.
- **로컬 인쇄**: 오프라인 주문 시 주방티켓 즉시 발행(POS1) → 복구 후 **재인쇄 안 됨**(printed_at 마커). 한글 정상.
- **블립/장애/정전** 3시나리오 각 통과.
- **번호**: 임시번호 표시 → 동기화 후 정식번호 정합(리포트·정산서).
- **degrade**: 비-POS1 기기 오프라인 시 명확 차단 안내.
- **401**: 오프라인 중 토큰만료 → 복구 시 재로그인 후 전건 재생.
- **안전계약**: 데모 매장만, 운영 무영향, print-guard 8/8(로컬인쇄 정식변경분 bless).

## 13. 리스크 / 한계 (사전 합의)
- **로컬 인쇄 = 인쇄 동작 변경** → 실프린터 종이 확인 필수(매장 1회). 가장 큰 검증 포인트.
- **IndexedDB/PWA SW** 신규 도입 → 기존 캐시·번들과 충돌 없게 SW 신중(현재 sw.js는 셸 캐시 안 함 → Workbox 레이어 추가).
- **모바일/다기기 오프라인 실시간은 영구 비범위**(LAN 서버 필요). 매장에 "오프라인 = 카운터 POS1 영업" 명확히 안내.
- 규모: 중대형(6 모듈). 데모→운영검증→실프린터 순.

---

## 부록 — 재사용 자산 맵
| 필요 | 기존 자산 |
|---|---|
| 멱등 | `utils/offlineOrderQueue.ts`(idempotency_key, flush) → 확장 |
| 로컬 인쇄 HTML | `utils/billPrint.js`(sendHTMLViaQZTray, client HTML) |
| 스테이션 라우팅 | `utils/stationEnrichment.ts` |
| 인쇄 중복방지 | printed_at / print-claim (orders-crud) |
| POS1 주체 | hybrid local print(POS1=인쇄 전담) |
| 배너 패턴 | session-state STALE 배너 식 |
| SW 버전 | sw.js SW_VERSION |

---

## 14. 오프라인 편집 배선 (편집 UI → recordOfflineOp + 라이브뷰 낙관적 오버레이) — 설계 (2026-07-08 실측)

> 오프라인에서 "새 주문 생성"은 배선 완료(OrderContext→`recordOfflineCreate`). **미완 = 이미 존재하는 주문의 편집**(아이템 추가·취소·결제·단계이동·테이블이동)을 오프라인에서 접수하는 것. 아래는 실측 기반 정밀 설계. **돈·주문 무결성 + 오프라인 멱등 영역 → 구현 전 Fable 게이트.**

### 14-1. 실측된 현재 상태 (인프라는 대부분 완비)
- **큐**: `utils/offlineOps.ts::recordOfflineOp(type, ref, payload)` — `add_items·cancel_order·set_stage·move_table·pay` **전부 지원**. 로컬 주문이면 IndexedDB 상태 즉시 patch(취소=cancelled, 단계, 테이블, 결제 append, 아이템 append).
- **재생**: `utils/offlineSync.ts::endpointFor` — 모든 op → 엔드포인트 매핑 + `op_id` 동봉. `SYNC_NONCREATE_ENABLED = true`(활성).
  - add_items → `POST /orders/:id/add-items` · pay → `POST /orders/:id/payments` · set_stage → `PATCH /orders/:id/status` · move_table → `POST /orders/:id/move-table` · cancel_order → `DELETE /orders/:id` · cancel_item → `PATCH /orders/:id/items`.
  - **2026-07-08 수정**: endpointFor의 set_stage(PUT→PATCH)·move_table(PUT→POST) 메서드가 실제 백엔드 라우트와 불일치했음(재생 시 404/405) → 실측 대조 후 정정(orders-crud 1527·1119). 나머지 4개는 일치 확인.
- **백엔드 op_id 멱등 가드**: `add_items`(orders-crud 2254/2345)·`pay`(orders-payment 373/479) = **명시 가드 있음**. `set_stage/move_table/cancel_order/cancel_item` = 현재 "본질 멱등" 가정(가드 없음).

### 14-2. 유일한 갭 2가지
1. **편집 UI 핸들러에 오프라인 분기 부재** — `isOfflineMainPos()`는 SettingsPage·OrderContext(create)만 사용. 편집 호출부(아래 인벤토리)는 오프라인 시에도 그냥 `fetch(...)` → 실패. → **각 편집 핸들러에 `if(isOfflineMainPos()) return recordOfflineOp(...)` 분기 추가**(create 플로우와 동형).
2. **서버 주문의 오프라인 편집이 라이브뷰에 안 비침** — LiveOrders/FloorPlan은 **서버 데이터(캐시) 렌더**. `recordOfflineOp`는 로컬 큐만 patch → 서버 주문 편집은 동기화 전까지 화면 미반영. **낙관적 오버레이 필요.**

### 14-3. 편집 호출부 인벤토리 (오프라인 분기 대상)
| op | 파일·지점(실측) | payload |
|---|---|---|
| set_stage(취소 포함) | `LiveOrders` 708·1322·1380 / `TableDetailPanel` 1052·1153·1182 / `OrderContext` 257 (`PUT /orders/:id/status`) | `{ status }` |
| add_items | POS 아이템 추가 흐름(`/orders/:id/add-items` 온라인 호출부) | `{ order_items }` |
| pay | 결제 흐름(`/orders/:id/payments`) | `{ method, amount, info }` |
| move_table | 테이블 이동(`/orders/:id/move-table`) | `{ table_number }` |
| cancel_item | 부분취소(`PATCH /orders/:id/items`) | `{ ...취소품목 }` |
> 각 지점: 온라인=현행 유지, 오프라인=`recordOfflineOp(type, { serverId: orderId }, payload)` 후 낙관적 UI 갱신. **주의: 정확한 지점은 grep로 재확인**(위는 /status 계열만 열거, add-items/payments/move-table 호출부 별도 확인 필요).

### 14-4. 낙관적 오버레이 모델 (핵심 설계 결정)
- **선택지 A (권장·MVP 안전)**: 오프라인 중 **서버 주문 편집은 로컬 pending-ops 오버레이로 즉시 반영**. LiveOrders/FloorPlan 렌더 직전 selector가 `offline_ops`(serverId별)를 읽어 표시 주문에 patch 적용(status/items/payments 덮어쓰기) + "동기화 대기" 배지. 복구 시 재생→서버 확정→오버레이 자연 소멸.
- **선택지 B (더 좁고 더 안전)**: 오프라인 중 **서버 주문 편집 자체를 막고**(비활성+안내), 오프라인엔 **신규 주문 접수만** 허용(현행 유지). 편집은 온라인에서만. 데이터 위험 0, 기능 축소.
- **결정 필요(Irene/Fable)**: A(완전 오프라인 편집, 오버레이 복잡·검증 큼) vs B(안전 우선, 편집 비허용). 매장 실사용 빈도(오프라인 중 기존주문 편집이 실제로 필요한가)로 판단.

### 14-5. 백엔드 op_id 하드닝 (A/B 공통, 안전 추가)
- `set_stage`(`PUT /orders/:id/status`)·`move_table`·`cancel_order`(DELETE)에 **add_items/pay와 동일한 op_id 가드 추가**(온라인=op_id 없음→통과, 동작 100% 동일; 재생만 멱등). "본질 멱등" 가정 제거 → 재생 이중적용·이중 주방인쇄 위험 차단. **isolated·저위험**(기존 패턴 미러).

### 14-6. 인쇄 상호작용 (🔒)
- 재생된 `set_stage`/`add_items`가 주방 재인쇄를 유발하지 않는지 확인 필수(printed_at 히스토리·poller 단일경로가 이미 방어하나 재생 경로로 실증). **인쇄 보호파일 무접촉**(편집 분기는 호출부 UI만).

### 14-7. 구현 순서 (A안 기준)
1. 백엔드 op_id 하드닝(14-5) + 회귀(재생 이중적용→1회 적용 실증).
2. `isOfflineMainPos()` 편집 분기(14-3) — 지점별 grep 재확인 후 최소분기.
3. 낙관적 오버레이 selector(14-4 A) + "동기화 대기" 배지.
4. OfflineOrdersPanel: 로컬 주문에 편집 액션(선택) — 서버주문은 라이브뷰에서 인라인 편집.
5. 검증: 오프라인 편집→로컬 즉시반영→복구 재생→서버 확정·오버레이 소멸·중복0·인쇄1회. health-check + print-guard + 오프라인 시나리오.

### 14-8. Fable 게이트 (필수)
주문 무결성(멱등·무손실·순서보존) + 오프라인 재생 이중적용 + 주방인쇄 비중복 + 오버레이 정합. 배포 전 적대적 검증 대상.

### 14-9. ~~Fable 설계 결정 (2026-07-08) — "B + 결제(pay)만"~~ → **§15로 대체됨 (같은 날 Irene 지시)**
> ⚠️ **SUPERSEDED.** Irene 지시: "정석·완벽한 완전 솔루션으로 제대로 구현" → 전체 A안 채택. 단일 진실 = **§15**. 아래는 이력 참고용.

- **B 채택(기본): 오프라인=새 주문만.** 정전 중 "한 상 더"는 **같은 테이블에 새 오프라인 주문**으로 접수(이미 동작: `recordOfflineCreate`가 table_number 보유 + 로컬 주방인쇄 → 복구 후 온라인 머지/정산). 종이티켓 식당의 정전 대응과 동일. 단계이동·테이블이동·취소는 짧은 정전(10~40분) 중 빈도 거의 0 → 복구 후 처리.
- **유일한 진짜 구멍 = 결제(checkout).** 정전 전 주문 손님이 정전 중 계산해야 함. **`pay`만 이미 완전 하드닝**(op_id 가드 `orders-payment.js:373/479`, 주방인쇄 무관, 빌=클라 인쇄) → **결제 op만 좁게 활성화.** 오버레이 필요 없음(주문 "결제됨-동기화대기" 1비트만).
- **전체 A 기각 근거:** 비용이 전부 🔒 protected 표면에 떨어짐 — 재생 `add_items`가 `needs_print=true` 설정(orders-crud ~2280) → 오프라인 서버주문 추가는 로컬인쇄 위해 `printed_offline` 추가(인쇄 라이프사이클 변경=실프린터검증+bless) 필요 + set_stage/move_table/cancel op_id 하드닝(orders-crud) + 3대형파일 오버레이 정합 + 복구 엣지(정전 중 모바일/QR 주문은 서버 도달). **빈도 0 기능에 과한 위험. "패치 위 패치 말고 단순화"**(6월 인쇄전쟁 형태).
- **결제 슬라이스 구현(작음, Fable 게이트 1회):** ①UI 분기만 `if(isOfflineMainPos()) recordOfflineOp('pay',{serverId},{method,amount})`(create 분기 `OrderContext.tsx:208` 미러, `/orders/:id/payments` 호출부 grep 재확인) ②최소 로컬반영("결제됨-동기화대기" 배지, 테이블 클리어 가능) ③나머지 편집은 오프라인 시 비활성+안내("복구 후 편집 — 추가는 이 테이블 새 주문으로") ④**백엔드 변경 0**(pay 가드 이미 있음, §14-5 하드닝 보류). **top3 위험:** 재생 이중결제(가드 커버, health-check에 계약 추가)·정전 중 타채널 결제된 주문에 오프라인결제(재생 no-op/warn)·빌 자동인쇄 무회귀(print-guard 8/8 유지).

---

## 15. ✅ 오프라인 편집 A안 완전판 — 확정 구현 블루프린트 (2026-07-08, Fable 게이트 통과 설계 · 단일 진실)

> **Irene 지시(2026-07-08): "정석·완벽한 완전 솔루션(no stopgap, no MVP-보류)."** §14-9(B+pay)를 대체한다.
> 전 코드 실측 기반(아래 라인번호 2026-07-08 기준). 구현자는 착수 시 라인 drift만 grep 재확인.
> 🔒 표시 = 인쇄 생명선 접촉 — 해당 항목은 print-guard bless + Irene 실프린터 확인 필수.

### 15-0. 설계 불변식 (전 절단면이 이것을 지킨다)

- **I1 (재생 ≡ 온라인 요청)**: 오프라인 op의 payload = 온라인이었으면 보냈을 바로 그 request body (+`op_id`, 필요 시 `printed_offline`/`base_updated_at`/`settle_full`). 재생은 같은 엔드포인트에 같은 body. 별도 "오프라인 전용 API" 신설 금지.
- **I2 (op_id 스코프 격리)**: 백엔드의 모든 신규 분기는 `req.body.op_id`가 있을 때만 작동. **온라인 트래픽 동작 변화 0** — 이것이 회귀 안전의 뿌리.
- **I3 (주방티켓 정확히 1장)**: 로컬인쇄 성공 → `printed_offline=true` → 재생이 printed_at 스탬프/재발행 스킵. 로컬인쇄 실패 → 플래그 없음 → 재생이 기존 경로(needs_print/pending_reprint) → POS1 폴러가 인쇄. **never both, never zero.** 폴러 단일경로([[reference_print_single_poller_architecture]]) 무변경 — 오프라인 로컬인쇄는 "서버가 없는 동안의 폴러 대행"이며, 온라인 복귀 즉시 폴러가 유일 주체로 복귀한다.
- **I4 (진실 위계)**: 온라인 = 서버가 진실. 오프라인 = POS1 op 로그가 진실, 화면은 [서버 캐시 + pending-op 오버레이]. 재생 완료 = 오버레이 자연 소멸, 서버 진실 복귀. 오버레이는 **읽기 전용 파생물**(서버 캐시를 절대 mutate하지 않음).
- **I5 (돈)**: 결제는 항상 `POST /:id/payments`(OrderPayment row 생성, op_id 가드) 로 재생. 받은 금액은 받은 그대로 기록(위조 없음), 완납 여부만 `settle_full`로 보정. 포인트/쿠폰/할인 신규 적용은 오프라인 금지(서버 검증 필요).
- **I6 (충돌은 숨기지 않는다)**: 정전 중 서버측 변화(모바일/QR 주문, 타채널 결제)와 충돌한 op는 조용히 버리지 않고 **skip + 화면 표면화**(§15-6).

### 15-1. 실측에서 발견된 기존 결함 3건 (A안 이전에 반드시 수정 — 그 자체로 P1)

1. **[프론트·치명] 서버주문 op가 동기화 큐 전체를 영구 블록** — `recordOfflineOp`는 서버주문 op를 `localOrderId='srv-{id}'` + `payload._serverId`로 기록하는데, `offlineSync.ts::runSync`의 serverId 해석은 `serverMap.get(op.localOrderId)`뿐(라인 94) → 항상 undefined → `stopped='awaiting-create'` **break** → 그 뒤 모든 op까지 영원히 재생 불가. §14-9의 "pay만" 슬라이스도 이 버그 위에서는 동작 불가였다.
   → 수정: `const serverId = op.type==='create' ? undefined : (serverMap.get(op.localOrderId) ?? (Number(op.payload?._serverId) || undefined));` + 전송 body에서 `_serverId` 제거.
2. **[프론트] `endpointFor`의 add_items body 키 불일치** — §14-3 표는 `{order_items}`로 적었지만 백엔드 `/add-items`는 `const { items } = req.body`(orders-crud 2249). op payload는 `{ items: [...] }` 키로 기록해야 한다.
3. **[백엔드] create 재생의 forceMerge 멱등 구멍** — `POST /orders`의 idempotency_key 가드(506~512)는 "생성된 주문 row"에서만 키를 찾는데, `forceMergeIntoOrderId` 분기(603~)는 머지만 하고 **키를 어디에도 영속하지 않는다** → 응답 유실 후 재전송이 같은 품목을 두 번 머지 + 주방티켓 2장. (온라인에서도 이론상 열려 있는 구멍.)
   → 수정(§15-3-D): forceMerge 분기 진입부에서 `_idemKey` 있으면 `alreadyProcessed('idem:'+_idemKey)` 체크, 머지 성공 후 `recordProcessed('idem:'+_idemKey, ...)` (기존 ProcessedOp 재사용, 스키마 변경 0).

### 15-2. op → 엔드포인트 확정 매핑 (offlineSync.ts `endpointFor` 최종형)

| op | 재생 요청 | body (op_id 외) | 비고 |
|---|---|---|---|
| create | `POST /orders` | 원본 create payload + `printed_offline?` | 기존 그대로. **forceMergeIntoOrderId가 있는 create는 오프라인에서 기록 단계에서 add_items op로 번역**(§15-5-①)하므로 재생엔 안 옴(방어: §15-3-D가 이중 안전망) |
| add_items | `POST /orders/:id/add-items` | `{ items, order_type?, takeaway_charge?, printed_offline? }` | **키=`items`**(결함 2 수정) |
| pay | `POST /orders/:id/payments` | `{ amount, payment_method, card_type?, amount_received?, change_amount?, items_paid?, cashier_name?, settle_full? }` | 가드 기존(373/479) |
| set_stage | `PATCH /orders/:id/status` | `{ status, kitchen_ready?, served_at? }` | 메서드 이번 세션에 수정 완료 |
| cancel_order | `PATCH /orders/:id/status` | `{ status:'cancelled', reason?, void_pin?, printed_offline? }` | **DELETE 매핑 폐기.** 온라인 취소 흐름과 동일 경로(권한·PIN·취소표 로직 일치). `DELETE /:id`는 재생에서 사용 안 함(가드 불필요, 무접촉) |
| cancel_item | `PATCH /orders/:id/items` | `{ order_items, recalculateTotal?, allowItemRevert?, base_updated_at }` | **base_updated_at 필수 동봉**(full-array replace라 서버 드리프트 시 409 STALE_WRITE로 보호받는 것이 정답) |
| move_table | `POST /orders/:id/move-table` | `{ destinationTableNumber, destinationFloorPlanTableId?, onOccupied:'block', printed_offline? }` | 재생은 **항상 block**(자동머지 금지, §15-6) |

### 15-3. 백엔드 절단면 — `routes/orders-crud.js` 🔒 (전부 I2 스코프: `op_id` 없으면 무접촉)

> 이 파일이 유일한 백엔드 변경 파일(orders-payment.js·opIdGuard.js·모델·마이그레이션 = **변경 0**. ProcessedOp 테이블 기존 재사용).
> 배포 전 `check-print-guard.js` 가 diff를 잡는다 — 실프린터 검증 후 `--bless`.

**A. `PATCH /:id/status` (1527~) — op_id 가드 + 터미널 무후퇴 게이트**
주문 로드 + IDOR 가드 직후(라인 ~1541, `userCanVoid` 체크 **앞**)에 삽입:
```js
// 오프라인 재생 멱등 + 터미널 보호 (op_id 있을 때만 — 온라인 무접촉)
if (req.body.op_id) {
  if (await alreadyProcessed(req.body.op_id)) return res.json({ success: true, deduped: true });
  // 정전 중 타채널로 이미 종결(완료/취소)된 주문을 재생이 되돌리지 않는다 (§15-6 충돌정책).
  if (['completed','cancelled'].includes(order.status) && status !== order.status) {
    await recordProcessed(req.body.op_id, { order_id: order.id, type: 'set_stage', restaurant_id: order.restaurant_id });
    return res.json({ success: true, skipped: 'terminal-state', data: order });
  }
}
```
성공 경로 말미(응답 직전, audit log 뒤)에 `if (req.body.op_id) await recordProcessed(req.body.op_id, { order_id: order.id, type: 'set_stage', restaurant_id: order.restaurant_id });`

**B. 🔒 `PATCH /:id/status` 취소표 블록(1619~1637) — printed_offline 스킵 게이트 (한 줄)**
```js
if (finalStatus === 'cancelled' && !(req.body.op_id && req.body.printed_offline === true)) { …기존 블록 그대로… }
```
의미: POS1이 오프라인 중 취소표를 로컬로 이미 찍었으면(§15-5-③) 재생이 needs_print/pending_reprint를 켜지 않는다 → 폴러 재발행 0. 로컬인쇄 실패였으면 플래그 없음 → 기존대로 폴러가 복구 후 취소표 1장(늦지만 정확히 1장 — I3).

**C. `POST /:id/move-table` (1119~) — op_id 가드 + 🔒 재발행 스킵**
- 핸들러 진입부(body 파싱 직후): `if (req.body.op_id && await alreadyProcessed(req.body.op_id)) return res.json({ success: true, deduped: true });`
- 성공 응답 직전: `recordProcessed(op_id, { type:'move_table', ... })`.
- 🔒 clean-move 재발행 블록(`if (printedItems.length > 0 || _priorMovePending)`, ~1291): 조건에 `&& !(req.body.op_id && req.body.printed_offline === true)` 추가. table_number/floor_plan_table_id 갱신은 그대로(이동 자체는 항상 적용) — 재발행 큐잉만 스킵.

**D. `POST /` forceMerge 분기(603~) — 멱등 봉합 (결함 3)**
```js
if (orderData.forceMergeIntoOrderId) {
  if (_idemKey && await alreadyProcessed('idem:' + _idemKey)) {
    const force0 = await Order.findByPk(orderData.forceMergeIntoOrderId);
    return res.status(200).json({ success: true, data: force0, merged: true, idempotent: true });
  }
  …기존 머지…
  if (_idemKey) await recordProcessed('idem:' + _idemKey, { order_id: force.id, type: 'force_merge', restaurant_id: force.restaurant_id });
  …기존 응답…
}
```
(`'idem:'` prefix로 op_id 네임스페이스와 충돌 방지. normalizeOpId 64자 컷 안에 안전.)

**E. 🔒 `mergeItemsIntoOrder` (354~) — `opts.printedOffline` (이 블루프린트의 유일한 인쇄 라이프사이클 변경)**
시그니처: `mergeItemsIntoOrder(existingOrder, newItems, transaction, incomingOrderType, incomingTakeawayCharge, opts = {})`
`opts.printedOffline === true`일 때만 (기존 5개 호출부는 opts 미전달 = 100% 동일):
1. `itemsWithTimestamp` 각 품목에 `printed_at: now` 스탬프 (create 경로 829~847과 동일 메커니즘 — 폴러의 kitchen_items(未printed 품목)에서 제외).
2. `needs_print: existingOrder.needs_print` (강제 true 대신 **기존 값 보존**), `consolidated_printed_at` 도 기존 값 보존.
   **왜 보존이지 false가 아닌가**: 정전 중 서버에 도달한 모바일 라운드가 needs_print=true로 대기 중일 수 있다 — false로 덮으면 그 모바일 라운드 티켓이 증발(zero-ticket 사고). 보존이면: 대기분 없으면 그대로 false(아무것도 안 찍힘), 대기분 있으면 폴러가 未printed 품목만 찍는다(우리 스탬프분 제외) — 양쪽 모두 정확히 1장.
3. `/add-items` 라우트(2296): `const mergeResult = await mergeItemsIntoOrder(order, items, null, req.body.order_type, req.body.takeaway_charge, { printedOffline: !!(req.body.op_id && req.body.printed_offline === true) });`
   (takeaway_charge 5번째 인자 전달 — forceMerge 분기와 등가가 되어 오프라인 takeaway 라운드 포장비 유실 방지. 기존 온라인 호출자는 이 키를 안 보내므로 무접촉.)

**F. `PATCH /:id/items` (1788~) — op_id 가드**
주문 로드+IDOR 직후: dedup 체크(위 A와 동형, type:'cancel_item'), 성공 응답 직전 recordProcessed. STALE_WRITE(409)·forward-only 가드는 기존 그대로(재생도 동일 보호를 받는 것이 정답).

**G. `POST /:id/payments` (orders-payment.js) — `settle_full` 1줄 (op_id 스코프)**
fullyPaid 판정(라인 ~424)에: `const fullyPaid = Math.abs(newPaid - total) < 0.01 || rawNewPaid >= total || (req.body.op_id && req.body.settle_full === true);`
**왜**: 오프라인 라운드 추가 후 오프라인 완납 시, 클라 근사 총액과 재생 후 서버 재계산 총액이 수 센트 어긋나면 주문이 partial로 붙박이가 된다. 받은 금액(amount)은 실수령 그대로 기록(회계 정확), 완납 마감만 명시 플래그로 — 오프라인 UI가 "전액 결제" 버튼일 때만 settle_full=true를 op에 싣는다. audit metadata에 `settle_full: true` 포함.

### 15-4. 오프라인 인프라 수정 — `utils/offlineSync.ts` / `offlineOps.ts` / `offlineStore.ts`

**offlineSync.ts**
1. serverId 해석 수정(§15-1 결함 1) + body에서 `_serverId` strip.
2. `endpointFor` 최종 매핑(§15-2): cancel_order→PATCH status, add_items 키=items, cancel_item에 base_updated_at 포함 확인.
3. 성공 응답 처리 확장: `res.ok`인데 `json.skipped`(terminal-state)면 `markOpSynced` + `markOpNote(opId, 'skipped_terminal')` — 표면화용(§15-6).
4. 4xx 영구실패 경로(133~136): 현행(markOpFailed 후 markOpSynced) 유지하되 syncError가 지워지지 않게 — `markOpSynced`가 `syncError`를 undefined로 리셋하는 현행 코드(offlineStore 160~166)를 `markOpSyncedKeepError` 분기로 보완.
5. runSync 종료 시(변화 있었으면) `window.dispatchEvent(new CustomEvent('offline-ops-changed'))` — 오버레이 즉시 갱신 + OrdersRealtimeContext refetch 트리거.

**offlineOps.ts**
1. `recordOfflineOp` 끝에 `offline-ops-changed` 이벤트 dispatch (오버레이 즉시 반영).
2. 로컬 인쇄 헬퍼 2개 추가 (모두 기존 `billPrint.printKitchenTicketViaRawBT` 재사용, billPrint 무접촉 — printOfflineKitchenTicket과 동일 패턴):
   - `printOfflineAddedItemsTicket(serverOrder, addedItems)` — 라운드 티켓: orderNumber=서버 order_number, tableNumber, items=추가분만(kitchen_station_id는 POS 카트가 이미 클라 해석해 보유). 성공 시 true.
   - `printOfflineNoticeTicket(serverOrder, notice, printedItems)` — 취소/이동 안내: `noticeHeader` 구조는 백엔드 pending_reprint 표준과 동일(`{ title:'** ORDER CANCELLED **', lines:[...] }` / `{ title:'** TABLE CHANGED **', fromTable, toTable, lines:[...] }` — orders-crud 1632·1298과 FloorPlanPage 1616~1620 실측 포맷 그대로). items = 캐시 주문의 `printed_at 있고 status∉{served,completed}` 품목(백엔드 printedItems 필터 1274와 동일 규칙).
   - 인쇄 게이트: printOfflineKitchenTicket과 동일(별도 게이트 신설 금지 — 일관성). 실패 시 false 반환 → 호출부가 printed_offline 플래그를 싣지 않는다(I3) + toast "주방 인쇄 실패 — 복구 후 자동 인쇄됩니다".

**offlineStore.ts**
1. `getFailedOps(): Promise<OfflineOp[]>` — `syncError` 있는 op 목록(synced 여부 무관) + `dismissFailedOp(opId)`(meta acknowledged 셋).
2. `pruneSyncedOps(olderThanDays=7)` — 하우스키핑, initOfflineSync에서 1회 호출.
3. **주문 스냅샷 스토어**(정전 중 재부팅 생존 — §1-3 시나리오 3의 완결): meta 키 `orders_snapshot` = 마지막 성공 fetch의 orders 배열(30초 스로틀). OrdersRealtimeContext가 쓴다(§15-5-⑦).

### 15-5. 프론트 편집 배선 + 낙관적 오버레이 (단일 메커니즘)

**오버레이 = 순수 함수 모듈 `utils/offlineOverlay.ts` 하나. 적용 지점 정확히 2곳.**

```ts
export interface PendingServerOp { opId; type; serverId: number; payload; at; }
export async function getPendingServerOps(): Promise<PendingServerOp[]>   // unsynced && payload._serverId
export function overlayOrders(orders: any[], ops: PendingServerOp[]): any[]  // 새 배열, 원본 불변(I4)
export function overlayTableStatuses(statuses: Record<string, any>, ops, orders): Record<string, any>
```

**op별 적용 규칙(클라 축약 재현 — 서버 재계산이 진실, 화면은 근사+배지):**
- `set_stage`/`cancel_order`: `status = payload.status` (+ 뷰의 기존 cancelled 필터가 알아서 숨김).
- `add_items`: `order_items`에 추가분 append(`status:'pending'`, `order_group: max+1`, `added_at`), `subtotal += Σ(price·qty)`, `total_amount += Σ(price·qty)·(1 + (tax_rate||0) + (service_charge_rate||0))` — **근사**(할인 동결). 배지가 "동기화 대기"임을 표시하므로 근사 허용, 최종 금액=재생 후 서버 공식(computeOrderTotals).
- `cancel_item`: `order_items = payload.order_items` (op payload가 온라인과 동일한 full-array이므로 그대로).
- `pay`: `amount_paid += amount`; `payment_status = (settle_full || amount_paid+0.01>=total) ? 'completed' : 'partial'`; 테이블 클리어 판정은 뷰 기존 로직이 이 필드로 계산.
- `move_table`: `table_number = destinationTableNumber`, `floor_plan_table_id = destinationFloorPlanTableId`.
- 모든 대상 주문에 `__offlinePending: true` — 뷰는 이 1비트로 배지만 렌더.

**적용 지점 ① `contexts/OrdersRealtimeContext.tsx`** — 전 화면의 단일 주문 스토어(LiveOrders·FloorPlan·KDS 공용, 실측 확인). context value의 `orders`를 `useMemo(() => pendingOps.length ? overlayOrders(rawOrders, pendingOps) : rawOrders, [rawOrders, pendingOps])`로 파생. pendingOps는 내부 훅(IDB 로드, `offline-ops-changed` 이벤트 + isOffline 전환 시 리로드; 온라인·op 0개면 빈 배열 → **오버레이 코드 경로 자체가 죽어 있음** = 평상시 위험 0). KDS는 데이터만 받으므로 🔒 KDS 파일 무접촉·단계 로직 무접촉.
**적용 지점 ② `pages/FloorPlan/FloorPlanPage.tsx`** — `tableStatuses`는 별도 `/table-status` fetch라 ①이 못 덮는다. 렌더 직전 memo 1곳에서 `overlayTableStatuses` 적용(이동=출발 테이블 비우고 도착 채움, 취소/완납=기존 점유 판정 필드 갱신). TableDetailPanel은 FloorPlan이 내려주는 statusInfo를 받으므로 자동 상속.
**소멸**: op synced → pendingOps에서 빠짐 → 오버레이 자연 소멸. 서버 진실은 (a) 재생이 emit하는 order-updated 소켓, (b) 소켓 reconnect 전체 재동기화(기존), (c) `offline-ops-changed` 수신 시 context `refetch()` 1회 — 3중이라 공백 수 초 이내.

**⑦ 스냅샷 하이드레이션(재부팅 생존)**: OrdersRealtimeContext 초기 fetch 실패 && `isOfflineMainPos()` && IDB 스냅샷 존재 → 스냅샷으로 `rawOrders` 하이드레이트(+`__staleSnapshot` 배너). 성공 fetch마다 스냅샷 갱신(30s 스로틀). 이것 없이는 "정전 중 POS 재부팅 → 기존 테이블 전부 안 보임 → A안 무의미".

**편집 호출부 분기 — 인벤토리 전량 (패턴: `if (isOfflineMainPos() && isOffline)` → record + 로컬인쇄 + toast, 온라인 경로 무변경. useOffline()의 isOffline 사용 — navigator.onLine 단독 판정 금지):**

| # | 지점(실측) | 오프라인 동작 |
|---|---|---|
| ① | `OrderContext.tsx:208` create 분기 | **forceMergeIntoOrderId 있으면 create가 아니라 `add_items` op로 번역**: `recordOfflineOp('add_items', {serverId: forceMergeIntoOrderId}, { items, order_type, takeaway_charge, printed_offline })` + `printOfflineAddedItemsTicket` → 성공 시 payload.printed_offline=true로 기록(인쇄를 record **앞**에 수행해 플래그를 payload에 확정 — create 경로처럼 사후 setPrintedLocally 패턴이 안 됨). 없으면 기존 recordOfflineCreate 그대로 |
| ② | `OrderContext.tsx:254` updateOrderStatus | `recordOfflineOp('set_stage', {serverId: orderId}, updateData)` |
| ③ | `LiveOrdersPage.tsx:708` 단계이동 | set_stage op (updateData 그대로) |
| ④ | `LiveOrdersPage.tsx:1380` confirmCancelOrder | `printOfflineNoticeTicket`(스냅샷의 printed 품목 있을 때만) → `recordOfflineOp('cancel_order', {serverId}, { status:'cancelled', reason, void_pin, printed_offline })`. void_pin은 온라인과 동일하게 payload로 — 재생 시 서버가 검증(오프라인 PIN 서버검증 불가 → 재생 거부되면 §15-6 표면화) |
| ⑤ | `LiveOrdersPage.tsx:919` Add Items(merge-items) | `add_items` op(①과 동일 헬퍼) + 로컬 라운드 인쇄. merge-items 라우트는 온라인 전용으로 존속(무변경) |
| ⑥ | `LiveOrdersPage.tsx:1204` 서빙 토글(PATCH /items) | `cancel_item` op — body 온라인과 동일(order_items·allowItemRevert·base_updated_at=**캐시 주문의 updatedAt**) |
| ⑦ | `LiveOrdersPage.tsx:1489` handlePaymentConfirm | `pay` op: `{ amount: total-amount_paid(오버레이 반영값), payment_method, card_type, cashier_name, settle_full: true }` → 이어서 서빙완료 주문이면 §온라인 로직 미러로 `set_stage {status:'completed'}` op 추가(재생 순서=seq 보장). **포인트 사용 UI는 오프라인 비활성**(서버 검증 필요) |
| ⑧ | `PaymentModal.tsx:711` split 결제 | `pay` op: `{ amount: splitTotal, payment_method, items_paid, amount_received, change_amount, cashier_name }` (settle_full 없음 — 부분결제) |
| ⑨ | `TableDetailPanel.tsx:814` merge-items | ⑤와 동일 |
| ⑩ | `TableDetailPanel.tsx:909` 서빙 토글 | ⑥과 동일 (base_updated_at=statusInfo.updatedAt) |
| ⑪ | `TableDetailPanel.tsx:1052` 취소 | ④와 동일 — 단 상세 fetch(1045)가 오프라인 실패하므로 printed 품목 판단은 오버레이/캐시 주문(OrdersRealtimeContext)에서 |
| ⑫ | `TableDetailPanel.tsx:1182`·`FloorPlanPage.tsx:1076` 단계 | set_stage op |
| ⑬ | `FloorPlanPage.tsx:1145` 서빙 토글 | ⑥과 동일 |
| ⑭ | `FloorPlanPage.tsx:1569` doMove | 오프라인 점유판정은 오버레이 tableStatuses로 클라 선차단(occupied면 이동 불가 안내 — 오프라인 머지 UI 금지). 빈 테이블이면 `printOfflineNoticeTicket`(TABLE CHANGED, printed 품목 있을 때만) → `recordOfflineOp('move_table', {serverId}, { destinationTableNumber, destinationFloorPlanTableId, onOccupied:'block', printed_offline })` |
| ⑮ | `FloorPlanPage.tsx:1386` 결제 | ⑦과 동일 |
| ⑯ | 모바일 결제 검증/거절(`LiveOrdersPage 1319/1335`, `TableDetailPanel 1153/1202`) | **오프라인 비활성 + 안내** — 증빙 검증은 서버 필요(비범위 §15-8) |

**배지**: `__offlinePending` → LiveOrders 주문카드·FloorPlan 테이블칩에 소형 "오프라인 · 동기화 대기" 칩(기하 글리프, 이모지 금지). OfflineOrdersPanel 하단에 "동기화 확인 필요 N건" 섹션(§15-6).

### 15-6. 재생 순서·충돌 정책 (정전 중 서버는 살아 있었다 — 모바일/QR·타채널)

**순서**: 전역 seq 오름차순(기존) — 한 주문의 add→cancel→pay 체인 순서 보존. create 미동기 주문의 후속 op는 기존 awaiting-create 체인 보류. 5xx/네트워크=STOP 재시도, 401=재로그인 이벤트(기존).

| op | 서버측 드리프트 시나리오 | 정책(구현) | 표면화 |
|---|---|---|---|
| pay | 타채널로 이미 완납 | 서버 400 "already fully paid" → 4xx skip | ⚠ **필수** — "이중수금 가능성, 손님 확인" (돈 문제라 최상위 경고) |
| add_items | 주문이 취소/완납됨 | 서버 400 → skip | ⚠ "품목 미반영 — 주문이 이미 종결됨" |
| set_stage | 주문이 terminal(완료/취소) | §15-3-A 게이트 → `skipped:'terminal-state'` | ℹ 조용히 기록(주방 단계는 어차피 지난 일) |
| cancel_order | 타채널 완납 후 | terminal 게이트 skip | ⚠ "취소 미적용 — 이미 결제 완료됨" |
| cancel_item | 정전 중 모바일 라운드가 서버에 추가됨 | base_updated_at → 409 STALE_WRITE(서버 기존 가드) → skip | ⚠ "품목 변경 미적용 — 주문이 다른 곳에서 바뀜, 확인" |
| move_table | 목적지에 모바일 주문이 앉음 | onOccupied:'block' → 409 DEST_OCCUPIED → skip | ⚠ "테이블 이동 미적용 — 목적지 점유됨" |
| 공통 | 재전송(응답 유실) | op_id/idem 가드 → deduped no-op | 없음 |

표면화 = `getFailedOps()` + skipped 노트 → OfflineOrdersPanel "동기화 확인 필요" 목록(사유 한국어/영어 문구 매핑 + [확인] dismiss). **정책 원칙: 재생은 절대 서버측 사실(돈·종결 상태)을 이기지 않는다(서버 우선), 대신 반드시 사람에게 보고한다(I6).** last-writer는 비터미널 set_stage에만 허용(주방 단계는 저위험·자가치유).

### 15-7. 구현 순서 (안전 순 — 각 단계 독립 검증 후 다음)

1. **P0 — 기존 결함 수정**(§15-1: sync 블록 버그·add_items 키·forceMerge 멱등) + §15-4 offlineSync/Store 정비. 검증: 기존 오프라인 create 회귀(health-check + 수동 재생) — 인쇄 무접촉.
2. **P1 — 백엔드 가드 일괄**(§15-3 A·C·F·G — 인쇄 블록 제외): op_id 멱등 + terminal 게이트 + settle_full. 검증: health-check 신설 `--category=offline`(§15-9) + 88/88 + **print-route-guard 21/21**(온라인 인쇄 무회귀 증명). 🔒 orders-crud diff → print-guard bless #1.
3. **P2 🔒 — 인쇄 절단면**(§15-3 B·E + C의 스킵 게이트): printed_offline 3곳. **여기서 실프린터 체크포인트**: 매장 방문 1회에 §15-9 인쇄 매트릭스 전부 몰아서(CLAUDE.md "왕복 1회" 원칙). Irene 종이 확인 → bless #2.
4. **P3 — 편집 호출부 분기 + 로컬 인쇄 헬퍼**(§15-5 표 ①~⑯). 검증: dev 시뮬(오프라인 강제) E2E + 실프린터는 P2 방문에 통합 가능하면 통합.
5. **P4 — 오버레이 + 스냅샷 + 배지 + 실패 표면화**(§15-5 ①②⑦, §15-6 패널). 검증: headless mount sweep(POS/LiveOrders/FloorPlan/KDS crash 0) + E2E.
6. **P5 — Fable 검증 게이트**(전 기준 해당: 🔒·돈·아키텍처) → `/검증 --e2e` 3회 연속 100% → Irene `/배포`.

### 15-8. 범위 가드레일 ("완전"의 경계 — 이 밖은 A안 완전판에도 없음)

- **다기기 오프라인 실시간 동기화 없음**(§1-2 물리 불가 — POS1 단일 허브, 타기기 OfflineLockOverlay 유지).
- **모바일/QR 손님 주문 오프라인 없음**(손님 폰이 인터넷 필요), **모바일 결제 증빙 검증/거절 오프라인 없음**(§15-5 ⑯).
- **카드 실승인 없음**(기록만 — 기존 원칙), **포인트/쿠폰/할인 신규 적용 오프라인 없음**(서버 검증 필수 — 기존 할인·쿠폰은 동결 유지), `apply-discount` 라우트 무접촉.
- **오프라인 머지 없음**: move-table onOccupied는 block 고정, forceMerge 선택 UI는 오프라인에서 "이미 알던 주문"(오버레이 표시분)에만.
- **DELETE /:id·merge-items·KDS(파일)·billPrint·useAutoPrintPoller·MainLayout·POSTerminal 인쇄블록 = 무접촉.** 인쇄 보호 8파일 중 diff 발생은 orders-crud.js **단 1개**여야 하며, print-guard가 그 외 diff를 잡으면 사고로 간주·롤백.
- **재고 확정 차감·정산 리포트 오프라인 재현 없음**(복구 후 서버 몫 — 기존 §1-2).

### 15-9. 검증 계획 (완료 선언의 정의)

**A. health-check 신설 `--category=offline` (데모 매장 id=38, orphan sweep 멱등 — print 카테고리 패턴 미러):**
1. add_items 동일 op_id 2회 → 품목 1회만 증가 + 2번째 `deduped:true`
2. add_items `op_id+printed_offline` → 추가 품목 전원 printed_at 有 + needs_print **사전값 보존** (사전 true/false 두 케이스)
3. pay 동일 op_id 2회 → OrderPayment 1 row·amount_paid 1회 (기존 print 계약에 있으면 offline로 이관/공유)
4. pay `settle_full` + 근사부족액 → payment_status completed
5. set_stage 동일 op_id 2회 → 1회 적용 / completed 주문에 op_id set_stage(preparing) → `skipped:'terminal-state'` + 상태 불변
6. cancel(op_id+printed_offline) → needs_print/pending_reprint **미설정** / printed_offline 없이 → 기존대로 설정
7. move-table 동일 op_id 2회 → 1회 이동 + deduped / printed_offline → pending_reprint 미설정
8. create forceMerge 동일 idempotency_key 2회 → 1회 머지
9. PATCH /items op_id dedup + base_updated_at 드리프트 → 409 STALE_WRITE
10. op_id 없는 요청 전부 → 종전 응답과 동일(스코프 격리 증명)

**B. 자동 게이트**: 기존 88/88 + print 8 + **print-route-guard 21/21** + check-print-guard(orders-crud만 diff→bless) + check-design-guard + build:dev + headless mount sweep.

**C. 오프라인 E2E (Playwright, dev seam __offlineStore/__offlineSync, /api abort로 오프라인 시뮬, 3회 연속 100%):**
- 기존주문에 오프라인 라운드 → 오버레이 즉시 표시(품목+근사총액+배지) → 복구 → 서버 품목 1회 반영·배지 소멸·중복 0
- 오프라인 단계이동/취소/이동/결제 각각 → 복구 → 정확히 1회 적용
- 오프라인 라운드+완납 → 복구 → completed·OrderPayment 1건·이중청구 0
- 재생 중 탭 강제종료 → 재기동 → 잔여 op만 재생(중복 0)
- 충돌 4종(§15-6) → skip + 패널 표면화 확인
- 정전 중 새로고침 → 스냅샷 하이드레이트로 기존 테이블 표시
- 온라인 평상시(op 0) → 오버레이 경로 미작동·화면 종전 동일

**D. 실프린터 (Irene 눈 — 매장 방문 1회에 전부):**
① 오프라인 신규주문 → 티켓 1장, 복구 후 재인쇄 0 (기존 기능 회귀 확인) ② 오프라인 라운드(기존 주문) → 라운드 티켓 1장, 복구 후 0 ③ 오프라인 취소(주방 발행됐던 주문) → CANCELLED 안내 1장, 복구 후 0 ④ 오프라인 테이블이동 → TABLE CHANGED 1장, 복구 후 0 ⑤ 프린터 전원 OFF 상태로 오프라인 라운드 → 복구 후 폴러가 정확히 1장(zero 방지 경로) ⑥ 온라인 회귀: 일반 주문/라운드/취소/이동 인쇄 종전과 동일.

**E. 배포**: 마이그레이션 0(ProcessedOp 기존) → sync-database 불필요. SW 버전 bump. 운영 배포는 Irene `/배포`만.

---

## 16. 오프라인 오탐 원인 가시화 — health 한도 제외 + 기기 기록·복구 시 전송 (2026-10-30 Fable 설계 · Irene «권고대로»)

> 배경: 운영에서 보조기기 잠금 화면(«Offline — orders are handled by the main POS»)이 인터넷이 멀쩡한데 떴다. 운영 서버는 지금 Cloudflare 없이 nginx 직결, 부하·메모리 정상, 백엔드 재시작 0. 실측으로 확인된 **구조적 후보 1개**: `/api/health` 가 `app.use('/api/', apiLimiter)`(IP당 15분 5000회) **뒤**에 정의돼 한도에 세어진다 — 매장 전 기기가 한 공인 IP 라 한도를 넘기면 연결 확인 자체가 429 → 3회 연속 → 잠금. **운영이 실제로 429 였는지는 확인 못 함**(nginx 로그는 root). 그래서 ① 그 후보를 제거하고 ② 다음 재발 때 기기가 «왜·언제» 를 남겨 서버로 올리게 한다. 운영 배포는 다음 배포 때(이 설계 범위 밖).

### 16-0. 바뀌지 않는 것 (가드레일)
- `OfflineContext.tsx` 의 판정 상수(8s 간격 · 6s 타임아웃 · 연속 3회) · 상태 머신 · `runSync` 호출 — **그대로**. 이번 일은 «기록» 을 끼우는 것이지 «판정» 을 바꾸는 게 아니다.
- `OfflineLockOverlay.tsx` · `offlineMainPos.ts` · 문구(i18n) — 무접촉. 사용자에게 보이는 화면 변화 0.
- `apiLimiter` 의 `max`·`windowMs` · `authLimiter`·`pinLimiter`·`mobileOrderLimiter` · `app.set('trust proxy', 1)` 값 — 그대로(nginx 가 앞에 있으니 1 이 맞다).
- 🔒 인쇄 보호파일 8개 · KDS 단계 로직 — 열지 않는다. 새 DB 테이블·ENUM 변경 **없음**(기존 `system_logs` 재사용, category 는 기존 값 `system`).
- 새 UI 화면 없음. 읽기는 기존 System Admin ▸ System Logs 화면.

### 16-1. 서버 — health 를 한도에서 뺀다 (`dev-backend/server.js`)
1. `apiLimiter`(188행 부근)에 `skip` 추가 — 라우트 위치는 옮기지 않는다(diff 최소, 의도가 한 곳에 보임):
   ```js
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 5000,
     // 2026-10-30: 연결 확인 핑(/api/health)은 세지 않는다 — 한도가 차면 «연결 끊김» 으로 오판돼 보조기기가 잠겼다(§16).
     skip: (req) => req.originalUrl.split('?')[0] === '/api/health',
     ...
   ```
   (`req.path` 는 마운트 경로가 잘려 `/health` 가 되므로 `originalUrl` 로 비교.)
2. 75행 주석만 고친다: `// Nginx 프록시 신뢰 (Rate Limiter 가 손님 공인 IP 를 보게) — Cloudflare 는 2026-10 현재 미사용`. 값은 그대로 `1`.
3. health 응답 내용·위치(411행)·다른 미들웨어(helmet·securityHeaders·sqlInjectionProtection)는 그대로 — GET 이라 body 파서도 무관. **더 뺄 것 없음.**
4. **(Fable 보완 2026-10-30 18:1x UTC) 한도 키를 손님 실주소로** — 같은 `apiLimiter` 에 `keyGenerator: (req) => clientIp(req) || req.ip` 한 줄(`utils/clientIp` 는 이미 Cloudflare 대역이면 `CF-Connecting-IP`, 아니면 nginx 가 덮어쓴 `X-Real-IP` 를 쓴다 — 위조 차단 포함). 이유: `trust proxy 1` + nginx `$proxy_add_x_forwarded_for` 라 **Cloudflare 를 켜면 `req.ip` 가 Cloudflare 지점 주소**가 되어 전 매장·전 방문자가 한 주소로 15분 5000회를 나눠 쓴다 → 그때 다른 API 까지 429 = Irene 가 말한 «켜면 엄청 느리고 자꾸 오프라인» 의 구조적 후보. 지금(DNS only)은 `clientIp(req)` 와 `req.ip` 가 같아 **동작 변화 0**, 켜는 날부터 효과. 10-29 판단서 §6 의 권고를 이 묶음에 넣는다(같은 파일·같은 게이트). `authLimiter`·`pinLimiter`·`mobileOrderLimiter` 도 같은 키를 쓴다 — 한 줄씩, 값은 그대로.

### 16-2. 프론트 — 연결 확인은 «순수 도달 검사» 로 (`dev-frontend/src/utils/httpClient.ts`)
- `POS_BYPASS_PATHS` 에 `'/api/health'` 한 줄 추가 → 핑에 Authorization 토큰을 싣지 않는다(서버 health 는 토큰을 보지 않으므로 동작 변화 0; 연결 확인이 로그인 상태와 무관해진다). GET dedupe 는 `?t=` 로 이미 매번 다른 키 — 손대지 않는다.

### 16-3. 프론트 — 기기 기록 (신규 `dev-frontend/src/utils/offlineEvents.ts`, 100줄 안팎)
**저장소**: `localStorage['offline_events_v1']` = `OfflineEvent[]`. **상한**: 최대 30건 · 직렬화 32KB(넘으면 오래된 것부터 버림). 보낸 건은 지운다(전송 실패분만 남음).
**한 건 모양**(이 키만 — 서버도 같은 화이트리스트로 받는다):
```ts
interface ProbeFail { at: string; kind: 'timeout'|'http'|'network'; status?: number; ms: number; retryAfter?: string; rlRemaining?: string; }
interface OfflineEvent {
  id: string;            // crypto.randomUUID() (없으면 Date.now()+random)
  startedAt: string;     // ISO — 오프라인 판정 순간
  recoveredAt?: string;  // ISO — 복구 순간 (없으면 아직 오프라인/새로고침으로 끊김)
  durationMs?: number;
  recoveredBy?: 'ping'|'reload';   // reload = 오프라인 중 새로고침 뒤 첫 핑 성공으로 닫힘
  trigger: 'probe'|'navigator_offline'|'offline_event';   // 3회 실패 / navigator.onLine false / window 'offline'
  probes: ProbeFail[];   // 판정 직전 실패 ≤3건 (trigger 가 probe 가 아니면 비어 있을 수 있음)
  navigatorOnLine: boolean;
  path: string;          // location.pathname 만 (query 제외, ≤120자)
  mainPos: boolean;      // isOfflineMainPos()
  swVersion: string|null;// navigator.serviceWorker?.controller 가 있으면 sw.js SW_VERSION 을 알 길이 없으므로 null 허용 — 빌드 식별은 ua+timestamp 로 충분
  ua: string;            // navigator.userAgent ≤200자
  storeId?: number;      // localStorage 'user' 의 restaurant_id 가 있으면 (try/catch)
  // ── Fable 보완(2026-10-30 18:1x UTC) — «로그인 직후 큰 내려받기에 핑이 묻혔나» 와 «기기가 어디·어떤 회선인가» 를 가르는 6개. 전부 선택·try/catch.
  sinceLoadMs?: number;  // performance.now() at startedAt — 화면을 연 지 몇 초 만에 오프라인이 됐나(«포스 로그인하면» 가설)
  visibility?: 'visible'|'hidden'; // document.visibilityState — 숨은 탭은 브라우저가 타이머·요청을 늦춘다
  conn?: { type?: string; rtt?: number; downlink?: number }; // navigator.connection(크롬·안드로이드만) effectiveType·rtt·downlink
  tz?: string;           // Intl.DateTimeFormat().resolvedOptions().timeZone ≤40자 — 한국/말레이시아 기기 구분
  role?: string;         // localStorage 'user' 의 role ≤40자 — 브랜드/매장/오너 (BG 는 메인 POS 가 없어 항상 잠금)
  slowRes?: { n: number; maxMs: number; maxName: string }; // startedAt 직전 30초 안에 시작된 리소스(performance.getEntriesByType('resource')) 중 3초 넘게 걸린 것(**/api/health 제외** — 시간 초과된 연결 확인 자체가 세어지면 모든 timeout 에서 n≥1 이 돼 신호가 사라진다, Fable 재검증 2026-10-30)의 수·최장 ms·그 이름(경로 끝 ≤80자) — 번들·이미지 내려받기가 핑을 가렸는지
}
```
**함수**:
- `noteProbeFailure(f: ProbeFail)` — 메모리 링(최근 3건)에 쌓는다. 성공 핑에서 `clearProbeFailures()`.
- `recordOfflineStart(trigger)` — 열린 건(`recoveredAt` 없음)이 이미 있으면 새로 만들지 않는다(중복 방지). 링의 실패 3건을 `probes` 로 넣고 저장.
- `recordOfflineEnd(by: 'ping'|'reload')` — 열린 건에 `recoveredAt`·`durationMs`·`recoveredBy` 를 채운다.
- `flushOfflineEvents()` — `getAuthToken()` 이 없으면 아무것도 안 함(토큰 없이 보내면 401 → 자동 로그아웃 경로를 건드리므로). 닫힌 건만 ≤20건씩 `POST /api/offline-events { events }` → 2xx 면 그 id 들을 지운다. 실패하면 그대로 둔다(다음 복구·다음 앱 시작에 재시도). 예외는 전부 삼킨다 — **이 유틸은 절대 throw 하지 않는다**(판정 로직을 깨면 안 된다).

### 16-4. 프론트 — 끼우는 자리 (`dev-frontend/src/contexts/OfflineContext.tsx`, 10줄 안팎)
- `ping()` 의 `navigator.onLine === false` 분기: `goOffline('navigator_offline')`.
- `res.ok` 아님: `noteProbeFailure({ at, kind:'http', status: res.status, ms, retryAfter: res.headers.get('Retry-After') ?? undefined, rlRemaining: res.headers.get('RateLimit-Remaining') ?? undefined })` 뒤 기존 카운트 로직 → 임계 도달 시 `goOffline('probe')`.
- `catch (e)`: `kind: e?.name === 'AbortError' ? 'timeout' : 'network'`.
- `res.ok`: `clearProbeFailures()`; **첫 성공 핑**(마운트 뒤 1회)에서 열린 건이 남아 있으면 `recordOfflineEnd('reload')` 후 `flushOfflineEvents()`.
- `goOffline(trigger)` 에서 상태 전환 직후 `recordOfflineStart(trigger)`. `window 'offline'` 핸들러는 `goOffline('offline_event')`.
- `goOnline()` 의 `if (was)` 블록: 기존 `runSync` 그대로 두고, 그 **옆에** `recordOfflineEnd('ping'); flushOfflineEvents().catch(()=>{})` — runSync 를 기다리지 않는다(둘은 독립).
- `ms` 는 fetch 전후 `performance.now()` 차.

### 16-5. 서버 — 받는 곳 (신규 `dev-backend/routes/offline-events.js` + `server.js` 마운트 1줄)
- 마운트(진단 라우트들 옆, 586~588행 근처): `app.use('/api/offline-events', offlineEventsLimiter, authenticateToken, require('./routes/offline-events'));`
  - `offlineEventsLimiter = rateLimit({ windowMs: 15*60*1000, max: 60, message: { success:false, message:'Too many reports' } })` — IP당. 한도에 걸린 기기는 기록을 지우지 않고 다음에 다시 보낸다.
  - 인증: `authenticateToken` 만(모든 로그인 직원·관리자 기기가 보고 주체 — KDS·보조 POS 포함). `checkRestaurantAccess` 불필요: 매장 데이터에 닿지 않고, `storeId` 는 «기기가 주장한 값» 으로 details 에만 적는다. 읽기는 System Admin 전용(기존 `/api/system-logs`)이라 노출 경계 없음.
- `POST /` — body `{ events: OfflineEvent[] }`:
  - 검증(직접 화이트리스트 — 중첩 배열이라 express-validator 보다 짧고 명확): `events` 가 배열 · 1~20건; 건마다 §16-3 키만 골라 담고(미지 키 버림 — Fable 보완 6개 `sinceLoadMs`·`visibility`(enum)·`conn`(3키·문자열 ≤20·숫자)·`tz`·`role`·`slowRes`(n·maxMs 숫자 · maxName ≤80) 도 같은 식으로 받는다), 타입 검사(문자열 ≤300자 로 자름, 숫자는 유한, `probes` ≤3 · kind/trigger 는 enum), 골라 담은 결과의 `JSON.stringify` 길이 > 3000 이면 그 건만 거부. `id`·`startedAt`·`trigger` 없으면 그 건 거부. 전부 거부·배열 아님 → 400 `{success:false,message}`.
  - 중복 방지: `SystemLog.findOne({ where:{ service:'offline-detect', request_id: ev.id } })` 있으면 skip(응답 유실로 재전송된 건).
  - 저장: `systemLogger.warn('system', 'offline-detect', message, details, meta)` — level **warning**(error 면 시간당 메일 알림이 나간다 — 외부 발송은 이 설계 범위 밖, 쓰지 않는다).
    - `message`: `` `Device offline ${Math.round((durationMs||0)/1000)}s · trigger=${trigger} · first=${probes[0]?.kind ?? '-'}${probes[0]?.status ? '/'+probes[0].status : ''} · ${mainPos?'main':'sub'} · ${path}` ``
    - `details`: 정제된 event + `{ receivedAt: new Date().toISOString() }`
    - `meta`: `{ userId: req.user.id, userName: req.user.name||req.user.email, ipAddress: clientIp(req) (utils/clientIp), userAgent: ev.ua, requestId: ev.id, duration: ev.durationMs, statusCode: ev.probes?.[0]?.status }`
  - 응답: `res.json({ success:true, data:{ accepted, skipped, rejected } })`. 표준 형식(`error:` 키 금지).
- 이 라우트는 **새 인증 라우트 = 보안 경계** → 구현 뒤 `check-sensitive-diff` 가 FABLE 게이트 대상으로 잡는 게 정상. Fable 검증 1회(§16-7 숫자를 넘긴다).

### 16-6. 읽는 법 (Irene·우리)
- 화면: System Admin ▸ `/pos/admin/logs` → Service 필터 `offline-detect` (기존 화면, 변경 0). 한 줄 = 기기 1대의 오프라인 1회. message 에 지속시간·방아쇠·첫 실패 종류/상태코드·메인/보조·화면이 보이고, details 펼치면 실패 3건의 시각·종류·ms·Retry-After 가 있다.
- SQL(개발·운영 공통, 읽기 전용): `SELECT timestamp,user_name,ip_address,message FROM system_logs WHERE service='offline-detect' ORDER BY timestamp DESC LIMIT 50;`
- 판독 가이드: `http/429` = 한도(이 수정으로 사라져야 함) · `timeout` 연속 = 서버 느림(같은 서버 PlanQ 재시작·메모리 압박 의심 — 시각을 pm2 로그와 맞춘다) · `network` = DNS/TLS/회선 · `offline_event`/`navigator_offline` = 기기 와이파이·절전.
- (Fable 보완) `timeout` + `sinceLoadMs` 작음(< 60초) + `slowRes.n` ≥ 1 = **화면 여는 순간의 큰 내려받기(번들 1MB·메뉴 이미지)가 같은 HTTP/2 연결에서 핑을 밀어낸 것** — 서버가 아니라 기기↔서버 **회선 품질**(손실·지연) 문제. `tz`·`conn.rtt` 로 어느 나라·어떤 회선인지 본다. `recoveredBy='reload'` 인 행의 `durationMs` 는 믿지 않는다(기기를 껐다 켠 시간까지 들어감).

### 16-7. 검증 (완료 선언의 정의 — 숫자로 남긴다)
**A. 서버 한도 제외**
1. `pm2 restart dev-backend` → `curl -sD - -o /dev/null https://dev.purplehere.com/api/health` 에 `RateLimit-Limit`/`RateLimit-Remaining` 헤더가 **없다**(한도에 세이면 standardHeaders 가 붙는다 — 이게 skip 의 직접 증거). 다른 `/api/*` GET 엔 헤더가 **있다**(한도 살아 있음).
2. 고장주입(dev 파일 임시 수정 → restart → 측정 → 원복 → restart, `git diff` 로 의도 줄만 남았는지 확인):
   - `max: 5` 로 낮춤 → `/api/restaurants` 류 아무 API 6회 → 6번째 **429** (한도 작동) · 같은 상태에서 `/api/health` 20회 → **20/20 200** (제외 작동).
   - skip 줄을 지움(max 5 유지) → `/api/health` 6번째 **429** (반증: 가드를 빼면 실제로 실패) → 둘 다 원복.
**B. 기기 기록·전송 (Playwright, dev 데모 매장 38 `restaurant` 역할, 보조기기 = `offline_main_pos` 미설정)**
3. `page.route('**/api/health**', r => r.fulfill({status:429, headers:{'Retry-After':'900','RateLimit-Remaining':'0'}, body:'{}'}))` → ≤30초 안에 잠금 오버레이 표시 → `localStorage.offline_events_v1` 1건: `trigger='probe'`, `probes.length=3`, `probes[0].kind='http'`, `status=429`, `retryAfter='900'`, `recoveredAt` 없음.
4. `unroute` → ≤10초 안에 오버레이 소멸 → `page.waitForRequest(POST /api/offline-events)` 응답 200 `accepted:1` → localStorage 비어 있음 → DB `system_logs` 에 `service='offline-detect' AND request_id=<id>` 1행, `level='warning'`, `user_id` = 시험 계정.
5. 같은 식으로 `route.abort()` → `kind='network'` / 7초 지연 뒤 fulfill → `kind='timeout'` / `context.setOffline(true)` → `trigger='offline_event'` 각 1건.
6. 오프라인 중 새로고침: 3 상태에서 `page.reload()`(라우트 유지) → unroute → 첫 핑 성공 → 전송된 행의 `recoveredBy='reload'`.
7. 같은 id 두 번 POST → 두 번째 `skipped:1`, 행 1개. 상한: localStorage 에 40건 주입 → 30건만 남음.
8. 온라인 평상시(실패 0) → 네트워크 탭에 `/api/offline-events` 요청 0 · localStorage 키 없음(회귀 0).
**C. 보안·입력**
9. 익명 POST → 401 · 토큰 있고 `events` 가 배열 아님 → 400 · 3KB 넘는 건 1개 섞음 → `rejected:1` · 미지 키 → 저장 행 details 에 없음 · 한도: `max:3` 로 임시 낮춰 4번째 429(원복).
10. `health-check.js` 에 위 9 중 «익명 401 · 정상 200 accepted · 배열 아님 400» 3건 추가(시험 행은 끝에 `request_id` 로 삭제). 데모 계정만.
**D. 기계 게이트**: `check-print-guard` 변경 0(건드린 파일 중 보호파일 없음 — 뜨면 사고·원복) · `check-design-guard` · `verify-all`(health-check 새 3건 포함) · 프론트는 **코드 확정 → `build:dev` 1회 → `--full` 1회**, `sw.js` SW_VERSION 은 맨 마지막에 올린다 · `check-sensitive-diff` → 게이트 대상 뜨면 Fable 검증 1회.

### 16-8. 리스크 (사전 합의)
- **운영 원인이 429 였는지는 여전히 미확인.** 이 설계는 후보 1개 제거 + 다음 재발 때 원인이 기록으로 남게 하는 것. 재발 기록이 `timeout` 이면 서버 쪽(같은 서버 PlanQ 재시작·메모리)을 보고, `network/offline_event` 면 매장 와이파이 쪽이다.
- health 가 무제한이 된다: 응답이 작고 nginx 가 앞에 있어 실질 위험 낮음. 필요하면 나중에 nginx `limit_req` 로 — 지금은 안 한다.
- 전송 시 토큰이 만료돼 있으면 401 → httpClient 가 자동 로그아웃한다(다른 모든 API 와 같은 기존 동작). 토큰 없으면 안 보내는 것으로 최소 방어; 완전 회피는 범위 밖.
- 회선이 깜빡이는 매장은 기기당 한 번 끊길 때마다 1행 — 기기 30건·IP 60회/15분·system_logs 삭제 라우트가 상한. 합치기(coalesce)는 넣지 않는다(기록이 적을수록 원인 판독이 어려워진다).

### 16-9. 원인 판정 현황 — 2026-10-30 Irene 운영 «오프라인» (Fable 판정 · 18:1x UTC)
**결론: 원인은 확정하지 못했다. 서버 결함은 아니다. 가장 맞아떨어지는 후보는 «기기 ↔ 운영서버 직결 회선 품질(아시아 → 독일) + 화면 여는 순간의 큰 내려받기» 이고, 이 설계(§16)의 기록이 다음 재발 때 그것을 숫자로 가른다.**

| 사실 | 출처 | 뜻 |
|---|---|---|
| 운영 서버: 부하 0.01 · 메모리 4.4GB 여유 · 백엔드 재시작 0 · health 0.05초(DB 안 씀) · nginx limit_req 없음 | Opus ssh 읽기 | 서버가 24초 넘게 못 받은 적 없음 |
| Irene(브랜드 제너럴) 요청이 15:25~15:52 UTC 끊김 없이 처리됨 | 운영 out.log | 서버는 그 시간 그 계정을 계속 받았다 |
| 운영 직결 = TLS 1.3 · **HTTP/2 한 연결** · 인증서 정상(12-08 까지) · DNS 300초 | Fable curl | 한 연결에 핑과 번들·이미지가 같이 탄다 — 패킷 손실이 있으면 핑도 같이 멈춘다(HTTP/2 는 TCP 손실에 전부 묶임) |
| 바깥 측정 `/api/health`: 일본 0.77초 5/5 · 싱가포르 0.9~2.3초 5/5 · **홍콩 3/5(2회 시간 초과)** · ICMP 전부 차단 | check-host(Opus) | 서버가 0.05초인데 아시아에서 1~2초·일부 시간 초과 = **아시아 → 독일 경로가 고르지 않다** |
| 잠금 화면은 «메인 POS 가 아닌 모든 기기» 에 뜬다 · 브랜드 제너럴은 메인 POS 지정 자체가 없다 | OfflineLockOverlay.tsx · offlineMainPos.ts | BG 로 들어간 기기는 핑 3회만 늦으면 **반드시** 전체 화면이 잠긴다(«브랜드제너럴로 뭘 하려는데 계속») |
| «포스 로그인하면» 그때만 · 다른 건 문제 없음 | Irene | 로그인 직후 = 번들 1MB·청크·메뉴 이미지·설정을 한꺼번에 내려받는 순간. 그 뒤 한가할 땐 핑이 잘 간다 |
| Cloudflare 켜져 있을 땐 «엄청 느리고 자꾸 오프라인» | Irene | `trust proxy 1` 이라 Cloudflare 경유 시 req.ip = Cloudflare 지점 주소 → 전 매장이 15분 5000회를 나눠 씀(→ §16-1-4) + 말레이시아 지점 장애(10-29 판단서) |
| Opus 재현(60초, 오프라인 없음)은 운영서버와 같은 독일 데이터센터에서 돌림 | Opus | Irene 의 경로를 대표하지 못한다 — 재현 실패가 «문제 없음» 의 증거가 아니다 |
| 운영 429 발생 여부 · Irene 기기의 실패 종류(시간 초과/거절/회선) | 없음 — nginx 기록은 root 전용, 기기 기록 없음 | **이 공백을 §16 이 메운다** |

**순위:** ① 회선 품질 + 로그인 직후 내려받기 겹침(`timeout`) ② 한도 429(`http/429` — Irene 혼자서는 5000 을 못 채우므로 지금은 낮음, Cloudflare 켜면 높음) ③ 기기 와이파이·절전(`offline_event`). 기록이 쌓이면 이 순서를 바꾼다.
**그 외 조사 사실(이번엔 안 건드림):** 운영 error.log 에 `[AUTH] No token found in request` 가 연속으로 많이 찍힘 — 토큰 없는 요청이 보호 경로를 두드린 것(로그아웃 뒤 남은 폴링 또는 봇). 오프라인과 무관하나 다음 평소 작업 때 출처 1회 확인. nginx `listen 443 ssl` 에 http2 가 안 적혀 있는데 h2 가 협상됨 — 같은 포트의 다른 server 블록(planq.kr 또는 purplehere-ip)이 켠 것, 이상 아님.
**Cloudflare 다시 켤 조건(10-29 §4)에 1개 추가:** §16-1-4(한도 키 = 손님 실주소)가 운영에 배포된 뒤에만 켠다.
