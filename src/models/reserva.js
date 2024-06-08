import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import { FacturaCabecera } from './facturaCabecera.js';
import { Cliente } from './cliente.js';

class Reserva extends Model {}

Reserva.init({ 
  reserva_id: {
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
  codigo_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'codigo_cliente'
    }
  }
}, {
  sequelize,
  modelName: 'Reserva'
});

Reserva.belongsTo(Habitacion, { foreignKey: 'codigo_habitacion' });
Reserva.belongsTo(Cliente, { foreignKey: 'codigo_cliente' });

module.exports = Reserva;
