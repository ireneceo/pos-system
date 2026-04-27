/**
 * Sprint 5 migration — Carrier table + 5 default seeds (MY).
 * Idempotent.
 */
const { sequelize } = require('../config/database');
const { Carrier } = require('../models');

(async () => {
  try {
    await Carrier.sync();
    console.log('✓ carriers table synced');

    const seeds = [
      { code: 'lalamove',     name: 'Lalamove',     tracking_url_template: 'https://www.lalamove.com/en/malaysia/track-order/{tracking_number}', country: 'MY', sort_order: 1 },
      { code: 'grab_express', name: 'Grab Express', tracking_url_template: 'https://www.grab.com/my/express/tracking/?id={tracking_number}',     country: 'MY', sort_order: 2 },
      { code: 'jnt',          name: 'J&T Express',  tracking_url_template: 'https://www.jtexpress.my/index/query/gzquery.html?bills={tracking_number}', country: 'MY', sort_order: 3 },
      { code: 'ninja_van',    name: 'Ninja Van',    tracking_url_template: 'https://www.ninjavan.co/en-my/tracking?id={tracking_number}',          country: 'MY', sort_order: 4 },
      { code: 'pos_laju',     name: 'Pos Laju',     tracking_url_template: 'https://www.tracking.my/pos-malaysia/{tracking_number}',               country: 'MY', sort_order: 5 }
    ];

    for (const s of seeds) {
      const [, created] = await Carrier.findOrCreate({ where: { code: s.code }, defaults: s });
      console.log(`  ${created ? '+' : '·'} ${s.code} (${s.name})`);
    }

    console.log('✓ Sprint 5 migration done');
    process.exit(0);
  } catch (err) {
    console.error('FATAL', err);
    process.exit(1);
  }
})();
