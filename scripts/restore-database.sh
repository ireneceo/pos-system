#!/bin/bash
# 데이터베이스 복원 스크립트

BACKUP_DIR="/var/backups/orderhere"
DB_NAME="purple_dev_db"
DB_USER="dev_admin"
DB_PASS="djiflmdjdhue"

# 사용법 출력
if [ $# -eq 0 ]; then
    echo "사용법: $0 <backup-file>"
    echo ""
    echo "예시:"
    echo "  $0 /var/backups/orderhere/daily/db_2025-01-20.sql.gz"
    echo ""
    echo "사용 가능한 백업 파일:"
    echo "--- 일간 백업 ---"
    ls -lh $BACKUP_DIR/daily/ 2>/dev/null || echo "  (백업 없음)"
    echo "--- 주간 백업 ---"
    ls -lh $BACKUP_DIR/weekly/ 2>/dev/null || echo "  (백업 없음)"
    exit 1
fi

BACKUP_FILE=$1

# 백업 파일 존재 확인
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ 에러: 백업 파일을 찾을 수 없습니다: $BACKUP_FILE"
    exit 1
fi

echo "⚠️  경고: 데이터베이스를 복원하면 현재 데이터가 덮어쓰기됩니다!"
echo "복원할 백업: $BACKUP_FILE"
read -p "계속하시겠습니까? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "복원이 취소되었습니다."
    exit 0
fi

echo "데이터베이스 복원 중..."

# 복원 실행
gunzip < $BACKUP_FILE | mysql -u $DB_USER -p$DB_PASS $DB_NAME

if [ $? -eq 0 ]; then
    echo "✅ 데이터베이스가 성공적으로 복원되었습니다!"
    echo "복원 완료 시간: $(date '+%Y-%m-%d %H:%M:%S')"

    # PM2 재시작 (애플리케이션이 새 DB 상태를 반영하도록)
    echo "애플리케이션 재시작 중..."
    pm2 restart all
    echo "✅ 완료!"
else
    echo "❌ 복원 실패!"
    exit 1
fi
