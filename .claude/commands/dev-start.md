# 개발 환경 컨텍스트 로드

프로젝트의 전체 구조, 권한, 개발 환경을 이해하고 개발을 시작합니다.

## 1. 프로젝트 구조 확인

- **개발 URL**: https://dev.purplehere.com
- **프로덕션 URL**: https://purplehere.com
- **프로젝트 루트**: /var/www

### 디렉토리 구조:
- `/var/www/dev-backend` - 개발 백엔드 (Node.js + Express)
- `/var/www/dev-frontend` - 개발 프론트엔드 (React + TypeScript)
- `/var/www/production-backend` - 프로덕션 백엔드
- `/var/www/production-frontend` - 프로덕션 프론트엔드
- `/var/www/docs` - 프로젝트 문서

## 2. Docs 폴더 읽기

다음 문서들을 읽어서 프로젝트 컨텍스트를 이해하세요:

```bash
Read /var/www/docs/ 폴더의 모든 .md 파일
Read /var/www/WORKFLOW-GUIDE.md
```

## 3. 개발 서버 정보

- **개발 백엔드**: `cd /var/www/dev-backend && npm run dev`
- **개발 프론트엔드**: `cd /var/www/dev-frontend && npm start`
- **빌드**: `cd /var/www/dev-frontend && npm run build`

## 4. 배포 정보

- **전체 배포**: `./deploy-production.sh`
- **부분 배포**: `./deploy-production-partial.sh <파일>`

## 5. 데이터베이스

- **개발 DB**: purple_dev_db
- **프로덕션 DB**: purple_production_db

## 6. 주요 기능 및 권한

Docs 폴더의 ROLES_AND_PERMISSIONS.md를 참조하여:
- System Admin
- Brand General / Brand Manager
- Foodcourt General / Foodcourt Manager
- Restaurant Admin
- Staff

각 역할의 권한과 제한사항을 이해하세요.

## 7. 개발 범위 체크

현재 작업 중인 레스토랑 ID와 사용자 컨텍스트를 확인하세요.

## 액션

1. `/var/www/docs/` 폴더의 모든 문서 읽기
2. WORKFLOW-GUIDE.md 읽기
3. 현재 git 상태 확인: `git status`
4. 최근 커밋 확인: `git log --oneline -10`
5. 개발 서버 상태 확인: `pm2 status`
