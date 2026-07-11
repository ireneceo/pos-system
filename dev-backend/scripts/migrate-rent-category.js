#!/usr/bin/env node
/**
 * 임대료 인보이스 카테고리(`rent`) 등록 — 멱등.
 *
 * invoices.invoice_category 는 varchar(50) 이고 카테고리 목록의 단일 소스는 invoice_categories
 * 테이블이다 → ALTER 없이 행 추가만으로 신설된다(스키마 변경 0, 롤백 = 행 삭제).
 * 설계: docs/TENANT_RENT_BILLING.md
 */
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');

const CODE = 'rent';

(async () => {
  try {
    const [rows] = await sequelize.query(
      'SELECT id, is_active FROM invoice_categories WHERE code = :code LIMIT 1',
      { replacements: { code: CODE } }
    );

    if (rows.length) {
      // 이미 있으면 비활성 상태만 되살린다(중복 생성 금지 = 멱등)
      if (!rows[0].is_active) {
        await sequelize.query('UPDATE invoice_categories SET is_active = 1 WHERE id = :id', {
          replacements: { id: rows[0].id },
        });
        console.log(`✓ invoice_categories '${CODE}' 재활성화 (id=${rows[0].id})`);
      } else {
        console.log(`✓ invoice_categories '${CODE}' 이미 존재 (id=${rows[0].id}) — 변경 없음`);
      }
      process.exit(0);
    }

    const [maxRows] = await sequelize.query('SELECT COALESCE(MAX(display_order), 0) AS m FROM invoice_categories');
    const order = Number(maxRows[0]?.m || 0) + 1;

    await sequelize.query(
      `INSERT INTO invoice_categories (name, code, description, display_order, is_system, is_active, created_at, updated_at)
       VALUES (:name, :code, :description, :order, 1, 1, NOW(), NOW())`,
      {
        replacements: {
          name: 'Rent',
          code: CODE,
          description: 'Monthly tenant rent (base rent + maintenance fee) issued from an active contract',
          order,
        },
      }
    );
    console.log(`✓ invoice_categories '${CODE}' 생성 (display_order=${order})`);
    process.exit(0);
  } catch (e) {
    console.error('✗ migrate-rent-category 실패:', e.message);
    process.exit(1);
  }
})();
