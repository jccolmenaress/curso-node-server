
const {Schema, model} = require('mongoose')

const RoleSchema = Schema({
    rol:{
        type:String,
        //Hago obligatorio el campo
        required:[true,'El rol es obligatorio']
    }
})

module.exports = model('Role',RoleSchema)