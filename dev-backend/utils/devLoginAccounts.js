'use strict';
/**
 * 개발 전용 dev-login(상황판 «시험 계정으로 열기») 역할키 → 시험 계정 이메일 (2026-10-11 · ~/dev-server/kit/DEV-LOGIN.md).
 * 코드 안 고정 맵 — 서명 코드에서 이메일을 받지 않는다. 표 = CLAUDE.md «🧪 시험 역할».
 * 라우트(routes/auth.js)와 영구 검사(scripts/health-check.js)가 같이 읽는다.
 * System Admin 은 넣지 않는다 — 모든 매장을 보는 역할이라 «데모에만 닿음» 을 만족할 수 없다.
 * test-*@example.com 3개는 scripts/seed-dev-login-test-accounts.js 가 만든다(개발 DB).
 */
const DEV_LOGIN_ROLE_TO_EMAIL = Object.freeze({
  restaurant: 'demo-restaurant@purplehere.com',            // Restaurant Admin · 매장 38
  brand: 'demo-brand@purplehere.com',                      // Brand General · 브랜드 10·17
  foodcourt: 'demo-foodcourt@purplehere.com',              // Foodcourt General · 푸드코트 44
  owner: 'demo-owner@purplehere.com',                      // Restaurant Owner · 데모 매장 2·3
  supplier: 'demo-supplier@purplehere.com',                // Supplier Admin · 공급업체 20
  brand_manager: 'test-brand-manager@example.com',         // Brand Manager · 브랜드 10
  foodcourt_manager: 'test-foodcourt-manager@example.com', // Foodcourt Manager · 푸드코트 44 (매장 38 담당)
  supplier_staff: 'test-supplier-staff@example.com'        // Supplier Staff · 공급업체 20
});

// 범위 이름: store=<매장 번호> 하나. 그 계정이 닿는 데모 매장이어야 한다.
const DEV_LOGIN_SCOPE_KEYS = Object.freeze(['store']);

module.exports = { DEV_LOGIN_ROLE_TO_EMAIL, DEV_LOGIN_SCOPE_KEYS };
