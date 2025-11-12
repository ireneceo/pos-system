#!/bin/bash
# 운영서버 롤백 스크립트
# 사용법: ./rollback-production.sh [TIMESTAMP]
# 예시: ./rollback-production.sh 20251112_143000

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}❌ 에러: 타임스탬프를 지정해주세요.${NC}"
    echo "사용법: ./rollback-production.sh [TIMESTAMP]"
    echo ""
    echo -e "${BLUE}📦 사용 가능한 백업:${NC}"
    ls -lt /var/www/backups/ 2>/dev/null | head -10 || echo "백업이 없습니다."
    exit 1
fi

TIMESTAMP=$1
BACKUP_DIR="/var/www/backups/${TIMESTAMP}"
PROJECT_DIR="/var/www"
PROD_BACKEND="$PROJECT_DIR/production-backend"
PROD_FRONTEND="$PROJECT_DIR/production-frontend"

if [ ! -d "${BACKUP_DIR}" ]; then
    echo -e "${RED}❌ 에러: 백업 디렉토리를 찾을 수 없습니다: ${BACKUP_DIR}${NC}"
    echo ""
    echo -e "${BLUE}📦 사용 가능한 백업:${NC}"
    ls -lt /var/www/backups/ 2>/dev/null | head -10 || echo "백업이 없습니다."
    exit 1
fi

echo -e "${RED}=========================================${NC}"
echo -e "${RED}🔙 운영서버 롤백 시작${NC}"
echo -e "${RED}=========================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  경고: 이 작업은 다음을 복원합니다:${NC}"
echo "   - 백엔드 코드"
echo "   - 프론트엔드 빌드"
echo "   - 데이터베이스 (선택사항)"
echo ""
read -p "계속하시겠습니까? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}롤백이 취소되었습니다.${NC}"
    exit 0
fi

# ==============================================
# Step 1: 백엔드 롤백
# ==============================================
echo ""
echo -e "${YELLOW}Step 1: 백엔드 코드 롤백${NC}"
if [ -d "${BACKUP_DIR}/production-backend.backup" ]; then
    echo -e "${BLUE}   Restoring backend code...${NC}"
    rm -rf $PROD_BACKEND
    cp -r "${BACKUP_DIR}/production-backend.backup" $PROD_BACKEND
    echo -e "${GREEN}   ✅ 백엔드 코드 롤백 완료${NC}"

    # PM2 재시작
    echo -e "${BLUE}   Restarting backend...${NC}"
    pm2 restart production-backend
    sleep 3
    echo -e "${GREEN}   ✅ 백엔드 재시작 완료${NC}"
else
    echo -e "${YELLOW}   ⚠️  백엔드 백업을 찾을 수 없습니다.${NC}"
fi

# ==============================================
# Step 2: 프론트엔드 롤백
# ==============================================
echo ""
echo -e "${YELLOW}Step 2: 프론트엔드 빌드 롤백${NC}"
if [ -d "${BACKUP_DIR}/production-frontend-build.backup" ]; then
    echo -e "${BLUE}   Restoring frontend build...${NC}"
    rm -rf $PROD_FRONTEND/build
    cp -r "${BACKUP_DIR}/production-frontend-build.backup" $PROD_FRONTEND/build
    echo -e "${GREEN}   ✅ 프론트엔드 빌드 롤백 완료${NC}"
else
    echo -e "${YELLOW}   ⚠️  프론트엔드 백업을 찾을 수 없습니다.${NC}"
fi

# ==============================================
# Step 3: 데이터베이스 롤백 (선택)
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: 데이터베이스 롤백 (선택)${NC}"
DB_BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

if [ -f "$DB_BACKUP_FILE" ]; then
    echo -e "${RED}⚠️  경고: 데이터베이스를 복원하면 현재 데이터가 손실됩니다!${NC}"
    read -p "데이터베이스를 복원하시겠습니까? (yes/no): " DB_CONFIRM

    if [ "$DB_CONFIRM" = "yes" ]; then
        DB_USER="prod_admin"
        DB_PASS="khfjkjkdkjei"
        DB_NAME="purple_production_db"

        echo -e "${BLUE}   Restoring database...${NC}"
        gunzip < $DB_BACKUP_FILE | mysql -u $DB_USER -p$DB_PASS $DB_NAME

        if [ $? -eq 0 ]; then
            echo -e "${GREEN}   ✅ 데이터베이스 롤백 완료${NC}"
        else
            echo -e "${RED}   ❌ 데이터베이스 롤백 실패!${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}   ⏭️  데이터베이스 롤백을 건너뜁니다.${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  데이터베이스 백업을 찾을 수 없습니다: ${DB_BACKUP_FILE}${NC}"
fi

# ==============================================
# Step 4: Nginx 재시작
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Nginx 캐시 클리어 및 재시작${NC}"
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/*
fi
systemctl reload nginx
echo -e "${GREEN}   ✅ Nginx 재시작 완료${NC}"

# ==============================================
# 롤백 완료
# ==============================================
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ 롤백 완료!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}🔍 서비스 상태:${NC}"
pm2 list | grep production
echo ""
echo -e "${BLUE}📊 복원된 백업 정보:${NC}"
echo "   - 타임스탬프: ${TIMESTAMP}"
echo "   - 백업 위치: ${BACKUP_DIR}"
echo ""
