//Traemos el modelo de la base de datos del role
const Role = require("../models/role")
const Usuario = require("../models/usuario")

const esRoleValido = async(rol='') =>{
    const existeRol = await Role.findOne({rol})
    //Si no existe el rol
    if(!existeRol){
        //Esto es un error personalizado
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo='') =>{
    const existeEmail = await Usuario.findOne({correo}) //una redundacia de lo que esta dentro de los argumentos peude ser esto correo:correo
    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado en la BD`)
    }
}

const existeUsuarioPorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id) //revisar esta funcion al parecer no funciona
    if(!existeUsuario){
        throw new Error(`El id ${id} no esta en la BD`)
    }
}

module.exports= {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}