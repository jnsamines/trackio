var ApplicationController = require('./controllers/application'),
    ProyectoController    = require('./controllers/proyecto'),
    TareaController       = require('./controllers/tarea'),
    UsuarioController     = require('./controllers/usuario');

// mapper.js
// Mapeo de rutas
// Author : Jonathan Samines [jnsamines]

// Mapeo de rutas de la aplicación
var mapper = {};

// Mapea las rutas de la aplicacion
mapper.mapAppRoutes = function(router){
    var application = new ApplicationController('', router);
    application.map();
};

// Mapea las rutas de api REST
mapper.mapApiRoutes = function(router){
    var usuario = new UsuarioController('/usuario', router);
    usuario.map();

    var proyecto = new ProyectoController('/proyecto', router);
    proyecto.map();

    var tarea = new TareaController('/proyecto/:codigoProyecto/tareas', router);
    tarea.map();
};

module.exports = mapper;