# Fable 게이트 판정 — 2026-11-02 DB 연결 풀 5개 사고(발주 «전체 확정» 서버 멈춤)

**판정: PASS** (Fable 5.1 · 2026-11-02 17:50 UTC · 읽기·개발서버 실행만, 코드 변경·운영 쓰기 없음)

Irene 원문: «지금 계속 다 느려. 데이터들 제대로 안나오고. 운영서버 로딩 다 느려서 쓸 수가 없어. 확인해줘.»

대상 2파일(이 일의 것만): `dev-backend/config/database.js` · `dev-backend/utils/poOwnerApproval.js`
게이트 지문(판정 시 워킹트리 8건 변경 포함): `2c041b678040` → 이 판정문 저장 뒤 마커를 찍었으므로 마커 지문은 `fable-gate.js status` 가 진실.

---

## 1. diff 범위 대조 — 설계 밖 변경 0

| 파일 | 바뀐 것 | 판정 |
|---|---|---|
| config/database.js | `IS_LONG_RUNNING_SERVER` 가 `process.argv[1]` 만 보던 것을 `require.main.filename` 도 보게(둘 중 하나가 `server.js` 면 서버) + 시작 로그 «Pool max: N (server/script)» 1줄 + 주석 | 최소 변경. 풀 크기 숫자(20/5·min 2/0·acquire 60s)는 **안 바꿈** — 2026-09-17 `1e43a29fd` 가 의도했던 «서버 20 / 스크립트 5» 가 pm2 아래서 처음으로 실제 적용되는 것 |
| utils/poOwnerApproval.js | `resolveOwnerRestaurantIds(user, t)` · `restaurantHasOwner(restaurantId, t)` 에 선택 인자 `t` → 쿼리 옵션 `transaction: t`. 트랜잭션 안에서 부르는 3곳(`evaluateApproval` 93 · `applySubmitGate` 193 · `applyBuyerAmendGate` 285)만 `t` 전달 | 로직 변화 0(판정 결과 동일, 어느 연결로 읽느냐만 바뀜). `t` 없이 부르는 나머지 호출부(approval.js 47·96·100 · recurring.js 50 · crud.js 430 · `isPoMasterLocked` 339-340 · `isApprovalRequiredForRestaurant` 51)는 `transaction: undefined` = 예전과 같음 |

다른 파일 접촉 0. 🔒 인쇄 보호파일: `check-print-guard.js` **8/8 변경 없음**. 마이그레이션 없음. 프론트 변경 없음(SW bump 불필요).

## 2. 원인 확정 — 추정이 아니라 실측

**결함 ①: pm2 fork 아래서 `process.argv[1]` 은 server.js 가 아니다.**
- `/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js:17` `process.title = 'node ' + pm_exec_path` · `:33` `require('module')._load(pm_exec_path, null, true)` — 제목만 바꾸고 argv 는 안 바꾼다.
- **직접 증명(개발서버, 일회용 pm2 프로세스 띄웠다 지움):** `{"argv1":"/usr/lib/node_modules/pm2/lib/ProcessContainerFork.js","main":"/tmp/fable-argv-probe.js","title":"node /tmp/fable-argv-probe.js"}` → `require.main.filename` 이 진입 파일을 가리킨다. `/proc/<pid>/cmdline` 이 «node …/server.js» 로 보이는 것은 title 이라 **cmdline 으로는 못 알아챈다**(그래서 9-17 이후 아무도 못 봤다).
- 결과: 2026-09-17 이후 **운영·개발 서버 모두 풀 max 5** 로 돌았다. 운영 `production-backend/config/database.js:4` 는 지금도 옛 줄(읽기 확인). 개발은 수정 후 시작 로그 «Pool max: 20 (server)».

