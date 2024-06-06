const express = require('express')
const Sequelize = require('sequelize')
const morgan = require('morgan')
const globalConstants = require('./const/globalConstants')
const routerConfig = require('./routes/index.routes')
const { sequelize } = require('./database/dataBase')

//reconoce los .json y recive los formularios para post o get
const configuracionApi = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan('dev'))
}

const configuracionRouter = (app) => {
    app.use('/api/', routerConfig.rutas_init())
}


async function init() {
    //prueba de coneccion
    try {
        await sequelize.authenticate();
        console.log("Conexion establecida")
        //instancia de express
        const app = express()
        //configura api
        configuracionApi(app)
        //ruta
        configuracionRouter(app)
        //puerto
        app.listen(globalConstants.PORT, () => console.log('La aplicacion se esta ejecutando en el puerto:' + globalConstants.PORT));
    } catch (error) {
        console.error("Error en la conexion con la base de datos", error);
    }

}

init();
