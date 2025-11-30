#!/bin/bash
# 데이터베이스 마이그레이션 실행 스크립트
# 사용법: ./run-migrations.sh [development|production]

ENV=${1:-development}

# 환경별 .env 파일에서 DB 정보 로드
if [ "$ENV" = "production" ]; then
    ENV_FILE="/var/www/production-backend/.env"
else
    ENV_FILE="/var/www/dev-backend/.env"
fi

if [ -f "$ENV_FILE" ]; then
    source <(grep -E "^DB_" "$ENV_FILE" | sed 's/^/export /')
    DB_NAME=$DB_NAME
    DB_USER=$DB_USER
    DB_PASS=$DB_PASSWORD
else
    echo "Error: .env 파일을 찾을 수 없습니다: $ENV_FILE"
    exit 1
fi

MIGRATION_DIR="/var/www/database/migrations"
LOG_FILE="/var/www/logs/migration.log"

echo "========================================" | tee -a $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Running migrations on $ENV environment ($DB_NAME)" | tee -a $LOG_FILE

# 마이그레이션 디렉토리 확인
if [ ! -d "$MIGRATION_DIR" ]; then
    echo "⚠️  Migration directory not found: $MIGRATION_DIR" | tee -a $LOG_FILE
    echo "Creating directory..." | tee -a $LOG_FILE
    mkdir -p $MIGRATION_DIR
fi

# 마이그레이션 추적 테이블 생성
echo "Creating schema_migrations table if not exists..." | tee -a $LOG_FILE
mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF 2>&1 | tee -a $LOG_FILE
CREATE TABLE IF NOT EXISTS schema_migrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  execution_time_ms INT,
  INDEX idx_version (version)
);
EOF

# 실행된 마이그레이션 목록 가져오기
EXECUTED=$(mysql -u $DB_USER -p$DB_PASS -N -e "SELECT version FROM schema_migrations" $DB_NAME 2>/dev/null)

# 마이그레이션 파일이 있는지 확인
MIGRATION_COUNT=$(ls -1 $MIGRATION_DIR/*.sql 2>/dev/null | wc -l)
if [ $MIGRATION_COUNT -eq 0 ]; then
    echo "ℹ️  No migration files found in $MIGRATION_DIR" | tee -a $LOG_FILE
    echo "✅ Migrations up to date!" | tee -a $LOG_FILE
    exit 0
fi

EXECUTED_COUNT=0
SKIPPED_COUNT=0

# 모든 마이그레이션 파일 순서대로 실행
for FILE in $(ls $MIGRATION_DIR/*.sql 2>/dev/null | sort); do
    VERSION=$(basename $FILE .sql)

    # 이미 실행되었는지 확인
    if echo "$EXECUTED" | grep -q "^$VERSION$"; then
        echo "⏭️  Skipping $VERSION (already executed)" | tee -a $LOG_FILE
        SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
        continue
    fi

    echo "▶️  Running migration: $VERSION" | tee -a $LOG_FILE
    START_TIME=$(date +%s%3N)

    # 마이그레이션 실행
    mysql -u $DB_USER -p$DB_PASS $DB_NAME < $FILE 2>&1 | tee -a $LOG_FILE

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        END_TIME=$(date +%s%3N)
        EXEC_TIME=$((END_TIME - START_TIME))

        # 실행 기록
        DESCRIPTION=$(head -3 $FILE | grep "Migration:" | sed 's/-- Migration: //')
        mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF 2>&1 | tee -a $LOG_FILE
INSERT INTO schema_migrations (version, description, execution_time_ms)
VALUES ('$VERSION', '$DESCRIPTION', $EXEC_TIME);
EOF
        echo "✅ $VERSION completed in ${EXEC_TIME}ms" | tee -a $LOG_FILE
        EXECUTED_COUNT=$((EXECUTED_COUNT + 1))
    else
        echo "❌ Migration failed: $VERSION" | tee -a $LOG_FILE
        echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: Migration failed at $VERSION" | tee -a $LOG_FILE
        exit 1
    fi
done

echo "========================================" | tee -a $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Migration summary:" | tee -a $LOG_FILE
echo "  ✅ Executed: $EXECUTED_COUNT" | tee -a $LOG_FILE
echo "  ⏭️  Skipped: $SKIPPED_COUNT" | tee -a $LOG_FILE
echo "✅ All migrations completed successfully!" | tee -a $LOG_FILE
