// proyecto.js
// Controlador para la entidad Proyecto
// Author : Jonathan Samines [jnsamines]

var logger = require('../config/logger'),
    Proyecto = require('../models/proyecto');

// Mapper de rutas para la entidad Proyecto
var ProyectoController = function(root, router){
    this.root = root;
    this.router = router;
};

// Mapea las rutas correspondientes al Mapper
ProyectoController.prototype.map = function(){
    this.router.route(this.root)
        .get(this.obtenerProyectos)
        .post(cargarProyectoDeRequest, this.crearProyecto);

    this.router.route(this.root + '/:codigoProyecto')
        .get(buscarProyectoPorCodigo, this.obtenerProyecto)
        .put(buscarProyectoPorCodigo, this.actualizarProyecto)
        .delete(buscarProyectoPorCodigo, this.eliminarProyecto);
};

// Crea una nueva instancia de un proyecto a partir de la información del request
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>funcion de llamada del middleware</param>
function cargarProyectoDeRequest(request, response, next){
    
    // se crea una nueva entidad
    var proyecto = new Proyecto();
    proyecto.nombreProyecto = request.body.nombreProyecto;
    proyecto.descripcionProyecto = request.body.descripcionProyecto;
    proyecto.coordinadorProyecto = request.body.coordinadorProyecto;

    // metadatos de tiempo
    var fechaTransaccion = new Date();
    proyecto.fechaModificacion = fechaTransaccion;
    proyecto.fechaCreacion = fechaTransaccion;

    request.proyecto = proyecto;
    next();
}

// Middleware que permite buscar un proyecto por código de identificacion
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>funcion de llamada del middleware</param>
function buscarProyectoPorCodigo(request, response, next){
    var codigoProyecto = request.params.codigoProyecto;

    if(codigoProyecto === undefined){
        response.json({ error : 'Código de proyecto no proporcionado.'});
    }
    
    // se busca el proyecto en la base de datos en base al codigo proporcionado
    Proyecto.findById(codigoProyecto, function(error, proyecto){

        if(error){
            var message = 'Error al realizar la búsqueda del proyecto.';
            logger.error(message, error);
            response.json({ error : message });
        }

        // se guarda la entidad encontrada en la solicitud del mensaje
        request.proyecto = proyecto;
        
        next();
    });
}

// Obtiene la lista de proyectos disponibles en mongo
// <param name='request'>Solicitud http</param>
// <param name='response'>Respuesta http</param>
ProyectoController.prototype.obtenerProyectos = function(request, response){
    
    Proyecto.find()
        .populate('coordinadorProyecto')
        .populate('tareas')
        .exec(function(error, proyectos){
            var message = 'Error al obtener el listado de proyectos.';

            if(error){
                logger.error(message, error);
                response.json({ error : message });
            }
            response.json(proyectos);
    });
};

// Obtiene el detalle de un proyecto en base a su identificador
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
ProyectoController.prototype.obtenerProyecto = function(request, response){
    response.json(request.proyecto);
};

// Crea un nuevo registro en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
ProyectoController.prototype.crearProyecto = function(request, response){
    var proyecto = request.proyecto;
    
    // se intenta guardar la entiadad en la base de datos
    proyecto.save(function(error, result){
        if(error){
            var message = 'Error al guardar el proyecto.';
            logger.error(message, error);
            response.json({ error : message });
        }
        
        response.json(result);
    });
};

// Actualiza la información de un proyecto en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
ProyectoController.prototype.actualizarProyecto = function(request, response){
    
    var proyecto = request.proyecto;
    proyecto.nombreProyecto = request.body.nombreProyecto || proyecto.nombreProyecto;
    proyecto.descripcionProyecto = request.body.descripcionProyecto || proyecto.descripcionProyecto;
    proyecto.coordinadorProyecto = request.body.coordinadorProyecto || proyecto.coordinadorProyecto;
    
    // metadatos de tiempo
    proyecto.fechaModificacion = new Date();

    // se modifica la informacion de la solicitud en la entidad encontrada
    proyecto.save(function(error, result){

        if(error){
            var message = 'Error al actualizar la información del proyecto.';
            logger.error(message, error);
            request.json({ error : message });
        }
        
        response.json(result);
    });

};

// Elimina una instancia del proyecto especificado en la base de datos.
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
ProyectoController.prototype.eliminarProyecto = function(request, response){
    var proyecto = request.proyecto;
    
    // se intenta eliminar la entidad
    proyecto.remove(function(error, result){
        if(error){
            var message = 'Error al eliminar el proyecto.';
            logger.error(message, error);
            request.json({ error : message });
        }
        
        response.json(result);
    });
};


module.exports = ProyectoController;
