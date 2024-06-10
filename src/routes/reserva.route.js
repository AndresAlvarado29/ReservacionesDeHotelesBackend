import express from "express";

let reservaRouter = express.Router();

import { crear, listar, listarInfo, borrar, actualizar }
    from '../controllers/reserva.controlador.js';

reservaRouter.post('/', crear);
reservaRouter.get('/', listar);
reservaRouter.get('/:idReserva', listarInfo);
reservaRouter.delete('/:idReserva', borrar);
reservaRouter.put('/:idReserva', actualizar);

export { reservaRouter };
