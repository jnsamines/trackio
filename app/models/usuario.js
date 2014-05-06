// usuario.js
// Modelo de datos de un Usuario
// Author : Jonathan Samines [jnsamines]

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    codigoUsuario : {
        type : Number,
        required : true
    },
    nombreUsuario : {
        type : String,
        required : true,
        trim : true
    },
    nombreCompleto : {
        type : String,
        required : true,
        trim : true
    },
    apellidoCompleto : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);