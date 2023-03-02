const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    //json web token trabaja con promesas
    return new Promise((resolve, reject) => {
        //se puede manejar otros datos como el nombre del usuario
        const payload = {uid}
        //sing firma el token , SECRETORPRIVATEKEY es la key para firmar los json web token
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

exports.generarJWT = generarJWT