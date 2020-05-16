const express = require('express');
const router = express.Router();

const categoriaCtrl = require('../controllers/categorias.controller');

router.get('/', categoriaCtrl.getCategorias);
router.get('/last', categoriaCtrl.getLastCategoria);
router.post('/', categoriaCtrl.createCategoria);
router.get('/:id', categoriaCtrl.getCategoria);
router.put('/:id', categoriaCtrl.editCategoria);
router.delete('/:id', categoriaCtrl.deleteCategoria);

module.exports = router;
