// trackio.js
// Módulo lanzador de la aplicación
// Author : Jonathan Samines

// configuracion de require
require.config({
    paths : {
        // external dependencies
        'jquery' : '../../bower_components/jquery/dist/jquery',
        'underscore' : '../../bower_components/underscore/underscore',
        'backbone' : '../../bower_components/backbone/backbone',
        'handlebars' : '../../bower_components/handlebars/handlebars'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});


var dependencies = ['jquery', 'backbone', 'views/proyecto'];

require(dependencies, function($, Backbone, ProyectoView){
    $(document).on('ready', function(){
        
        var proyecto = new ProyectoView();
        proyecto.render();
    });
});



