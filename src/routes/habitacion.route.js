import express from "express";

let habitacionRouter = express.Router();

import { crear, listar , listarInfo, borrar, actualizar } from '../controllers/habitacion.controlador.js';

habitacionRouter.post('/', crear);
habitacionRouter.get('/', listar);
habitacionRouter.get('/:idHabitacion', listarInfo);
habitacionRouter.delete('/:idHabitacion', borrar);
habitacionRouter.put('/:idHabitacion', actualizar);

export { habitacionRouter };
