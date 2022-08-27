const mongoose = require('mongoose')


const dbConnection = async ()=>{
    //En la conexiones a bd siempre es necesario gestionarla con un try catch ya que no se tiene total control a la conexion
    try {
        //Primer argumento es el url de la BD
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //Los comente por que ya mongo no los soporta
            //useCreateIndex: true,
            //useFindAndModify:false
        })
        console.log('BD Online');
    } catch (error) {
        //se lanza este error ya que la app depende de la conexion a la BD
        console.log(error);
        throw new Error('Error al iniciar la BD')
    }

}

module.exports = {
    dbConnection
}