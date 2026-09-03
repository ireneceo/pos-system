const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

/**
 * 배포 기록 — 회차마다 "무엇이 바뀌었고 무엇을 확인해야 하는가" 를 남긴다.
 *
 * Irene 요구(2026-09-03): 시스템 관리자 화면에서 배포별로 작업중·완료·이슈·앞으로 할 것,
 *   그리고 **변경 후 바뀌는 현상**·**추가로 체크할 영역** 을 본다.
 * 소스는 저장소의 `dev-backend/releases/<tag>.json` 이고, 배포 스크립트가 적재한다.
 * 화면에서 쓰지 않는다 — 쓰기 API 가 없다(기록의 단일 소스는 파일).
 */
class DeployRecord extends Model {}

DeployRecord.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tag: { type: DataTypes.STRING(120), allowNull: false, unique: true, comment: '배포 식별자 = 기록 파일명' },
  deployed_at: { type: DataTypes.DATE, allowNull: false },
  git_commit: { type: DataTypes.STRING(60), allowNull: true },
  sw_version: { type: DataTypes.STRING(60), allowNull: true },
  public_release: { type: DataTypes.STRING(20), allowNull: true, comment: '같은 회차의 공개 릴리즈 공지 버전(있을 때만)' },
  // 7칸을 통째로 — 항목 구조가 바뀌어도 스키마 마이그가 필요 없다.
  sections: { type: DataTypes.JSON, allowNull: false },
  fable_note: { type: DataTypes.TEXT, allowNull: true },
  deployed_by: { type: DataTypes.STRING(60), allowNull: true },
}, {
  sequelize: database.sequelize,
  modelName: 'DeployRecord',
  tableName: 'deploy_records',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = DeployRecord;
