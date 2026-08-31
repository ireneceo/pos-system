#!/usr/bin/env node
/**
 * Migration — brands.is_real_customer / restaurants.is_real_customer 추가 + 시드
 *
 * 배경 (2026-08-31, Fable 판정 T1-a v2):
 *   `scripts/mark-demo-accounts.js` 는 매 운영 배포마다 돌면서(deploy-to-production.sh:582)
 *   "화이트리스트에 없으면 전부 test 취급"(deny-by-default) 으로 계정·매장·브랜드를 분류한다.
 *   그 화이트리스트가 **스크립트 안에 하드코딩된 이름·id 목록**이었던 것이 사고의 뿌리다:
 *     ① 2026-06-28 — 매장 축 누락 → `thefire` 매장이 매 배포 test 로 재마킹돼 공지 미수신.
 *        REAL_RESTAURANT_IDS=[16,24,25] 로 막았으나 **브랜드 축은 열어둔 채** 남았다.
 *        (2026-08-31 dev 실측: `K-DINE Brand`(irene@gitconsulting.group, 실주소)·
 *         `brand_general`(실브랜드 `with MIN` 소유) 둘 다 is_test=1)
 *     ② 그래서 알림 관문(utils/notificationService.js 1-a2)이 is_test 를 보고 실사용자를 조용히 뺐다.
 *     ③ 브랜드 플래그(is_demo/is_test)를 판정 근거로 쓰는 1차 수정은 **한 배포만 버텼다** —
 *        같은 스크립트의 brands 절이 `name NOT IN (REAL_BRAND_NAMES)` 인 브랜드를 매 실행
 *        test 로 되돌려 **자기 판정 근거를 스스로 지우기** 때문(연속 2회 리허설로 실측).
 *
 * 조치: 실고객 여부를 **스크립트가 절대 쓰지 않는 내구 컬럼**으로 옮긴다.
 *   `is_real_customer` 는 mark-demo-accounts 가 읽기만 하고 **쓰지 않는다** — 이것이 지속성의 근거다.
 *   deny-by-default 정책 자체는 유지한다(뒤집으면 정크 계정에 실메일이 나가는 역방향 사고).
 *
 * 시드 = 기존 하드코딩 목록을 그대로 데이터로 옮긴 것(동작 동등). 새로 넓히지 않는다:
 *   brands      : 'with MIN', 'K-DINE with MIN', 'The Fire'
 *                 ('The Fire' 는 기존 REAL_BRAND_NAMES 에 **없어서** 매 배포 test 로 뒤집히던 브랜드다.
 *                  실브랜드임은 매장 축(REAL_RESTAURANT_IDS 16·24·25 = The Fire 01/02/03,
 *                  2026-06-28 Irene 확정)으로 이미 증명돼 있어 여기서 같이 세운다.)
 *   restaurants : id 16, 24, 25 + 이름 'K-Dine Korean Restaurant','K-DINE IPC Branch',
 *                 'with MIN Cafe','WOR-PRO FOOD' (= 기존 REAL_RESTAURANT_NAMES)
 *
 * Usage:
 *   node scripts/migrate-real-customer-flag.js --dry-run
 *   node scripts/migrate-real-customer-flag.js
 *
 * 멱등성: 컬럼이 있으면 ALTER skip. 시드는 매번 멱등 UPDATE(값이 이미 1 이면 no-op).
 *         registry 분류 = deploy(매 배포 재실행) — 시드가 멱등이라 반복 실행이 안전하다.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (msg) => console.log(`[migrate-real-customer-flag]${DRY ? ' [DRY]' : ''} ${msg}`);

// 기존 mark-demo-accounts.js 하드코딩 목록을 그대로 옮긴 것 — 넓히지 않는다.
const REAL_BRAND_NAMES = ['with MIN', 'K-DINE with MIN', 'The Fire'];
const REAL_RESTAURANT_NAMES = ['K-Dine Korean Restaurant', 'K-DINE IPC Branch', 'with MIN Cafe', 'WOR-PRO FOOD'];
const REAL_RESTAURANT_IDS = [16, 24, 25];

async function hasColumn(table, column) {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME AS c FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :column`,
    { replacements: { table, column }, type: QueryTypes.SELECT }
  );
  return rows.length > 0;
}

async function run() {
  try {
    // ── 1. 컬럼 추가 (추가 전용 · 멱등) ────────────────────────────────────
    for (const table of ['brands', 'restaurants']) {
      if (await hasColumn(table, 'is_real_customer')) {
        log(`skip ALTER — ${table}.is_real_customer already present`);
        continue;
      }
      const sql = `ALTER TABLE ${table} ADD COLUMN is_real_customer TINYINT(1) NOT NULL DEFAULT 0`;
      log(`적용 SQL: ${sql}`);
      if (!DRY) await sequelize.query(sql);
    }

    if (DRY) { log('DRY-RUN — 시드 미적용'); process.exit(0); }

    // ── 2. 시드 (멱등 UPDATE) ─────────────────────────────────────────────
    // ⚠ 이름이 겹치는 매장이 있어(같은 이름 "The Fire Korean Restaurant" 4개 중 실매장 3개)
    //   매장은 **id 축을 별도로** 세운다. 이름 축만으로는 정체불명 행까지 실고객이 된다.
    const [, brandMeta] = await sequelize.query(
      `UPDATE brands SET is_real_customer = 1 WHERE name IN (:names) AND is_real_customer = 0`,
      { replacements: { names: REAL_BRAND_NAMES } }
    );
    const [, restNameMeta] = await sequelize.query(
      `UPDATE restaurants SET is_real_customer = 1 WHERE name IN (:names) AND is_real_customer = 0`,
      { replacements: { names: REAL_RESTAURANT_NAMES } }
    );
    const [, restIdMeta] = await sequelize.query(
      `UPDATE restaurants SET is_real_customer = 1 WHERE id IN (:ids) AND is_real_customer = 0`,
      { replacements: { ids: REAL_RESTAURANT_IDS } }
    );

    // ── 3. 자가검증 — 세워진 행을 실제로 세어 보고한다 ────────────────────
    const brandRows = await sequelize.query(
      `SELECT id, name FROM brands WHERE is_real_customer = 1 ORDER BY id`, { type: QueryTypes.SELECT });
    const restRows = await sequelize.query(
      `SELECT id, name FROM restaurants WHERE is_real_customer = 1 ORDER BY id`, { type: QueryTypes.SELECT });

    log(`이번 실행 변경: brands ${brandMeta?.affectedRows ?? 0}행 / restaurants ${(restNameMeta?.affectedRows ?? 0) + (restIdMeta?.affectedRows ?? 0)}행`);
    log(`실고객 브랜드 ${brandRows.length}건: ${brandRows.map(b => `${b.id}:${b.name}`).join(', ') || '(없음)'}`);
    log(`실고객 매장 ${restRows.length}건: ${restRows.map(r => `${r.id}:${r.name}`).join(', ') || '(없음)'}`);

    // 시드 목록에 있는 브랜드 이름이 그 DB 에 존재하는데 안 세워졌으면 실패로 본다(조용한 누락 방지).
    const missed = await sequelize.query(
      `SELECT id, name FROM brands WHERE name IN (:names) AND is_real_customer <> 1`,
      { replacements: { names: REAL_BRAND_NAMES }, type: QueryTypes.SELECT });
    if (missed.length) {
      console.error(`[migrate-real-customer-flag] ✗ 시드 누락: ${missed.map(m => `${m.id}:${m.name}`).join(', ')}`);
      process.exit(1);
    }

    log('✓ done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-real-customer-flag] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
