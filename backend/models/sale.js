'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Detail, {
        foreignKey: 'sale_id',
        onDelete: 'CASCADE'
      })
    }
  };
  Sale.init({
    sale_at: DataTypes.DATE,
    iva: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Sale',
    timestamps: false
  });

  return Sale;
};
