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

  // Socket.IO configured with CORS

  // Setup Redis adapter for PM2 cluster mode
  const isPM2Cluster = process.env.pm_id !== undefined && process.env.exec_mode === 'cluster_mode';

  if (isPM2Cluster) {
    const pubClient = createClient({
      host: 'localhost',
      port: 6379,
      retry_strategy: (options) => {
        if (options.attempt > 10) {
          console.error('[Socket.IO] Redis connection failed after 10 attempts');
          return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      io.adapter(createAdapter(pubClient, subClient));
    }).catch((err) => {
      console.error('[Socket.IO] Redis adapter connection failed:', err.message);
    });
  }

  // Connection error handling
  io.engine.on('connection_error', (err) => {
    console.error('[Socket.IO] Connection error:', err.message);
  });

  // Orders namespace for Live Orders page
  io.of('/orders').on('connection', (socket) => {
    socket.on('join-restaurant', (restaurantId) => {
      socket.join(`restaurant_${restaurantId}`);
    });

    socket.on('error', (error) => {
      console.error('[Socket.IO] Error in /orders:', error.message);
    });
  });

  // Kitchen namespace
  io.of('/kitchen').on('connection', (socket) => {
    socket.on('new-order', (order) => {
      io.of('/kitchen').emit('new-order', order);
    });

    socket.on('order-ready', (order) => {
      io.of('/display').emit('pickup-ready', order);
    });
  });

  // Display namespace
  io.of('/display').on('connection', (socket) => {
    socket.on('order-completed', (pickupNumber) => {
      io.of('/display').emit('pickup-completed', pickupNumber);
    });
  });

  return io;
}

module.exports = { initSocketServer };