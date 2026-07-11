# 임차인 임대료 청구 (Tenant Rent Billing)

> 2026-07-11 설계. 계약의 임대 조건으로 **매월 임대료 청구서를 자동 발행**하고, 운영자가 임차인별 납부·연체를 관리한다.
> 제품은 F&B 전용 → 기존 푸드코트 명칭·역할·테이블은 **그대로 유지**(리네임 없음). 기능은 계약·유닛 기준이라 백화점 식품관·몰 식품관에도 그대로 적용된다.

## 1. 왜 필요한가 (실측)

- 계약에는 임대 조건 스키마가 **이미 있다** (`contracts.financial_terms`: base_rent / maintenance_fee / rent_schedule / security_deposit …)
- 계약 상세 화면에도 **입력 UI가 이미 있다** (`RentScheduleEditor`, 관리비 `CurrencyInput`, `PercentageRentField`)
- 그런데 **청구가 한 번도 발생한 적이 없다** — `invoice_categories` 에 `rent` 코드 자체가 없고(2026-07-11 실측: consulting/hardware/others/service/trade/training), 운영 임대료 인보이스 0건
- 그 결과 `/pos/foodcourt/rent-management` 페이지는 `// TODO: Implement API call` → 항상 빈 데이터(매장 0, 임대료 0)

즉 **입력은 되는데 청구가 없다.** 이 문서는 그 빠진 고리를 채운다.

## 2. 범위

**포함**: 임대 조건(청구일·유예일) 입력 · 월 임대료 인보이스 자동 발행(멱등) · 임차인별 납부/연체 현황 화면 · 계약 종료 시 청구 중단
**비범위**: 매출연동 임대료(revenue share) 정산 · 보증금 관리/반환 · 연차별 인상 자동 적용(`rent_schedule` 은 입력만 유지) · 외부 회계 연동 · 테이블/역할 리네임

## 3. 명칭

| 대상 | 이름 |
|---|---|
| 기능 도메인 | Tenant Rent Billing (임차인 임대료 청구) |
| API | `/api/rent/*` (라우트 파일 `routes/rent-billing.js`) |
| 인보이스 카테고리 | `rent` |
| 화면 | 임대 관리 (Rent Management) — 기존 페이지 |
| 당사자 | 임대사업자(발행) / 임차인(수취) |

기존 코드·테이블·역할 문자열(`foodcourts`, `Foodcourt General` 등)은 **변경하지 않는다** — 권한 가드 전반에 박혀 있어 리네임은 이득 대비 사고 위험이 크다.

## 4. API

### 재사용 (신규 개발 0)
| API | 용도 |
|---|---|
| `PUT /api/contracts/:id` | 임대 조건 저장 (`financial_terms`) — 이미 존재·검증됨 |
| `GET /api/invoices` + 결제/이메일 | 임차인이 임대료 청구서 수신·결제 |

### 신규 — `routes/rent-billing.js` (마운트 `/api/rent`)

**`GET /api/rent/tenants`** — 임차인별 임대 현황
- 권한: `authenticateToken` + 운영자 스코프(자기 `entity_id` 계약만) · System Admin 전체
- 쿼리: `status=all|paid|pending|overdue`, `search`
- 응답: `{ success, data: [{ contractId, tenantName, restaurantId, unit, monthlyRent, maintenanceFee, currency, billingDay, dueDate, status, daysOverdue, lastInvoice{id,number,amount,status}, contractEndDate, contactPhone }] }`

**`GET /api/rent/summary`** — 상단 통계
- 응답: `{ success, data: { totalTenants, paid, pending, overdue, monthlyRentTotal, currency } }`

**`POST /api/rent/generate`** — 임대료 청구서 발행 (멱등)
- 권한: System Admin (+ 스케줄러 내부 호출)
- Body: `{ month?: "YYYY-MM", contractId?: number }` (없으면 이번 달 전체)
- 동작: `stage='active'` + `base_rent > 0` 계약만 → 해당 월 인보이스 존재 시 **skip**
- 응답: `{ success, data: { generated, skipped, errors } }`

### 스케줄러
`invoiceScheduler.generateRentInvoices()` — 기존 `generateSubscriptionInvoices()` 와 동일 패턴(사이트 타임존·advance days·SchedulerRun 기록). 계약이 `terminated`/`expired` 면 자동 중단.

### 보안
- 운영자는 **자기 계약만** — `contracts.entity_type/entity_id` 기준. 타 운영자 임차인 노출 0 (IDOR)
- `restaurant_id` 는 클라이언트 값을 신뢰하지 않고 **계약에서 도출**

## 5. DB — 신규 테이블 0개

| 항목 | 변경 |
|---|---|
| 신규 테이블 | **없음** (`contracts` · `invoices` · `foodcourt_units` 로 충분) |
| `invoice_categories` | **`rent` 행 1개 추가** — `invoices.invoice_category` 는 varchar(50) 이라 **ALTER 불필요** |
| `contracts.financial_terms` (JSON) | 키 추가 + 모델 검증: `base_rent`(DECIMAL) · `maintenance_fee`(DECIMAL) · `billing_day`(1~28, 기본 1) · `grace_days`(0~60, 기본 5) |
| `invoices` | **변경 없음** — `contract_id` · `issuer_type/id` · `payer_type/id` · `billing_period_*` · `due_date` 전부 존재 |

**청구일 29~31 금지** — 월말이 없는 달에서 발행 누락/이중 발행이 생긴다.

### 멱등 (한 달에 정확히 1장)
```sql
WHERE contract_id = :cid AND invoice_category = 'rent' AND billing_period_start = :monthStart
```
스케줄러가 하루 여러 번 돌거나 수동 발행을 눌러도 중복 발행 0.

