const socketIO = require('socket.io');

function initSocketServer(server) {
  // Configure Socket.IO with CORS
  const io = socketIO(server, {
    cors: {
      origin: [
        'https://orderhere.wor-pro.com',
        'https://purplehere.com',
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