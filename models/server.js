const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //conectar BD
        this.conectarDB()

        //Middlewares son una funcion que se ejecuta cuando se levanta el server
        this.middlewares()
        //Cuando se cree el objeto Server el constructor  crea las rutas
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //lectura y parseo del body (cualquier peticion tipo post o delete esa informacion la va a tratar de pasar a tipo JSON)
        this.app.use(express.json())

        //el use es la palabra clave para decir que eso es un middleware
        //Para poder usar la carpeta public
        this.app.use(express.static('public')) //Esto se ejecuta primero que la ruta de abajo por que los middlewares son funciones que se ejecutan apenas se levanta el server
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Server corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server 