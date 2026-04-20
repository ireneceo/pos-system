const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class FoodcourtUnit extends Model {
  /**
   * Full code combining branch code + unit number.
   * Requires `branch` association to be loaded, otherwise falls back to unit_number.
   * Usage: e.g. "SUNWAY-A01"
   */
  get fullCode() {
    const branchCode = this.branch?.code || this.get('branch')?.code;
    if (branchCode && this.unit_number) return `${branchCode}-${this.unit_number}`;
    return this.unit_number;
  }
}

FoodcourtUnit.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Parent foodcourt (redundant with branch.foodcourt_id but kept for query convenience)'
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'FoodcourtBranch.id. Null during migration window only; new units must have branch_id.'
  },
  unit_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: 'Per-branch unit identifier. Unique within (branch_id, unit_number).'
  },
  size_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  size_unit: {
    type: DataTypes.ENUM('sqft', 'sqm'),
    defaultValue: 'sqft'
  },
  location_description: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('vacant', 'reserved', 'preparing', 'occupied'),
    defaultValue: 'vacant'
  },
  current_contract_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  floor_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Which floor plan this unit is placed on'
  },
  plan_x: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'X position on canvas (pixels)'
  },
  plan_y: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Y position on canvas (pixels)'
  },
  plan_width: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Unit rectangle width on canvas (pixels)'
  },
  plan_height: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Unit rectangle height on canvas (pixels)'
  },
  plan_shape: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'rect',
    comment: 'rect | circle'
  }
}, {
  sequelize: database.sequelize,
  tableName: 'foodcourt_units',
  timestamps: true,
  underscored: true,
  validate: {
    // Enforce branch ↔ foodcourt consistency — prevent moving a unit to a branch of a different foodcourt
    async branchFoodcourtMatches() {
      if (this.branch_id == null) return; // null during migration window
      const FoodcourtBranch = require('./FoodcourtBranch');
      const branch = await FoodcourtBranch.findByPk(this.branch_id);
      if (!branch) throw new Error(`Branch #${this.branch_id} not found`);
      if (Number(branch.foodcourt_id) !== Number(this.foodcourt_id)) {
        throw new Error(`Branch #${this.branch_id} belongs to foodcourt #${branch.foodcourt_id}, not #${this.foodcourt_id}`);
      }
    }
  }
});

module.exports = FoodcourtUnit;
