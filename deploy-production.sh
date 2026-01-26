#!/bin/bash
# 운영서버 배포 스크립트 (v2.0 - 안정화 버전)
# 사용법: sudo ./deploy-production.sh
# 주의: sudo로 실행해야 nginx reload가 동작합니다

set -e  # 에러 발생시 즉시 중단

echo "========================================="
echo "Production Deployment Script v2.0"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/var/www"
PROD_BACKEND="$PROJECT_DIR/production-backend"
DEV_BACKEND="$PROJECT_DIR/dev-backend"
PROD_FRONTEND="$PROJECT_DIR/production-frontend"
DEV_FRONTEND="$PROJECT_DIR/dev-frontend"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$PROJECT_DIR/backups/${TIMESTAMP}"

# 대상 사용자 결정
TARGET_USER="${SUDO_USER:-$(whoami)}"

# ==============================================
# Step 0: 변경사항 확인 및 배포 승인
# ==============================================
echo ""
echo -e "${YELLOW}Step 0: Pre-deployment Check${NC}"

cd $PROJECT_DIR

# 마지막 배포 커밋 확인
LAST_DEPLOYED=""
if [ -f "$PROJECT_DIR/.last-deployed-commit" ]; then
    LAST_DEPLOYED=$(cat "$PROJECT_DIR/.last-deployed-commit")
fi
CURRENT_COMMIT=$(git rev-parse HEAD)

echo -e "${BLUE}   Last deployed: ${LAST_DEPLOYED:0:7}${NC}"
echo -e "${BLUE}   Current HEAD:  ${CURRENT_COMMIT:0:7}${NC}"

# 변경된 파일 목록
if [ -n "$LAST_DEPLOYED" ]; then
    echo ""
    echo -e "${BLUE}   Changed files since last deployment:${NC}"
    CHANGED_FILES=$(git diff --name-only $LAST_DEPLOYED HEAD 2>/dev/null || echo "Unable to compare")
    if [ -n "$CHANGED_FILES" ]; then
        echo "$CHANGED_FILES" | head -20 | while read file; do
            echo "     - $file"
        done
        CHANGED_COUNT=$(echo "$CHANGED_FILES" | wc -l)
        if [ "$CHANGED_COUNT" -gt 20 ]; then
            echo "     ... and $((CHANGED_COUNT - 20)) more files"
        fi
    fi
fi

echo ""
echo -e "${YELLOW}Continue with deployment? (yes/no)${NC}"
read -p "> " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 0
fi

# ==============================================
# Step 1: Pre-deployment API Tests (Dev Server)
# ==============================================
echo ""
echo -e "${YELLOW}Step 1: Pre-deployment API Tests (Dev Server)${NC}"

DEV_API="http://localhost:3001/api"
TEST_PASSED=true

# Health check
echo -n "   Health check... "
HEALTH=$(curl -s --max-time 5 "$DEV_API/health" 2>/dev/null || echo "FAIL")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    TEST_PASSED=false
fi

# Mobile Store API (public endpoint)
echo -n "   Mobile Store API... "
STORE=$(curl -s --max-time 5 "$DEV_API/mobile/store/kdine-korean" 2>/dev/null || echo "FAIL")
if echo "$STORE" | grep -q '"success":true'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    TEST_PASSED=false
fi

# Mobile Menu API (public endpoint)
echo -n "   Mobile Menu API... "
MENU=$(curl -s --max-time 5 "$DEV_API/mobile/menu/kdine-korean" 2>/dev/null || echo "FAIL")
if echo "$MENU" | grep -q '"success":true'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    TEST_PASSED=false
fi

if [ "$TEST_PASSED" = false ]; then
    echo ""
    echo -e "${RED}   Pre-deployment tests FAILED! Aborting deployment.${NC}"
    echo -e "${YELLOW}   Please fix issues on dev server first.${NC}"
    exit 1
fi

echo -e "${GREEN}   All pre-deployment tests passed!${NC}"

# ==============================================
# Step 2: Create Backup Directory & Backup Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 2: Create Backups${NC}"
mkdir -p "${BACKUP_DIR}"

