# OrderHere 시스템 설정 가이드

## 📦 1. Git 자동 푸시 설정

### Cron 설정 (1시간마다 자동 커밋)

```bash
# crontab 편집
crontab -e

# 아래 내용 추가 (매 시간 정각에 실행)
0 * * * * /var/www/scripts/auto-git-push.sh >> /var/www/logs/git-auto-push.log 2>&1
```

### 수동 실행 테스트

```bash
# 스크립트 실행해보기
/var/www/scripts/auto-git-push.sh

# 로그 확인
tail -f /var/www/logs/git-auto-push.log
```

### Git 원격 저장소 설정

```bash
cd /var/www

# Git 초기화 (아직 안 했다면)
git init

# 원격 저장소 추가
git remote add origin https://github.com/your-username/orderhere-pos.git
# 또는 SSH
git remote add origin git@github.com:your-username/orderhere-pos.git

# 브랜치 생성 및 전환
git checkout -b develop

# 첫 커밋
git add .
git commit -m "Initial commit: OrderHere POS System"

# 푸시
git push -u origin develop
```

### 자동 푸시 동작 방식

- ⏰ **실행 주기**: 1시간마다 (매시 정각)
- 📝 **커밋 조건**: 변경사항이 있을 때만
- 🔇 **백그라운드**: 개발 작업에 영향 없음
- 📋 **로그**: `/var/www/logs/git-auto-push.log`에 기록

---

## 🗄️ 2. 백업 자동화 설정

### Cron 설정 (매일 새벽 3시 자동 백업)

```bash
# crontab 편집
crontab -e

# 아래 내용 추가
0 3 * * * /var/www/scripts/backup-database.sh >> /var/www/logs/backup.log 2>&1
```

### 백업 디렉토리 생성

```bash
sudo mkdir -p /var/backups/orderhere/daily
sudo mkdir -p /var/backups/orderhere/weekly
sudo chown -R $USER:$USER /var/backups/orderhere
```

### 백업 스크립트 설정

```bash
# backup-database.sh 파일에서 DB 비밀번호 수정
nano /var/www/scripts/backup-database.sh

# 아래 줄 수정
DB_PASS="실제_비밀번호"  # rootpassword를 실제 비밀번호로 변경
```

### 수동 백업 실행

```bash
# 즉시 백업 생성
/var/www/scripts/backup-database.sh

# 백업 파일 확인
ls -lh /var/backups/orderhere/daily/

# 백업 복원 테스트
/var/www/scripts/restore-database.sh /var/backups/orderhere/daily/db_2025-01-20.sql.gz
```

### 백업 용량 관리

**현재 설정**:
- 일간 백업: 7일 보관 (자동 삭제)
- 주간 백업: 4주 보관 (자동 삭제)
- 예상 용량: 약 200MB 이하

**용량 확인**:
```bash
du -sh /var/backups/orderhere
```

**수동 정리** (필요 시):
```bash
# 30일 이상 된 모든 백업 삭제
find /var/backups/orderhere -name "*.sql.gz" -mtime +30 -delete
```

---

## 🚀 3. 운영 배포 준비 (1일 후 작업)

### Phase 1: 데이터베이스 분리

```bash
# 1. 운영 DB 생성
mysql -u root -p << EOF
CREATE DATABASE orderhere_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'orderhere_prod'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON orderhere_prod.* TO 'orderhere_prod'@'localhost';
FLUSH PRIVILEGES;
EOF

# 2. 현재 DB를 운영 DB로 복제
mysqldump -u root -p orderhere_db | mysql -u orderhere_prod -p orderhere_prod

# 3. 개발 DB 생성 (별도)
mysql -u root -p << EOF
CREATE DATABASE orderhere_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON orderhere_dev.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### Phase 2: 환경 변수 설정

```bash
# 운영 환경 설정
cat > /var/www/dev-backend/.env.production << EOF
NODE_ENV=production
DB_HOST=localhost
DB_PORT=3306
DB_NAME=orderhere_prod
DB_USER=orderhere_prod
DB_PASSWORD=STRONG_PASSWORD
PORT=5001
JWT_SECRET=your-secure-jwt-secret
EOF

