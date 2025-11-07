# 🚀 OrderHere 빠른 시작 가이드

## ✅ 완료된 작업

### 1. Git 자동 푸시 시스템
- ✅ 자동 푸시 스크립트 생성: `/var/www/scripts/auto-git-push.sh`
- ✅ .gitignore 파일 생성
- ✅ 실행 권한 설정 완료
- ⏳ **다음 단계**: Cron 설정 및 원격 저장소 연결 필요

### 2. 백업 시스템
- ✅ 백업 스크립트 생성: `/var/www/scripts/backup-database.sh`
- ✅ 복원 스크립트 생성: `/var/www/scripts/restore-database.sh`
- ✅ 로그 디렉토리 생성: `/var/www/logs/`
- ⏳ **다음 단계**: Cron 설정 및 DB 비밀번호 변경 필요

### 3. 배포 시스템
- ✅ 배포 가이드 작성: `/var/www/DEPLOYMENT.md`
- ✅ 마이그레이션 스크립트: `/var/www/scripts/run-migrations.sh`
- ✅ 마이그레이션 디렉토리: `/var/www/database/migrations/`
- ⏳ **다음 단계**: 1일 후 운영 DB 분리 작업

---

## 📋 지금 바로 해야 할 것 (5분)

### Step 1: Git 원격 저장소 설정

```bash
cd /var/www

# Git 초기화
git init
git checkout -b develop

# 원격 저장소 추가 (GitHub, GitLab 등)
git remote add origin <저장소-URL>

# 첫 커밋
git add .
git commit -m "Initial commit: OrderHere POS System"
git push -u origin develop
```

### Step 2: Cron 작업 추가

```bash
# crontab 편집
crontab -e

# 아래 2줄 추가
0 * * * * /var/www/scripts/auto-git-push.sh >> /var/www/logs/git-auto-push.log 2>&1
0 3 * * * /var/www/scripts/backup-database.sh >> /var/www/logs/backup.log 2>&1

# 저장 후 종료 (nano: Ctrl+O, Ctrl+X)
```

### Step 3: 백업 디렉토리 생성

```bash
sudo mkdir -p /var/backups/orderhere/daily /var/backups/orderhere/weekly
sudo chown -R $USER:$USER /var/backups/orderhere
```

### Step 4: DB 비밀번호 설정

```bash
# backup-database.sh 파일 수정
nano /var/www/scripts/backup-database.sh

# 7번째 줄 수정:
# DB_PASS="rootpassword"  → DB_PASS="실제비밀번호"

# restore-database.sh도 동일하게 수정
nano /var/www/scripts/restore-database.sh
```

### Step 5: 테스트

```bash
# Git 자동 푸시 테스트
/var/www/scripts/auto-git-push.sh

# 백업 테스트
/var/www/scripts/backup-database.sh

# 백업 파일 확인
ls -lh /var/backups/orderhere/daily/
```

---

## ⏰ 1일 후 할 것 (운영 배포)

### 운영 DB 분리 작업

```bash
# 1. 운영 DB 생성
mysql -u root -p << EOF
CREATE DATABASE orderhere_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'orderhere_prod'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON orderhere_prod.* TO 'orderhere_prod'@'localhost';
FLUSH PRIVILEGES;
EOF

# 2. 데이터 복제
mysqldump -u root -p orderhere_db | mysql -u orderhere_prod -p orderhere_prod

# 3. 개발 DB 생성
mysql -u root -p << EOF
CREATE DATABASE orderhere_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

# 4. 환경 변수 설정 (.env.production, .env.development)
# 상세 내용은 SETUP.md 참조
```

---

## 📁 파일 구조

```
/var/www/
├── dev-frontend/               # React 프론트엔드
├── dev-backend/                # Node.js 백엔드
├── scripts/                    # 자동화 스크립트
│   ├── auto-git-push.sh       # Git 자동 푸시
│   ├── backup-database.sh     # DB 백업
│   ├── restore-database.sh    # DB 복원
│   └── run-migrations.sh      # 마이그레이션 실행
├── database/                   # DB 관련
│   └── migrations/            # 마이그레이션 파일
├── logs/                      # 로그 파일
│   ├── git-auto-push.log     # Git 로그
│   ├── backup.log            # 백업 로그
│   └── migration.log         # 마이그레이션 로그
├── .gitignore                 # Git 제외 파일
├── README.md                  # 프로젝트 개요
├── SETUP.md                   # 상세 설정 가이드
├── DEPLOYMENT.md              # 배포 가이드
└── QUICK-START.md            # 이 파일
```

---

## 🔍 동작 확인

### Git 자동 푸시 확인
```bash
# 1시간 후 로그 확인
tail -f /var/www/logs/git-auto-push.log

# Cron 동작 확인
sudo tail -f /var/log/syslog | grep CRON
```

### 백업 확인
```bash
# 새벽 3시 이후 확인
ls -lh /var/backups/orderhere/daily/

# 백업 로그 확인
tail -f /var/www/logs/backup.log
```

---

## 📊 운영 현황

### 서버 정보
- **디스크 용량**: 77GB (사용: 6.7GB, 여유: 70GB)
- **프로젝트 크기**:
  - Backend: 37MB
  - Frontend: 664MB
- **백업 예상 용량**: 200MB 이하

### 백업 전략
- **일간 백업**: 7일 보관 (매일 새벽 3시)
- **주간 백업**: 4주 보관 (일요일 자동)
- **용량 최적화**: gzip 압축, 자동 삭제

### Git 자동화
- **커밋 주기**: 1시간마다
- **커밋 조건**: 변경사항 있을 때만
- **충돌 방지**: 백그라운드 실행

---

## 📚 참고 문서

- **SETUP.md**: 상세한 설정 방법
- **DEPLOYMENT.md**: 운영 배포 가이드
- **README.md**: 프로젝트 전체 개요

---

## 🆘 문제 해결

### Git 푸시 실패
```bash
# SSH 키 확인
ls -la ~/.ssh/

# 원격 저장소 확인
git remote -v

# 로그 확인
tail -50 /var/www/logs/git-auto-push.log
```

### 백업 실패
```bash
# DB 연결 테스트
mysql -u root -p -e "SHOW DATABASES;"

# 로그 확인
tail -50 /var/www/logs/backup.log
```

### Cron 동작 안 함
```bash
# Cron 서비스 확인
sudo systemctl status cron

# Cron 설정 확인
crontab -l
```

---

## ✨ 완료!

위 단계를 완료하면:
- ✅ 코드가 1시간마다 자동으로 Git에 저장됩니다
- ✅ 데이터베이스가 매일 자동으로 백업됩니다
- ✅ 운영 배포 준비가 완료됩니다

**다음 단계**: SETUP.md를 참고하여 운영 DB 분리 작업을 진행하세요 (1일 후).
