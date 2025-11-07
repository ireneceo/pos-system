# 운영 서버 배포 가이드

## 📋 사전 준비 사항 (1일 후 작업 예정)

### 1. 데이터베이스 분리

**개발 DB**: `orderhere_dev`
**운영 DB**: `orderhere_prod`

#### DB 생성 및 권한 설정

```sql
-- 운영 데이터베이스 생성
CREATE DATABASE orderhere_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 운영 전용 사용자 생성
CREATE USER 'orderhere_prod'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON orderhere_prod.* TO 'orderhere_prod'@'localhost';
FLUSH PRIVILEGES;

-- 개발 DB 이름 변경 (현재 DB를 개발용으로)
RENAME DATABASE orderhere_db TO orderhere_dev;
-- 또는 새로 생성
CREATE DATABASE orderhere_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 환경 변수 분리

#### 개발 환경 (.env.development)
```bash
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=orderhere_dev
DB_USER=root
DB_PASSWORD=rootpassword
PORT=5000
```

#### 운영 환경 (.env.production)
```bash
NODE_ENV=production
DB_HOST=localhost
DB_PORT=3306
DB_NAME=orderhere_prod
DB_USER=orderhere_prod
DB_PASSWORD=STRONG_PASSWORD_HERE
PORT=5001
```

---

## 🚀 배포 절차

### Phase 1: 배포 전 준비 (15분)

```bash
# 1. 현재 상태 백업
/var/www/scripts/backup-database.sh

# 2. Git 상태 확인
cd /var/www
git status
git log -3

# 3. 최신 코드 확인
git fetch origin
git diff develop origin/develop

# 4. 체크리스트
# [ ] 모든 변경사항 커밋됨
# [ ] 백업 완료
# [ ] 마이그레이션 파일 준비됨
# [ ] 테스트 통과
```

### Phase 2: 운영 서버 배포 (10분)

```bash
# 1. 코드 업데이트
cd /var/www
git checkout main
git pull origin main

# 2. 의존성 설치
cd dev-backend && npm install --production
cd ../dev-frontend && npm install

# 3. 프론트엔드 빌드
npm run build

# 4. DB 마이그레이션 실행
/var/www/scripts/run-migrations.sh production

# 5. 서비스 재시작
pm2 restart all

# 6. 헬스 체크
curl https://dev.purplehere.com/api/health
```

### Phase 3: 배포 후 검증 (5분)

```bash
# 1. 서비스 상태 확인
pm2 status
pm2 logs dev-backend --lines 20

# 2. API 테스트
curl https://dev.purplehere.com/api/health
curl https://dev.purplehere.com/api/restaurants

# 3. 에러 로그 확인
tail -f /var/www/logs/backup.log
tail -f /var/www/dev-backend/logs/error.log

# 4. 데이터베이스 연결 확인
mysql -u orderhere_prod -p orderhere_prod -e "SHOW TABLES;"
```

---

## 🔄 데이터베이스 마이그레이션 시스템

### 마이그레이션 파일 구조

```
/var/www/database/
├── migrations/
│   ├── 001_create_initial_schema.sql
│   ├── 002_add_slug_to_restaurants.sql
│   ├── 003_create_option_groups.sql
│   └── README.md
├── schema.sql              # 현재 전체 스키마
└── seeds/                  # 초기 데이터
    ├── dev_data.sql        # 개발용 샘플 데이터
    └── prod_data.sql       # 운영 초기 데이터
```

### 마이그레이션 추적 테이블

```sql
CREATE TABLE IF NOT EXISTS schema_migrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  execution_time_ms INT,
  INDEX idx_version (version)
);
```

### 마이그레이션 실행 스크립트

`/var/www/scripts/run-migrations.sh`:

```bash
#!/bin/bash
# 사용법: ./run-migrations.sh [development|production]

ENV=${1:-development}

if [ "$ENV" = "production" ]; then
    DB_NAME="orderhere_prod"
    DB_USER="orderhere_prod"
    DB_PASS="STRONG_PASSWORD"
else
    DB_NAME="orderhere_dev"
    DB_USER="root"
    DB_PASS="rootpassword"
fi

MIGRATION_DIR="/var/www/database/migrations"

echo "Running migrations on $ENV environment ($DB_NAME)..."

# 마이그레이션 추적 테이블 생성
mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF
CREATE TABLE IF NOT EXISTS schema_migrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  execution_time_ms INT
);
EOF

# 실행된 마이그레이션 목록 가져오기
EXECUTED=$(mysql -u $DB_USER -p$DB_PASS -N -e "SELECT version FROM schema_migrations" $DB_NAME)

