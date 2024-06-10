import express from "express";

let detallesRouter = express.Router();


import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/facturaDetalle.controlador.js';

detallesRouter.post('/', crear);
detallesRouter.get('/', listar);
detallesRouter.get('/:idFacturaDetalle', listarInfo);
detallesRouter.delete('/:idFacturaDetalle', borrar);
detallesRouter.put('/:idFacturaDetalle', actualizar);

export { detallesRouter };
