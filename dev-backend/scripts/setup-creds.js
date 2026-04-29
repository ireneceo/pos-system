#!/usr/bin/env node
/**
 * setup-creds.js — `~/.purple-pos/creds.json` 한 번에 생성.
 *
 * 사용 (자기 세션에서 한 번만):
 *   node /var/www/dev-backend/scripts/setup-creds.js
 *
 * 동작:
 *   1) SA username/email + password TTY 입력
 *   2) /api/auth/login 호출하여 자격증명 검증 (틀리면 거절, 파일 안 만듦)
 *   3) role=System Admin 확인 (아니면 거절)
 *   4) ~/.purple-pos/creds.json 작성 (chmod 600)
 *
 * 이후 sa-token.js / blog-bulk-publish.js 가 자동으로 이 파일을 사용.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const API_BASE = (process.env.PURPLE_API_BASE || 'http://localhost:3001/api').replace(/\/$/, '');

async function ask(prompt, hide = false) {
  return new Promise(res => {
    if (!hide) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
      rl.question(prompt, a => { rl.close(); res(a); });
      return;
    }
    process.stderr.write(prompt);
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
      else if (ch === '\x7f' || ch === '\b') { buf = buf.slice(0, -1); }
      else { buf += ch; }
    };
    process.stdin.on('data', onData);
  });
}

(async () => {
  let username, password;
  if (process.env.PURPLE_USER && process.env.PURPLE_PASS) {
    username = process.env.PURPLE_USER.trim();
    password = process.env.PURPLE_PASS;
    console.error('▸ env vars 사용 (PURPLE_USER, PURPLE_PASS)');
  } else if (process.stdin.isTTY) {
    console.error('--- Purple POS 자격증명 setup ---');
    username = (await ask('SA username 또는 email: ')).trim();
    password = await ask('SA password: ', true);
  } else {
    console.error('✗ 자격증명 없음. PURPLE_USER + PURPLE_PASS env vars 또는 TTY 입력 필요.');
    process.exit(1);
  }

  // 1) Login 검증
  const r = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: username, password })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    console.error(`✗ Login 실패 (${r.status}): ${j?.error?.message || j?.message || '자격증명 거절'}`);
    process.exit(1);
  }
  const user = j?.data?.user || j?.user;
  if (user?.role !== 'System Admin') {
    console.error(`✗ System Admin 계정만 사용 가능. 현재 role=${user?.role || '?'}`);
    process.exit(1);
  }

  // 2) 파일 작성
  const dir = path.join(os.homedir(), '.purple-pos');
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const credsPath = path.join(dir, 'creds.json');
  fs.writeFileSync(credsPath, JSON.stringify({ username, password }, null, 2), { mode: 0o600 });
  fs.chmodSync(credsPath, 0o600);

  console.error(`✓ ${credsPath} 작성 완료 (chmod 600)`);
  console.error(`  user=${user.username} email=${user.email} role=${user.role}`);
  console.error(`  이제 /글쓰기 등 모든 admin 스킬이 자동으로 인증됩니다.`);
})();
