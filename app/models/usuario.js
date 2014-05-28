// usuario.js
// Modelo de datos de un Usuario
// Author : Jonathan Samines [jnsamines]

var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var UsuarioSchema = new Schema({
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
    },
    password : {
        type : String,
        trim : true
    }
});

UsuarioSchema.virtual('nombreUsuarioCompleto').get(function(){
    return this.nombreCompleto + ' ' + this.apellidoCompleto;
});

UsuarioSchema.virtual('gravatar').get(function(){
    // se crea el hash-sum con md5 para el correo del usuario
    var md5sum = crypto.createHash('md5');
    md5sum.update( this.email );

    // se crea el uri en base al hash
    var uri = 'http://www.gravatar.com/avatar/' + md5sum.digest('hex');

    return uri;
});

module.exports = mongoose.model('Usuario', UsuarioSchema);