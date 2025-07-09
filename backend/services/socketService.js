const socketIO = require('socket.io');

function initSocketServer(server) {
  const io = socketIO(server);

  io.of('/kitchen').on('connection', (socket) => {
    socket.on('new-order', (order) => {
      // 주방 디스플레이에 새 주문 표시
      io.of('/kitchen').emit('new-order', order);
    });

    socket.on('order-ready', (order) => {
      // 고객 디스플레이에 픽업 준비 알림
      io.of('/display').emit('pickup-ready', order);
    });
  });

  io.of('/display').on('connection', (socket) => {
    socket.on('order-completed', (pickupNumber) => {
      // 고객 디스플레이에서 픽업 번호 제거
      io.of('/display').emit('pickup-completed', pickupNumber);
    });
  });

  return io;
}

module.exports = { initSocketServer };