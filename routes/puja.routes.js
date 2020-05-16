const express = require('express');
const router = express.Router();

const pujaCtrl = require('../controllers/puja.controller');

router.get('/', pujaCtrl.getPujas);
router.get('/last', pujaCtrl.getLastPuja);
router.post('/', pujaCtrl.createPuja);
router.get('/:id', pujaCtrl.getPuja);
router.put('/:id', pujaCtrl.editPuja);
router.delete('/:id', pujaCtrl.deletePuja);
router.get('/producto/:id', pujaCtrl.getPujasPorIdProducto);
router.get('/usuario/:id',pujaCtrl.getPujasPorIdUsuario);

module.exports = router;
