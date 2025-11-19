# 배포 가이드

## 🚀 배포 방법

### 1. 전체 배포 (기본)
개발 서버의 모든 코드를 운영으로 배포

```bash
cd /var/www
./deploy-production.sh
```

---

### 2. 선택적 배포 (.deployignore 사용)
개발 중인 파일을 제외하고 배포

#### 사용 방법:

1. `.deployignore` 파일 편집
```bash
nano /var/www/.deployignore
```

2. 제외할 파일 추가 (예시)
```
# 개발 중인 새 기능
routes/new-feature.js
controllers/experimentalController.js

# 테스트 파일들
test-*.js

# 특정 폴더 전체
experimental/
```

3. 배포 실행
```bash
./deploy-production.sh
```

배포 시 `.deployignore`에 있는 파일들은 자동으로 제외됩니다!

---

### 3. 부분 배포 (특정 파일만)
특정 파일이나 폴더만 운영에 배포

```bash
# 단일 파일 배포
./deploy-production-partial.sh routes/invoices.js

# 여러 파일 배포
./deploy-production-partial.sh routes/invoices.js models/Invoice.js

# 폴더 전체 배포
./deploy-production-partial.sh routes/

# 여러 파일/폴더 배포
./deploy-production-partial.sh routes/users.js controllers/authController.js services/
```

---

## 📋 배포 시나리오별 가이드

### 시나리오 1: 새 기능 개발 중 (다른 버그 수정 배포)
```bash
# 1. .deployignore에 개발 중인 파일 추가
echo "routes/new-feature.js" >> .deployignore
echo "models/NewModel.js" >> .deployignore

# 2. 버그 수정한 파일들은 정상 배포됨
./deploy-production.sh
```

### 시나리오 2: 긴급 버그 수정 (하나만 배포)
```bash
# 수정한 파일만 즉시 배포
./deploy-production-partial.sh routes/invoices.js
```

### 시나리오 3: 특정 모듈만 배포
```bash
# 인증 관련 파일들만 배포
./deploy-production-partial.sh routes/auth.js controllers/authController.js middleware/auth.js
```

### 시나리오 4: 전체 배포 (모두 완료)
```bash
# .deployignore 비우기 또는 삭제
> .deployignore

# 전체 배포
./deploy-production.sh
```

---

## 🔍 배포 전 체크리스트

```bash
# 1. 개발 서버에서 테스트
cd /var/www/dev-backend
npm run dev
# 브라우저에서 테스트...

# 2. Git 커밋
git add .
git commit -m "기능 추가"
git push

# 3. 배포할 파일 확인
cat .deployignore

# 4. 배포 실행
./deploy-production.sh
# 또는
./deploy-production-partial.sh <파일명>

# 5. 운영 서버 로그 확인
pm2 logs production-backend
```

---

## 📁 .deployignore 예시

### 예시 1: 실험적 기능 제외
```
# 새로운 결제 시스템 (아직 테스트 중)
routes/payment-v2.js
controllers/paymentController-v2.js
models/PaymentV2.js
```

### 예시 2: 특정 패턴 제외
```
# 모든 테스트 파일
*test.js
*.test.js

# 모든 실험 파일
experimental-*

# 개발용 디버그 파일
debug-*.js
```

### 예시 3: 폴더 전체 제외
```
# 실험 폴더 전체
experimental/

# 테스트 데이터
test-data/
```

---

## 🛠️ 문제 해결

### Q: .deployignore가 적용 안 됨
```bash
# 파일 경로 확인
ls -la /var/www/.deployignore

# 파일 내용 확인
cat /var/www/.deployignore

# 경로가 dev-backend 기준인지 확인
# 올바름: routes/invoices.js
# 틀림: /var/www/dev-backend/routes/invoices.js
```

### Q: 부분 배포 후 에러 발생
```bash
# 관련 파일들도 함께 배포했는지 확인
# 예: routes/users.js를 수정했다면 controllers/userController.js도 필요할 수 있음

# 로그 확인
pm2 logs production-backend --err --lines 50

# 전체 재배포
./deploy-production.sh
```

### Q: 배포 실수로 잘못된 파일 배포됨
```bash
# 1. 이전 커밋으로 복구
git log --oneline  # 이전 커밋 확인
git checkout <커밋해시> <파일명>

# 2. 재배포
./deploy-production-partial.sh <파일명>

# 또는 전체 재배포
./deploy-production.sh
```

---

## 💡 팁

1. **개발 브랜치 사용**
   ```bash
   # 큰 기능 개발 시 브랜치 사용
   git checkout -b feature/new-payment
   # 개발 완료 후 main에 머지
   ```

2. **배포 전 백업**
   ```bash
   # 운영 서버 백업
   tar -czf backup-$(date +%Y%m%d-%H%M%S).tar.gz production-backend/
   ```

3. **점진적 배포**
   - 작은 변경사항부터 배포
   - 부분 배포로 테스트 후 전체 배포

4. **로그 모니터링**
   ```bash
   # 실시간 로그 감시
   pm2 logs production-backend
   ```

