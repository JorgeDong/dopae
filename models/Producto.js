const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    idProducto: { type: Number, required: true},
    idCategoria_fk: { type: Number, required: true},
    idUsuario_fk: { type: Number, required: true},
    nombre: { type: String, required: true},
    marca: { type: String, required: true},
    accesorios: { type: String, required: true},
    descripcion: { type: String, required: true },
    estadoDelProducto: { type: String, required: true},
    Valor: { type: String, required: true},
    fechaAlta: { type: Date, required: true },
    PujaInicial: { type: String, required: true},
    Tiempo: { type: String, required: true},
    Envio: { type: String, required: true},
    Url: { type: String, required: false},
    fechaFinal: { type: String, required: false},
    userCity: { type: String, required: false},
    userName: { type: String, required: false},

});

module.exports = mongoose.model('Producto', ProductoSchema);