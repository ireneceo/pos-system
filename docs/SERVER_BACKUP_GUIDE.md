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

## 배포 백업 (코드 스냅샷) — 2026-09-07 추가

| 무엇 | 언제 | 저장 위치 | 보관 |
|---|---|---|---|
| 운영 백엔드·프론트 빌드 | **매 배포** | `/var/www/backups/<YYYYmmdd_HHMMSS>/` | **30일 + 최신 10개** |
| 배포 직전 DB 덤프 | 매 배포 | `/var/backups/orderhere/pre-deploy/db_predeploy_*.sql.gz` | (별도 정리 없음) |

**왜 보관 정책이 생겼나 (2026-09-07 실측)**: 배포마다 백업 1개(**≈1.0GB**)를 만들면서
**지우는 코드가 없었다.** 운영에 **210개 = 134G** 가 쌓여 디스크 169G/232G(73%) 의 대부분을 차지했고,
하루 3배포면 3GB/일이라 남은 64G 로 약 3주 뒤 가득 찰 상태였다.
주간 보안 리포트가 권하던 `journalctl --vacuum` 은 **364MB** 라 원인과 무관했다.

**규칙**: `deploy-to-production.sh` 가 백업 생성·검증 **직후** 정리한다.
- **30일 초과분 삭제**, 단 **최신 10개는 나이와 무관하게 보존**(배포가 뜸해도 롤백 대상이 남게).
- 환경변수로 조절: `BACKUP_KEEP_DAYS`(기본 30) · `BACKUP_KEEP_MIN`(기본 10).
- ⛔ **배포 백업 형식(`YYYYmmdd_HHMMSS`)만** 손댄다. 같은 폴더에 사람이 만든 것이 섞여 있다
  (`claude-history` · `data-migrations` · `dev-daily` · `print-backlog-cleanup` · `PRErestore_*` 등 12개·707MB).
  이름순 정렬로 "최신"을 고르면 **그것들이 뽑혀 진짜 최신 백업이 보호를 잃는다**(시뮬레이션에서 실제로 그랬다).
- 나이는 **mtime 이 아니라 폴더 이름의 날짜**로 잰다(rsync 가 mtime 을 흔든다). 날짜를 못 읽으면 건드리지 않는다.
- 정리 실패는 배포를 막지 않는다 — 롤백 대상은 이미 확보된 뒤다. 디스크 85%↑ 면 경고만 낸다.

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

## 운영서버 시계는 UTC 다 — 예약 작업 주의 (2026-09-07)

`timedatectl` = `Etc/UTC`. **말레이시아 시각과 8시간 차이**가 난다.

| 하고 싶은 것 | 서버에 쓸 시각 |
|---|---|
| 말레이시아 자정 (영업 종료 후) | **16:00** |
| 말레이시아 새벽 3시 | 19:00 (전날) |

⛔ 서버에서 `shutdown -r 00:00` 으로 예약하면 **말레이시아 아침 8시 = 영업시간**에 리부트된다.

리부트 예약: `sudo shutdown -r 16:00 '사유'` · 취소: `sudo shutdown -c`
`sudo` 가 비밀번호를 요구하므로 **사람이 직접 터미널에서** 실행해야 한다(자동화 불가).
