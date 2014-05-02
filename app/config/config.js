// config.js
// Configuracion global de la aplicacion
// Author : Jonathan Samines [jnsamines]

module.exports = {
    
    // configuracion del entorno de desarrollo
    dev : {
        name : 'development',
        port : 4000,
        database : {
            host : 'localhost',
            port : 27017,
            database : 'trackio',
            user : '',
            password : ''
        }
    }
};