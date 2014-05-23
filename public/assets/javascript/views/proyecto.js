// proyecto.js
// Vista para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['jquery', 'handlebars','helpers/observable'];

define(dependencies, function($, Handlebars, Observable){

    var ProyectoView = function(){
        // view components
        this.components = {};
        this.components.$root = $('#proyectos_container');
        this.components.$template = $('#proyectos_template');
        this.components.template = Handlebars.compile(this.components.$template.html());
        this.components.$container = $('.table .group');
    };

    ProyectoView.prototype = new Observable();

    ProyectoView.prototype.render = function(data){
        var compiledTemplate = this.components.template(data);
        this.components.$root.html(compiledTemplate);

        this.trigger('render');
    };
    
    return ProyectoView;
});