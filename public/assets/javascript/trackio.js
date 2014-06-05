// trackio.js
// Módulo lanzador de la aplicación
// Author : Jonathan Samines

// configuracion de require
require.config({
    paths : {
        // external dependencies
        'jquery' : '../../bower_components/jquery/dist/jquery',
        'handlebars' : '../../bower_components/handlebars/handlebars',
        'history' : '../../bower_components/history.js/scripts/bundled-uncompressed/html4+html5'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require(['jquery', 'helpers/template', 'views/proyecto', 'core/router'], function($, TemplateHelper, ProyectoView, Router){
    $(document).on('ready', function(){

        // register handlebars helpers
        var helper = new TemplateHelper();
        helper.registerHelpers();

        var router = new Router();

        router.route(['/', '/proyectos'], 'Proyectos', function(){
            // main view
            var proyecto = new ProyectoView();
            proyecto.init();

        }).go('/proyectos');

        router.route('/perfil/:nombreUsuario', 'Perfil - {nombreUsuario}', function(data){
            console.log('Perfil de Usuario : ' + data.nombreUsuario );
        });


    });
});



