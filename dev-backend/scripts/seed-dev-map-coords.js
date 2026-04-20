// Dev-only: seed realistic KL/Malaysia coordinates to Restaurants and FoodcourtBranches
// so the maps actually show pins. Idempotent — only fills where latitude/longitude is null.

const { Restaurant, FoodcourtBranch } = require('../models');

// Realistic Klang Valley / Malaysia mall & district coords
const KL_SPREAD = [
  { name: 'Pavilion KL',      lat: 3.1496, lng: 101.7134, city: 'Kuala Lumpur', state: 'KL' },
  { name: 'Suria KLCC',       lat: 3.1578, lng: 101.7133, city: 'Kuala Lumpur', state: 'KL' },
  { name: 'Mid Valley',       lat: 3.1179, lng: 101.6776, city: 'Kuala Lumpur', state: 'KL' },
  { name: 'Sunway Pyramid',   lat: 3.0726, lng: 101.6066, city: 'Subang Jaya',  state: 'Selangor' },
  { name: '1 Utama',          lat: 3.1500, lng: 101.6160, city: 'Petaling Jaya',state: 'Selangor' },
  { name: 'The Gardens Mall', lat: 3.1183, lng: 101.6775, city: 'Kuala Lumpur', state: 'KL' },
  { name: 'IOI City Mall',    lat: 2.9680, lng: 101.7128, city: 'Putrajaya',    state: 'Selangor' },
  { name: 'Berjaya Times Sq', lat: 3.1425, lng: 101.7108, city: 'Kuala Lumpur', state: 'KL' },
  { name: 'Gurney Plaza',     lat: 5.4374, lng: 100.3099, city: 'George Town',  state: 'Penang' },
  { name: 'Ipoh Parade',      lat: 4.5975, lng: 101.0901, city: 'Ipoh',         state: 'Perak' },
  { name: 'JB City Square',   lat: 1.4635, lng: 103.7633, city: 'Johor Bahru',  state: 'Johor' },
  { name: 'AEON Bukit Tinggi',lat: 2.9955, lng: 101.4885, city: 'Klang',        state: 'Selangor' }
];

(async () => {
  console.log('[1/2] Seeding Restaurant coordinates');
  const restaurants = await Restaurant.findAll({
    where: { latitude: null },
    attributes: ['id', 'name', 'brand_id', 'foodcourt_id']
  });
  console.log(`  targets: ${restaurants.length}`);
  let i = 0;
  for (const r of restaurants) {
    // Pick a spread point + tiny jitter so pins don't stack exactly
    const base = KL_SPREAD[i % KL_SPREAD.length];
    const jitterLat = (Math.random() - 0.5) * 0.01; // ±~500m
    const jitterLng = (Math.random() - 0.5) * 0.01;
    await r.update({
      latitude: +(base.lat + jitterLat).toFixed(6),
      longitude: +(base.lng + jitterLng).toFixed(6)
    });
    console.log(`  ✓ [${r.id}] ${r.name} → ${base.name}`);
    i++;
  }

  console.log('[2/2] Seeding FoodcourtBranch coordinates');
  const branches = await FoodcourtBranch.findAll({
    where: { latitude: null },
    attributes: ['id', 'name', 'code', 'foodcourt_id']
  });
  console.log(`  targets: ${branches.length}`);
  let j = 0;
  for (const b of branches) {
    const base = KL_SPREAD[(j * 3) % KL_SPREAD.length]; // spread more
    const jitterLat = (Math.random() - 0.5) * 0.01;
    const jitterLng = (Math.random() - 0.5) * 0.01;
    await b.update({
      latitude: +(base.lat + jitterLat).toFixed(6),
      longitude: +(base.lng + jitterLng).toFixed(6),
      address: b.address || `${base.name} area`,
      city: b.city || base.city,
      state: b.state || base.state,
      country: b.country || 'MY'
    });
    console.log(`  ✓ [${b.id}] ${b.name} (${b.code}) → ${base.name}`);
    j++;
  }

  console.log('Done.');
  process.exit(0);
})();
