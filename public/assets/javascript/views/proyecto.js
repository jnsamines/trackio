// proyecto.js
// Vista para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['jquery', 'handlebars','helpers/observable', 'collections/proyecto'];

define(dependencies, function($, Handlebars, Observable, ProyectoCollection){

    var ProyectoView = function(){
        var self = this;

        // view components
        this.components = {};
        this.components.$root = $('#proyectos_container');
        this.components.$template = Handlebars.compile($('#proyectos_template').html());
        this.components.$container = $('.table .group');

        // collection
        this.collection = new ProyectoCollection();
        this.collection.on('fetching-success', function(data){
            self.render(data);
        });

        this.collection.on('added', function(model){
            console.log('the model ', model , 'was added to collection');
        });
    };

    ProyectoView.prototype = new Observable();

    // initialize proyecto view
    ProyectoView.prototype.init = function(){
        this.collection.fetch();
    };

    ProyectoView.prototype.render = function(data){
        var compiledTemplate = this.components.$template(data);
        this.components.$root.html(compiledTemplate);

        this.trigger('render');
    };
    
    return ProyectoView;
});