# Backup .env
if [ -f "$PROD_BACKEND/.env" ]; then
    cp "$PROD_BACKEND/.env" "${BACKUP_DIR}/.env.backup"
    echo -e "${GREEN}   [1/4] .env backed up${NC}"
else
    echo -e "${RED}   .env not found! Aborting.${NC}"
    exit 1
fi

# Backup backend code (for rollback)
echo -e "${BLUE}   [2/4] Backing up backend code...${NC}"
cp -r "$PROD_BACKEND" "${BACKUP_DIR}/production-backend.backup"
echo -e "${GREEN}   [2/4] Backend code backed up${NC}"

# Backup frontend build (for rollback)
if [ -d "$PROD_FRONTEND/build" ]; then
    echo -e "${BLUE}   [3/4] Backing up frontend build...${NC}"
    cp -r "$PROD_FRONTEND/build" "${BACKUP_DIR}/production-frontend-build.backup"
    echo -e "${GREEN}   [3/4] Frontend build backed up${NC}"
else
    echo -e "${YELLOW}   [3/4] No frontend build to backup${NC}"
fi

# Backup database
echo -e "${BLUE}   [4/4] Backing up database...${NC}"
source <(grep -E "^DB_" "$PROD_BACKEND/.env" | sed 's/^/export /')
DB_BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

mysqldump -u $DB_USER -p$DB_PASSWORD \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --no-tablespaces \
  $DB_NAME 2>/dev/null | gzip > $DB_BACKUP_FILE

if [ $? -eq 0 ]; then
    DB_SIZE=$(du -h $DB_BACKUP_FILE | cut -f1)
    echo -e "${GREEN}   [4/4] Database backed up (${DB_SIZE})${NC}"
else
    echo -e "${RED}   Database backup failed! Aborting.${NC}"
    exit 1
fi

# ==============================================
# Step 3: Git Pull
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: Git Pull${NC}"
cd $PROJECT_DIR
git pull origin main || echo "   No changes from remote"

# ==============================================
# Step 4: Sync Backend Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Sync Backend Code${NC}"

rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='*.log' \
    --exclude='.server.pid' \
    $DEV_BACKEND/ $PROD_BACKEND/

echo -e "${GREEN}   Backend code synced${NC}"

# Restore & verify .env
if [ ! -f "$PROD_BACKEND/.env" ]; then
    cp "${BACKUP_DIR}/.env.backup" "$PROD_BACKEND/.env"
fi
chmod 600 "$PROD_BACKEND/.env"
chown $TARGET_USER:$TARGET_USER "$PROD_BACKEND/.env"

if grep -q "^DB_HOST=" "$PROD_BACKEND/.env" && grep -q "^DB_NAME=" "$PROD_BACKEND/.env"; then
    echo -e "${GREEN}   .env verified${NC}"
else
    echo -e "${RED}   .env corrupted! Restoring from backup...${NC}"
    cp "${BACKUP_DIR}/.env.backup" "$PROD_BACKEND/.env"
fi

# ==============================================
# Step 5: Install Backend Dependencies
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Install Backend Dependencies${NC}"
cd $PROD_BACKEND
npm install --omit=dev 2>/dev/null
echo -e "${GREEN}   Dependencies installed${NC}"

# ==============================================
# Step 6: Sync Database Schema
# ==============================================
echo ""
echo -e "${YELLOW}Step 6: Sync Database Schema${NC}"
node sync-database.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   Database schema synced${NC}"
else
    echo -e "${RED}   Database sync failed! Consider rollback.${NC}"
    exit 1
fi

# ==============================================
# Step 7: Build Frontend
# ==============================================
echo ""
echo -e "${YELLOW}Step 7: Build Frontend${NC}"
cd $DEV_FRONTEND
rm -rf node_modules/.cache 2>/dev/null || true

if [ -n "$SUDO_USER" ]; then
    su - $SUDO_USER -c "cd $DEV_FRONTEND && npm run build"
else
    npm run build
fi

if [ ! -f "$DEV_FRONTEND/build/index.html" ]; then
    echo -e "${RED}   Frontend build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}   Frontend built successfully${NC}"

