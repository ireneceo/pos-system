#!/usr/bin/env node
/**
 * sa-token.js — System Admin JWT 토큰 발급 헬퍼.
 *
 * 어떤 OS 사용자(irene/lua/...)도 실행 가능. .env 안 읽음. 백엔드 /auth/login 만 호출.
 * application-level RBAC만 통과하면 모든 admin API 자유롭게.
 *
 * 사용:
 *   TOKEN=$(node /var/www/dev-backend/scripts/sa-token.js)
 *   curl -H "Authorization: Bearer $TOKEN" http://localhost:3001/api/contents
 *   curl -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
 *        -d @payload.json http://localhost:3001/api/contents/bulk
 *
 * 옵션:
 *   --json     토큰 + 사용자 정보 JSON 출력 (기본은 토큰 한 줄)
 *   --api-base 기본 http://localhost:3001/api
 *
 * 자격증명 (우선순위):
 *   1. PURPLE_USER + PURPLE_PASS env vars
 *   2. ~/.purple-pos/creds.json — { username, password } (chmod 600)
 *   3. TTY 프롬프트
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
const wantJson = args.includes('--json');
const apiBaseIdx = args.indexOf('--api-base');
const API_BASE = (apiBaseIdx >= 0 ? args[apiBaseIdx + 1] : process.env.PURPLE_API_BASE || 'http://localhost:3001/api').replace(/\/$/, '');

async function loadCreds() {
  if (process.env.PURPLE_USER && process.env.PURPLE_PASS) {
    return { username: process.env.PURPLE_USER, password: process.env.PURPLE_PASS, source: 'env' };
  }
  const credsPath = path.join(require('os').homedir(), '.purple-pos', 'creds.json');
  if (fs.existsSync(credsPath)) {
    const stat = fs.statSync(credsPath);
    if ((stat.mode & 0o077) !== 0) {
      console.error(`⚠  ${credsPath} 권한이 너무 열려있음. chmod 600 권장.`);
    }
    const c = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
    if (!c.username || !c.password) throw new Error('creds.json 에 username/password 누락');
    return { username: c.username, password: c.password, source: credsPath };
  }
  if (!process.stdin.isTTY) {
    throw new Error('자격증명 없음. ~/.purple-pos/creds.json 또는 PURPLE_USER/PURPLE_PASS 설정 필요');
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
  const ask = (q, hide = false) => new Promise(res => {
    if (!hide) return rl.question(q, a => res(a));
    process.stderr.write(q);
    process.stdin.setRawMode(true);
    let buf = '';
    const onData = (b) => {
      const ch = b.toString('utf8');
      if (ch === '\r' || ch === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stderr.write('\n');
        res(buf);
      } else if (ch === '') { process.exit(130); }
      else { buf += ch; }
    };
    process.stdin.on('data', onData);
  });
  const username = await ask('SA username/email: ');
  const password = await ask('SA password: ', true);
  rl.close();
  return { username: username.trim(), password, source: 'tty' };
}

async function main() {
  const creds = await loadCreds();
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: creds.username, password: creds.password })
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`✗ Login 실패 (${res.status}): ${JSON.stringify(j)}`);
    process.exit(1);
  }
  const token = j?.data?.token || j?.token;
  const user = j?.data?.user || j?.user;
  if (!token) {
    console.error('✗ Login 응답에 token 없음:', JSON.stringify(j).slice(0, 300));
    process.exit(1);
  }
  if (user?.role && user.role !== 'System Admin') {
    console.error(`✗ System Admin 계정만 사용 가능. 현재 role=${user.role}`);
    process.exit(1);
  }
  if (wantJson) {
    process.stdout.write(JSON.stringify({ token, user, api_base: API_BASE }, null, 2) + '\n');
  } else {
    process.stdout.write(token + '\n');
  }
}

main().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
