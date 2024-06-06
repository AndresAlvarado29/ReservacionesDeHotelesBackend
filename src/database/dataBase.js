const { Sequelize } = require('sequelize')
const pg = require('pg')
const globalConstants = require('../const/globalConstants')

const sequelize = new Sequelize(globalConstants.DATABASE,globalConstants.USER_DB,globalConstants.PASSWORD_DB,{
    host: globalConstants.HOST_DB,
    dialect: 'postgres',
});


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
module.exports = { sequelize };