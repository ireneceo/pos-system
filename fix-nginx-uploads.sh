#!/bin/bash
# nginx uploads location 수정 - 백엔드 프록시 방식으로 변경
# 실행: sudo bash /var/www/fix-nginx-uploads.sh

echo "=== nginx uploads location 수정 (proxy_pass 방식) ==="

# 현재 잘못된 설정을 백엔드 프록시 방식으로 교체
sudo sed -i '/location \/uploads/,/try_files \$uri =404;/c\
    # Uploaded images - proxy to backend\
    location ^~ /uploads {\
        proxy_pass http://localhost:3002;\
        proxy_http_version 1.1;\
        proxy_set_header Host $host;\
        proxy_cache_bypass $http_upgrade;\
        expires 1y;\
        add_header Cache-Control "public, immutable, max-age=31536000";\
    }' /etc/nginx/sites-enabled/purplehere.com

# 설정 테스트
echo "=== nginx 설정 테스트 ==="
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "=== nginx 재시작 ==="
    sudo systemctl reload nginx
    echo "✅ 완료!"
    echo ""
    echo "=== 이미지 접근 테스트 ==="
    sleep 1
    curl -I https://purplehere.com/uploads/products/1769835261396_886148b44077be33.jpg 2>/dev/null | head -5
else
    echo "❌ 설정 오류!"
fi