# ==============================================
# Step 8: Deploy Frontend Build
# ==============================================
echo ""
echo -e "${YELLOW}Step 8: Deploy Frontend Build${NC}"
rm -rf $PROD_FRONTEND/build 2>/dev/null || true
cp -r $DEV_FRONTEND/build $PROD_FRONTEND/

if [ -n "$SUDO_USER" ]; then
    chown -R $SUDO_USER:$SUDO_USER $PROD_FRONTEND/build
fi
echo -e "${GREEN}   Frontend deployed${NC}"

# ==============================================
# Step 9: Restart Backend Server
# ==============================================
echo ""
echo -e "${YELLOW}Step 9: Restart Backend Server${NC}"

if [ "$SUDO_USER" != "" ]; then
    su - $SUDO_USER -c "pm2 restart production-backend --update-env && pm2 save"
else
    pm2 restart production-backend --update-env && pm2 save
fi
sleep 3
echo -e "${GREEN}   Backend restarted${NC}"

# ==============================================
# Step 10: Reload Nginx
# ==============================================
echo ""
echo -e "${YELLOW}Step 10: Reload Nginx${NC}"

if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/* 2>/dev/null || true
fi

if [ "$EUID" -eq 0 ]; then
    systemctl reload nginx
    echo -e "${GREEN}   Nginx reloaded${NC}"
else
    if sudo -n systemctl reload nginx 2>/dev/null; then
        echo -e "${GREEN}   Nginx reloaded${NC}"
    else
        echo -e "${YELLOW}   Nginx reload skipped (no permission)${NC}"
    fi
fi

# ==============================================
# Step 11: Post-deployment Verification
# ==============================================
echo ""
echo -e "${YELLOW}Step 11: Post-deployment Verification${NC}"

PROD_API="http://localhost:3002/api"
VERIFY_PASSED=true

sleep 2

# Health check
echo -n "   Health check... "
HEALTH=$(curl -s --max-time 5 "$PROD_API/health" 2>/dev/null || echo "FAIL")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    VERIFY_PASSED=false
fi

# Menu API
echo -n "   Menu API... "
MENU=$(curl -s --max-time 5 "$PROD_API/menu/8" 2>/dev/null || echo "FAIL")
if echo "$MENU" | grep -q '"success":true'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    VERIFY_PASSED=false
fi

# Categories API
echo -n "   Categories API... "
CATS=$(curl -s --max-time 5 "$PROD_API/categories?restaurant_id=8" 2>/dev/null || echo "FAIL")
if echo "$CATS" | grep -q '"success":true\|"categories"'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED${NC}"
    VERIFY_PASSED=false
fi

if [ "$VERIFY_PASSED" = false ]; then
    echo ""
    echo -e "${RED}   POST-DEPLOYMENT VERIFICATION FAILED!${NC}"
    echo -e "${YELLOW}   Consider rolling back: sudo ./rollback-production.sh ${TIMESTAMP}${NC}"
    exit 1
fi

echo -e "${GREEN}   All verifications passed!${NC}"

# ==============================================
# Save Deployment Info
# ==============================================
cd $PROJECT_DIR
DEPLOYED_COMMIT=$(git rev-parse HEAD)
echo "$DEPLOYED_COMMIT" > "$PROJECT_DIR/.last-deployed-commit"

# ==============================================
# Deployment Complete
# ==============================================
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   DEPLOYMENT COMPLETE${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}Deployment Info:${NC}"
echo "   Timestamp:   ${TIMESTAMP}"
echo "   Commit:      ${DEPLOYED_COMMIT:0:7}"
echo "   Backup:      ${BACKUP_DIR}"
echo ""
echo -e "${YELLOW}Rollback Command:${NC}"
echo "   sudo ./rollback-production.sh ${TIMESTAMP}"
echo ""
echo -e "${BLUE}Manual Verification (recommended):${NC}"
echo "   1. https://purplehere.com - 사이트 접속"
echo "   2. POS 터미널 - 주문 생성 테스트"
echo "   3. 모바일 QR - 메뉴 클릭 테스트"
echo ""
