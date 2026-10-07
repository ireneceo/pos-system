# Fable 소급 게이트 판정 — v3.108 운영 배포 #4(SW 5.86) · #5(백엔드만) (2026-10-07 · 이 사안 1회차)

대상: 2026-10-05 운영 배포 #4(백업 20261005_153730) + #5(백업 20261005_184839). 둘 다 Fable 도장 없이 Irene skip 으로 나갔다.
코드 범위: git `771a20bc6..99f428167` (두 배포 합본, 21파일 +1082/−261). 배포 기록: `dev-backend/releases/archive/2026-10-05-soa-status-invoices.json`, `…/2026-10-05-soa-continue-after-manual.json`.
이미 운영에 나가 있으므로 이 판정은 «배포 가능» 이 아니라 **«그대로 두어도 되는가 · 되돌릴 것이 있는가»** 를 가른다.

## 판정: PASS (소급 — 되돌릴 것 없음. 남는 위험 A 는 별도 사안으로 설계 필요)

## 내가 직접 한 것

1. **diff 범위 대조** — 21파일 전부를 두 배포 기록의 «완료» 항목에 맞췄다. 기록에 없는 변경 0. 🔒 인쇄·KDS 보호파일 8개는 변경 파일 목록에 **없다**(파일 목록으로 확인 + 오늘 팀원 print-guard 8/8).
   - 백엔드 14: `routes/brand-revenue.js`(판매 통계 라우트 신설 + 청구 집계 매장 다중선택) · `routes/invoices-crud.js`(PATCH status → 자식 연동) · `routes/invoices-helpers.js`(`payerIdIsStore` 술어) · `routes/invoices-list.js`(목록 3곳 매장 이름·`parentSoaInvoiceId`) · `routes/invoices-payment.js`(submit/confirm/reject → 한 함수) · `routes/owner.js`(인자 추가만) · `services/soaChildSync.js`(신설) · `services/soaScheduler.js`(정산서 매장 칸 + 이어서 내기) · `scripts/migrate-soa-child-status-sync.js`(신설·deploy 등록) · `scripts/inspection/suites/invoice-soa.js`(I-SOA-001) · `scripts/migrate-merge-product-mirrors.js`(재고 남은 쌍 건너뜀) · `scripts/health-check.js`(임시 계정 @example.com) · `migrations.registry.json`.
   - 프론트 6: 브랜드 보고서 탭·체크 · 브랜드 청구서 정산서 자식 표(상세·PDF) · 매장 청구서 기본 탭·To pay 즉시 갱신·올린 인보이스 보기 · 매출 Year 그래프 연-월 정렬. 전부 화면/표시. 로컬 `styled.button`/`styled.table` 신규 0(버튼은 `ThemedButton`).
   - 배포 뒤 HEAD 까지 같은 파일 변경은 `routes/invoices-list.js` 응답 칸 3개 추가(5.88, 이미 Fable PASS)뿐 — 이 판정 범위와 겹치지 않는다.

2. **돈 경로 — 정산서↔묶인 청구서 상태 연동(`soaChildSync`)**
   - 정산서 상태를 바꾸는 길 4개(submit-payment · confirm-payment · reject-payment · PATCH status)가 **전부 한 함수**를 부르고, 넷 다 트랜잭션 안이다. 복구 스크립트·인스펙션이 **같은 SQL(`MISMATCH_FROM_SQL`)** 을 쓴다(«검사와 수정은 같은 SQL» 규칙 준수).
   - 옛 confirm-payment 는 `status != 'paid'` 인 자식을 전부 paid 로 밀었다 → 새 규칙은 from 목록 명시(draft·cancelled·credit 자식은 안 건드림). **더 좁고 맞다.**
   - **내가 dev 에서 트랜잭션 안에서 증명하고 롤백** (dev 데이터 무접촉, 롤백 뒤 전역 불일치 0 재확인):
     - 반증: 정산서만 paid 로 바꾸고 자식은 그대로 → 검사 SQL 이 **5/5** 잡음.
     - 서비스 함수 1회 → 자식 5건 paid·paid_at·confirmed_by 채워지고 불일치 **0**.
     - 되돌림 규칙(pending_payment)은 paid 자식을 **0건** 건드림(제출됨에서만 끌어옴). 정산서 아닌 청구서엔 **무동작**.
   - **운영 실행 증거(로컬 보관 마이그 로그)**: `dev-backend/logs/deploy-20261005_153730/migrate-soa-child-status-sync.js.log` — `SOA-BRD1-R10-M202609202104 (paid) — 자식 4건 맞춤 · 남은 불일치 0건`. #5(`deploy-20261005_184839`) — `맞춘 0건 · 남은 불일치 0건`(멱등 확인). dev I-SOA-001 오늘 0건.
   - DB 실제 ENUM 확인: `draft,pending_payment,payment_submitted,paid,overdue,cancelled,credit`. from 목록의 `pending`·`sent`·`rejected` 는 ENUM 에 없는 **죽은 값**(IN 에서 매치 안 됨, 해는 없음) — 위험 C.

