import { Usuario } from '../models/usuario.js';
/*
import { Cliente } from '../models/cliente.js';
import { Habitacion } from '../models/habitacion.js';
import { Reserva } from '../models/reserva.js';
import { FacturaCabecera } from '../models/facturaCabecera.js';
import { FacturaDetalle } from '../models/facturaDetalle.js';

// Definir las relaciones
Cliente.hasMany(Reserva, { foreignKey: 'cliente_codigo' });
Reserva.belongsTo(Cliente, { foreignKey: 'cliente_codigo' });

Cliente.hasMany(FacturaCabecera, { foreignKey: 'cliente_codigo' });
FacturaCabecera.belongsTo(Cliente, { foreignKey: 'cliente_codigo' });

Reserva.hasMany(FacturaDetalle, { foreignKey: 'reserva_codigo' });
FacturaDetalle.belongsTo(Reserva, { foreignKey: 'reserva_codigo' });

FacturaCabecera.hasMany(FacturaDetalle, { foreignKey: 'factura_numero' });
FacturaDetalle.belongsTo(FacturaCabecera, { foreignKey: 'factura_numero' });

Habitacion.hasMany(Reserva, { foreignKey: 'habitacion_codigo' });
Reserva.belongsTo(Habitacion, { foreignKey: 'habitacion_codigo' });

Usuario.hasMany(Cliente, { foreignKey: 'usuario_codigo' });
Cliente.belongsTo(Usuario, { foreignKey: 'usuario_codigo' });
*/

export {
    Usuario,/*
    Habitacion,
    Reserva,
    FacturaCabecera,
    FacturaDetalle,
    Cliente,
  */
};
