const express = require('express')
const morgan = require('morgan')
const globalConstants = require('./const/globalConstants')
const routerConfig = require('./routes/index.routes')

//reconoce los .json y recive los formularios para post o get
const configuracionApi = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan('dev'))
}

const configuracionRouter = (app) => {
    app.use('/api/', routerConfig.rutas_init())
}
const init = () => {
    //instancia de express
    const app = express()
    //configura api
    configuracionApi(app)
    //ruta
    configuracionRouter(app)
    //puerto
    app.listen(globalConstants.PORT, () => console.log('La aplicacion se esta ejecutando en el puerto:' + globalConstants.PORT));
}

init();
