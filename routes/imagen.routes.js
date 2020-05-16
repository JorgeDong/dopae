const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: path.join(__dirname,'../repo'),
    filename: (req,file,cb) => {
        cb(null,new Date().getTime()+path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb)=> {
    if(file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png') {
            cb(null,true);
        }else{
            cb(null,false);
        }
}

const uploadImage = multer({
    storage,
    limits: {fileSize: 10000000},
    fileFilter
});

const imagenCtrl = require('../controllers/imagen.controller');

router.get('/', imagenCtrl.getImagens);
router.get('/last', imagenCtrl.getLastImagen);
router.post('/',uploadImage.single('image'),imagenCtrl.createImagen);
router.get('/:id', imagenCtrl.getImagen);
router.put('/:id', imagenCtrl.editImagen);
router.delete('/:id', imagenCtrl.deleteImagen);
router.get('/download/:image', imagenCtrl.downloadImagen); 

router.get('/producto/:id', imagenCtrl.imagenesIdProducto); 

module.exports = router;
