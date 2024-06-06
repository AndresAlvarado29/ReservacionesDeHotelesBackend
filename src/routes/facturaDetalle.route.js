const router = require("express").Router()

const facturaDetalleControlador = require('../controllers/facturaDetalle.controlador')

router.post('/', facturaDetalleControlador.crear);
router.get('/', facturaDetalleControlador.listar);
router.get('/:idFacturaDetalle', facturaDetalleControlador.listarInfo);
router.delete('/:idFacturaDetalle', facturaDetalleControlador.borrar);
router.put('/:idFacturaDetalle', facturaDetalleControlador.actualizar);

module.exports = router
