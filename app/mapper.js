// mapper.js
// Mapeo de rutas
// Author : Jonathan Samines [jnsamines]

var ApplicationController = require('./controllers/application'),
    ProyectoController    = require('./controllers/proyecto'),
    UsuarioController     = require('./controllers/usuario');

// Mapeo de rutas de la aplicación
var mapper = {};

// Mapea las rutas de la aplicacion
mapper.mapAppRoutes = function(router){
    var application = new ApplicationController('', router);
    application.map();
};

// Mapea las rutas de api REST
mapper.mapApiRoutes = function(router){
    var proyecto = new ProyectoController('/proyecto', router);
    proyecto.map();
    
    var usuario = new UsuarioController('/usuario', router);
    usuario.map();
};

module.exports = mapper;