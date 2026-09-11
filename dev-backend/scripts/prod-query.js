#!/usr/bin/env node
/**
 * 운영 DB 읽기 전용 조회 — 단일 진입점 (2026-09-11 · Fable 판정 A안 · Irene 「다 해」)
 *
 * 사용:  node scripts/prod-query.js "SELECT id, name FROM restaurants WHERE id = 8"
 *
 * 왜 이 파일 하나인가
 *   - Claude Code 의 auto mode 분류기는 명령 텍스트만 보고 «운영 읽기»를 판정한다. 임의 ssh 는 무엇을 하는지
 *     증명할 수 없어서 막힌다. 이 스크립트는 **읽기만 할 수 있는 길 하나**를 구조로 만든다.
 *   - 쓰기를 막는 진짜 자물쇠는 운영 MySQL 의 **SELECT 전용 계정**(GRANT)이다. 여기의 키워드 검사는 두 번째 문이다.
 *     계정이 없거나 쓰기 권한이 있으면 이 스크립트를 쓰지 말 것(아래 선행 조건).
 *
 * 선행 조건 (운영서버, Irene 1회): docs 대신 scratchpad 안내문 `prod-readonly-setup.md` 참고
 *   - MySQL 계정 `claude_ro`@`localhost` — GRANT SELECT, SHOW VIEW ON purple_production_db.*
 *   - 운영서버 irene 의 ~/.my.cnf 에 [client_claude_ro] 그룹(600)
 *
 * 규칙
 *   - 한 문장만. 첫 낱말은 SELECT · SHOW · EXPLAIN · DESCRIBE · DESC · WITH 중 하나.
 *   - INTO OUTFILE/DUMPFILE · FOR UPDATE · LOCK · SLEEP · BENCHMARK 거부.
 *   - SQL 은 base64 로 넘긴다 — 원격 셸이 따옴표·백틱을 해석하지 않게.
 */
const { execFileSync } = require('child_process');

const HOST = 'irene@87.106.78.146';
const DB = 'purple_production_db';
const GROUP_SUFFIX = '_claude_ro';

function fail(msg) {
  console.error(`[prod-query] 거부: ${msg}`);
  process.exit(2);
}

const raw = process.argv.slice(2).join(' ').trim();
if (!raw) fail('SQL 이 비어 있습니다. 예: node scripts/prod-query.js "SELECT COUNT(*) FROM orders"');

// 주석 제거 후 판정(주석 안에 숨긴 두 번째 문장을 막는다)
const sql = raw.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|\s)--[^\n]*/g, ' ').replace(/#[^\n]*/g, ' ').trim().replace(/;\s*$/, '');
if (sql.includes(';')) fail('한 번에 한 문장만 실행합니다.');
const first = (sql.match(/^\(*\s*([A-Za-z]+)/) || [])[1];
if (!first || !['SELECT', 'SHOW', 'EXPLAIN', 'DESCRIBE', 'DESC', 'WITH'].includes(first.toUpperCase())) {
  fail(`읽기 문장만 허용합니다(첫 낱말: ${first || '없음'}).`);
}
if (/\b(INTO\s+(OUT|DUMP)FILE|FOR\s+UPDATE|LOCK\s+IN\s+SHARE\s+MODE|SLEEP\s*\(|BENCHMARK\s*\()/i.test(sql)) {
  fail('파일 쓰기·잠금·지연 구문은 허용하지 않습니다.');
}
if (first.toUpperCase() === 'WITH' && /\b(INSERT|UPDATE|DELETE|REPLACE)\b/i.test(sql)) {
  fail('WITH 문 안의 쓰기는 허용하지 않습니다.');
}

const b64 = Buffer.from(sql, 'utf8').toString('base64');
const remote = `mysql --defaults-group-suffix=${GROUP_SUFFIX} -D ${DB} --batch --table -e "$(echo ${b64} | base64 -d)"`;
try {
  execFileSync('ssh', ['-n', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=10', HOST, remote], { stdio: ['ignore', 'inherit', 'inherit'] });
} catch (e) {
  process.exit(e.status || 1);
}
