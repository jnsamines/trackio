// proyecto.js
// Vista para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['jquery', 'backbone', 'handlebars', 'controllers/proyecto'];

define(dependencies, function($, Backbone, Handlebars, ProyectoController){
    
    var ProyectoView = Backbone.View.extend({
        id : '',
        template : Handlebars.compile($('#proyectos_template')),
        render : function(){
            
            var proyectos = new ProyectoCollection();
            var result = proyectos.fetch();
            result.complete(function(){
                console.log(proyectos);
                this.$el.html(this.template(proyectos));
            });
            
        }
    });
    
});