**결함 ②: 발주 제출 트랜잭션이 연결 1개를 쥔 채 트랜잭션 밖 쿼리로 연결을 하나 더 달라고 한다.**
- `mark-sent-external`(workflow.js:372 `transaction()` → 390 `applySubmitGate(po, t)` → `evaluateApproval` → `restaurantHasOwner` **t 없음**). 동시 요청이 풀 크기 이상이면 전원이 서로의 연결을 기다리다 acquire 60초에 전부 실패 = 풀 데드락. 그동안 **인증 미들웨어까지** 연결을 못 얻어 DB 쓰는 모든 API 가 멈춘다(DB 안 쓰는 /api/health 만 살아 있던 nginx 관찰과 일치).

**운영 로그 대조(읽기만, `/var/www/logs/production/error.log` — pm2 기본 로그 경로가 아니라 처음엔 0건으로 보였음):**
- `2026-11-02 15:42:30 +00:00` 에 `ConnectionAcquireTimeoutError` **6건 동시** — `mark-sent-external error` · `POST /api/purchase-orders/:id/submit error` · **`[AUTH] Token verification error: Operation timeout`**. 스택: `restaurantHasOwner (poOwnerApproval.js:35) ← isApprovalRequiredForRestaurant (:49) ← applySubmitGate (:81) ← purchase-orders-workflow.js:389` (운영은 옛 판 경로지만 같은 자리 = 트랜잭션 안에서 t 없는 `restaurantHasOwner`).
- 15:41:30 시작 + acquire 60초 = 15:42:30 종료. nginx 관찰(15:41:30~15:42:30 데이터 API 완료 0건, 7건 60초 timeout)과 **초 단위로 일치**. 원인 확정.
- 운영 MySQL 자체는 여유(max_connections 151 · Max_used 34 · Threads 5) — 병목은 MySQL 이 아니라 **앱 안의 5개 풀**이었다.

## 3. 실호출·회귀 — 내가 직접 돌린 것

- **재현 스크립트 재실행**(데모 매장 38 · `[확인용] 동시 보냄 재현` 초안 생성 → 동시 `mark-sent-external` → 삭제): N=7 **7/7 200, 최장 0.29초**, 그동안 badge-counts 최장 28ms. N=20 **20/20 200, 최장 0.61초**, badge-counts 최장 328ms. 정리 후 남은 시험 발주 **0**(DB 직접 조회로 확인).
- 작업 모델 측 반증(고장주입) 기록을 그대로 인정: (a) 풀 20 + 결함② 되돌림 N=25 전부 200 → ①만으로도 7건은 안 멈춤 (b) 풀 5 강제 + ② 유지 N=7 다시 멈춤 → ②만으로는 부족(트랜잭션 밖 쿼리가 더 있다). 개발 error.log 에 수정 전 `ConnectionAcquireTimeoutError` 6건(`purchase-orders-workflow.js:372`) 남아 있음 = 수정 전 상태가 실제로 깨졌던 증거.
- `health-check --category=payment` 24/25 — 실패 1건 «직영 INTERNAL ④ … 열린 청구서» 는 검사 자신이 «데모 매장 38 에 열린 브랜드 청구서 1건 — 정리 시험이 그것까지 바꾸므로 멈춤» 이라고 스스로 중단한 **데이터 전제 실패**. 이 변경(풀·승인 쿼리 연결)과 무관하고 변경 전부터 같음(작업 모델이 HEAD 로 되돌려 재현). verify-all 21/23 중 다른 1건 deploy-ready 도 배포 기록 파일 부재로 변경 전부터.
- `check-sensitive-diff`: FABLE 게이트 대상 판정은 **워킹트리 전체**(다른 방 미커밋 auth.js·server.js 등 포함) 기준. 이 2파일 자체는 ②돈·주문 무결성(발주 제출 경로) 접촉이라 게이트 대상이 맞고, 위에서 검증했다.

## 4. 배포 안전성

