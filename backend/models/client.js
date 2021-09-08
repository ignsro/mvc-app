'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Sale, {
                foreignKey: 'client_id'
            })
        }
    };
    Client.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        state: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Client',
        paranoid: true
    });
    return Client;
};