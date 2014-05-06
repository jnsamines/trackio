// mapper.js
// Mapeo de rutas
// Author : Jonathan Samines [jnsamines]

var ProyectoController = require('./controllers/proyecto'),
    UsuarioController  = require('./controllers/usuario');


var Mapper = function(router){
    this.router = router;
};


Mapper.prototype.map = function(){
    var proyecto = new ProyectoController('/proyecto', this.router);
    proyecto.map();
    
    var usuario = new UsuarioController('/usuario', this.router);
    usuario.map();
};

module.exports = Mapper;