const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

class Habitacion extends Model {}

Habitacion.init({
  codigo_habitacion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  num_habitacion: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  tipo_habitacion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  precio_diario: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Habitacion'
});

module.exports = Habitacion;
