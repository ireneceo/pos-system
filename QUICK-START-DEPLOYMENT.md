# ⚡ 배포 빠른 가이드

## 📦 3가지 배포 방법

### 1. 전체 배포 (기본)
모든 코드를 운영으로 배포
```bash
cd /var/www
./deploy-production.sh
```

---

### 2. 선택적 배포 (.deployignore 사용) ✨
개발 중인 파일을 제외하고 배포

```bash
# 1. 제외할 파일 설정
echo "routes/new-feature.js" >> .deployignore
echo "models/NewModel.js" >> .deployignore

# 2. 배포 실행 (설정한 파일 자동 제외)
./deploy-production.sh
```

**배포 시 자동으로 제외됩니다!**

---

### 3. 부분 배포 (특정 파일만) ⚡
특정 파일만 즉시 배포

```bash
# 단일 파일
./deploy-production-partial.sh routes/users.js

# 여러 파일
./deploy-production-partial.sh routes/users.js models/User.js controllers/userController.js

# 폴더 전체
./deploy-production-partial.sh routes/
```

---

## 🎯 실전 시나리오

### 시나리오 1: 새 기능 개발 중, 버그만 수정해서 배포
```bash
# 1. 개발 중인 파일 제외
cat >> .deployignore << 'DEPLOY'
routes/new-feature.js
models/NewFeature.js
controllers/newFeatureController.js
DEPLOY

# 2. 버그 수정 후 배포
./deploy-production.sh
# → 새 기능 제외, 버그 수정만 배포됨!
```

### 시나리오 2: 긴급 버그 수정 (1개 파일만)
```bash
# routes/invoices.js 수정 후
./deploy-production-partial.sh routes/invoices.js
# → 즉시 배포!
```

### 시나리오 3: 인증 모듈 전체 배포
```bash
./deploy-production-partial.sh \
  routes/auth.js \
  controllers/authController.js \
  middleware/auth.js
```

---

## 📋 .deployignore 설정 예시

### 예시 1: 기본
```
# 개발 중인 새 기능
routes/payment-v2.js
controllers/paymentController-v2.js
models/PaymentV2.js
```

### 예시 2: 패턴 사용
```
# 모든 테스트 파일
*test.js
*.test.js

# 실험적 파일들
experimental-*
```

### 예시 3: 폴더 제외
```
# 실험 폴더 전체
experimental/

# 테스트 데이터
test-data/
```

---

## ✅ 배포 체크리스트

```bash
# 1. 개발 서버 테스트
cd /var/www/dev-backend
npm run dev
# 브라우저에서 테스트...

# 2. 제외할 파일 확인
cat .deployignore

# 3. 배포 실행
./deploy-production.sh
# 또는
./deploy-production-partial.sh <파일명>

# 4. 로그 확인
pm2 logs production-backend
```

---

## 🔄 배포 취소/복구

### 잘못 배포한 경우
```bash
# 1. Git에서 이전 버전 가져오기
git log --oneline
git checkout <이전커밋> <파일명>

# 2. 재배포
./deploy-production-partial.sh <파일명>
```

### 전체 롤백
```bash
# 이전 커밋으로 복구
git reset --hard <이전커밋>
./deploy-production.sh
```

---

## 📚 더 자세한 내용

- 상세 가이드: [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- 개발/운영 환경: [DEV-PROD-GUIDE.md](./DEV-PROD-GUIDE.md)
