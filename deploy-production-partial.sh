#!/bin/bash

echo "========================================="
echo "Partial Production Deployment"
echo "특정 파일/폴더만 배포하기"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PROJECT_DIR="/var/www"
PROD_DIR="$PROJECT_DIR/production-backend"
DEV_DIR="$PROJECT_DIR/dev-backend"

# 사용법 확인
if [ $# -eq 0 ]; then
  echo -e "${RED}사용법: $0 <파일경로1> [파일경로2] ...${NC}"
  echo ""
  echo "예시:"
  echo "  $0 routes/invoices.js"
  echo "  $0 models/User.js controllers/authController.js"
  echo "  $0 routes/"
  echo ""
  exit 1
fi

echo -e "${YELLOW}배포할 파일/폴더:${NC}"
for item in "$@"; do
  echo "  - $item"
done
echo ""

read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "배포 취소됨"
  exit 1
fi

echo -e "${YELLOW}Step 1: 파일 복사 중...${NC}"
for item in "$@"; do
  SOURCE="$DEV_DIR/$item"
  DEST="$PROD_DIR/$item"
  
  if [ -e "$SOURCE" ]; then
    # 디렉토리인 경우
    if [ -d "$SOURCE" ]; then
      echo -e "  ${GREEN}✓${NC} 디렉토리 복사: $item"
      rsync -av --exclude='node_modules' --exclude='.env' "$SOURCE" "$(dirname "$DEST")/"
    else
      # 파일인 경우
      echo -e "  ${GREEN}✓${NC} 파일 복사: $item"
      mkdir -p "$(dirname "$DEST")"
      cp -v "$SOURCE" "$DEST"
    fi
  else
    echo -e "  ${RED}✗${NC} 파일이 존재하지 않음: $item"
  fi
done

echo ""
echo -e "${YELLOW}Step 2: 운영 서버 재시작${NC}"
pm2 restart production-backend

echo ""
echo -e "${GREEN}부분 배포 완료!${NC}"
pm2 logs production-backend --lines 20
