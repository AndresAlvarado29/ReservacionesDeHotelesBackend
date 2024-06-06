import express from "express";

let router = express.Router();

export class usuarioRoutes{};

import { prueba, crear ,listar, listarInfo, borrar, actualizar } from '../controllers/usuario.controlador.js';

router.get('/', prueba);
router.post('/', crear);
router.get('/', listar);
router.get('/:idUsuario', listarInfo);
router.delete('/:idUsuario', borrar);
router.put('/:idUsuario', actualizar);

export { router };
