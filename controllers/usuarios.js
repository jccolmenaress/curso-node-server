//Esto es para que no haya problemas  al momento de usar el argumento res
const {response, request} = require('express');

const usuariosGet = (req = request, res = response)=>{
//Lo bueno de express es que el nos parsea todos los parametros que pidamos en una peticion 
    const {q,nombre = 'no name',apikey, page, limit} = req.query

    res.json({
        msg: 'get API -  controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut =  (req,res = response)=>{
const {id} = req.params //Ese .id depende de lo que le hayamos puesto en las rutas, lo destructuramos ya que pueden venir mas parametros

    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosPost =  (req,res)=>{
    //Extraemos el body de las peticiones post
    const {nombre, edad} = req.body

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosDelete =   (req,res)=>{
    res.json({
        msg: 'delete API - controlador'
    })
}

const usuariosPatch = (req,res)=>{
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}