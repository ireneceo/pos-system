const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * PrintWatchFinding — 인쇄 지킴이 «발견» 이력 (2026-11-13 · 설계 .claude/fable-design-20261113-print-monitoring.md §2-3).
 * 한 발견 = 한 행. 규칙이 계속 걸리면 같은 행(last_seen_at·seen_count 갱신), 풀리면 resolved, 다시 걸리면 새 행.
 * severity·status 는 ENUM 대신 VARCHAR(ENUM expand 사고 여지 없음).
 */
const PrintWatchFinding = sequelize.define('PrintWatchFinding', {
  id:            { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  code:          { type: DataTypes.STRING(48), allowNull: false, comment: 'setup_gap / print_failures / unprinted_orders / multi_auto_print / old_app / settings_blocked' },
  severity:      { type: DataTypes.STRING(16), allowNull: false, comment: 'critical / warn / info' },
  status:        { type: DataTypes.STRING(16), allowNull: false, defaultValue: 'open', comment: 'open / resolved' },
  evidence:      { type: DataTypes.JSON, allowNull: true },
  first_seen_at: { type: DataTypes.DATE, allowNull: false },
  last_seen_at:  { type: DataTypes.DATE, allowNull: false },
  resolved_at:   { type: DataTypes.DATE, allowNull: true },
  seen_count:    { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
  tableName: 'print_watch_findings',
  timestamps: false,
  indexes: [
    { fields: ['status', 'severity'], name: 'pwf_status_severity' },
    { fields: ['restaurant_id', 'code', 'status'], name: 'pwf_rest_code_status' }
  ]
});

module.exports = PrintWatchFinding;
