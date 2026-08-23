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
 *   메일(`system_health`)은 **발견될 때마다가 아니라** 지난 실행과 달라졌을 때만 나간다
 *   (처음 보는 칸 / 눈에 띄게 커진 칸). 같은 상태의 반복 알림은 무시를 학습시켜
 *   진짜 심각한 건까지 흘려보게 만든다 — 2026-08-23 Irene 지적으로 변경. `buildReport()` 참조.
 */
const cron = require('node-cron');
const { Op } = require('sequelize');
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

// ── 알림 판정 (2026-08-23) ────────────────────────────────────────────────
// 이전에는 "발견되면 무조건 메일"이었다. 그 결과 같은 내용이 매주 왔고,
// 제목이 원인 크기(0.14MB)만 말해서 사소해 보였다 — 정작 그 값이 인보이스 목록
// 응답을 0.17MB → 9.86MB 로 부풀리고 있었는데도. Irene 지적: "굳이 문제없는데 왜
// 보고해?" 반복 알림은 진짜 심각한 건이 왔을 때도 흘려보게 만든다.
// 그래서: ①처음 보거나 눈에 띄게 커졌을 때만 메일 ②나머지는 SchedulerRun 에 기록만
// ③제목·본문이 "무엇이 고장났나"가 아니라 "무엇을 정리해야 하나"를 말하게 한다.

// scripts/migrate-base64-images.js 가 실제로 다루는 컬럼 (스크립트 실측 기준).
// 스크립트에 컬럼을 추가하면 여기도 같이 늘린다 — 안 그러면 메일이 듣지도 않는
// 해결책을 안내하게 된다(이 목록이 없던 2026-08-23 이전이 그랬다).
const SCRIPT_COVERED = new Set(['ingredients.image_url', 'company_settings.og_image_url']);

// "이 컬럼 값이 응답에서 몇 배로 불어나는가" — 손으로 확인한 것만 적는다.
// 스윕은 응답 모양을 모르므로 자동 계산이 불가능하다. 확인 안 된 컬럼은 일반 문구.
const IMPACT_NOTES = {
  'company_settings.company_logo':
    '인보이스 목록 응답에 <b>송장 한 줄마다</b> 복제됩니다. 2026-08-23 실측: 송장 91건 기준 응답 0.17MB → 9.86MB(57배). 매장 인보이스 화면은 매장당 최대 10건 기준 약 1.1MB.'
};

const KB = 1024;
const NOTIFY_FLOOR_BYTES = 64 * KB;  // 이보다 작으면 새로 생겨도 메일 안 보냄 (기록만)
const REGROW_BYTES = 256 * KB;       // 이미 아는 항목이 이만큼 커지면 다시 알림
const REGROW_RATIO = 1.2;            // 또는 20% 이상 커지면

const keyOf = f => `${f.table}.${f.column}`;

function fmtBytes(n) {
  if (n >= KB * KB) return `${(n / KB / KB).toFixed(2)}MB`;
  if (n >= KB) return `${Math.round(n / KB)}KB`;
  return `${n}B`;
}

/**
 * 지난 성공 실행과 비교해 메일을 보낼 값어치가 있는지 판정하고, 보낼 문안을 만든다.
 * 순수 함수 — DB 도 메일도 건드리지 않는다(그래서 실제 발송 없이 검증할 수 있다).
 */
