const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * MenuReferencePhoto — 메뉴별 레퍼런스 사진 + 임베딩 (Track B 인식 학습 소스).
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §3.1 / §B-3.
 * source: menu_image(Product.image 자동시드) | staff_upload(RA 업로드). 손님/인식 사진 승격 경로 없음.
 */
class MenuReferencePhoto extends Model {}

MenuReferencePhoto.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  image_url: { type: DataTypes.STRING(500), allowNull: false },
  thumbnail_url: { type: DataTypes.STRING(500), allowNull: true },
  source: { type: DataTypes.ENUM('menu_image', 'staff_upload'), allowNull: false },
  embedding: { type: DataTypes.JSON, allowNull: true, comment: 'float 벡터(정규화). 후보 작아 JSON+브루트포스로 충분' },
  embedding_model: { type: DataTypes.STRING(60), allowNull: true, comment: 'ex: local-color-v1 / vertex/multimodalembedding@001' },
  embedding_dim: { type: DataTypes.SMALLINT, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  created_by: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize,
  modelName: 'MenuReferencePhoto',
  tableName: 'menu_reference_photos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['product_id', 'image_url'] },
    { fields: ['restaurant_id'] },
    { fields: ['product_id'] },
  ],
});

module.exports = MenuReferencePhoto;
