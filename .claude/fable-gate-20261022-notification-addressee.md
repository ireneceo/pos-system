# Fable 완료 검증(gate) 판정 — 알림 «수신 자격 · 할 일» (2026-10-22 · 작업방 1f5a0efb)

요청서: `.claude/fable-gate-request-20261022-notification-addressee.md` · 설계: `.claude/fable-design-20261022-notification-addressee.md`
판정 주체: Fable(리더) · 코드 변경 0 · 운영 접속·배포·실발송 0 · 개발 DB 읽기만.

## 판정: **PASS** (운영 반영: 다음 배포 때 — SW 올림·배포 기록은 /배포 방 몫)

검증 규율 4조항을 전부 채웠다. ① diff 범위 대조 ② 가드 실행(+반증) ③ 실호출·회귀(자체 하니스 재실행 + 팀원 산출물 대조) ④ 배포 안전성.

---

## 1. diff 범위 대조 — 설계 밖 변경 0

`git diff HEAD`(37파일) + 미추적 5개를 전부 읽었다. 모든 변경이 설계 U1~U6 안이거나 요청서 «설계와 다르게 한 곳» 8건에 선언돼 있다. 선언 안 된 것 중 발견: `routes/seller-orders.js` 끝의 `router._notifyForTest`(렌더 하니스용 비라우트 핸들) 1건 — 무해, 후속 ⑥.

### 설계와 다르게 한 곳 8건 — 전부 수용
| # | 내용 | 판정 · 근거 |
|---|---|---|
| 1 | `trade_invoices_buyer` 브랜드/푸드코트 = `/pos/brand/invoices`·`/pos/foodcourt/invoices` | **수용.** `BrandInvoicesPage.tsx:269` 가 `/api/invoices/to-pay` 를 읽는다 = 구매자가 낼 청구서 화면. 설계표가 틀렸고 설계 §4-2 «틀리면 표만 고친다» 그대로. |
| 2 | `issued_invoices` 총괄 = `/pos/brand/invoices` · 매니저 = `/pos/manager/invoices` | **수용.** 같은 화면이 `/api/invoices`(발행분)도 읽는다(`:248`). `/pos/manager/invoices` 역할 게이트에 BM·FM 포함(App.tsx:1217). |
| 3 | target 3개 추가(`staff`·`leave_requests`·`my_attendance`) | **수용.** 라우트 존재 확인(check 0건) · `AttendancePage.tsx:25` 가 `?tab=` 을 읽는다. 기존 메일이 쓰던 있는 화면을 /go 로 감싼 것. |
| 4 | 체험 만료 메일은 꼬리표·버튼 주소만 | **수용.** `emailLayout` 직접 조립이라 틀 밖. 옛 `[이름]` 머리 제거 → 꼬리표가 그 자리를 대신하므로 이중 표기 없음. 오너 자격의 `entity_name` 이 사람 이름(«Irene · Owner»)인 점은 오너 요금제가 매장 단위가 아니라 불가피 — 후속 ⑤. |
| 5 | Supplier Staff 도 «공급업체» 자격 | **수용.** `contextMatch.SUPPLIER_ROLES` 로 두 역할을 같은 자리로 본다. 계약 메일은 `supplier.owner_id`(관리자)에게만 가므로 실제 수신자 변화 없음. |
| 6 | `buyerReceivedEmail` 재렌더 메타 결함 고침 | **수용.** 같은 템플릿 가족 안 1곳, 머리글 브랜딩이 안 붙던 설계 밖 결함. |
| 7 | LoginPage 가 `?…` 를 되살림 | **수용.** `ProtectedRoute.tsx:256` 이 `state.from = location`(search 포함)을 넘기므로 되살릴 재료는 있었고 pathname 만 쓰던 것. 경로 검사(`/` 시작·`//`·`javascript:` 금지)는 그대로, search 는 뒤에 붙일 뿐이고 `navigate` 는 앱 안 이동이라 외부 리다이렉트 면 없음. |
| 8 | 토스트가 `data.url` 도 읽음 | **수용.** OS 알림(`sw.js:160`)과 같은 자리를 읽게 한 것. |

---

## 2. 가드 실행 — 전부 통과 · 반증 1회

