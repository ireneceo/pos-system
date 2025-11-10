# 개발/운영 환경 설정 가이드

## 📋 목차
1. [환경 구조](#환경-구조)
2. [개발 환경 (실시간 반영)](#개발-환경)
3. [운영 환경](#운영-환경)
4. [배포 프로세스](#배포-프로세스)
5. [주요 명령어](#주요-명령어)

---

## 🏗️ 환경 구조

```
/var/www/
├── dev-backend/              # 개발 서버
│   ├── server.js
│   ├── .env                  # 개발 DB 설정
│   ├── package.json
│   └── nodemon.json         # 실시간 반영 설정
│
├── production-backend/       # 운영 서버
│   ├── server.js
│   ├── .env                  # 운영 DB 설정
│   └── package.json
│
├── logs/
│   ├── development/         # 개발 로그
│   └── production/          # 운영 로그
│
├── ecosystem.config.js      # PM2 설정
├── start-dev.sh             # 개발 서버 시작
├── start-all.sh             # 모든 서버 시작 (PM2)
├── deploy-production.sh     # 운영 배포
└── init-production-db.sh    # 운영 DB 초기화
```

---

## 💻 개발 환경 (실시간 반영)

### 서버 정보
- **도메인**: dev.purplehere.com
- **포트**: 3001
- **DB**: purple_dev_db
- **사용자**: dev_admin
- **특징**: nodemon으로 코드 변경 시 자동 재시작

### 개발 서버 시작 (실시간 반영)

#### 방법 1: nodemon 직접 실행 (추천)
```bash
cd /var/www/dev-backend
npm run dev
```

이 명령어를 실행하면:
- 코드 수정 시 **자동으로 서버 재시작**
- `.js`, `.json` 파일 변경 감지
- 실시간으로 변경사항 반영

#### 방법 2: 빠른 실행
```bash
cd /var/www
./start-dev.sh
```

#### 방법 3: PM2로 실행 (프로덕션 모드)
```bash
pm2 start ecosystem.config.js --only dev-backend
```

### 개발 중 주의사항
- 파일 저장하면 자동으로 서버가 재시작됩니다
- 터미널에서 변경 감지 메시지 확인 가능
- `node_modules/`, `logs/` 폴더는 감시 제외

---

## 🚀 운영 환경

### 서버 정보
- **도메인**: purplehere.com
- **포트**: 3002
- **DB**: purple_production_db
- **사용자**: prod_admin
- **특징**: Cluster 모드 (2 인스턴스)

### 운영 서버 최초 설정

```bash
# 1. 운영 DB 초기화
cd /var/www
./init-production-db.sh

# 2. 운영 서버 시작
pm2 start ecosystem.config.js --only production-backend

# 3. PM2 자동 시작 설정 (서버 재부팅 시)
pm2 startup
pm2 save
```

---

## �� 배포 프로세스

### 개발 → 운영 배포

```bash
cd /var/www
./deploy-production.sh
```

**배포 스크립트가 하는 일:**
1. Git에서 최신 코드 pull
2. 운영 .env 파일 백업
3. dev-backend → production-backend 동기화
4. 운영 .env 복원
5. dependencies 설치
6. 운영 DB 스키마 동기화
7. 운영 서버 재시작

### 수동 배포 (단계별)

```bash
# 1. 개발 서버에서 테스트 완료 후

# 2. Git 커밋 및 푸시
cd /var/www
git add .
git commit -m "기능 추가"
git push origin main

# 3. 운영 배포
./deploy-production.sh
```

---

## 📝 주요 명령어

### 서버 관리

```bash
# 모든 서버 시작
./start-all.sh

# 개발 서버만 시작 (실시간 반영)
./start-dev.sh

# 특정 서버 재시작
pm2 restart dev-backend
pm2 restart production-backend

# 모든 서버 중지
pm2 stop all

# 서버 상태 확인
pm2 status
pm2 list
```

### 로그 확인

```bash
# 실시간 로그 보기
pm2 logs dev-backend
pm2 logs production-backend
pm2 logs all

# 최근 로그 100줄
pm2 logs --lines 100

# 로그 파일 직접 보기
tail -f /var/www/logs/development/out.log
tail -f /var/www/logs/production/out.log
tail -f /var/www/logs/production/error.log
```

### 데이터베이스

```bash
# 개발 DB 접속
mysql -u dev_admin -p purple_dev_db

# 운영 DB 접속
mysql -u prod_admin -p purple_production_db

# DB 스키마 동기화
cd /var/www/dev-backend
node sync-database.js

cd /var/www/production-backend
node sync-database.js
```

---

## 🔧 문제 해결

### 서버가 시작되지 않을 때

```bash
# PM2 프로세스 확인
pm2 list

# 에러 로그 확인
pm2 logs production-backend --err --lines 50

# 서버 재시작
pm2 restart production-backend
pm2 reload production-backend  # 무중단 재시작
```

### 포트가 이미 사용 중일 때

```bash
# 포트 사용 확인
lsof -i :3001  # 개발
lsof -i :3002  # 운영

# 프로세스 종료
pm2 stop all
pm2 delete all
```

### 개발 서버 실시간 반영이 안 될 때

```bash
# nodemon 재설치
cd /var/www/dev-backend
npm install --save-dev nodemon

# nodemon 직접 실행
npm run dev

# nodemon.json 확인
cat nodemon.json
```

---

## ⚙️ 환경 변수 (.env)

### 개발 환경
```env
NODE_ENV=development
PORT=3001
DB_NAME=purple_dev_db
DB_USER=dev_admin
DB_PASSWORD=djiflmdjdhue
```

### 운영 환경
```env
NODE_ENV=production
PORT=3002
DB_NAME=purple_production_db
DB_USER=prod_admin
DB_PASSWORD=khfjkjkdkjei
```

**⚠️ 중요:** 운영 환경 JWT_SECRET은 반드시 강력한 랜덤 문자열로 변경하세요!

---

## 🎯 워크플로우 예시

### 일반적인 개발 프로세스

```bash
# 1. 개발 서버 시작 (실시간 반영)
cd /var/www
./start-dev.sh

# 2. 코드 수정
# - VSCode나 다른 에디터로 /var/www/dev-backend/ 파일 수정
# - 저장하면 자동으로 서버 재시작됨
# - 브라우저에서 http://dev.purplehere.com 으로 테스트

# 3. 테스트 완료 후 Git 커밋
git add .
git commit -m "새 기능 추가"
git push origin main

# 4. 운영 배포
./deploy-production.sh

# 5. 운영 서버 확인
pm2 logs production-backend
```

### 긴급 수정 시

```bash
# 1. 코드 수정 후 바로 배포
./deploy-production.sh

# 2. 로그 확인
pm2 logs production-backend --lines 50
```

---

## 📊 모니터링

### PM2 모니터링

```bash
# 실시간 모니터링 대시보드
pm2 monit

# 메모리/CPU 사용량 확인
pm2 status
```

### 로그 파일 위치
- 개발: `/var/www/logs/development/`
- 운영: `/var/www/logs/production/`

---

## 🔒 보안 체크리스트

- [ ] 운영 DB 비밀번호 변경 완료
- [ ] JWT_SECRET 강력한 랜덤 문자열로 변경
- [ ] .env 파일 Git에 커밋되지 않도록 .gitignore 설정
- [ ] 방화벽에서 3001, 3002 포트 설정
- [ ] HTTPS 인증서 설정 (Nginx/Apache)
- [ ] 정기적인 백업 설정

---

## 📞 지원

문제가 발생하면:
1. 로그 확인: `pm2 logs`
2. 서버 상태 확인: `pm2 status`
3. DB 연결 확인: `mysql -u prod_admin -p purple_production_db`

