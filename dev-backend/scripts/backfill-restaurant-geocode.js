// One-off script: geocode restaurants that have address but no lat/lng.
// Usage: node scripts/backfill-restaurant-geocode.js [--dry-run] [--limit=N]
// Respects Nominatim 1 req/sec rate limit via geocoding.js throttle.

const { Op } = require('sequelize');
const Restaurant = require('../models/Restaurant');
const { geocodeAddress } = require('../utils/geocoding');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 0;

(async () => {
  const where = {
    [Op.or]: [{ latitude: null }, { longitude: null }],
    address: { [Op.ne]: null }
  };

  const findOpts = { where, attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country'] };
  if (limit > 0) findOpts.limit = limit;

  const targets = await Restaurant.findAll(findOpts);
  console.log(`Targets: ${targets.length}${dryRun ? ' (dry-run)' : ''}`);

  let ok = 0, failed = 0;
  for (const r of targets) {
    const coords = await geocodeAddress({
      address: r.address, city: r.city, state: r.state,
      postal_code: r.postal_code, country: r.country
    });
    if (coords) {
      if (!dryRun) {
        await r.update({ latitude: coords.latitude, longitude: coords.longitude });
      }
      console.log(`✓ [${r.id}] ${r.name} → ${coords.latitude}, ${coords.longitude}`);
      ok++;
    } else {
      console.log(`✗ [${r.id}] ${r.name} — geocode failed (${r.address}, ${r.city})`);
      failed++;
    }
  }

  console.log(`\nDone. ok=${ok} failed=${failed}`);
  process.exit(0);
})();
