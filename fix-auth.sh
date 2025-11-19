111111111111111개발시#!/bin/bash
# 인증 문제 완전 해결 스크립트

echo "🔧 Starting authentication fix..."

# 1. 프론트엔드 완전 클린 빌드
echo "📦 Frontend: Clean build..."
cd /var/www/dev-frontend
rm -rf build node_modules/.cache
npm run build

# 2. 백엔드 재시작
echo "🔄 Backend: Restart..."
cd /var/www/dev-backend
pm2 restart pos-dev-backend

# 3. Nginx 캐시 클리어 및 재시작
echo "🌐 Nginx: Clear cache and restart..."
rm -rf /var/cache/nginx/*
systemctl reload nginx

# 4. 상태 확인
echo ""
echo "✅ Status Check:"
pm2 status
echo ""
curl -s http://localhost:3001/api/health | jq .

echo ""
echo "🎉 Fix completed!"
echo ""
echo "📋 User Action Required:"
echo "1. Open browser DevTools (F12)"
echo "2. Run: localStorage.clear()"
echo "3. Refresh page (F5)"
echo "4. Login again"
