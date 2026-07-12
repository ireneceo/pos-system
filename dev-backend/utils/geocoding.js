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

// 일시적 실패(429 rate limit / 5xx / 네트워크)는 재시도한다.
// 예전엔 !res.ok 를 그냥 null 로 삼켜서, 여러 건을 연달아 지오코딩하면 Nominatim 이 제한을
// 걸었을 때 "주소를 못 찾음"과 구분되지 않은 채 전부 실패했다 (2026-07-12 좌표 백필에서 발견).
const MAX_RETRY = 3;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocodeAddress(parts) {
  const q = buildQuery(parts || {});
  if (!q) return null;

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;

  for (let attempt = 1; attempt <= MAX_RETRY; attempt += 1) {
    await throttle();
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'PurpleHere-POS/1.0 (contact@purplehere.com)' }
      });

      if (!res.ok) {
        // 429(제한) · 5xx(일시장애) 는 물러섰다 재시도. 그 외 4xx 는 요청 자체가 잘못된 것.
        const retriable = res.status === 429 || res.status >= 500;
        if (retriable && attempt < MAX_RETRY) {
          await sleep(1000 * attempt * 2);
          continue;
        }
        console.warn(`[geocoding] HTTP ${res.status} for "${q}"`);
        return null;
      }

      const arr = await res.json();
      if (!Array.isArray(arr) || arr.length === 0) return null; // 주소를 못 찾음 = 재시도해도 같다
      const hit = arr[0];
      const latitude = parseFloat(hit.lat);
      const longitude = parseFloat(hit.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
      return { latitude, longitude, displayName: hit.display_name };
    } catch (e) {
      if (attempt < MAX_RETRY) { await sleep(1000 * attempt * 2); continue; }
      console.warn('[geocoding] failed:', e.message);
      return null;
    }
  }
  return null;
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
