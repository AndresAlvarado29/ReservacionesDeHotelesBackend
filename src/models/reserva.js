import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Cliente } from './cliente.js';
import { Habitacion } from './habitacion.js';

export class Reserva extends Model {}

Reserva.init({
    codigo_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_entrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_habitaciones: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_adultos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numero_ninios: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigo_habitacion: {
        type: DataTypes.INTEGER,
        references: {
            model: Habitacion,
            key: 'codigo_habitacion'
        }
    },
    cliente_codigo: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'codigo_cliente'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'reservas'
});

Reserva.belongsTo(Habitacion, { foreignKey: 'codigo_habitacion' });
Reserva.belongsTo(Cliente, { foreignKey: 'cliente_codigo' });
