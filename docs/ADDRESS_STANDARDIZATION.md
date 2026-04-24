# Address Standardization — Global Unification

> **상태:** 설계 완료 (2026-04-24)
> **범위:** 9개 엔티티 주소 통일 + Cross-brand 정합성 규칙 + 데이터 정제
> **영향:** DB 스키마 변경, 프론트/백엔드 유틸 신규, 입력 폼 전면 교체, 마이그레이션
> **설계 리뷰:** 30년차 개발자 관점 검증 반영 (2026-04-24)

---

## 0. 배경 — 왜 이걸 하는가

### 발견된 문제 (2026-04-24)
1. **with MIN Cafe (restaurant id=10) 증상**: 계약/플랜 연결했는데 franchise-map 에서 "No contract / No plan" 표시
2. **근본 원인**: restaurant.brand_id=4 인데 linked Contract #23 의 entity_id=1, linked plan 들의 entity_id=1. Franchise-map API는 `entity_id = brandId` 로 필터 → cross-brand 데이터 제외됨
3. **근본 근본 원인**: 주소/엔티티 정합성 규칙 부재 + 링크 UI 가 브랜드 일치 검증 없이 허용

### 주소 필드 전수 조사 (9개 엔티티)

**[A] 구조화 분리 이미 되어있음 — 타입/규칙만 불일치**
| 엔티티 | country 현재 | 이슈 |
|---|---|---|
| brands | VARCHAR(10), def "MY" | ✓ |
| foodcourts | VARCHAR(10), def "MY" | ✓ |
| foodcourt_branches | VARCHAR(10) | ✓ |
| restaurants | **VARCHAR(100), def "Malaysia"** | ⚠ 풀네임 저장. lat/lng도 DOUBLE (타 테이블 DECIMAL(10,7)) |
| company_settings | **VARCHAR(100)** | ⚠ 풀네임 |

**[B] Freeform 한 줄 — 구조 분리 필요**
| 엔티티 | 현재 | 조치 |
|---|---|---|
| users.address | TEXT (freeform) | 6필드 확장 |
| suppliers.address | TEXT (freeform) | 6필드 확장 |
| hardware_quotes.company_address | TEXT + country_code CHAR(2) 별도 | 6필드 확장, country_code 흡수 |

**[C] 구조화 제외 — 의도적 freeform 유지**
| 엔티티 | 이유 |
|---|---|
| invoices.external_payer_address | 인쇄용 스냅샷. `formatAddress()` 결과 저장. 재사용 거의 없음 |

**[D] 대상 아님**
- activity_logs.ip_address, system_logs.ip_address — 네트워크 IP 로그

---

## 1. 표준 스키마 (Canonical Address)

모든 물리적 주소를 가지는 엔티티는 아래 7+2 컬럼으로 통일:

```sql
address          TEXT                          -- 도로명/거리 (Line 1)
address_line_2   VARCHAR(255) NULL             -- 단위/층/건물명 (Line 2, 선택)
city             VARCHAR(100) NULL
state            VARCHAR(100) NULL
postal_code      VARCHAR(20) NULL
country          CHAR(2) NULL                  -- ISO 3166-1 alpha-2 (MY, KR, SG, ...)
-- 물리 위치 필요시에만:
latitude         DECIMAL(10,7) NULL
longitude        DECIMAL(10,7) NULL
```

### 설계 결정 이유

| 결정 | 대안 | 선택 이유 |
|---|---|---|
| `country` CHAR(2) | VARCHAR(100) | 국제 표준 ISO 3166-1 alpha-2. DB 용량/인덱스 유리. `i18n-iso-countries` 라이브러리로 표시명 변환 |
| lat/lng DECIMAL(10,7) | DOUBLE | ~1cm 정밀도 (충분), 정확한 소수 저장 (DOUBLE 부동소수 오차 없음), 전 테이블 통일성 |
| `address_line_2` 신규 | address 단일 | 국제 표준 (Google Places, Stripe, Shopify). 아파트/유닛 번호 분리 |
| `postal_code` regex 검증 **경고만** | 차단 | UK/US/KR 형식 천차만별, 전세계 7,000+ 형식 존재. 차단 시 legitimate 입력도 막음 |
| `formatAddress` locale-aware | 단일 format | 한국: 국→도→시→동→거리 역순. 서구: 거리→시→주→국 순. 문화별 포맷 |

