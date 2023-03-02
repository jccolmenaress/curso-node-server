const {Router } = require('express')
const { check } = require('express-validator')
const {login} = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validad-campos')
const router = Router()//llamo la funcion de Router

router.post('/login', 
[
    check('correo', 'el correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login) // /login aunque la ruta completa es /api/auth/login, pero esa ya esta especificada solo se le pone /login


module.exports = router