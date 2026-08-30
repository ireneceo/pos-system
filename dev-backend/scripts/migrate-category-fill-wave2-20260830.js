/**
 * 일회성: 미분류(Uncategorized) 잔여를 규칙 보강으로 줄인다.
 * 동결 계획: scripts/data/category-fill-wave2-20260830.json (sha256 검증)
 * Fable 판정 2026-08-30 (Irene 질문 "202건이 왜 그렇게 많아?" 에 대한 후속).
 *
 * 1차가 남긴 202건의 최대 원인은 **내 규칙이 스스로 포기한 것**이었다:
 *   `1OZ PP Round Sauce Container` = sauce + container 둘 다 걸림 → "2개 이상이면 안 채움" 으로 탈락.
 * 용기 명사가 있으면 음식어는 "무엇을 담는가"의 수식이므로 **용기가 상품의 정체**다(Fable).
 *
 * 안전: 현재 Uncategorized 인 행만 건드린다(사람이 고른 분류 무접촉). 멱등. 카테고리 신설 없음.
 * 사용: node scripts/migrate-category-fill-wave2-20260830.js [--apply]
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');
const PLAN_PATH = path.join(__dirname, 'data', 'category-fill-wave2-20260830.json');
const PLAN_SHA = '35ec0997eb99d28399a1dfa3b14ada5a6e7d4298b1d041fb1851cec6b9a14ba2';
const MARKER = '/var/www/backups/data-migrations/.category-fill-wave2-20260830.applied';
const MAX_WRITES = 400;

const q = (s, r) => sequelize.query(s, { replacements: r, type: sequelize.QueryTypes.SELECT });
const run = (s, r) => sequelize.query(s, { replacements: r });

const AXES = [
  { key: 'ing', catTable: 'ingredient_categories', itemTable: 'ingredients',
    catFk: 'ingredient_category_id', scopeCols: ['owner_type', 'restaurant_id', 'brand_id'] },
  { key: 'bp',  catTable: 'brand_product_categories', itemTable: 'brand_products',
    catFk: 'category_id', scopeCols: ['owner_user_id'] },
];
const scopeKey = (c, cols) => cols.map(k => `${k}=${c[k] ?? 'null'}`).join('|');
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// 단어 경계로만 맞춘다 — 글자 포함이면 ham ⊂ Chamomile 처럼 엉뚱하게 걸린다.
const hasWord = (lower, w) => new RegExp(`(^|[^a-z])${esc(w)}([^a-z]|$)`, 'i').test(lower);

(async () => {
  try {
    const raw = fs.readFileSync(PLAN_PATH);
    const sha = crypto.createHash('sha256').update(raw).digest('hex');
    if (sha !== PLAN_SHA) throw new Error(`계획 지문 불일치 — 기대 ${PLAN_SHA}, 실제 ${sha}`);
    const plan = JSON.parse(raw);
    console.log(`[fill-wave2] ${APPLY ? 'APPLY' : 'DRY-RUN'} · 계획 지문 ${sha.slice(0, 12)} 확인`);
    if (APPLY && fs.existsSync(MARKER)) { console.log('  ✓ 완료 마커 존재 — skip'); process.exit(0); }

    let filled = 0;
    const left = [];
    const fills = [];

    for (const ax of AXES) {
      const cats = await q(`SELECT id, name, ${ax.scopeCols.join(', ')} FROM ${ax.catTable}`);
      const byScope = {};
      for (const c of cats) (byScope[scopeKey(c, ax.scopeCols)] ||= {})[c.name] = c.id;

      const unc = cats.filter(c => c.name === 'Uncategorized').map(c => c.id);
      if (!unc.length) continue;

      const items = await q(
        `SELECT id, name, ${ax.scopeCols.filter(k => k !== 'owner_type').join(', ')}
           FROM ${ax.itemTable} WHERE ${ax.catFk} IN (${unc.join(',')})`
      );

      for (const it of items) {
        const lower = String(it.name || '').toLowerCase();
        let target = null;

        if ((plan.veto || []).some(v => lower.includes(v))) { left.push(`${ax.key}#${it.id} ${it.name} (veto)`); continue; }

        // ⓪ 세제 기능 명사 우선 — 세제는 향으로 이름 붙어서(Lime/Lemon) 과일로 샌다.
        //    용기어보다 먼저 본다: 병에 든 세제가 '포장재'로 가면 안 되기 때문.
        if (plan.cleaningFirst.words.some(w => hasWord(lower, w))) {
          target = plan.cleaningFirst.category;
        }
        // ① 용기 명사 우선 — 음식어와 충돌해도 용기가 이긴다.
        else if (plan.containerFirst.words.some(w => hasWord(lower, w))) {
          target = plan.containerFirst.category;
        } else {
          // ② 정확히 한 카테고리에만 걸릴 때만 채운다.
          const hits = [...new Set(plan.vocab.filter(([, ws]) => ws.some(w => hasWord(lower, w))).map(([c]) => c))];
          if (hits.length === 1) target = hits[0];
        }
        if (!target) { left.push(`${ax.key}#${it.id} ${it.name}`); continue; }

        const scope = ax.key === 'ing'
          ? (it.restaurant_id
              ? scopeKey({ owner_type: 'restaurant', restaurant_id: it.restaurant_id, brand_id: null }, ax.scopeCols)
              : scopeKey({ owner_type: 'brand', restaurant_id: null, brand_id: it.brand_id }, ax.scopeCols))
          : scopeKey(it, ax.scopeCols);
        const catId = (byScope[scope] || {})[target];
        // ⑥ 자기 스코프에 그 카테고리가 없으면 만들지 않고 남긴다.
        if (!catId) { left.push(`${ax.key}#${it.id} ${it.name} (${target} 없음)`); continue; }

        fills.push(`${target}\t${it.name}`);
        if (APPLY) await run(
          `UPDATE ${ax.itemTable} SET ${ax.catFk} = :c WHERE id = :i AND ${ax.catFk} IN (${unc.join(',')})`,
          { c: catId, i: it.id });
        filled++;
      }
    }

    if (filled > MAX_WRITES) throw new Error(`쓰기 상한 초과: ${filled} > ${MAX_WRITES}`);
    fs.writeFileSync('/tmp/fill-wave2-fills.txt', fills.join('\n'));
    fs.writeFileSync('/tmp/fill-wave2-left.txt', left.join('\n'));
    console.log(`\n  채움 ${filled} · 남은 미분류 ${left.length}`);
    console.log('  채운 목록 /tmp/fill-wave2-fills.txt · 남은 목록 /tmp/fill-wave2-left.txt');

    if (APPLY) {
      for (const ax of AXES) {
        const [{ c }] = await q(`SELECT COUNT(*) c FROM ${ax.itemTable} i
          LEFT JOIN ${ax.catTable} k ON k.id = i.${ax.catFk}
          WHERE i.${ax.catFk} IS NOT NULL AND k.id IS NULL`);
        if (Number(c) !== 0) throw new Error(`[${ax.key}] 고아 ${c}건`);
      }
      console.log('  ✓ 고아 0');
      fs.mkdirSync(path.dirname(MARKER), { recursive: true });
      fs.writeFileSync(MARKER, JSON.stringify({ at: new Date().toISOString(), sha, filled, left: left.length }, null, 2));
      console.log(`  ✓ 완료 마커: ${MARKER}`);
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ 실패:', e.message);
    process.exit(1);
  }
})();
