const path = require("path")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: path.join(__dirname, '/../.env')});
}

module.exports = {
    PORT: process.env.PORT,
    MYSQL_URI: process.env.MYSQL_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PWD,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME
}
