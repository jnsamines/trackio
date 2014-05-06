// proyecto.js
// Modelo de datos para un proyecto
// Author : Jonathan Samines [jnsamines]

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var ProyectoSchema = new Schema({
    codigoProyecto : Types.ObjectId,
    nombreProyecto : {
        type : String,
        required : true
    },
    descripcionProyecto : String,
    coordinadorProyecto : { 
        type : Types.ObjectId, 
        ref : 'Usuario'
    },
    fechaCreacion : {
        type : Date,
        required : true
    },
    fechaModificacion : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);