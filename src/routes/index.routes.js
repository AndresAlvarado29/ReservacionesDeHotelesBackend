//aqui van todas las rutas y se van a conectar

const { Router } = require('express');

const rutas_init=()=>{
    const router = Router()

    router.use("/usuarios", usuarioRoutes)

    return router
}

module.exports = { rutas_init }
