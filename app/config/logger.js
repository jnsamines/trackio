// logger.js
// Clase global de logging configurada para winstone
// Author : Jonathan Samines [jnsamines]

var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({ filename: 'trackio.log' })
    ]
});

module.exports = logger;