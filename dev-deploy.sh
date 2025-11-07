#!/bin/bash
# 안정적인 개발 배포 스크립트
# 사용법: /var/www/dev-deploy.sh [frontend|backend|all]

set -e  # 에러 발생 시 중단

MODE=${1:-all}
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "================================================"
echo "🚀 Development Deployment Script"
echo "================================================"
echo "Mode: $MODE"
echo "Time: $TIMESTAMP"
echo ""

# Frontend 배포
deploy_frontend() {
    echo "📦 [1/3] Frontend Deployment..."
    cd /var/www/dev-frontend

    # Clean cache
    echo "  - Cleaning build cache..."
    rm -rf build node_modules/.cache

    # Build
    echo "  - Building frontend..."
    GENERATE_SOURCEMAP=false npm run build

    echo "  ✅ Frontend deployed"
    echo ""
}

# Backend 배포
deploy_backend() {
    echo "🔧 [2/3] Backend Deployment..."
    cd /var/www/dev-backend

    # Restart PM2
    echo "  - Restarting backend..."
    pm2 restart pos-dev-backend --update-env

    # Wait for startup
    sleep 3

    # Health check
    if curl -sf http://localhost:3001/api/health > /dev/null; then
        echo "  ✅ Backend deployed and healthy"
    else
        echo "  ❌ Backend health check failed!"
        pm2 logs pos-dev-backend --lines 20 --nostream
        exit 1
    fi
    echo ""
}

# Nginx 재시작
reload_nginx() {
    echo "🌐 [3/3] Nginx Reload..."

    # Clear nginx cache
    echo "  - Clearing nginx cache..."
    rm -rf /var/cache/nginx/* 2>/dev/null || true

    # Test config
    echo "  - Testing nginx config..."
    nginx -t

    # Reload
    echo "  - Reloading nginx..."
    systemctl reload nginx

    echo "  ✅ Nginx reloaded"
    echo ""
}

# Execute based on mode
case $MODE in
    frontend)
        deploy_frontend
        reload_nginx
        ;;
    backend)
        deploy_backend
        ;;
    all)
        deploy_frontend
        deploy_backend
        reload_nginx
        ;;
    *)
        echo "❌ Invalid mode: $MODE"
        echo "Usage: $0 [frontend|backend|all]"
        exit 1
        ;;
esac

# Final status
echo "================================================"
echo "✅ Deployment Complete!"
echo "================================================"
echo ""
echo "📊 System Status:"
pm2 status
echo ""
echo "🏥 Backend Health:"
curl -s http://localhost:3001/api/health | jq .
echo ""
echo "📝 Latest Build:"
ls -lh /var/www/dev-frontend/build/static/js/main.*.js 2>/dev/null || echo "No build found"
echo ""
echo "================================================"
echo "⚠️  User Action Required:"
echo "================================================"
echo "1. Open browser DevTools (F12)"
echo "2. Console tab, run: localStorage.clear()"
echo "3. Refresh page (F5)"
echo "4. Login again"
echo "================================================"
