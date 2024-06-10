import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export class Usuario extends Model {}

Usuario.init({
    codigo_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'usuarios',
});
