// usuario.js
// Vista controladora de Usuario
// Author : Jonathan Samines [jnsamines]

define(['handlebars', 'jquery', 'collections/usuario'], function(Handlebars, $, UsuarioCollection){

    var UsuarioView = function(){
        var self = this;

        // componentes de usuario
        this.components = {};
        this.components.$root = $("#application");
        this.components.$template = Handlebars.compile($("#usuario_template").html());

        this.collection = new UsuarioCollection();
        this.collection.on('fetching-success', function(data){
            self.render(data);
        });
    };

    // Actualiza la información del servidor
    UsuarioView.prototype.init = function(){
        this.collection.fetch();
    };

    // Renderiza la información obtenida desde un medio de datos
    // <param name='data'>Datos obtenidos desde el servidor</param>
    UsuarioView.prototype.render = function(data){
        var compiledTemplate = this.components.$template(data[0]);
        this.components.$root.html(compiledTemplate);
    };

    return UsuarioView;
});