const pg = require('pg')
const globalConstants = require('./const/globalConstants')

const pool = new pg.Pool({
    user: globalConstants.USER_DB,
    host: globalConstants.HOST_DB,
    password: globalConstants.PASSWORD_DB,
    database: globalConstants.DATABASE,
    port: globalConstants.PORT_DB
})

pool.query('SELECT NOW()').then(result => {
    console.log(result)
})

module.exports = { pool };