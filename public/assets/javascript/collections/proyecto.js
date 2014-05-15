// proyecto.js
// Controlador de datos para el modelo Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['backbone', 'models/proyecto'];

define(dependencies, function(Backbone, Proyecto){
    var ProyectoCollection = Backbone.Collection.extend({
        model : Proyecto,
        url : '/api/proyecto'
    });
    
    return ProyectoCollection;
});