#!/bin/bash
# Dev 환경 모니터링 스크립트

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}  Dev 환경 상태 모니터링${NC}"
echo -e "${CYAN}================================${NC}\n"

# 1. PM2 프로세스 상태
echo -e "${BLUE}📊 Backend 상태:${NC}"
pm2 status

# 2. 메모리 사용량
echo -e "\n${BLUE}💾 메모리 사용량:${NC}"
free -h

# 3. 디스크 사용량
echo -e "\n${BLUE}💿 디스크 사용량:${NC}"
df -h /var/www

# 4. Nginx 상태
echo -e "\n${BLUE}🌐 Nginx 상태:${NC}"
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}   ✅ Nginx 실행 중${NC}"
else
    echo -e "${RED}   ❌ Nginx 중지됨${NC}"
fi

# 5. Backend Health Check
echo -e "\n${BLUE}🏥 Backend Health Check:${NC}"
HEALTH_CHECK=$(curl -s http://localhost:3001/api/health 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Backend 정상${NC}"
    echo "$HEALTH_CHECK" | jq .
else
    echo -e "${RED}   ❌ Backend 응답 없음${NC}"
fi

# 6. 최근 에러 로그
echo -e "\n${BLUE}🔍 최근 에러 (Backend):${NC}"
tail -n 5 /var/www/dev-backend/logs/err.log 2>/dev/null || echo "   에러 없음"

echo -e "\n${BLUE}🔍 최근 에러 (Nginx):${NC}"
tail -n 5 /var/log/nginx/error.log | grep -v "client" | tail -n 3 || echo "   에러 없음"

# 7. 빌드 파일 상태
echo -e "\n${BLUE}📦 Frontend 빌드:${NC}"
if [ -f /var/www/dev-frontend/build/index.html ]; then
    BUILD_TIME=$(stat -c %y /var/www/dev-frontend/build/index.html | cut -d' ' -f1-2 | cut -d'.' -f1)
    echo -e "${GREEN}   ✅ 빌드 존재 (마지막 빌드: $BUILD_TIME)${NC}"
else
    echo -e "${RED}   ❌ 빌드 파일 없음${NC}"
fi

# 8. 포트 확인
echo -e "\n${BLUE}🔌 포트 상태:${NC}"
if ss -tlnp 2>/dev/null | grep -q ":3001" || lsof -i :3001 >/dev/null 2>&1 || curl -s http://localhost:3001/api/health >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Backend (3001) 실행 중${NC}"
else
    echo -e "${RED}   ❌ Backend (3001) 중지됨${NC}"
fi

if ss -tlnp 2>/dev/null | grep -q ":443" || lsof -i :443 >/dev/null 2>&1; then
    echo -e "${GREEN}   ✅ HTTPS (443) 실행 중${NC}"
else
    echo -e "${RED}   ❌ HTTPS (443) 중지됨${NC}"
fi

echo -e "\n${CYAN}================================${NC}"
echo -e "${YELLOW}💡 유용한 명령어:${NC}"
echo -e "   로그 실시간 보기:   ${CYAN}pm2 logs pos-dev-backend${NC}"
echo -e "   Backend 재시작:     ${CYAN}pm2 restart pos-dev-backend${NC}"
echo -e "   전체 재배포:        ${CYAN}/var/www/deploy-dev.sh${NC}"
echo -e "   모니터링 새로고침:  ${CYAN}watch -n 5 /var/www/monitor-dev.sh${NC}"
echo -e "${CYAN}================================${NC}\n"
