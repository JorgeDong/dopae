const Comentario = require('../models/Comentario');


const comentarioCtrl = {};

comentarioCtrl.getLastComentario = async (req, res, next) => {
    const comentario = await Comentario.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(comentario);
};

comentarioCtrl.getComentarios = async (req, res, next) => {
    const comentarios = await Comentario.find();
    res.json(comentario);
};

comentarioCtrl.createComentario = async (req, res, next) => {
    Comentario.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        console.log(req.body)
        if(post == null){
            const comentario = new Comentario({
                idComentario: 1,
                idUsuarioOrigen_fk: req.body.idUsuarioOrigen_fk,
                idUsuarioDestino_fk: req.body.idUsuarioDestino_fk,
                idPuja_fk: req.body.idPuja_fk,
                Comentario: req.body.Comentario,
                tipo: req.body.tipo,
                fechaAlta: new Date(),
                nombreUsuarioEmisor: req.body.nombreUsuarioEmisor,
            });
            await comentario.save();
            res.json({status: 'Comentario created',comentario: comentario});
        }else{
            let lastComentario = post.idComentario;
            lastComentario++;
            const comentario = new Comentario({
                idComentario: lastComentario,
                idUsuarioOrigen_fk: req.body.idUsuarioOrigen_fk,
                idUsuarioDestino_fk: req.body.idUsuarioDestino_fk,
                idPuja_fk: req.body.idPuja_fk,
                Comentario: req.body.Comentario,
                tipo: req.body.tipo,
                fechaAlta: new Date(),
                nombreUsuarioEmisor: req.body.nombreUsuarioEmisor,
            });
            await comentario.save();
            res.json({status: 'Comentario created',comentario: comentario});
        }
    });

};

comentarioCtrl.getComentario = async (req, res, next) => {
    const { id } = req.params;
    const comentario = await Comentario.findById(id);
    res.json(comentario);
};

comentarioCtrl.editComentario = async (req, res, next) => {
    const { id } = req.params;

    const comentario = {
        idComentario: 1,
        idUsuarioOrigen_fk: req.body.idUsuarioOrigen_fk,
        idUsuarioDestino_fk: req.body.idUsuarioDestino_fk,
        idPuja_fk: req.body.idPuja_fk,
        Comentario: req.body.Comentario,
        tipo: req.body.tipo,
        fechaAlta: new Date(),
        nombreUsuarioEmisor: req.body.nombreUsuarioEmisor,
    };

    await Comentario.findByIdAndUpdate(id, {$set: comentario}, {new: true});
    res.json({status: 'Comentario Updated'});
};

comentarioCtrl.deleteComentario = async (req, res, next) => {
    await Comentario.findByIdAndRemove(req.params.id);
    res.json({status: 'Comentario Deleted'});
};


comentarioCtrl.getComentarioUsuario = async (req, res, next) => {
    const comentarios = await Comentario.find({ idUsuarioDestino_fk: req.params.id });
    res.json(comentarios);
};

module.exports = comentarioCtrl;