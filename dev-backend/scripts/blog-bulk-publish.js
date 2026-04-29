#!/usr/bin/env node
/**
 * blog-bulk-publish.js — /글쓰기 + /블로그-발행 스킬 표준 발행 스크립트.
 *
 * 설계: .env 직접 접근 X. 백엔드 HTTP API만 호출 (auth/login → contents/bulk).
 *       어떤 OS 사용자(irene/lua/...)가 실행해도 작동. 인증은 application-level
 *       SA 자격증명 (~/.purple-pos/creds.json 또는 env vars)으로 통과.
 *
 * 사용법:
 *   node blog-bulk-publish.js <bulk-payload.json> [api-base]
 *
 *   - bulk-payload.json: POST /api/contents/bulk 가 받는 정확한 JSON 본체
 *     (translations.{en,ms,zh}, type, status, target_persona 등 포함)
 *   - api-base: 기본 http://localhost:3001/api (생략 가능)
 *
 * 자격증명 (둘 중 하나):
 *   1. ~/.purple-pos/creds.json — { "username": "...", "password": "..." } (chmod 600)
 *   2. PURPLE_USER + PURPLE_PASS 환경변수
 *
 * 둘 다 없으면 stdin TTY 프롬프트.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('사용법: node blog-bulk-publish.js <bulk-payload.json> [api-base]');
  process.exit(2);
}

const PAYLOAD_PATH = path.resolve(args[0]);
const API_BASE = (args[1] || process.env.PURPLE_API_BASE || 'http://localhost:3001/api').replace(/\/$/, '');

if (!fs.existsSync(PAYLOAD_PATH)) {
  console.error(`✗ payload 파일 없음: ${PAYLOAD_PATH}`);
  process.exit(2);
}

async function loadCreds() {
  if (process.env.PURPLE_USER && process.env.PURPLE_PASS) {
    return { username: process.env.PURPLE_USER, password: process.env.PURPLE_PASS, source: 'env' };
  }
  const credsPath = path.join(require('os').homedir(), '.purple-pos', 'creds.json');
  if (fs.existsSync(credsPath)) {
    const stat = fs.statSync(credsPath);
    if ((stat.mode & 0o077) !== 0) {
      console.warn(`⚠  ${credsPath} 권한이 너무 열려있음. chmod 600 권장.`);
    }
    const c = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
    if (!c.username || !c.password) throw new Error('creds.json 에 username/password 누락');
    return { username: c.username, password: c.password, source: credsPath };
  }
  if (!process.stdin.isTTY) {
    throw new Error('자격증명 없음. ~/.purple-pos/creds.json 또는 PURPLE_USER/PURPLE_PASS 설정 필요');
  }
  // TTY 프롬프트 (마지막 폴백)
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q, hide = false) => new Promise(res => {
    if (!hide) return rl.question(q, a => res(a));
    process.stdout.write(q);
    process.stdin.setRawMode(true);
    let buf = '';
    const onData = (b) => {
      const ch = b.toString('utf8');
      if (ch === '\r' || ch === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', onData);
        process.stdout.write('\n');
        res(buf);
      } else if (ch === '') { process.exit(130); }
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
  console.log(`▸ creds source: ${creds.source}`);
  console.log(`▸ API base: ${API_BASE}`);
  console.log(`▸ payload: ${PAYLOAD_PATH}`);

  // 1. login
  const loginRes = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: creds.username, password: creds.password })
  });
  const loginJson = await loginRes.json().catch(() => ({}));
  if (!loginRes.ok) {
    console.error(`✗ Login 실패 (${loginRes.status}): ${JSON.stringify(loginJson)}`);
    process.exit(1);
  }
  // successResponse 형식: { success, data: { token, user, ... }, message } 또는 호환 변형
  const token = loginJson?.data?.token || loginJson?.token;
  const role = loginJson?.data?.user?.role || loginJson?.user?.role;
  if (!token) {
    console.error('✗ Login 응답에 token 없음:', JSON.stringify(loginJson).slice(0, 300));
    process.exit(1);
  }
  console.log(`✓ Login OK — role=${role || '?'}`);
  if (role && role !== 'System Admin') {
    console.error(`✗ /api/contents/bulk 는 System Admin 만 가능. 현재 role=${role}`);
    process.exit(1);
  }

  // 2. bulk publish
  const payload = JSON.parse(fs.readFileSync(PAYLOAD_PATH, 'utf-8'));
  const bulkRes = await fetch(`${API_BASE}/contents/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  const bulkJson = await bulkRes.json().catch(() => ({}));
  if (!bulkRes.ok) {
    console.error(`✗ bulk 실패 (${bulkRes.status}): ${JSON.stringify(bulkJson)}`);
    process.exit(1);
  }

  const data = bulkJson.data || bulkJson;
  const groupId = data?.translation_group_id || data?.group_id || data?.id;
  console.log(`✓ 발행 완료 — translation_group_id=${groupId ?? '?'}`);

  const langs = data?.translations || data?.contents || {};
  if (langs && typeof langs === 'object') {
    Object.entries(langs).forEach(([lang, c]) => {
      const slug = c?.slug || c?.url_slug;
      if (slug) console.log(`  - ${lang}: /blog/${slug}`);
    });
  }
  if (data) console.log(JSON.stringify(data, null, 2));
}

main().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
