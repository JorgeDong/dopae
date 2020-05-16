const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({
    idCategoria: { type: Number, required: true},
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);