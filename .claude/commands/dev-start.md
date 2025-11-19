# 개발 시작 - 프로젝트 컨텍스트 로드

Purple POS 시스템 개발을 시작합니다. 이 명령어는 프로젝트의 전체 구조, 개발 계획, 완료/진행 상황을 파악합니다.

---

## 🎯 실행 순서

### 1단계: 프로젝트 기본 정보 확인
```
- 개발 URL: https://dev.purplehere.com
- 프로덕션 URL: https://purplehere.com
- 프로젝트 루트: /var/www
- 개발 DB: purple_dev_db
- 프로덕션 DB: purple_production_db
```

### 2단계: 📚 필수 문서 읽기 (순서대로)

**우선순위 1: 실제 개발 계획 확인**
```
Read /var/www/docs/FEATURE_BASED_SUBSCRIPTION_PLAN.md
```
이 문서가 **가장 중요**합니다:
- Phase 1: 모듈 선택 시스템 ✅ 완료
- Phase 2: Recipe Management 📅 예정
- Phase 3: Advanced Inventory 📅 예정
- Phase 4: Purchase Order System 📅 예정
- Phase 5: AI Stock Prediction 📅 예정

**우선순위 2: 최근 작업 히스토리**
```
Read /var/www/DEVELOPMENT_PLAN.md
```
- 최근 완료된 작업 (Phase 1-3)
- 데이터베이스 스키마 변경 내역
- 주요 파일 위치

**우선순위 3: 권한 및 역할 시스템**
```
Read /var/www/docs/ROLES_AND_PERMISSIONS.md
```
- System Admin
- Brand General / Brand Manager
- Foodcourt General / Foodcourt Manager
- Restaurant Admin
- Staff

**우선순위 4: 모든 Docs 확인**
```
Glob docs/*.md
그 후 각 파일을 Read로 읽기
```

**우선순위 5: Workflow Guide (있는 경우)**
```
Read /var/www/WORKFLOW-GUIDE.md
```

### 3단계: Git 상태 확인
```bash
git status
git log --oneline -10
```

### 4단계: 개발 서버 상태 확인
```bash
pm2 status
```

---

## 📊 읽은 후 사용자에게 보고할 내용

### 1. 현재 상황 요약
```
✅ 완료된 작업:
- [DEVELOPMENT_PLAN.md에서 가져온 완료 목록]

🚧 진행 중:
- [진행 중인 작업]

📅 다음 작업:
- [FEATURE_BASED_SUBSCRIPTION_PLAN.md의 다음 Phase]
```

### 2. 시스템 구조 요약
```
- 사용자 계층: System Admin → General → Manager → Restaurant Admin → Staff
- 플랜 구조: Restaurant/Brand/Foodcourt Plans (각 3종)
- 모듈 시스템: target_user_type 기반 분류
```

### 3. 개발 환경 정보
```
- 백엔드: /var/www/dev-backend (Node.js + Express)
- 프론트엔드: /var/www/dev-frontend (React + TypeScript)
- 개발 URL: https://dev.purplehere.com
```

### 4. 다음 할 일 제안
```
FEATURE_BASED_SUBSCRIPTION_PLAN.md 기준으로:
"현재 Phase 1이 완료되었습니다. 다음 작업은 Phase 2: Recipe Management입니다.
- DB 스키마: recipes, ingredients, recipe_ingredients
- Backend: Models + APIs
- Frontend: /pos/recipes 페이지
시작하시겠습니까?"
```

---

## ⚠️ 중요 원칙

1. **FEATURE_BASED_SUBSCRIPTION_PLAN.md가 실제 개발 계획**입니다
   - 이 문서의 Phase 순서를 따릅니다
   - DEVELOPMENT_PLAN.md는 히스토리 문서입니다

2. **모든 Docs 파일을 읽어야 합니다**
   - 권한 시스템 이해 필수
   - 시스템 구조 파악 필수

3. **읽은 내용을 명확히 요약해서 보고합니다**
   - 완료/진행/예정 작업 구분
   - 다음 할 일 명확히 제시

4. **사용자가 개발시작만 입력하면 모든 것을 자동으로 파악합니다**
   - 추가 질문 없이 문서들을 모두 읽음
   - 명확한 현황 보고서 작성
   - 다음 작업 제안

---

## 🚀 액션 체크리스트

실행 시 다음을 **반드시 모두** 수행:

- [ ] FEATURE_BASED_SUBSCRIPTION_PLAN.md 읽기
- [ ] DEVELOPMENT_PLAN.md 읽기
- [ ] ROLES_AND_PERMISSIONS.md 읽기
- [ ] docs/ 폴더의 모든 .md 파일 읽기
- [ ] WORKFLOW-GUIDE.md 읽기 (있는 경우)
- [ ] git status 확인
- [ ] git log 확인
- [ ] 사용자에게 명확한 현황 보고
- [ ] 다음 작업 제안

---

## 📁 디렉토리 구조

```
/var/www/
├── dev-backend/          # 개발 백엔드
├── dev-frontend/         # 개발 프론트엔드
├── production-backend/   # 프로덕션 백엔드
├── production-frontend/  # 프로덕션 프론트엔드
├── docs/                 # 프로젝트 문서 ⭐
├── DEVELOPMENT_PLAN.md   # 작업 히스토리 ⭐
└── WORKFLOW-GUIDE.md     # 워크플로우 가이드
```

---

## 💡 Tips

- 개발 서버 시작: `cd dev-backend && npm run dev` (백엔드), `cd dev-frontend && npm start` (프론트엔드)
- 빌드: `cd dev-frontend && npm run build`
- 배포: `./deploy-production.sh` (전체) 또는 `./deploy-production-partial.sh <파일>` (부분)

---

**이 명령어를 실행하면 모든 컨텍스트를 자동으로 로드하고 명확한 현황을 보고합니다.**
