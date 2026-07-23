/**
 * ENCRYPTION_KEY 회전 — 기본키(하드코딩)로 암호화된 AES 필드를 새 강한 키로 재암호화.
 *
 * What/Why (2026-07-23, Fable 설계):
 *   utils/encryption.js 는 ENCRYPTION_KEY 미설정 시 소스에 박힌 기본키
 *   scryptSync('default-key-change-me','salt',32) 로 암호화한다. 소스 접근자·DB 백업 유출 =
 *   저장된 SMTP 비번·몰 자격증명 평문 유출과 동치. 강한 키로 전환하되, 기존 암호화행을
 *   "기본키로 복호 → 새 키로 재암호화" 한다.
 *
 * 영향 컬럼(AES 암호화 = 이 유틸 사용, ':' 형식). bcrypt 해시(users.password 등)는 무관:
 *   - notification_settings.smtp_password
 *   - restaurant_sales_integrations.password_enc
 *
 * 실행 전제(순서 중요):
 *   1) 운영 .env 에 ENCRYPTION_KEY=<강한키> 기록 (process 는 아직 옛 env → 기본키 사용 중)
 *   2) 이 스크립트 실행 — 내부에서 old=기본키/new=.env키 를 명시 사용(process.env 무관하게 결정적)
 *   3) 즉시 pm2 restart <backend> — 이제 프로세스가 새 키로 복호(재암호화된 행과 일치)
 *   * 2)~3) 사이 수초간 옛 키 프로세스가 새키 암호문을 복호 시도 → 실패 가능(SMTP 발송 등).
 *     새벽/저트래픽에 실행 권장.
 *
 * 멱등: 이미 새 키로 암호화된 행은 old 키 복호가 실패(원문 반환)하므로 건너뛴다(아래 판별).
 *   → 여러 번 돌려도 이중 암호화 안 함.
 *
 * 분류: migrations.registry.json "manual" (일회성 — 매 배포 재실행 금지. 재실행하면 이미 새키인
 *   행을 다시 못 알아보고 손상시킬 수 있으므로 deploy 목록에 넣지 말 것).
 */
const crypto = require('crypto');
const path = require('path');
const { sequelize } = require(path.join(__dirname, '..', 'config', 'database'));

const ALGO = 'aes-256-cbc';
const OLD_KEY = crypto.scryptSync('default-key-change-me', 'salt', 32); // encryption.js 기본키와 동일

function deriveKey(raw) {
  if (!raw) throw new Error('ENCRYPTION_KEY 미설정 — .env 에 먼저 기록하고 실행하세요');
  return raw.length === 32 ? Buffer.from(raw) : crypto.scryptSync(raw, 'purple-here-salt', 32);
}
const NEW_KEY = deriveKey(process.env.ENCRYPTION_KEY);

function decWith(key, blob) {
  const [ivHex, enc] = String(blob).split(':');
  const d = crypto.createDecipheriv(ALGO, key, Buffer.from(ivHex, 'hex'));
  return d.update(enc, 'hex', 'utf8') + d.final('utf8');
}
function encWith(key, text) {
  const iv = crypto.randomBytes(16);
  const c = crypto.createCipheriv(ALGO, key, iv);
  return iv.toString('hex') + ':' + c.update(text, 'utf8', 'hex') + c.final('hex');
}

const TARGETS = [
  { table: 'notification_settings', col: 'smtp_password' },
  { table: 'restaurant_sales_integrations', col: 'password_enc' },
];

(async () => {
  if (Buffer.compare(OLD_KEY, NEW_KEY) === 0) {
    console.log('[enc-rotation] NEW_KEY == OLD_KEY(기본키) — 강한 키가 아님. 중단.');
    process.exit(1);
  }
  let rotated = 0, skipped = 0;
  for (const { table, col } of TARGETS) {
    let rows;
    try {
      [rows] = await sequelize.query(`SELECT id, \`${col}\` AS v FROM \`${table}\` WHERE \`${col}\` LIKE '%:%'`);
    } catch (e) {
      console.log(`[enc-rotation] ${table} 조회 스킵: ${e.message}`);
      continue;
    }
    for (const r of rows) {
      let plain;
      try { plain = decWith(OLD_KEY, r.v); }         // 기본키로 복호 성공 = 회전 대상
      catch { skipped++; continue; }                  // 실패 = 이미 새 키(또는 다른 형식) → 건너뜀
      const reblob = encWith(NEW_KEY, plain);
      await sequelize.query(`UPDATE \`${table}\` SET \`${col}\` = :v WHERE id = :id`, { replacements: { v: reblob, id: r.id } });
      rotated++;
      console.log(`[enc-rotation] ${table}#${r.id} 재암호화 완료`);
    }
  }
  console.log(`[enc-rotation] 완료 — 재암호화 ${rotated}건 / 건너뜀 ${skipped}건`);
  console.log('[enc-rotation] ⚠ 지금 즉시 pm2 restart 하세요 (프로세스가 새 키를 읽도록).');
  process.exit(0);
})().catch((e) => { console.error('[enc-rotation] ERR', e.message); process.exit(1); });
