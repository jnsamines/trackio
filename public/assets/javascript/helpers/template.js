// template.js
// Template helpers for handlebars
// Author : Jonathan Samines [jnsamines]

// Helpers registry
define(['handlebars', 'jquery'], function(Handlebars, $){

    function TemplateHelper(){}

    // totalHorasProyecto
    // count the overall amout of time, spend on each proyect
    TemplateHelper.prototype.registerHelpers = function(){

        Handlebars.registerHelper('totalHorasProyecto',function(tareas, context){
            var total = 0;
            tareas.forEach(function(tarea){
                total += tarea.tiempo;
            });

            return total;
        });

        Handlebars.registerPartial("proyecto", $("#proyecto_partial").html());
    };

    return TemplateHelper;
});
