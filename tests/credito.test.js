const request = require('supertest');

module.exports = function(app) {

    request(app)
    .get('/api/credito')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa get")
        if (err){
            throw err;
        }
    });

    request(app)
    .get('/api/credito/last')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa get credito last")
        if (err){
            throw err;
        }
    });

    request(app)
    .post('/api/credito')
    .send({idUsuario_fk: 1,CantidadCredito:'9999999999', moneda:'MXN'})
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