import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { FacturaCabecera } from './facturaCabecera.js';
import { Reserva } from './reserva.js';

export class FacturaDetalle extends Model {}

FacturaDetalle.init({
    codigo_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iva: {
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
    factura_codigo: {
        type: DataTypes.STRING,
        references: {
            model: FacturaCabecera,
            key: 'codigo_factura'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'facturaDetalles'
});

FacturaDetalle.belongsTo(Reserva, { foreignKey: 'reserva_codigo' });
FacturaDetalle.belongsTo(FacturaCabecera, { foreignKey: 'factura_codigo' });

