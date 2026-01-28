# Claude Code 프로젝트 규칙

## 보안 규칙 (최우선!)

### AI에게 절대 보여주면 안 되는 정보
- `.env` 파일 실제값 (DB 비밀번호, JWT 시크릿 등)
- SSH 키, 인증서 파일 (`*.pem`, `*.key`, `*.crt`)
- sudoers 설정, sudo 비밀번호
- API 키, 외부 서비스 credentials
- 사용자 개인정보 (실제 데이터)

### 작업 지시 시 4줄 규칙 (습관화)
모든 코드 수정 요청 시 다음을 명시할 것:
```
수정 범위: [어떤 파일/기능을 수정하는지]
금지사항: [건드리면 안 되는 것]
테스트: [수정 후 확인 방법]
롤백: [문제 시 복구 방법]
```

## 배포 규칙 (필수!)

### 운영서버 배포 금지
- **운영서버 배포는 절대로 자동으로 하지 않는다**
- 운영서버 배포는 **오직 사용자가 `/배포` 명령어를 실행했을 때만** 수행한다
- 개발 완료 후 "배포할까요?" 같은 질문도 하지 않는다
- `deploy-production.sh` 스크립트는 `/배포` 명령어 없이 실행하지 않는다

### 개발서버 배포 (필수!)
- 개발서버(`dev-backend`, `dev-frontend`)는 자유롭게 배포 가능
- **프론트엔드 빌드/배포는 반드시 스크립트 사용:**
  - dev-frontend: `cd /var/www/dev-frontend && npm run build:dev`
  - **절대로 `npm run build`를 직접 실행하지 않는다**
  - **절대로 `rm -rf build`나 수동 복사를 하지 않는다**
- 배포 방법은 `.claude/commands/배포.md` 참고

### 배포 관련 파일
- `/배포` 명령어: `.claude/commands/배포.md`
- 배포 스크립트: `deploy-production.sh`
- 롤백 스크립트: `rollback-production.sh`

## 역할별 구조 (필수 숙지!)

### Brand General vs Restaurant Admin 차이

| 구분 | Brand General (브랜드 총괄) | Restaurant Admin (레스토랑 관리자) |
|------|---------------------------|----------------------------------|
| **범위** | 회사(브랜드제너럴) 전체 | 해당 레스토랑만 |
| **재료(Ingredients)** | Product Recipe 재료 (회사 전체) | 레스토랑 재료 (연결된 브랜드) |
| **일반재고(General Stock)** | 회사 전체 일반재고 | 레스토랑 일반재고 |
| **공급업체(Suppliers)** | `/api/suppliers` (회사 전체) | `/api/restaurants/:id/suppliers` |
| **카테고리(Categories)** | 회사 단위 카테고리 | 레스토랑+브랜드 카테고리 |

### Brand vs Brand General 용어 구분

- **Brand General (브랜드제너럴)**: 여러 브랜드를 소유한 **회사** (예: "ABC 외식 그룹")
- **Brand (브랜드)**: Brand General이 소유한 **개별 브랜드** (예: "스타벅스")

### 역할 계층 구조

```
시스템 관리자
├── Brand General (브랜드제너럴)
│   ├── 여러 브랜드들 관리
│   ├── 레스토랑 연결
│   └── Brand Manager 계정 생성 가능
├── Foodcourt General (푸드코트제너럴)
│   ├── 여러 지점들 관리
│   ├── 레스토랑 연결
│   └── Foodcourt Manager 계정 생성 가능
└── Restaurant Admin (레스토랑관리자)
    ├── 하나의 브랜드 연결
    ├── 여러 Brand General/Manager 연결
    └── Restaurant Staff 계정 생성 가능
```

### 개발 시 주의사항

1. **재고 관리는 회사 단위**: 레시피는 브랜드별이지만, 재고는 회사(Brand General) 단위
2. **API 엔드포인트 확인**: 역할에 따라 다른 API 사용
3. **brand_id vs company-wide**: Brand General 기능은 brand_id가 아닌 회사 전체 데이터
4. **History(트랜잭션) 조회**: 양쪽 역할 모두 Ingredients + General Stock 트랜잭션을 함께 조회

**상세 문서:** `/var/www/docs/ROLES_AND_PERMISSIONS.md` 참고

## 라우터 개발 규칙 (필수!)

### 개발 전 반드시 확인할 것

**같은 엔드포인트를 처리하는 라우터가 여러 파일에 있을 수 있음!**

1. **server.js 라우터 등록 순서 확인**
   ```bash
   grep -E "app.use.*Router" /var/www/dev-backend/server.js
   ```
2. **동일 경로 라우터 검색**
   ```bash
   grep -rn "router.get.*inventory" /var/www/dev-backend/routes/
   ```
3. **먼저 등록된 라우터가 우선 실행됨** - 나중에 등록된 라우터 코드는 실행되지 않음

### 라우터 파일 구조 (2025-01-28 정리 완료)

