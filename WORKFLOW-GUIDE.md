# 개발부터 운영 배포까지 워크플로우

## 🎯 전체 흐름

```
개발 → 테스트 → Git 커밋 → 운영 배포
```

---

## 1️⃣ 개발 단계

### 개발 서버 시작
```bash
cd /var/www/dev-backend
npm run dev
```

**특징:**
- ⚡ 코드 수정 시 자동 재시작 (nodemon)
- 🗄️ 개발 DB 사용 (purple_dev_db)
- 🌐 https://dev.purplehere.com

### 코드 수정
```bash
# 예: routes/users.js 수정
nano /var/www/dev-backend/routes/users.js

# 저장하면 자동으로 서버 재시작됨!
```

### 브라우저 테스트
```
https://dev.purplehere.com
```

---

## 2️⃣ 테스트 완료 후

### Git 커밋
```bash
cd /var/www
git add .
git commit -m "사용자 관리 기능 추가"
git push origin main
```

---

## 3️⃣ 운영 배포

### 방법 1: 전체 배포 (기본)
```bash
cd /var/www
./deploy-production.sh
```

**배포되는 내용:**
- ✅ 모든 코드 변경사항
- ✅ 자동으로 운영 서버 재시작
- ✅ DB 스키마 자동 동기화

### 방법 2: 선택적 배포 (개발 중인 파일 제외)

개발 중인 파일이 있을 때:
```bash
# 1. 제외할 파일 설정
echo "routes/experimental-feature.js" >> .deployignore
echo "models/NewModel.js" >> .deployignore

# 2. 배포 (위 파일들은 제외됨)
./deploy-production.sh
```

### 방법 3: 부분 배포 (특정 파일만)

긴급 버그 수정 시:
```bash
# 수정한 파일만 즉시 배포
./deploy-production-partial.sh routes/users.js
```

---

## 4️⃣ 배포 확인

### 운영 서버 상태 확인
```bash
pm2 status
```

### 로그 확인
```bash
pm2 logs production-backend
```

### 브라우저 테스트
```
https://purplehere.com
```

---

## 📊 시나리오별 가이드

### 시나리오 1: 일반적인 개발 → 배포

```bash
# 1. 개발 서버 시작
cd /var/www/dev-backend
npm run dev

# 2. 코드 수정 (자동 재시작됨)
# routes/invoices.js 수정...

# 3. 브라우저에서 테스트
# https://dev.purplehere.com

# 4. 테스트 완료 후 Git 커밋
cd /var/www
git add .
git commit -m "청구서 기능 개선"
git push

# 5. 운영 배포
./deploy-production.sh

# 6. 확인
pm2 logs production-backend
```

### 시나리오 2: 새 기능 개발 중 + 버그 수정 배포

```bash
# 1. 개발 중인 파일 제외
cat >> .deployignore << 'DEPLOY'
routes/payment-v2.js
models/PaymentV2.js
controllers/paymentController-v2.js
DEPLOY

# 2. 버그 수정 후 배포
./deploy-production.sh
# → 새 기능 빼고 버그 수정만 배포됨!

# 3. 나중에 새 기능 완성되면
# .deployignore에서 해당 파일 삭제 후 배포
```

### 시나리오 3: 긴급 버그 수정

```bash
# 1. 파일 수정
nano routes/users.js

# 2. 즉시 배포 (해당 파일만)
./deploy-production-partial.sh routes/users.js

# 3. 확인
pm2 logs production-backend --lines 30
```

---

## 🔍 배포 전 체크리스트

- [ ] 개발 서버에서 테스트 완료
- [ ] 에러 없이 정상 작동 확인
- [ ] Git 커밋 완료
- [ ] 개발 중인 파일은 .deployignore에 추가
- [ ] 운영 서버 상태 확인 (pm2 status)

---

## 🛠️ 문제 해결

### 배포 후 에러 발생

```bash
# 1. 로그 확인
pm2 logs production-backend --err --lines 50

# 2. 서버 재시작
pm2 restart production-backend

# 3. 안되면 롤백
git log --oneline  # 이전 커밋 확인
git checkout <이전커밋>
./deploy-production.sh
```

### 배포가 안 됨

```bash
# rsync 권한 확인
ls -la /var/www/production-backend

# 배포 스크립트 권한 확인
chmod +x deploy-production.sh

# 수동으로 확인
rsync -av --dry-run \
  --exclude='node_modules' \
  --exclude='.env' \
  dev-backend/ production-backend/
```

### 개발 서버 실시간 반영 안 됨

```bash
# nodemon 확인
cd /var/www/dev-backend
npm run dev

# 로그에서 "restarting" 메시지 확인
# 파일 저장 시 자동 재시작되어야 함
```

---

## 📚 주요 명령어 정리

```bash
# 개발
cd /var/www/dev-backend && npm run dev    # 개발 서버 (실시간)

# 배포
./deploy-production.sh                     # 전체 배포
./deploy-production-partial.sh <파일>     # 부분 배포

# 서버 관리
pm2 status                                 # 상태
pm2 logs production-backend                # 로그
pm2 restart production-backend             # 재시작

# Git
git add .
git commit -m "메시지"
git push

# 확인
curl https://purplehere.com/api/health     # API 확인
```

---

## 💡 팁

1. **자주 커밋하세요**
   - 작은 단위로 자주 커밋
   - 문제 생기면 되돌리기 쉬움

2. **개발 서버에서 충분히 테스트**
   - 실시간 반영되니 빠르게 테스트 가능
   - 운영 배포 전 반드시 확인

3. **배포 후 로그 확인**
   - pm2 logs로 에러 없는지 확인
   - 브라우저에서 기능 테스트

4. **.deployignore 활용**
   - 개발 중인 기능은 제외하고 배포
   - 완성되면 제거 후 배포

---

## 🎯 요약

```bash
# 일반적인 흐름
cd /var/www/dev-backend && npm run dev    # 개발
# ... 코드 수정 및 테스트 ...
git add . && git commit -m "..." && git push   # 커밋
./deploy-production.sh                     # 배포
pm2 logs production-backend                # 확인
```

끝! 🎉
