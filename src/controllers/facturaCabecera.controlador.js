import { sequelize } from '../database/database.js';
import { FacturaCabecera } from '../models/facturaCabecera.js';

export class usuarioControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const facturas = await FacturaCabecera.findAll( { transaction: t });
            return facturas;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos factura: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const factura = await FacturaCabecera.create(data, { transaction: t });
            return factura;
        });
        console.log(result);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json(
            { message: "Error en el ingreso de datos de la factura" }
        );
    }
};

export let listarInfo = async (req, res) => {
    const { idCabecera } = req.params;
    console.log('Buscando factura con código: ', idCabecera);
    try {
        const result = await sequelize.transaction( async t => {
            const facturas = await FacturaCabecera.findAll({
                where: {
                    codigo_factura: idCabecera
                },
            },
            {
                    transaction: t
            });
            return facturas;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Factura no encontrado" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Factura no encontrado" });
    }
};

export let borrar = async (req, res) => {
    const { idCabecera } = req.params;
    console.log('Borrando la factura con código: ', idCabecera);
    try {
        const result = await sequelize.transaction( async t => {
            const facturas = await FacturaCabecera.destroy({
                where: {
                    codigo_factura: idCabecera
                },
            },
            {
                    transaction: t
            });
            return facturas;
        });
        console.log(result);
        if(result === 0){
            return res.status(404).json({ message: "Factura no encontrado" });
        }
        return res.status(200).json(
            { message: "Se eliminó la factura con código " + idCabecera }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Factura no encontrado" });
    }
};

export let actualizar = async (req, res) => {
    const { idCabecera } = req.params;
    const data = req.body;
    console.log("Actualizando la factura con código: ", idCabecera);
    try {
        const result = await sequelize.transaction( async t => {
            const facturas = await FacturaCabecera.update(
                data,
                {
                    where: {
                        codigo_factura: idCabecera
                    },
                },
                {
                    transaction: t
                }
            );
            return facturas;
        });
        console.log(result);
        if(result != 0){
            return res.status(200).json(
                { message: "Se actualizó la factura con código " + idCabecera }
            );
        }
        return res.status(404).json({ message: "Factura no encontrado" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Factura no encontrado" });
    }
};

