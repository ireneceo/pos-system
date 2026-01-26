#!/bin/bash
# 운영서버 롤백 스크립트 (v2.0)
# 사용법: sudo ./rollback-production.sh [TIMESTAMP]
# 예시: sudo ./rollback-production.sh 20251112_143000

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}=========================================${NC}"
    echo -e "${RED}   Production Rollback${NC}"
    echo -e "${RED}=========================================${NC}"
    echo ""
    echo -e "${RED}Error: Timestamp required${NC}"
    echo "Usage: sudo ./rollback-production.sh [TIMESTAMP]"
    echo ""
    echo -e "${BLUE}Available backups:${NC}"
    ls -1t /var/www/backups/ 2>/dev/null | head -10 | while read dir; do
        if [ -d "/var/www/backups/$dir" ]; then
            # Show what's in each backup
            CONTENTS=""
            [ -f "/var/www/backups/$dir/.env.backup" ] && CONTENTS="$CONTENTS .env"
            [ -d "/var/www/backups/$dir/production-backend.backup" ] && CONTENTS="$CONTENTS backend"
            [ -d "/var/www/backups/$dir/production-frontend-build.backup" ] && CONTENTS="$CONTENTS frontend"
            [ -f "/var/www/backups/$dir/db_backup_${dir}.sql.gz" ] && CONTENTS="$CONTENTS db"
            echo "   $dir [$CONTENTS ]"
        fi
    done
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

# 대상 사용자 결정
TARGET_USER="${SUDO_USER:-$(whoami)}"

if [ -d "${BACKUP_DIR}/production-backend.backup" ]; then
    echo -e "${BLUE}   Restoring backend code...${NC}"

    # 현재 .env 보존 (백업에 있는 것 사용)
    rm -rf $PROD_BACKEND
    cp -r "${BACKUP_DIR}/production-backend.backup" $PROD_BACKEND

    # .env 권한 설정
    if [ -f "$PROD_BACKEND/.env" ]; then
        chmod 600 "$PROD_BACKEND/.env"
        chown $TARGET_USER:$TARGET_USER "$PROD_BACKEND/.env"
    elif [ -f "${BACKUP_DIR}/.env.backup" ]; then
        cp "${BACKUP_DIR}/.env.backup" "$PROD_BACKEND/.env"
        chmod 600 "$PROD_BACKEND/.env"
        chown $TARGET_USER:$TARGET_USER "$PROD_BACKEND/.env"
    fi

    echo -e "${GREEN}   Backend code restored${NC}"

    # PM2 재시작
    echo -e "${BLUE}   Restarting backend...${NC}"
    if [ "$SUDO_USER" != "" ]; then
        su - $SUDO_USER -c "pm2 restart production-backend --update-env && pm2 save"
    else
        pm2 restart production-backend --update-env && pm2 save
    fi
    sleep 3
    echo -e "${GREEN}   Backend restarted${NC}"
else
    echo -e "${YELLOW}   Backend backup not found - skipping${NC}"
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

    # 권한 설정
    if [ -n "$SUDO_USER" ]; then
        chown -R $SUDO_USER:$SUDO_USER $PROD_FRONTEND/build
    fi

    echo -e "${GREEN}   Frontend build restored${NC}"
else
    echo -e "${YELLOW}   Frontend backup not found - skipping${NC}"
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
        # .env 파일에서 DB 정보 로드
        if [ -f "$PROD_BACKEND/.env" ]; then
            source <(grep -E "^DB_" "$PROD_BACKEND/.env" | sed 's/^/export /')
            DB_USER=$DB_USER
            DB_PASS=$DB_PASSWORD
            DB_NAME=$DB_NAME
        else
            echo -e "${RED}   ❌ .env 파일을 찾을 수 없습니다.${NC}"
            exit 1
        fi

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
# Step 5: Post-rollback Verification
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Post-rollback Verification${NC}"

PROD_API="http://localhost:3002/api"
sleep 2

echo -n "   Health check... "
HEALTH=$(curl -s --max-time 5 "$PROD_API/health" 2>/dev/null || echo "FAIL")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED - check pm2 logs${NC}"
fi

# ==============================================
# 롤백 완료
# ==============================================
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   ROLLBACK COMPLETE${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}Service Status:${NC}"
pm2 list | grep production
echo ""
echo -e "${BLUE}Restored from:${NC}"
echo "   Timestamp: ${TIMESTAMP}"
echo "   Backup:    ${BACKUP_DIR}"
echo ""
echo -e "${YELLOW}Manual Verification (recommended):${NC}"
echo "   1. https://purplehere.com - 사이트 접속"
echo "   2. POS 터미널 - 주문 생성 테스트"
echo ""
