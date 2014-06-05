// proyecto.js
// Vista para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var dependencies = ['jquery', 'handlebars','collections/proyecto'];

define(dependencies, function($, Handlebars, ProyectoCollection){

    var ProyectoView = function(){
        var self = this;

        // view components
        this.components = {};
        this.components.$root = $('#application');
        this.components.$template = Handlebars.compile($('#proyectos_template').html());
        this.components.$buttonNuevoProyecto = $('#buttonNuevoProyecto');

        // collection
        this.collection = new ProyectoCollection();
        this.collection.on('fetching-success', function(data){
            self.render(data);
        });

        this.collection.on('added', function(model){
            console.log('the model ', model , ' was added to collection.');
        });

        this.collection.on('removed', function(model){
            console.log('the model', model, ' was removed from collection.');
        });

        // view events
        this.components.$buttonNuevoProyecto.on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            self.collection.fetch();
        });
    };

    // initialize proyecto view
    ProyectoView.prototype.init = function(){
        this.collection.fetch();
    };

    ProyectoView.prototype.render = function(data){
        var compiledTemplate = this.components.$template(data);
        this.components.$root.html(compiledTemplate);
    };
    
    return ProyectoView;
});