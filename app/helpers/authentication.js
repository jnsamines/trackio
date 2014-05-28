// authentication.js
// Middleware para la autenticación de la sesión
// Author : Jonathan Samines [jnsamines]

var authentication = {};

// Middleware utilizado cuando se requiera autorización en una página
authentication.authorized = function(request, response, next){
    // si no hay un usuario definido, redireccionamos a la página de login
    // con estado NOT_AUTHORIZED
    if(request.session.usuario === undefined)
        response.redirect('/login');
    else
        next();
};

// Middleware utilizado cuando se permite el acceso sin autenticación
authentication.anonymous = function(request, response, next){
    if(request.session.usuario !== undefined)
        response.redirect('/');
    else
        next();
};

module.exports = authentication;