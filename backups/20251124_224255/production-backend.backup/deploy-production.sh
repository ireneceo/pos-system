#!/bin/bash

echo "========================================="
echo "Starting Production Deployment"
echo "========================================="

# 색상 코드
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 프로젝트 디렉토리
PROJECT_DIR="/var/www"
PROD_DIR="$PROJECT_DIR/production-backend"
DEV_DIR="$PROJECT_DIR/dev-backend"

echo -e "${YELLOW}Step 1: Git Pull (latest code)${NC}"
cd $PROJECT_DIR
git pull origin main

echo -e "${YELLOW}Step 2: Backup production .env${NC}"
cp $PROD_DIR/.env $PROD_DIR/.env.backup

echo -e "${YELLOW}Step 3: Sync dev-backend to production-backend${NC}"
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='*.log' \
  --exclude='.server.pid' \
  $DEV_DIR/ $PROD_DIR/

echo -e "${YELLOW}Step 4: Restore production .env${NC}"
mv $PROD_DIR/.env.backup $PROD_DIR/.env

echo -e "${YELLOW}Step 5: Install/Update dependencies${NC}"
cd $PROD_DIR
npm install --production

echo -e "${YELLOW}Step 6: Sync Production Database${NC}"
node sync-database.js

echo -e "${YELLOW}Step 7: Restart Production Server${NC}"
pm2 restart production-backend

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Production Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"

# 상태 확인
pm2 status production-backend
pm2 logs production-backend --lines 20