### lat/lng 적용 대상 (물리 위치)
- restaurants ✓ (매장 위치, 지도 표시)
- foodcourt_branches ✓ (지점 위치)
- **foodcourts (마스터) ✗** — 마스터는 논리 단위, branches에만
- **brands ✗** — 브랜드는 본사 개념, 지도 표시 불필요
- **company_settings ✗** — 플랫폼 운영사 주소
- **users, suppliers, hardware_quotes ✗** — 지도 표시 불필요

---

## 2. 정합성 규칙 (Integrity Rules) — **철회됨 (2026-04-24 저녁)**

### 회고 — R1/R2 폐기 사유

2026-04-24 저녁 Irene 지적으로 R1/R2 방어선이 도메인 모델상 **잘못된 설계**임이 드러나 전면 제거됨.

**오류의 핵심**:
- Contract UI 에는 브랜드 선택 필드가 **존재하지 않음**. `contracts.entity_id` 는 로그인한 BG 유저의 `brand_id` 가 자동으로 찍히는 invisible 메타데이터일 뿐.
- 사용자가 의식적으로 지정한 적도 없는 필드를 근거로 Restaurant 의 정당한 브랜드 변경을 400으로 차단하고 있었음.
- 올바른 도메인 모델: **Restaurant 은 살아있는 엔티티**(컨셉/방향/세무/브랜드 유연 변경), **Contract 는 특정 시점 합의의 스냅샷 기록**. 스냅샷이 살아있는 엔티티의 미래 변경을 제약하면 안 됨.
- Plan(EPR) 도 마찬가지로 "청구 관계 기록"일 뿐 restaurant 의 상위 제약이 아님.

**제거 범위 (모두 2026-04-24 저녁 완료)**:
- `routes/restaurants-crud.js` PUT — R1 BRAND_MISMATCH 차단 제거
- `routes/brands.js` plan 배정 — R1 차단 제거
- `routes/foodcourts.js` plan 배정 — R2 차단 제거
- `routes/contracts.js` POST — restaurant 연결 시 R1/R2 차단 제거 (존재 체크만 유지)
- `scripts/cleanup-addresses.js` — `enforceBrandIntegrity`/`enforceFoodcourtIntegrity` 함수 제거. EPR cross-brand 는 informational 경고로만 남김

**결과**:
- Restaurant brand_id 변경 자유 (PUT 200 OK 검증 완료)
- Contract / EPR 는 historical record 로 그대로 보존 (snapshot 의 본질)
- `scripts/cleanup-addresses.js --apply` 는 이제 주소 sanitize 만 수행

### R3: 주소 정합성 (유지)
- `foodcourt_branches` 가 `foodcourts` 에 속하면 country 는 일치해야 한다 (경고, 차단 X)
- 중복 주소(address + postal_code 정확 일치) 감지 시 저장 시 경고

---

## 3. 공통 유틸

### 3.1 Frontend: `src/utils/formatAddress.ts`
```typescript
export interface Address {
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;  // ISO 3166-1 alpha-2
}

export type AddressFormat = 'full' | 'short' | 'location' | 'oneline';

export function formatAddress(addr: Address, format: AddressFormat = 'full'): string;
export function getCountryName(iso2: string, locale: 'en' | 'ko' | 'zh' | 'ms'): string;
```
- `i18n-iso-countries` npm 패키지 사용 — 250 국가 × 4언어 표시명
- `full`: 전체 풀 포맷 (country-aware order)
- `short`: 도시 + 주/지역
- `location`: 도시 + 국가만
- `oneline`: 단일 줄 (UI picker, 테이블)
- Country 별 order:
  - MY/US/GB/default: `line1, line2, city, state postal, country`
  - KR: `country state city district line1 line2 postal`
  - JP: `country postal state city line1 line2`

### 3.2 Backend: `utils/formatAddress.js`
- 동일 로직 (SSR/이메일/PDF용)

### 3.3 Backend: `middleware/addressValidation.js`
- `sanitizeAddress(body)` — 줄바꿈/탭 제거, 앞뒤 공백, country 대문자화
- `validateAddress(body, { required: [] })` — 필수 필드 체크
- Postal code 경고만 (차단 X), country는 ISO 리스트 membership 체크

---

## 4. 공통 컴포넌트 `<AddressFields />`

**위치**: `src/components/Form/AddressFields.tsx`

**Props**:
```typescript
interface AddressFieldsProps {
  value: Address;
  onChange: (addr: Address) => void;
  showLatLng?: boolean;
  required?: ('address' | 'city' | 'country')[];
  compact?: boolean;  // 2-col layout
  defaultCountry?: string;  // e.g., 'MY'
}
```

