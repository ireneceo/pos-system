# Fable 판정 — 청구서 «낼 쪽» 권한 경계(위험 A) · 하드웨어 청구서 낼 사람 칸 (2026-10-07 · 두 사안 각 1회차)

대상: 작업기록 «후속 후보» 2건. 코드·DB 변경 0(이번 호출은 설계·판정만). 운영 접속 0 — 운영 숫자는 전부 «확인 못 함».
실측 범위: `routes/invoices-crud.js`(PATCH status · PUT · DELETE) · `routes/invoices-helpers.js`(checkPaymentPermission · checkConfirmPermission · payerIdIsStore) · `routes/invoices-list.js`(/to-pay) · `routes/invoices-payment.js` · `services/soaChildSync.js` · `services/soaScheduler.js:243` · `middleware/auth.js`(userCanAccessRestaurant · userCanAccessEntity) · `routes/hardware-quotes.js`(235·397·521) · `routes/public.js`(견적 접수) · `services/subscriptionInvoiceService.js resolvePayer` · 프론트 PATCH status 호출 16곳 · 개발 DB 청구서 전수 집계.

---

## Ⅰ. Irene 에게 보내는 보고문

**⏸ 답 필요 — 청구서 권한 경계 2건 설계 끝. 세 가지만 골라 주시면 팀원이 바로 구현합니다.**

### 무엇을 찾았나

**[1] 낼 쪽이 자기 청구서 상태를 마음대로 바꿀 수 있는 문**
- 청구서 «상태 바꾸기» 문(PATCH)은 ①시스템 관리자 ②**그 매장에 접근할 수 있는 사람** ③발행한 쪽 ④0원 청구서의 낼 사람 — 넷 중 하나면 열립니다. 문제는 ②입니다. 매장 칸(restaurant_id)이 채워진 청구서는 **낼 매장의 관리자·직원(Staff)·오너가 어떤 상태로든** 바꿀 수 있습니다 — «결제 완료»만이 아니라 «취소»·«초안으로 되돌림»도 됩니다. 화면에는 그런 버튼이 없지만(낼 쪽 화면 5개는 0원 확정에만 이 문을 씀) 주소를 직접 부르면 됩니다.
- 10-05 에 새 정산서도 매장 칸을 채우기 시작하면서, 한 번에 걸리는 금액이 «정산서 한 장 = 한 달치» 로 커졌습니다. 정산서를 «결제 완료»로 바꾸면 묶인 청구서 전부가 결제 완료로 따라가고, 발주도 결제 완료로 거울 처리되고, 구독 청구서면 정지가 풀립니다.
- 개발서버 기준으로 매장 칸이 채워진 **미결제** 청구서는 거래 22 · 브랜드 플랜 48 · 구독 24 · 서비스 5 등입니다(운영 수는 확인 못 함). 매장 직원(Staff) 계정도 같은 문을 통과합니다(개발서버 Staff 16명).
- **같은 문을 조사하다 더 큰 구멍 두 개를 더 찾았습니다**(지시받은 범위 밖이라 보고만 합니다):
  - **삭제 문(DELETE)에 주인 검사가 없습니다.** 로그인만 돼 있으면 — 공급업체 관리자·추천 파트너 계정까지 — 아무 청구서 번호나 지울 수 있습니다. 청구서는 휴지통 없이 바로 사라지고, 정산서면 묶음이 풀리고, 결제 완료였으면 추천 수수료가 취소됩니다. **되돌릴 수 없습니다.**
  - **수정 문(PUT)에 낼 매장 분기가 있습니다.** 낼 매장의 관리자·직원이 아직 결제 전인 자기 청구서의 금액·품목·낼 사람 칸을 고칠 수 있습니다(금액을 0으로 만든 뒤 0원 확정까지 가능).
  - 두 문 모두 낼 쪽 화면에서 부르는 곳은 없습니다(주소 직접 호출만). 영구 검사(health-check)에 세 문 케이스는 0건입니다.

