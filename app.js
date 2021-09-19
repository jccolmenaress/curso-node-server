//Las importaciones de terceros van arriba, luegos nuestras importaciones, pero las importaciones propias de node esas van antes que las de terceros
//Traemos el paquete que permite leer las variables de entorno
require('dotenv').config()
const Server = require('./models/server');

//Todo el server se puede hacer de esta forma y no hay problema pero para esta vez se va a usar clases para montar el server+
/*
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(process.env.PORT , ()=>{
    console.log(`Server corriendo en el puerto ${process.env.PORT}`);
})*/

const server = new Server();

server.listen()