# 개발 환경 설정
cat > /var/www/dev-backend/.env.development << EOF
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=orderhere_dev
DB_USER=root
DB_PASSWORD=rootpassword
PORT=5000
JWT_SECRET=dev-jwt-secret
EOF
```

### Phase 3: PM2 프로세스 분리

```bash
# PM2 설정 파일 수정
nano /var/www/dev-backend/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'dev-backend',
      script: 'server.js',
      cwd: '/var/www/dev-backend',
      env: {
        NODE_ENV: 'development'
      },
      env_file: '.env.development',
      instances: 1,
      exec_mode: 'fork'
    },
    {
      name: 'prod-backend',
      script: 'server.js',
      cwd: '/var/www/dev-backend',
      env: {
        NODE_ENV: 'production'
      },
      env_file: '.env.production',
      instances: 2,  // 운영은 2개 인스턴스
      exec_mode: 'cluster',
      max_memory_restart: '500M'
    }
  ]
};
```

```bash
# PM2 재시작
pm2 delete all
pm2 start ecosystem.config.js
pm2 save
```

### Phase 4: 마이그레이션 시스템 테스트

```bash
# 마이그레이션 테스트 (개발 DB)
/var/www/scripts/run-migrations.sh development

# 운영 DB에 적용
/var/www/scripts/run-migrations.sh production
```

---

## 📋 전체 Cron 설정 요약

```bash
# crontab -e로 추가할 내용

# Git 자동 푸시 (매시간)
0 * * * * /var/www/scripts/auto-git-push.sh >> /var/www/logs/git-auto-push.log 2>&1

# DB 백업 (매일 새벽 3시)
0 3 * * * /var/www/scripts/backup-database.sh >> /var/www/logs/backup.log 2>&1

# 로그 정리 (매주 일요일 새벽 2시)
0 2 * * 0 find /var/www/logs -name "*.log" -mtime +30 -delete

# PM2 상태 저장 (매일 새벽 4시)
0 4 * * * pm2 save
```

---

## ✅ 설정 완료 체크리스트

### Git 설정
- [ ] Git 초기화 완료 (`git init`)
- [ ] 원격 저장소 연결 (`git remote add origin`)
- [ ] .gitignore 설정 확인
- [ ] 자동 푸시 스크립트 실행 권한 (`chmod +x`)
- [ ] Cron 설정 (1시간마다)
- [ ] 로그 확인 (`/var/www/logs/git-auto-push.log`)

### 백업 설정
- [ ] 백업 디렉토리 생성 (`/var/backups/orderhere`)
- [ ] DB 비밀번호 설정 (backup-database.sh)
- [ ] 백업 스크립트 실행 권한
- [ ] Cron 설정 (매일 새벽 3시)
- [ ] 수동 백업 테스트
- [ ] 복원 테스트
- [ ] 용량 확인

### 배포 준비 (1일 후)
- [ ] 운영 DB 생성 (`orderhere_prod`)
- [ ] 개발 DB 생성 (`orderhere_dev`)
- [ ] 환경 변수 분리 (.env.production, .env.development)
- [ ] PM2 설정 업데이트
- [ ] 마이그레이션 시스템 테스트
- [ ] 배포 절차 문서 확인 (DEPLOYMENT.md)

---

## 🐛 트러블슈팅

### Git 푸시 실패
```bash
# 원인 확인
tail -50 /var/www/logs/git-auto-push.log

# SSH 키 설정 (필요 시)
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub  # GitHub에 추가
```

### 백업 실패
```bash
# 로그 확인
tail -50 /var/www/logs/backup.log

# DB 연결 테스트
mysql -u root -p -e "SHOW DATABASES;"

# 디스크 용량 확인
df -h /var
```

### Cron 동작 안 함
```bash
# Cron 서비스 확인
sudo systemctl status cron

# Cron 로그 확인
sudo tail -f /var/log/syslog | grep CRON

# 수동 실행 테스트
/var/www/scripts/backup-database.sh
```

---

## 📞 지원

문제가 발생하면:
1. 로그 파일 확인 (`/var/www/logs/`)
2. DEPLOYMENT.md 참고
3. 개발팀 연락
