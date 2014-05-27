// authentication.js
// Middleware para la autenticación de la sesión
// Author : Jonathan Samines [jnsamines]

module.exports = function(request, response, next){
    // si no existe objeto de sesión
    if(request.session === undefined) response.redirect('/login');

    // si no hay un usuario definido, redireccionamos a la página de login
    // con estado NOT_AUTHORIZED
    if(request.session.usuario === undefined) response.redirect('/login');

    next();
};