**UI 사양**:
- Address Line 1: single-line input (줄바꿈 차단)
- Address Line 2: single-line input (선택)
- City / Postal Code: 나란히
- State / Country: 나란히 (Country = searchable Select with flag)
- Country 변경 시 placeholder (예: "Selangor" for MY, "서울" for KR)
- Lat/Lng (showLatLng=true): readonly display + "Auto-geocode" 버튼 (Nominatim)
- 모든 라벨 i18n

**i18n namespace**: `common:address.*`

---

## 5. 데이터 마이그레이션

### 5.1 스키마 변경 스크립트: `scripts/migrate-address-schema.js`
**Additive 방식 — 기존 컬럼 건드리지 않고 추가만**:
1. 모든 주소 보유 엔티티에 `address_line_2 VARCHAR(255) NULL` 추가
2. `restaurants`: `country` → VARCHAR(100) 유지하되 새 컬럼 `country_iso CHAR(2) NULL` 추가. 마이그레이션 후 별도 Phase에서 swap
3. `restaurants.latitude/longitude`: 새 컬럼 `latitude_v2 DECIMAL(10,7)`, `longitude_v2 DECIMAL(10,7)` 추가. 나중에 swap
4. `users`, `suppliers`: 신규 컬럼 6개 추가 (address 는 이미 존재)
5. `hardware_quotes`: 신규 컬럼 5개 추가 (address, city, state, postal_code 는 없음; country_code 는 CHAR(2) 이미 존재 — 유지)

### 5.2 데이터 정제 스크립트: `scripts/cleanup-addresses.js`
**Dry-run 필수 → 리포트 → 승인 → apply**
1. **Country 정규화**: "Malaysia" / "malaysia" / "말레이시아" → "MY" / "Korea" / "한국" / "KR" → "KR" 등 (매핑 테이블 하드코딩, 미매칭은 NULL 로)
2. **줄바꿈/탭 sanitize**: `\n`, `\t`, `\r` → 공백, 중복 공백 축약
3. **address 자동 파싱 **안 함**** (30년차 검증: 휴리스틱 파싱은 신뢰도 낮음, 사용자가 재편집 때 구조 입력)
4. **Cross-brand R1/R2 정합성 적용**:
   - 모든 restaurant 순회
   - 활성 franchise 계약 있는데 brand_id mismatch → 최신 signed_date 활성 계약의 entity_id 로 restaurant.brand_id 업데이트 (ActivityLog 기록)
   - 활성 plan (EntityPlanRestaurant) mismatch → 동일 원칙
5. **리포트 출력**: 변경 전/후 diff, 스킵된 항목 이유

### 5.3 컬럼 swap (Phase 2 종료 후 별도 실행)
- Additive 방식으로 추가한 `_v2` 컬럼들을 검증 완료 후 기존 컬럼과 swap
- 이전 컬럼은 archive 테이블로 이동 (즉시 DROP 안 함) — 롤백 안전장치

### 5.4 운영 DB 대응
- dev 완전 검증 후 동일 스크립트 운영 DB 에 dry-run → diff 리포트 → Irene 승인 → apply
- 배포 스크립트 통합 대상

---

## 6. 글로벌 적용 (프론트 페이지 교체)

| 페이지 | 역할 | 변경 |
|---|---|---|
| Admin/RestaurantsPage | System Admin | new + edit 모달 → `<AddressFields showLatLng />` |
| FoodcourtGeneral/FoodcourtBranchesPage | FG | 모달 → `<AddressFields showLatLng />` |
| Admin/BrandsPage | System Admin | `<AddressFields />` |
| Admin/FoodcourtsPage | System Admin | `<AddressFields />` |
| Admin/CompanySettings (있다면) | System Admin | `<AddressFields />` |
| ProfilePage | All | `<AddressFields />` (users) |
| SuppliersPage | Owner/Manager | `<AddressFields />` |
| HardwareQuote form | Landing/Admin | `<AddressFields />` |

**표시 위치 (formatAddress 유틸 사용)**:
- 모든 매장/지점 카드/리스트
- 지도 상세 패널
- 인보이스 PDF
- 이메일 템플릿
- 계약서 발행자/수신자 주소

---

## 7. UX — 잘못된 링크 방지

### 7.1 Picker 개선
- 매장 선택 리스트: `formatAddress(short)` + 소속 브랜드/푸드코트 **뱃지** 표시
- 현재 로그인 브랜드와 mismatch 매장은 회색 + "다른 브랜드 소속" 툴팁
- 완전 차단 X (시스템 관리자는 cross-brand 지원 가능)

