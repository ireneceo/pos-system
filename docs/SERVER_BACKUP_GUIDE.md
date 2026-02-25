# 서버 백업 & 복원 가이드

## 서버 구성

| 서버 | IP | 용도 | PM2 | Port |
|------|-----|------|-----|------|
| 개발서버 | 87.106.11.184 | dev-backend, dev-frontend-build | dev-backend | 3001 |
| 운영서버 | 87.106.78.146 | production-backend, production-frontend | production-backend | 3002 |

---

## 백업 체계

### DB 백업 (자동, cron)

| 서버 | 스케줄 | 스크립트 | 저장 위치 | 보관 |
|------|--------|---------|----------|------|
| 개발 | 매일 04:00 | `/var/www/scripts/backup-database.sh` | `/var/backups/dev-db/daily/` | 14일 |
| 운영 | 매일 03:00 | `/var/www/scripts/backup-database.sh` | `/var/backups/orderhere/daily/` | 7일(일간), 4주(주간) |

### 크로스 백업 (자동, 백업 직후 전송)

| 원본 | 수신 서버 | 저장 위치 | 보관 |
|------|----------|----------|------|
| 운영 DB | 개발서버 | `/home/irene/backups/cross-backup/production/` | 14일 |
| 개발 DB | 운영서버 | `/home/irene/backups/cross-backup/dev/` | 14일 |

### 코드 백업

- **GitHub**: `git@github.com:ireneceo/pos-system.git` (개발서버에서 push)
- **운영 코드**: 별도 백업 불필요 (배포 스크립트로 재생성 가능)

---

## 복원 방법

### 운영 DB 복원 (운영서버에서 실행)

```bash
# 로컬 백업에서 복원
gunzip < /var/backups/orderhere/daily/db_YYYY-MM-DD.sql.gz | mysql -u root DB_NAME

# 서버 장애 시: 개발서버에 있는 크로스 백업에서 복원
# (개발서버에서) scp /home/irene/backups/cross-backup/production/db_YYYY-MM-DD.sql.gz irene@운영서버:/tmp/
# (운영서버에서) gunzip < /tmp/db_YYYY-MM-DD.sql.gz | mysql -u root DB_NAME
```

### 개발 DB 복원 (개발서버에서 실행)

```bash
# 로컬 백업에서 복원
gunzip < /var/backups/dev-db/daily/dev_db_YYYY-MM-DD.sql.gz | mysql -u dev_admin -p purple_dev_db

# 서버 장애 시: 운영서버에 있는 크로스 백업에서 복원
# (운영서버에서) scp /home/irene/backups/cross-backup/dev/dev_db_YYYY-MM-DD.sql.gz irene@개발서버:/tmp/
# (개발서버에서) gunzip < /tmp/dev_db_YYYY-MM-DD.sql.gz | mysql -u dev_admin -p purple_dev_db
```

### 운영 코드 복원

```bash
# 개발서버에서 배포 스크립트 실행
bash /var/www/deploy-to-production.sh
```

---

## 백업 확인 명령어

```bash
# 개발서버 백업 상태
ls -la /var/backups/dev-db/daily/
cat /var/www/logs/dev-backup.log | tail -10

# 운영서버 백업 상태
ssh irene@87.106.78.146 "ls -la /var/backups/orderhere/daily/"
ssh irene@87.106.78.146 "tail -10 /var/www/logs/backup.log"

# 크로스 백업 확인
ls -la /home/irene/backups/cross-backup/production/          # 개발서버에서
ssh irene@87.106.78.146 "ls -la /home/irene/backups/cross-backup/dev/"  # 운영서버 것
```

---

## 운영서버 cron 작업 목록

| 스케줄 | 스크립트 | 용도 |
|--------|---------|------|
| 매시간 | `/var/www/scripts/auto-git-push.sh` | Git 자동 커밋/푸시 |
| 매일 03:00 | `/var/www/scripts/backup-database.sh` | DB 백업 + 크로스 백업 |
| 매월 1일 01:00 | `/var/www/scripts/generate-invoices.sh` | 인보이스 자동 생성 |

## 개발서버 cron 작업 목록

| 스케줄 | 스크립트 | 용도 |
|--------|---------|------|
| 매일 04:00 | `/var/www/scripts/backup-database.sh` | DB 백업 + 크로스 백업 |

---

## 보안 모니터링 (운영서버 전용)

- **위치**: `/opt/security-monitor/` (배포와 무관, 별도 관리)
- `security-check.sh`: 일간 보안 체크 메일
- `weekly-report.sh`: 주간 보안 리포트 메일
- SMTP: Gmail (`help@irenewp.com`) → 발신자 `help@purplehere.com`

---

## 트러블슈팅

### 백업 실패 시

1. **로그 확인**: `cat /var/www/logs/backup.log | tail -20`
2. **흔한 원인**:
   - `.env` 경로 변경 → 스크립트 내 경로 확인
   - 디렉토리 권한 → `chown irene:irene` 확인
   - 디스크 용량 → `df -h` 확인
3. **수동 백업 실행**: `bash /var/www/scripts/backup-database.sh`

### 크로스 백업 실패 시

- SSH 키 인증 확인: `ssh irene@상대서버 "echo ok"`
- 수신 디렉토리 존재 확인
- 크로스 백업 실패해도 로컬 백업은 정상 (경고만 남김)
