#!/bin/bash

echo "========================================="
echo "SSL 인증서 설치 (Let's Encrypt)"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}도메인: purplehere.com, www.purplehere.com${NC}"
echo ""
echo "이 스크립트는 다음을 수행합니다:"
echo "1. Let's Encrypt 무료 SSL 인증서 발급"
echo "2. Nginx 설정 자동 업데이트"
echo "3. HTTP → HTTPS 자동 리다이렉트 설정"
echo "4. 인증서 자동 갱신 설정"
echo ""

read -p "계속 진행하시겠습니까? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "취소됨"
  exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: 이메일 주소 입력${NC}"
echo "인증서 만료 알림을 받을 이메일 주소를 입력하세요:"
read -p "이메일: " EMAIL

if [ -z "$EMAIL" ]; then
  echo -e "${RED}이메일을 입력해야 합니다${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: SSL 인증서 발급 중...${NC}"
echo "도메인: purplehere.com, www.purplehere.com"

# Certbot 실행
certbot --nginx \
  -d purplehere.com \
  -d www.purplehere.com \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --redirect

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}=========================================${NC}"
  echo -e "${GREEN}SSL 인증서 설치 완료!${NC}"
  echo -e "${GREEN}=========================================${NC}"
  echo ""
  echo "✅ HTTPS 활성화됨"
  echo "✅ HTTP → HTTPS 자동 리다이렉트 설정됨"
  echo "✅ 인증서 자동 갱신 설정됨"
  echo ""
  echo "테스트:"
  echo "  http://purplehere.com → https://purplehere.com"
  echo "  http://www.purplehere.com → https://www.purplehere.com"
  echo ""
  echo "인증서 정보:"
  certbot certificates -d purplehere.com
else
  echo ""
  echo -e "${RED}SSL 인증서 설치 실패${NC}"
  echo ""
  echo "문제 해결:"
  echo "1. 도메인이 이 서버를 가리키는지 확인"
  echo "   dig purplehere.com"
  echo "   dig www.purplehere.com"
  echo ""
  echo "2. 방화벽에서 80, 443 포트 열려있는지 확인"
  echo "   sudo ufw status"
  echo ""
  echo "3. Nginx가 실행 중인지 확인"
  echo "   sudo systemctl status nginx"
  exit 1
fi
