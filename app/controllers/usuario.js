// usuario.js
// Controlador para la entidad Usuario
// Author : Jonathan Samines [jnsamines]

var Usuario = require('../models/usuario'),
    logger  = require('../config/logger');


// Controlador de datos para Usuario
var UsuarioController = function(root, router){
    this.router = router;
    this.mapper = router.route(root);
};

// Mapea las rutas/controladores de la entidad
UsuarioController.prototype.map = function(){
    this.mapper.get(this.obtenerUsuarios);
    this.mapper.post(cargarUsuarioDeRequest, this.crearUsuario);
};


// Carga el usuario en el body del request en un objeto independiente (request.usuario)
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>Funcion de llamada del middleware</param>
function cargarUsuarioDeRequest(request, response, next){
    var usuario = new Usuario();
    
    usuario.nombreUsuario = request.body.nombreUsuario;
    usuario.apellidoCompleto = request.body.apellidoCompleto;
    usuario.nombreCompleto = request.body.nombreCompleto;
    usuario.email = request.body.email;
    
    request.usuario = usuario;
    
    next();
}

// Obtiene la lista de usuarios existentes
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
UsuarioController.prototype.obtenerUsuarios = function(request, response){
    
    // se busca la lista de usuarios en la base de datos
    Usuario.find(function(error, usuarios){
        if(error){
            var message = 'Error al recuperar la lista de usuarios.';
            logger.error(message, error);
            response.json({ error : message });
        }
        
        response.json(usuarios);
    });
};


// Crea un nuevo usuario en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
UsuarioController.prototype.crearUsuario = function(request, response){

    var usuario = request.usuario;
    
    usuario.save(function(error, result){
        if(error){
            var message = 'Error al crear el usuario.';
            logger.error(message, error);
            response.json({ error : message });
        }
        
        response.json(result);
    });
};


module.exports = UsuarioController;
