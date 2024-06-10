import express from "express";

let router = express.Router();

export class facturaDetalleRoutes {};

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/facturaDetalle.controlador.js';

router.post('/', crear);
router.get('/', listar);
router.get('/:idFacturaDetalle', listarInfo);
router.delete('/:idFacturaDetalle', borrar);
router.put('/:idFacturaDetalle', actualizar);

export { router };