### 7.2 링크 확정 전 확인 Step
- 매장 X 를 브랜드 Y의 플랜 Z 에 연결 시 모달 확인 문구 명시:
  - `"매장 'X' (소속: 브랜드 X-Brand) 을 브랜드 Y 의 플랜 Z 에 연결합니다."`
  - 소속 불일치 시 빨간 경고 + 확정 버튼 disabled (관리자만 override)

### 7.3 중복 주소 경고
- 저장 시 동일 `address + postal_code + country` 기존 레코드 조회 → 있으면 "이 주소는 {다른 매장명} 과 중복됩니다. 계속하시겠습니까?" 모달

---

## 8. 구현 순서

| # | 작업 | 선행 | 검증 |
|---|---|---|---|
| 1 | 설계 문서 (이 파일) | — | — |
| 2 | `i18n-iso-countries` 설치 + country list 유틸 | 1 | unit test |
| 3 | `utils/formatAddress.ts` (프론트) + `utils/formatAddress.js` (백) | 2 | unit test (country별 format) |
| 4 | 스키마 마이그레이션 — additive | 1 | `SHOW COLUMNS` 확인 |
| 5 | `middleware/addressValidation.js` | 3, 4 | unit test |
| 6 | `<AddressFields />` 컴포넌트 | 3 | 스토리북 대신 Admin/RestaurantsPage 에서 먼저 검증 |
| 7 | Cross-brand 링크 API 검증 복원 (brands.js, foodcourts.js) | — | 실제 API 호출 테스트 |
| 8 | 데이터 정제 스크립트 `cleanup-addresses.js` (dry-run 먼저) | 4 | dry-run diff 리포트 |
| 9 | 9개 엔티티 입력 페이지 전면 교체 | 6 | 역할별 흐름 검증 |
| 10 | 표시 위치 formatAddress() 치환 | 3 | 빌드 후 지도/리스트 시각 검증 |
| 11 | Picker UX 개선 (brand 뱃지, 확인 step, 중복 경고) | 7 | 실제 링크 시도 |
| 12 | cleanup 스크립트 apply (dev DB) | 8, 11 | with MIN Cafe 포함 검증 |
| 13 | i18n 4언어 키 추가 | 9 | `npm run i18n:verify` |
| 14 | health-check 전체 | 전부 | 40/40 pass |
| 15 | 빌드 + dev 배포 | 14 | 실제 URL 접속 검증 |
| 16 | 운영 DB audit 스크립트 실행 (read-only) | 15 | 리포트 |

---

## 9. 검증 기준 (완료 정의)

### 9.1 데이터 정합성
- 모든 restaurant 의 brand_id 가 활성 franchise 계약의 entity_id 와 일치
- with MIN Cafe 의 franchise-map 상세 패널에 Contract #23 + 연결된 plan 들이 정상 표시
- country 값이 전 레코드 ISO 2자 코드 (또는 NULL)
- address 필드에 `\n`/`\t` 없음

### 9.2 기능
- 9개 엔티티 모든 입력 폼에서 `<AddressFields />` 사용
- 모든 주소 표시 위치가 `formatAddress()` 경유
- 동일 주소 중복 저장 시 경고 뜸
- Cross-brand 링크 시도 시 명확한 에러 / 경고

### 9.3 비회귀
- 전 역할 (SA / BG / FG / Manager / Owner) 로그인 → 주소 보기/편집 정상
- 기존 franchise-map, tenancy-map, contract detail, restaurant detail 정상
- 인보이스 PDF 주소 렌더 정상
- health-check 40/40

---

## 10. 리스크 및 완화

| 리스크 | 완화 |
|---|---|
| 마이그레이션 중 데이터 손실 | Additive 방식 + 원본 컬럼 유지 + DB 백업 선행 |
| 운영 DB 큰 테이블 ALTER 지연 | 새 컬럼은 NULL 허용이라 즉시 완료. 데이터 update 는 배치 (1000건씩) |
| Nominatim rate limit | 현 geocoding.js 이미 1req/s 스로틀. 신규 요청 제한 유지 |
| 국가별 포맷 완벽성 부족 | MY/KR/JP/US/default 만 우선 구현. 나머지 default 포맷. 요청 오면 추가 |
| 데이터 정제 휴리스틱 오류 | 자동 파싱 안 함. 자동 정리는 sanitize + country 매핑만 |
| 역할별 UI 회귀 | 전 역할 흐름 수동 검증 + health-check |

---

## 11. 문서 변경 이력

- 2026-04-24: 최초 설계 (with MIN Cafe 증상에서 촉발). 30년차 리뷰 반영 (address_line_2 추가, 자동 파싱 배제, additive 마이그레이션, postal regex 경고-only).
