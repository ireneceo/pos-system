#!/usr/bin/env node
/**
 * check-revenue-definition.js — 「매출 정의」가 두 벌로 갈라지는 것을 막는다 (2026-09-17 신설)
 *
 * 왜 필요한가 (운영 실측, 최근 60일)
 *   같은 「매출」이라는 말로 화면마다 다른 숫자를 보여주고 있었다:
 *     · 브랜드 퍼포먼스 : 완료+서빙               2,936건 77,064.87
 *     · 브랜드 리포트   : 결제완료 OR 진행중      3,112건 82,261.27  ← 취소 176건 5,196.40 포함
 *     · 구독 화면(BG·FG): 완료만                  2,934건 76,957.81
 *   정의가 여러 곳에 손으로 박혀 있으면 한 곳을 고쳐도 나머지가 조용히 어긋난다.
 *
 * 무엇을 잡는가
 *   ① 서버(utils/revenueOrders.js)와 화면(utils/orderRevenue.ts)의 상태 목록이 다르면 실패.
 *   ② 새 코드에서 「결제상태로 매출을 판정」하는 패턴(payment_status === 'completed' 을
 *      매출·집계 문맥에서 쓰는 것)을 잡는다 — 취소된 주문이 그대로 샌다.
 *      ⛔ 결제 처리 자체(결제 저장·마감 정산)는 결제상태를 봐야 하므로 그 파일들은 제외한다.
 *
 * 사용: node scripts/check-revenue-definition.js [--summary]
 */
const fs = require('fs');
const path = require('path');

const BACKEND = path.resolve(__dirname, '..');
const FRONT_SRC = path.resolve(__dirname, '../../dev-frontend/src');

// 결제상태를 보는 것이 **정상**인 자리 — 결제 저장·마감·정산·몰 매출 보고
const PAYMENT_CONTEXT_ALLOW = [
  'routes/cash-management.js', 'routes/orders-payment.js', 'services/mallSalesService.js',
  'routes/payments.js', 'routes/invoices', 'services/paymentLedger',
];

function readServerStatuses() {
  const src = fs.readFileSync(path.join(BACKEND, 'utils/revenueOrders.js'), 'utf-8');
  const m = src.match(/REVENUE_STATUSES\s*=\s*\[([^\]]+)\]/);
  return m ? m[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : null;
}
function readClientStatuses() {
  const src = fs.readFileSync(path.join(FRONT_SRC, 'utils/orderRevenue.ts'), 'utf-8');
  const m = src.match(/REVENUE_STATUSES\s*=\s*\[([^\]]+)\]/);
  return m ? m[1].split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean) : null;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.(tsx|ts|jsx|js)$/.test(e.name) && !/\.(test|spec)\./.test(e.name)) out.push(p);
  }
  return out;
}

function main() {
  const summary = process.argv.includes('--summary');
  const fails = [];

  const server = readServerStatuses();
  const client = readClientStatuses();
  if (!server || !client) fails.push('매출 상태 목록을 읽지 못했다 — utils/revenueOrders.js 또는 utils/orderRevenue.ts 확인');
  else if (server.join(',') !== client.join(',')) {
    fails.push(`서버(${server.join('+')}) 와 화면(${client.join('+')}) 의 매출 상태가 다르다`);
  }

  // ② 매출 문맥에서 결제상태로 판정하는 새 코드
  const files = [...walk(path.join(BACKEND, 'routes')), ...walk(FRONT_SRC)];
  for (const f of files) {
    const rel = path.relative(path.resolve(BACKEND, '..'), f);
    if (PAYMENT_CONTEXT_ALLOW.some(a => rel.includes(a))) continue;
    const src = fs.readFileSync(f, 'utf-8');
    const re = /payment_status\s*===?\s*['"]completed['"]/g;
    let m;
    while ((m = re.exec(src))) {
      const line = src.slice(0, m.index).split('\n').length;
      // 같은 줄·앞뒤 2줄에 매출/집계 낱말이 있으면 잡는다
      const lines = src.split('\n');
      const ctx = lines.slice(Math.max(0, line - 3), line + 2).join(' ').toLowerCase();
      if (/revenue|sales|매출|총액|total_amount|sum\(/.test(ctx)) {
        fails.push(`${rel}:${line} 매출 판정에 결제상태를 쓴다 — 취소된 주문이 샌다(utils 의 isRevenueOrder 사용)`);
      }
    }
  }

  if (!fails.length) {
    console.log(`✓ 매출 정의 단일 — 서버·화면 같은 목록(${server.join('+')}) · 결제상태로 매출 판정하는 곳 0`);
    process.exit(0);
  }
  console.log(`✗ 매출 정의 문제 ${fails.length}건`);
  if (!summary) for (const f of fails) console.log('  ' + f);
  process.exit(1);
}

main();
