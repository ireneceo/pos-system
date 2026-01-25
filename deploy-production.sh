#!/bin/bash
# 운영서버 배포 스크립트 (최적화 버전)
# 사용법: sudo ./deploy-production.sh
# 주의: sudo로 실행해야 nginx reload가 동작합니다

set -e  # 에러 발생시 즉시 중단

echo "========================================="
echo "Starting Production Deployment"
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

# 백업 디렉토리 생성
echo -e "${BLUE}📦 Creating backup directory...${NC}"
mkdir -p "${BACKUP_DIR}"

# ==============================================
# Step 1: Git Pull
# ==============================================
echo ""
echo -e "${YELLOW}Step 1: Git Pull${NC}"
cd $PROJECT_DIR
git pull origin main || echo "Git pull failed or no changes"

# ==============================================
# Step 2: Backup .env (가장 먼저, rsync 전에)
# ==============================================
echo ""
echo -e "${YELLOW}Step 2: Backup .env file${NC}"
if [ -f "$PROD_BACKEND/.env" ]; then
    cp "$PROD_BACKEND/.env" "${BACKUP_DIR}/.env.backup"
    echo -e "${GREEN}   ✅ .env backed up to ${BACKUP_DIR}/.env.backup${NC}"
else
    echo -e "${RED}   ❌ .env 파일을 찾을 수 없습니다!${NC}"
    exit 1
fi

# ==============================================
# Step 3: Backup Database
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: Backup Database${NC}"

# .env 파일에서 운영 DB 정보 로드
source <(grep -E "^DB_" "$PROD_BACKEND/.env" | sed 's/^/export /')
DB_USER=$DB_USER
DB_PASS=$DB_PASSWORD
DB_NAME=$DB_NAME

DB_BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

echo -e "${BLUE}   Backing up ${DB_NAME}...${NC}"
mysqldump -u $DB_USER -p$DB_PASS \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --no-tablespaces \
  $DB_NAME 2>/dev/null | gzip > $DB_BACKUP_FILE

if [ $? -eq 0 ]; then
    DB_SIZE=$(du -h $DB_BACKUP_FILE | cut -f1)
    echo -e "${GREEN}   ✅ Database backup completed: ${DB_SIZE}${NC}"
else
    echo -e "${RED}   ❌ Database backup failed!${NC}"
    exit 1
fi

# ==============================================
# Step 4: Sync Backend Code (rsync, .env 제외)
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Sync Backend Code (dev -> production)${NC}"

# rsync 실행 (.env는 항상 제외, node_modules도 제외)
rsync -av --delete \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='*.log' \
    --exclude='.server.pid' \
    $DEV_BACKEND/ $PROD_BACKEND/

echo -e "${GREEN}   ✅ Backend code synced${NC}"

# .env 파일 존재 확인 (rsync가 실수로 삭제했을 경우 복원)
if [ ! -f "$PROD_BACKEND/.env" ]; then
    echo -e "${YELLOW}   ⚠️  .env 파일이 없음 - 백업에서 복원${NC}"
    cp "${BACKUP_DIR}/.env.backup" "$PROD_BACKEND/.env"
fi
chmod 600 "$PROD_BACKEND/.env"
chown $TARGET_USER:$TARGET_USER "$PROD_BACKEND/.env"

# .env 검증
if grep -q "^DB_HOST=" "$PROD_BACKEND/.env" && grep -q "^DB_NAME=" "$PROD_BACKEND/.env"; then
    echo -e "${GREEN}   ✅ .env verified${NC}"
else
    echo -e "${RED}   ❌ .env 손상됨 - 백업에서 복원${NC}"
    cp "${BACKUP_DIR}/.env.backup" "$PROD_BACKEND/.env"
    chmod 600 "$PROD_BACKEND/.env"
    chown $TARGET_USER:$TARGET_USER "$PROD_BACKEND/.env"
fi

# ==============================================
# Step 5: Install Backend Dependencies
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Install Backend Dependencies${NC}"
cd $PROD_BACKEND
npm install --omit=dev 2>/dev/null
echo -e "${GREEN}   ✅ Dependencies installed${NC}"

# ==============================================
# Step 6: Sync Database Schema (Sequelize)
# ==============================================
echo ""
echo -e "${YELLOW}Step 6: Sync Database Schema${NC}"
echo -e "${BLUE}   Running Sequelize sync...${NC}"
node sync-database.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Database schema synced${NC}"
else
    echo -e "${RED}   ❌ Database sync failed!${NC}"
    exit 1
fi

# ==============================================
# Step 7: Build Frontend
# ==============================================
echo ""
echo -e "${YELLOW}Step 7: Build Frontend${NC}"
cd $DEV_FRONTEND

# 캐시 클리어
rm -rf node_modules/.cache 2>/dev/null || true

echo -e "${BLUE}   Building React app...${NC}"
if [ -n "$SUDO_USER" ]; then
    su - $SUDO_USER -c "cd $DEV_FRONTEND && npm run build"
else
    npm run build
fi

if [ ! -f "$DEV_FRONTEND/build/index.html" ]; then
    echo -e "${RED}   ❌ Frontend build failed! (index.html not found)${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Frontend built successfully${NC}"

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
echo -e "${GREEN}   ✅ Frontend build deployed${NC}"

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
sleep 2
echo -e "${GREEN}   ✅ Backend server restarted${NC}"

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
    echo -e "${GREEN}   ✅ Nginx reloaded${NC}"
else
    if sudo -n systemctl reload nginx 2>/dev/null; then
        echo -e "${GREEN}   ✅ Nginx reloaded${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Nginx reload skipped (no sudo permission)${NC}"
    fi
fi

# ==============================================
# Step 11: Verify Deployment
# ==============================================
echo ""
echo -e "${YELLOW}Step 11: Verify Deployment${NC}"

# Health check
sleep 2
HEALTH=$(curl -s http://localhost:3002/api/health 2>/dev/null)
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}   ✅ Health check passed${NC}"
else
    echo -e "${RED}   ❌ Health check failed!${NC}"
    echo "   Response: $HEALTH"
    echo -e "${YELLOW}   Checking logs...${NC}"
    pm2 logs production-backend --lines 10 --nostream
    exit 1
fi

# ==============================================
# Save Last Deployed Commit
# ==============================================
cd $PROJECT_DIR
DEPLOYED_COMMIT=$(git rev-parse HEAD)
echo "$DEPLOYED_COMMIT" > "$PROJECT_DIR/.last-deployed-commit"

# ==============================================
# Deployment Complete
# ==============================================
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}📊 Deployment Info:${NC}"
echo "   - Timestamp: ${TIMESTAMP}"
echo "   - Deployed Commit: ${DEPLOYED_COMMIT:0:7}"
echo "   - Backup Location: ${BACKUP_DIR}"
echo "   - Database Backup: ${DB_BACKUP_FILE} (${DB_SIZE})"
echo ""
echo -e "${YELLOW}🔙 Rollback Command:${NC}"
echo "   sudo ./rollback-production.sh ${TIMESTAMP}"
echo ""
