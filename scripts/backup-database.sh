#!/bin/bash
# 데이터베이스 자동 백업 스크립트 (최소 용량, 효율적)
# 실행: 매일 새벽 3시

# 설정
BACKUP_DIR="/var/backups/orderhere"
DB_NAME="orderhere_db"
DB_USER="root"
DB_PASS="rootpassword"  # 실제 비밀번호로 변경 필요
TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)
DATE=$(date +%Y-%m-%d)

# 백업 디렉토리 생성
mkdir -p $BACKUP_DIR/daily
mkdir -p $BACKUP_DIR/weekly
mkdir -p /var/www/logs

# 로그 파일
LOG_FILE="/var/www/logs/backup.log"

echo "==================================================" >> $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting backup..." >> $LOG_FILE

# 데이터베이스 백업 (압축)
BACKUP_FILE="$BACKUP_DIR/daily/db_${DATE}.sql.gz"

# 백업 실행
mysqldump -u $DB_USER -p$DB_PASS \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  $DB_NAME | gzip > $BACKUP_FILE

# 백업 성공 여부 확인
if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ✅ Backup successful: $BACKUP_FILE ($BACKUP_SIZE)" >> $LOG_FILE
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ❌ Backup failed!" >> $LOG_FILE
    exit 1
fi

# 7일 이상 된 일간 백업 삭제 (용량 절약)
find $BACKUP_DIR/daily/ -name "db_*.sql.gz" -mtime +7 -delete
DELETED_COUNT=$(find $BACKUP_DIR/daily/ -name "db_*.sql.gz" -mtime +7 | wc -l)
echo "$(date '+%Y-%m-%d %H:%M:%S') - Deleted $DELETED_COUNT old backups (>7 days)" >> $LOG_FILE

# 일요일이면 주간 백업 복사
if [ $(date +%u) -eq 7 ]; then
    WEEK=$(date +%Y-W%V)
    cp $BACKUP_FILE "$BACKUP_DIR/weekly/db_${WEEK}.sql.gz"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - 📦 Weekly backup created: db_${WEEK}.sql.gz" >> $LOG_FILE

    # 4주 이상 된 주간 백업 삭제
    find $BACKUP_DIR/weekly/ -name "db_*.sql.gz" -mtime +28 -delete
fi

# 백업 디렉토리 총 용량 표시
TOTAL_SIZE=$(du -sh $BACKUP_DIR | cut -f1)
echo "$(date '+%Y-%m-%d %H:%M:%S') - Total backup size: $TOTAL_SIZE" >> $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Backup completed!" >> $LOG_FILE

# 디스크 사용량 체크 (80% 이상이면 경고)
DISK_USAGE=$(df -h /var | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ⚠️ WARNING: Disk usage is ${DISK_USAGE}%!" >> $LOG_FILE
fi
