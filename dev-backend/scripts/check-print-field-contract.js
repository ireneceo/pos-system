#!/usr/bin/env node
/**
 * 인쇄 데이터 필드 계약 가드 (재발방지)
 *
 * 배경 (2026-05-30): 주방 티켓·영수증을 그리는 코드는 `item.set_components` 를 읽어
 * 세트 구성품+옵션을 표기한다. 그런데 주문 항목을 인쇄용으로 변환하는 mapItem/print-item
 * 들이 set_components 를 빼먹으면, 렌더 코드는 멀쩡한데도 "SET" 만 찍히고 구성품이 통째로
 * 사라진다(주방 분배도 불가). 정적 분석·기존 테스트가 못 잡던 계약 누락이었다.
 *
 * 이 가드는 "주문 항목 → 인쇄 항목" 으로 변환하는 모든 지점이 아래 필수 필드를 반드시
 * 통과시키는지 검사한다. 하나라도 빠지면 실패(배포 차단). 새 인쇄 경로를 추가할 때도 같은
 * 계약을 강제한다.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../dev-frontend/src');

// 인쇄용 항목 변환 지점들. 각 지점이 반드시 포함해야 하는 필드.
const SITES = [
  { file: 'hooks/useAutoPrintPoller.ts', marker: 'const mapItem', label: 'AutoPrintPoller.mapItem' },
  { file: 'components/Layout/MainLayout.tsx', marker: 'const mapItem', label: 'MainLayout.mapItem' },
];
// POSTerminal 직접 인쇄 항목 (set_components 를 직접 싣는 블록). 파일 전체에서 존재만 확인.
const POS_FILE = 'pages/POSTerminal/POSTerminalPage.tsx';

const REQUIRED = ['set_components', 'is_set_menu'];

let failed = 0;
const results = [];

function checkBlock(text, label) {
  const missing = REQUIRED.filter(f => !new RegExp(`\\b${f}\\b`).test(text));
  if (missing.length) {
    failed++;
    results.push(`✗ ${label} — 누락 필드: ${missing.join(', ')}`);
  } else {
    results.push(`✓ ${label}`);
  }
}

for (const site of SITES) {
  const full = path.join(ROOT, site.file);
  let src;
  try { src = fs.readFileSync(full, 'utf8'); }
  catch { results.push(`✗ ${site.label} — 파일 없음: ${site.file}`); failed++; continue; }
  const idx = src.indexOf(site.marker);
  if (idx === -1) { results.push(`✗ ${site.label} — '${site.marker}' 없음 (구조 변경?)`); failed++; continue; }
  // marker 부터 다음 '});' 까지의 블록을 본다 (mapItem 객체 리터럴 범위)
  const block = src.slice(idx, idx + 800);
  checkBlock(block, site.label);
}

// POS 직접 인쇄: 파일 전체에 set_components 가 인쇄 항목으로 실리는지(존재) 확인
try {
  const pos = fs.readFileSync(path.join(ROOT, POS_FILE), 'utf8');
  if (/set_components:\s*\(item as any\)\.set_components/.test(pos) || /set_components:/.test(pos)) {
    results.push('✓ POSTerminal direct-print item (set_components 포함)');
  } else {
    results.push('✗ POSTerminal direct-print item — set_components 누락'); failed++;
  }
} catch { results.push('✗ POSTerminal 파일 없음'); failed++; }

console.log('\n🧾 인쇄 데이터 필드 계약 검사 (set_components / is_set_menu)\n');
results.forEach(r => console.log('  ' + r));
console.log('');
if (failed) {
  console.log(`✗ ${failed}건 실패 — 인쇄 항목 변환에서 세트 구성품 필드가 누락됨.`);
  console.log('  → 빌/주방 티켓에 "SET" 만 찍히고 구성품이 사라지는 회귀. 해당 mapItem 에 필드를 추가하세요.\n');
  process.exit(1);
}
console.log('✓ 모든 인쇄 항목 변환이 세트 구성품 필드를 통과시킴 (계약 준수)\n');
process.exit(0);
