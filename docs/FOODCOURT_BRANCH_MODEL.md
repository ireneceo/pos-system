# Foodcourt Branch Model — 설계 문서

**작성일:** 2026-04-19
**상태:** Irene 승인 완료 (2026-04-19) — 구현 진행 중
**대상:** Foodcourt 다지점(branch) 지원 기반 마련. Floor Plan 시스템의 선행 설계.

---

## 1. 기능 정의

### 1.1 현재 구조의 한계
- `foodcourts` 테이블은 **단일 레코드에 단일 주소** 구조 (`address`, `city`, `state`, `country`, `phone`)
- **"Central Food Hall" 같은 Foodcourt 법인이 여러 지점(Sunway Pyramid점, Pavilion점, Mid Valley점)을 가질 수 없음**
- `foodcourt_units`는 `foodcourt_id`로 직접 연결 — 유닛이 어느 "지점"에 속하는지 구분 없음
- 결과: 같은 법인의 유닛이 마치 모두 같은 건물에 있는 것처럼 섞임

### 1.2 요구사항
1. **1 Foodcourt 법인 = N Branch** 지원 (지점별 주소, 운영시간, 연락처, 평면도 분리)
2. **기존 Foodcourt 데이터 무손실 마이그레이션** — 기존 1건(Central Food Hall)도 "기본 지점" 으로 자동 변환
3. **FoodcourtUnit 은 Branch 에 귀속** — 유닛의 물리적 위치는 지점 단위로 관리
4. **Contract.unit_id**는 유지 (기존 계약 영향 없음) — 유닛 자체가 Branch 를 참조하게만 바뀜
5. **Brand Franchise Map / Floor Plan** 시스템의 전제조건 — Floor Plan 은 Branch 단위로 업로드

### 1.3 비범위 (이 설계에서 제외)
- Floor Plan 이미지 업로드 + 유닛 좌표 매핑 (별도 후속 설계)
- Brand Franchise Map (지역별 매장 지도 뷰)
- Contract.location_description → Floor Plan 좌표 자동 동기화
- Branch별 독립 정산/회계

---

## 2. 데이터 모델

### 2.1 신규 모델 `FoodcourtBranch`

```
foodcourt_branches
├── id                    INT PK auto
├── foodcourt_id          INT NOT NULL  (FK → foodcourts.id)
├── name                  VARCHAR(255) NOT NULL   e.g. "Sunway Pyramid"
├── code                  VARCHAR(50) UNIQUE      e.g. "FC-SUNWAY-01"
├── is_primary            BOOL DEFAULT false      (마이그레이션된 "기본 지점" 표시)
├── status                ENUM('active','inactive') DEFAULT 'active'
├── address               TEXT
├── city                  VARCHAR(100)
├── state                 VARCHAR(100)
├── postal_code           VARCHAR(20)
├── country               VARCHAR(10)   (기본 = foodcourt.country)
├── phone                 VARCHAR(20)
├── email                 VARCHAR(100)
├── latitude              DECIMAL(10,7)  NULL    (지도 표시용 — P3 후속에서 사용)
├── longitude             DECIMAL(10,7)  NULL
├── operating_hours       JSON NULL              {mon: "10:00-22:00", ...}
├── notes                 TEXT NULL
├── created_at/updated_at
└── INDEX (foodcourt_id, status)
```

### 2.2 기존 모델 수정

#### `foodcourt_units`
- **`branch_id INT NULL`** 컬럼 ADD (FK → foodcourt_branches.id)
- 마이그레이션: 기존 유닛 전부 primary branch 에 할당
- `foodcourt_id` 는 유지 (중복이지만 권한 쿼리 편의 — FoodcourtGeneral이 특정 foodcourt 에 속한 유닛을 빠르게 필터)
- **규칙**: `branch.foodcourt_id` 와 `unit.foodcourt_id` 가 일치해야 함 (validate 훅)

