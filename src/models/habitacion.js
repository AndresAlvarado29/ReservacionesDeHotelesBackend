import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export class Habitacion extends Model {}

Habitacion.init({
  codigo_habitacion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  num_habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_amueblado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  alto: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  ancho: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  largo: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  tipo_camas: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  num_camas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Habitacion'
});

module.exports = Habitacion;
