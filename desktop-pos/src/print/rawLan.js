'use strict';

// §6-2 LAN raw ESC/POS — replaces sendViaQZTray's IP:port socket path.
// net.Socket -> host:port (default 9100), write the decoded bytes, end.
// Same result as QZ's network raw, with the QZ middle layer removed.

const net = require('net');
const { enqueue } = require('./serialQueue');

const CONNECT_TIMEOUT_MS = 5000;
const TOTAL_TIMEOUT_MS = 10000;

function sendToSocket(buffer, host, port) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (result) => {
      if (settled) return;
      settled = true;
      try { socket.destroy(); } catch (_) {}
      clearTimeout(totalTimer);
      resolve(result);
    };

    const socket = new net.Socket();
    socket.setTimeout(CONNECT_TIMEOUT_MS);

    const totalTimer = setTimeout(() => done({ ok: false, error: 'LAN_TIMEOUT' }), TOTAL_TIMEOUT_MS);

    socket.on('timeout', () => done({ ok: false, error: 'LAN_CONNECT_TIMEOUT' }));
    socket.on('error', (err) => done({ ok: false, error: (err && err.code) || 'LAN_ERROR' }));

    socket.connect(port, host, () => {
      // Connected — cancel the connect-timeout, keep the overall guard.
      socket.setTimeout(0);
      socket.write(buffer, (writeErr) => {
        if (writeErr) return done({ ok: false, error: 'LAN_WRITE_ERROR' });
        socket.end(() => done({ ok: true }));
      });
    });
  });
}

// job: { buffer: Buffer, host: string, port: number }
function printRawLan(buffer, host, port) {
  const p = parseInt(port || 9100, 10) || 9100;
  // Serialize per host so bytes to one printer stay ordered; different hosts
  // print concurrently.
  return enqueue(`lan:${host}:${p}`, () => sendToSocket(buffer, host, p));
}

module.exports = { printRawLan };
