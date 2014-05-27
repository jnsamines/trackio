// application.js
// Controlador principal para las rutas estáticas de la aplicacion
// Author : Jonathan Samines [jnsamines]


// Controlador de aplicacion
// <param name='root'>Ruta principal del mapeo</param>
// <param name='router'>Router principal de la aplicacion</param>
var ApplicationController = function(root, router){
    this.router = router;
    this.root = root;
};

// Carga los bindins de las rutas de la aplicacion
ApplicationController.prototype.map = function(){
    this.router.route( this.root ).get( this.home );
    this.router.route( this.root + '/login' ).get( this.login );
};

// Ruta '/home' de la aplicacion
ApplicationController.prototype.home = function(request, response){
    response.render('index', { title : 'Trackio'});
};

ApplicationController.prototype.login = function(request, response){
    response.render('login', { title : 'Trackio - Inicio de Sesión'});
};


module.exports = ApplicationController;