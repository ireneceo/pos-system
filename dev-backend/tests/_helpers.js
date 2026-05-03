// Shared test helpers — bypass authLimiter (per-IP) by giving each call a unique X-Forwarded-For.
// Why: trust proxy=1 in server.js means rate-limit keys on the forwarded IP.
// Without this, repeated test runs hit the 20/15min cap → 429 instead of expected 401/200.

const request = require('supertest');

const BASE = 'http://localhost:3001';

let counter = 0;
function uniqueIP() {
  const c = counter++;
  return `10.${Math.floor(c / 65536) % 256}.${Math.floor(c / 256) % 256}.${c % 256}`;
}

function http(method, path) {
  // supertest creates a fresh request per call; tag with a unique IP each time.
  return request(BASE)[method](path).set('X-Forwarded-For', uniqueIP());
}

async function login(email, password) {
  const r = await http('post', '/api/auth/login').send({ email, password });
  return r;
}

module.exports = { BASE, uniqueIP, http, login };
