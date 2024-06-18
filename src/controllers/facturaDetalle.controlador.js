import { sequelize } from '../database/database.js';
import { FacturaDetalle } from '../models/facturaDetalle.js';

export class detalleControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const detalles = await FacturaDetalle.findAll( { transaction: t });
            return detalles;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos detalle: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const detalle = await FacturaDetalle.create(data, { transaction: t });
            return detalle;
        });
        console.log(result);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json(
            { message: "Error en el ingreso de datos del detalle" }
        );
    }
};

export let listarInfo = async (req, res) => {
    const { idDetalle } = req.params;
    console.log('Buscando detalle con código: ', idDetalle);
    try {
        const result = await sequelize.transaction( async t => {
            const detalles = await FacturaDetalle.findAll({
                where: {
                    codigo_detalle: idDetalle
                },
            },
            {
                    transaction: t
            });
            return detalles;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Detalle no encontrado" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Detalle no encontrado" });
    }
};

export let borrar = async (req, res) => {
    const { idDetalle } = req.params;
    console.log('Borrando el detalle con código: ', idDetalle);
    try {
        const result = await sequelize.transaction( async t => {
            const detalles = await FacturaDetalle.destroy({
                where: {
                    codigo_detalle: idDetalle
                },
            },
            {
                    transaction: t
            });
            return detalles;
        });
        console.log(result);
        if(result != 0){
            return res.status(200).json(
                { message: "Se eliminó el detalle con código " + idDetalle }
            );
        }
        return res.status(404).json({ message: "Detalle no encontrado" });
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Detalle no encontrado" });
    }
};

export let actualizar = async (req, res) => {
    const { idDetalle } = req.params;
    const data = req.body;
    console.log("Actualizando el detalle con código: ", idDetalle);
    try {
        const result = await sequelize.transaction( async t => {
            const detalles = await FacturaDetalle.update(
                data,
                {
                    where: {
                        codigo_detalle: idDetalle
                    },
                },
                {
                    transaction: t
                }
            );
            return detalles;
        });
        console.log(result);
        if(result == 0){
            return res.status(404).json({ message: "Detalle no encontrado" });
        }
        return res.status(200).json(
            { message: "Se actualizó el detalle con código " + idDetalle }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Detalle no encontrado" });
    }
};

