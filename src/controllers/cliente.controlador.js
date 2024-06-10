import { pool } from '../database/database.js';

export class clienteControlador {};

export let listar = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM cliente');
    res.json(rows);
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query('INSERT INTO cliente ($1) ' +
        'values() RETURNING *', [data.name]);
    return res.json(rows[0]);
};

export let listarInfo = async (req, res) => {
    const { idCliente } = req.params;
    const { rows } = await pool.query('SELECT * FROM cliente WHERE id = $1',
        [idCliente]);
    if (rows.length == 0){
        return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(rows[0]);
};

export let borrar = async (req, res) => {
    const { idCliente } = req.params;
    const { rows, rowCount } = await pool.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [idCliente]);
    console.log(rows);
    if(rowCount === 0) {
        return res.status(404).json({ message: 'Cliente no encontrado'});
    }
    return res.sendStatus(204);
};

export let actualizar = async(req, res) => {
    const { idCliente } = req.params;
    const data = req.body;
    const { rows } = await pool.query('UPDATE cliente SET');
    console.log(result);
    return res.json(rows[0]);
};
