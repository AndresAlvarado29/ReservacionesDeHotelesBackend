const router = require("express").Router()

const facturaCabezeraControlador = require('../controllers/facturaCabecera.controlador')


router.post('/', facturaCabezeraControlador.crear);
router.get('/', facturaCabezeraControlador.listar);
router.get('/:idFacturaCabezera', facturaCabezeraControlador.listarInfo);
router.delete('/:idFacturaCabezera', facturaCabezeraControlador.borrar);
router.put('/:idFacturaCabezera', facturaCabezeraControlador.actualizar);

module.exports = router
