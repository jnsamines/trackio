// usuario.js
// Modelo de datos para Usuario
// Author : Jonathan Samines [jnsamines]

define(['core/model'], function(Model){

    // Modelo de datos para usuario
    var Usuario = function(properties){
        this.set(properties);
        this.initialize(arguments);
    };

    Usuario.prototype = new Model({
        defaults : {
            nombreUsuario : 'Usuario Anónimo',
            nombreCompleto : '',
            apellidoCompleto : '',
            email : ''
        },
        events : {
            "change:nombreUsuario" : function(property, value){
                console.log('El nombre de usuario a cambiado a : ' + value);
            }
        }
    });

    return Usuario;
});