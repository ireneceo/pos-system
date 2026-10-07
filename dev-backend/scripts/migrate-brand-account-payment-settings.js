/**
 * 판매자 결제 설정 = 계정(회사) 하나 — 같은 주인 브랜드들의 계정 칸 정렬 (2026-10-07 Fable 판정
 * `.claude/fable-verdict-20261007-payment-settings-account.md` §3)
 *
 * 설정 화면은 지금까지 주인의 기본 브랜드(users.brand_id) 행에만 저장했다. 그 값이 사용자 의도이므로
 * 같은 주인의 다른 브랜드 행을 그 값으로 맞춘다(utils/brandAccountSettings ACCOUNT_LEVEL_FIELDS 6칸, NULL 도 NULL 로).
 *   - 기준 = 주인 users.brand_id 행 · 그게 형제 밖이면 값 있는 행이 하나(또는 전부 같을 때)만 기준
 *   - 값 있는 행이 둘 이상이고 서로 다르면 건드리지 않고 보고만
 *   - 삭제 없음 · 다른 칸 무접촉
 * 탐지 조건은 인스펙션 brand-account-settings 와 같은 함수(findAccountDrift).
 *
 * 성질: 멱등(맞춰진 뒤 재실행 0건) · 트랜잭션 · deploy 등록(매 배포 자가치유).
 * 사용: node scripts/migrate-brand-account-payment-settings.js [--dry-run]
 * 되돌리기: 실행 전 출력의 «바뀐 형제·칸» 과 배포 DB 백업으로 해당 행 칸 복원.
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { findAccountDrift, makeQuery } = require('../utils/brandAccountSettings');

const DRY = process.argv.includes('--dry-run');
const TAG = '[brand-account-settings]';

async function main() {
  const t = await sequelize.transaction();
  try {
    const { fixable, conflicts } = await findAccountDrift(makeQuery(sequelize, t));
    for (const c of conflicts) {
      console.log(`${TAG} ⚠ owner ${c.owner_id}: 브랜드 ${c.brand_ids.join(',')} 값이 서로 다르고 기준 행 없음 — 건드리지 않음(사람 판단)`);
    }
    let changed = 0;
    for (const f of fixable) {
      console.log(`${TAG} owner ${f.owner_id}: 브랜드 ${f.target_id} ← ${f.source_id} (${f.source_rule}) 칸: ${f.fields.join(', ')}`);
      if (DRY) continue;
      const set = f.fields.map(c => `t.\`${c}\` = s.\`${c}\``).join(', ');
      const [, meta] = await sequelize.query(
        `UPDATE brands t JOIN brands s ON s.id = :src SET ${set} WHERE t.id = :dst AND t.owner_id = s.owner_id`,
        { replacements: { src: f.source_id, dst: f.target_id }, transaction: t }
      );
      const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : meta;
      if (affected !== 1) throw new Error(`브랜드 ${f.target_id} 갱신 영향행 ${affected} (기대 1)`);
      changed += 1;
    }
    if (DRY) { await t.rollback(); console.log(`${TAG} dry-run — 바꿀 형제 ${fixable.length}건 · 보고만 ${conflicts.length}건 (쓰기 없음)`); return; }
    await t.commit();
    console.log(`${TAG} 완료 — 맞춘 형제 ${changed}건 · 보고만 ${conflicts.length}건`);
  } catch (e) {
    await t.rollback().catch(() => {});
    throw e;
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(`${TAG} 실패:`, e.message); process.exit(1); });
