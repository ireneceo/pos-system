#!/bin/bash
# nginx uploads location 수정 스크립트
# 실행: sudo bash /var/www/fix-nginx-uploads.sh

echo "=== nginx uploads location 수정 ==="

# 백업
sudo cp /etc/nginx/sites-enabled/purplehere.com /etc/nginx/sites-enabled/purplehere.com.bak

# 수정: location /uploads → location /uploads/ 그리고 alias /var/www/uploads/
sudo sed -i 's|location /uploads {|location /uploads/ {|' /etc/nginx/sites-enabled/purplehere.com
sudo sed -i 's|alias /var/www/uploads;|alias /var/www/uploads/;|' /etc/nginx/sites-enabled/purplehere.com

# 설정 테스트
echo "=== nginx 설정 테스트 ==="
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "=== nginx 재시작 ==="
    sudo systemctl reload nginx
    echo "✅ 완료!"

    # 테스트
    echo ""
    echo "=== 이미지 접근 테스트 ==="
    curl -I https://purplehere.com/uploads/products/1769835261396_886148b44077be33.jpg 2>/dev/null | head -5
else
    echo "❌ 설정 오류! 롤백합니다."
    sudo cp /etc/nginx/sites-enabled/purplehere.com.bak /etc/nginx/sites-enabled/purplehere.com
fi
