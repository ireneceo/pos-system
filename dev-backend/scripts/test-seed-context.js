#!/usr/bin/env node
'use strict';
/**
 * test-seed-context.js — e2e 용 컨텍스트("모자") 부여/회수 시딩.
 *
 * 부여 관리 UI 는 P5 라, 그전까지 e2e 가 "모자를 쓴 상태"의 화면을 검증할 방법이 없다.
 * 제품 코드에 임시 경로를 뚫는 것은 금지지만, **테스트 픽스처 시딩은 임시조치가 아니다**
 * (P2 계약 테스트도 같은 방식으로 DB 에 직접 넣는다).
 *
 * 🚨 이중 가드 (fail-closed) — [[reference_smoke_writes_to_real_store]] 교훈:
 *   ① 대상 **매장이 is_demo** 가 아니면 거부
 *   ② 대상 **유저가 is_demo/is_test** 가 아니면 거부
 *   실매장·실계정에 권한을 심는 사고를 구조적으로 막는다. 조용한 스킵 금지 — 이유를 찍고 exit 1.
 *
 * 멱등: 같은 조합을 여러 번 grant 해도 1행(UNIQUE), revoke 는 없어도 성공.
 *
 * usage:
 *   node scripts/test-seed-context.js grant  --user <id|email> --restaurant <rid>
 *   node scripts/test-seed-context.js revoke --user <id|email> [--restaurant <rid>]
 *   node scripts/test-seed-context.js list   --user <id|email>
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

const V1 = { entity_type: 'restaurant', role: 'Restaurant Admin' };

const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];

function fail(msg) {
  console.error('✗ ' + msg);
  process.exit(1);
}

function arg(name) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 ? process.argv[i + 1] : null;
}

async function resolveUser(ref) {
  if (!ref) fail('--user 필요');
  const byId = /^\d+$/.test(String(ref));
  const rows = await q(
    byId
      ? 'SELECT id,email,role,is_demo,is_test FROM users WHERE id = :ref'
      : 'SELECT id,email,role,is_demo,is_test FROM users WHERE email = :ref',
    { ref }
  );
  if (!rows.length) fail(`유저를 찾을 수 없습니다: ${ref}`);
  const u = rows[0];
  // 가드 ② — 데모/테스트 계정이 아니면 거부
  if (!u.is_demo && !u.is_test) {
    fail(`유저 ${u.id}(${u.email})는 demo/test 계정이 아닙니다 — 실계정에 모자 부여 금지`);
  }
  return u;
}

async function resolveRestaurant(rid) {
  if (!/^\d+$/.test(String(rid || ''))) fail('--restaurant 는 정수만 허용(정규화 규칙)');
  const rows = await q('SELECT id,name,is_demo,is_test FROM restaurants WHERE id = :rid', { rid });
  if (!rows.length) fail(`매장을 찾을 수 없습니다: ${rid}`);
  const r = rows[0];
  // 가드 ① — 데모 매장이 아니면 거부
  if (!r.is_demo) {
    fail(`매장 ${r.id}(${r.name})는 is_demo 가 아닙니다 — 실매장 접근권 부여 금지`);
  }
  return r;
}

async function grantorId() {
  const rows = await q("SELECT id FROM users WHERE role='System Admin' ORDER BY id LIMIT 1");
  if (!rows.length) fail('System Admin 계정이 없어 granted_by 를 채울 수 없습니다');
  return rows[0].id;
}

(async () => {
  const cmd = process.argv[2];
  try {
    if (cmd === 'grant') {
      const u = await resolveUser(arg('user'));
      const r = await resolveRestaurant(arg('restaurant'));
      const by = await grantorId();
      await q(
        `INSERT INTO user_contexts (user_id,entity_type,entity_id,role,granted_by,created_at,updated_at)
         VALUES (:u,:t,:e,:r,:by,NOW(),NOW())
         ON DUPLICATE KEY UPDATE updated_at = NOW()`,
        { u: u.id, t: V1.entity_type, e: r.id, r: V1.role, by }
      );
      console.log(`✓ 부여: user ${u.id}(${u.email}) → 매장 ${r.id}(${r.name}) as ${V1.role}`);
    } else if (cmd === 'revoke') {
      const u = await resolveUser(arg('user'));
      const rid = arg('restaurant');
      if (rid) {
        await resolveRestaurant(rid);
        await q('DELETE FROM user_contexts WHERE user_id = :u AND entity_id = :e AND entity_type = :t',
          { u: u.id, e: rid, t: V1.entity_type });
        console.log(`✓ 회수: user ${u.id} → 매장 ${rid}`);
      } else {
        await q('DELETE FROM user_contexts WHERE user_id = :u', { u: u.id });
        console.log(`✓ 회수: user ${u.id} 의 모든 모자`);
      }
    } else if (cmd === 'list') {
      const u = await resolveUser(arg('user'));
      const rows = await q(
        `SELECT uc.id, uc.entity_type, uc.entity_id, uc.role, r.name
           FROM user_contexts uc LEFT JOIN restaurants r ON r.id = uc.entity_id
          WHERE uc.user_id = :u ORDER BY uc.id`, { u: u.id });
      console.log(JSON.stringify(rows, null, 2));
    } else {
      console.log('usage: test-seed-context.js <grant|revoke|list> --user <id|email> [--restaurant <rid>]');
      process.exit(1);
    }
  } catch (e) {
    fail(e.message);
  }
  process.exit(0);
})();
