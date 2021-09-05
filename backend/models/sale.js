'use strict';
const {
  Model,
  NOW
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
      this.belongsTo(models.Client, {
        foreignKey: 'client_id'
      })
    }
  };
  Sale.init({
    client_id: DataTypes.INTEGER,
    sale_at: {
      type: DataTypes.DATE,
      defaultValue: NOW
    },
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
