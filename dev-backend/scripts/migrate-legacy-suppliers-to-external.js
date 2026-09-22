#!/usr/bin/env node
/**
 * 남은 예전 방식 공급업체(«OWN», `suppliers`)를 외부 공급업체(«EXTERNAL», `supplier_companies` + 계약)로 연결 — 멱등
 * (2026-09-21 Irene 「OWN이 왜있냐고」 → 「응」: 새로 추가는 EXTERNAL, 이미 OWN 인 것은 EXTERNAL 로 옮긴다)
 * 2026-09-22: 브랜드 소유도 포함 — 브랜드 업체는 비공유(shared_with_stores=false)로 만들어 매장에 안 퍼진다.
 *
 * 연결 규칙은 «Products» 버튼과 **같은 함수** `utils/legacySupplierBridge.bridgeLegacySupplier`:
 *   이미 연결 → 건너뜀 / 같은 구매자·같은 이름의 외부 공급업체가 있으면 거기에 연결(새로 안 만듦) / 없으면 새로 + 활성 계약.
 * 레거시 행은 지우지 않는다(옛 재고 FK 유지) — `supplier_company_id` 가 채워지면 화면이 OWN 카드를 숨기고 EXTERNAL 로 보여준다.
 * 비활성(is_active=0) 레거시는 옮기지 않는다 — 끈 업체를 되살리지 않는다.
 * 주인을 알 수 없는 행(브랜드 행인데 brand_id·소유 BG 의 배정 브랜드가 둘 다 없음)은 건너뛰고 목록으로 남긴다.
 *
 * 사용:  node scripts/migrate-legacy-suppliers-to-external.js           # 적용
 *        node scripts/migrate-legacy-suppliers-to-external.js --dry-run # 대상만 출력
 * 레지스트리: deploy (매 배포 멱등 — 옮길 게 없으면 0건)
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { Supplier, User } = require('../models');
const { legacyOwnerEntity, bridgeLegacySupplier } = require('../utils/legacySupplierBridge');

async function main() {
  const dry = process.argv.includes('--dry-run');
  // 브랜드 행도 옮긴다 — 만들어지는 외부 업체는 shared_with_stores=false 라 매장에 퍼지지 않는다(2026-09-22).
  //   (이 칸은 migrate-add-supplier-company-shared.js 가 먼저 만든다 — 파일명 순서로 앞에 돈다)
  const rows = await Supplier.findAll({ where: { supplier_company_id: null, is_active: true }, order: [['id', 'ASC']] });
  const admin = await User.findOne({ where: { role: 'System Admin' }, attributes: ['id'], order: [['id', 'ASC']] });

  let bridged = 0, reused = 0, skipped = 0;
  for (const legacy of rows) {
    const entity = await legacyOwnerEntity(legacy);
    if (!entity) {
      skipped++;
      console.log(`  - 건너뜀 #${legacy.id} «${legacy.name}» (${legacy.owner_type}) — 주인 구매자를 정할 수 없음`);
      continue;
    }
    if (dry) {
      console.log(`  · 대상 #${legacy.id} «${legacy.name}» → ${entity.type} ${entity.id}`);
      continue;
    }
    const userId = legacy.owner_user_id || (admin && admin.id);
    const t = await sequelize.transaction();
    try {
      const r = await bridgeLegacySupplier(legacy, entity, { userId, transaction: t });
      await t.commit();
      if (r.bridged) { bridged++; if (r.reused) reused++; }
      console.log(`  ✓ #${legacy.id} «${legacy.name}» → supplier_company ${r.supplier_company_id}${r.reused ? ' (같은 이름 기존 업체에 연결)' : ''}`);
    } catch (e) {
      await t.rollback();
      skipped++;
      console.log(`  ✗ #${legacy.id} «${legacy.name}» 실패: ${e.message}`);
    }
  }
  console.log(`[migrate-legacy-suppliers-to-external] 대상 ${rows.length} · 연결 ${bridged}(기존 업체 재사용 ${reused}) · 건너뜀 ${skipped}${dry ? ' · DRY-RUN' : ''}`);
}

main()
  .then(() => sequelize.close().finally(() => process.exit(0)))
  .catch((e) => { console.error('[migrate-legacy-suppliers-to-external] 실패:', e.message); sequelize.close().finally(() => process.exit(1)); });
