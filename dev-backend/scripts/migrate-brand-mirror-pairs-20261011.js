/**
 * scripts/migrate-brand-mirror-pairs-20261011.js — 같은 물건이 브랜드 재료 두 줄 → 한 줄 (일회성 · manual · 사람이 확인한 짝만)
 *
 * ## 왜 (Fable 판정 `fable-verdict-20261011-kdine-ingredient-tidy` §4-2 · §6)
 * Irene 2026-10-11: «Yukgaejang beef … 그리고 이것들은 왜 있어? 정돈이 계속 안되고 혼란스러워서 너무 심각한 상황이야.
 *   제대로 레시피사용, 브랜드메뉴 재료, 우리 납품 브랜드로 공급업체 연결 제대로 해줄 수는 없는 거야??»
 * 9/4 통합 때 기계가 옛 브랜드 재료에서 GIT 재고아이템을 새로 만들어 붙인 줄(재고아이템 출처)과, GIT 이 실제로 파는 상품의 줄
 * (상품 출처)이 같은 물건인데 따로 살아 있다. 매 배포 합치기 마이그(`migrate-merge-product-mirrors.js`)는 **발주 연결로 짝이
 * 확정된 쌍만** 합치므로, 이름이 다르고 연결이 없는 쌍은 영원히 남는다. 짝은 이름으로 추측하지 않는다 — **사람이 확인한 표**만 받는다.
 *
 * ## 입력
 *   --pairs=<json>  [{ "loser": 51, "winner": 75, "note": "육개장 소고기" }, …]  (지는 줄 → 남는 줄, Irene 확인 표 그대로)
 *
 * ## 쌍마다 (조건 미달이면 **그 쌍만 건너뛰고 목록** — 나머지는 진행)
 *   전제: 둘 다 같은 브랜드의 브랜드 재료 · 남는 줄 활성 · 지는 줄 매장 재고 줄 전부 0 · 지는 줄에 매장이 붙인 연결 0 ·
 *         지는 줄을 매장 레시피가 안 씀 · 취급 단위가 같거나, 남는 줄에 레시피 0·재고 0 이면 남는 줄이 지는 줄의 단위·기준숫자를
 *         물려받는다(합치기 마이그 ① 과 같은 규칙). 그 밖의 단위 차이(kg↔g 수량 환산 필요)는 건너뜀 — 수량은 손대지 않는다.
 *         한 레시피가 두 줄을 다 쓰면 건너뜀(레시피·재료 한 쌍은 한 줄 — 수량 합치기는 사람 몫).
 *   옮기기: 브랜드 레시피 줄 `ingredient_id` 지는 → 남는(수량·단위 무접촉) · 지는 줄의 공용 연결 → 남는 줄(같은 판매자·상품이 이미 있으면 그대로 둠)
 *   지는 줄: 비활성 + 출처 칼럼 비움(동기화가 is_active 를 복사해 되살리는 것 방지 — K-Bulgogi ① 과 같은 이유). 행 삭제 없음
 *   남는 줄: 상품 출처면 출처 연결 보장(ensureSourceSellerLink) + 원가 재계산(costSync — 식은 거기 한 곳)
 *   지는 줄의 재고아이템: 참조 0·재고 0 이면 비활성, 아니면 무접촉 + 목록(합치기 마이그 ④ 와 같은 SELECT)
 *
 * ## 증명 (쌍마다 — 하나라도 어긋나면 그 쌍을 되돌리고 중단)
 *   브랜드 레시피 줄 수 보존 · 줄 수량 합 보존 · 지는 줄 레시피 0 · 남는 줄 활성 · (상품 출처면) 출처 연결 1 · 죽은 참조 증가 0
 *
 * 사용 (기본 = 드라이런: 적용 → 증명 → 무조건 롤백)
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --pairs=pairs.json
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --pairs=pairs.json --apply        # 적용 + 영수증 JSON
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --undo=<영수증> [--apply]           # 되돌리기(--apply 없으면 드라이런)
 * ⛔ 하지 않는 것: 이름으로 짝 추측 · 거울 생성 · 수량·단위 환산 · 매장 소유 줄(restaurant_id) 읽기/쓰기 · 메뉴 표 · 행 삭제
 */
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const APPLY = process.argv.includes('--apply');
const PAIRS = arg('pairs', null);
const UNDO = arg('undo', null);
const RECEIPT_DIR = arg('receipt-dir', '/var/www/backups/data-migrations');

