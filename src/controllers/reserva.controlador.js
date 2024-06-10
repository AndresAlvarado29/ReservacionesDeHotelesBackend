import { sequelize } from '../database/database.js';
import { Reserva } from '../models/reserva.js';

export class reservaControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const reservas = await Reserva.findAll( { transaction: t });
            return reservas;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos reserva: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const reserva = await Reserva.create(data, { transaction: t });
            return reserva;
        });
        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json(
            { message: "Error en el ingreso de datos de la reserva" }
        );
    }
};

export let listarInfo = async (req, res) => {
    const { idReserva } = req.params;
    console.log('Buscando reserva con código: ', idReserva);
    try {
        const result = await sequelize.transaction( async t => {
            const reservas = await Reserva.findAll({
                where: {
                    codigo_reserva: idReserva
                },
            },
            {
                    transaction: t
            });
            return reservas;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Reserva no encontrada" });
    }
};

export let borrar = async (req, res) => {
    const { idReserva } = req.params;
    console.log('Borrando la reserva con código: ', idReserva);
    try {
        const result = await sequelize.transaction( async t => {
            const reservas = await Reserva.destroy({
                where: {
                    codigo_reserva: idReserva
                },
            },
            {
                    transaction: t
            });
            return reservas;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        return res.status(200).json(
            { message: "Se eliminó la reserva con código " + idReserva }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Reserva no encontrada" });
    }
};

export let actualizar = async (req, res) => {
    const { idReserva } = req.params;
    const data = req.body;
    console.log("Actualizando la reserva con código: ", idReserva);
    try {
        const result = await sequelize.transaction( async t => {
            const reservas = await Reserva.update(
                data,
                {
                    where: {
                        codigo_reserva: idReserva
                    },
                },
                {
                    transaction: t
                }
            );
            return reservas;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        return res.status(200).json(
            { message: "Se actualizó la reserva con código " + idReserva }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Reserva no encontrada" });
    }
};

