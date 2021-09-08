'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Sales', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            sale_at: {
                type: Sequelize.DATE
            },
            iva: {
                type: Sequelize.FLOAT
            },
            discount: {
                type: Sequelize.FLOAT
            },
            total: {
                type: Sequelize.FLOAT
            }
        }, { timestamp: false });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Sales');
    }
};