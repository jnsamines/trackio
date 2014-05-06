// server.js
// Servidor de aplicacion
// Author : Jonathan Samines [jnsamines]

// dependencias
var http        = require('http'),
    bodyParser  = require('body-parser'),
    express     = require('express'),
    mongoose    = require('mongoose');

var config   = require('./app/config/config'),
    logger   = require('./app/config/logger'),
    database = require('./app/config/database');


// configuraciones globales
var env         = process.argv[2] || 'dev',
    appSettings = config.load(env),
    dbSettings  = database.load(appSettings.database);


// configuracion de base de datos
mongoose.connect(dbSettings.getConnectionString());
mongoose.connection.on('open', function(){
    logger.debug('Conexión a la base de datos exitosa.');
});
mongoose.connection.on('error', function(e){
    logger.debug('Ha ocurrido un error en la conexión a la base de datos : %s', e);
});


// configuracion del servidor http
var application = express(),
    server = http.createServer(application).listen(appSettings.port);


// configuracion de middleware
application.use(bodyParser());


// configuracion de router
var apiRouter = express.Router();


app.use('/api', apiRouter);

