const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        required: false,
    },
    pregunta1: {
        type: String,
        required: false,
    },
    respuesta1: {
        type: String,
        required: false,
    },
    pregunta2: {
        type: String,
        required: false,
    },
    respuesta2: {
        type: String,
        required: false,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;