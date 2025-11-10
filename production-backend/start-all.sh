#!/bin/bash

echo "========================================="
echo "Starting All Servers with PM2"
echo "========================================="

cd /var/www

# PM2로 모든 앱 시작
pm2 start ecosystem.config.js

# 상태 확인
pm2 status

echo ""
echo "========================================="
echo "Servers Started!"
echo "========================================="
echo "Development: http://localhost:3001"
echo "Production:  http://localhost:3002"
echo ""
echo "Commands:"
echo "  pm2 logs dev-backend        # 개발 서버 로그"
echo "  pm2 logs production-backend # 운영 서버 로그"
echo "  pm2 restart dev-backend     # 개발 서버 재시작"
echo "  pm2 restart production-backend # 운영 서버 재시작"
echo "  pm2 stop all                # 모든 서버 중지"
echo "========================================="
