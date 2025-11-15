#!/bin/bash
# 개발서버 → 운영서버 단방향 배포 스크립트
# 절대 반대 방향으로 실행 불가

set -e  # 에러 발생 시 즉시 중단

SOURCE_FRONTEND="/var/www/dev-frontend/build"
SOURCE_BACKEND="/var/www/dev-backend"
TARGET_FRONTEND="/var/www/production-frontend/build"
TARGET_BACKEND="/var/www/production-backend"

echo "=========================================="
echo "🚀 운영 서버 배포 스크립트"
echo "=========================================="
echo ""
echo "⚠️  경고: 이 스크립트는 개발 → 운영 단방향만 가능합니다"
echo ""
echo "배포 방향:"
echo "  FROM: /var/www/dev-frontend → TO: /var/www/production-frontend"
echo "  FROM: /var/www/dev-backend  → TO: /var/www/production-backend"
echo ""

# 안전 확인: 소스 디렉토리가 개발 서버인지 확인
if [[ ! "$SOURCE_FRONTEND" == *"dev-frontend"* ]]; then
    echo "❌ 에러: 소스가 개발 서버가 아닙니다!"
    echo "   이 스크립트는 dev → production 방향만 허용됩니다."
    exit 1
fi

if [[ ! "$SOURCE_BACKEND" == *"dev-backend"* ]]; then
    echo "❌ 에러: 소스가 개발 서버가 아닙니다!"
    echo "   이 스크립트는 dev → production 방향만 허용됩니다."
    exit 1
fi

# 안전 확인: 타겟 디렉토리가 운영 서버인지 확인
if [[ ! "$TARGET_FRONTEND" == *"production-frontend"* ]]; then
    echo "❌ 에러: 타겟이 운영 서버가 아닙니다!"
    exit 1
fi

if [[ ! "$TARGET_BACKEND" == *"production-backend"* ]]; then
    echo "❌ 에러: 타겟이 운영 서버가 아닙니다!"
    exit 1
fi

# 개발 빌드 파일 존재 확인
if [ ! -d "$SOURCE_FRONTEND" ]; then
    echo "❌ 에러: 개발 프론트엔드 빌드가 없습니다."
    echo "   먼저 'cd /var/www/dev-frontend && npm run build'를 실행하세요."
    exit 1
fi

if [ ! -d "$SOURCE_BACKEND" ]; then
    echo "❌ 에러: 개발 백엔드 디렉토리가 없습니다."
    exit 1
fi

echo "✅ 소스 확인 완료"
echo ""

# 사용자 확인
read -p "운영 서버에 배포하시겠습니까? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ 배포 취소됨"
    exit 0
fi

echo ""
echo "📦 배포 시작..."
echo ""

# 1. 프론트엔드 백업 및 배포
BACKUP_DIR="/var/www/production-frontend/build.backup.$(date +%Y%m%d_%H%M%S)"
echo "1️⃣  프론트엔드 백업 생성: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
if [ -d "$TARGET_FRONTEND" ] && [ "$(ls -A $TARGET_FRONTEND)" ]; then
    cp -r "$TARGET_FRONTEND"/* "$BACKUP_DIR/" 2>/dev/null || true
fi

echo "2️⃣  프론트엔드 배포 중..."
rm -rf "$TARGET_FRONTEND"/*
cp -r "$SOURCE_FRONTEND"/* "$TARGET_FRONTEND/"
echo "   ✅ 프론트엔드 배포 완료"
echo ""

# 2. 백엔드 주요 파일 복사
echo "3️⃣  백엔드 주요 파일 배포 중..."

# routes 디렉토리
if [ -d "$SOURCE_BACKEND/routes" ]; then
    echo "   - routes/ 복사 중..."
    cp -r "$SOURCE_BACKEND/routes"/* "$TARGET_BACKEND/routes/"
fi

# models 디렉토리
if [ -d "$SOURCE_BACKEND/models" ]; then
    echo "   - models/ 복사 중..."
    cp -r "$SOURCE_BACKEND/models"/* "$TARGET_BACKEND/models/"
fi

# utils 디렉토리
if [ -d "$SOURCE_BACKEND/utils" ]; then
    echo "   - utils/ 복사 중..."
    cp -r "$SOURCE_BACKEND/utils"/* "$TARGET_BACKEND/utils/" 2>/dev/null || true
fi

# middleware 디렉토리
if [ -d "$SOURCE_BACKEND/middleware" ]; then
    echo "   - middleware/ 복사 중..."
    cp -r "$SOURCE_BACKEND/middleware"/* "$TARGET_BACKEND/middleware/" 2>/dev/null || true
fi

echo "   ✅ 백엔드 배포 완료"
echo ""

# 3. PM2 재시작
echo "4️⃣  운영 백엔드 재시작 중..."
pm2 restart production-backend
echo "   ✅ 백엔드 재시작 완료"
echo ""

# 4. 배포 완료
echo "=========================================="
echo "✅ 배포 완료!"
echo "=========================================="
echo ""
echo "📋 배포 내역:"
echo "  - 프론트엔드: $SOURCE_FRONTEND → $TARGET_FRONTEND"
echo "  - 백엔드: $SOURCE_BACKEND → $TARGET_BACKEND"
echo "  - 백업: $BACKUP_DIR"
echo ""
echo "🔍 확인 사항:"
echo "  1. 브라우저에서 Ctrl+Shift+R로 강력 새로고침"
echo "  2. pm2 logs production-backend 로 에러 확인"
echo ""
