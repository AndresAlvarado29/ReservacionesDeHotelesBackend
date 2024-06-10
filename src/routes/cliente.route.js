import express from "express";

let clienteRouter = express.Router();

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/cliente.controlador.js';

clienteRouter.post('/', crear);
clienteRouter.get('/', listar);
clienteRouter.get('/:idCliente', listarInfo);
clienteRouter.delete('/:idCliente', borrar);
clienteRouter.put('/:idCliente', actualizar);

export { clienteRouter };
