import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './usuario.js';

export class Cliente extends Model {}

Cliente.init({
    codigo_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cedula: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usuario_codigo: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'codigo_usuario'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'clientes'
});

Cliente.belongsTo(Usuario, { foreignKey: 'usuario_codigo' });