- 백엔드 2파일만 · 마이그 없음 · ENUM 없음 · SW bump 불필요 · 롤백 = 2파일 되돌리기 + pm2 restart.
- 운영 영향: 재시작 직후 풀이 5→20. MySQL 151 에 여유 충분. **운영 재시작이 곧 수정 적용**(pm2 restart 가 argv 를 바꾸는 게 아니라 코드가 require.main 을 본다).
- 운영 반영: 다음 배포 때(이 방은 배포 명령을 실행하지 않는다).

## 5. 남는 위험 — PASS 를 막지 않지만 그대로 두면 안 되는 것 (다음 일로)

1. **같은 패턴이 하나 더 남아 있다.** `applySubmitGate` 208·235 `expectedDeliveryPatch(po)` → `orderSchedule` → `resolveSellers` 가 트랜잭션 밖. 그래서 풀 20 에서도 **동시 20건 이상** «전체 확정» 이면 같은 데드락이 다시 온다(고장주입 b 가 이걸 보여 줬다). 프론트 `PurchaseOrderStagingPage.tsx:467 submitAll = Promise.all` 이 초안 수를 그대로 동시 요청으로 쏘는 구조라 정기 발주로 초안이 많이 쌓인 매장이 위험. **권고:** 다음 일로 ② `expectedDeliveryPatch` 에 t 전달 + ③ `submitAll` 동시성 제한(순차 또는 3~5개)을 한 묶음으로. 둘 중 하나만으로도 재발 확률이 크게 줄지만 둘 다가 정석.
2. **개발서버 MySQL 천장 50.** 개발 서버 풀이 오늘부터 실제로 20 이 됐다(지금까지 5). 오늘 Max_used 47/50. PlanQ·Lingo 와 같이 살고 health-check·verify-all 이 스크립트 풀 5 를 따로 연다 → «Too many connections» 로 **게이트 검사가 코드와 무관하게 떨어질 수 있다**(database.js 81-84 주석이 이미 경고한 그 상황). 당장 조치 없음 — 다음 verify-all 에서 그 증상이 나오면 개발만 풀을 낮추는 env 스위치(예: `DB_POOL_MAX`)를 두는 것이 맞다. 운영 코드 분기 금지.
3. **«하루 종일 느림» 전부가 이것인가 — 확인 못 함.** 운영 error.log(오늘 03:30 UTC 부터) 에 acquire timeout 은 **15:42:30 한 번뿐**. 60초 멈춤 1회는 이것으로 설명되지만, 그 밖의 «계속 느림·데이터 안 나옴» 은 이 로그로는 증명되지 않는다. nginx 에 upstream 응답시간 칸이 없어 측정 불가. 이 변경이 그것까지 고친다고 보고하지 말 것 — 보고에 «60초 멈춤 1회 원인 확정·고침, 그 외 느림은 확인 못 함» 으로.
4. `isApprovalRequiredForRestaurant` 는 아직 t 를 안 받는다(지금 호출부는 GET 한 곳뿐이라 안전). 나중에 트랜잭션 안에서 부르면 같은 지뢰 — 1번 묶음 때 같이.

## 6. 검증 규율 4조항 대조

1. 코드 리뷰만 아님 — diff 대조 + 가드(print-guard 8/8) + 실호출(N=7·20 재현, 운영 로그 읽기) + 배포 안전성(위 4절) ✓
2. 반증 — 고장주입 (a)(b) 기록 인정 + pm2 argv 를 일회용 프로세스로 직접 증명 + 수정 전 개발 error.log 6건 ✓
3. 판정 기계 의심 — 운영 pm2 로그가 1월에 멈춘 파일이라 처음 0건 → 실제 로그 경로(`/var/www/logs/production/`) 찾아 19건 확인. 데모 청구서 전제로 멈춘 health 1건은 «통과» 로 세지 않음 ✓
4. 확인 못 한 것 — 5-3 명시 ✓

Fable 미호출 영역 없음(이 판정이 gate 1회). 설계 호출은 없었음 — 원인 확정형 작업이라 gate 1회로 충분.
