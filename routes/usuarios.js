const {Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')



//Traemos el middleware que creamos manualmente dentro de la carpeta de middlwares el cual valida todos los campos del usuaio
const {validarCampos} = require("../middlewares/validad-campos")

//A este router le vamos a configurar todas las rutas
const router = Router()//llamo la funcion de Router

router.get('/', usuariosGet) //usuariosGet no se esta ejecutando solo esta pasando la referencia
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)
//Cuando mandamos 3 argumentos el segundo argumento es para poner los middlewares
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),//Que no esta vacio el campo requerido
    check('password', 'El password es obligatorio y debe ser mayor a 6 letras').isLength({min:6}),
    check('correo', 'el correo no es valido') .isEmail(),//es un middleware que revisa que campo del body se necesita revisar y va guardando todos los errores que se van almacenando en la lista de middlewares
    check('correo').custom(emailExiste),
    //si queremos validar los roles es mejor hacerlo contra la base de datos ya que hacerlo como esta abajo si hay mas roles se vuelve mucho mas engorrosa la validacion
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //Va ser una verificacion personalizada, para un mejor manejo del codigo y no volver a copiar y pegar ese mismo codigo la funcion asyncrona de abajo ira en la carpeta de helpers en db-validators.
    check('rol').custom(esRoleValido), //Esto que esta aca a mano izquierda es la simplificacion de esto check('rol').custom((rol)=> esRoleValido(rol))
    validarCampos
], usuariosPost)
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)
router.patch('/', usuariosPatch)






module.exports = router