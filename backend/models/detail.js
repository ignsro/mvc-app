'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sale, {
        foreignKey: 'sale_id',
        onDelete: 'CASCADE'
      })

      this.belongsTo(models.Product, {
        foreignKey: 'product_id',
        alias: 'products'
      })
    }
  };
  Detail.init({
    sale_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Detail',
    timestamps: false
  });
  return Detail;
};