3. **정산서 손님 이름(`payerIdIsStore`)** — dev 실측: `payer_type='restaurant'` 인데 매장 칸이 빈 행은 hardware 1 · trade 2 · soa 3. soa·trade 의 payer_id 는 전부 매장 번호. **hardware 는 payer_id=6 이 매장(Sunway Pyramid Foodcourt)이자 사용자(brand_general)** — 1차 FAIL 이 지적한 충돌이 실제로 존재하고, 술어가 hardware 를 제외해 막는다. 생성 쪽 불일치(`routes/hardware-quotes.js:234` `payer_id: quote.user_id`)는 범위 밖·후속 후보 그대로.

4. **정산서 자동 발행 «이어서 내기»(`planAutoCycle`)** — 수동 정산서가 있어도 건너뛰지 않고, 시작일 = 가장 늦은 `billing_period_end` 다음 날(수동 발행도 같은 `issueSoaForPair` 로 `billing_period_end` 를 채우므로 포함). 수집 조건 = `parent_soa_invoice_id IS NULL AND status NOT IN (paid, cancelled)` → **이중 청구 불가**. 번호는 `uniqueSoaNumber`. #5 기록의 dev 시나리오(수동+자식 1 · 미묶음 1 → 자동 1장에 미묶음만 · 재실행 0장)와 고장주입(옛 건너뛰기 줄 재삽입 → 3건 실패)은 기록을 수용했다(내가 재현하지 않음).

5. **새 정산서 매장 칸 채움** — `purchaseOrderService` 가 거래 청구서에 `restaurant_id: po.entity_id` 를 채우는 것과 같은 규칙(20·227행). 정합.

6. **판매 통계 라우트(`/brand/sales-report`)** — `authenticateToken + requireBrandScope`, 요청 브랜드가 범위 밖이면 403 · 범위 빈 계정 403 · 날짜 정규식 · tz 검증 · id 는 숫자만(`idList`) · SQL 은 전부 replacements. 쓰는 열(`trade_invoice_id`·`submitted_at`·`delivery_fee`·`seller_entity_id`) dev 에 존재 확인. 읽기 전용.

7. **마이그 `merge-product-mirrors` 완화** — 재고 남은 쌍은 **건너뛰고 목록**, 데이터 무접촉. 운영 로그(184839): `K-Bulgogi 1kg 건너뜀 · 증명 ①②③ 0/0/0 · ✅ 적용 완료`. 배포 전체를 한 쌍이 막던 문제의 올바른 해법(원인 데이터는 사람 몫으로 남김).

8. **health-check 임시 계정 `@example.com`** — 실메일 반송 사고의 올바른 차단(규칙 메모리와 일치).

9. 기계 게이트 — 오늘 팀원: print-guard 8/8 · health-check 299/299 · 인스펙션 신규 실패 0 · I-SOA-001 통과. #4 당시 `verify-all --full`(mount sweep 포함) 기록 수용. 운영 스모크 10/10 ×2.

## 남는 위험 (되돌릴 사유 아님)

- **A. PATCH `/invoices/:id/status` 권한 범위가 정산서까지 넓어짐.** 새 정산서에 `restaurant_id` 가 채워지면서 **낼 매장(payer)** 이 `userCanAccessRestaurant` 를 통과해 **금액이 있어도** 자기 정산서를 `paid` 로 바꿀 수 있고(API 직접 호출 시), 그러면 묶인 청구서도 paid 로 따라간다 — 발행자 확인 없이. 화면은 0원 확정에만 이 PATCH 를 쓴다. 거래 청구서는 **원래부터** 같은 조건이었으니(매장 칸 채워짐) 새 종류의 구멍은 아니고, 한 번에 걸리는 금액이 커졌을 뿐. **별도 사안으로 설계 필요**(보안 경계 — 낼 쪽의 PATCH paid 를 0원으로 제한하는 2026-09-14 예외와 같은 선으로 좁힐지). 이 판정에서 되돌리지 않는다.
- **B. 영구 게이트에 런타임 검사가 없다.** health-check 에 정산서 연동(4길)·판매 통계 라우트 케이스가 **0건**(grep). 지금 안전망은 인스펙션 I-SOA-001(데이터 불변식)뿐이고, 10-05 의 14/14 실호출은 임시 스크립트(삭제됨). 팀원이 health-check 케이스를 추가할 것(판단 불필요한 기계 작업).
- **C.** `childRuleFor` from 목록의 `pending`·`sent`·`rejected` 는 ENUM 밖 죽은 값. 해 없음, 다음에 손댈 때 정리.
- **D.** 운영 정산서 3건의 빈 `restaurant_id` 데이터 보정은 Irene 승인 대기 그대로(이름은 술어로 이미 맞게 나옴).
- **E.** 같은 달에 정산서 두 장(수동+자동 잔여)이 생길 수 있음 — 의도된 동작 변경, Irene 승인(「그래. 이건 이렇게 해」).
- **F.** 내가 재현하지 않은 것: 자동 발행 시나리오(#5 기록 수용) · 프론트 mount sweep(#4 기록 수용) · **운영 DB 현재 상태**(이 작업방은 운영 접근 없음 — 로컬 보관 마이그 로그로 대신함).

## 후속 (코드 아님 · 팀원)
- `.claude/.fable-gate-skip` 는 이미 삭제됨(정지 훅 복구) — 추가 조치 없음. 마커는 찍지 않는다(현재 작업트리 지문이 이 배포와 무관).
- `.claude/session-state.md` «다음 확정 작업» 1번을 이 문서 경로로 닫고, 위험 A 를 «후속 후보»에 별도 사안으로 올릴 것.
