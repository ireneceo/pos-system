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