| 기능 | 파일 | 마운트 경로 | 용도 |
|------|------|-------------|------|
| **Inventory** | `inventory-routes.js` | `/api/restaurants` | Restaurant 재고 전체 (통합됨) |
| **General Stock** | `general-stock.js` | `/api` | Brand General 회사 전체 재고 |
| **GS Categories** | `general-stock-categories.js` | `/api` | Restaurant용 GS 카테고리 |
| **Product Recipe** | `product-recipe.js` | `/api` | Restaurant 상품-레시피 연결 |
| **Product Recipes** | `product-recipes.js` | `/api/product-recipes` | Brand General 레시피 CRUD |

### 비슷한 이름 라우터 구분

| 파일쌍 | 차이점 |
|--------|--------|
| `product-recipe.js` vs `product-recipes.js` | 전자는 Restaurant용 상품-레시피 연결, 후자는 Brand General용 레시피 CRUD |
| `general-stock.js` vs `general-stock-categories.js` | 전자는 Brand General 재고, 후자는 Restaurant용 카테고리 |
| `ingredient-categories.js` vs `product-ingredient-categories.js` | 전자는 레시피용 재료 카테고리, 후자는 상품 재료 카테고리 |

**수정 시**: 반드시 역할(Restaurant vs Brand General)과 마운트 경로를 확인할 것!

## UI 개발 규칙

### 이모지/아이콘 사용 금지
- **페이지 내 안내 메시지에 이모지를 사용하지 않는다**
- 경고 아이콘, 장식용 이모지 등을 UI에 넣지 않는다
- 텍스트만으로 명확하게 전달한다

## 백업 정책 (필수!)

### 백업 종류 및 보관 기간

| 백업 유형 | 위치 | 보관 기간 | 생성 시점 |
|----------|------|----------|----------|
| **일일 개발 백업** | `/var/www/backups/dev-daily/` | 7일 | `/개발완료` 실행 시 |
| **운영 배포 백업** | `/var/www/backups/YYYYMMDD_HHMMSS/` | 30일 | `/배포` 실행 시 |
| **Git** | GitHub | 영구 | 매 커밋 |

### 백업 정리 규칙

```bash
# 일일 백업: 7일 이상 된 것 삭제
find /var/www/backups/dev-daily -type d -mtime +7 -exec rm -rf {} +

# 운영 백업: 30일 이상 된 것 삭제 (수동 확인 후)
find /var/www/backups -maxdepth 1 -type d -name "202*" -mtime +30
```

### 롤백 방법

**개발 코드 롤백:**
```bash
# 백업에서 복원
tar -xzf /var/www/backups/dev-daily/YYYYMMDD/dev-backend.tar.gz -C /var/www
pm2 restart purple-dev-backend
```

**운영 롤백:**
```bash
./rollback-production.sh YYYYMMDD_HHMMSS
```

## 환경변수 정책

### .env 파일 관리
- 권한: `600` (소유자만 읽기/쓰기)
- Git에 절대 커밋 금지 (`.gitignore`에 포함됨)
- `.env.example`만 레포에 포함

### 민감정보 저장 금지
- 비밀번호를 코드나 스크립트에 하드코딩 금지
- sudoers 설정으로 필요한 명령만 무비밀번호 허용

## 개발 완료 전 테스트 규칙 (필수!)

### 테스트 없이 개발 완료라고 하지 않는다
- **모든 기능 개발은 실제 DB 테스트까지 완료해야 개발 완료**
- "필드 존재 확인"만으로는 테스트 완료가 아님
- 사용자에게 "테스트해보세요"라고 떠넘기지 않는다

### 필수 테스트 항목
1. **DB 테스트**: 실제 데이터 INSERT/SELECT/UPDATE 테스트
2. **API 테스트**: curl 또는 node 스크립트로 API 호출 테스트
3. **연동 테스트**: 관련 기능들이 함께 동작하는지 확인

### 테스트 방법
```bash
# DB 직접 테스트 예시
cd /var/www/dev-backend && node -e "
const Model = require('./models/ModelName');
(async () => {
  // 생성 테스트
  const item = await Model.create({ ... });
  // 조회 테스트
  const found = await Model.findByPk(item.id);
  // 정리
  await item.destroy();
  console.log('테스트 완료');
})();
"
```

### 개발 완료 안내 시 포함할 내용
1. 구현한 기능 목록
2. **실행한 테스트와 결과**
3. 프론트엔드 빌드/배포 완료 여부
4. 확인이 필요한 URL 또는 페이지

## 세션 상태 관리 (중요!)

### 작업 중 세션 상태 업데이트
- **작업 시작 시**: `/var/www/.claude/session-state.md` 파일에 현재 작업 기록
- **중요 단계 완료 시**: 진행 상황 업데이트
- **작업 완료 시**: `/개발완료` 명령어로 정리

### 세션 상태 파일 위치
- `/var/www/.claude/session-state.md`

### 업데이트 시점
1. 새 작업 시작할 때
2. 파일 수정 후
3. 중요한 마일스톤 달성 시
4. 오류 발생 시 (다음에 이어서 해결하기 위해)
