// server.js
// Servidor de aplicacion
// Author : Jonathan Samines [jnsamines]

// dependencias
var http = require('http'),
    environment = process.argv[2] || 'dev',
    settings = require('./app/config/config').load(environment);

// application
var application = require('./app/application'),
    applocal = application.load(settings);

// create an http server and listen to environment configuration port
http.createServer(applocal).listen(settings.port);