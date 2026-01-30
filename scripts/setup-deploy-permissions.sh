#!/bin/bash
#
# 배포를 위한 sudoers 설정 스크립트
# 실행: sudo bash /var/www/scripts/setup-deploy-permissions.sh
#
# 이 스크립트는 한 번만 실행하면 됩니다.
# irene 사용자가 nginx reload만 비밀번호 없이 실행할 수 있게 합니다.
#

set -e

SUDOERS_FILE="/etc/sudoers.d/deploy-permissions"

echo "=== 배포 권한 설정 ==="
echo ""

# 이미 설정되어 있는지 확인
if [ -f "$SUDOERS_FILE" ]; then
    echo "이미 설정되어 있습니다: $SUDOERS_FILE"
    cat "$SUDOERS_FILE"
    exit 0
fi

# sudoers 파일 생성
cat > "$SUDOERS_FILE" << 'EOF'
# 배포용 권한 설정
# irene 사용자가 비밀번호 없이 실행할 수 있는 명령

# nginx 관련 (배포 시 필요)
irene ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx
irene ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx
irene ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t

# 캐시 정리 (선택)
irene ALL=(ALL) NOPASSWD: /bin/rm -rf /var/cache/nginx/*
EOF

# 권한 설정 (sudoers 파일은 440이어야 함)
chmod 440 "$SUDOERS_FILE"

# 문법 검증
if visudo -c -f "$SUDOERS_FILE" > /dev/null 2>&1; then
    echo "설정 완료!"
    echo ""
    cat "$SUDOERS_FILE"
    echo ""
    echo "이제 다음 명령을 비밀번호 없이 실행할 수 있습니다:"
    echo "  sudo systemctl reload nginx"
    echo "  sudo systemctl restart nginx"
    echo "  sudo nginx -t"
else
    echo "ERROR: sudoers 문법 오류!"
    rm -f "$SUDOERS_FILE"
    exit 1
fi
