const { response } = require("express");

//este middleware es para validar que el usuario que esta haciendo la peticion sea un administrador y va despues de la validacion del token
const esAdminRole = (req, res = response, next) => {
    //si regresa undefined es porque no se valido el token
    //cada middleware tiene acceso a los datos de un anterior middlware
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    //si el usuario no es administrador
    const {rol, nombre} = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }
    next();
}

// ... si este operador va en el argumento de una funcion es para que se pueda pasar un numero indefinido de argumentos
const tieneRole = (...roles) => {

    //en los middlewares siempre tenemos que retornar una funcion para que se pueda ejecutar pero como necesitabamos pasar los roles como argumentos de la funcion por eso nuestro return es una funcion
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }// si esta condicion pasa es que tiene el rol del usuario y ya se valido el jwt

        //si el usuario no tiene ninguno de los roles que se pasaron como argumentos
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRole
}
