#!/bin/bash
#
# Nginx에 /uploads location 블록 추가 스크립트
# 사용법: sudo bash /var/www/scripts/add-nginx-uploads.sh [dev|prod|all]
#
# 옵션:
#   dev  - 개발 서버만 (dev.purplehere.com)
#   prod - 운영 서버만 (purplehere.com)
#   all  - 둘 다 (기본값)
#

TARGET=${1:-all}

add_uploads_location() {
    local NGINX_CONF=$1
    local NAME=$2
    local SEARCH_PATTERN=$3

    echo ""
    echo "--- $NAME 처리 중 ---"

    # 파일 존재 확인
    if [ ! -f "$NGINX_CONF" ]; then
        echo "  설정 파일이 없습니다: $NGINX_CONF"
        return 1
    fi

    # 이미 설정되어 있는지 확인
    if grep -q "location /uploads" "$NGINX_CONF"; then
        echo "  /uploads location이 이미 설정되어 있습니다."
        return 0
    fi

    # 백업
    local BACKUP_FILE="${NGINX_CONF}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$NGINX_CONF" "$BACKUP_FILE"
    echo "  백업 완료: $BACKUP_FILE"

    # /uploads location 블록 추가
    sed -i "/${SEARCH_PATTERN}/i\\
    # Uploaded images (products, etc)\\
    location /uploads {\\
        alias /var/www/uploads;\\
        expires 1y;\\
        add_header Cache-Control \"public, immutable, max-age=31536000\";\\
        access_log off;\\
        try_files \$uri =404;\\
    }\\
" "$NGINX_CONF"

    echo "  설정 추가 완료"
    return 0
}

echo "=== Nginx /uploads 설정 추가 ==="

case $TARGET in
    dev)
        add_uploads_location "/etc/nginx/sites-available/dev.purplehere.com" "개발 서버" "# Backend API - no caching"
        ;;
    prod)
        add_uploads_location "/etc/nginx/sites-available/purplehere.com" "운영 서버" "# Backend API"
        ;;
    all)
        add_uploads_location "/etc/nginx/sites-available/dev.purplehere.com" "개발 서버" "# Backend API - no caching"
        add_uploads_location "/etc/nginx/sites-available/purplehere.com" "운영 서버" "# Backend API"
        ;;
    *)
        echo "사용법: $0 [dev|prod|all]"
        exit 1
        ;;
esac

# 설정 검증
echo ""
echo "=== Nginx 설정 검증 ==="
nginx -t
if [ $? -ne 0 ]; then
    echo "설정 오류! 백업 파일에서 복원하세요."
    exit 1
fi

# Nginx 재시작
echo ""
echo "=== Nginx 재시작 ==="
systemctl reload nginx

echo ""
echo "=== 완료 ==="
echo ""
echo "테스트 명령어:"
echo "  curl -I https://dev.purplehere.com/uploads/products/test.jpg"
echo "  curl -I https://purplehere.com/uploads/products/test.jpg"
