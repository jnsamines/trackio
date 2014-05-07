// application.js
// Controlador principal para las rutas estáticas de la aplicacion
// Author : Jonathan Samines [jnsamines]


// Controlador de aplicacion
// <param name='root'>Ruta principal del mapeo</param>
// <param name='router'>Router principal de la aplicacion</param>
var ApplicationController = function(root, router){
    this.router = router;
    this.mapper = router.route(root);
};

// Carga los bindins de las rutas de la aplicacion
ApplicationController.prototype.map = function(){
    this.mapper.get( this.home );
};

// Ruta '/home' de la aplicacion
ApplicationController.prototype.home = function(request, response){
    response.render('index', { title : 'Tracker!', content : 'tracker de tiempo.'});
};


module.exports = ApplicationController;