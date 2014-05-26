// trackio.js
// Módulo lanzador de la aplicación
// Author : Jonathan Samines

// configuracion de require
require.config({
    paths : {
        // external dependencies
        'jquery' : '../../bower_components/jquery/dist/jquery',
        'handlebars' : '../../bower_components/handlebars/handlebars'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require(['jquery', 'helpers/template', 'views/proyecto'], function($, TemplateHelper, ProyectoView){
    $(document).on('ready', function(){

        // register handlebars helpers
        var helper = new TemplateHelper();
        helper.registerHelpers();

        // main view
        var proyecto = new ProyectoView();
        proyecto.init();
    });
});



