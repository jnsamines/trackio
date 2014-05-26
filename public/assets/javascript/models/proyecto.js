// proyecto.js
// Modelo de datos backbone
// Author : Jonathan Samines [jnsamines]

define(['core/model'], function(Model){

    // Proyecto data model
    var Proyecto = function(properties){
        this.set(properties, false);
        this.initialize(arguments);
    };

    Proyecto.prototype = new Model({
        defaults : {
            nombreProyecto : 'Proyecto Template',
            descripcionProyecto : 'Base template for proyect model',
            coordinadorProyecto : '',
            fechaCreacion : new Date(),
            fechaModificacion : new Date()
        },
        events : {
            'change' : function(property, value){
                //console.log('El valor del la propiedad ' + property  + " ha cambiado a " + value);
            }
        }
    });

    return Proyecto;
});