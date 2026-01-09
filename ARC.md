# ARC.md - 프로젝트 아키텍처 요약

## 서비스 개요
**Purple Here** - POS + Restaurant Management SaaS
- 다중 레스토랑/브랜드/푸드코트 관리
- 주문, 메뉴, 재고, 레시피, 인보이스 관리

## 기술 스택
| 구분 | 기술 |
|------|------|
| Frontend | React 18 + TypeScript |
| Backend | Node.js + Express |
| Database | MySQL (Sequelize ORM) |
| 실시간 | Socket.IO |
| 프로세스 | PM2 |
| 웹서버 | Nginx (Reverse Proxy) |

## 디렉토리 구조
```
/var/www/
├── dev-backend/        # 개발 백엔드 (작업용)
├── dev-frontend/       # 개발 프론트엔드 (작업용)
├── production-backend/ # 운영 백엔드 (직접 수정 금지)
├── production-frontend/# 운영 프론트엔드 (직접 수정 금지)
├── deploy-production.sh# 배포 스크립트
└── docs/               # 프로젝트 문서
```

## 데이터 흐름
```
Frontend (React)
    → /api/* (Express Router)
    → Controller/Service
    → Sequelize Model
    → MySQL
```

## 인증/권한 모델
- **인증:** JWT 토큰 (24h/7d 만료)
- **해싱:** bcrypt (salt rounds: 10)

### Role 계층
```
System Admin (전체 접근)
├── Foodcourt General/Manager
├── Brand General/Manager
└── Restaurant Admin
    └── Staff
```

## 환경변수 정책
- **파일 권한:** `600` (소유자만)
- **Git:** `.env` 절대 커밋 금지
- **공유:** `.env.example`만 레포에 포함
- **민감정보:** 코드/스크립트 하드코딩 금지

## 배포 방식
| 환경 | 방법 | 포트 |
|------|------|------|
| 개발 | `npm run build:dev` | 3001 |
| 운영 | `/배포` 명령어만 | 3002 |

- 자동 배포 금지 (수동 `/배포`만 허용)
- 배포 시 자동 DB 백업

## 절대 금지 규칙
1. `production-*` 디렉토리 직접 수정
2. `.env` 실제값 노출/커밋
3. `sequelize.sync({ force: true })` 실행
4. 운영 DB 직접 SQL 실행
5. 비밀번호 하드코딩

## 변경 시 체크리스트
```
[ ] DB 스키마 변경 여부 확인
[ ] .env 변경 여부 확인
[ ] 개발서버 테스트 완료
[ ] 롤백 준비: ./rollback-production.sh [TIMESTAMP]
[ ] 민감정보 커밋 확인: git diff --cached | grep -i password
```

## 상세 문서
| 문서 | 경로 |
|------|------|
| 개발 시작 가이드 | `.claude/commands/개발시작.md` |
| 기능 계획 | `docs/FEATURE_BASED_SUBSCRIPTION_PLAN.md` |
| 권한 시스템 | `docs/ROLES_AND_PERMISSIONS.md` |
| 배포 가이드 | `DEPLOYMENT.md` |
| UI 가이드 | `dev-frontend/UI_DESIGN_GUIDE.md` |