**[2] 하드웨어 청구서가 «낼 사람» 칸에 사람 번호를 매장 번호 자리에 넣는 문제**
- 하드웨어 견적은 로그인 없이 공개 폼으로 들어오고, 관리자가 견적 화면에서 회원을 «연결»합니다. 청구서를 만들 때 세 곳 모두 «낼 사람 종류 = 매장, 번호 = 그 회원의 사람 번호» 로 적습니다. 종류와 번호가 서로 안 맞습니다.
- 그 결과 ①**번호가 같은 다른 매장**의 관리자에게 그 하드웨어 청구서가 «낼 청구서»로 보이고 결제 제출까지 할 수 있습니다(개발서버 실례: INV-260404011 RM5,088 — 낼 사람은 브랜드 제너럴 회원 6번인데, 매장 6번 «Sunway Pyramid Foodcourt»의 관리자 목록에 뜨는 구조. 개발서버엔 마침 그 매장에 관리자 계정이 없어 지금 보는 사람은 없음). ②**정작 내야 할 회원 본인에게는 안 보입니다** — 브랜드/푸드코트 회원의 «낼 청구서»는 자기 종류만 보기 때문입니다. 즉 하드웨어 청구서를 낼 사람이 화면에서 못 냅니다.
- 이름 표시는 10-05 에 «하드웨어는 사람 번호» 예외로 막아 두어 지금 맞게 나옵니다. 문제는 이름이 아니라 **목록과 결제 권한**입니다.

### 어떻게 고치나 (권고)

**[1] 권고: «낼 쪽은 0원 확정만, 그 밖의 상태 변경·수정·삭제는 발행한 쪽과 시스템 관리자만».** 2026-09-14 에 세운 «낼 쪽 결제완료는 0원만» 선을 그대로 전체에 적용하는 것입니다.
- 상태 바꾸기: ②«매장 접근» 분기를 빼고, 0원 예외는 «매장 칸 또는 낼 사람 번호» 로 읽게 다듬습니다(지금 0원 청구서 중 낼 사람 번호가 빈 것이 개발서버에 7건 — 안 다듬으면 그 7건이 확정이 안 됩니다).
- 삭제: 발행한 쪽·시스템 관리자만.
- 수정: 낼 매장 분기 삭제.
- 화면 변경 0(빌드 없음). 낼 쪽이 정당하게 결제 완료로 만드는 길(결제 제출 → 발행자 확인 · 외부 공급업체 «결제함» · 발주 결제)은 전부 다른 문이라 **영향 없음**. 외부 월별 정산서 작업(다른 작업방)과 겹치는 파일도 없음.

