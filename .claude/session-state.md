# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-08-19 (결제 증빙 Confirm Payment 버튼이 죽어 있던 것 근본 수리 — **개발서버 검증 완료·운영 미배포**)
**직전 운영 배포:** 2026-07-31 (v3.73 — 결제 원장 일원화 + 배포 스모크 실매장 오염 수리)
**버전:** **v3.73** (운영 — 2026-07-31) · 데스크탑앱 0.1.10 · 안드로이드앱 0.2.0
**작업 상태:** 완료 (개발서버). **운영 배포 안 함** — Fable 검증 후 Irene `/배포` 지시 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-08-19)

**결제 증빙 "Confirm Payment 버튼이 눌리지가 않아" 근본 수리 (with MIN Cafe #260819-010, RM 128.02 bankTransfer)**

- **근본**: `LiveOrdersPage.handleVerifyConfirm` 첫 줄이 **존재하지 않는 함수** `setAudioEnabled(false)` 호출.
  2026-06-05 알림음 단일화(`a8272d06`)에서 `audioEnabled` 가 useState → 파생 const 로 바뀌며 setter 는
  사라졌는데 호출만 남았다 → **클릭 즉시 ReferenceError → 요청이 아예 전송되지 않음. 2.5개월 무증상.**
- **증거(추측 아님)**:
  - 운영 실측 — 실패 구간(08:45~08:51 UTC) 이 주문 PATCH **서버 도달 0건**, 같은 매장 다른 주문 PATCH 2건은 성공
    → 백엔드·DB·구독정지 전부 무관. 결제는 08:51:40 **다른 화면**(Floor Plan/POS)으로 처리됨(원장 1행·`paid_at` 정상).
  - 운영 번들 `4765.de35128d.chunk.js` 에 `setAudioEnabled` 가 **축약 안 된 free identifier** 로 존재
    (정상 지역변수는 `Ot`,`It` 로 축약) = 번들러 미해석 = 미정의 확정.
- **잘못된 단서 2개 제거(다음 세션 재조사 금지)**:
  - `[handleInvoicePaid] subscription restored for restaurant N` 로그는 **이미 active 여도 찍힌다**
    (`restoreSubscription` 이 미변경 시에도 `success:true` 반환). 정지 여부 근거로 쓰지 말 것.
  - `checkSubscriptionStatus` 는 export 만 되고 **어디에도 마운트돼 있지 않다** → 구독정지가 주문 API 를 안 막는다.
- **수정 4가지** (Live Orders + Floor Plan 테이블 패널 **대칭**):
  ① 죽은 호출 제거(결제 확인이 매장 알림음을 끌 이유 없음 — 끄면 새 주문 놓친다)
  ② `res.ok`/`success:false` 확인 → 실패면 **모달 유지 + 모달 안 사유 배너**(토스트는 모달 오버레이 뒤로 갈 수 있다)
  ③ `fetchWithTimeout`(기존 유틸 재사용, 15s) — 무한대기로 버튼이 영구 잠기는 경로 차단
  ④ 결제는 됐는데 주방 전송(`/status`)만 실패한 경우 구분 안내(티켓 미발행 방치 방지)
- **영구 안전망 신설**: `dev-backend/scripts/check-dead-handlers.js` + verify-all `dead-handlers` 등록(fail-closed).
  **고장주입 검증**(주입 시 exit 1 / 복원 시 exit 0). 첫 시도에서 주입이 **조용히 실패**해 "통과"로 보이던 것도
  잡아냄 → 주입에는 반드시 assert.
  **왜 필요한가**: 이 프로젝트는 `typescript@4.9.5` vs `i18next` TS5 `.d.ts` 로 파서가 먼저 터지고 CRA 가
  타입오류를 **warning 으로만** 낸다 → `TS2304 Cannot find name` 이 게이트 역할을 전혀 못 한다.
- **전수 스캔**: dev-frontend/src **562파일** 중 같은 결함 **다른 곳 0건**.
- **검증**: 신규 e2e `payment-verification.spec.js`(FI-1 서버500 / FI-2 무응답hang / OK 정상) **3회 연속 3/3**
  (수정 전에는 정상 경로조차 실패 = 회귀 박제 성립) · verify-all **15/15** · mount sweep(8역할+POS/manager)
  통과·크래시 0 · 🔒 인쇄 보호파일 **8/8 무접촉** · 백엔드 실패응답 shape 실호출 확인
  (404 `Order not found` / 401 `Access token required` / 200 `success:true`) · demo rid=38 전용(MARKER), 운영 데이터 무접촉.
- **변경 파일**: `LiveOrdersPage.tsx` · `PaymentVerificationModal.tsx` · `TableDetailPanel.tsx` ·
  `scripts/verify-all.js` · (신규) `scripts/check-dead-handlers.js` · (신규) `e2e/payment-verification.spec.js`
- **문서**: `DEVELOPMENT_PLAN.md`(완료 섹션) · `CHANGELOG.md`(Unreleased) · `docs/AGENT_ONBOARDING.md`
  (게이트 표에 `dead-handlers` + 흔한 함정 2줄) · 메모리 [[reference_dead_handler_type_gate_broken]]
- ⚠️ **Fable 검증 대상** (`check-sensitive-diff`: 기준 ② 돈·주문 무결성 접촉)

### 다음 확정 작업 (Irene 2026-08-19 지시)

**1. Fable 검증 게이트 — 이번 수정분 (운영 배포 전 필수)**
- 대상 = 위 6개 파일. 확인 항목: diff 가 승인 절단면 안인지 / 결제 상태전이·원장에 영향 0인지 /
  실패 경로에서 **부분 성공(결제 기록됨 + 주방 전송 실패)** 처리가 올바른지 / `check-dead-handlers.js` 오탐·누락
- 통과 후 Irene `/배포` 지시가 있을 때만 운영 반영

**2. 안드로이드 실기기 검증 — 태블릿 PC 확보됨 (2026-08-19)**
> 그동안 "테스트할 매장이 아예 없다"로 막혀 있던 항목. **기기가 생겨 해제됨.**
- 앱: `https://purplehere.com/desktop/` 사이드로드 APK (안드로이드앱 0.2.0)
- 검증 묶음(**기기 1대에 한 번에 몰아서** — 왕복 1회 원칙):
  - M3 7종 실기기 검증
  - **V4 폴러 자동인쇄 모순** 확인 — [[reference_android_print_gate_traps]] (스테이션이 마스터 무력화 /
    `needs_print` 로 유실판정 금지 / 에뮬레이터가 서버를 굶긴다)
  - 인쇄 두 경로 대조 — 빌=HTML+OS기본프린터 / 오더티켓=raw+이름지정 [[reference_native_print_two_paths]]
  - 태블릿 반응형(9/10인치 좌우 흔들림) [[reference_tablet_responsive_audit]]
  - `device_status` 에 실제로 올라오는지(현재 실사용 0대 [[reference_native_apps_zero_adoption]])
- ⚠️ 실기기 **종이 출력 확인은 Irene 눈**이 필요(코드/헤드리스로는 못 봄)

**3. 이번 세션에서 발견했으나 미수정 — 다음 세션에서 처리 (Irene 지시)**
- ① 🔒 `orders-crud.js:1136` 의 `actionType:'updated'` 가 OrderAction ENUM 에 없어 **PATCH /orders/:id
  감사로그가 전부 조용히 버려진다**(운영 로그 `Data truncated for column 'action_type'` 실측).
  → 보호파일 + 운영 ENUM 마이그 필요 = **Fable 게이트 대상**. 결제 주체는 `order_payments`(v3.73)에 남으므로
  돈 추적엔 구멍 없음, 그 외 PATCH 변경 이력이 비어 있는 상태.
- ② `checkSubscriptionStatus` 미마운트 = 구독정지가 API 를 안 막는다 → **비즈니스 결정 필요**
  (정말 막을 것인가 / 어디까지 막을 것인가). 지금은 정지돼도 매장이 정상 사용 가능.
- ③ **타입검사 복구** — typescript 업그레이드 또는 i18next 타입 핀. 이게 살아야 같은 클래스가 원천 차단된다
  (`check-dead-handlers.js` 는 좁은 임시 방어막).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **다음 `/배포` 때 확인할 것** — v3.73 스모크 수정분이 그때 처음 실전 적용된다. "Smoke 인쇄 큐 잔재 0" 초록불 확인
- **void PIN 게이트 API 레벨 우회**(미수정) — `PATCH /orders/:id {status:'cancelled'}` 는 게이트를 안 탄다
  (`/:id/status`·`DELETE /items/:i` 는 탄다). **실사용 UI 2곳은 게이트 라우트를 쓰므로 매장 보호는 작동 중**.
  고치려면 **시스템 취소(머지 흡수) vs 사용자 취소 구분**이 선행 — 그냥 걸면 테이블 머지가 깨진다. 별도 승인 건
- **환불 대비** — `refunded` 가 ENUM 에 없어 현재 도달 불가. 환불 기능 추가 시 `computeExpected` ①에 제외 필요(Fable 지적)
- 안드로이드 `latest.json` 피드 + 인앱 업데이트 넛지(사이드로드 구버전 고착 방지)
- 마감 첫 사용 시 기대금액 실값 확인 1회(현재 교대 3건 전부 open, 마감 이력 0건)
- **Phase 2 — 게이트웨이 비밀키 응답 마스킹**: `guardPaymentSettings` nested `config` 보존 + SettingsPage
  write-only 마스크가 **같이** 가야 함(하나만 하면 저장 시 비밀키 silent wipe)
- **접근판정 4중화 통합**: resolver 1개 + 투영 2개. 순서 엄수 = shadow 1주 → 목록+게이트 →
  `userCanAccessRestaurant` 도메인별(소켓 최후) → `checkRestaurantAccess` 103라우트 최후 [[reference_restaurant_access_four_gates]]
- rid=16 모바일 이월렛 QR 업로드 후 재오픈 · IOI Mall 가동(운영 자격증명 수령 시) ·
  `formatPaymentDisplay` 이월렛 서브타입 미반영(인쇄물) · 운영시간+라스트오더 · POS 헤더 접기
- ENCRYPTION_KEY 강화(go-live 직전) · 개발서버 sudoers `visudo -c`

### 📷 AI 사진 인식 — 실사용 0건, 정확도 미검증 (2026-07-31 실측, 변화 없음)
- 진입점 ✅ 운영 번들에 "Find by photo"(Floor Plan > Items) · 라우트 ✅ · 요금제 게이트 ✅ 열림
- 학습 ✅ with MIN(rid10) **220장** · K-DINE(rid8) **76장** 임베딩 생성됨
- 🔴 `recognition_logs` **0행** = 매장에서 **한 번도 촬영된 적 없음**
- ⚠️ 방식 = **`local-color-v1`(색 비교)**. `AI_VISION_PROVIDER`·`VERTEX_PROJECT_ID` 미설정 = 진짜 AI 아님.
  비슷한 색끼리(찌개류·흰 국물)는 못 가른다

### 🙋 Irene 이 해야 할 일 (내가 못 하는 것만)

**1. 안드로이드 태블릿 실기기 테스트 (다음 세션 — 기기 확보됨)**
- 위 "다음 확정 작업 2" 묶음. 종이 출력 확인은 Irene 눈이 필요

**2. 윈도우앱 0.1.10 실프린터 종이 확인 1회 — 우선순위 높음**
- https://purplehere.com/desktop/PurplePOS-Setup.exe · 빌 1장 + 긴 주방티켓 1장
- 볼 것: 글자·한글 정상 / 우측 회색 띠(스크롤바) 없음 / 같은 줄 두 번 없음 / 중간에 안 끊김
- 서버에 프린터가 없어 논리검증까지만 됐다

**3. AI 사진 인식 정확도 확인 (5분)**
- 매장에서 Floor Plan > Items > **"Find by photo"** 로 음식 5~10개 촬영
- 기록이 `recognition_logs` 에 남으므로 **내가 top1 적중률·헷갈리는 메뉴 쌍을 숫자로 뽑아준다**
- 이 데이터가 있어야 "이대로 쓸지 / Vertex 로 전환할지"가 데이터로 결정된다

**4. 결정 대기 (급하지 않음)**
- exe 코드서명 인증서 구매 여부 — 미서명이라 설치 시 SmartScreen 경고
- Vertex 자격증명(3번 결과가 부족하면): GCP 프로젝트 ID + 서비스계정 JSON(역할 **Vertex AI User**)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
