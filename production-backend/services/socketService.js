const socketIO = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

function initSocketServer(server) {
  // Configure Socket.IO with CORS
  const io = socketIO(server, {
    cors: {
      origin: [
        'https://orderhere.wor-pro.com',
        'https://purplehere.com',
        'https://dev.purplehere.com',
        'https://pos.orderhere.center',
        'https://solution.orderhere.center',
        'http://localhost:3001',
        'http://localhost:3000',
        /https:\/\/.*\.github\.dev$/,
        /https:\/\/.*\.app\.github\.dev$/
      ],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  console.log('🔌 Socket.IO server configured with CORS origins:', [
    'https://orderhere.wor-pro.com',
    'https://purplehere.com'
  ]);

  // Setup Redis adapter for PM2 cluster mode
  const isPM2Cluster = process.env.pm_id !== undefined && process.env.exec_mode === 'cluster_mode';

  if (isPM2Cluster) {
    console.log('🔧 PM2 cluster mode detected, setting up Redis adapter...');

    const pubClient = createClient({
      host: 'localhost',
      port: 6379,
      // Add error handler to prevent crashes
      retry_strategy: (options) => {
        console.warn('⚠️ Redis connection retry:', options.attempt);
        if (options.attempt > 10) {
          console.error('❌ Redis connection failed after 10 attempts');
          return undefined; // Stop retrying
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient));
      console.log('✅ Redis adapter connected for Socket.IO cluster mode');
    }).catch((err) => {
      console.error('❌ Redis adapter connection failed:', err.message);
      console.log('⚠️ Socket.IO will work in single instance mode only');
    });
  } else {
    console.log('ℹ️ Running in single instance mode, Redis adapter not needed');
  }

  // Connection error handling
  io.engine.on('connection_error', (err) => {
    console.error('❌ Socket.IO connection error:', err);
  });

  // Orders namespace for Live Orders page
  io.of('/orders').on('connection', (socket) => {
    console.log('✅ Client connected to /orders namespace:', socket.id);
    console.log('   Client origin:', socket.handshake.headers.origin);

    socket.on('join-restaurant', (restaurantId) => {
      socket.join(`restaurant_${restaurantId}`);
      console.log(`✅ Client ${socket.id} joined restaurant_${restaurantId}`);
    });

    socket.on('disconnect', () => {
      console.log('⚠️ Client disconnected from /orders namespace:', socket.id);
    });

    socket.on('error', (error) => {
      console.error('❌ Socket error in /orders namespace:', error);
    });
  });

  // Kitchen namespace
  io.of('/kitchen').on('connection', (socket) => {
    console.log('Client connected to /kitchen namespace');

    socket.on('new-order', (order) => {
      // 주방 디스플레이에 새 주문 표시
      io.of('/kitchen').emit('new-order', order);
    });

    socket.on('order-ready', (order) => {
      // 고객 디스플레이에 픽업 준비 알림
      io.of('/display').emit('pickup-ready', order);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from /kitchen namespace');
    });
  });

  // Display namespace
  io.of('/display').on('connection', (socket) => {
    console.log('Client connected to /display namespace');

    socket.on('order-completed', (pickupNumber) => {
      // 고객 디스플레이에서 픽업 번호 제거
      io.of('/display').emit('pickup-completed', pickupNumber);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from /display namespace');
    });
  });

  return io;
}

module.exports = { initSocketServer };