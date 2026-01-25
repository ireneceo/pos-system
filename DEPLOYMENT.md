# 운영서버 배포 가이드

## 빠른 사용법

### 운영 서버로 배포
```bash
# 반드시 sudo로 실행 (nginx reload 권한 필요)
echo '7u7LnxNr' | sudo -S /var/www/deploy-production.sh
```

### 롤백 (이전 버전으로 복구)
```bash
sudo /var/www/rollback-production.sh [타임스탬프]
```

---

## 배포 프로세스 (deploy-production.sh)

1. **Git Pull** - 최신 코드 가져오기
2. **.env 백업** - 운영 .env 파일 백업 (rsync 전에)
3. **DB 백업** - 운영 DB 전체 백업 (압축)
4. **백엔드 코드 동기화** - rsync로 dev → production (.env 제외)
5. **백엔드 의존성 설치** - npm install --omit=dev
6. **DB 스키마 동기화** - Sequelize sync (alter: false)
7. **프론트엔드 빌드** - React 앱 빌드
8. **프론트엔드 배포** - build 폴더 복사
9. **PM2 재시작** - production-backend 재시작
10. **Nginx 리로드** - 캐시 클리어 및 리로드
11. **Health Check** - API 상태 확인

---

## 중요 사항

### .env 파일 보호
- 배포 스크립트가 rsync 전에 .env를 백업
- rsync는 --exclude='.env'로 덮어쓰기 방지
- 손상 시 백업에서 자동 복원

### DB 스키마 동기화
- `sync-database.js`는 `alter: false`로 실행
- 기존 데이터와 설정값 유지
- 새 컬럼 추가 시 수동으로 ALTER TABLE 필요

### 백업 위치
- `/var/www/backups/[타임스탬프]/`
  - `.env.backup` - .env 파일
  - `db_backup_[타임스탬프].sql.gz` - DB 덤프

---

## 배포 후 확인

1. https://purplehere.com 접속 확인
2. PM2 상태 확인: `pm2 list | grep production`
3. API 테스트: `curl http://localhost:3002/api/health`
4. 로그 확인: `pm2 logs production-backend --lines 20`

---

## 관련 파일

- `/var/www/deploy-production.sh` - 배포 스크립트
- `/var/www/rollback-production.sh` - 롤백 스크립트
- `/var/www/.claude/commands/배포.md` - Claude 배포 명령어 상세
