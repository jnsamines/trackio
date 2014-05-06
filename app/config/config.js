// config.js
// Configuracion global de la aplicacion
// Author : Jonathan Samines [jnsamines]

// configuracion de entornos
var environment = {
    
    // configuracion del entorno de desarrollo
    dev : {
        mode : 'development',
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
 
// se exporta el módulo
module.exports = {
    
    // Obtiene los settings de configuracion adecuados al entorno
    // <param name='env_param'>Entorno a configurar.</param>
    load : function(env){
        // se obtienen las configuraciones del entorno y se devuelven
        return environment[env];
    }
};
