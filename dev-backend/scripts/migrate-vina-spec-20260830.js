/**
 * 1회성 데이터 보정 — VINA 단가표의 규격·단위·주문방식·가격을 supplier_products 에 반영.
 *
 * 왜 마이그레이션인가:
 *   운영 DB 대량 쓰기(174행)가 자동 승인 차단기에 막혀 실행할 수 없었다.
 *   Irene 지시("배포하면서 적용해")에 따라 **배포 경로**로 넣는다 — 우회가 아니라
 *   게이트 9종이 붙은 공식 통로다.
 *
 * ⛔ 재실행 안전 3중:
 *   ① 완료 마커 — 한 번 성공하면 이후 무조건 SKIP.
 *      ⚠ 마커는 **3겹 방어 중 마지막**이다(로그 명료성용). rsync --delete 로 유실돼도
 *        1겹=배포 후 registry `manual` 강등(재실행 자체가 없음) · 2겹=낙관적 가드(전건 스킵)가 막는다.
 *   ② 낙관적 가드 — 현재 DB 값이 계획의 old 와 다르면 그 행만 스킵(사람이 바꾼 값을 덮지 않음).
 *   ③ 건수 상한 — 계획 174행과 다르면 전체 중단.
 *   + 트랜잭션(부분 반영 없음) · 쓰기 전 백업 덤프.
 *
 * ⛔ 계획은 **저장소에 동결**돼 있다(`scripts/data/vina-spec-20260830.json`, sha256 검증).
 *    라이브 재파생 금지 — 파생 시점이 달라지면 반영 내용이 조용히 달라진다.
 *
 * 배포 성공 후 registry 에서 `manual` 로 강등할 것(1회성이므로).
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { sequelize } = require('../config/database');

const PLAN_FILE = path.join(__dirname, 'data', 'vina-spec-20260830.json');
const PLAN_SHA = 'd04475b1257daded185cf2b674fadbac21439a84ce9a698fbc276bb8f4552665';
const EXPECT = 174;

// ⚠ `scripts/data/` 는 배포 rsync --delete 영향권이다 — dev 에 없는 파일은 운영에서 지워진다.
//    마커·백업을 거기 두면 **다음 배포가 롤백 경로를 삭제**한다(2026-08-30 실측).
//    → 트리 밖에 둬야 배포를 넘어 산다. `/var/www/backups/` 는 rsync 대상이 아니고,
//      사람이 복구를 찾을 때 이미 보는 자리다.
const SAFE_DIR = '/var/www/backups/data-migrations';
const MARKER = path.join(SAFE_DIR, '.vina-spec-20260830.applied');

const eqNum = (a, b) => {
  const x = Number(a), y = Number(b);
  if (Number.isFinite(x) && Number.isFinite(y)) return Math.abs(x - y) < 1e-6;
  return String(a ?? '') === String(b ?? '');
};

(async () => {
  try {
    console.log('[migrate-vina-spec-20260830] Starting...');

    // ① 완료 마커
    if (fs.existsSync(MARKER)) {
      console.log(`  ✓ SKIP — 이미 적용됨 (${fs.readFileSync(MARKER, 'utf8').trim()})`);
      process.exit(0);
    }

    // ⛔ fail-silent 금지 — registry 에 **등록된** 마이그이므로 파일 부재는
    //    "이 배포에 없음"이 아니라 **운반 이상**이다. 조용히 성공 종료하면
    //    배포는 성공으로 보이는데 적용은 안 된 상태가 된다([[reference_deploy_gate_fail_loud]]).
    if (!fs.existsSync(PLAN_FILE)) {
      throw new Error('계획 파일 없음 — 등록된 마이그인데 데이터 파일이 운반되지 않았습니다');
    }
    const raw = fs.readFileSync(PLAN_FILE);
    const sha = crypto.createHash('sha256').update(raw).digest('hex');
    if (sha !== PLAN_SHA) {
      throw new Error(`계획 파일 지문 불일치 — 승인된 계획이 아닙니다.\n  기대 ${PLAN_SHA}\n  실제 ${sha}`);
    }
    const { plan } = JSON.parse(raw);

    // ③ 건수 상한
    if (plan.length !== EXPECT) throw new Error(`계획 ${plan.length}건 ≠ 승인 ${EXPECT}건`);
    console.log(`  ✓ 계획 검증: ${plan.length}건 · 지문 일치`);

    const q = async (s, r) => (await sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r }));
    const willWrite = [], skipped = [], missing = [];
    for (const p of plan) {
      const cols = Object.keys(p.sets);
      const [cur] = await q(`SELECT ${cols.join(',')} FROM supplier_products WHERE id=:id`, { id: p.id });
      if (!cur) { missing.push(p); continue; }
      // ② 낙관적 가드
      const bad = cols.filter(c => !eqNum(cur[c], p.sets[c][0]));
      if (bad.length) { skipped.push({ p, why: bad.map(c => `${c}: DB=${cur[c]}≠${p.sets[c][0]}`).join(' / ') }); continue; }
      willWrite.push({ ...p, before: cur });
    }
    console.log(`  계획 ${plan.length} → 쓸 것 ${willWrite.length} · 스킵 ${skipped.length} · 행없음 ${missing.length}`);
    skipped.slice(0, 10).forEach(s => console.log(`    – #${s.p.id} ${s.p.label.slice(0, 36)} — ${s.why}`));

    if (!willWrite.length) {
      fs.mkdirSync(SAFE_DIR, { recursive: true });
      fs.writeFileSync(MARKER, `${new Date().toISOString()} — 쓸 행 0 (이미 반영된 상태)\n`);
      console.log('  ✓ 쓸 행 0 — 마커 기록 후 종료');
      process.exit(0);
    }

    // 백업 덤프
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.mkdirSync(SAFE_DIR, { recursive: true });
    const backup = path.join(SAFE_DIR, `vina-spec-backup-${stamp}.json`);
    fs.writeFileSync(backup, JSON.stringify(willWrite.map(w => ({ id: w.id, before: w.before })), null, 1));
    console.log(`  ✓ 백업 덤프: ${backup} (${willWrite.length}행)`);

    const t = await sequelize.transaction();
    try {
      for (const w of willWrite) {
        const cols = Object.keys(w.sets);
        const sets = cols.map(c => `\`${c}\`=:${c}`).join(', ');
        const rep = { id: w.id }; cols.forEach(c => rep[c] = w.sets[c][1]);
        await sequelize.query(`UPDATE supplier_products SET ${sets} WHERE id=:id`, { replacements: rep, transaction: t });
      }
      await t.commit();
    } catch (e) {
      await t.rollback();
      throw new Error(`쓰기 실패 — 전체 롤백: ${e.message}`);
    }

    // 즉시 검증
    let ok = 0, bad = 0;
    for (const w of willWrite) {
      const cols = Object.keys(w.sets);
      const [cur] = await q(`SELECT ${cols.join(',')} FROM supplier_products WHERE id=:id`, { id: w.id });
      cols.filter(c => !eqNum(cur[c], w.sets[c][1])).length ? bad++ : ok++;
    }
    if (bad) throw new Error(`즉시 검증 불일치 ${bad}건 (백업: ${backup})`);

    fs.writeFileSync(MARKER, `${new Date().toISOString()} — ${willWrite.length}행 반영, 백업 ${path.basename(backup)}\n`);
    console.log(`  ✓ ${willWrite.length}행 반영 · 즉시 검증 일치 ${ok}/불일치 0 · 마커 기록`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
