const { Schema, model } = require('mongoose')

//Este es el esquema que va a manjear nuestra informacion en el bd
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'] //podemos solo poner el true y ya pero este arreglo indica que el primer indice es si el nombre es requerido y el segundo indice indica el error que arrojaria en dado caso no se ponga el nombre
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'], 
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required:true,
        //Para controlar el tipo de rol 
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true //Esta en true por que cuando se crea un usuario por defecto va estar en true
    }, 
    google:{
        type: Boolean,//Indica si fue creado por google
        default:false //falso a menos que se especifique
    }
})

//sobre escribimos un metodo ya existente, y la funcion tiene que ser una normal nada de arrow fuction, por que vamos a usar un this y el this apuntaria a lo que esta aduera de este scope, y queremos que esl this vaya a la instancia creada.
//Es decir cuando se llama el toJSON esta funcion se ejecutara, usamos el operador ... para indicar que vamos a usar el resto de argumentos del modelo usuario, ese usuario que va despues del operador ... simplemente es el nombre que le damos a toda la coleccion de agumentos en vez de usuario hubieramos podido llamarlo pepito
UsuarioSchema.methods.toJSON = function(){
    //esto generara una instancia pero con sus valores respectivos por ejemplo con el nombre correo password role etc
    const{__v, password, _id,...usuario } = this.toObject()
    usuario.uid = _id //aqui le cambiamos el nombre de _id a uid
    return usuario
}

//primer argumento es el nombre de la coleccion y el segundo es el esquema
module.exports = model('Usuario',UsuarioSchema)