# 모든 마이그레이션 파일 순서대로 실행
for FILE in $(ls $MIGRATION_DIR/*.sql | sort); do
    VERSION=$(basename $FILE .sql)

    # 이미 실행되었는지 확인
    if echo "$EXECUTED" | grep -q "^$VERSION$"; then
        echo "⏭️  Skipping $VERSION (already executed)"
        continue
    fi

    echo "▶️  Running migration: $VERSION"
    START_TIME=$(date +%s%3N)

    # 마이그레이션 실행
    mysql -u $DB_USER -p$DB_PASS $DB_NAME < $FILE

    if [ $? -eq 0 ]; then
        END_TIME=$(date +%s%3N)
        EXEC_TIME=$((END_TIME - START_TIME))

        # 실행 기록
        mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF
INSERT INTO schema_migrations (version, description, execution_time_ms)
VALUES ('$VERSION', 'Migration from $FILE', $EXEC_TIME);
EOF
        echo "✅ $VERSION completed in ${EXEC_TIME}ms"
    else
        echo "❌ Migration failed: $VERSION"
        exit 1
    fi
done

echo "✅ All migrations completed!"
```

---

## 📊 개발 중 테이블 변경 시 워크플로우

### 시나리오: restaurants 테이블에 slug 컬럼 추가

#### Step 1: 개발 DB에서 직접 테스트
```sql
-- 개발 DB에서 먼저 실험
USE orderhere_dev;
ALTER TABLE restaurants ADD COLUMN slug VARCHAR(255) UNIQUE;

-- 데이터 테스트
UPDATE restaurants SET slug = 'test-restaurant-1' WHERE id = 1;
SELECT * FROM restaurants;
```

#### Step 2: 마이그레이션 파일 작성
```bash
# 파일명: 002_add_slug_to_restaurants.sql
```

```sql
-- Migration: Add slug column to restaurants table
-- Version: 002
-- Date: 2025-01-21

-- Forward migration
ALTER TABLE restaurants
ADD COLUMN slug VARCHAR(255) NULL UNIQUE
COMMENT 'URL-friendly restaurant identifier';

-- Update existing data with default slugs
UPDATE restaurants
SET slug = CONCAT('restaurant-', id)
WHERE slug IS NULL;

-- Rollback SQL (주석으로 기록)
-- ALTER TABLE restaurants DROP COLUMN slug;
```

#### Step 3: Git 커밋
```bash
git add database/migrations/002_add_slug_to_restaurants.sql
git commit -m "feat: Add slug column to restaurants table"
git push origin develop
```

#### Step 4: 운영 배포 시 마이그레이션 자동 실행
```bash
# 배포 스크립트가 자동으로 실행
./scripts/run-migrations.sh production
```

---

## 🔒 롤백 절차

### 1. 코드 롤백
```bash
# 이전 커밋으로 되돌리기
git log --oneline -5
git checkout <commit-hash>
pm2 restart all
```

### 2. 데이터베이스 롤백
```bash
# 마이그레이션 전 백업으로 복원
/var/www/scripts/restore-database.sh /var/backups/orderhere/daily/db_2025-01-20.sql.gz
```

### 3. 수동 롤백 (특정 마이그레이션만)
```sql
-- 마이그레이션 파일의 rollback SQL 실행
ALTER TABLE restaurants DROP COLUMN slug;

-- 마이그레이션 기록 삭제
DELETE FROM schema_migrations WHERE version = '002_add_slug_to_restaurants';
```

---

## 📈 모니터링

### 배포 후 체크리스트

```bash
# 1. 시스템 리소스
htop
df -h

# 2. PM2 프로세스
pm2 status
pm2 monit

# 3. 애플리케이션 로그
pm2 logs dev-backend --lines 50
tail -f /var/www/logs/backup.log

# 4. 데이터베이스 상태
mysql -u orderhere_prod -p -e "SHOW PROCESSLIST;"
mysql -u orderhere_prod -p -e "SHOW TABLE STATUS FROM orderhere_prod;"

# 5. API 응답 시간
curl -w "@curl-format.txt" -o /dev/null -s https://dev.purplehere.com/api/health
```

---

## 🚨 긴급 상황 대응

### 서비스 다운 시
```bash
# 1. 즉시 이전 버전으로 롤백
git checkout <previous-stable-commit>
pm2 restart all

# 2. DB 복원
/var/www/scripts/restore-database.sh <latest-backup>

# 3. 상태 확인
pm2 status
curl https://dev.purplehere.com/api/health
```

### DB 손상 시
```bash
# 1. 서비스 중단
pm2 stop all

# 2. DB 백업 복원
/var/www/scripts/restore-database.sh <latest-good-backup>

# 3. 무결성 검사
mysql -u root -p orderhere_prod -e "CHECK TABLE restaurants, products, orders;"

# 4. 서비스 재시작
pm2 restart all
```

---

## 📞 문제 발생 시 연락처

- 개발팀: [연락처]
- 인프라팀: [연락처]
- 긴급 상황: [연락처]
