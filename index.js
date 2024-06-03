const express = require('express')

const globalConstants = require('./const/globalConstants')

//reconoce los .json y recive los formularios para post o get
const configuracionApi = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
}

const init = () => {
    const app = express() //instancia de express
    configuracionApi(app) //configura api
    app.listen(globalConstants.PORT,() => console.log('La aplicaciion se esta ejecutando en el puerto:'+globalConstants.PORT));
}

init();