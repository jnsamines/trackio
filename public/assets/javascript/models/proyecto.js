// proyecto.js
// Modelo de datos backbone
// Author : Jonathan Samines [jnsamines]

define(['core/model'], function(Model){

    // Proyecto data model
    var Proyecto = function(options){
        options = options || {};
        this.nombreProyecto = options.nombreProyecto || '';
        this.descripcionProyecto = options.descripcionProyecto || '';
        this.coordinadorProyecto = options.coordinadorProyecto || '';
        this.fechaCreacion = options.fechaCreacion || '';
        this.fechaModificacion = options.fechaModificacion || '';
    };

    Proyecto.prototype = new Model();

    return Proyecto;
});