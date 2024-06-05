const router = require("express").Router()

const reservaControlador = require('../controllers/reserva.controlador')


router.post('/', reservaControlador.crear);
router.get('/', reservaControlador.listar);
router.get('/:idReserva', reservaControlador.listarInfo);
router.get('/:idReserva', reservaControlador.borrar);
router.put('/:idReserva', reservaControlador.actualizar);

module.exports = router