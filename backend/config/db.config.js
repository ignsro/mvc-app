const config = require('.')

module.exports = {
  development: {
    username: config.DB_USER,
    password: config.DB_PWD,
    database: config.DB_NAME,
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql'
  }
};