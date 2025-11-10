# 원격 서버 배포 가이드

운영 서버가 **다른 물리 서버**에 있을 때 사용하는 가이드입니다.

---

## 🏗️ 서버 구조

### 현재 (같은 서버)
```
서버 (87.106.78.146)
├── dev-backend (개발)
└── production-backend (운영)

배포: ./deploy-production.sh (로컬 파일 복사)
```

### 분리된 서버
```
개발 서버 (87.106.78.146)     운영 서버 (다른 IP)
├── dev-backend          →    └── production-backend

배포: Git + SSH 또는 rsync
```

---

## 📋 준비 사항

### 1. 운영 서버 준비

운영 서버에서 실행:
```bash
# 1. Git 저장소 클론
cd /var/www
git clone <저장소URL> production-backend

# 2. 환경 설정
cd production-backend
cp .env.example .env
nano .env  # 운영 환경 설정

# 3. Dependencies 설치
npm install --omit=dev

# 4. PM2 설치
npm install -g pm2

# 5. 서버 시작
pm2 start ecosystem.config.js --only production-backend
pm2 save
pm2 startup
```

### 2. SSH 키 설정 (비밀번호 없이 접속)

개발 서버에서:
```bash
# SSH 키 생성
ssh-keygen -t rsa -b 4096

# 공개키를 운영 서버에 복사
ssh-copy-id root@운영서버IP
```

---

## 🚀 배포 방법

### 방법 1: Git 기반 배포 (추천)

#### 개발 서버에서:
```bash
# 1. 개발 & 테스트
cd /var/www/dev-backend
npm run dev

# 2. Git 커밋
git add .
git commit -m "기능 추가"
git push origin main
```

#### 운영 서버에서:
```bash
# 3. Pull & 재시작
cd /var/www/production-backend
git pull origin main
npm install --omit=dev
pm2 restart production-backend
```

### 방법 2: 자동 배포 스크립트

#### 설정:
```bash
nano /var/www/deploy-to-remote-server.sh

# REMOTE_HOST 설정
REMOTE_HOST="운영서버IP주소"  # 예: "123.456.789.0"
```

#### 실행:
```bash
cd /var/www
./deploy-to-remote-server.sh
```

이 스크립트가 자동으로:
1. Git push
2. 원격 서버에 SSH 접속
3. Git pull
4. Dependencies 설치
5. PM2 재시작

### 방법 3: rsync로 직접 복사

```bash
# 개발 서버에서 운영 서버로 직접 복사
rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='*.log' \
  /var/www/dev-backend/ \
  root@운영서버IP:/var/www/production-backend/

# 운영 서버에서 재시작
ssh root@운영서버IP "cd /var/www/production-backend && npm install --omit=dev && pm2 restart production-backend"
```

---

## 🔄 CI/CD 자동 배포 (고급)

### GitHub Actions 설정

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Production Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/production-backend
            git pull origin main
            npm install --omit=dev
            pm2 restart production-backend
```

설정:
1. GitHub 저장소 → Settings → Secrets
2. 추가:
   - `PROD_HOST`: 운영 서버 IP
   - `PROD_USER`: SSH 사용자 (root)
   - `SSH_KEY`: SSH 개인키

이제 `git push`만 하면 자동으로 배포됩니다!

---

## 📊 배포 방법 비교

| 방법 | 장점 | 단점 | 추천 |
|------|------|------|------|
| **Git 기반** | 안전, 버전 관리 | 수동 작업 필요 | ⭐⭐⭐⭐⭐ |
| **자동 스크립트** | 편리, 자동화 | SSH 설정 필요 | ⭐⭐⭐⭐ |
| **rsync** | 빠름, 직접 복사 | 버전 관리 X | ⭐⭐⭐ |
| **GitHub Actions** | 완전 자동 | 설정 복잡 | ⭐⭐⭐⭐⭐ |

---

## 🔐 보안 체크리스트

- [ ] SSH 키 인증 설정 (비밀번호 사용 금지)
- [ ] 방화벽 설정 (필요한 포트만 오픈)
- [ ] .env 파일 Git에 커밋 안 됨 확인
- [ ] 운영 서버는 Git pull만 (push 불가)
- [ ] 정기 백업 설정

---

## 🛠️ 문제 해결

### SSH 접속 실패
```bash
# SSH 키 권한 확인
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# SSH 접속 테스트
ssh -v root@운영서버IP
```

### Git pull 충돌
```bash
# 운영 서버에서
cd /var/www/production-backend
git stash  # 로컬 변경사항 임시 저장
git pull
git stash pop  # 복원 (필요시)
```

### 배포 후 에러
```bash
# 운영 서버 로그 확인
ssh root@운영서버IP
pm2 logs production-backend --err --lines 50
```

---

## 💡 권장 워크플로우

### 같은 서버 (현재)
```bash
개발 → 테스트 → Git 커밋 → ./deploy-production.sh
```

### 분리된 서버 (나중에)
```bash
개발 → 테스트 → Git push → 운영서버 Git pull → PM2 재시작
```

또는

```bash
개발 → 테스트 → Git push → GitHub Actions 자동 배포
```

---

## 📚 관련 문서

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - 일반 워크플로우
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - 배포 상세 가이드
- [DEV-PROD-GUIDE.md](./DEV-PROD-GUIDE.md) - 개발/운영 환경

