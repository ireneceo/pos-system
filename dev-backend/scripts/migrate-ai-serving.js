/**
 * Migration: AI Serve Camera (Track B, B1) — 신규 테이블 2 + plan_templates id=3 모듈 append.
 *
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-3 / §3.1 / §3.2 / §3.4.
 *
 * 안전:
 *   - CREATE TABLE IF NOT EXISTS ×2 (기존 orders/products/settings 무접촉) + plan id=3 included_modules append(멱등).
 *   - id=1 basic / id=2 professional 무접촉.
 *   - 원본 사진 저장 컬럼 없음(결정 #1 — recognition_logs 는 텍스트만).
 *   - sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *   - 롤백 = DROP TABLE 2개 + included_modules 에서 'ai_serving' 제거.
 *
 * 사용: node scripts/migrate-ai-serving.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-ai-serving] Starting...');

    // 1) menu_reference_photos — 메뉴별 레퍼런스 사진 + 임베딩 (§3.1)
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS menu_reference_photos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        product_id INT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        thumbnail_url VARCHAR(500) NULL,
        source ENUM('menu_image','staff_upload') NOT NULL,
        embedding JSON NULL,
        embedding_model VARCHAR(60) NULL,
        embedding_dim SMALLINT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_by INT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_mrp_product_image (product_id, image_url),
        KEY idx_mrp_restaurant (restaurant_id),
        KEY idx_mrp_product (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('  ✓ menu_reference_photos ready');

    // 2) recognition_logs — 인식 시도 기록 (텍스트만, 원본 사진 컬럼 없음 §3.2)
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS recognition_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        staff_user_id INT NULL,
        query_embedding JSON NULL,
        candidates JSON NOT NULL,
        top_product_id INT NULL,
        top_confidence DECIMAL(5,4) NULL,
        mode ENUM('auto','recommend','pick','reshoot','fallback','no_candidates') NOT NULL,
        decision ENUM('auto_confirmed','recommend_confirmed','picked_other','manual','reshoot','abandoned') NULL,
        chosen_order_id INT NULL,
        chosen_item_index SMALLINT NULL,
        chosen_product_id INT NULL,
        was_top1_correct TINYINT(1) NULL,
        provider VARCHAR(30) NOT NULL,
        latency_ms SMALLINT UNSIGNED NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_rl_restaurant_created (restaurant_id, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('  ✓ recognition_logs ready');

    // 3) plan_templates id=3 (enterprise) included_modules 에 'ai_serving' append (멱등).
    const [rows] = await sequelize.query("SELECT id, name, included_modules FROM plan_templates WHERE id = 3");
    if (!rows.length) {
      console.log('  ⚠ plan_templates id=3 없음 — 모듈 시드 skip (게이팅은 requireModule 데모 bypass 로 동작)');
    } else {
      let mods = rows[0].included_modules;
      if (typeof mods === 'string') { try { mods = JSON.parse(mods); } catch { mods = []; } }
      if (!Array.isArray(mods)) mods = [];
      if (mods.includes('ai_serving')) {
        console.log(`  ✓ plan_templates id=3 (${rows[0].name}) 이미 ai_serving 포함`);
      } else {
        mods.push('ai_serving');
        await sequelize.query(
          "UPDATE plan_templates SET included_modules = :m WHERE id = 3",
          { replacements: { m: JSON.stringify(mods) } }
        );
        console.log(`  ✓ plan_templates id=3 (${rows[0].name}) included_modules 에 ai_serving append (총 ${mods.length})`);
      }
    }

    console.log('[migrate-ai-serving] Done.');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
