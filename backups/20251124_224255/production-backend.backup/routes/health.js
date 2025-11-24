/**
 * 헬스 체크 엔드포인트
 * 서버 및 DB 연결 상태 확인
 */

const express = require('express');
const router = express.Router();
const { checkConnection, isConnected } = require('../config/database');
const { sequelize } = require('../config/database');

// 헬스 체크 엔드포인트
router.get('/', async (req, res) => {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      connected: false,
      status: 'unknown'
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };

  try {
    // DB 연결 상태 확인
    const dbConnected = await checkConnection();
    healthStatus.database.connected = dbConnected;
    healthStatus.database.status = dbConnected ? 'connected' : 'disconnected';

    // Connection Pool 상태 (가능한 경우)
    try {
      if (sequelize && sequelize.connectionManager && sequelize.connectionManager.pool) {
        const pool = sequelize.connectionManager.pool;
        healthStatus.database.pool = {
          size: pool.size || 0,
          available: pool.available || 0,
          using: pool.using ? pool.using.length : 0,
          waiting: pool.waiting ? pool.waiting.length : 0
        };
      }
    } catch (e) {
      // Pool 정보 접근 실패는 무시
      healthStatus.database.pool = { error: 'Unable to access pool info' };
    }

    // DB 연결이 끊어져 있으면 서비스 불가 상태
    if (!dbConnected) {
      healthStatus.status = 'degraded';
      return res.status(503).json(healthStatus);
    }

    res.json(healthStatus);
  } catch (error) {
    healthStatus.status = 'error';
    healthStatus.database.status = 'error';
    healthStatus.error = error.message;
    res.status(503).json(healthStatus);
  }
});

// 상세 헬스 체크 (DB 쿼리 테스트 포함)
router.get('/detailed', async (req, res) => {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      connected: false,
      status: 'unknown',
      queryTest: false,
      responseTime: null
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };

  try {
    // DB 연결 상태 확인
    const startTime = Date.now();
    const dbConnected = await checkConnection();
    const responseTime = Date.now() - startTime;

    healthStatus.database.connected = dbConnected;
    healthStatus.database.responseTime = responseTime;

    if (dbConnected) {
      // 실제 쿼리 테스트
      try {
        const queryStartTime = Date.now();
        await sequelize.query('SELECT 1 as test', { type: sequelize.QueryTypes.SELECT });
        const queryResponseTime = Date.now() - queryStartTime;

        healthStatus.database.queryTest = true;
        healthStatus.database.queryResponseTime = queryResponseTime;
        healthStatus.database.status = 'healthy';
      } catch (queryError) {
        healthStatus.database.queryTest = false;
        healthStatus.database.status = 'query_failed';
        healthStatus.database.queryError = queryError.message;
      }
    } else {
      healthStatus.database.status = 'disconnected';
    }

    // Connection Pool 상태 (가능한 경우)
    try {
      if (sequelize && sequelize.connectionManager && sequelize.connectionManager.pool) {
        const pool = sequelize.connectionManager.pool;
        healthStatus.database.pool = {
          size: pool.size || 0,
          available: pool.available || 0,
          using: pool.using ? pool.using.length : 0,
          waiting: pool.waiting ? pool.waiting.length : 0
        };
      }
    } catch (e) {
      // Pool 정보 접근 실패는 무시
      healthStatus.database.pool = { error: 'Unable to access pool info' };
    }

    // 상태에 따라 HTTP 상태 코드 결정
    if (healthStatus.database.status === 'healthy') {
      res.json(healthStatus);
    } else {
      healthStatus.status = 'degraded';
      res.status(503).json(healthStatus);
    }
  } catch (error) {
    healthStatus.status = 'error';
    healthStatus.database.status = 'error';
    healthStatus.error = error.message;
    res.status(503).json(healthStatus);
  }
});

module.exports = router;

