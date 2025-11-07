#!/bin/bash
# Dev 환경 통합 배포 스크립트
# Frontend + Backend 전체 재배포

set -e  # 에러 발생 시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 경로 설정
FRONTEND_DIR="/var/www/dev-frontend"
BACKEND_DIR="/var/www/dev-backend"

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}  Dev 환경 통합 배포${NC}"
echo -e "${CYAN}================================${NC}\n"

# 1. Backend 재시작
echo -e "${BLUE}🔄 Backend 재시작 중...${NC}"
cd "$BACKEND_DIR"

# Backend 상태 확인
if pm2 describe pos-dev-backend > /dev/null 2>&1; then
    echo -e "${YELLOW}   기존 프로세스 재시작...${NC}"
    pm2 restart ecosystem.config.js
else
    echo -e "${YELLOW}   새 프로세스 시작...${NC}"
    pm2 start ecosystem.config.js
fi

# Backend 상태 확인
sleep 2
if pm2 describe pos-dev-backend | grep -q "online"; then
    echo -e "${GREEN}   ✅ Backend 실행 중${NC}"
else
    echo -e "${RED}   ❌ Backend 시작 실패${NC}"
    pm2 logs pos-dev-backend --lines 20 --nostream
    exit 1
fi

# 2. Frontend 빌드 및 배포
echo -e "\n${BLUE}📦 Frontend 빌드 및 배포 중...${NC}"
cd "$FRONTEND_DIR"

# TypeScript 에러를 경고로 처리
export TSC_COMPILE_ON_ERROR=true

# 빌드 실행
npm run build 2>&1 | grep -v "deploy.sh" || true

# 빌드 확인
if [ ! -f "$FRONTEND_DIR/build/index.html" ]; then
    echo -e "${RED}   ❌ Frontend 빌드 실패${NC}"
    exit 1
fi

echo -e "${GREEN}   ✅ Frontend 빌드 완료${NC}"

# 파일 권한 설정
chmod -R 755 "$FRONTEND_DIR/build"
find "$FRONTEND_DIR/build" -type f -exec chmod 644 {} \;

# 3. Nginx 설정 테스트 및 재시작
echo -e "\n${BLUE}🔧 Nginx 설정 확인 중...${NC}"
if nginx -t > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Nginx 설정 정상${NC}"
    echo -e "${YELLOW}   Nginx 재시작 중...${NC}"
    systemctl reload nginx
    echo -e "${GREEN}   ✅ Nginx 재시작 완료${NC}"
else
    echo -e "${RED}   ❌ Nginx 설정 오류${NC}"
    nginx -t
    exit 1
fi

# 4. 배포 완료 정보
echo -e "\n${CYAN}================================${NC}"
echo -e "${GREEN}✅ 배포 완료!${NC}"
echo -e "${CYAN}================================${NC}\n"

echo -e "${BLUE}📊 서비스 상태:${NC}"
pm2 status

echo -e "\n${BLUE}🌐 접속 정보:${NC}"
echo -e "   Frontend: ${CYAN}https://dev.purplehere.com${NC}"
echo -e "   Backend:  ${CYAN}http://localhost:3001${NC}"
echo -e "   Health:   ${CYAN}http://localhost:3001/api/health${NC}"

echo -e "\n${YELLOW}💡 유용한 명령어:${NC}"
echo -e "   Frontend 재배포:  ${CYAN}cd /var/www/dev-frontend && npm run build:dev${NC}"
echo -e "   Backend 재시작:   ${CYAN}pm2 restart pos-dev-backend${NC}"
echo -e "   로그 확인:        ${CYAN}pm2 logs pos-dev-backend${NC}"
echo -e "   전체 재배포:      ${CYAN}/var/www/deploy-dev.sh${NC}"

echo -e "\n${YELLOW}🔍 문제 해결:${NC}"
echo -e "   Nginx 에러:       ${CYAN}tail -f /var/log/nginx/error.log${NC}"
echo -e "   Backend 에러:     ${CYAN}pm2 logs pos-dev-backend --err${NC}"
echo -e "   프로세스 상태:    ${CYAN}pm2 status${NC}"
