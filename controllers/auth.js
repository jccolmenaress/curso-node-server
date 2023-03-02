const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res= response) =>{
    const {correo, password} = req.body
    try {
        //verificamos si el email existe
        const usuario = await Usuario.findOne({correo})
        //si el usuario no existe
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario o Contraseña no son correctos - correo'
            })
        }

        //verificamos si el usuario esta activo en la bd
        if(usuario.estado === false){
            return res.status(400).json({
                msg:'Usuario o Contraseña no son correctos - estado:false'
            })
        }
        //verificamos la contraseña
        //compara los password
        const validPassword = bcryptjs.compareSync(password, usuario.password) //devuelve un booleano
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario o Contraseña no son correctos - password'
            })
        }


        //generamos el jwt
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el admin'
        })
    }
    
}


module.exports = {
    login
}