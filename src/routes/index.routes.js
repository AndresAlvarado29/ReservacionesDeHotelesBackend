//aqui van todas las rutas

import { Router } from 'express';
import { usuarioRoutes } from './usuario.route.js';

export const rutas_init = () => {
    const router = Router()

    router.use("/usuarios", usuarioRoutes)

    return router
}

//module.exports = { rutas_init }
