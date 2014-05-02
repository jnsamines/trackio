// notaTarea.js
// Modelo de datos para una nota adherida a una tarea
// Author : Jonathan Samines [jnsamines]

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types;

var NotaTareaSchema = Schema({
    nota : String,
    fechaCreacion : Date,
    fechaModificacion : Date
});

module.exports = mongoose.model('NotaTarea', NotaTareaSchema);