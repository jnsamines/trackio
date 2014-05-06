// database.js
// Configuracion de la base de datos
// Author: Jonathan Samines [jnsamines]

// Inicializa un nuevo objeto de conexión
// <param name='options'>Opciones de conexión al servicio de datos.</param>
var DatabaseSettings = function(options){
    this.user = options.user || '';
    this.password = options.password || '';
    this.host = options.host || 'localhost';
    this.port = options.port || 8080;
    this.database = options.database || '';
};

// Obtiene la cadena de conexión correspondientes a los parametros
DatabaseSettings.prototype.getConnectionString = function(){
    var connection = 'mongodb://{{user}}:{{password}}@{{host}}:{{port}}/{{database}}';
    
    // se reemplaza cada holder con su dato correspondiente
    connection = connection.replace('{{user}}', this.user);
    connection = connection.replace('{{password}}', this.password);
    connection = connection.replace('{{host}}', this.host);
    connection = connection.replace('{{port}}', this.port);
    connection = connection.replace('{{database}}', this.database);
    
    return connection;
};

// Modulo exportado
module.exports = {
    
    // shortcut para la inicialización de los settings de conexión.
    load : function(options){
        return new DatabaseSettings(options);
    }
};