const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const FacturaCabecera = require('./FacturaCabecera.js');
const Reserva = require('./Reserva.js');

class FacturaDetalle extends Model {}

FacturaDetalle.init({
  detalle_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  reserva_codigo: {
    type: DataTypes.INTEGER,
    references: {
      model: Reserva,
      key: 'codigo_reserva'
    }
  },
  factura_numero: {
    type: DataTypes.STRING,
    references: {
      model: FacturaCabecera,
      key: 'numero_factura'
    }
  }
}, {
  sequelize,
  modelName: 'FacturaDetalle'
});

FacturaDetalle.belongsTo(Reserva, { foreignKey: 'reserva_codigo' });
FacturaDetalle.belongsTo(FacturaCabecera, { foreignKey: 'factura_numero' });

module.exports = FacturaDetalle;