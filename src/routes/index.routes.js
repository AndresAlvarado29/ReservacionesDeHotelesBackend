//aqui van todas las rutas

import { Router } from 'express';
import { usuarioRouter } from './usuario.route.js';
import { clienteRouter } from './cliente.route.js';
import { habitacionRouter } from './habitacion.route.js';
import { reservaRouter } from './reserva.route.js';
import { detallesRouter } from './facturaDetalle.route.js';
import { cabeceraRouter } from './facturaCabecera.route.js';

export const rutas_init = () => {
    const router = Router()

    router.use("/usuarios", usuarioRouter);
    router.use("/clientes", clienteRouter);
    router.use("/habitaciones", habitacionRouter);
    router.use("/reservas", reservaRouter);
    router.use("/detalles", detallesRouter);
    router.use("/facturas", cabeceraRouter);

    return router;
}

