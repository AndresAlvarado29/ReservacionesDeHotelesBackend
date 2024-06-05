//aqui van todas las rutas

const { Router } = require('express');
const usuarioRoutes = require('./usuario.route')


const rutas_init = () => {
    const router = Router()

    router.use("/usuarios", usuarioRoutes)

    return router
}

module.exports = { rutas_init }
