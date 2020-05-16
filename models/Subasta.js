const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubastaSchema = new Schema({
    idSubasta: { type: Number, required: true},
    idProducto_fk: { type: Number, required: true},
    idUsuario_fk: { type: Number, required: true},
    PujaInicial: { type: String, required: true},
    Tiempo: { type: String, required: true},
    FechaInicio: { type: String, required: true},
    FechaFinal: { type: String, required: true },
    Descripcion: { type: String, required: true},
    Envio: { type: String, required: true},
    fechaAlta: { type: Date, required: true }
});

module.exports = mongoose.model('Subasta', SubastaSchema);