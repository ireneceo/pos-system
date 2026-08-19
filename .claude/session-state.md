# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-08-19 (결제 증빙 Confirm 버튼 죽어 있던 것 근본 수리 — **개발서버 검증 완료·운영 미배포**)
**직전 배포:** 2026-07-31 (v3.73 — 결제 원장 일원화 + 배포 스모크 실매장 오염 수리)
**버전:** **v3.73** (운영 — 2026-07-31) · 데스크탑앱 0.1.10 · 안드로이드앱 0.2.0
**작업 상태:** 완료. **운영 배포됨** (Backup `20260731_125916` · Smoke 9/9 · 4흐름 실검증 22/22)

### 진행 중인 작업
- 없음

### 완료(개발서버 검증까지) — 2026-08-19 · 운영 미배포

**결제 증빙 "Confirm Payment 버튼이 눌리지가 않아" 근본 수리 (with MIN Cafe #260819-010)**
- **근본**: `LiveOrdersPage.handleVerifyConfirm` 첫 줄이 **존재하지 않는 함수** `setAudioEnabled(false)` 호출.
  2026-06-05 알림음 단일화(a8272d06)에서 `audioEnabled` 가 useState → 파생 const 로 바뀌며 setter 는
  사라졌는데 호출만 남았다 → 클릭 즉시 ReferenceError → **요청이 아예 전송되지 않음**. **2.5개월 무증상.**
  운영 번들 `4765.de35128d.chunk.js` 에서 free identifier(축약 안 됨)로 확인 = 미정의 확정.
- **운영 실측**: 실패 구간(08:45~08:51 UTC) 이 주문 PATCH **서버 도달 0건**, 같은 매장 다른 주문 PATCH 2건은 성공
  → 백엔드/구독정지 무관. 결제는 08:51:40 다른 화면(Floor Plan/POS)으로 처리됨(원장 1행·`paid_at` 정상).
- **오해 제거**: `[handleInvoicePaid] subscription restored for restaurant 10` 로그는 **이미 active 여도 찍힌다**
  (`restoreSubscription` 미변경 시에도 success:true). 그리고 `checkSubscriptionStatus` 는 **어디에도 마운트 안 됨**.
- **수정 4가지**(Live Orders + Floor Plan 테이블 패널 양쪽 대칭):
  ①죽은 호출 제거 ②`res.ok`/`success:false` 확인 후 실패면 **모달 유지 + 모달 안에 사유 배너**
  (토스트는 모달 오버레이 뒤로 갈 수 있다) ③`fetchWithTimeout`(기존 유틸 재사용, 15s) — 무한대기로
  버튼이 영구 잠기는 것 차단 ④결제는 됐는데 주방 전송(`/status`)만 실패한 경우 구분 안내(티켓 미발행 방치 방지)
- **영구 안전망 신설**: `dev-backend/scripts/check-dead-handlers.js` + verify-all `dead-handlers` 등록.
  선언 없는 `setXxx(` 호출을 fail-closed 로 잡는다. **고장주입 검증**(주입 시 exit 1 / 복원 시 0).
  **왜 필요한가**: 이 프로젝트는 typescript 4.9.5 vs i18next TS5 `.d.ts` 로 **타입검사가 게이트 역할을 못 한다**
  (파서가 먼저 터지고 CRA 가 타입오류를 warning 으로만 낸다) → TS2304 가 아무것도 막지 못했다.
- **전수 스캔**: dev-frontend/src 562파일 중 같은 결함 **다른 곳 0건**.
- **검증**: 신규 e2e `payment-verification.spec.js`(FI-1 서버500 / FI-2 무응답hang / OK 정상) **3회 연속 3/3**
  · verify-all **15/15** · mount sweep(8역할+POS/manager) **통과, 크래시 0** · 🔒 인쇄 보호파일 **8/8 무접촉**
  · 백엔드 실패응답 shape 실호출 확인(404 "Order not found" / 401 "Access token required" / 200 success:true)
  · demo rid=38 전용(MARKER), 운영 데이터 무접촉
- ⚠️ **Fable 게이트 대상** (`check-sensitive-diff` 기계 판정: 기준 ② 돈·주문 무결성 접촉) — 배포 전 Fable 점검 권고
- 변경 파일: `LiveOrdersPage.tsx` · `PaymentVerificationModal.tsx` · `TableDetailPanel.tsx` ·
  `scripts/verify-all.js` · (신규) `scripts/check-dead-handlers.js` · (신규) `e2e/payment-verification.spec.js`
- **남은 별건(미수정, 승인 필요)**:
  ① `orders-crud.js:1136` 의 `actionType:'updated'` 가 OrderAction ENUM 에 없어 **PATCH /orders/:id 감사로그가
     전부 조용히 버려진다**(운영 로그 `Data truncated for column 'action_type'`). 🔒 보호파일 + 운영 ENUM 마이그 필요.
  ② `checkSubscriptionStatus` 미마운트 = 구독정지가 API 를 안 막는다(비즈니스 결정 필요).
  ③ 타입검사 복구(typescript 업그레이드 또는 i18next 타입 핀) — 이 게이트가 살아야 같은 클래스가 원천 차단된다.

### 완료된 작업 (이번 세션 — 2026-07-31)

**① 결제 원장 일원화 (v3.73 배포)**
- **근본**: 결제 완료 경로가 4개인데 원장(`order_payments`)을 쓰는 건 `POST /:id/payments` 하나뿐 →
  **결제 시각이 어디에도 기록되지 않았다**. 운영 실측: 결제완료 3개월 **5,904건 vs 원장 전 기간 5행**,
  `amount_paid` 는 8개월 통틀어 5건. PATCH 경로는 감사로그마저 `updated` 라 `payment_received` 도 없다.
- **해법**: 단일 헬퍼 `utils/orderPaymentLedger.js` 를 나머지 3경로(PATCH `/orders/:id`·PayPal·Stripe)가 호출.
  🔒 `orders-crud.js` 는 **4줄**(전이 전 상태 캡처 + 호출), 인쇄 블록 무접촉. `paid_at` = 이 설계의 산출물.
- **이중 계상 0**: 읽는 쪽 3곳(cash-management·dashboard·mallSales)이 이미 "원장 있으면 원장, 없으면 주문" 폴백
  → **IOI Mall tender 값 수학적으로 불변**(행 합계 = total_amount). 코드 실측으로 확인.
- **백필 안 함** — 옛 주문의 결제 시각은 존재하지 않는 값이라 채우면 날조. 자연 이관.
- 리더 대칭 수리: `computeExpected` ①·Z-Report 원장 카운트에 취소·삭제·staffMeal 제외 추가(②폴백과 대칭).
  원장이 생기며 발현될 비대칭을 선제 차단(staffMeal 이 기대금액에 잡히면 **가짜 부족 = 직원 횡령 누명**).

**② Fable 게이트 CONDITIONAL GO → 결함 2건 적발·수정**
- **P1** 온라인결제(PayPal·Stripe) 진입부 가드를 **동시 요청 2개가 통과** → 전액 원장 2행(Fable **10/10 재현**).
  게이트웨이 API 왕복(수백 ms)이 가드~기록 사이라 창이 넓고 `receipt_number` 유니크 제약도 없다.
  → **원자적 claim**(`where payment_status != completed`) 후 `affected===1` 인 승자만 원장·감사로그.
- **P2** 헬퍼가 tx-fatal(데드락)까지 삼켜 commit 이 터지고, 그 메시지가 `isRetryableError` 에 안 걸려
  `maxRetries:3` 이 **무력화** → retryable 이면 rethrow(롤백으로 원장도 초기화 = 멱등 유지).

**③ 🔎 고장주입이 내 테스트 허점을 2번 잡았다 (같은 실수 하루 2회)**
- 멱등 가드를 지워도 통과 → **금액 상한이 가드를 가리고 있었다**. 가드만이 막는 시나리오
  (결제완료 주문 총액 상승 → **유령 결제**)로 교체하니 검출.
- claim 조건을 지워도 통과 → **같은 값이면 MySQL 이 "변경 0행"** 을 돌려줘 우연히 막힘.
  실제 위험(서로 다른 `transaction_id` = 재시도·이중 capture)으로 교체하니 검출.
- → **계약 테스트는 고장주입까지가 한 세트.** 메모리 [[feedback_fault_injection_is_mandatory]] 신설.

**④ 🔒 배포 스모크가 실매장 인쇄 큐를 오염시키던 것 수리**
- 스모크 로그인 키 `test_restaurant_admin`(=`admin@kdine.com`) → **rid 5 = The Fire = 실영업 고객 매장**.
  계정 `is_test` 때문에 안전해 보였지만 매장은 실매장. 배포마다 RM1 주문 생성·취소 →
  **취소 안내표 재발행이 그 매장 주방 큐에 누적**(2026-06-04~07-31 **165건**). autoPrint 켰으면 유령 취소표.
- **수정(배포 하니스만, 인쇄 로직 무변경)**: ①키를 `demo_restaurant_admin`(rid 13, `is_demo=1`)로 교체
  ②**fail-loud `is_demo` 가드**(데모 아니면 중단+FAIL, 조용히 건너뛰기 금지) ③`print-dismiss`→`DELETE` 자기 정리
  ④`pending-print` 재조회로 **잔재 0 검증** ⑤`customer_name='__SMOKE__'` 마커(중간에 끊겨도 식별)
- **운영에서 최종 시퀀스 실행 검증**: 가드 PASS → 생성 → 취소(큐 진입 확인) → dismiss → delete → **잔재 0**
- **누적 401건 정리**(Fable 판정 후): 실매장 165 + 데모 236 soft-delete. **실매장 6~7월 취소 통계 165 → 1**.
  같은 큐의 실주문(16640 RM76.55) 보존. 부작용 0 실측. 스냅샷 `/var/www/backups/smoke99-before-cleanup-20260731.json`
- ⚠️ **API 취소로 정리하면 안 됨** — 취소 경로가 또 재발행을 만든다. DB 직접 UPDATE 가 정답(앱 로직 미경유).

**⑤ 검증**
- 계약 **10/10**(신규) · 돈 스위트 **62/62** · 고장주입 **4종 전부 검출**
- **운영 4흐름 22/22** — 주문관리(+Round 금액 재계산) · 단계이동 4단계 · 결제(원장 1행·`paid_at`·수납직원·
  중복 PATCH×3 멱등·마감 이중계상 0) · 프린트(큐 등장→claim→**2번째 거부**→소멸, 결제완료 품목추가 400 거부)
- verify-all **14/14** · 🔒 인쇄 라우트 **42/42** · 운영 인스펙션 **24/24** · print-guard bless(Irene 승인)
- 배포 파일 11개 전수 확인 · 프론트 변경 0(SW bump·재빌드 불필요) · 신규 마이그 0 · 롤백=호출 4곳 제거

**⑥ 운영 점검 + 소켓 전환 종료**
- 운영 백엔드가 오늘 06:15경 새로 뜬 정황 → [[reference_pm2_stale_env_dotenv]] 함정으로 소켓 강제 플래그가
  조용히 꺼질 수 있었다. **동작으로 증명**: 무토큰 4NS + 위조토큰 **5/5 거부**, 런타임 `true`, 인증 오류 로그 0
  → **소켓 전환 마무리 항목 종료**
- 인쇄 생명선 정상(미인쇄 누적은 `autoPrint=false` 매장의 정상 누적)

**⑦ 릴리즈 콘텐츠 등록** — 랜딩 블로그(운영 id=363, `release-v3.73`, published, HTTP 200) +
System Admin 공지(운영 id=70, `updates`, target_type=all, 수신자 7). 배포 도구 항목은 제외(Irene 지시).

### 📷 AI 사진 인식 — 실사용 0건, 정확도 미검증 (2026-07-31 실측)
> "배포 완료"는 맞지만 **제대로 되는지는 아무도 모른다**. v3.72 에서 내가 "운영 검증 완료"라고 한 것은
> API 200 + 임베딩 생성까지였고 **인식 정확도는 검증한 적이 없다** — 보고가 부정확했다.

- 진입점 ✅ 운영 번들에 "Find by photo"(Floor Plan > Items) · 라우트 ✅ · 요금제 게이트 ✅ 열림
- 학습 ✅ with MIN(rid10) **220장** · K-DINE(rid8) **76장** 임베딩 생성됨
- 🔴 `recognition_logs` **0행** = 매장에서 **한 번도 촬영된 적 없음**
- ⚠️ 방식 = **`local-color-v1`(색 비교)**. `AI_VISION_PROVIDER`·`VERTEX_PROJECT_ID` 미설정 = 진짜 AI 아님.
  색이 뚜렷이 다른 음식은 구분하나 **비슷한 색끼리(찌개류·흰 국물)는 못 가른다**

### 🙋 Irene 이 해야 할 일 (내가 못 하는 것만)

**1. AI 사진 인식 정확도 확인 (5분) — 지금 바로 가능**
- 매장에서 Floor Plan > Items > **"Find by photo"** 로 음식 5~10개 촬영
- 기록이 `recognition_logs` 에 남으므로 **내가 top1 적중률·헷갈리는 메뉴 쌍을 숫자로 뽑아준다**
- 이 데이터가 있어야 "이대로 쓸지 / Vertex 로 전환할지"가 데이터로 결정된다. **A 없이 B 로 가면 헛돈**

**2. 윈도우앱 0.1.10 실프린터 종이 확인 1회 — 우선순위 높음**
- https://purplehere.com/desktop/PurplePOS-Setup.exe · 빌 1장 + 긴 주방티켓 1장
- 볼 것: 글자·한글 정상 / 우측 회색 띠(스크롤바) 없음 / 같은 줄 두 번 없음 / 중간에 안 끊김
- 서버에 프린터가 없어 논리검증까지만 됐다. 이 확인 없이 매장에 주면 with MIN 좌초 사이클의 6번째

**3. Vertex 자격증명 (1번 결과가 부족하면)**
- GCP 프로젝트 ID + 서비스계정 JSON(역할 **Vertex AI User**) → 내가 배치·env·재학습까지 처리
- 비용 = 촬영당 과금, 안 쓰면 0원(매장당 월 US$1~7 추정)

**4. 결정 대기 (급하지 않음)**
- exe 코드서명 인증서 구매 여부 — 미서명이라 설치 시 SmartScreen 경고
- 안드로이드앱은 **테스트할 매장이 아예 없다** → 실기기 검증 7종은 테스트할 곳이 생겨야 진행

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **다음 `/배포` 때 확인할 것** — 스모크 수정분이 그때 처음 실전 적용된다. "Smoke 인쇄 큐 잔재 0" 초록불 확인
- **void PIN 게이트 API 레벨 우회**(미수정) — `PATCH /orders/:id {status:'cancelled'}` 는 게이트를 안 탄다
  (`/:id/status`·`DELETE /items/:i` 는 탄다). **실사용 UI 2곳은 게이트 라우트를 쓰므로 매장 보호는 작동 중**.
  고치려면 **시스템 취소(머지 흡수) vs 사용자 취소 구분**이 선행 — 그냥 걸면 테이블 머지가 깨진다. 별도 승인 건
- **환불 대비** — `refunded` 가 ENUM 에 없어 현재 도달 불가. 환불 기능 추가 시 `computeExpected` ①에 제외 필요(Fable 지적)
- 안드로이드 V4 폴러 자동인쇄 모순 → 실기기 방문 1회에 M3 7종과 묶어 검증(매장 왕복 1회 원칙)
- 안드로이드 `latest.json` 피드 + 인앱 업데이트 넛지(사이드로드 구버전 고착 방지)
- 마감 첫 사용 시 기대금액 실값 확인 1회(현재 교대 3건 전부 open, 마감 이력 0건)
- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage
  write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe)
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. 순서 엄수 = shadow 1주 → 목록+게이트 →
  `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후 [[reference_restaurant_access_four_gates]]
- rid=16 모바일 이월렛 QR 업로드 후 재오픈 · IOI Mall 가동(운영 자격증명 수령 시) ·
  `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물) · 운영시간+라스트오더 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전) · 개발서버 sudoers `visudo -c`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
