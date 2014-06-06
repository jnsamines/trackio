// usuario.js
// Controlador de datos para Usuario
// Author : Jonathan Samines [jnsamines]

define(['core/collection', 'models/usuario'], function(Collection, Usuario){

    var UsuarioCollection = function(){};
    UsuarioCollection.prototype = new Collection({
        model : Usuario,
        url : '/api/usuario'
    });

    return UsuarioCollection;
});