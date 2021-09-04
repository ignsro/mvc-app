'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Details.init({
    sale_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Details',
  });
  return Details;
};