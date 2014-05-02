// proyectoMapper.js
// Mapeo de rutas para la entidad 'Proyecto'
// Author : Jonathan Samines [jnsamines]

var logger = require('../config/logger');

// Mapeo de rutas
// <param name='Opciones de mapeo'></param>
var ProyectoMapper = function(options){
    this.model = options.model;
    this.router = options.router;
};

// Enlaza las rutas
ProyectoMapper.prototype.bind = function(){
    var self = this;
    
    // obtener todos los proyectos
    this.router.get(function(request, response){
        
        self.model.find(function(error, result){
            if(error){
                var message = 'Ha ocurrido un error al consultar la lista de proyectos.';
                
                logger.error(message, error);
                response.json({ message : message });
                
                return;
            }
            
            logger.debug('Resultados encontrados correctamente, se encontraron %d coincidencias', result.length);
            
            response.json(result);
        });
    });
    
    // crear un nuevo proyecto
    this.router.post(function(request, response){
        
        var proyecto = new model();
        
        
        
    });
    
    
    return this;
};

module.exports = ProyectoMapper;