#### `foodcourts`
- **수정 없음** — address/phone 등 상위 법인 공통 정보 유지
- 지점별 정보는 branch 로

### 2.3 마이그레이션 전략

각 기존 Foodcourt 에 대해:
1. `INSERT FoodcourtBranch` — foodcourt 의 address/city/state/phone/email 복사, `name="Main", is_primary=true`
2. 해당 foodcourt 의 모든 unit 에 `branch_id = 새로 생성된 branch.id` 업데이트
3. 원자적으로: 트랜잭션 안에서 처리

현재 운영 데이터: Foodcourt 1건만 있음 (Central Food Hall) — 마이그레이션 간단.

---

## 3. API 변경

### 3.1 신규 라우트 (`/api/foodcourts/:id/branches`)

| Method | Path | Role | 설명 |
|--------|------|------|------|
| GET | `/api/foodcourts/:id/branches` | Foodcourt General, System Admin | 지점 목록 |
| POST | `/api/foodcourts/:id/branches` | Foodcourt General, System Admin | 지점 추가 |
| GET | `/api/foodcourt-branches/:id` | 접근 권한자 | 지점 상세 |
| PUT | `/api/foodcourt-branches/:id` | Foodcourt General, System Admin | 지점 수정 |
| DELETE | `/api/foodcourt-branches/:id` | System Admin only | 지점 삭제 (unit 없는 경우만) |

### 3.2 기존 라우트 확장

- `GET /api/foodcourts/:id` 응답에 `branches` array include
- `GET /api/foodcourts/:id/units` 에 `?branch_id=X` 필터 추가
- `POST /api/foodcourts/:id/units` body 에 `branch_id` 필수 추가
- `PUT /api/foodcourt-units/:id` body 에 `branch_id` 허용 (지점 간 이동)

### 3.3 Contract 관련
- `GET /api/contracts/:id` — 기존 `unit` include 에 `unit.branch` 하위 include 추가
- 변경 없음: `contract.unit_id` 의미 동일

---

## 4. UI 변경

### 4.1 새 메뉴/페이지
- **사이드바 Foodcourt General 메뉴에 "Branches" 추가** — `/pos/foodcourt/branches`
  - 지점 리스트 테이블 (name/code/city/status/units count/primary 플래그)
  - "+ Add Branch" 버튼 → 지점 추가 모달
  - 각 행 클릭 → 지점 상세 (주소, 연락처, 운영시간, 위도/경도, 연결된 unit 수)

### 4.2 기존 페이지 영향

#### FoodcourtUnitsPage (기존)
- **Unit 생성/편집 시 "Branch" Select 필드 추가** (필수)
- 리스트에 "Branch" 컬럼 추가, Branch 필터 Select 추가
- 마이그레이션 후: 모든 기존 unit 이 primary branch 에 속한 상태로 노출

#### ContractPipeline 카드 (기존)
- Foodcourt 카드의 "Unit A-12 · 1층 에스컬레이터 앞" 옆에 **Branch 이름** 표시:
  - `Unit A-12 · Sunway Pyramid · 1층 에스컬레이터 앞`
- `location_description`은 유지 (P3 후속 Floor Plan 에서 좌표/위치명으로 대체)

#### ContractDetail (기존)
- Foodcourt 계약 Unit 섹션에 **Branch 표시** 추가

---

## 5. 권한/접근 제어

### 5.1 역할별 접근
| 역할 | Branches 관리 | Unit 관리 |
|------|---------------|-----------|
| System Admin | 전체 | 전체 |
| Foodcourt General | 자신의 foodcourt 소속 모든 branch | 자신의 foodcourt 모든 branch 의 unit |
| Foodcourt Manager | **지점별 제한 가능** (설계 선택지 — 아래 참조) | 할당된 branch 의 unit |

### 5.2 Foodcourt Manager 지점 제한 — 결정 필요

