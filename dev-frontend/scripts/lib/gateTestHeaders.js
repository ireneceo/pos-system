/**
 * 개발 사이트 로그인 관문(상황판 board/gate.js) 통과 표식 — 서버 안 시험 도구 전용 한 곳 (2026-11-28 Fable 판정 §R3)
 *
 * 관문이 켜지면(11-28 09:49Z PurpleHere «켬») 표식 머리글이나 로그인 쿠키가 없는 요청은 전부 /__gate/login 으로 돌아간다.
 * e2e 설정과 화면 일괄 검사(mount sweep) 두 스크립트가 같은 이 함수를 쓴다 — 복사하지 않는다.
 *
 * ⛔ 값은 파일에서만 읽고 **어디에도 출력하지 않는다**(로그·에러 메시지 포함).
 * 파일이 없거나 못 읽으면 머리글 없이 돈다(관문 꺼짐 상태와 같음) — 그때 관문이 켜져 있으면 아래 isGateLogin 이 잡아
 * 도구가 «관문에 막힘» 으로 바로 실패한다(24분 동안 빈 화면으로 찍지 않게).
 */
const fs = require('fs');

const GATE_TEST_TOKEN_FILE = '/home/irene/dev-server/board/secrets/gate-test-token';

/** Playwright extraHTTPHeaders 용 객체. 없으면 undefined. */
function gateTestHeaders() {
  try {
    const token = fs.readFileSync(GATE_TEST_TOKEN_FILE, 'utf8').trim();
    return token ? { 'X-Board-Gate-Test': token } : undefined;
  } catch (_) {
    return undefined;
  }
}

/** 이 주소가 관문 로그인 화면인가 — 표식이 안 먹었다는 뜻. */
function isGateLogin(url) {
  return /\/__gate\/login\b/.test(String(url || ''));
}

module.exports = { gateTestHeaders, isGateLogin, GATE_TEST_TOKEN_FILE };
