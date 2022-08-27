//Este middleware permite validar los campos de entrada como el nombre, correo, rol etc esto lo hacemos para no estar copiando y pegando el mismo codigo 

//permite extraer todos los erroes que vamos recopilando de los middlewares
const { validationResult } = require('express-validator');

//los middlewares tienen un tercer argumento llamado next, el cual se llama si no da ningun error
const validarCampos =(req, res, next)=>{
    const errors = validationResult(req)
    //Si hay errores
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next();//Siga con el siguiente middleware, y si no hay ningun middleware pues siga con el controlador
}

module.exports = {
    validarCampos
}