const express = require('express');
const router = express.Router();

const comentarioCtrl = require('../controllers/comentario.controller');

router.get('/', comentarioCtrl.getComentarios);
router.get('/last', comentarioCtrl.getLastComentario);
router.post('/', comentarioCtrl.createComentario);
router.get('/:id', comentarioCtrl.getComentario);
router.put('/:id', comentarioCtrl.editComentario);
router.delete('/:id', comentarioCtrl.deleteComentario);

router.get('/usuario/:id', comentarioCtrl.getComentarioUsuario);

module.exports = router;
