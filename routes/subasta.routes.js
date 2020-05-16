const express = require('express');
const router = express.Router();

const subastaCtrl = require('../controllers/subasta.controller');

router.get('/', subastaCtrl.getSubastas);
router.get('/last', subastaCtrl.getLastSubasta);
router.post('/', subastaCtrl.createSubasta);
router.get('/:id', subastaCtrl.getSubasta);
router.put('/:id', subastaCtrl.editSubasta);
router.delete('/:id', subastaCtrl.deleteSubasta);

// router.get('/todo/', subastaCtrl.obtenerTodo);

module.exports = router;
