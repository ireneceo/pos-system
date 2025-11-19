const express = require('express');
const router = express.Router();

// 기본 루트 경로
router.get('/', (req, res) => {
  res.json({
    message: 'POS System API Server is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: '/api/auth',
      menu: '/api/menu',
      orders: '/api/orders',
      dashboard: '/api/dashboard',
      mobile: '/api/mobile',
      users: '/api/users',
      restaurants: '/api/restaurants',
      invoices: '/api/invoices',
      'support-tickets': '/api/support-tickets'
    }
  });
});

// API 정보 엔드포인트
router.get('/api', (req, res) => {
  res.json({
    message: 'POS System API',
    version: '1.0.0',
    documentation: 'https://pos.orderhere.center/api-docs'
  });
});

// 헬스체크 엔드포인트
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
