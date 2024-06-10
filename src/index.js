import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import { rutas_init } from './routes/index.routes.js';
import { sequelize } from './database/database.js';
import { Usuario, Cliente, Habitacion, Reserva, FacturaDetalle,
    FacturaCabecera } from './associations/associations.js';
//import { Habitacion } from './associations/associations.js';
//import { Usuario } from './associations/associations.js';

//reconoce los .json y recive los formularios para post o get
const configuracionApi = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
}

const configuracionRouter = (app) => {
    app.use('/api/', rutas_init());
}

async function init() {
    try {
        await sequelize.sync();
        console.log("Conexion establecida");
        //instancia de express
        const app = express();
        //configura api
        configuracionApi(app);
        //ruta
        configuracionRouter(app);
        //puerto
        app.listen(process.env.PORT, () => console.log('La aplicacion se está ' +
            'ejecutando en el puerto: localhost:' + process.env.PORT));
    } catch (error) {
        console.error("Error en la conexion con la base de datos", error);
    }
}

init();
