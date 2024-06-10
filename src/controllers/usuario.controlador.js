import { pool } from '../database/database.js';
import { sequelize } from '../database/database.js';
import { Usuario } from '../models/usuario.js';

export class usuarioControlador {};

export let listar = async (req, res) => {
    try {
        const result = await sequelize.transaction( async t => {
            const usuarios = await Usuario.findAll( { transaction: t });
            return usuarios;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log('Datos usuario: ', data);
    try {
        const result = await sequelize.transaction(async t => {
            const usuario = await Usuario.create(data, { transaction: t });
            return usuario;
        });
        console.log(result);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error en el ingreso de datos del usuario" });
    }
};

export let listarInfo = async (req, res) => {
    const { idUsuario } = req.params;
    console.log('Buscando usuario con código: ', idUsuario);
    try {
        const result = await sequelize.transaction( async t => {
            const usuarios = await Usuario.findAll({
                where: {
                    codigo_usuario: idUsuario
                },
            },
            {
                    transaction: t
            });
            return usuarios;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
};

export let borrar = async (req, res) => {
    const { idUsuario } = req.params;
    console.log('Borrando el usuario con código: ', idUsuario);
    try {
        const result = await sequelize.transaction( async t => {
            const usuarios = await Usuario.destroy({
                where: {
                    codigo_usuario: idUsuario
                },
            },
            {
                    transaction: t
            });
            return usuarios;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Se eliminó el usuario con código " + idUsuario });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
};

export let actualizar = async (req, res) => {
    const { idUsuario } = req.params;
    const data = req.body;
    console.log("Actualizando el usuario con código: ", idUsuario);
    try {
        const result = await sequelize.transaction( async t => {
            const usuarios = await Usuario.update(
                data,
                {
                    where: {
                        codigo_usuario: idUsuario
                    },
                },
                {
                    transaction: t
                }
            );
            return usuarios;
        });
        console.log(result);
        if(result.length == 0){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Se actualizó el usuario con código " + idUsuario });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
};

