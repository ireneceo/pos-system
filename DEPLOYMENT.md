# 운영서버 배포 가이드

## 🚀 빠른 사용법

### 운영 서버로 배포
```bash
# 방법 1: 명령어로 실행
/var/www/deploy-production.sh

# 방법 2: alias 사용 (bashrc 재로드 후)
운영서버배포
# 또는
deploy-prod
```

### 롤백 (이전 버전으로 복구)
```bash
# 방법 1: 명령어로 실행
/var/www/rollback-production.sh [타임스탬프]

# 방법 2: alias 사용
운영서버롤백 20251112_143000
# 또는
rollback-prod 20251112_143000
```

---

## 📋 배포 프로세스 상세

### 자동으로 수행되는 작업들:

1. **Git Pull** - 최신 코드 가져오기
2. **데이터베이스 백업** - 운영 DB 전체 백업 (압축)
3. **백엔드 코드 백업** - production-backend 디렉토리 백업
4. **프론트엔드 빌드 백업** - 현재 운영 중인 빌드 백업
5. **백엔드 코드 동기화** - dev-backend → production-backend
6. **백엔드 의존성 설치** - npm install --omit=dev
7. **데이터베이스 스키마 동기화** - Sequelize alter 모드 실행
8. **프론트엔드 빌드** - React 앱 새로 빌드
9. **프론트엔드 배포** - 새 빌드를 운영 디렉토리로 복사
10. **백엔드 재시작** - PM2로 production-backend 재시작
11. **Nginx 재시작** - 캐시 클리어 및 리로드

---

## 🗂️ 백업 구조

모든 백업은 \`/var/www/backups/[타임스탬프]/\` 디렉토리에 저장됩니다

---

## ⚠️ 중요 사항

### DB 스키마 변경시

- **Sequelize의 \`alter: true\` 모드를 사용합니다**
- 기존 데이터를 유지하면서 테이블 구조를 자동으로 업데이트합니다
- 새 컬럼 추가, 컬럼 타입 변경 등이 자동으로 적용됩니다

### 백업 정책

- **DB 백업**: 매 배포마다 자동 생성
- **코드 백업**: 매 배포마다 자동 생성
- **보관 기간**: 수동 관리 (필요시 오래된 백업 삭제)

---

## 🔍 배포 후 확인 사항

1. ✓ https://purplehere.com 접속 확인
2. ✓ 브라우저에서 Ctrl+Shift+R (강력 새로고침)
3. ✓ POS Terminal 기능 테스트
4. ✓ Takeaway Charge 표시 확인
5. ✓ 영수증 출력 테스트

---

## 📁 관련 파일

- /var/www/deploy-production.sh - 메인 배포 스크립트
- /var/www/rollback-production.sh - 롤백 스크립트
- /var/www/production-backend/sync-database.js - DB 스키마 동기화