### 인보이스 필드 매핑
`issuer_type='foodcourt'` · `issuer_id`=계약 entity_id · `payer_type='restaurant'` · `payer_id`=임차 매장 · `invoice_category='rent'` · `billing_period_*`=해당 월 · `due_date`=청구일+`grace_days` · 금액=`base_rent + maintenance_fee`

### 마이그레이션
- `scripts/migrate-rent-category.js` (멱등 INSERT) + **`migrations.registry.json` 에 `deploy` 등록** (미등록 시 배포 게이트가 fail-closed 로 차단)
- `sync-database.js` 불필요(컬럼 변경 0) · 롤백 = 코드 되돌리기

## 6. UI — 신규 페이지 0 · 신규 컴포넌트 0

**계약 상세 · 재무 탭** (기존 화면): 청구일 · 납기 유예일 입력 2개 추가. 안내 — "기본 임대료가 입력된 활성 계약은 매월 청구일에 임대료 청구서가 자동 발행됩니다."

**임대 관리** (`/pos/foodcourt/rent-management`, 기존 페이지 실배선):
- StatCard 4 ← `GET /api/rent/summary`
- 필터(상태·검색) + DataTable ← `GET /api/rent/tenants` — 임차 매장 · 유닛 · 월 임대료 · 납기일 · 상태 · 연체일수 · 계약 종료일
- 행 액션: 인보이스 보기 · 청구서 발행(미발행 월 + System Admin)
- 빈 상태: `DataTableEmpty` "임대 조건이 입력된 활성 계약이 없습니다" + CTA → `/pos/foodcourt/tenancy`
- 사이드바에 **"임대 관리" 메뉴 추가**(현재 라우트만 있고 메뉴에 없음)

**임차인 쪽**: 변경 0 — 기존 인보이스 목록/상세/결제에 `rent` 청구서가 그대로 나타난다.

상태 배지 색 = 기존 인보이스 팔레트(납부 `#059669` / 미납 `#D97706` / 연체 `#EF4444`). 공용 `DataTable`/`StatCard`/`Button`/`FilterSelect` 사용. 이모지 금지.

## 7. 성공 기준 / 회귀 가드

- 계약에 월 임대료 입력 → 청구일에 인보이스 **실제 발행** → 임차인 인보이스 목록에 노출 → 운영자 화면에 납부/연체 실데이터 표시
- 계약 종료 시 청구 중단 · 타 운영자 임차인 노출 0
- **health-check 회귀**: ① 임대료 인보이스는 한 달에 정확히 1장(중복 발행 0) ② 임대 현황 API 는 자기 계약만 반환(누락 0 · 유출 0) ③ 청구일 29~31 거부


---

## 8. 구현 완료 (2026-07-11)

### 구현된 것
| 항목 | 파일 |
|---|---|
| 발행 로직 (단일 소스) | `dev-backend/services/rentBilling.js` — 스케줄러와 수동 발행이 **이 함수 하나**를 공유 |
| API 3개 | `dev-backend/routes/rent-billing.js` (`/api/rent/tenants` · `/summary` · `/generate`) |
| 스케줄러 합류 | `services/invoiceScheduler.js` `generateRentInvoices()` — 일일 실행에 포함(같은 SchedulerRun·에러 집계) |
| 계약 검증 | `models/Contract.js` — `base_rent`/`maintenance_fee` 음수 거부 · `billing_day` 1~28 · `grace_days` 0~60 |
| 마이그레이션 | `scripts/migrate-rent-category.js` (멱등) + `migrations.registry.json` `deploy` 등록 |
| 화면 | `pages/Foodcourt/RentManagement.tsx` 실배선 · `components/Contract/ContractDetail.tsx` 청구일·유예일 · `MainLayout` 사이드바 메뉴 |

### 구현 중 발견·수정한 결함
- **임대 관리 라우트가 `Foodcourt Manager` 만 허용** → 정작 임대사업자인 **`Foodcourt General`(총괄)이 자기 임대 화면에 못 들어갔다.** `App.tsx` 라우트 가드에 총괄 추가.
- 화면의 "임대료 설정" 모달·"일괄 청구서 발송" 버튼은 **로컬 state 만 바꾸는 가짜**였다 → 제거. 임대 조건의 단일 소스는 계약이므로 페이지에서 별도 입력받지 않고 계약으로 보낸다(진실 2개 방지).
- 통계 카드의 `+5% vs last month` 가짜 트렌드 제거. 임차인 0명일 때 `NaN%` 나오던 것도 수정.

### 검증
- 실호출 **13/13**: 발행 · 금액(기본+관리비) · 발행자(임대사업자)/수취자(임차인) · 명세 2건 · 납기일=청구일+유예일 · **멱등(재발행 0)** · 현황 · 요약 · **IDOR 0** · 임차인 발행 불가 403 · 계약 종료 시 중단 · 청구일 29~31 거부
- health-check `pos` **19/19** — 신규 계약 2건(임대료 한 달 1장+종료 시 중단 / 익명 401). **멱등 검사를 제거하면 정확히 그 1건만 실패**하는 것까지 실증(fail-closed)
- 실브라우저: 임대 관리 화면 실데이터 렌더(RM 2,650 = 기본 2,500 + 관리비 150) · 크래시 0
- 인쇄 계약 8/8 · 인쇄 라우트 34/34 (사이드바 메뉴 추가로 `MainLayout` 지문 변경 → Irene 승인 후 bless)

### 남은 것 (다음 사이클 후보)
- 임대료 인보이스 **이메일 발송**(기존 인보이스 이메일 파이프라인 재사용) · 연체 리마인더
- `rent_schedule`(연차별 인상) 자동 적용 — 현재는 입력만 유지, 청구는 `base_rent` 기준
- 매출연동 임대료(percentage rent) 정산
