//Esto es para que no haya problemas  al momento de usar el argumento res
const {response, request} = require('express');

//el modulo bcriptjs es para encriptar las contraseñas de los usuarios
const bcryptjs = require('bcryptjs')
//El Usuario va en mayuscula debido a que eso le va a permitir crear instancias del modelo
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response)=>{
//Lo bueno de express es que el nos parsea todos los parametros que pidamos en una peticion 
    //const {q,nombre = 'no name',apikey, page, limit} = req.query
    const query ={estado:true}
    const {limite = 5, desde=0} = req.query //el limite que devuelve aqui es un string por eso lo pasamos a number
    //const usuarios = await Usuario.find(query)//asi se hace un filtro
    //.skip(Number(desde))
    //.limit(Number(limite))
    //const total = await  Usuario.countDocuments(query)

    //como cada peticion con el await consume tiempo de espera quiero ejecutar todo de un solo tiron, hacemos una destructuracion de arreglos y no de objetos ya que es un arreglo de promesas
    const [total, usuarios] = await Promise.all([//ejecuta ambas promesas de forma simultanea y no continua hasta que cada una funcione y si una da error todas dan error
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    
    ])
    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req,res = response)=>{
const {id} = req.params //Ese .id depende de lo que le hayamos puesto en las rutas, lo destructuramos ya que pueden venir mas parametros
//extraigo lo que no necesito grabar
const {_id,password, google,correo, ...resto} = req.body
//Validar contra BD
if(password){
    const salt = bcryptjs.genSaltSync()
    //Creamos el hash
    resto.password = bcryptjs.hashSync(password, salt);
}
//Actualizo el registro
const usuario = await Usuario.findByIdAndUpdate(id, resto)//resto es toda la informacion que quiero actualizar
    res.json({
        usuario
    })
}

const usuariosPost = async (req,res)=>{
    
    //Extraemos el body de las peticiones post
    const {nombre,correo,password,rol} = req.body
    //Si tuvieramos muchisimos campos en vez de desestructurar lo que hariamos seria lo siguiente
    //const {google, ... resto} = req.body donde resto es el resto de argumentos y se pasa abajo como argumento cuando se crear la instancia de Usuario

    const usuario = new Usuario({nombre, correo, password, rol});
    //verificar si el correo existe
    //const existeEmail = await Usuario.findOne({correo}) //una redundacia de lo que esta dentro de los argumentos peude ser esto correo:correo
    //if(existeEmail){
    //    return res.status(400).json({
    //        msg: ' El correo ya esta registrado'
    //    })
    //}
    //Encriptar la contraseña
    //el genSaltSync sirve para indicar el numero de encriptaciones que tendra el password como el numero de vueltas, el valor por defecto es 10 si le ponemos mas pues se tardara mas en encriptar el password
    const salt = bcryptjs.genSaltSync()
    //Creamos el hash
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardar en BD


    //Grabar registro en la BD de moongose
    await usuario.save() 

    res.json({
        usuario
    })
}

const usuariosDelete =  async (req,res)=>{
    const {id} = req.params
    //aca ya se valido el token y por lo tanto podemos extraer el uid
    const uid  = req.uid
    //fisicamente lo borramos pero no es recomendable ya que se pierde toda referencia de ese usuario por lo tanto es que usamos el campo estado lo cambiamos a false eso significa que ese usuario esta eliminado pero sin perder su referencia
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    //const usuarioAutenticado = req.usuario
    res.json({
        usuario,
        //usuarioAutenticado
    })
}

const usuariosPatch = (req,res)=>{
    const {id} = req.params
    res.json({
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}