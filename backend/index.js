const container = require("./startup/container")
const app = container.resolve("app");

const { Sequelize } = require("sequelize");
const { asClass, asValue } = require("awilix");
const { MYSQL_URI } = container.resolve('config')
const sequelize = new Sequelize(MYSQL_URI)

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        container.register({ sequelize: asValue(sequelize) })
        app.start();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();