// 규칙(skipReason · 합치기 · 되돌리기)은 services/mirrorMerge.js 한 곳 — 화면의 «바꾸고 삭제» 와 같은 함수(2026-10-11 Fable 판정 §4-2)
const { mergePair, undoPair } = require('../services/mirrorMerge');
const applyPair = (pair, t) => mergePair(pair, t);

(async () => {
  const t = await sequelize.transaction();
  try {
    if (UNDO) {
      const receipt = JSON.parse(fs.readFileSync(UNDO, 'utf8'));
      for (const rec of [...receipt.applied].reverse()) { await undoPair(rec, t); console.log(`되돌림 ${rec.loser} ← ${rec.winner}`); }
      if (APPLY) { await t.commit(); console.log('되돌리기 적용'); } else { await t.rollback(); console.log('드라이런 — 롤백 (적용하려면 --apply)'); }
      process.exit(0);
    }
    if (!PAIRS) { console.log('사용: --pairs=<json> [--apply] | --undo=<영수증> [--apply]'); await t.rollback(); process.exit(1); }
    const pairs = JSON.parse(fs.readFileSync(PAIRS, 'utf8'));
    const applied = [], skipped = [];
    for (const p of pairs) {
      const r = await applyPair(p, t);
      if (r.skipped) { skipped.push({ ...p, why: r.skipped }); console.log(`건너뜀 ${p.loser} → ${p.winner}${p.note ? ` (${p.note})` : ''}: ${r.skipped}`); continue; }
      applied.push(r.rec);
      const c = r.rec.cost;
      console.log(`합침 ${p.loser} → ${p.winner}${p.note ? ` (${p.note})` : ''}: 레시피 ${r.rec.movedRecipeLineIds.length}줄 · 연결 ${r.rec.movedLinkIds.length} · 새 출처 연결 ${r.rec.createdLinkId ? 1 : 0}`
        + `${r.rec.unitInherited ? ' · 단위 물려받음' : ''} · 원가 ${c.loser} → ${c.winnerAfter} (남는 줄 전 ${c.winnerBefore}, ${c.recompute})`
        + `${r.rec.piDeactivated ? ` · 재고아이템 PI#${r.rec.piDeactivated} 비활성` : ''}${r.rec.piKept ? ` · ${r.rec.piKept}` : ''}`);
    }
    console.log(`\n합침 ${applied.length} · 건너뜀 ${skipped.length}${APPLY ? '' : ' — 드라이런(롤백)'}`);
    if (APPLY) {
      // 영수증을 **커밋 전에** 쓴다 — 못 쓰면 되돌릴 근거가 없으니 적용도 하지 않는다(K-Bulgogi 스크립트와 같은 규칙 · 2026-10-11 Fable 게이트).
      fs.mkdirSync(RECEIPT_DIR, { recursive: true });
      const file = path.join(RECEIPT_DIR, `brand-mirror-pairs-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
      fs.writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), pairs, applied, skipped }, null, 2));
      try { await t.commit(); } catch (e) { fs.unlinkSync(file); throw e; }
      console.log(`영수증: ${file}  (되돌리기: --undo=${file} --apply)`);
    } else await t.rollback();
    process.exit(0);
  } catch (e) {
    if (!t.finished) await t.rollback();
    console.error('실패 — 전부 롤백:', e.message);
    process.exit(1);
  }
})();
