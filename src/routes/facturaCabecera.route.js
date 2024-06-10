import express from "express";

let cabeceraRouter = express.Router();

import { crear, listar, listarInfo, borrar, actualizar }
    from '../controllers/facturaCabecera.controlador.js';

cabeceraRouter.post('/', crear);
cabeceraRouter.get('/', listar);
cabeceraRouter.get('/:idCabecera', listarInfo);
cabeceraRouter.delete('/:idCabecera', borrar);
cabeceraRouter.put('/:idCabecera', actualizar);

export { cabeceraRouter };
