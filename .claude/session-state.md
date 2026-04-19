## 현재 작업 상태
**마지막 업데이트:** 2026-04-19 UTC (v3.15 운영 배포 완료)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-19)

**오전**: v3.14 + 누적 운영 배포 (smoke 10/10)

**오후-이른**: Contract UX 대개편 + P0/P1 필수 필드
- Sidebar 실시간 뱃지, Pipeline 카드 UX, Tab→Accordion, Documents 필수 제거
- P0 #1~#3 (unit_id / applicant OR / is_required)
- P1 필드 하이라이트 + 인라인 에러 + i18n 4개국어

**오후-늦음**: P2 Contract 비즈니스 기능
- **P2 #1 계약 만료 알림 이메일**
  - `contracts.last_expiry_notification_day` 컬럼 + beforeUpdate 훅 (end_date/start_date 변경시 reset)
  - `subscriptionScheduler.processContractExpiryReminders()` — renewal_alert_months + D-7 2단계, 자동 expired 전환, Brand General/Foodcourt General 전원 + applicant_email 별도 이메일
  - `contractExpiryIssuerEmail` / `contractExpiryApplicantEmail` 템플릿
  - ContractDetail 상단 ExpiryBanner + `?action=renew` URL 자동 Renew 모달 트리거
  - i18n 4개국어 email + frontend
  - E2E 7/7 pass
- **P2 #2 Contract → Invoice 추적 연결** (자동화 X, 수동 연결)
  - `invoices.contract_id` 컬럼 ADD + Contract↔Invoice association
  - POST pass-through, PUT whitelist, GET 응답에 contractId
  - GET contract detail에 invoices include
  - ContractDetail **새 Accordion 섹션 "Billing"** (Parties/Contract/**Billing**/Setup/Documents)
    - Recurring Subscriptions: ContractPlans 목록 + Plans 페이지 링크
    - One-time Invoices: 연결된 인보이스 테이블 + "+ Issue" 버튼
    - **Negotiated Financial Terms (reference)** 상단 표시 — entity_type별 franchise_fee/royalty/base_rent/maintenance_fee 등 프리텍스트
  - Brand/Foodcourt Invoice Create Modal — URL `?contract_id=X&action=create` 자동 prefill + `contract_id` 저장
  - E2E 8/8 pass
- **P2 #3 / #4 — 불필요 결정** (docs/문서에 사유 기록)
  - #3 one_time charge_type: Irene 명시적으로 "일회성은 인보이스 발행" 방침 → #2에서 해결됨, 중복 경로 만들 필요 없음
  - #4 자동 불일치 경고: 협상↔실제 차이는 의도적일 수 있음(할인 등). 대신 Billing 섹션에 Negotiated terms 표시로 수동 비교 가능

**오후-마지막**: P3 Foodcourt Branch 모델
- 설계 문서 `docs/FOODCOURT_BRANCH_MODEL.md` 작성 + Irene 승인 결정 5건 반영
- S1 **DB + Model + 마이그레이션**
  - `foodcourt_branches` 신규 테이블 (id/foodcourt_id/name/code/is_primary/status/주소 세트/위도경도/operating_hours 등)
  - `foodcourt_units.branch_id` ADD
  - `FoodcourtBranch` 모델, `FoodcourtUnit` 에 branch_id + validate 훅 (branch↔foodcourt 일관성) + fullCode getter
  - Association: `Foodcourt.hasMany(branches)`, `FoodcourtBranch.hasMany(units)`, `FoodcourtUnit.belongsTo(branch)`
  - 마이그레이션 스크립트 — 기존 foodcourt "Central Food Hall" 에 primary branch 자동 생성 (code="CFH", is_primary=true), 유닛 할당
- S2 **API** — `routes/foodcourt-branches.js` (CRUD + 권한)
  - Foodcourt General / System Admin 접근
  - code 필수 수동 입력, foodcourt 내 unique (A-Z0-9 검증)
  - is_primary 삭제 차단, unit 존재시 삭제 차단
  - inactive branch 에 신규 unit 불가
- S2 **foodcourt-units 라우트 확장** — branch_id 필수, (branch_id, unit_number) unique, 지점 이동 허용
- S3 **FoodcourtBranchesPage UI** (`/pos/foodcourt/branches`) — 리스트/추가/편집 모달, primary 배지, 상태 배지
- S3 **App 라우트 + 사이드바** — "Branches" 메뉴 추가 (Foodcourt General만)
- S4 **ContractPipeline 카드 full code 표시** — `SUNWAY-A01` 형식 + branch 이름
- S4 **ContractDetail Unit 섹션** — full code (`SUNWAY-A01 (Sunway Pyramid)`) 표시
- E2E 15/15 pass (CRUD, 중복 방지, 지점 간 이동, inactive 차단, primary 보호)

### DB 변경 (dev 적용, 운영 배포 대기)
- `contracts.last_expiry_notification_day` ADD
- `invoices.contract_id` ADD
- `foodcourt_branches` 테이블 신규
- `foodcourt_units.branch_id` ADD
- `contract_tasks.is_required` ADD (P0 #3)

### 검증 결과
- state-hydration-check 0 warnings (여러 차례)
- 빌드 exit 0 (여러 차례)
- health-check 40/40 통과
- i18n verify Errors 0
- E2E 총합: Contract-Invoice 8/8, Branch 15/15, Expiry 7/7, P0 11/11, P1 12/12 = **53 pass / 0 fail**

### 다음 할 일

**운영 배포 (Irene `/배포`):**
- 이번 세션 변경 + DB 스키마 5건 (last_expiry_notification_day / invoices.contract_id / foodcourt_branches / foodcourt_units.branch_id / contract_tasks.is_required)

**후속 과제 (P3 다음):**
- Floor Plan 시스템 — Branch 단위 평면도 업로드 + 유닛 좌표 매핑
- Brand Franchise Map — 위도/경도 기반 매장 지도
- Contract.location_description → Floor Plan 좌표 연동
- 지점별/브랜드별 권한 (Foodcourt Manager / Brand Manager) — 별도 설계 문서
- Terminated/Expired 계약 리스트 필터 + 비활성 Restaurant 섹션
- P2 #4 아이디어 — Billing 섹션의 "Negotiated vs Plan" 대조 뷰 개선 (필요시)

**결정 완료 (개발 안 함):**
- 고객 회원가입 이메일 인증 — 전화번호 기반이라 불필요
- 주문 확인/영수증 메일 — 이미 WhatsApp/Telegram + PNG 다운로드로 완성
- P2 #3 entity_plans.one_time 확장 — 일회성은 invoice 직접 발행이 정책
- P2 #4 financial_terms ↔ plan 자동 경고 — 의도된 차이 많음 (false alarm)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
