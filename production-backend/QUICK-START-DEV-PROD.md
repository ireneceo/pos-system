# 빠른 시작 가이드 - 개발/운영 환경

## 🚀 1분 만에 시작하기

### 개발 서버 시작 (실시간 반영)
```bash
cd /var/www/dev-backend
npm run dev
```
**코드를 수정하고 저장하면 자동으로 서버가 재시작됩니다!**

### 운영 서버 시작
```bash
cd /var/www
pm2 start ecosystem.config.js --only production-backend
pm2 save
```

---

## 📁 구조 한눈에 보기

| 항목 | 개발 환경 | 운영 환경 |
|------|----------|----------|
| 디렉토리 | `/var/www/dev-backend` | `/var/www/production-backend` |
| 도메인 | dev.purplehere.com | purplehere.com |
| 포트 | 3001 | 3002 |
| DB | purple_dev_db | purple_production_db |
| DB 사용자 | dev_admin | prod_admin |
| 실시간 반영 | ✅ nodemon | ❌ 배포 필요 |

---

## 💻 개발하기

### 1. 개발 서버 시작
```bash
cd /var/www/dev-backend
npm run dev
```

### 2. 코드 수정
- 에디터로 파일 수정
- 저장하면 **자동 재시작**
- 브라우저에서 테스트

### 3. Git 커밋
```bash
cd /var/www
git add .
git commit -m "기능 추가"
git push origin main
```

---

## 🚀 운영 배포하기

### 방법 1: 자동 배포 (추천)
```bash
cd /var/www
./deploy-production.sh
```

### 방법 2: 수동 배포
```bash
cd /var/www
git pull origin main
rsync -av --exclude='node_modules' --exclude='.env' dev-backend/ production-backend/
cd production-backend
npm install --omit=dev
pm2 restart production-backend
```

---

## 📝 주요 명령어

### 서버 관리
```bash
# 개발 서버 (실시간 반영)
cd /var/www/dev-backend && npm run dev

# 운영 서버 시작
pm2 start production-backend

# 운영 서버 재시작
pm2 restart production-backend

# 모든 서버 상태
pm2 status
```

### 로그 확인
```bash
# 실시간 로그
pm2 logs dev-backend
pm2 logs production-backend

# 에러 로그
tail -f /var/www/logs/production/error.log
```

### DB 관리
```bash
# 개발 DB
mysql -u dev_admin -pdjiflmdjdhue purple_dev_db

# 운영 DB
mysql -u prod_admin -pkhfjkjkdkjei purple_production_db
```

---

## 🔧 문제 해결

### 서버가 시작 안 될 때
```bash
pm2 logs production-backend --lines 50
pm2 restart production-backend
```

### 포트 충돌
```bash
lsof -i :3002
pm2 stop all
pm2 start ecosystem.config.js
```

### nodemon 실시간 반영 안 될 때
```bash
cd /var/www/dev-backend
npm install --save-dev nodemon
npm run dev
```

---

## 📚 더 자세한 내용

전체 가이드: [DEV-PROD-GUIDE.md](DEV-PROD-GUIDE.md)

