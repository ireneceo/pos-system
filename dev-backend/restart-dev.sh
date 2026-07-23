#!/bin/bash
# Dev Backend 안전 재시작 스크립트
# 포트 충돌 문제를 방지하기 위해 항상 이 스크립트를 사용
#
# 2026-07-23: sudo 불필요. 포트 3001 = pm2(irene 유저 데몬)가 띄운 dev-backend node =
#   irene 소유 프로세스라 자기 소켓 lsof·자기 프로세스 kill 은 무권한으로 된다.
#   (설계 착오였던 sudo -n lsof/kill 제거 — 근거 = Fable 게이트.)

PORT=3001

echo "=== Dev Backend 재시작 ==="

# 1. PM2에서 dev-backend 중지/삭제
echo "1. PM2 프로세스 정리..."
pm2 delete dev-backend 2>/dev/null || true
sleep 1

# 2. 포트 3001 사용 프로세스 강제 종료 (irene 소유 프로세스 → sudo 불필요)
echo "2. 포트 $PORT 정리..."
PIDS=$(lsof -t -i:$PORT 2>/dev/null)
if [ -n "$PIDS" ]; then
    echo "   종료할 PID: $PIDS"
    kill -9 $PIDS 2>/dev/null || true
fi
sleep 1

# 3. 포트 확인
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "ERROR: 포트 $PORT가 여전히 사용 중입니다!"
    lsof -i :$PORT
    echo "   (타 유저 프로세스가 점유한 비정상 상황이면: sudo kill -9 <PID> — 비밀번호 필요)"
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
