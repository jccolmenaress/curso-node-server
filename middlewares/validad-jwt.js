const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
//usualmente el token va en el header
//recordemos que el next indica que se va a ejecutar la siguiente funcion
const validarJWT= async(req= request, res = response, next)=>{
    const token = req.header('x-token');
    //si no viene el token 
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })//401 es que no esta autorizado
    }
    try {
        //si el token es invalido lanza un throw error por eso usamos el trey catch para capturar el error
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leo el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        //si el usuario es undefined
        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - usuario no existe en DB'
            })
        }

        //si el usuario no existe
        if(!usuario.estado){//si esto es false
            return res.status(401).json({
                msg:'Token no valido - usuario con estado false'
            })
        }
        //aqui ya el usuario esta autenticado
        req.usuario = usuario;
        //se crea una nueva propiedad en el request llamad uid y se le asigna el uid que viene del token, aunque lo que se hace es que se pueda acceder a eos uid dependiendo el rol.
        

        //req.uid = uid;
        //para que continue con lo que sigue
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }
    
}

module.exports={
    validarJWT
}