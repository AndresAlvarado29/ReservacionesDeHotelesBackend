const { pool } = require('../dataBase.js')

module.exports = {

  listar: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM usuario");
    res.json(rows);
  },

  crear: async (req, res) => {
    const data = req.body;
    console.log(data);
    const { rows } = await pool.query("INSERT INTO usuario (datos de la tabla) values() RETURNING *",
      [data.name])
    return res.json(rows[0]);
  },

  listarInfo: async (req, res) => {
    const { idUsuario } = req.params;
    const { rows } = await pool.query('SELECT * FROM usuario WHERE id = $1', [idUsuario]);
    if (rows.length == 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.json(rows[0]);
  },

  prueba: async (req, res) => {
    try {
      console.log('ejecutando prueba')

      res.json({
        message: "Hola Mundo"
      })
    } catch (error) {
      console.log(error)
    }

  },
  borrar: async (req, res) => {
    const { idUsuario } = req.params
    const { rows, rowCount } = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [idUsuario]);
    console.log(rows)
    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204)
  },
  actualizar: async (req, res) => {
    const { idUsuario } = req.params;
    const data = req.body
    const { rows } = await pool.query('UPDATE usuario SET DATOS DEL USUARIO')
    console.log(result)
    return res.json(rows[0])
  }
}