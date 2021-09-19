const {Router } = require('express')
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios')

//A este router le vamos a configurar todas las rutas
const router = Router()//llamo la funcion de Router

router.get('/', usuariosGet) //usuariosGet no se esta ejecutando solo esta pasando la referencia
router.put('/:id', usuariosPut)
router.post('/', usuariosPost)
router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch)






module.exports = router