#!/bin/bash
# 개발서버 DB 자동 백업 스크립트
# 실행: 매일 새벽 4시

# .env 파일에서 DB 정보 로드
if [ -f "/var/www/dev-backend/.env" ]; then
    source <(grep -E "^DB_" /var/www/dev-backend/.env | sed 's/^/export /')
    DB_USER=$DB_USER
    DB_PASS=$DB_PASSWORD
    DB_NAME=$DB_NAME
else
    echo "Error: .env 파일을 찾을 수 없습니다."
    exit 1
fi

# 설정
BACKUP_DIR="/var/backups/dev-db"
DATE=$(date +%Y-%m-%d)

# 백업 디렉토리 생성
mkdir -p $BACKUP_DIR/daily
mkdir -p /var/www/logs

# 로그 파일
LOG_FILE="/var/www/logs/dev-backup.log"

echo "==================================================" >> $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Starting dev DB backup..." >> $LOG_FILE

# 데이터베이스 백업 (압축)
BACKUP_FILE="$BACKUP_DIR/daily/dev_db_${DATE}.sql.gz"

mysqldump -u $DB_USER -p$DB_PASS \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --no-tablespaces \
  $DB_NAME | gzip > "$BACKUP_FILE.part"
PS=("${PIPESTATUS[@]}"); DUMP_RC=${PS[0]}; GZIP_RC=${PS[1]}

# 백업 성공 여부 확인 — 임시 파일(.part)이 덤프·압축 성공 · 크기 0 아님 · gzip -t 통과일 때만
# 오늘 파일로 바꿔 넣는다(2026-11-18 · 상황판 «지금 백업» 으로 하루 두 번 돌 수 있어, 도중 실패가 오늘의 좋은 사본을 깨지 않게)
if [ $DUMP_RC -eq 0 ] && [ $GZIP_RC -eq 0 ] && [ -s "$BACKUP_FILE.part" ] && gzip -t "$BACKUP_FILE.part" 2>/dev/null; then
    mv -f "$BACKUP_FILE.part" "$BACKUP_FILE"
    BACKUP_SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ✓ Backup successful: $BACKUP_FILE ($BACKUP_SIZE)" >> $LOG_FILE
else
    rm -f "$BACKUP_FILE.part"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ✗ Backup failed! (dump=$DUMP_RC gzip=$GZIP_RC — 이전 사본은 그대로)" >> $LOG_FILE
    exit 1
fi

# 14일 이상 된 백업 삭제
find $BACKUP_DIR/daily/ -name "dev_db_*.sql.gz" -mtime +14 -delete
find $BACKUP_DIR/daily/ -name "dev_uploads_*.tar.gz" -mtime +14 -delete
find $BACKUP_DIR/daily/ -name "*.part" -mmin +120 -delete
# 크로스 백업도 14일 이상 삭제
find /home/irene/backups/cross-backup/production-pos/ -name "db_*.sql.gz" -mtime +14 -delete 2>/dev/null
find /home/irene/backups/cross-backup/production-pos/ -name "uploads_*.tar.gz" -mtime +14 -delete 2>/dev/null
echo "$(date '+%Y-%m-%d %H:%M:%S') - Cleaned up backups older than 14 days" >> $LOG_FILE

# Uploads 백업 (이미지/계약서/첨부파일)
UPLOADS_BACKUP="$BACKUP_DIR/daily/dev_uploads_${DATE}.tar.gz"
if [ -d /var/www/uploads ]; then
    tar czf "$UPLOADS_BACKUP.part" -C /var/www uploads/ 2>/dev/null
    if [ $? -eq 0 ] && [ -s "$UPLOADS_BACKUP.part" ] && gzip -t "$UPLOADS_BACKUP.part" 2>/dev/null; then
        mv -f "$UPLOADS_BACKUP.part" "$UPLOADS_BACKUP"
        UPLOADS_SIZE=$(du -h $UPLOADS_BACKUP | cut -f1)
        echo "$(date '+%Y-%m-%d %H:%M:%S') - ✓ Uploads backup: $UPLOADS_BACKUP ($UPLOADS_SIZE)" >> $LOG_FILE
    else
        rm -f "$UPLOADS_BACKUP.part"
        echo "$(date '+%Y-%m-%d %H:%M:%S') - ✗ Uploads backup failed!" >> $LOG_FILE
    fi
fi

# 백업 디렉토리 총 용량
TOTAL_SIZE=$(du -sh $BACKUP_DIR | cut -f1)
echo "$(date '+%Y-%m-%d %H:%M:%S') - Total backup size: $TOTAL_SIZE" >> $LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') - Dev DB backup completed!" >> $LOG_FILE

# 크로스 백업: 개발 DB + uploads 백업을 운영서버로 전송
CROSS_BACKUP_DIR="irene@87.106.78.146:/home/irene/backups/cross-backup/dev"
scp -o ConnectTimeout=10 -q $BACKUP_FILE $CROSS_BACKUP_DIR/ 2>/dev/null
DB_SCP=$?
if [ -s "$UPLOADS_BACKUP" ]; then
    scp -o ConnectTimeout=30 -q $UPLOADS_BACKUP $CROSS_BACKUP_DIR/ 2>/dev/null
    UPLOADS_SCP=$?
else
    UPLOADS_SCP=0
fi
if [ $DB_SCP -eq 0 ] && [ $UPLOADS_SCP -eq 0 ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ✓ Cross-backup sent to production server (DB + uploads)" >> $LOG_FILE
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ⚠️ Cross-backup to production server failed (DB=$DB_SCP, uploads=$UPLOADS_SCP)" >> $LOG_FILE
fi
