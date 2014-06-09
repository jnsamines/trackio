// application.js
// Controlador principal de la aplicación.
// Author : Jonathan Samines [jnsamines]

// dependencias
var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

// middleware
var bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    MongoStore  = require('connect-mongo')(session);

// configuracion
var logger   = require('./config/logger'),
    database = require('./config/database');

// controladores
var HomeController = require('./controllers/home'),
    ProyectoController    = require('./controllers/proyecto'),
    TareaController       = require('./controllers/tarea'),
    UsuarioController     = require('./controllers/usuario');

// Controlador principal de la aplicación
var application = {};

// carga la aplicación con los settings de configuración
// de entorno especificados por el servidor
application.load = function(settings){
    // cargar configuraciones de entorno
    this.settings = settings;
    this.dbsettings = database.load(settings.database);
    this.app = express();

    // conexion a la base de datos
    this.database();
    this.middleware();
    this.route();

    return this.app;
};

application.database = function(){

    // configuracion de base de datos
    mongoose.connect(this.dbsettings.getConnectionString());
    mongoose.connection.once('open', function(){
        logger.debug('Conexión a la base de datos exitosa.');
    });
    mongoose.connection.once('error', function(e){
        logger.debug('Ha ocurrido un error en la conexión a la base de datos : %s', e);
    });
};

application.middleware = function(){
    var self = this;

    // configuracion de middleware de staticos
    this.app.use(bodyParser());
    this.app.use(express.static(path.join(__dirname, '../public')));

    // configuracion de middleware de sesión
    this.app.use(cookieParser());
    this.app.use(session({
        store :  new MongoStore({
            db : self.settings.database.database,
            host : self.settings.database.host,
            port : self.settings.database.port
        }),
        secret : 'haki reiatsu ki'
    }));


    this.app.set('views', path.join(__dirname, '../app/views'));
    this.app.set('view engine', 'jade');
};

application.route = function(){
    // configuracion de router
    var apiRouter = express.Router(),
        router = express.Router();

    // configuracion de controladores
    var home = new HomeController('', router);
    home.map();

    var usuario = new UsuarioController('/usuario', apiRouter);
    usuario.map();

    var proyecto = new ProyectoController('/proyecto', apiRouter);
    proyecto.map();

    var tarea = new TareaController('/proyecto/:codigoProyecto/tareas', apiRouter);
    tarea.map();

    // configurar routers
    this.app.use('/', router);
    this.app.use('/api', apiRouter);

    // manejo de errores
    this.app.use('/', function(request, response){
        response.send(404, 'Not Found');
    });
};

module.exports = application;