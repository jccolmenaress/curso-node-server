const validaJWT = require('../middlewares/validad-jwt')
//Traemos el middleware que creamos manualmente dentro de la carpeta de middlwares el cual valida todos los campos del usuaio
const validaCampos = require("../middlewares/validad-campos")
const validaRoles = require('../middlewares/validar-roles')

module.exports = {
    //con el ... estamos exportando todo lo que esta dentro de la carpeta de middlewares
    ...validaJWT,
    ...validaCampos,
    ...validaRoles
}