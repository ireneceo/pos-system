#!/bin/bash
# 운영서버 배포 스크립트 (개선 버전)
# 사용법: ./deploy-production.sh

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
# Step 2: Database Backup
# ==============================================
echo ""
echo -e "${YELLOW}Step 2: Backup Database${NC}"
DB_USER="prod_admin"
DB_PASS="khfjkjkdkjei"
DB_NAME="purple_production_db"
DB_BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

echo -e "${BLUE}   Backing up ${DB_NAME}...${NC}"
mysqldump -u $DB_USER -p$DB_PASS \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --no-tablespaces \
  $DB_NAME | gzip > $DB_BACKUP_FILE

if [ $? -eq 0 ]; then
    DB_SIZE=$(du -h $DB_BACKUP_FILE | cut -f1)
    echo -e "${GREEN}   ✅ Database backup completed: ${DB_SIZE}${NC}"
else
    echo -e "${RED}   ❌ Database backup failed!${NC}"
    exit 1
fi

# ==============================================
# Step 3: Backup Backend Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: Backup Production Backend${NC}"
if [ -d "$PROD_BACKEND" ]; then
    cp -r $PROD_BACKEND "${BACKUP_DIR}/production-backend.backup"
    echo -e "${GREEN}   ✅ Backend backup completed${NC}"
fi

# ==============================================
# Step 4: Backup Frontend Build
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Backup Production Frontend Build${NC}"
if [ -d "$PROD_FRONTEND/build" ]; then
    cp -r $PROD_FRONTEND/build "${BACKUP_DIR}/production-frontend-build.backup"
    echo -e "${GREEN}   ✅ Frontend build backup completed${NC}"
fi

# ==============================================
# Step 5: Sync Backend Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Sync Backend Code (dev -> production)${NC}"

# .env 백업
cp $PROD_BACKEND/.env $PROD_BACKEND/.env.backup

# .deployignore 파일에서 제외할 파일 읽기
EXCLUDE_ARGS="--exclude='node_modules' --exclude='.env' --exclude='*.log' --exclude='.server.pid'"

if [ -f "$PROJECT_DIR/.deployignore" ]; then
  echo -e "${BLUE}   Loading .deployignore...${NC}"
  while IFS= read -r line || [ -n "$line" ]; do
    if [[ ! "$line" =~ ^# ]] && [[ -n "$line" ]]; then
      EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude='$line'"
    fi
  done < "$PROJECT_DIR/.deployignore"
fi

# rsync 실행
eval "rsync -av --delete $EXCLUDE_ARGS $DEV_BACKEND/ $PROD_BACKEND/"
echo -e "${GREEN}   ✅ Backend code synced${NC}"

# .env 복원
mv $PROD_BACKEND/.env.backup $PROD_BACKEND/.env

# ==============================================
# Step 6: Install Backend Dependencies
# ==============================================
echo ""
echo -e "${YELLOW}Step 6: Install Backend Dependencies${NC}"
cd $PROD_BACKEND
npm install --omit=dev
echo -e "${GREEN}   ✅ Dependencies installed${NC}"

# ==============================================
# Step 7: Database Sync (Sequelize alter)
# ==============================================
echo ""
echo -e "${YELLOW}Step 7: Sync Database Schema${NC}"
echo -e "${BLUE}   Running Sequelize sync (alter mode)...${NC}"
node sync-database.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Database schema synced${NC}"
else
    echo -e "${RED}   ❌ Database sync failed!${NC}"
    exit 1
fi

# ==============================================
# Step 8: Build Frontend
# ==============================================
echo ""
echo -e "${YELLOW}Step 8: Build Frontend${NC}"
cd $DEV_FRONTEND

# 캐시 클리어
rm -rf node_modules/.cache build

echo -e "${BLUE}   Building React app...${NC}"
npm run build

if [ ! -d "build" ]; then
    echo -e "${RED}   ❌ Frontend build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Frontend built successfully${NC}"

# ==============================================
# Step 9: Deploy Frontend Build
# ==============================================
echo ""
echo -e "${YELLOW}Step 9: Deploy Frontend Build${NC}"
rm -rf $PROD_FRONTEND/build
cp -r $DEV_FRONTEND/build $PROD_FRONTEND/
echo -e "${GREEN}   ✅ Frontend build deployed${NC}"

# ==============================================
# Step 10: Restart Backend Server
# ==============================================
echo ""
echo -e "${YELLOW}Step 10: Restart Backend Server${NC}"
pm2 restart production-backend
sleep 3
echo -e "${GREEN}   ✅ Backend server restarted${NC}"

# ==============================================
# Step 11: Reload Nginx
# ==============================================
echo ""
echo -e "${YELLOW}Step 11: Reload Nginx${NC}"
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/*
fi
systemctl reload nginx
echo -e "${GREEN}   ✅ Nginx reloaded${NC}"

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
echo "   - Backup Location: ${BACKUP_DIR}"
echo "   - Database Backup: ${DB_BACKUP_FILE} (${DB_SIZE})"
echo ""
echo -e "${BLUE}🔍 Service Status:${NC}"
pm2 list | grep production
echo ""
echo -e "${BLUE}📝 Post-Deployment Checklist:${NC}"
echo "   1. ✓ Visit https://purplehere.com"
echo "   2. ✓ Press Ctrl+Shift+R for hard refresh"
echo "   3. ✓ Test POS Terminal functionality"
echo "   4. ✓ Check if Takeaway Charge appears"
echo "   5. ✓ Verify receipt printing"
echo ""
echo -e "${YELLOW}🔙 Rollback Command:${NC}"
echo "   ./rollback-production.sh ${TIMESTAMP}"
echo ""
