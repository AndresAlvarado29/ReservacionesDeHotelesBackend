const router = require("express").Router()

const clienteControlador = require('../controllers/cliente.controlador')


router.post('/', clienteControlador.crear);
router.get('/', clienteControlador.listar);
router.get('/:idCliente', clienteControlador.listarInfo);
router.get('/:idCliente', clienteControlador.borrar);
router.put('/:idCliente', clienteControlador.actualizar);

module.exports = router