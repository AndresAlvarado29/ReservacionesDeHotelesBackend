import express from "express";

let router = express.Router();

export class clienteRoutes {};

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/cliente.controlador.js';

router.post('/', crear);
router.get('/', listar);
router.get('/:idCliente', listarInfo);
router.delete('/:idCliente', borrar);
router.put('/:idCliente', actualizar);

export { router };
