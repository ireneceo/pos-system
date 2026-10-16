/**
 * Migration: 직원 출퇴근·휴가 표 6+1개 + kiosk_devices.last_seen_ip + staff_attendance 모듈 등록.
 *
 * 설계: .claude/fable-design-20261016-staff-attendance.md §2 · §3-4 (Fable 설계, Irene «권고대로» 2026-10-16 — Q1·Q2·Q3 = A).
 *   Q3=A: 모든 매장 요금제(매장이 모듈을 받는 경로 = 매장 요금제 · 브랜드/푸드코트/오너 요금제)에 포함.
 *
 * 안전: 새 표는 SHOW TABLES 확인 후 CREATE · 기존 표 변경은 kiosk_devices 칸 1개 추가(있으면 건너뜀) ·
 *       기존 표 ENUM 변경 0 · 멱등 · process.exit 필수.
 *
 * 사용: node scripts/migrate-create-staff-attendance.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

const MODULE_CODE = 'staff_attendance';
const MODULE_PLAN_TARGETS = ['restaurant', 'brand', 'foodcourt', 'owner'];

const TABLES = {
  attendance_records: `
    CREATE TABLE attendance_records (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      user_id INT NOT NULL,
      work_date DATE NOT NULL,
      clock_in_at DATETIME NOT NULL,
      clock_out_at DATETIME NULL,
      open_user_id INT NULL,
      clock_in_method ENUM('self','pos_pin','admin') NOT NULL,
      clock_out_method ENUM('self','pos_pin','admin') NULL,
      clock_in_ip VARCHAR(45) NULL,
      clock_out_ip VARCHAR(45) NULL,
      clock_in_network ENUM('ok','off','override') NULL,
      clock_out_network ENUM('ok','off','override') NULL,
      override_by INT NULL,
      status ENUM('open','closed','corrected') NOT NULL DEFAULT 'open',
      original_clock_in_at DATETIME NULL,
      original_clock_out_at DATETIME NULL,
      corrected_by INT NULL,
      corrected_at DATETIME NULL,
      correction_reason VARCHAR(500) NULL,
      note VARCHAR(255) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY attendance_open_user (open_user_id),
      INDEX attendance_rest_date (restaurant_id, work_date),
      INDEX attendance_user_in (user_id, clock_in_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  attendance_networks: `
    CREATE TABLE attendance_networks (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      label VARCHAR(60) NULL,
      ip VARCHAR(45) NOT NULL,
      source ENUM('manual','pin_override','kiosk_auto') NOT NULL DEFAULT 'manual',
      registered_by INT NULL,
      last_matched_at DATETIME NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY attendance_network_rest_ip (restaurant_id, ip)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  staff_work_profiles: `
    CREATE TABLE staff_work_profiles (
      user_id INT NOT NULL,
      restaurant_id INT NOT NULL,
      rest_days TEXT NULL,
      joined_at DATE NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (user_id),
      INDEX staff_work_profile_rest (restaurant_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  leave_types: `
    CREATE TABLE leave_types (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      code VARCHAR(30) NOT NULL,
      name VARCHAR(60) NOT NULL,
      is_paid TINYINT(1) NOT NULL DEFAULT 1,
      default_days DECIMAL(5,1) NULL,
      requires_approval TINYINT(1) NOT NULL DEFAULT 1,
      color CHAR(7) NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY leave_type_rest_code (restaurant_id, code)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  leave_entitlements: `
    CREATE TABLE leave_entitlements (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      user_id INT NOT NULL,
      leave_type_id INT NOT NULL,
      year SMALLINT NOT NULL,
      days DECIMAL(5,1) NOT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY leave_entitlement_user_type_year (user_id, leave_type_id, year),
      INDEX leave_entitlement_rest (restaurant_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  leave_requests: `
    CREATE TABLE leave_requests (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      user_id INT NOT NULL,
      leave_type_id INT NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      half_day ENUM('am','pm') NULL,
      days DECIMAL(5,1) NOT NULL,
      reason VARCHAR(500) NULL,
      status ENUM('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
      decided_by INT NULL,
      decided_at DATETIME NULL,
      decision_note VARCHAR(500) NULL,
      cancelled_by INT NULL,
      cancelled_at DATETIME NULL,
      created_by INT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      INDEX leave_request_rest_status (restaurant_id, status, start_date),
      INDEX leave_request_user_start (user_id, start_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  store_holidays: `
    CREATE TABLE store_holidays (
      id INT NOT NULL AUTO_INCREMENT,
      restaurant_id INT NOT NULL,
      date DATE NOT NULL,
      name VARCHAR(100) NOT NULL,
      kind ENUM('public','store_closed') NOT NULL DEFAULT 'public',
      created_by INT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY store_holiday_rest_date_kind (restaurant_id, date, kind)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
};

const parseMods = (v) => {
  if (Array.isArray(v)) return [...v];
  try { const a = JSON.parse(v || '[]'); return Array.isArray(a) ? a : []; } catch { return []; }
};

(async () => {
  try {
    console.log('[migrate-create-staff-attendance] Starting...');

    for (const [name, ddl] of Object.entries(TABLES)) {
      const [t] = await sequelize.query(`SHOW TABLES LIKE '${name}'`);
      if (t.length) { console.log(`  ✓ ${name} already exists`); continue; }
      await sequelize.query(ddl);
      console.log(`  ✓ ${name} created`);
    }

    const [col] = await sequelize.query("SHOW COLUMNS FROM kiosk_devices LIKE 'last_seen_ip'");
    if (col.length) console.log('  ✓ kiosk_devices.last_seen_ip already exists');
    else {
      await sequelize.query('ALTER TABLE kiosk_devices ADD COLUMN last_seen_ip VARCHAR(45) NULL AFTER last_seen_at');
      console.log('  ✓ kiosk_devices.last_seen_ip added');
    }

    // 모듈 행 — 관리자 요금제 편집 화면에 보이게
    const [mods] = await sequelize.query('SELECT id FROM addon_modules WHERE module_code = :c', { replacements: { c: MODULE_CODE } });
    if (mods.length) console.log(`  ✓ addon_modules: ${MODULE_CODE} already exists`);
    else {
      await sequelize.query(
        `INSERT INTO addon_modules (module_code, name, description, category, target_user_type, base_price_monthly, base_price_annual,
           ui_routes, features, dependencies, is_active, sort_order, created_at, updated_at)
         VALUES (:c, 'Staff Attendance', 'Staff clock in/out (optional same-network check), leave requests and approval, store holidays',
           'basic', 'restaurant', 0, 0, :ui, :features, '[]', 1, 260, NOW(), NOW())`,
        { replacements: {
          c: MODULE_CODE,
          ui: JSON.stringify(['/restaurant/*/attendance', '/restaurant/*/my-attendance', '/restaurant/*/time-clock']),
          features: JSON.stringify(['clock_in_out', 'pos_pin_time_clock', 'network_restriction', 'leave_requests', 'leave_balance', 'store_holidays']),
        } }
      );
      console.log(`  ✓ addon_modules: ${MODULE_CODE} created`);
    }

    // Q3=A — 매장이 모듈을 받는 모든 요금제에 포함(공급업체 요금제 제외)
    const [plans] = await sequelize.query(
      'SELECT id, name, included_modules FROM plan_templates WHERE plan_target IN (:t)',
      { replacements: { t: MODULE_PLAN_TARGETS } }
    );
    for (const p of plans) {
      const m = parseMods(p.included_modules);
      if (m.includes(MODULE_CODE)) continue;
      m.push(MODULE_CODE);
      await sequelize.query('UPDATE plan_templates SET included_modules = :m WHERE id = :id', { replacements: { m: JSON.stringify(m), id: p.id } });
      console.log(`  + ${MODULE_CODE} → plan ${p.name}`);
    }

    // 되읽어 확인 (조용한 실패 방지)
    const [after] = await sequelize.query('SELECT name, included_modules FROM plan_templates WHERE plan_target IN (:t)', { replacements: { t: MODULE_PLAN_TARGETS } });
    const missing = after.filter(p => !parseMods(p.included_modules).includes(MODULE_CODE)).map(p => p.name);
    if (missing.length) { console.error('  ✗ module missing in plans:', missing.join(', ')); process.exit(1); }
    console.log(`  ✓ ${MODULE_CODE} in ${after.length} plans`);

    console.log('[migrate-create-staff-attendance] Done');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
