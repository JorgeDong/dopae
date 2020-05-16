const request = require('supertest');

module.exports = function(app) {

    request(app)
    .get('/api/producto')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa producto get")
        if (err){
            throw err;
        }
    });

    request(app)
    .get('/api/producto/last')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa get producto last")
        if (err){
            throw err;
        }
    });

    request(app)
    .post('/api/producto')
    .send({idCategoria_fk: 8,idUsuario_fk: 1, nombre:'SmartWatch', marca:'Motorola', accesorios:'Cargador, Cable USB', descripcion:'Reloj Inteligente resistente al agua', estadoDelProducto:'Activo', Valor:'SmartWatch'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        console.log("Prueba Exitosa producto post")
        if (err){
            throw err;
        }
    });

};