import express from "express";

let router = express.Router();

export class usuarioRoutes {};

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/reserva.controlador.js';

router.post('/', crear);
router.get('/', listar);
router.get('/:idReserva', listarInfo);
router.delete('/:idReserva', borrar);
router.put('/:idReserva', actualizar);

export { router };
