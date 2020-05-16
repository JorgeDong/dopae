const express = require('express');
const router = express.Router();

const productoCtrl = require('../controllers/producto.controller');

router.get('/', productoCtrl.getProductos);
router.get('/last', productoCtrl.getLastProducto);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getProducto);
router.put('/:id', productoCtrl.editProducto);
router.delete('/:id', productoCtrl.deleteProducto);
router.get('/search/:id', productoCtrl.findByID);
router.get('/imagenes/:id', productoCtrl.findImagenesByID);

router.get('/usuario/:id',productoCtrl.getProductosPorIdUsuario);

module.exports = router;
