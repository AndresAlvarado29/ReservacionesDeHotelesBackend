import express from "express";

let cabeceraRouter = express.Router();

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/facturaCabecera.controlador.js';

cabeceraRouter.post('/', crear);
cabeceraRouter.get('/', listar);
cabeceraRouter.get('/:idFacturaCabecera', listarInfo);
cabeceraRouter.delete('/:idFacturaCabecera', borrar);
cabeceraRouter.put('/:idFacturaCabecera', actualizar);

export { cabeceraRouter };
