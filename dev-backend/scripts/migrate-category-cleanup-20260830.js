/**
 * 일회성 데이터 정리: 카테고리 중복 병합 + 미분류 채우기.
 * 동결 계획: scripts/data/category-cleanup-20260830.json (sha256 검증)
 * Fable 판정 2026-08-30. 표시·분류 데이터만 — 돈·재고 산술 무관, 전건 되돌림 가능.
 *
 * 사용: node scripts/migrate-category-cleanup-20260830.js [--apply]
 *   기본은 드라이런(반향만). --apply 일 때만 쓴다.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');
const PLAN_PATH = path.join(__dirname, 'data', 'category-cleanup-20260830.json');
const PLAN_SHA = '7ec518effcb9b5359e17e6b854f96941246614e1dec09f2804ca9d757dfd79e2';
const BACKUP_DIR = '/var/www/backups/data-migrations';
const MARKER = path.join(BACKUP_DIR, '.category-cleanup-20260830.applied');
const MAX_WRITES = 900;   // 건수 상한 — 계획을 벗어난 대량 쓰기 차단

const q = (s, r) => sequelize.query(s, { replacements: r, type: sequelize.QueryTypes.SELECT });
const run = (s, r) => sequelize.query(s, { replacements: r });

// 재료 카테고리(소유자 = 매장/브랜드) · BG 프로덕트 카테고리(소유자 = owner_user_id) 두 축을 같은 모양으로 다룬다.
const AXES = [
  { key: 'ing', catTable: 'ingredient_categories', itemTable: 'ingredients',
    catFk: 'ingredient_category_id', scopeCols: ['owner_type', 'restaurant_id', 'brand_id'] },
  { key: 'bp',  catTable: 'brand_product_categories', itemTable: 'brand_products',
    catFk: 'category_id', scopeCols: ['owner_user_id'] },
];
const scopeKey = (c, cols) => cols.map(k => `${k}=${c[k] ?? 'null'}`).join('|');

(async () => {
  try {
    const raw = fs.readFileSync(PLAN_PATH);
    const sha = crypto.createHash('sha256').update(raw).digest('hex');
    if (sha !== PLAN_SHA) throw new Error(`계획 파일 지문 불일치 — 기대 ${PLAN_SHA}, 실제 ${sha}`);
    const plan = JSON.parse(raw);
    console.log(`[category-cleanup] ${APPLY ? 'APPLY' : 'DRY-RUN'} · 계획 지문 ${sha.slice(0, 12)} 확인`);

    if (APPLY && fs.existsSync(MARKER)) {
      console.log('  ✓ 완료 마커 존재 — 이미 적용됨, skip');
      process.exit(0);
    }

    const report = { merged: 0, movedItems: 0, deleted: 0, filled: 0, left: 0 };
    const deleteNames = [];
    const fills = [];
    const leftovers = [];

    for (const ax of AXES) {
      const cats = await q(`SELECT id, name, ${ax.scopeCols.join(', ')} FROM ${ax.catTable}`);
      const byScope = {};
      for (const c of cats) (byScope[scopeKey(c, ax.scopeCols)] ||= []).push(c);

      // ── 1) 병합: 같은 소유자 안에서만 from → to ─────────────────────────
      for (const [, group] of Object.entries(byScope)) {
        const byName = Object.fromEntries(group.map(c => [c.name, c]));
        for (const m of plan.merge) {
          const from = byName[m.from], to = byName[m.to];
          if (!from || !to || from.id === to.id) continue;
          const [{ c: n }] = await q(`SELECT COUNT(*) c FROM ${ax.itemTable} WHERE ${ax.catFk} = :id`, { id: from.id });
          console.log(`  · 병합 [${ax.key}] "${m.from}"(#${from.id}, ${n}건) → "${m.to}"(#${to.id})`);
          if (APPLY) {
            if (Number(n) > 0) await run(`UPDATE ${ax.itemTable} SET ${ax.catFk} = :to WHERE ${ax.catFk} = :from`, { to: to.id, from: from.id });
            const [{ c: left }] = await q(`SELECT COUNT(*) c FROM ${ax.itemTable} WHERE ${ax.catFk} = :id`, { id: from.id });
            if (Number(left) !== 0) throw new Error(`병합 후에도 "${m.from}"(#${from.id}) 를 무는 행 ${left}건 — 삭제 중단`);
            await run(`DELETE FROM ${ax.catTable} WHERE id = :id`, { id: from.id });
          }
          report.merged++; report.movedItems += Number(n);
        }
      }

      // ── 2) 빈 옛 카테고리 삭제 (0건인 것만) ─────────────────────────────
      for (const c of cats) {
        if (!plan.deleteEmptyLegacy.includes(c.name)) continue;
        const [{ c: n }] = await q(`SELECT COUNT(*) c FROM ${ax.itemTable} WHERE ${ax.catFk} = :id`, { id: c.id });
        if (Number(n) !== 0) { console.log(`  · 삭제 보류 [${ax.key}] "${c.name}"(#${c.id}) — ${n}건 있음`); continue; }
        deleteNames.push(`${ax.key}:${c.name}#${c.id}`);
        if (APPLY) await run(`DELETE FROM ${ax.catTable} WHERE id = :id`, { id: c.id });
        report.deleted++;
      }

      // ── 3) 미분류 채우기 (NULL 인 행만) ─────────────────────────────────
      const fresh = await q(`SELECT id, name, ${ax.scopeCols.join(', ')} FROM ${ax.catTable}`);
      const nameByScope = {};
      for (const c of fresh) (nameByScope[scopeKey(c, ax.scopeCols)] ||= {})[c.name] = c.id;

      const items = await q(
        `SELECT id, name, ${ax.scopeCols.filter(k => k !== 'owner_type').join(', ')} FROM ${ax.itemTable} WHERE ${ax.catFk} IS NULL`
      );
      for (const it of items) {
        const lower = String(it.name || '').toLowerCase();
        if ((plan.veto || []).some(v => lower.includes(v))) { leftovers.push(`${ax.key}#${it.id} ${it.name} (veto)`); continue; }
        // 단어 경계로만 맞춘다 — 글자 포함이면 ham ⊂ Chamomile 처럼 엉뚱하게 걸린다.
        const has = (w) => new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'i').test(lower);
        const hits = plan.vocab.filter(([, words]) => words.some(has)).map(([cat]) => cat);
        const uniq = [...new Set(hits)];
        if (uniq.length !== 1) { leftovers.push(`${ax.key}#${it.id} ${it.name}`); continue; }

        // 자기 소유 스코프의 같은 이름 카테고리로만 채운다(없으면 채우지 않는다)
        // 재료는 매장·브랜드 값을 **둘 다** 가진 행이 있다(브랜드 공유가 매장에 복사된 것).
        // 그때 소유자는 매장이다 — brand_id 를 같이 넣어 키를 만들면 자기 카테고리를 못 찾아
        // 채울 수 있는 것을 못 채운다(2026-08-30 실측).
        const scope = ax.key === 'ing'
          ? (it.restaurant_id
              ? scopeKey({ owner_type: 'restaurant', restaurant_id: it.restaurant_id, brand_id: null }, ax.scopeCols)
              : scopeKey({ owner_type: 'brand', restaurant_id: null, brand_id: it.brand_id }, ax.scopeCols))
          : scopeKey(it, ax.scopeCols);
        const catId = (nameByScope[scope] || {})[uniq[0]];
        if (!catId) { leftovers.push(`${ax.key}#${it.id} ${it.name} (해당 카테고리 없음: ${uniq[0]})`); continue; }
        fills.push(`${uniq[0]}\t${it.name}`);
        if (APPLY) await run(`UPDATE ${ax.itemTable} SET ${ax.catFk} = :c WHERE id = :i AND ${ax.catFk} IS NULL`, { c: catId, i: it.id });
        report.filled++;
      }
    }
    report.left = leftovers.length;

    if (report.movedItems + report.filled > MAX_WRITES) {
      throw new Error(`쓰기 건수 상한 초과: ${report.movedItems + report.filled} > ${MAX_WRITES} — 계획을 벗어났다`);
    }

    console.log(`\n  병합 ${report.merged}쌍 (이동 ${report.movedItems}건) · 삭제 ${report.deleted} · 채움 ${report.filled} · 남은 미분류 ${report.left}`);
    if (deleteNames.length) console.log(`  삭제 대상: ${deleteNames.join(', ')}`);
    fs.writeFileSync('/tmp/category-cleanup-leftovers.txt', leftovers.join('\n'));
    fs.writeFileSync('/tmp/category-cleanup-fills.txt', fills.join('\n'));
    console.log('  남은 목록: /tmp/category-cleanup-leftovers.txt');

    if (APPLY) {
      // 고아 0 즉시검증
      for (const ax of AXES) {
        const [{ c }] = await q(`SELECT COUNT(*) c FROM ${ax.itemTable} i LEFT JOIN ${ax.catTable} k ON k.id = i.${ax.catFk}
                                  WHERE i.${ax.catFk} IS NOT NULL AND k.id IS NULL`);
        if (Number(c) !== 0) throw new Error(`[${ax.key}] 사라진 카테고리를 무는 행 ${c}건 — 고아 발생`);
        console.log(`  ✓ [${ax.key}] 고아 0`);
      }
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      fs.writeFileSync(MARKER, JSON.stringify({ at: new Date().toISOString(), sha, ...report }, null, 2));
      console.log(`  ✓ 완료 마커: ${MARKER}`);
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ 실패:', e.message);
    process.exit(1);
  }
})();
