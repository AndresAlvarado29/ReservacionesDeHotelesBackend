import express from "express";

let router = express.Router();

export class facturaCabeceraRoutes {};

import { crear, listar, listarInfo, borrar, actualizar } from '../controllers/facturaCabecera.controlador.js';

router.post('/', crear);
router.get('/', listar);
router.get('/:idFacturaCabecera', listarInfo);
router.delete('/:idFacturaCabecera', borrar);
router.put('/:idFacturaCabecera', actualizar);

export { router };
