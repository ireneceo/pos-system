#!/bin/bash

echo "========================================="
echo "Remote Server Deployment"
echo "원격 운영 서버로 배포"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 설정
REMOTE_USER="root"  # 원격 서버 사용자
REMOTE_HOST=""      # 원격 서버 IP (설정 필요)
REMOTE_DIR="/var/www/production-backend"
LOCAL_DIR="/var/www/dev-backend"

# 원격 서버 설정 확인
if [ -z "$REMOTE_HOST" ]; then
  echo -e "${RED}Error: 원격 서버 IP를 설정해주세요${NC}"
  echo "이 스크립트를 편집해서 REMOTE_HOST를 설정하세요:"
  echo "  nano deploy-to-remote-server.sh"
  echo "  REMOTE_HOST=\"운영서버IP주소\""
  exit 1
fi

echo -e "${YELLOW}원격 서버: ${REMOTE_USER}@${REMOTE_HOST}${NC}"
echo ""

read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "배포 취소됨"
  exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: Git 커밋 확인${NC}"
cd /var/www
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}Warning: 커밋되지 않은 변경사항이 있습니다${NC}"
  git status -s
  read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo ""
echo -e "${YELLOW}Step 2: Git Push${NC}"
git push origin main

echo ""
echo -e "${YELLOW}Step 3: 원격 서버에 배포${NC}"
ssh ${REMOTE_USER}@${REMOTE_HOST} << 'ENDSSH'
  cd /var/www/production-backend
  
  echo "Git Pull..."
  git pull origin main
  
  echo "Installing dependencies..."
  npm install --omit=dev
  
  echo "Syncing database..."
  node sync-database.js
  
  echo "Restarting server..."
  pm2 restart production-backend
  
  echo "Checking status..."
  pm2 status production-backend
ENDSSH

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}=========================================${NC}"
  echo -e "${GREEN}Remote Deployment Complete!${NC}"
  echo -e "${GREEN}=========================================${NC}"
  echo ""
  echo "확인:"
  echo "  ssh ${REMOTE_USER}@${REMOTE_HOST}"
  echo "  pm2 logs production-backend"
else
  echo ""
  echo -e "${RED}Deployment Failed!${NC}"
  exit 1
fi