**현재**: `users.foodcourt_id` 로 Foodcourt General/Manager 가 foodcourt 전체를 담당
**선택지 A**: Manager도 foodcourt 전체 접근 (지점별 제한 없음) — 지금과 동일, 단순
**선택지 B**: Manager 는 특정 branch 할당 가능 — `users.branch_id` 추가 또는 별도 조인 테이블

**제 추천**: **A (지점 제한 없음)** — 복잡도 낮음. 후속 과제로 Manager-Branch 매핑 도입 여지 남김.

---

## 6. 확정된 의사결정 (Irene 승인 2026-04-19)

### Q1. Primary branch 이름 → **foodcourt.name 그대로**
- "Central Food Hall" 법인 → primary branch name = "Central Food Hall"

### Q2. 지점 code → **필수 수동 입력** (자동 생성 X)
- 운영자가 지점의 정확한 위치/식별 기준으로 직접 부여 (예: `SUNWAY`, `PAVILION`, `MIDVALLEY`)
- 한 foodcourt 내에서 unique

### Q3. Unit 식별 → **(branch_id, unit_number) unique**
- 다른 branch 에 같은 unit_number 허용
- **Full Code = `{branch.code}-{unit_number}`** — computed getter 제공
  - 예: `SUNWAY-A01`, `PAVILION-A01`
  - 모든 UI 표시에 full code 사용 (계약 카드, 계약 상세, 인보이스, 리스트)

### Q4. 지점별 Manager 권한 → **이번 P3 범위 제외**
- 이번엔 Branch 모델/기반만 구축. Foodcourt General 은 foodcourt 전체 접근 (기존 동작 유지)
- 후속 과제: Foodcourt Manager 지점별 권한 + Brand General/Manager 브랜드별 권한 (별도 설계 문서 필요)
- 이유: users 테이블 확장 + 조인 테이블 + 전체 라우트 권한 체크 추가 → P3 보다 큰 스프린트

### Q5. Branch inactive 처리
- Branch 자체 inactive → 새 계약 체결 차단, 기존 계약/unit 보존+편집 가능, 읽기 전용 표시
- Unit 개별 비활성/계약 만료 시 별도 리스트(계약관리 / 레스토랑 리스트) → **별도 후속 과제**로 분리

---

## 7. 구현 단계

| Slice | 내용 | 규모 |
|-------|------|------|
| S1 | DB + Model (`FoodcourtBranch`, `foodcourt_units.branch_id`) + 마이그레이션 스크립트 | 소 |
| S2 | Backend API (Branches CRUD + Unit API에 branch_id) | 중 |
| S3 | FoodcourtGeneral Branches 페이지 (신규) | 중 |
| S4 | FoodcourtUnitsPage 수정 — Branch 필터/Select 추가 | 소 |
| S5 | ContractPipeline / ContractDetail — Branch 이름 표시 | 소 |
| S6 | 검증 — E2E (Branch CRUD + Unit 이동 + Contract 연결) + health-check | 소 |

**전체 규모**: **대** — 신규 DB 모델 1개, 신규 라우트/UI 페이지 추가, 마이그레이션 포함

---

## 8. 후속 과제 (P3 이후)

- Floor Plan 시스템 — Branch 단위 평면도 업로드, 유닛 좌표 매핑
- Contract.location_description → Floor Plan 좌표 연동
- Brand Franchise Map — 위도/경도 기반 지도
- Manager-Branch 매핑 (필요시)
- Branch별 인보이스 발행자 분리 (필요시)

---

## 9. 검증 계획

- 마이그레이션 스크립트 idempotent 검증 (두 번 실행해도 primary branch 중복 생성 X)
- 기존 Contract 영향 없음 (unit_id 그대로, unit.branch 조회 시 primary branch 자동 할당)
- Foodcourt General 권한 검증 (다른 foodcourt 의 branch 접근 차단)
- FoodcourtUnit 이동 — branch_id 변경 시 foodcourt_id 일관성 검증 훅
- health-check 40/40 통과
- `/pos/foodcourt/tenancy` Pipeline 카드에 Branch 이름 노출 확인
