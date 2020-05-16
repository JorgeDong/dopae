const Imagen = require('../models/Imagen');
const path = require('path');

const imagenCtrl = {};

imagenCtrl.getLastImagen = async (req, res, next) => {
    const imagen = await Imagen.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(imagen);
};

imagenCtrl.getImagens = async (req, res, next) => {
    const imagen = await Imagen.find();
    res.json(imagen);
};

imagenCtrl.createImagen = async (req, res, next) => {
    console.log(req.body);
    console.log(req.body.desc);
    console.log(req.file);
    console.log(req.file.path);
    console.log("FileName");
    console.log(req.file.filename);

    Imagen.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const imagen = new Imagen({
                idImagen: 1,
                idProducto_fk: req.body.idProducto_fk,
                url: req.file.filename,
                descripcion: req.body.descripcion,
                fecha: new Date()
            });
            await imagen.save();
            res.json({status: 'Imagen created',imagen: imagen});
        }else{
            let lastImagen = post.idImagen;
            lastImagen++;

            const imagen = new Imagen({
                idImagen: lastImagen,
                idProducto_fk: req.body.idProducto_fk,
                url: req.file.filename,
                descripcion: req.body.descripcion,
                fecha: new Date()
            });
            await imagen.save();
            res.json({status: 'Imagen created',imagen: imagen});
        }
    });

};

imagenCtrl.getImagen = async (req, res, next) => {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);
    res.json(imagen);
};

imagenCtrl.editImagen = async (req, res, next) => {
    const { id } = req.params;

    const imagen = {
        idImagen: req.body.idImagen,
        idProducto_fk: req.body.idProducto_fk,
        url: req.body.url,
        descripcion: req.body.descripcion,
        fecha: new Date()
    };

    await Imagen.findByIdAndUpdate(id, {$set: imagen}, {new: true});
    res.json({status: 'Imagen Updated'});
};

imagenCtrl.deleteImagen = async (req, res, next) => {
    await Imagen.findByIdAndRemove(req.params.id);
    res.json({status: 'Imagen Deleted'});
};

imagenCtrl.downloadImagen = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../repo/' + req.params.image)); 
};

imagenCtrl.imagenesIdProducto = async (req, res, next) => {
    const imagenes = await Imagen.find({ idProducto_fk: req.params.id });
    res.json(imagenes);
};

module.exports = imagenCtrl;