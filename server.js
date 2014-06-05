// server.js
// Servidor de aplicacion
// Author : Jonathan Samines [jnsamines]

// dependencias
var http        = require('http'),
    bodyParser  = require('body-parser'),
    express     = require('express'),
    path        = require('path'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    cookieParser = require('cookie-parser'),
    MongoStore  = require('connect-mongo')(session);

var config   = require('./app/config/config'),
    logger   = require('./app/config/logger'),
    database = require('./app/config/database'),
    mapper   = require('./app/mapper');


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

logger.debug('Servidor iniciado en el puerto : ' + appSettings.port);

// configuracion de middleware
application.use(bodyParser());
application.use(express.static(path.join(__dirname, '/public')));

application.use(cookieParser());
application.use(session({
    store :  new MongoStore({
        db : appSettings.database.database,
        host : appSettings.database.host,
        port : appSettings.database.port
    }),
    secret : 'haki reiatsu ki'
}));

application.set('views', path.join(__dirname, '/app/views'));
application.set('view engine', 'jade');

// configuracion de router
var apiRouter = express.Router(),
    appRouter = express.Router();

mapper.mapAppRoutes(appRouter);
mapper.mapApiRoutes(apiRouter);

application.use('/', appRouter);
application.use('/api', apiRouter);

// handling errors
application.use('/', function(request, response){
    response.status(202);
    response.send('Not Found');
});
