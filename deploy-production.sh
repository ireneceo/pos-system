#!/bin/bash

echo "========================================="
echo "Starting Production Deployment"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PROJECT_DIR="/var/www"
PROD_DIR="$PROJECT_DIR/production-backend"
DEV_DIR="$PROJECT_DIR/dev-backend"

echo -e "${YELLOW}Step 1: Git Pull${NC}"
cd $PROJECT_DIR
git pull origin main

echo -e "${YELLOW}Step 2: Backup production .env${NC}"
cp $PROD_DIR/.env $PROD_DIR/.env.backup

echo -e "${YELLOW}Step 3: Sync dev to production${NC}"

# .deployignore 파일에서 제외할 파일 읽기
EXCLUDE_ARGS="--exclude='node_modules' --exclude='.env' --exclude='*.log' --exclude='.server.pid'"

if [ -f "$PROJECT_DIR/.deployignore" ]; then
  echo -e "${YELLOW}   Loading .deployignore...${NC}"
  while IFS= read -r line || [ -n "$line" ]; do
    # 주석과 빈 줄 제외
    if [[ ! "$line" =~ ^# ]] && [[ -n "$line" ]]; then
      echo -e "   ${RED}   Excluding: $line${NC}"
      EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude='$line'"
    fi
  done < "$PROJECT_DIR/.deployignore"
fi

# rsync 실행
eval "rsync -av --delete $EXCLUDE_ARGS $DEV_DIR/ $PROD_DIR/"

echo -e "${YELLOW}Step 4: Restore production .env${NC}"
mv $PROD_DIR/.env.backup $PROD_DIR/.env

echo -e "${YELLOW}Step 5: Install dependencies${NC}"
cd $PROD_DIR
npm install --omit=dev

echo -e "${YELLOW}Step 6: Sync Database${NC}"
node sync-database.js

echo -e "${YELLOW}Step 7: Restart Server${NC}"
pm2 restart production-backend

echo -e "${GREEN}Deployment Complete!${NC}"
pm2 status production-backend
