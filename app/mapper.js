// mapper.js
// Mapeo de rutas
// Author : Jonathan Samines [jnsamines]

var Mapper = function(router){
    this.router = router;
};

// Mapea todas las rutas para cada controlador
Mapper.prototype.map = function(){
    
    var ProyectoMapper = require('./mappers/proyectoMapper');
    var mapper = new ProyectoMapper({
        router : this.router.route('/proyecto'),
        model : require('./models/proyecto')
    }).bind();

};

module.exports = Mapper;