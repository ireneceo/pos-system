/**
 * Manual ad-hoc run of the base64 image sweep.
 *
 * Usage:
 *   node scripts/run-base64-image-sweep.js              # scan + notify admins
 *   node scripts/run-base64-image-sweep.js --no-notify  # scan only, no email
 *
 * The same routine runs weekly via base64ImageSweep.start() (Sundays 04:00 UTC).
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');
const { runSweep } = require('../services/base64ImageSweep');

(async () => {
  const notify = !process.argv.includes('--no-notify');
  try {
    const result = await runSweep({ notify });
    console.log('\n=== sweep result ===');
    console.log(JSON.stringify({
      success: result.success,
      columns_scanned: result.columns_scanned,
      columns_with_findings: result.columns_with_findings,
      total_rows: result.total_rows,
      total_bytes: result.total_bytes,
      admins_notified: result.admins_notified
    }, null, 2));
    if (result.findings && result.findings.length > 0) {
      console.log('\nFindings:');
      for (const f of result.findings) {
        console.log(`  ${f.table}.${f.column} — ${f.rows} row(s), ${(f.total_bytes / 1024).toFixed(0)} KB`);
        f.samples.forEach(s => console.log(`    id=${s.id} bytes=${s.bytes}`));
      }
    }
    await sequelize.close();
    process.exit(result.success ? 0 : 1);
  } catch (e) {
    console.error('Sweep failed:', e);
    await sequelize.close();
    process.exit(1);
  }
})();
