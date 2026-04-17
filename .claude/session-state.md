## 현재 작업 상태
**마지막 업데이트:** 2026-04-17 19:15 UTC
**작업 상태:** 완료 (Contract Management Enhancement 설계 완료, 구현은 다음 세션)

---

## 🎯 다음 세션 시작 시 제일 먼저 할 것

**새 세션에서 아래 프롬프트를 그대로 복붙하세요:**

```
Contract Management Enhancement 구현 시작.
/var/www/.claude/session-state.md 읽어줘.
그리고 /var/www/docs/CONTRACT_MANAGEMENT_SYSTEM.md 의
"Contract Management Enhancement (2026-04-17 설계)" 섹션 읽어줘.
Phase 1부터 구현 시작. 30년차 수준으로 체계적으로, 검증하면서 진행해.
```

그러면 Claude가:
1. 설계 문서 읽기
2. Phase 1 DB ALTER 실행
3. `Contract.js` 모델 + `contracts.js` 라우트 확장
4. `ContractDetail.tsx` 탭 인터페이스 도입 + Parties 탭 구현
5. 신규 컴포넌트 (`BankInfoField`, `RepresentativeField`, `SyncMasterToggle`) 제작
6. Phase 1 검증 → Irene 확인 → Phase 2로

---

## 진행 중인 작업

- **Contract Management Enhancement** — 설계 1~4단계 완료 + 30년차 3개 관점 검증 반영 → 구현 대기

### 설계 완료 상태

**승인된 결정사항:**
- ✓ 옵션 A (단일 Contract 모델 + entityType 분기)
- ✓ Phase 1 → 2 → 3 순차
- ✓ 기존 24건: NULL로 유지
- ✓ 대표자: JSON 배열 (기본 1명)
- ✓ 계좌정보: JSON (`{bank, account, holder, swift?, currency?}`)

**30년차 검증으로 추가된 Critical 6건:**
- C1: `issuer_sync_with_master` 토글 (Brand/Foodcourt 마스터 동기화 ON/OFF)
- C2: `financial_terms` JSON 스키마 validate 훅
- C3: Support Services → `contract_tasks` 자동 생성 (Setup Stage 진입 시)
- C4: `legal_terms JSON` 추가 (준거법/분쟁해결/언어)
- C5: Percentage Rent 월별 인보이스 자동 반영은 **비범위** (Phase 4)
- C6: **탭 인터페이스** 도입 (Parties / Contract / Setup / Documents 4개 탭)

**Important 5건 + Nice-to-have 4건**도 문서화됨.

### DB 변경 계획 (다음 세션)

```sql
-- Phase 1
ALTER TABLE contracts
  ADD COLUMN applicant_business_registration VARCHAR(100),
  ADD COLUMN applicant_website VARCHAR(300),
  ADD COLUMN applicant_bank_info JSON,
  ADD COLUMN applicant_representatives JSON,
  ADD COLUMN issuer_company_name VARCHAR(200),
  ADD COLUMN issuer_business_registration VARCHAR(100),
  ADD COLUMN issuer_website VARCHAR(300),
  ADD COLUMN issuer_bank_info JSON,
  ADD COLUMN issuer_representatives JSON,
  ADD COLUMN issuer_sync_with_master BOOLEAN DEFAULT true;

-- Phase 3
ALTER TABLE contracts
  ADD COLUMN special_conditions JSON,
  ADD COLUMN renewal_policy JSON,
  ADD COLUMN exclusivity_terms JSON,
  ADD COLUMN support_services JSON,
  ADD COLUMN legal_terms JSON;

ALTER TABLE contract_tasks
  ADD COLUMN source_type ENUM('manual','support_service','setup_template') DEFAULT 'manual',
  ADD COLUMN source_code VARCHAR(50) NULL;
```

### 신규 컴포넌트 (Phase별)

**Phase 1**: `BankInfoField`, `RepresentativeField`, `SyncMasterToggle`, **TabContainer** (4탭)
**Phase 2**: `RentScheduleEditor`, `PercentageRentField`
**Phase 3**: `ConditionListEditor`, `SupportServicesChecklist`, `LegalTermsEditor`

### 설계 문서 위치

- **메인 설계**: `/var/www/docs/CONTRACT_MANAGEMENT_SYSTEM.md` — "Contract Management Enhancement (2026-04-17 설계)" 섹션
- 1~4단계 설계 + 5 구현계획 + 6 테스트 + 7 보완사항 + 8 비범위 포함

---

## 완료된 작업 (이번 세션 — 2026-04-16 ~ 04-17)

**구현 16건:**
1. 모바일 영수증 다운로드(PNG) + 공유(WhatsApp/Telegram/Web Share)
2. branch_name 전수 점검 (25파일)
3. 이미지 base64 감사 (recipes 3건 전환)
4. N:M 조인 테이블 DROP
5. 구독 전환 알림 보강 (Entity + Active→Overdue)
6. 인보이스 연체 리마인더 (D+3/D+7/D+14)
7. 타임존 전체 적용 (~74파일)
8. C-6 거대 컴포넌트 분할 (60% 감소)
9. DateField/DateRangeField 컴포넌트 통일 (42→0)
10. Link Restaurant 검색 fix
11. Applicant Information 필드 분리 (회사명/담당자)
12. Contract Information 비고란 추가 (6필드)
13. Franchise/Tenancy Terms 통화 심볼 + Security Deposit
14. ContractDetail 저장 실패 fix
15. Brand Dashboard Active Contracts 위젯
16. `/기능설계` 스킬 신규 + PlanQ 전달 문서

**설계 1건:**
17. Contract Management Enhancement 설계 (30년차 검증 반영)

## DB 변경 (dev 적용, 운영 배포 대기)
- `contracts.applicant_name` → `applicant_company_name` RENAME
- `contracts.applicant_contact_person` ADD
- `brand_product_brands`, `supplier_brands` DROP
- `recipes.image` 3건 base64 → 파일 URL

## Git
- 커밋: `eb53b49a` (2026-04-17)
- 푸시: 완료

## 검증
- 빌드 성공, 타입에러 0건
- health-check 40/40
- state-hydration-check 0 warnings

## 운영 배포 대기 (Irene 본인 실행)
이번 세션 16건 + Contract Enhancement Phase 1~3 구현 완료 후 일괄 배포 권장

---

## 서버 재시작 후 복구 가이드

**가장 빠른 시작:**
```
Contract Management Enhancement 구현 시작.
/var/www/.claude/session-state.md 읽어줘.
그리고 /var/www/docs/CONTRACT_MANAGEMENT_SYSTEM.md 의
"Contract Management Enhancement (2026-04-17 설계)" 섹션 읽어줘.
Phase 1부터 구현 시작.
```

**일반 복구:**
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
