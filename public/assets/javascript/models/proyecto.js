// proyecto.js
// Modelo de datos backbone
// Author : Jonathan Samines [jnsamines]

var dependencies = ['backbone'];

define(dependencies , function(Backbone){
    var Proyecto = Backbone.Model.extend({
        defaults : {
            codigoProyecto : 0,
            nombreProyecto : '',
            coordinadorProyecto : {}
        },
        initialize : function(){
            console.log("Modelo Proyecto Inicializado");
        }
    });
    
    return Proyecto;
});