**[2] 권고: 하드웨어 청구서를 만들 때 연결된 회원의 역할로 «낼 사람 종류»를 정한다** — 구독 청구서가 이미 쓰는 규칙과 같게(브랜드 제너럴 → 브랜드 결제자, 푸드코트 제너럴 → 푸드코트 결제자, 매장 오너 → 오너, 매장 관리자 → 매장(그 매장 번호 + 매장 칸 채움), 미연결 → 외부 결제자). 함수 하나로 두고 세 곳이 같이 씁니다. 기존 잘못 적힌 청구서는 같은 규칙으로 고치는 보정 스크립트(배포마다 재실행·멱등)와 인스펙션 한 줄을 붙입니다. 개발서버 대상 1건(#247), 운영 수는 조회해야 압니다.

### 골라 주실 것 (셋)
1. **[1] 범위** — (가) 상태 바꾸기 문만 좁힌다 / **(나) 삭제·수정 문까지 같이 좁힌다 ← 권고.** 같은 파일·같은 경계라 한 번에 고치고 게이트 1회면 끝납니다. 삭제 문은 되돌릴 수 없는 사고라 미루지 않는 게 맞습니다.
2. **[2] 방식** — **(가) 회원 역할로 종류 정하기 ← 권고** / (나) 견적에 매장 연결을 필수로 하고 매장 번호를 쓴다(브랜드·푸드코트 회원이 사는 하드웨어엔 매장이 없을 수 있어 안 맞음) / (다) 목록·권한 쪽에 «하드웨어는 사람 번호» 예외 추가(예외 위에 예외 — 권하지 않음).
3. **운영 데이터** — [2] 보정 전에 운영 읽기 조회(하드웨어·견적 연결 청구서 중 종류-번호 불일치 건수) 허락. 결과를 보고 보정은 배포 마이그로 나갑니다. [1] 은 운영 데이터 변경 없음.

### 덧붙임 — 이미 답하신 «운영 정산서 3건 매장 칸 채움»(방 0ffccb95)
[1] 이 나가면 «미결제 건은 보류» 조건이 필요 없어집니다(매장 칸이 채워져도 낼 쪽은 더 못 건드리게 되므로). 순서는 **[1] 배포 → 보류했던 미결제 건도 채움**을 권합니다. 지금 답하신 대로(채움, 미결제 보류) 먼저 진행해도 충돌 없습니다.

### 착수 시점
다른 작업방(359d0949 외부 월별 정산서)이 지금 같은 솔루션 파일을 고치는 중 — 겹치는 파일은 없지만 «한 솔루션에 수정 방은 하나» 규칙대로 그 방이 끝난 뒤 착수(또는 그 방에 이어서 맡김).

---

## Ⅱ. 사안 [1] — PATCH `/api/invoices/:id/status` 낼 쪽 권한 (보안 경계 · 돈)

### ① 지금 실제로 생길 수 있는 일 (실측)

**권한식 (`routes/invoices-crud.js:529-572`)**
```
canModify = System Admin
         || (invoice.restaurant_id && userCanAccessRestaurant(user, restaurant_id))   ← 문제 분기
         || userCanAccessEntity(user, issuer_type, issuer_id)
         || (status==='paid' && total==0 && payer_id && 낼 사람 본인)                  ← 09-14 예외
```
- `userCanAccessRestaurant`(`middleware/auth.js:476`) 통과자: **Restaurant Admin · Staff**(user.restaurant_id 일치) · Restaurant Owner(소유) · 매장 managers · 그 매장 브랜드/푸드코트 소유자.
- status 값에 제한 없음 → `paid`·`cancelled`·`draft`·`pending_payment` 전부. 상태 전이 검사도 없음(confirm-payment 는 `payment_submitted` 에서만 되는데 PATCH 는 아무 상태에서 paid).
- paid 로 가면 같은 트랜잭션에서 `syncSoaChildren`(정산서면 자식 전부 paid·confirmed_by=호출자) → `handleInvoicePaid`(구독 복구·추천 수수료·발주 paid 거울). cancelled 면 정산서 묶음 해제. draft 면 to-pay·연체 스케줄러에서 사라짐.
- 다른 문과 비교: `submit-payment` 는 `checkPaymentPermission`(낼 사람만) + 상태 pending 한정, `confirm-payment` 는 `checkConfirmPermission`(**발행자만**) + `payment_submitted` 한정. 즉 설계상 «돈이 있는 청구서를 paid 로 만드는 사람 = 발행자» 인데 PATCH 만 그 선 밖에 있다.

**프론트 호출 16곳 전수 (`grep /status` · 모두 읽음)**
| 쪽 | 화면 | PATCH 로 보내는 status |
|---|---|---|
| 낼 쪽 | Restaurant/InvoicesPage:835 · Owner:657 · Manager:711 · BrandGeneral:380 · FoodcourtGeneral:333 | `paid` + paid_amount 0 (`handleConfirmFreeInvoice` 뿐) |
| 발행 쪽 | Admin:1189/1406/1451/1475 · BrandGeneral:1220/1327/1344 · FoodcourtGeneral:1038/1177/1195 | `pending_payment`(보내기) · `paid`(Mark as paid) · `draft`(되돌림) · `cancelled` |
| 서비스 | `services/invoiceService.ts:113 updateInvoiceStatus` | 호출자 0 (죽은 함수) |
→ 낼 쪽은 **0원 확정 외에 PATCH 를 쓰지 않는다.** 발행 쪽은 전부 발행자 분기(`userCanAccessEntity`)로 통과한다(브랜드 소유자·푸드코트 소유자·관리자). `issuer_type` ENUM = system_admin·brand·foodcourt·supplier — supplier 발행은 `userCanAccessEntity` 가 false 라 원래부터 관리자 외 PATCH 불가(외부 공급업체 청구서는 mark-paid-external·soa-reconcile 별도 문).

**개발 DB 영향 폭 (`invoices` 전수, 2026-10-07)**
- 매장 칸 채워진 미결제(pending_payment/overdue/payment_submitted): trade 22 · brand_plan 48 · subscription 24 · service 5 · pos_subscription 2 · brand_royalty 2 · plan_upgrade 1 · brand_marketing 1. 정산서 3건은 전부 옛 것이라 restaurant_id NULL(새 정산서부터 채워짐 — `soaScheduler.js:243`).
- 0원 미결제 중 **payer_id 가 빈 것 7건**(service 4 · brand_plan 3, 전부 payer_type restaurant · restaurant_id 채워짐) — 지금은 ②분기로 확정되고 있다. ②를 빼면 09-14 예외가 `invoice.payer_id` 를 요구해 이 7건이 403 이 된다 → 예외를 «restaurant_id || payer_id» 로 다듬어야 회귀 0.
- Staff 16 · Restaurant Admin 34 · Restaurant Owner 2 계정이 ②분기 통과 후보. 매장 5(정산서 3건의 낼 매장)에 RA 1 · Staff 3.

**같은 경계에서 추가 발견 (지시 범위 밖 — 보고)**
- **DELETE `/api/invoices/:id` (`invoices-crud.js:630`) — 소유 검사 없음.** `authenticateToken` 뒤 곧장 branch 스코프(Foodcourt Manager 만)→삭제. Supplier Admin(10)·Referral Partner(2)·아무 Staff 라도 번호만 알면 삭제. `Invoice` 모델 paranoid 아님 → **영구 삭제**. 지우기 전 paid 면 수수료 취소, soa 면 자식 해제, hardware_quotes FK null. health-check 에 DELETE 케이스 0.
- **PUT `/api/invoices/:id` (`invoices-crud.js:296-338`) — `sameId(invoice.restaurant_id, user.restaurant_id)` 분기**로 낼 매장(RA·Staff)이 pending 청구서의 `total_amount`·`items`(배열 주면 교체, :428·469)·`payer_type/payer_id/restaurant_id/invoice_category/additional_charges` 수정 가능. 문서 §편집 권한(v3.15)은 이를 «수신 restaurant 편집 가능» 으로 적어 두었으나 낼 쪽 화면에서 PUT 을 부르는 곳은 못 찾았다(프론트 grep — 팀원이 재확인).
- 세 문 모두 `check-sensitive-diff.js` 정규식(`routes/invoices`)에 걸려 수정 시 자동 Fable 게이트 대상.

**다른 작업방(359d0949 외부 월별 정산서)과 겹침** — `git status` 기준 그 방의 미커밋은 `routes/invoices-list.js`(external_document 1칸)·`Restaurant/InvoicesPage.tsx`·새 컴포넌트 2개. `invoices-crud.js`·`invoices-helpers.js`·`hardware-quotes.js` 는 **무접촉**(HEAD 와 동일). 그 방이 만든 길(mark-paid-external 정산서 가지 · soa-reconcile · pay_via_soa 400)은 `checkPaymentPermission`+`isExternalIssuer` 로 보호되는 별도 문이라 PATCH 를 좁혀도 무영향. 파일 충돌 없음, 다만 «수정 방 하나» 규칙상 순차.

### ② 길이 갈리는가
- **PATCH 좁히기 자체는 갈리지 않는다** — 낼 쪽 화면은 0원 확정만 쓰고, 돈 있는 paid 는 confirm-payment(발행자) 가 정답 경로로 이미 있다. 09-14 예외와 같은 선.
- 갈리는 것은 **범위 하나**: (가) PATCH 만 / (나) DELETE·PUT 까지. 권고 (나) — 같은 파일·같은 경계·같은 검증 세트, 게이트 1회. DELETE 는 비가역(B 축)이라 미룰 이유가 없다.
- 0원 예외의 `restaurant_owner` 포함 여부: 지금 예외는 brand_manager·foodcourt_manager 만 사람 번호 비교. 구독 restaurant_owner 미결제 1건(0원 아님)뿐이라 당장 영향 0이나 같은 줄에서 `restaurant_owner` 도 «payer_id === user.id» 로 넣는 것이 일관(09-14 사고의 재발형). 팀원 판단으로 포함 — 갈림 아님.

### ③ 권고 (설계)
`routes/invoices-crud.js` 한 파일, 세 곳.

**(a) PATCH `/:id/status`**
```
canModify = System Admin
         || userCanAccessEntity(user, issuer_type==='system_admin' ? 'system' : issuer_type, issuer_id)
         || (status==='paid' && Number(total_amount)===0 && (
                payer_type==='restaurant'
                  ? userCanAccessRestaurant(user, restaurant_id || payer_id)          // 매장 칸 우선, 없으면 낼 사람 번호
                  : ['brand_manager','foodcourt_manager','restaurant_owner'].includes(payer_type)
                      && payer_id && Number(payer_id)===Number(user.id)))
```
- `invoice.restaurant_id` 분기 **삭제**. 09-14 주석 블록은 유지하고 «2026-10-07: 낼 쪽은 0원 확정만 — 매장 접근 분기 제거(위험 A)» 한 줄 추가.
- 그 아래 로직(updateData·syncSoaChildren·cancelled 해제·lifecycle·logActivity) 무변경.

**(b) DELETE `/:id`** — `authenticateToken` 뒤에 `System Admin || userCanAccessEntity(issuer)` 아니면 403(기존 branch 스코프 검사는 AND 로 유지). 응답 형식은 그 라우트의 기존 꼴 유지.

**(c) PUT `/:id`** — `else if (sameId(invoice.restaurant_id, userRestaurantId)) allowed = true;` 한 줄 삭제. 나머지(브랜드/푸드코트 발행자 분기·branch 스코프·상태 잠금) 무변경.
- 단, 삭제 전 팀원이 **프론트에서 낼 쪽 화면(Restaurant·Owner·Manager·BG/FG 의 «낼 청구서» 탭)이 PUT `/api/invoices/:id` 를 부르는 곳 0** 을 grep 으로 증명(이번 조사 grep 패턴이 호출 꼴을 못 잡았음 — `fetch(`/api/invoices/${` + `method: 'PUT'` 두 줄 패턴·axios.put 둘 다). 1곳이라도 있으면 (c) 는 보류하고 보고.

**문서** — `docs/INVOICE_SYSTEM.md` §3.4 아래 «상태 변경(PATCH)·수정(PUT)·삭제(DELETE) 권한» 소절 1개(발행자·관리자 / 낼 쪽은 0원 확정만), §편집 권한(v3.15) 줄의 «수신 restaurant» 삭제, §6.1 표 비고. 메모리 `reference_soa_confirm_patch_status_no_cascade.md` 끝에 «낼 쪽 PATCH 는 0원만(10-07)» 한 줄.

### ④ Irene 컨펌
- 범위 (가)/(나) — 권고 (나). 그 외 결정 없음. 운영 데이터 변경 없음.

### ⑤ 팀원 구현 지시
- **파일**: `dev-backend/routes/invoices-crud.js`(3곳) · `dev-backend/scripts/health-check.js`(케이스 추가) · `docs/INVOICE_SYSTEM.md` · 메모리 1줄. **프론트 0 · 마이그 0 · SW bump 0**(백엔드만 → 배포 때 «백엔드만» 경로).
- **착수 조건**: 방 359d0949 가 /개발완료 또는 Irene 이 이 작업을 그 방에 이어 맡김. `git status` 로 `invoices-crud.js` 무수정 확인 후 시작.
- **health-check 신규 케이스** (데모 매장 38 · 임시 계정 `@example.com` · 끝에 정리 · 멱등):
  1. RA(38) 토큰 → 자기 매장 **금액>0** 청구서(테스트 생성: restaurant_id=38 · issuer brand 또는 system_admin · pending_payment) PATCH `paid` → **403** · DB status 불변.
  2. 같은 청구서 Staff(38) PATCH `cancelled` → 403 · RA PATCH `draft` → 403.
  3. RA(38) **0원** 청구서, `payer_id NULL`·restaurant_id=38 → PATCH paid → **200**(7건 패턴 회귀 방지). 0원·payer_type brand_manager·payer_id=BG 본인 → 200(09-14 예외 유지).
  4. 발행자(데모 브랜드 소유 BG) 가 자기 발행 **정산서**(자식 2) PATCH paid → 200 · 자식 2 paid · `MISMATCH_FROM_SQL` 0 (위험 B 의 «PATCH 길» 케이스 겸함).
  5. DELETE: RA(38)·Supplier Admin 토큰 → 403 · 행 존재 / 발행자 BG → 200 · 행 삭제(정산서면 자식 parent null 확인).
  6. PUT: RA(38) `amount` 변경 → 403 · total 불변 / 발행자 → 200.
  7. (위험 B 나머지) submit-payment → 자식 payment_submitted · reject-payment → 자식 pending_payment · confirm-payment → 자식 paid: 셋 다 `MISMATCH_FROM_SQL` 0. 이 기회에 같이 넣는다(기계 작업·판단 불필요).
- **고장주입(의무, 각 1회·원복)**: ⓐ (a) 에 `restaurant_id` 분기 되살림 → 1·2 실패 ⓑ 0원 예외의 `|| payer_id` 제거 → 3 실패 ⓒ DELETE 가드 제거 → 5 실패 ⓓ PUT 분기 되살림 → 6 실패. HTTP 주입은 `pm2 restart dev-backend` 뒤에(watch 꺼짐), 보고에 재시작 여부.
- **기계 게이트**: `check-print-guard`(8/8 — 인쇄 파일 무접촉) · `health-check` 전체 · 인스펙션 I-SOA-001 · `check-sensitive-diff`(대상 → 게이트 2회차) · `verify-all`(프론트 미변경이라 `--full` 불필요, 빌드 0).
- **Fable 게이트 2회차에서 볼 것**: diff 가 (a)(b)(c)+health-check+문서 밖 0 · 고장주입 4/4 반증 · 케이스 1~7 통과 · PUT 낼 쪽 호출 0 증명.

### ⑥ 운영 데이터 보정
- 없음. (운영 정산서 3건 restaurant_id 채움은 별건 — [1] 배포 뒤면 미결제 건 보류 조건 해제 가능.)

---

## Ⅲ. 사안 [2] — 하드웨어 청구서 `payer_type 'restaurant'` + `payer_id = user_id`

### ① 지금 실제로 생길 수 있는 일 (실측)
- **생성 경로 3곳**(`routes/hardware-quotes.js`): `/:id/invoice`(:218·235) · `/:id/proceed` 하드웨어 청구서(:380·397) · `/:id/proceed` 구독 청구서(:505·521). 셋 다 `restaurant_id: quote.restaurant_id || null`, `payer_type: isExternal ? 'external' : 'restaurant'`, `payer_id: quote.user_id`. 견적은 **비로그인 공개 폼**(`routes/public.js:530`, user_id 안 받음) → 관리자가 `PATCH /hardware-quotes/:id` 로 `user_id`·`restaurant_id` 를 손으로 연결(`Admin/HardwareQuotesPage.tsx:836` 은 user_id 만 보냄). 그래서 보통 **user_id 만 있고 restaurant_id 는 NULL**.
- **번호 충돌이 어디서 새나가나** (이름 말고):
  - `/to-pay` Restaurant Admin 분기(`invoices-list.js:955-968`): `restaurant_id = 내 매장 OR (payer_type='restaurant' AND payer_id = 내 매장)` → payer_id 가 사람 번호여도 **같은 번호의 매장** 목록에 뜬다.
  - `checkPaymentPermission` RA 분기(`invoices-helpers.js:454`): 같은 조건 → 그 매장 관리자가 **submit-payment 가능**. (09-14 0원 예외도 payer_type restaurant 면 매장 번호 비교.)
  - **본인(연결된 회원)에게는 안 보인다**: BG/FG 의 to-pay 는 `payer_type brand_manager/foodcourt_manager + payer_id=본인` 만, `checkPaymentPermission` 도 같음 → 하드웨어 청구서를 낼 사람이 화면에서 못 낸다(결제 제출 403).
  - 이름은 `payerIdIsStore` 가 hardware 를 제외해 **맞게** 나옴(10-05) — 목록 이름 결함은 해결됐고 남은 건 라우팅·권한.
- **개발 DB**: hardware 10건 중 payer_id 있는 것 1건 — **#247 INV-260404011 · overdue · RM5,088 · payer_id 6 = 회원 brand_general@orderhere.center(Brand General) ↔ 매장 #6 «Sunway Pyramid Foodcourt» 실존.** 매장 6 소속 계정은 Foodcourt Manager 1(RA 아님)이라 지금 보는 사람은 없지만 구조는 열려 있음. 견적 #13 → 청구서 #249(draft) 는 user_id 5(Foodcourt General) 인데 payer_id NULL 로 생성됨(연결 전 발행 추정). 견적 경유 구독 청구서 불일치 0.
- **운영**: 확인 못 함(접속 없음). 10-05 Fable 1차 FAIL 이 운영 하드웨어 청구서 이름으로 적발된 걸 보면 운영에도 같은 꼴의 행이 있을 가능성이 높다.

### ② 길이 갈리는가 — 갈린다 (설계 선택)
| 길 | 내용 | 결과 |
|---|---|---|
| **(가) 회원 역할로 payer_type 결정 ← 권고** | 구독 청구서 규칙(`subscriptionInvoiceService.resolvePayer` 의 roleMap)과 같은 어휘. BG/BM→`brand_manager`(user.id) · FG/FM→`foodcourt_manager`(user.id) · Restaurant Owner→`restaurant_owner`(user.id) · RA/Staff(restaurant_id 있음)→`restaurant`(payer_id=**매장**, restaurant_id 채움) · 그 외/미연결→`external`(+견적 연락처) | to-pay·checkPaymentPermission·0원 예외·이름 전부 **기존 분기 그대로 맞아 들어감**. 새 예외 0. 본인에게 보이고 본인만 낸다 |
| (나) 견적에 매장 연결 필수 + payer_id=매장 | 종류는 유지 | 브랜드/푸드코트 회원이 사는 하드웨어엔 매장이 없을 수 있음(개발 #247 이 그 꼴) → 억지 매장 지정 |
| (다) to-pay·권한에도 «hardware 는 사람 번호» 예외 | payerIdIsStore 식 | 예외 위에 예외(TRADE 규칙상 금지 패턴), 3곳 더 분기 |

### ③ 권고 — (가). 함수 하나, 세 곳이 같이 쓴다
- 새 헬퍼 `payerForUser(user, { fallbackExternal })` — 위치는 `routes/invoices-helpers.js`(청구서 결제자 술어가 이미 모여 있는 곳, `payerIdIsStore` 옆). **`resolvePayer` 는 손대지 않는다**(구독 쪽은 RA 를 restaurant_owner 로 떨어뜨리는 자기 규칙이 있고 운영 중). 반환 `{ payer_type, payer_id, restaurant_id }`.
- `hardware-quotes.js` 3곳: `payer_type/payer_id/restaurant_id` 를 헬퍼 결과로. `restaurant_id` 는 `quote.restaurant_id || helper.restaurant_id`. isExternal 판정은 «user_id 없음 **또는** 헬퍼가 external» 로.
- `payerIdIsStore` 의 hardware 제외는 **유지**(옛 행이 운영에 남아 있는 동안 필요) — 보정이 끝나고 인스펙션 0 이 두 번 찍히면 그때 제거(후속, 이번 범위 밖).
- 관리자 견적 화면의 «회원 연결» UI 는 무변경.

### ④ Irene 컨펌
- 방식 (가)/(나)/(다) — 권고 (가).
- 운영 **읽기 조회** 허락(아래 ⑥ 검사 SQL) → 건수 보고 → 보정은 배포 마이그로(별도 쓰기 허락 아님, 배포 지시에 포함).

### ⑤ 팀원 구현 지시
- **파일**: `routes/invoices-helpers.js`(헬퍼 + export) · `routes/hardware-quotes.js`(3곳) · `scripts/migrate-hardware-invoice-payer.js`(신규 · `migrations.registry.json` deploy 등록 · 멱등) · `scripts/inspection/suites/`(invoice 관련 suite 에 케이스 1개) · `scripts/health-check.js`(케이스) · `docs/SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE.md` §인보이스 생성에 payer 규칙 1단락 · `docs/INVOICE_SYSTEM.md` 1033줄 옆 1줄. 프론트 0 · 빌드 0.
- **검사와 수정은 같은 SQL** — 탐지 조건을 함수로 빼 마이그·인스펙션이 공유:
  ```sql
  -- 견적에서 나온 청구서인데 «매장» 종류에 사람 번호가 들어간 행
  FROM invoices i
  JOIN hardware_quotes q ON (q.invoice_id = i.id OR q.subscription_invoice_id = i.id)
  WHERE i.payer_type = 'restaurant' AND i.restaurant_id IS NULL AND i.payer_id IS NOT NULL
  ```
  보정 = 각 행의 `payer_id` 로 `users` 를 읽어 **같은 헬퍼**로 `{payer_type, payer_id, restaurant_id}` 를 다시 계산해 UPDATE(트랜잭션 · 건별 영향행 1 · 전후 출력 · 되돌리기 = 원래 값 3칸 로그로 보관). 회원이 없거나 역할이 매핑 밖이면 **건너뛰고 목록**(external 로 바꾸지 않는다 — 사람 판단).
  dev 예상: #247 → `brand_manager` / 6 / NULL.
- **health-check 신규 케이스**(데모 데이터 · 끝에 정리): 공개 폼으로 견적 생성(마커 이메일 `@example.com`) → 관리자 PATCH 로 데모 BG 연결 → `/:id/invoice` → 청구서 `payer_type='brand_manager' · payer_id=BG.id · restaurant_id NULL` 단언 → RA(38) `/to-pay` 에 **없음** · BG `/to-pay` 에 **있음** → RA(38) submit-payment 403 · BG 200(또는 상태만 확인) → 정리(청구서·견적 삭제). RA 연결 변형 1개: `payer_type='restaurant' · payer_id=38 · restaurant_id=38`.
- **고장주입**: 헬퍼 호출을 옛 식(`'restaurant', quote.user_id`)으로 되돌림 → 위 케이스 실패 1회 증명·원복. 마이그 반증: dev #247 을 옛 값으로 되돌려 놓고 마이그 → 1건 맞춤 · 재실행 0건.
- **기계 게이트**: `check-migration-registry` · health-check 전체 · 인스펙션 신규 케이스 0 · print-guard 8/8 · `check-sensitive-diff`(hardware-quotes 는 정규식 밖일 수 있으나 invoices-helpers 가 걸림 → 사안 [1] 과 **같은 게이트 2회차에 묶는다**).

### ⑥ 운영 데이터 보정 (실행은 Irene 허락 뒤)
- 1단계 **읽기**: 위 탐지 SQL + 각 행의 `users.role·email·restaurant_id`, 청구서 `status·total_amount`. 운영 읽기 도구 `prod-query.js`(읽기 전용 계정) 사용.
- 2단계 **쓰기 = 배포 마이그**(deploy 등록, 멱등). 보정 대상이 «건너뜀» 으로 남으면 그 목록을 Irene 에게 — 사람이 낼 사람을 정한다.
- 되돌리기: 마이그가 남긴 전값 로그(id · 원 payer_type · 원 payer_id · 원 restaurant_id)로 UPDATE.

---

## Ⅳ. 정리 — Fable 호출 정산 · 순서
- 이 판정 = 두 사안 각 **1회차(설계)**. 구현 뒤 **게이트 1회(두 사안 묶음)** 로 끝낸다 — 사안당 2회 한도 안.
- 순서: Irene 컨펌 3개 → 방 359d0949 종료 대기 → [1]+[2] 한 묶음 구현(백엔드만, 빌드 0) → 기계 게이트 → Fable 게이트 2회차 → /배포(마이그 1 포함) → 운영 정산서 3건 보류 해제 → 운영 재검사(하드웨어 탐지 SQL 0 · I-SOA-001 0).
- 내가 재현하지 않은 것: 운영 DB 전부 · 프론트 PUT/DELETE 호출 유무(grep 패턴 미스매치, 팀원 재확인) · 실제 PATCH 403/200 실호출(코드 읽기 + DB 집계까지만 — 구현 때 health-check 가 증명).
