// tarea.js
// Controlador de rutas para la entidad tarea
// Author : Jonathan Samines [jnsamines]

var Tarea = require('../models/tarea'),
    Proyecto = require('../models/proyecto'),
    logger = require('../config/logger');

// Controlador de rutas
// <param name='root'>Ruta de acceso root</param>
// <param name='router'>Ruteador de express</param>
var TareaController = function(root, router){
    this.root = root;
    this.router = router;
};

// Mapea todas las rutas a los controladores correspondientes
TareaController.prototype.map = function(){
    this.router.route(this.root)
        .get(this.obtenerTareas)
        .post(this.middleware.cargarTareaDeRequest, this.crearTarea);

    this.router.route(this.root + '/:codigoTarea')
        .get(this.middleware.buscarTareaPorCodigo, this.obtenerTarea)
        .put(this.middleware.buscarTareaPorCodigo, this.eliminarTarea)
        .delete(this.middleware.buscarTareaPorCodigo, this.actualizarTarea);
};

TareaController.prototype.middleware = {};

// Carga el objeto tarea en el request, si se encuentra el identificador proporcionado
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>callback para continuar con el pipe del middleware</param>
TareaController.prototype.middleware.cargarTareaDeRequest = function (request, response, next){

    // se crea la tarea desde la solicitud
    var tarea = new Tarea();
    tarea.descripcion = request.body.descripcion;
    tarea.proyecto = request.params.codigoProyecto; // subordina el recurso al proyecto padre
    tarea.usuario = request.body.usuario;
    tarea.tiempo = request.body.tiempo;

    var fechaTransaccion = new Date();

    tarea.fechaIngreso = fechaTransaccion;
    tarea.fechaModificacion = fechaTransaccion;

    // se busca el proyecto padrea, para asociar la tarea
    Proyecto.findById(request.params.codigoProyecto, function(error, proyecto){
        if(error){
            var message = 'Error al asociar tarea al proyecto.';
            logger.error(message, error);
            response.json({ message : message });
        }
        proyecto.tareas.push(tarea);
        proyecto.save();
    });

    request.tarea = tarea;

    next();
};

// Busca una tarea mediante su código en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
// <param name='next'>callback para continuar con el pipe del middleware</param>
TareaController.prototype.middleware.buscarTareaPorCodigo = function (request, response, next){
    var codigoTarea = request.params.codigoTarea;

    if(codigoTarea === undefined){
        response.json({ message : 'Código de tarea no proporcionado.'});
    }

    // se busca la tarea por el código
    Tarea.findById(codigoTarea, function(error, tarea){
        if(error){
            var message = 'Error al realizar la búsqueda de la tarea.';
            logger.error(message, error);
            response.json({ message : message });
        }

        request.tarea = tarea;

        next();
    });
};

// Obtiene las tareas disponibles en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
TareaController.prototype.obtenerTareas = function(request, response){
    var codigoProyecto = request.params.codigoProyecto;
    Tarea.find({ proyecto : codigoProyecto },function(error, tareas){
        if(error){
            var message = 'Error al obtener las tareas de la base de datos';
            logger.error(message, error);
            response.json({ message : message });
        }
        response.json(tareas);
    });
};

// Obtiene el detalle de una tarea
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
TareaController.prototype.obtenerTarea = function(request, response){
    response.json(request.tarea);
};


// Crea la tarea en la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
TareaController.prototype.crearTarea = function(request, response){
    var tarea = request.tarea;

    tarea.save(function(error, result){
        if(error){
            var message = 'Error al guardar la tarea.';
            logger.error(message, error);
            response.json({ message : message });
        }  
        
        response.json(result);
    });
};

// Actualiza la información persistente de la tarea
TareaController.prototype.actualizarTarea = function(request, response){
    var tarea = request.tarea;
    tarea.descripcion = request.body.descripcion ||  tarea.descripcion;
    tarea.proyecto = request.body.proyecto || tarea.proyecto;
    tarea.usuario = request.body.usuario || tarea.usuario;
    tarea.tiempo = request.body.tiempo || tarea.tiempo;

    tarea.save(function(error, result){
        if(error){
            var message = 'Error al actualizar la información de la tarea.';
            logger.error(message, error);
            response.json({ message : message });
        }
        response.json(result);
    });
};


// Elimina la tarea de la base de datos
// <param name='request'>solicitud http</param>
// <param name='response'>respuesta http</param>
TareaController.prototype.eliminarTarea = function(request, response){
    var tarea = request.tarea;

    tarea.remove(function(error, result){
        if(error){
            var message = 'Error al eliminar la tarea';
            logger.error(message, error);
            response.json({ message : message });
        }
        response.json(result);
    });
};


module.exports = TareaController;

