const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

const creditoCtrl = require('../controllers/credito.controller');
const Credito = require('../models/Credito')

router.get('/', creditoCtrl.getCreditos);
router.get('/last', creditoCtrl.getLastCredito);
router.get('/:id', creditoCtrl.getCredito);
router.put('/:id', creditoCtrl.editCredito);
router.delete('/:id', creditoCtrl.deleteCredito);

// New credit creation
router.post('/new', (req, res) => {
    console.log(req.body);
    const {idUsuario_fk, CantidadCredito} = req.body;
    Credito.findOne({ idUsuario_fk: idUsuario_fk})
    .then( credito => {
        if(credito){
            errorMessage = { message: 'Credit is already registered' };
            res.status(408).send(errorMessage);
        } else {
            Credito.count()
            .then( cnt => {
                const newCredito = new Credito({
                    idCredito: cnt+1,
                    idUsuario_fk: idUsuario_fk,
                    CantidadCredito: CantidadCredito,
                    moneda: 'MX',
                    fechaAlta: new Date
                });
                newCredito.save()
                .then( credito => {
                    res.status(201).send(newCredito);
                })
                .catch( err => console.log(err) );
            })
        }
    })
})

router.put('/edit/:id', ensureAuthenticated, (req, res) => {
    const { idCredito, CantidadCredito } = req.body;
    console.log("CREDITO: "+req.body);
    if(req.body){
        Credito.findOneAndUpdate({ idCredito: idCredito }, { $set:{ CantidadCredito: CantidadCredito }}, (err, done)=> {
                    if(err) res.status(400).send(err);
                    res.status(200).send(done);
                })
    }
    else {
        res.status(401).send(`Cannot edit this item (Credito ID: ${req.params.id}`)
    }
})

module.exports = router;
