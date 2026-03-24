# 긴급 대응 체계

> 해킹, 장애, 데이터 손상 등 긴급 상황 발생 시 신속 대응 가이드

---

## 1. 즉시 확인 명령어

### 서버 상태 확인
```bash
# 개발서버
pm2 status
curl -s http://localhost:3001/api/health

# 운영서버 (SSH)
ssh irene@87.106.78.146 "pm2 status && curl -s http://localhost:3002/api/health"
```

### DB 상태 확인
```bash
# 개발서버
mysql -u dev_admin -p -e "SELECT COUNT(*) FROM users;" purple_dev_db

# 운영서버
ssh irene@87.106.78.146 "mysql -u prod_admin -p -e 'SELECT COUNT(*) FROM users;' purple_prod_db"
```

---

## 2. 상황별 대응

### A. 서비스 다운 (접속 불가)

```bash
# 1. PM2 상태 확인
pm2 status

# 2. 재시작
pm2 restart dev-backend      # 개발
pm2 restart production-backend  # 운영 (SSH)

# 3. 로그 확인
pm2 logs dev-backend --lines 50

# 4. Nginx 확인
sudo systemctl status nginx
sudo systemctl restart nginx
```

### B. 해킹 의심 (비정상 데이터, 알 수 없는 계정)

```bash
# 1. 즉시 서비스 중단
pm2 stop production-backend  # 운영서버

# 2. 비정상 계정 확인
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "
  SELECT id, username, email, role, createdAt
  FROM users
  WHERE createdAt > DATE_SUB(NOW(), INTERVAL 24 HOUR)
  ORDER BY createdAt DESC;
"

# 3. 비정상 계정 비활성화
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "
  UPDATE users SET status = 'suspended'
  WHERE id IN (의심 계정 ID);
"

# 4. JWT_SECRET 변경 (.env) → 모든 토큰 무효화
# .env의 JWT_SECRET 값을 새로운 랜덤 값으로 변경
# → pm2 restart → 모든 기존 로그인 세션 강제 만료

# 5. 백업에서 복원 (/복원 명령어 사용)

# 6. 서비스 재개
pm2 restart production-backend
```

### C. DB 손상/데이터 유실

```bash
# /복원 명령어 사용
# 또는 수동:

# 1. 최신 백업 확인
ls -lh /var/backups/dev-db/daily/ | tail -5        # 개발
ssh irene@87.106.78.146 "ls -lh /var/backups/production-db/daily/ | tail -5"  # 운영

# 2. 현재 상태 백업 (손상 상태라도)
mysqldump -u $DB_USER -p$DB_PASSWORD --single-transaction $DB_NAME | gzip > /var/backups/dev-db/daily/emergency_$(date +%Y%m%d_%H%M%S).sql.gz

# 3. 복원
gunzip -c /var/backups/dev-db/daily/dev_db_YYYY-MM-DD.sql.gz | mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME

# 4. 서버 재시작
pm2 restart dev-backend
```

### D. 코드 배포 후 문제 발생

```bash
# 1. 이전 커밋으로 롤백
cd /var/www
git log --oneline -5  # 최근 커밋 확인
git stash              # 현재 변경사항 보존
git reset --hard [이전_커밋_해시]

# 2. 재빌드 + 재배포
cd dev-frontend && npm run build
sudo rm -rf /var/www/dev-frontend-build/static
sudo cp -r build/* /var/www/dev-frontend-build/
pm2 restart dev-backend

# 운영서버는 /배포 명령어로 정상 버전 재배포
```

---

## 3. 백업 체계

| 대상 | 주기 | 위치 | 보관 |
|------|------|------|------|
| 개발 DB | 매일 04:00 | `/var/backups/dev-db/daily/` | 14일 |
| 운영 DB | 매일 04:00 | 운영서버 `/var/backups/production-db/daily/` | 14일 |
| 크로스 백업 | 매일 (DB) | 운영→개발, 개발→운영 | 14일 |
| 코드 | git 커밋 | git 히스토리 | 무제한 |
| 배포 전 DB | 배포 시 | `/var/backups/*/pre-deploy/` | 14일 |

---

## 4. 연락처

| 상황 | 조치 |
|------|------|
| 서버 접속 불가 | 호스팅 업체 (IONOS) 확인 |
| 도메인 문제 | DNS 설정 확인 |
| SSL 인증서 | Let's Encrypt 갱신 확인 |

---

## 5. 예방 수칙

- 배포 전 반드시 DB 백업 실행 (배포 스크립트에 포함됨)
- 운영서버 직접 코드 수정 절대 금지
- JWT_SECRET, DB 비밀번호 등 정기 변경 (분기 1회)
- `npm audit` 정기 실행 (월 1회)
