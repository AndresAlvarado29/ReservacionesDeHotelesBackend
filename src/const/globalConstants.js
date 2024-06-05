require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 5000,
    PASSWORD_DB: process.env.PASSWORD_DB,
    HOST_DB: process.env.HOST_DB,
    DATABASE: process.env.DATABASE,
    USER_DB: process.env.USER_DB,
    PORT_DB: process.env.PORT_DB
}