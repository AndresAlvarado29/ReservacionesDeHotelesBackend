import express from "express";

let detallesRouter = express.Router();

import { crear, listar, listarInfo, borrar, actualizar }
    from '../controllers/facturaDetalle.controlador.js';

detallesRouter.post('/', crear);
detallesRouter.get('/', listar);
detallesRouter.get('/:idDetalle', listarInfo);
detallesRouter.delete('/:idDetalle', borrar);
detallesRouter.put('/:idDetalle', actualizar);

export { detallesRouter };
