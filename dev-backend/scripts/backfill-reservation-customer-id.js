/**
 * Backfill: Reservation.customer_id NULL → RestaurantCustomer.id 복구
 *
 * 대상: source='customer_mobile' AND customer_id IS NULL
 *   — Customer JWT 로 등록된 예약인데 RestaurantCustomer FK 가 비어 있어
 *     본인 /me 에서 안 보이고 취소도 불가능한 R1 손상 데이터.
 *
 * staff_phone/staff_walkin 등 guest reservation 은 정당하게 NULL (건드리지 않음).
 *
 * 매칭 전략:
 *   1) Customer.phone === reservation.guest_phone (정확 일치)
 *   2) 해당 (restaurant_id, Customer.id) 의 RestaurantCustomer findOrCreate
 *   3) reservation.customer_id 업데이트 + RestaurantCustomer.reservation_count 증가
 *
 * Usage:
 *   node scripts/backfill-reservation-customer-id.js --dry-run    # 미리보기
 *   node scripts/backfill-reservation-customer-id.js              # 실제 적용
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const Reservation = require('../models/Reservation');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const Customer = require('../models/Customer');

const DRY_RUN = process.argv.includes('--dry-run');

(async () => {
  await sequelize.authenticate();

  const damaged = await Reservation.findAll({
    where: { customer_id: null, source: 'customer_mobile' },
    order: [['id', 'ASC']]
  });

  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN (no changes)' : 'APPLY'}`);
  console.log(`Damaged reservations (source=customer_mobile, customer_id NULL): ${damaged.length}`);

  if (!damaged.length) {
    console.log('Nothing to backfill.');
    process.exit(0);
  }

  let matched = 0, recovered = 0, unmatched = 0;

  for (const r of damaged) {
    // Customer.phone 정확 일치로 신원 확인
    const customer = await Customer.findOne({ where: { phone: r.guest_phone } });
    if (!customer) {
      console.log(`  [unmatched] reservation ${r.id} — no Customer with phone ${r.guest_phone}`);
      unmatched++;
      continue;
    }
    matched++;

    if (DRY_RUN) {
      console.log(`  [would-fix] reservation ${r.id} → Customer.id=${customer.id} (phone=${r.guest_phone})`);
      continue;
    }

    // 트랜잭션: RestaurantCustomer 확보 + reservation 업데이트 + count 증가
    await sequelize.transaction(async (t) => {
      const [rc, created] = await RestaurantCustomer.findOrCreate({
        where: { restaurant_id: r.restaurant_id, customer_id: customer.id },
        defaults: { restaurant_id: r.restaurant_id, customer_id: customer.id },
        transaction: t
      });

      await r.update({ customer_id: rc.id }, { transaction: t });
      await rc.increment('reservation_count', { by: 1, transaction: t });

      console.log(`  [fixed] reservation ${r.id} → RestaurantCustomer.id=${rc.id} (${created ? 'created' : 'existing'})`);
    });
    recovered++;
  }

  console.log('\n========================================');
  console.log(`Total damaged: ${damaged.length}`);
  console.log(`Matched by phone: ${matched}`);
  console.log(`${DRY_RUN ? 'Would recover' : 'Recovered'}: ${DRY_RUN ? matched : recovered}`);
  console.log(`Unmatched (no Customer record): ${unmatched}`);
  console.log('========================================');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
