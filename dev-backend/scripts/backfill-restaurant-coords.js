/**
 * backfill-restaurant-coords — 좌표(latitude/longitude) 없는 매장을 주소로 지오코딩해 채운다.
 *
 * 왜 필요한가: 지오코딩은 매장 **생성 시**(restaurants-crud.js:1171)와 **주소 수정 시**
 * (:1906) 에만 돈다. 그 기능이 생기기 전에 만들어진 매장은 좌표가 영영 null 이라
 * 프랜차이즈 맵/입점 맵이 "no coords" 로 비어 있었다 (운영 22개 중 좌표 2개, 2026-07-12 Irene).
 *
 * 안전성: 좌표가 **없는** 행만 채운다(있으면 건드리지 않음). 주소·이름 등 다른 컬럼 무변경.
 * 재실행 안전(멱등). Nominatim 무료 정책상 1req/sec 스로틀(utils/geocoding 내장).
 *
 * 사용: node scripts/backfill-restaurant-coords.js [--dry]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const Restaurant = require('../models/Restaurant');
const { geocodeAddress } = require('../utils/geocoding');

const DRY = process.argv.includes('--dry');

(async () => {
  try {
    await sequelize.authenticate();

    const targets = await Restaurant.findAll({
      where: { latitude: null },
      attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country']
    });

    if (!targets.length) {
      console.log('✓ 좌표 없는 매장 없음 — skipping');
      console.log('Migration complete — 0 geocoded, 0 failed.');
      process.exit(0);
    }

    console.log(`대상 ${targets.length}개 (좌표 없음)${DRY ? ' — DRY RUN' : ''}`);
    let ok = 0;
    const failed = [];

    for (const r of targets) {
      if (!r.address || !String(r.address).trim()) {
        failed.push(`${r.name} (주소 없음)`);
        continue;
      }
      let coords = await geocodeAddress({
        address: r.address, city: r.city, state: r.state,
        postal_code: r.postal_code, country: r.country
      });

      // 상세 주소(예: "LG1.36A, …")는 지도 데이터에 없을 수 있다. 그럴 때 도시/주 단위로
      // 근사 좌표를 잡는다 — 매장이 지도에서 아예 사라지는 것보다 낫다(대략 위치임을 로그로 남긴다).
      let approx = false;
      if (!coords && (r.city || r.state)) {
        coords = await geocodeAddress({ city: r.city, state: r.state, country: r.country });
        approx = !!coords;
      }

      if (!coords) {
        failed.push(`${r.name} (지오코딩 실패 — 주소를 지도에서 못 찾음)`);
        continue;
      }
      if (!DRY) {
        await r.update({ latitude: coords.latitude, longitude: coords.longitude });
      }
      ok += 1;
      console.log(`✓ ${r.name} → ${coords.latitude}, ${coords.longitude}${approx ? '  (근사: 도시/주 기준)' : ''}`);
    }

    if (failed.length) {
      console.log(`\n미해결 ${failed.length}개 (주소를 보완하면 저장 시 자동 지오코딩됨):`);
      failed.forEach((f) => console.log(`  - ${f}`));
    }
    console.log(`\nMigration complete — ${ok} geocoded, ${failed.length} failed.`);
    process.exit(0);
  } catch (err) {
    console.error('✗ backfill-restaurant-coords failed:', err.message);
    process.exit(1);
  }
})();
