#!/bin/bash
# 운영서버 안전 배포 스크립트
# 사용법: ./deploy-to-production.sh

set -e  # 에러 발생시 즉시 중단

echo "🚀 =========================================="
echo "🚀 운영서버 배포 시작"
echo "🚀 =========================================="
echo ""

# 현재 시간
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/www/backups/${TIMESTAMP}"

# 1. 백업 디렉토리 생성
echo "📦 1. 백업 디렉토리 생성..."
mkdir -p "${BACKUP_DIR}"

# 2. 운영 백엔드 백업
echo "📦 2. 운영 백엔드 백업 중..."
if [ -d "/var/www/production-backend" ]; then
    cp -r /var/www/production-backend "${BACKUP_DIR}/production-backend.backup"
    echo "   ✅ 백엔드 백업 완료: ${BACKUP_DIR}/production-backend.backup"
else
    echo "   ⚠️  production-backend 디렉토리가 없습니다."
fi

# 3. 운영 프론트엔드 백업
echo "📦 3. 운영 프론트엔드 빌드 백업 중..."
if [ -d "/var/www/production-frontend/build" ]; then
    cp -r /var/www/production-frontend/build "${BACKUP_DIR}/production-frontend-build.backup"
    echo "   ✅ 프론트엔드 빌드 백업 완료: ${BACKUP_DIR}/production-frontend-build.backup"
else
    echo "   ⚠️  production-frontend/build 디렉토리가 없습니다."
fi

echo ""
echo "🔄 =========================================="
echo "🔄 백엔드 배포"
echo "🔄 =========================================="

# 4. 개발 백엔드에서 운영 백엔드로 동기화
echo "🔄 4. 백엔드 파일 동기화 중..."
rsync -av --exclude 'node_modules' \
          --exclude '.env' \
          --exclude 'logs' \
          --exclude '.git' \
          /var/www/dev-backend/ /var/www/production-backend/
echo "   ✅ 백엔드 파일 동기화 완료"

# 5. 운영 백엔드 의존성 설치
echo "📦 5. 운영 백엔드 의존성 확인..."
cd /var/www/production-backend
if [ -f "package.json" ]; then
    npm install --production
    echo "   ✅ 의존성 설치 완료"
fi

# 6. PM2로 운영 백엔드 재시작
echo "🔄 6. 운영 백엔드 재시작 중..."
pm2 restart production-backend
sleep 3
echo "   ✅ 백엔드 재시작 완료"

echo ""
echo "🎨 =========================================="
echo "🎨 프론트엔드 배포"
echo "🎨 =========================================="

# 7. 개발 프론트엔드 빌드
echo "🎨 7. 개발 프론트엔드 빌드 중..."
cd /var/www/dev-frontend

# 캐시 클리어
rm -rf node_modules/.cache build

# 빌드 실행
echo "   빌드 시작..."
npm run build

if [ ! -d "build" ]; then
    echo "   ❌ 빌드 실패! build 디렉토리가 생성되지 않았습니다."
    exit 1
fi
echo "   ✅ 프론트엔드 빌드 완료"

# 8. 빌드 파일을 운영 프론트엔드로 복사
echo "🎨 8. 빌드 파일을 운영 디렉토리로 복사 중..."
rm -rf /var/www/production-frontend/build
cp -r /var/www/dev-frontend/build /var/www/production-frontend/
echo "   ✅ 빌드 파일 복사 완료"

# 9. Nginx 캐시 클리어 및 재시작
echo "🌐 9. Nginx 캐시 클리어 및 재시작..."
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/*
fi
systemctl reload nginx
echo "   ✅ Nginx 재시작 완료"

echo ""
echo "✅ =========================================="
echo "✅ 배포 완료!"
echo "✅ =========================================="
echo ""
echo "📊 배포 정보:"
echo "   - 타임스탬프: ${TIMESTAMP}"
echo "   - 백업 위치: ${BACKUP_DIR}"
echo ""
echo "🔍 상태 확인:"
pm2 list | grep production
echo ""
systemctl status nginx --no-pager -l | head -10
echo ""
echo "📝 배포 후 확인 사항:"
echo "   1. https://purplehere.com 접속 확인"
echo "   2. 브라우저에서 Ctrl+Shift+R (강력 새로고침)"
echo "   3. POS Terminal에서 테이크아웃 주문 테스트"
echo "   4. 영수증에 Takeaway Charge 표시 확인"
echo ""
echo "🔙 롤백이 필요한 경우:"
echo "   ./rollback-production.sh ${TIMESTAMP}"
echo ""
