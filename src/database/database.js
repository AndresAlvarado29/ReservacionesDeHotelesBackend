import { Sequelize } from 'sequelize';
import pg from 'pg';

export const sequelize = new Sequelize({
    dialect: 'postgresql',
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

export const pool = new pg.Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});

pool.query('SELECT NOW()').then(result => {
    console.log(result);
});

