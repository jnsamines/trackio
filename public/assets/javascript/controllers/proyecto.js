// proyecto.js
// Controlador de proyectos
// Author : Jonathan Samines [jnsamines]

define(['core/controller','models/proyecto', 'views/proyecto'], function(Controller, Proyecto, ProyectoView){

    var ProyectoController = function(){
        // init components
        this.url = '/api/proyecto';
        this.collection = [];
        this.view = new ProyectoView();
    };

    ProyectoController.prototype = new Controller();

    ProyectoController.prototype.sync = function(options){
        var self = this, result = this.fetch(), options = options || {};

        result.done(function(proyectos){
            var models = [];
            if(Array.isArray(proyectos)){
                for(var i = 0; i <= proyectos.length - 1; i++){
                    var proyecto = proyectos[i],
                        model = new Proyecto();

                    var changing = function(property, value){
                        console.log('El valor del la propiedad ' + property  + " ha cambiado a " + value);
                    };

                    model.off('change:nombreProyecto',changing).on('change:nombreProyecto',changing);

                    // set each property of the model
                    for(var prop in proyecto){
                        model.set(prop, proyecto[prop], options.validate);
                    }
                    models.push(model);
                }
            }
            self.view.render(models);
        });

        result.fail(function(error){
            console.log(error);
        });

    };

    return ProyectoController;
});