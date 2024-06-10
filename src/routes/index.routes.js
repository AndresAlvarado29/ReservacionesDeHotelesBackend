//aqui van todas las rutas

import { Router } from 'express';
import { usuarioRouter } from './usuario.route.js';
//import { habitacionRoutes } from './habitacion.route.js';

export const rutas_init = () => {
    const router = Router()

    router.use("/usuarios", usuarioRouter);
    //router.use("/habitaciones", new habitacionRoutes);

    return router;
}

