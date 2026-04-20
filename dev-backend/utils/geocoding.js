// Geocoding via Nominatim (OpenStreetMap). Free tier: 1 req/sec.
// Usage:
//   const { geocodeAddress } = require('./utils/geocoding');
//   const { latitude, longitude } = await geocodeAddress({ address, city, state, country });
// Returns { latitude, longitude } or null on failure.

let lastCallAt = 0;
const MIN_INTERVAL_MS = 1100; // Respect Nominatim 1 req/sec policy

const throttle = async () => {
  const now = Date.now();
  const wait = Math.max(0, lastCallAt + MIN_INTERVAL_MS - now);
  if (wait > 0) await new Promise(r => setTimeout(r, wait));
  lastCallAt = Date.now();
};

const buildQuery = (parts) => {
  return [parts.address, parts.city, parts.state, parts.postal_code, parts.country]
    .filter(p => p && String(p).trim())
    .join(', ');
};

async function geocodeAddress(parts) {
  const q = buildQuery(parts || {});
  if (!q) return null;

  await throttle();
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'PurpleHere-POS/1.0 (contact@purplehere.com)' }
    });
    if (!res.ok) return null;
    const arr = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const hit = arr[0];
    const latitude = parseFloat(hit.lat);
    const longitude = parseFloat(hit.lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return { latitude, longitude, displayName: hit.display_name };
  } catch (e) {
    console.warn('[geocoding] failed:', e.message);
    return null;
  }
}

// Determine whether the geocoding-relevant address fields changed
function addressChanged(oldValues, newValues) {
  const keys = ['address', 'city', 'state', 'postal_code', 'country'];
  for (const k of keys) {
    if (newValues[k] !== undefined && newValues[k] !== oldValues[k]) return true;
  }
  return false;
}

module.exports = { geocodeAddress, addressChanged };
