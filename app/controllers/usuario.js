// usuario.js
// Controlador para la entidad Usuario
// Author : Jonathan Samines [jnsamines]

var Usuario = require('../models/usuario'),
    logger  = require('../config/logger');


// Controlador de datos para Usuario
var UsuarioController = function(root, router){
    this.router = router;
    this.root = root;
};

// Mapea las rutas/controladores de la entidad
UsuarioController.prototype.map = function(){
    this.router.route(this.root)
        .get(this.obtenerUsuarios)
        .post(cargarUsuarioDeRequest, this.crearUsuario);

    this.router.route( this.root + '/:codigoUsuario')
        .put(buscarUsuarioPorCodigo, this.actualizarUsuario)
        .delete(buscarUsuarioPorCodigo, this.eliminarUsuario);

    this.router.route( this.root  + '/:nombreUsuario')
        .get( buscarUsuarioPorNombreUsuario, this.obtenerUsuario );
};


// Busca en la base de datos a un usuario por su código o id
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>Funcion de llamada del middleware</param>
function buscarUsuarioPorCodigo(request, response, next){
    var codigoUsuario = request.body.codigoUsuario;
    
    if(codigoUsuario === undefined){
        response.json({ message : 'Código de usuario no proporcionado.' });
    }
    
    Usuario.findById(codigoUsuario, function(error, usuario){
        if(error){
            var message = 'Error al realizar la búsqueda del usuario';
            logger.error(message, error);
            response.json({ message : message });
        }

        request.usuario = usuario;
        next();
    });
}

// Busca en la base de datos a un usuario por su username
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>funcion de llamada del middleware</param>
function buscarUsuarioPorNombreUsuario(request, response, next){
    var nombreUsuario = request.params.nombreUsuario;

    Usuario.findOne({ nombreUsuario : nombreUsuario}, function(error, usuario){
        if(error){
            var message = 'Error al realizar la búsqueda del usuario';
            logger.error(message, error);
            response.json(500, { message : message });
        }

        if(usuario === null){
            response.json(404, { message : 'No se encontro el usuario solicitado.'});
        }else{
            request.usuario = usuario;
            next();
        }
    });
}



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

UsuarioController.prototype.obtenerUsuario = function(request, response){
    response.json(request.usuario);
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

// Actualiza la información del usuario
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
UsuarioController.prototype.actualizarUsuario = function(request, response){
    var usuario = request.usuario;
    
    // se actualiza la información
    usuario.nombreUsuario = request.body.nombreUsuario;
    usuario.apellidoCompleto = request.body.apellidoCompleto;
    usuario.nombreCompleto = request.body.nombreCompleto;
    usuario.email = request.body.email;
    
    usuario.save(function(error, result){
        if(error){
            var message = 'Error al actualizar la información del usuario.';
            logger.error(message, error);
            response.json({ message : message });
        }
        
        response.json(result);
    });
};

// Elimina un usuario de la base de datos según su id
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
UsuarioController.prototype.eliminarUsuario = function(request, response){
    var usuario = request.usuario;
    
    // se intenta eliminar el usuario
    usuario.remove(function(error, result){
        if(error){
            var message = 'No se pudo eliminar el usuario.';
            logger.error(message, error);
            response.json({ message : message });
        }
        response.json(result);
    });
};


module.exports = UsuarioController;
