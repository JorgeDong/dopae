const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
    idComentario: { type: Number, required: true},
    idUsuarioOrigen_fk: { type: Number, required: true},
    idUsuarioDestino_fk: { type: Number, required: false},
    idPuja_fk: { type: Number, required: false},
    Comentario: { type: String, required: true},
    tipo: { type: String, required: true},
    fechaAlta: { type: Date, required: true },
    nombreUsuarioEmisor: { type: Date, required: false }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);