import { sequelize } from '../database/database.js';
import { Habitacion } from '../models/habitacion.js';

export class habitacionControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const habitaciones = await Habitacion.findAll( { transaction: t });
            return habitaciones;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos habitacion: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const habitacion = await Habitacion.create(data, { transaction: t });
            return habitacion;
        });
        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json(
            { message: "Error en el ingreso de datos de la habitacion" }
        );
    }
};

export let listarInfo = async (req, res) => {
    const { idHabitacion } = req.params;
    console.log('Buscando habitacion con código: ', idHabitacion);
    try {
        const result = await sequelize.transaction( async t => {
            const habitaciones = await Habitacion.findAll({
                where: {
                    codigo_habitacion: idHabitacion
                },
            },
            {
                    transaction: t
            });
            return habitaciones;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Habitacion no encontrada" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Habitacion no encontrada" });
    }
};

export let borrar = async (req, res) => {
    const { idHabitacion } = req.params;
    console.log('Borrando la habitacion con código: ', idHabitacion);
    try {
        const result = await sequelize.transaction( async t => {
            const habitaciones = await Habitacion.destroy({
                where: {
                    codigo_habitacion: idHabitacion
                },
            },
            {
                    transaction: t
            });
            return habitaciones;
        });
        console.log(result);
        if(result == 0){
            return res.status(404).json({ message: "Habitacion no encontrada" });
        }
        return res.status(200).json(
            { message: "Se eliminó la habitacion con código " + idHabitacion }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Habitacion no encontrada" });
    }
};

export let actualizar = async (req, res) => {
    const { idHabitacion } = req.params;
    const data = req.body;
    console.log("Actualizando la habitacion con código: ", idHabitacion);
    try {
        const result = await sequelize.transaction( async t => {
            const habitaciones = await Habitacion.update(
                data,
                {
                    where: {
                        codigo_habitacion: idHabitacion
                    },
                },
                {
                    transaction: t
                }
            );
            return habitaciones;
        });
        console.log(result);
        if(result == 0){
            return res.status(404).json({ message: "Habitacion no encontrada" });
        }
        return res.status(200).json(
            { message: "Se actualizó la habitacion con código " + idHabitacion }
        );
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Habitacion no encontrada" });
    }
};