function buildReport(findings, previousFindings = []) {
  if (!findings || findings.length === 0) {
    return { shouldNotify: false, reason: 'no_findings', subject: null, html: null };
  }

  const prevByKey = new Map((previousFindings || []).map(f => [keyOf(f), f]));
  const fresh = [];   // 처음 보는 칸
  const grown = [];   // 알던 칸인데 눈에 띄게 커진 것
  for (const f of findings) {
    const prev = prevByKey.get(keyOf(f));
    if (!prev) {
      if (f.total_bytes >= NOTIFY_FLOOR_BYTES) fresh.push(f);
      continue;
    }
    const delta = f.total_bytes - (prev.total_bytes || 0);
    if (delta >= REGROW_BYTES || (prev.total_bytes > 0 && f.total_bytes / prev.total_bytes >= REGROW_RATIO)) {
      grown.push({ ...f, prev_bytes: prev.total_bytes || 0 });
    }
  }

  const changed = [...fresh, ...grown];
  if (changed.length === 0) {
    // 지난주와 같다 = 이미 알고 있는 것. 기록만 남기고 조용히 넘어간다.
    return { shouldNotify: false, reason: 'unchanged_since_last_run', subject: null, html: null };
  }

  const biggest = findings.reduce((a, b) => (b.total_bytes > a.total_bytes ? b : a));
  const uncovered = findings.filter(f => !SCRIPT_COVERED.has(keyOf(f)));
  const covered = findings.filter(f => SCRIPT_COVERED.has(keyOf(f)));

  const subject = `[점검] 그림이 파일 대신 DB 에 저장된 칸 ${findings.length}개 (가장 큰 것 ${fmtBytes(biggest.total_bytes)}) — 정리 필요, 고장 아님`;

  const list = findings.map(f => {
    const k = keyOf(f);
    const isNew = fresh.some(x => keyOf(x) === k);
    const g = grown.find(x => keyOf(x) === k);
    let tag = '';
    if (isNew) tag = ' <b>[새로 생김]</b>';
    else if (g) tag = ` <b>[커짐: ${fmtBytes(g.prev_bytes)} → ${fmtBytes(f.total_bytes)}]</b>`;
    const impact = IMPACT_NOTES[k]
      ? `<br><span style="color:#B45309">영향: ${IMPACT_NOTES[k]}</span>`
      : '<br><span style="color:#6B7280">영향: 이 칸이 어느 화면에 실리는지는 아직 확인 안 됨.</span>';
    return `<li><code>${k}</code> — ${f.rows}칸, ${fmtBytes(f.total_bytes)}${tag}${impact}</li>`;
  }).join('');

  let howTo = '';
  if (covered.length > 0) {
    howTo += `<p><b>바로 옮길 수 있는 것</b><br>
      <code>node scripts/migrate-base64-images.js</code> 를 돌리면 아래가 파일로 옮겨집니다:
      ${covered.map(f => `<code>${keyOf(f)}</code>`).join(', ')}</p>`;
  }
  if (uncovered.length > 0) {
    howTo += `<p><b>코드를 고쳐야 하는 것</b><br>
      ${uncovered.map(f => `<code>${keyOf(f)}</code>`).join(', ')} 는
      <code>scripts/migrate-base64-images.js</code> 가 <b>다루지 않는 컬럼</b>입니다. 그 스크립트를
      돌려도 이 항목은 그대로입니다. 값을 넣는 저장 경로가 그림을 파일로 안 바꾸고 있다는 뜻이라,
      저장 코드부터 고쳐야 다시 안 쌓입니다.</p>`;
  }

  const html = `
    <h2>DB 안에 그림이 통째로 들어있는 칸을 찾았습니다</h2>
    <p><b>고장난 것도, 지워진 것도 없습니다.</b> 화면에는 정상으로 보입니다. 정리가 안 된 데이터를
    알리는 주간 점검입니다.</p>
    <p>정상이라면 그림은 서버에 파일로 저장하고 DB 에는 <code>/uploads/…</code> 주소 한 줄만 적습니다.
    아래 칸들은 주소 대신 <b>그림 데이터 전체</b>가 글자로 들어있습니다. 그래서 그 칸을 내려보내는
    화면의 응답이 통째로 무거워집니다.</p>
    <ul>${list}</ul>
    ${howTo}
    <p style="color:#6B7280;font-size:13px">이 메일은 <b>처음 발견되거나 눈에 띄게 커졌을 때만</b> 옵니다.
    상태가 그대로면 다시 보내지 않고 점검 기록에만 남깁니다.</p>
  `;

  return {
    shouldNotify: true,
    reason: fresh.length > 0 ? 'new_column' : 'grew',
    changed: changed.map(keyOf),
    subject,
    html
  };
}

/** 지난 성공 실행의 findings 를 가져온다 (없으면 빈 배열 = 전부 처음 보는 것으로 취급). */
async function loadPreviousFindings() {
  try {
    const prev = await SchedulerRun.findOne({
      where: { job_name: 'base64_image_sweep', status: 'success' },
      order: [['id', 'DESC']]
    });
    const r = prev && prev.results;
    return (r && Array.isArray(r.findings)) ? r.findings : [];
  } catch (e) {
    logger.warn('[Base64Sweep] loadPreviousFindings failed:', e.message);
    return [];
  }
}

async function notifyAdmins(report) {
  try {
    // 내부 헬스 알림은 "플랫폼 운영자"에게만. role='System Admin' 이면서 어떤 테넌트에도
    // 묶이지 않은(restaurant/brand/foodcourt/supplier 미할당) 진짜 플랫폼 관리자만 수신.
    // → 잘못 부여된 테넌트 계정(매장 admin 등)에 base64 sweep 메일이 새는 것을 차단
    //   (2026-06-21 운영 피드백 R2-②: "System Admin 채널 전용, 매장 인박스 차단").
    const admins = await User.findAll({
      where: {
        role: 'System Admin',
        restaurant_id: { [Op.is]: null },
        brand_id: { [Op.is]: null },
        foodcourt_id: { [Op.is]: null },
        supplier_company_id: { [Op.is]: null }
      },
      attributes: ['id', 'email']
    });
    if (admins.length === 0) return 0;
    const html = emailLayout(report.html);
    let sent = 0;
    for (const admin of admins) {
      try {
        await sendNotification(admin.id, 'system_health', { subject: report.subject, html });
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
  // 지난 '성공' 실행의 findings 를 먼저 읽는다 — 이번 실행 행은 아직 running 이라 안 걸린다.
  const previousFindings = await loadPreviousFindings();
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

    // 발견 여부가 아니라 "지난주와 달라졌는가"로 발송을 정한다 (2026-08-23).
    const report = buildReport(findings, previousFindings);
    let adminsNotified = 0;
    if (notify && report.shouldNotify) {
      adminsNotified = await notifyAdmins(report);
    }

    const summary = {
      columns_scanned: columns.length,
      columns_with_findings: findings.length,
      total_rows: totalRows,
      total_bytes: totalBytes,
      notified: report.shouldNotify,
      notify_reason: report.reason,
      changed_columns: report.changed || [],
      admins_notified: adminsNotified,
      findings
    };
    logger.info(`[Base64Sweep] scanned ${columns.length} columns — ${totalRows} inline base64 rows (${(totalBytes / 1024 / 1024).toFixed(2)} MB), notify=${report.reason}`);

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

module.exports = { start, runSweep, discoverColumns, buildReport, loadPreviousFindings };
