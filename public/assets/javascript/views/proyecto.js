// proyecto.js
// Vista para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['jquery', 'backbone', 'handlebars', 'collections/proyecto'];

define(dependencies, function($, Backbone, Handlebars, ProyectoCollection){

    var ProyectoView = Backbone.View.extend({
        template : Handlebars.compile($('#proyectos_template').html()),
        el : '.table .group',
        render : function(){
            var $this = this;
            var proyectos = new ProyectoCollection();
            var result = proyectos.fetch();
            result.complete(function(){
                $this.$el.html($this.template(proyectos.toJSON()));
            });
            
        }
    });
    
    return ProyectoView;
});