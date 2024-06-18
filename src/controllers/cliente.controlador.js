import { sequelize } from '../database/database.js';
import { Cliente } from '../models/cliente.js';

export class clienteControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const clientes = await Cliente.findAll( { transaction: t });
            return clientes;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos cliente: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const cliente = await Cliente.create(data, { transaction: t });
            return cliente;
        });
        console.log(result);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json(
            { message: "Error en el ingreso de datos del cliente" }
        );
    }
};

export let listarInfo = async (req, res) => {
    const { idCliente } = req.params;
    console.log('Buscando cliente con código: ', idCliente);
    try {
        const result = await sequelize.transaction( async t => {
            const clientes = await Cliente.findAll({
                where: {
                    codigo_cliente: idCliente
                },
            },
            {
                    transaction: t
            });
            return clientes;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Cliente no encontrado" });
    }
};

export let borrar = async (req, res) => {
    const { idCliente } = req.params;
    console.log('Borrando el cliente con código: ', idCliente);
    try {
        const result = await sequelize.transaction( async t => {
            const clientes = await Cliente.destroy({
                where: {
                    codigo_cliente: idCliente
                },
            },
            {
                    transaction: t
            });
            return clientes;
        });
        console.log(result);
        if(result != 0){
            return res.status(200).json(
                { message: "Se eliminó el cliente con código " + idCliente }
            );
            
        }
        return res.status(404).json({ message: "Cliente no encontrado" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Cliente no encontrado" });
    }
};

export let actualizar = async (req, res) => {
    const { idCliente } = req.params;
    const data = req.body;
    console.log("Actualizando el cliente con código: ", idCliente);
    try {
        const result = await sequelize.transaction( async t => {
            const clientes = await Cliente.update(
                data,
                {
                    where: {
                        codigo_cliente: idCliente
                    },
                },
                {
                    transaction: t
                }
            );
            return clientes;
        });
        console.log(result);
        if(result != 0){
            return res.status(200).json(
                { message: "Se actualizó el cliente con código " + idCliente }
            );
        }
        return res.status(404).json({ message: "Cliente no encontrado" });
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Cliente no encontrado" });
    }
};
