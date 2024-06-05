const router = require("express").Router()

const habitacionControlador = require('../controllers/habitacion.controlador')


router.post('/', habitacionControlador.crear);
router.get('/', habitacionControlador.listar);
router.get('/:idHabitacion', habitacionControlador.listarInfo);
router.get('/:idHabitacion', habitacionControlador.borrar);
router.put('/:idHabitacion', habitacionControlador.actualizar);

module.exports = router