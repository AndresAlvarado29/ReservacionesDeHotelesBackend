import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Cliente } from './cliente.js';

export class FacturaCabecera extends Model {}

FacturaCabecera.init({
  cabecera_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_emision: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tipo_pago: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  iva: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
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
  modelName: 'CabeceraDetalle'
});

FacturaCabecera.belongsTo(Cliente, { foreignKey: 'cliente_codigo' });

module.exports = FacturaCabecera;
