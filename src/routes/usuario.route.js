const router = require("express").Router()

const usuarioControlador = require('../controllers/usuario.controlador')

router.get('/', usuarioControlador.prueba);
router.post('/', usuarioControlador.crear);
router.get('/', usuarioControlador.listar);
router.get('/:idUsuario', usuarioControlador.listarInfo);
router.get('/:idUsuario', usuarioControlador.borrar);
router.put('/:idUsuario', usuarioControlador.actualizar);

module.exports = router