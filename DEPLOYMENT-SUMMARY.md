# 배포 시스템 요약

## 현재 시스템 구조

```
서버: 87.106.78.146
├── 개발 환경 (dev.purplehere.com)
│   ├── /var/www/dev-backend (port 3001)
│   ├── /var/www/dev-frontend
│   └── purple_dev_db
│
└── 운영 환경 (purplehere.com)
    ├── /var/www/production-backend (port 3002, 2 instances)
    ├── /var/www/production-frontend
    └── purple_production_db
```

---

## 배포 방법 (현재 - 같은 서버)

### 방법 1: 전체 배포 ⭐ 추천
```bash
cd /var/www
./deploy-production.sh
```
- 개발 → 운영 전체 동기화
- `.deployignore`로 제외 파일 설정 가능
- 자동으로 database sync, PM2 재시작

### 방법 2: 부분 배포 (긴급 수정)
```bash
./deploy-production-partial.sh routes/users.js config/database.js
```
- 특정 파일만 배포
- 긴급 버그 수정시 유용

### 방법 3: 선택적 제외 배포
```bash
# .deployignore 편집
nano /var/www/.deployignore

# 배포 (자동으로 제외됨)
./deploy-production.sh
```

---

## 배포 방법 (향후 - 분리된 서버)

### 운영 서버가 다른 물리 서버일 때

#### 1단계: 원격 서버 설정
```bash
# deploy-to-remote-server.sh 편집
nano /var/www/deploy-to-remote-server.sh

# REMOTE_HOST 설정
REMOTE_HOST="운영서버IP"  # 예: "123.456.789.0"
```

#### 2단계: SSH 키 설정
```bash
ssh-keygen -t rsa -b 4096
ssh-copy-id root@운영서버IP
```

#### 3단계: 배포 실행
```bash
./deploy-to-remote-server.sh
```

자동으로:
1. Git push
2. 원격 서버 SSH 접속
3. Git pull
4. npm install
5. database sync
6. PM2 restart

---

## 빠른 명령어 참조

### 개발 시작
```bash
cd /var/www/dev-backend
npm run dev  # 자동 재시작 (nodemon)
```

### 운영 배포
```bash
cd /var/www
./deploy-production.sh
```

### 서버 상태 확인
```bash
pm2 status
pm2 logs production-backend
pm2 logs dev-backend
```

### 운영 서버 재시작
```bash
pm2 restart production-backend
```

### Git 작업
```bash
git status
git add .
git commit -m "메시지"
git push origin main
```

### 데이터베이스 동기화
```bash
# 개발 DB
cd /var/www/dev-backend
node sync-database.js

# 운영 DB
cd /var/www/production-backend
node sync-database.js
```

---

## 로그 확인

### PM2 로그
```bash
# 실시간 로그
pm2 logs production-backend

# 최근 에러
pm2 logs production-backend --err --lines 50

# 모든 로그
pm2 logs
```

### Nginx 로그
```bash
# 접속 로그
tail -f /var/log/nginx/access.log

# 에러 로그
tail -f /var/log/nginx/error.log
```

---

## 트러블슈팅

### 배포 후 서버가 시작 안 됨
```bash
pm2 logs production-backend --err --lines 30
cd /var/www/production-backend
node server.js  # 직접 실행해서 에러 확인
```

### 데이터베이스 연결 실패
```bash
# .env 확인
cat /var/www/production-backend/.env

# MySQL 확인
mysql -u prod_admin -p
SHOW DATABASES;
USE purple_production_db;
```

### Nginx 에러
```bash
# 설정 테스트
nginx -t

# 재시작
systemctl restart nginx

# 로그 확인
tail -f /var/log/nginx/error.log
```

### Git 충돌
```bash
cd /var/www
git status
git stash  # 변경사항 임시 저장
git pull
git stash pop  # 복원
```

---

## 체크리스트

### 배포 전
- [ ] 개발 서버에서 충분히 테스트
- [ ] Git 커밋 완료
- [ ] .deployignore 확인 (개발중인 파일 제외)
- [ ] 데이터베이스 마이그레이션 필요 여부 확인

### 배포 중
- [ ] 배포 스크립트 실행
- [ ] 에러 메시지 확인
- [ ] PM2 재시작 성공 확인

### 배포 후
- [ ] https://purplehere.com 접속 테스트
- [ ] API 엔드포인트 테스트
- [ ] PM2 로그 확인 (`pm2 logs production-backend`)
- [ ] 에러 없는지 모니터링

---

## 환경별 URL

| 환경 | URL | Backend Port | Database |
|------|-----|--------------|----------|
| 개발 | https://dev.purplehere.com | 3001 | purple_dev_db |
| 운영 | https://purplehere.com | 3002 | purple_production_db |

---

## 상세 문서

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - 전체 워크플로우
- [REMOTE-DEPLOYMENT-GUIDE.md](./REMOTE-DEPLOYMENT-GUIDE.md) - 원격 서버 배포
- [DEV-PROD-GUIDE.md](./DEV-PROD-GUIDE.md) - 개발/운영 환경 설명

---

## 긴급 상황

### 운영 서버 다운
```bash
pm2 restart production-backend
pm2 logs production-backend --err --lines 50
```

### 긴급 롤백 (이전 버전으로)
```bash
cd /var/www/production-backend
git log  # 커밋 ID 확인
git checkout <이전커밋ID>
pm2 restart production-backend
```

### 데이터베이스 백업
```bash
mysqldump -u prod_admin -p purple_production_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### 데이터베이스 복원
```bash
mysql -u prod_admin -p purple_production_db < backup_20250110_120000.sql
```

---

## 현재 상태

- ✅ 개발 환경: Ready
- ✅ 운영 환경: Running (2 instances)
- ✅ SSL 인증서: Active (dev.purplehere.com, purplehere.com)
- ✅ 데이터베이스: 분리됨
- ✅ 배포 스크립트: 준비됨 (로컬, 원격)
- ✅ 자동 재시작: nodemon (개발), PM2 (운영)

## 사용 준비 완료! 🚀
