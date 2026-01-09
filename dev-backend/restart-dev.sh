#!/bin/bash
# Dev Backend 안전 재시작 스크립트
# 포트 충돌 문제를 방지하기 위해 항상 이 스크립트를 사용
#
# 필요한 sudoers 설정:
#   irene ALL=(ALL) NOPASSWD: /usr/bin/kill, /usr/sbin/lsof

PORT=3001

echo "=== Dev Backend 재시작 ==="

# 1. PM2에서 dev-backend 중지/삭제
echo "1. PM2 프로세스 정리..."
pm2 delete dev-backend 2>/dev/null || true
sleep 1

# 2. 포트 3001 사용 프로세스 강제 종료
echo "2. 포트 $PORT 정리..."
# sudoers 설정으로 비밀번호 없이 실행 (sudo -n)
PIDS=$(sudo -n lsof -t -i:$PORT 2>/dev/null)
if [ -n "$PIDS" ]; then
    echo "   종료할 PID: $PIDS"
    sudo -n kill -9 $PIDS 2>/dev/null || true
fi
sleep 1

# 3. 포트 확인
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "ERROR: 포트 $PORT가 여전히 사용 중입니다!"
    lsof -i :$PORT
    exit 1
fi

echo "3. 포트 $PORT 사용 가능"

# 4. dev-backend 시작
echo "4. dev-backend 시작..."
cd /var/www/dev-backend
pm2 start ecosystem.config.js --only dev-backend

# 5. 상태 확인
sleep 3
echo ""
echo "=== 최종 상태 ==="
pm2 list | grep -E "(dev-backend|name)"

# 6. 헬스 체크
echo ""
echo "=== 헬스 체크 ==="
curl -s http://localhost:$PORT/api/health | head -c 200
echo ""
