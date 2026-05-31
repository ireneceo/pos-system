/**
 * Weekly sweep for base64 inline images in DB image/logo columns.
 *
 * Why: v3.30 incident — `ingredients.image_url` had base64 PNGs inline (1.5MB each),
 * blowing up the IngredientsPage list payload to 3.15 MB (425× larger than needed).
 * Backend POST/PUT routes now normalize incoming base64 to disk via
 * `normalizeIngredientImage`, but a sweep is still needed because:
 *   (a) new image columns added in the future may bypass the guard
 *   (b) bulk imports / migrations / manual SQL can reintroduce inline base64
 *   (c) we want early detection rather than a perf incident
 *
 * Auto-discovers columns via INFORMATION_SCHEMA — any future TEXT/MEDIUMTEXT/
 * LONGTEXT/VARCHAR column whose name contains `image`/`logo`/`avatar`/`favicon`/
 * `photo`/`picture`/`og_image` is included without code change.
 *
 * Output: SchedulerRun.results contains aggregate counts + sample rows.
 *   On any detection: a `system_health` notification fires to System Admins.
 */
const cron = require('node-cron');
const { sequelize } = require('../config/database');
const { SchedulerRun, User } = require('../models');
const { sendNotification } = require('../utils/notificationService');
const { emailLayout } = require('../utils/emailTemplates'); // emailLayout lives in emailTemplates, not notificationTemplates (was: "emailLayout is not a function")
const logger = require('../utils/logger');

const NAME_PATTERNS = ['%image%', '%logo%', '%avatar%', '%favicon%', '%photo%', '%picture%', '%og_image%'];

async function discoverColumns() {
  const conditions = NAME_PATTERNS.map(() => 'COLUMN_NAME LIKE ?').join(' OR ');
  const [rows] = await sequelize.query(
    `SELECT TABLE_NAME, COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND DATA_TYPE IN ('text','mediumtext','longtext','varchar')
       AND (${conditions})
     ORDER BY TABLE_NAME, COLUMN_NAME`,
    { replacements: NAME_PATTERNS }
  );
  return rows.map(r => ({ table: r.TABLE_NAME, column: r.COLUMN_NAME }));
}

async function scanColumn({ table, column }, sampleLimit = 3) {
  // LEFT 24 chars is enough to detect `data:image/...;base64,` prefix without
  // pulling multi-MB blobs into memory. SIZE = total bytes if found.
  const [rows] = await sequelize.query(
    `SELECT id, LENGTH(\`${column}\`) AS sz
     FROM \`${table}\`
     WHERE LEFT(\`${column}\`, 11) = 'data:image/'
     ORDER BY sz DESC
     LIMIT ?`,
    { replacements: [sampleLimit + 1] }
  );
  if (rows.length === 0) return null;
  const [[{ total, total_bytes }]] = await sequelize.query(
    `SELECT COUNT(*) AS total, COALESCE(SUM(LENGTH(\`${column}\`)), 0) AS total_bytes
     FROM \`${table}\`
     WHERE LEFT(\`${column}\`, 11) = 'data:image/'`
  );
  return {
    table, column,
    rows: Number(total),
    total_bytes: Number(total_bytes),
    samples: rows.slice(0, sampleLimit).map(r => ({ id: r.id, bytes: Number(r.sz) }))
  };
}

async function notifyAdmins(findings) {
  try {
    const admins = await User.findAll({ where: { role: 'System Admin' }, attributes: ['id', 'email'] });
    if (admins.length === 0) return 0;
    const totalRows = findings.reduce((s, f) => s + f.rows, 0);
    const totalMB = (findings.reduce((s, f) => s + f.total_bytes, 0) / 1024 / 1024).toFixed(2);
    const subject = `[Health] base64 inline images detected (${totalRows} row${totalRows === 1 ? '' : 's'}, ${totalMB} MB)`;
    const list = findings
      .map(f => `<li><code>${f.table}.${f.column}</code> — ${f.rows} row${f.rows === 1 ? '' : 's'}, ${(f.total_bytes / 1024).toFixed(0)} KB</li>`)
      .join('');
    const bodyContent = `
      <h2>Base64 inline images detected</h2>
      <p>The weekly sweep found image data stored inline in DB columns. These should be
      migrated to disk (see <code>utils/imageProcessor.saveImageToFile</code>) to avoid
      page-load regressions like the v3.30 IngredientsPage incident.</p>
      <ul>${list}</ul>
      <p>Run <code>node scripts/migrate-base64-images.js</code> to migrate, then verify
      the affected page payloads shrink.</p>
    `;
    const html = emailLayout(bodyContent);
    let sent = 0;
    for (const admin of admins) {
      try {
        await sendNotification(admin.id, 'system_health', { subject, html });
        sent++;
      } catch (e) {
        logger.warn(`[Base64Sweep] notify admin ${admin.id} failed:`, e.message);
      }
    }
    return sent;
  } catch (e) {
    logger.warn('[Base64Sweep] notifyAdmins failed:', e.message);
    return 0;
  }
}

async function runSweep({ notify = true } = {}) {
  let run;
  try {
    run = await SchedulerRun.create({ job_name: 'base64_image_sweep', status: 'running', started_at: new Date() });
  } catch (e) { logger.warn('SchedulerRun.create failed:', e.message); }

  try {
    const columns = await discoverColumns();
    const findings = [];
    for (const c of columns) {
      const f = await scanColumn(c);
      if (f) findings.push(f);
    }
    const totalRows = findings.reduce((s, f) => s + f.rows, 0);
    const totalBytes = findings.reduce((s, f) => s + f.total_bytes, 0);

    let adminsNotified = 0;
    if (notify && findings.length > 0) {
      adminsNotified = await notifyAdmins(findings);
    }

    const summary = {
      columns_scanned: columns.length,
      columns_with_findings: findings.length,
      total_rows: totalRows,
      total_bytes: totalBytes,
      admins_notified: adminsNotified,
      findings
    };
    logger.info(`[Base64Sweep] scanned ${columns.length} columns — ${totalRows} inline base64 rows (${(totalBytes / 1024 / 1024).toFixed(2)} MB)`);

    if (run) await run.update({ status: 'success', finished_at: new Date(), results: summary });
    return { success: true, ...summary };
  } catch (err) {
    logger.error('[Base64Sweep] failed:', err.message);
    if (run) await run.update({ status: 'error', finished_at: new Date(), error_message: err.message });
    return { success: false, error: err.message };
  }
}

function start() {
  // 매주 일요일 04:00 UTC — invoice/SOA scheduler 가 끝나고 트래픽 낮은 시간대.
  cron.schedule('0 4 * * 0', () => { runSweep(); });
  logger.info('Base64 image sweep scheduler started — runs Sundays at 04:00 UTC');
}

module.exports = { start, runSweep, discoverColumns };
