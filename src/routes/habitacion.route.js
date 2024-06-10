import express from "express";

let router = express.Router();

import { crear, listar , listarInfo, borrar, actualizar } from '../controllers/habitacion.controlador.js';

router.post('/', crear);
router.get('/', listar);
router.get('/:idHabitacion', listarInfo);
router.delete('/:idHabitacion', borrar);
router.put('/:idHabitacion', actualizar);

export { router };
