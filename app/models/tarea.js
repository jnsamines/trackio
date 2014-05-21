// tarea.js
// Modelo de datos para una tarea
// Author : Jonathan Samines [jnsamines]

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var TareaSchema = new Schema({
    descripcion : {
        type : String
    },
    notas : [{
        type : Types.ObjectId, 
        ref : 'NotaTarea'
    }],
    proyecto : {
        type : Types.ObjectId, 
        ref : 'Proyecto',
        required : true
    },
    usuario : { 
        type : Types.ObjectId, 
        ref : 'Usuario',
        required : true
    },
    tiempo : {
        type : Number,
        required : true
    },
    fechaIngreso : {
        type : Date,
        required : true
    },
    fechaModificacion : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('Tarea', TareaSchema);