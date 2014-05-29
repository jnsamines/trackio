// application.js
// Controlador principal para las rutas estáticas de la aplicacion
// Author : Jonathan Samines [jnsamines]

var auth = require('../helpers/authentication'),
    logger = require('../config/logger'),
    Usuario = require('../models/usuario');

// Controlador de aplicacion
// <param name='root'>Ruta principal del mapeo</param>
// <param name='router'>Router principal de la aplicacion</param>
var ApplicationController = function(root, router){
    this.router = router;
    this.root = root;
};

ApplicationController.prototype.info = function(request, response, next){
    response.locals.title = 'Trackio';
    response.locals.usuario = request.session.usuario;
    next();
};


// Carga los bindins de las rutas de la aplicacion
ApplicationController.prototype.map = function(){
    // root
    this.router.use( this.info );
    this.router.route( this.root ).get( auth.authorized, this.home );

    // rutas de logueo
    this.router.route( this.root + '/login' )
        .get( auth.anonymous, this.loginview )
        .post( this.login );

    this.router.route( this.root + '/logout' )
        .get( auth.authorized, this.logout );

};

// Ruta '/home' de la aplicacion
ApplicationController.prototype.home = function(request, response){
    response.render('index');
};

// Ruta '/login' de la aplicacion
// vista de inicio de sesión
ApplicationController.prototype.loginview = function(request, response){
    response.render('login', { title : 'Trackio - Inicio de Sesión'});
};

// ruta '/login'
// logica de inicio de sesión
ApplicationController.prototype.login = function(request, response){
    // try to login
    var username = request.body.username;
    var password = request.body.password;

    Usuario.findOne({ nombreUsuario : username, password : password }, function(error, usuario){
        if(error){
            var message = 'Error al realizar la búsqueda del usuario.';
            logger.error(message, error);
            response.render('login',{ message : message });
        }

        if(usuario === undefined){
            response.redirect('/login',{ message : 'Usuario no encontrado'});
        }

        request.session.usuario = usuario.toObject({ virtuals : true });
        response.redirect('/');
    });
};

// Ruta '/logout' de la aplicación
// cierra la sesión del usuario
ApplicationController.prototype.logout = function(request, response){
    request.session.destroy();
    response.redirect('/login');
};

module.exports = ApplicationController;