import { pool } from '../database/database.js';

export class reservaControlador {};

export let listar = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM reserva');
    res.json(rows);
};

export let crear = async (req, res) => {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query('INSERT INTO reserva ($1) values () RETURNING *', [data.name]);
    return res.json(rows[0]);
};

export let listarInfo = async (req, res) => {
    const { idReserva } = req.params;
    const { rows } = await pool.query('SELECT * FROM reserva WHERE id = $1',[idReserva]);
    if (rows.length == 0){
        return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(rows[0]);
};

export let borrar = async (req, res) => {
    const { idReserva } = req.params;
    const { rows, rowCount } = await pool.query('DELETE FROM reserva WHERE  id = $1 RETURNING *', [idReserva]);
    console.log(rows);
    if(rowCount === 0) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    return res.sendStatus(204);
};

export let actualizar = async(req, res) => {
    const { idReserva } = req.params;
    const data = req.body;
    const { rows } = await pool.query('UPDATE reserva SET');
    console.log(result);
    return res.json(rows[0]);
};
