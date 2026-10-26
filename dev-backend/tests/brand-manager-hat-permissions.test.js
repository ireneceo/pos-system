/**
 * brand-manager-hat-permissions.test.js — 멀티아이디(브랜드 매니저 모자) 메뉴 권한 (2026-10-26 Fable 설계).
 *
 * 계약:
 *   · 모자 행(user_contexts.permissions)에 저장한 권한이 그대로 실린다 — NULL·깨진 값이면 기본 2키(예전 행 무회귀).
 *   · 키 집합 = 일반 매니저와 같은 7개 · dashboard 는 항상 · 집합 밖 키는 거부.
 *   · 투영(middleware/auth.js)과 전환 응답(routes/auth.js)은 같은 함수 hatPermissions 하나를 부른다.
 *   · 서버 키 집합 ↔ 프론트 utils/brandManagerPermissions.ts 가 같다.
 */
const fs = require('fs');
const path = require('path');
const uc = require('../services/userContexts');

const ALL = ['dashboard', 'management', 'products', 'operations', 'reports', 'communication', 'plans_payments'];

afterAll(async () => { await require('../config/database').sequelize.close(); });

describe('① 정규화', () => {
  test('7키 그대로 · 중복 제거 · dashboard 는 항상', () => {
    expect(uc.normalizeBrandManagerPermissions(ALL).permissions.sort()).toEqual([...ALL].sort());
    expect(uc.normalizeBrandManagerPermissions(['products', 'products']).permissions).toEqual(['dashboard', 'products']);
    expect(uc.normalizeBrandManagerPermissions([]).permissions).toEqual(['dashboard']);
  });
  test('집합 밖 키·배열 아님 → error', () => {
    expect(uc.normalizeBrandManagerPermissions(['admin_all']).error).toBeTruthy();
    expect(uc.normalizeBrandManagerPermissions('dashboard').error).toBeTruthy();
    expect(uc.normalizeBrandManagerPermissions(null).error).toBeTruthy();
  });
  test('모자 종류별 정규화 선택 — Staff·브랜드 매니저만', () => {
    expect(uc.permissionNormalizerFor('brand', 'Brand Manager')).toBe(uc.normalizeBrandManagerPermissions);
    expect(uc.permissionNormalizerFor('restaurant', 'Staff')).toBe(uc.normalizeStaffPermissions);
    expect(uc.permissionNormalizerFor('restaurant', 'Restaurant Admin')).toBeNull();
  });
});

describe('② 들어갔을 때 실리는 권한 (hatPermissions)', () => {
  test('브랜드 매니저 모자 = 행 값', () => {
    expect(uc.hatPermissions('brand', 'Brand Manager', ALL)).toEqual(uc.normalizeBrandManagerPermissions(ALL).permissions);
    expect(uc.hatPermissions('brand', 'Brand Manager', ['reports'])).toEqual(['dashboard', 'reports']);
  });
  test('NULL·깨진 값 → 기본 2키(예전 모자 행 무회귀)', () => {
    expect(uc.hatPermissions('brand', 'Brand Manager', null)).toEqual(['dashboard', 'products']);
    expect(uc.hatPermissions('brand', 'Brand Manager', ['admin_all'])).toEqual(['dashboard', 'products']);
  });
  test('Staff 모자 = 행 값 · 나머지 모자 = []', () => {
    expect(uc.hatPermissions('restaurant', 'Staff', ['access_pos'])).toEqual(['access_pos']);
    expect(uc.hatPermissions('restaurant', 'Staff', null)).toEqual([]);
    expect(uc.hatPermissions('restaurant', 'Restaurant Admin', ALL)).toEqual([]);
    expect(uc.hatPermissions('owner', 'Restaurant Owner', null)).toEqual([]);
  });
});

describe('③ 투영과 전환 응답이 같은 함수', () => {
  test('middleware/auth.js · routes/auth.js 둘 다 hatPermissions 를 부르고 옛 상수식을 쓰지 않는다', () => {
    const mw = fs.readFileSync(path.resolve(__dirname, '../middleware/auth.js'), 'utf8');
    const rt = fs.readFileSync(path.resolve(__dirname, '../routes/auth.js'), 'utf8');
    expect(mw).toMatch(/permissions:\s*hatPermissionsFor\(/);
    expect(rt).toMatch(/permissions:\s*userContexts\.hatPermissions\(/);
    expect(mw).not.toMatch(/\[\.\.\.BRAND_MANAGER_HAT_PERMISSIONS\]/);
    expect(rt).not.toMatch(/\[\.\.\.userContexts\.BRAND_MANAGER_HAT_PERMISSIONS\]/);
  });
});

describe('④ 상수 동형 — 서버 BRAND_MANAGER_PERMISSION_KEYS ↔ 프론트 BRAND_MANAGER_PERMISSION_GROUPS', () => {
  test('키 집합이 같다', () => {
    const src = fs.readFileSync(path.resolve(__dirname, '../../dev-frontend/src/utils/brandManagerPermissions.ts'), 'utf8');
    const m = src.match(/export const BRAND_MANAGER_PERMISSION_GROUPS[^=]*=\s*\[([\s\S]*?)\];/);
    expect(m).toBeTruthy();
    const fe = [...m[1].matchAll(/key:\s*'([a-z_]+)'/g)].map(x => x[1]).sort();
    expect(fe).toEqual([...uc.BRAND_MANAGER_PERMISSION_KEYS].sort());
  });
});
