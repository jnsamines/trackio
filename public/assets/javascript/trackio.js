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

require(['jquery', 'helpers/template', 'views/proyecto', 'core/router', 'views/usuario'], function($, TemplateHelper, ProyectoView, Router, UsuarioView){
    $(document).on('ready', function(){

        // register handlebars helpers
        var helper = new TemplateHelper();
        helper.registerHelpers();

        var router = new Router();

        // main view
        if(document.location.pathname === '/') {
            var proyecto = new ProyectoView();
            proyecto.init();
        }

        router.route(['/', '/proyectos'], 'Proyectos', function(){
            // main view
            var proyecto = new ProyectoView();
            proyecto.init();
        });

        router.route('/perfil/:nombreUsuario', 'Perfil - {nombreUsuario}', function(data){
            var usuario = new UsuarioView();
            usuario.init();
        });


    });
});



