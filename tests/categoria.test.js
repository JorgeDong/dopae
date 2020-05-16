const request = require('supertest');

module.exports = function(app) {

    request(app)
    .get('/api/categoria')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa get")
        if (err){
            throw err;
        }
    });

    request(app)
    .get('/api/categoria/last')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa get last")
        if (err){
            throw err;
        }
    });

    request(app)
    .post('/api/categoria')
    .send({nombre: 'Tecnologia',descripcion:'Aparatos tecnologicos'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa post")
        if (err){
            throw err;
        }
    });

};