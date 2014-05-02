// server.js
// Servidor de aplicacion
// Author : Jonathan Samines [jnsamines]

// dependencias
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    logger = require('./app/config/logger'),
    ApplicationConfig = require('./app/config/config'),
    ConnectionSettings = require('./app/config/database');

// globales
var app = express(),
    environment = process.argv[2] || 'dev',
    configuration = ApplicationConfig[environment];

// configuracion de base de datos
var dbsettings = new ConnectionSettings(configuration.database);

mongoose.connect(dbsettings.getConnectionString());
mongoose.connection.on('open', function(){
    logger.debug('Conexión a la base de datos exitosa.');
});
mongoose.connection.on('error', function(e){
    logger.debug('Ha ocurrido un error en la conexión a la base de datos : %s', e);
});


// configuracion del servidor http
var server = http.createServer(app).listen(configuration.port),
    bodyParser = require('body-parser');

app.use(bodyParser());

// configuracion del router
var router = express.Router(),
    Mapper = require('./app/mapper'),
    mapper = new Mapper(router);

mapper.map();

app.use('/api', router);

