import express from "express";

let usuarioRouter = express.Router();

import { crear ,listar, listarInfo, borrar, actualizar } from '../controllers/usuario.controlador.js';

usuarioRouter.post('/', crear);
usuarioRouter.get('/', listar);
usuarioRouter.get('/:idUsuario', listarInfo);
usuarioRouter.delete('/:idUsuario', borrar);
usuarioRouter.put('/:idUsuario', actualizar);

export { usuarioRouter };
