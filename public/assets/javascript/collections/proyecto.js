// proyecto.js
// Controlador de proyectos
// Author : Jonathan Samines [jnsamines]

define(['core/collection','models/proyecto', 'views/proyecto'], function(Collection, Proyecto, ProyectoView){

    var ProyectoCollection = function(){};

    ProyectoCollection.prototype = new Collection({
        url : '/api/proyecto',
        model : Proyecto
    });

    return ProyectoCollection;
});