| 가드 | 결과 |
|---|---|
| 🔒 print-guard | 8/8 변경 없음 (기준 2026-10-22T12:47). 🔒 보호파일·KDS 무접촉 |
| check-notification-links | ① 표 39경로 App.tsx 미달 0 ② 발송 파일 18개 옛 없는 주소 0 · exit 0 |
| **반증(Fable 직접)** | `allPatterns()` 에 `/pos/seller-orders` 를 주입한 사본 실행 → «표 경로가 App.tsx 에 없음 1건», exit 1. 검사기가 실제로 잡는다. |
| design-guard · timezone · i18n 4언어 · hydration · 죽은 핸들러 · 훅 TDZ · 타입 기준선 | verify-all ✓ |
| 로케일 키 동등성(Fable 직접) | `email.json` ko/zh/ms = en 과 누락 0·초과 0 · `auth.json` 누락 0 |
| check-sensitive-diff | 게이트 대상 ②(invoices-payment·invoiceOverdueScheduler·invoiceScheduler·subscriptionScheduler = 이 방) + ①③⑤ 3건(MainLayout·buyerScope·migrate-staff-purchasing-permission)은 **오늘 앞 커밋(ff59bf974 등)의 운영 대비 차이**이지 이 방 diff 가 아님 — print-guard 8/8 이 MainLayout 무변경을 증명. |

---

## 3. 실호출·회귀

### Fable 자체 실행(`tmp/fable_unit.js`, 코드 무변경·DB 무접촉) — 17/17 ✓ · 제목↔할 일 대조 17종 불일치 0
- 꼬리표 1회만(재렌더 방어) · `account` 는 꼬리표·띠 없음 · 띠/미리보기 이스케이프(`<Garden>` → `&lt;Garden&gt;`, `<img>` 주입 차단)
- **무회귀 바이트 동일**: `wrapTemplate(title, body, lang)` 메타 없음 · 브랜딩 있음 모두 HEAD 와 바이트 동일 · 추천 템플릿 html/subject 바이트 동일
- 링크 유틸: 모르는 target → 그 자격 대시보드 + `console.warn` · `:poId` 채움 · 공급업체에 없는 칸 → 공급업체 대시보드 · `goLink` 인코딩(`ctx=restaurant%3A38%3ARestaurant%20Admin&to=%2Frestaurant%2F38%2Finvoices&n=…`) · 오너 `owner:2:Restaurant Owner` · SA `system::System Admin` · `account` 는 직접 경로
- `mailFor` 가 비열거 `_title/_body/_action` 을 살리고 `_addressee` 를 더함(spread 는 잃음 — 주석대로)
- 관문 `sendNotification:254-256` 이 `(user)=>` 팩토리를 **await** 하므로 `mailFor`(async) 경로 정상 — 렌더 산출물(soa-0..2 · inv-paid-0..1 · reminder-0..2)이 그 경로로 나온 것

### 팀원 산출물 대조(렌더 40통 · `tmp/render/*.html`)
5통(판매자 제출·청구서 생성 매장/오너·판매자 확인(오너)·문의·추천)을 열어 ①미리보기 ②받는 분 띠 ③제목 ④할 일 칸 ⑤/go 버튼 ⑥바닥글 «You are receiving this as …» 이 **같은 자격 값**으로 찍힘을 확인. 추천(메타 없음)은 옛 모양 그대로(띠·칸 없음).
- 팀원 숫자(요청서): health-check 404/404 · 자격 리졸버 집합 = 옛 id 함수(매장 38·2·브랜드 10·2·푸드코트 44·공급업체 20) · /go 실브라우저 4경로 + 콘솔 오류 0 + 스크린샷 · 고장주입(contextMatch 매장 번호 비교 제거 → 2건 실패 → 원복 0 실패) · 푸시 3종 가로채기. 스크립트(`go_e2e.js`·`cm_test.js`)를 읽어 검사 내용이 설계 §8 ⑤⑥과 일치함을 확인 — 브라우저 재실행은 하지 않음(팀원 산출물 신뢰, 아래 verify-all --full 의 mount sweep 이 같은 번들을 다시 연다).

