#!/bin/bash
echo "========================================="
echo "Starting All Servers with PM2"
echo "========================================="
cd /var/www
pm2 start ecosystem.config.js
pm2 status
echo ""
echo "Development: http://localhost:3001"
echo "Production:  http://localhost:3002"
