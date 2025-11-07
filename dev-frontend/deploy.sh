#!/bin/bash
# Frontend 빌드 파일 배포 스크립트
# 이 스크립트는 frontend/build/의 파일을 httpdocs/frontend/에 배포합니다

set -e  # 에러 발생 시 중단

# 프로젝트 경로 설정
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="/var/www/vhosts/orderhere.wor-pro.com"
BUILD_DIR="$PROJECT_ROOT/frontend/build"
DEPLOY_DIR="$PROJECT_ROOT/httpdocs/frontend"

echo "🚀 Frontend 배포 시작..."

# 1. frontend 디렉토리 생성 (없으면)
mkdir -p "$DEPLOY_DIR"

# 2. 빌드 디렉토리 확인
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo "❌ 빌드 파일을 찾을 수 없습니다: $BUILD_DIR/index.html"
    echo "   먼저 'npm run build'를 실행하세요."
    exit 1
fi

# 3. 새 빌드 파일 배포 (frontend/로)
# 참고: 기존 파일은 자동으로 덮어쓰기됩니다.
# 백업이 필요하면 Git을 사용하세요.
echo "📤 httpdocs/frontend/에 배포 중..."
cp -r "$BUILD_DIR"/* "$DEPLOY_DIR/"

# 5. frontend/.htaccess 생성 (React Router 지원)
if [ ! -f "$DEPLOY_DIR/.htaccess" ]; then
    echo "📝 frontend/.htaccess 생성 중..."
    cat > "$DEPLOY_DIR/.htaccess" << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /frontend/

  # Don't rewrite files or directories that exist
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Don't rewrite API calls
  RewriteCond %{REQUEST_URI} !^/api

  # Rewrite everything else to index.html to allow React Router to work
  RewriteRule ^ index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
EOF
fi

# 6. 배포 확인
if [ -f "$DEPLOY_DIR/index.html" ] && [ -d "$DEPLOY_DIR/static" ]; then
    echo ""
    echo "✅ 배포 완료!"
    if [ -d "$DEPLOY_DIR/static/js" ]; then
        echo "📁 배포된 파일:"
        MAIN_JS=$(ls "$DEPLOY_DIR/static/js/main."*.js 2>/dev/null | head -1)
        if [ -n "$MAIN_JS" ]; then
            ls -lh "$MAIN_JS" | awk '{print "   " $9 " (" $5 ")"}'
        fi
    fi
    echo ""
    echo "📂 배포 위치: httpdocs/frontend/"
    echo "🌐 웹사이트: https://orderhere.wor-pro.com"
    echo "💡 브라우저에서 강력 새로고침 (Ctrl+Shift+R)을 사용하세요."
else
    echo "❌ 배포 실패: httpdocs/frontend/에 파일이 없습니다"
    exit 1
fi