### 수신자 집합 — 설계대로 «동일», 연체만 Irene 답 ②로 확대
- `getRestaurantAddressees` = `getRestaurantAdminAndOwnerIds` 그대로 + 오너 표식(`getRestaurantOwnerIds` 는 role='Restaurant Owner' 조건이라 RA 와 겹칠 수 없음 → 우선순위 충돌 없음)
- `getEntityAddressees` = `getBrandManagerIds/getFoodcourtManagerIds/getSupplierAdminIds` 그대로
- seller-orders 7종·soaScheduler·독촉 3종·invoices-payment·poNotifications 7종 전부 위 함수 경유 — 옛 `getBuyerRecipientUserIds` 와 같은 SQL 뿌리
- `invoiceOverdueScheduler`: `restaurants.admin_id` 1명 → 관리자 전원 + 오너(설계 §5-3 #9 · Irene «권고대로»)
- 발주 오너 승인 대기: `getRestaurantAddressees(...).filter(kind==='owner')` = `getRestaurantOwnerIds` 집합

### verify-all --full
24게이트 중 «🚀 배포 준비» 1건만 ✗ — 배포 기록 파일 없음 + SW 버전 미상승. **코드 결함이 아니라 /배포 방이 하는 일**(공용 규칙: 일하는 방은 배포를 묻지 않는다). 나머지 ✓. 실브라우저 mount sweep 결과는 §6.

---

## 4. 배포 안전성
- 마이그레이션 0 · 스키마 0 · ENUM 0 · 레지스트리 영향 0
- 외부 발송 코드 경로는 그대로(카테고리 키·시점 무변경) · 체험 만료 수신자 무변경
- 롤백 = 파일 되돌리기(새 유틸 2 + 새 페이지 1 + 라우트 1줄)
- 프론트 변경 있음 → SW 버전 올림 필요(배포 방)

---

## 5. 고칠 것(차단 아님) · 후속
1. **(후속·R5 때)** `tradeInvoiceCreatedEmail`·`tradeInvoicePaidEmail` 은 `_action` 메타가 없다 — 설계 §5-3 표엔 있으나 **호출부 0곳**(죽은 템플릿)이라 틀린 문구가 나갈 길은 없다. 살리려면 `{state:'action',key:'pay_by_due'}` / `fyi` 를 붙이고, 아니면 지운다.
2. **(후속·R1 과 함께)** 추천 파트너 7종은 자격 `referral` 없이 옛 모양 그대로(설계 §5-4 마지막 행은 ✱ 아님 → 이번 범위 밖). `getNativeAddressee` 도 'Referral Partner' 는 null.
3. **(문구 다듬기·선택)** 미리보기 자동 조립이 «Pay this invoice by the due date. · by Nov 2, 2026 · …» 처럼 «by» 가 두 번 읽힌다 — `pay_by_due` 문장에서 «by the due date» 를 빼거나 due 가 있으면 문장을 바꾸는 한 줄.
4. **(선택)** `invoiceScheduler.js:1206-1214` 가 `getRestaurantAddressees` 와 `getRestaurantAdminAndOwnerIds` 를 둘 다 불러 같은 SQL 을 두 번 돈다 — 전자 하나로.
5. **(기록)** 오너 요금제 체험 메일의 꼬리표는 «{사람 이름} · Owner» — 설계 «오너는 매장명» 규칙의 예외. 오너 플랜은 매장 단위가 아니라 불가피. 문서(R5)에 적는다.
6. **(선택)** `router._notifyForTest` — 하니스 전용 핸들을 라우터 객체에 매단 것. `module.exports.__test = …` 로 옮기거나 그대로 둬도 무해.
7. **(설계 밖·다음)** `/pos/supplier/invoices` 역할 게이트에 Supplier Staff 없음 — 지금 메일이 그 target 을 안 쓰므로 영향 0.

---

## 6. mount sweep (verify-all --full 마지막 게이트)
✓ 실브라우저 mount sweep (8역할 + /pos/manager/*, 크래시 0) — 739.1s. verify-all 총 24게이트 중 ✗ 는 «🚀 배포 준비»(배포 기록 파일·SW 버전) 1건뿐 = 배포 방 몫, 코드 결함 아님. 운영 반영: 다음 배포 때.

## 7. 마커
`node dev-backend/scripts/fable-gate.js pass` 를 이 판정 뒤 Fable 이 직접 찍음. **지문은 워킹트리 내용 전체(session-state.md 제외)라 이 뒤에 한 줄이라도 고치면 마커가 죽는다** — 요청서에 verify-all 결과를 덧붙이려던 것은 session-state.md 에만 적을 것.
