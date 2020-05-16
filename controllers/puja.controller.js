const Puja = require('../models/Puja');


const pujaCtrl = {};

pujaCtrl.getLastPuja = async (req, res, next) => {
    const puja = await Puja.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(puja);
};

pujaCtrl.getPujas = async (req, res, next) => {
    const pujas = await Puja.find();
    res.json(pujas);
};

pujaCtrl.createPuja = async (req, res, next) => {
    Puja.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const puja = new Puja({
                idPuja: 1,
                idSubasta_fk: req.body.idSubasta_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                CantidadPuja: req.body.CantidadPuja,
                Usuario: req.body.Usuario,
                fechaAlta: new Date(),
                PujaInicial: req.body.PujaInicial,
                NombreProducto: req.body.NombreProducto,
            });
            await puja.save();
            res.json({status: 'Puja created',puja: puja});
        }else{
            let lastPuja = post.idPuja;
            lastPuja++;
            const puja = new Puja({
                idPuja: lastPuja,
                idSubasta_fk: req.body.idSubasta_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                Usuario: req.body.Usuario,
                CantidadPuja: req.body.CantidadPuja,
                fechaAlta: new Date(),
                PujaInicial: req.body.PujaInicial,
                NombreProducto: req.body.NombreProducto,
            });
            await puja.save();
            res.json({status: 'Puja created',puja: puja});
        }
    });

};

pujaCtrl.getPuja = async (req, res, next) => {
    const { id } = req.params;
    const puja = await Puja.findById(id);
    res.json(puja);
};

pujaCtrl.editPuja = async (req, res, next) => {
    const { id } = req.params;

    const puja = {
        idPuja: req.body.idPuja,
        idSubasta_fk: req.body.idSubasta_fk,
        idUsuario_fk: req.body.idUsuario_fk,
        Usuario: req.body.Usuario,
        CantidadPuja: req.body.CantidadPuja,
        fechaAlta: new Date(),
        PujaInicial: req.body.PujaInicial,
        NombreProducto: req.body.NombreProducto,
    };

    await Puja.findByIdAndUpdate(id, {$set: puja}, {new: true});
    res.json({status: 'Puja Updated'});
};

pujaCtrl.deletePuja = async (req, res, next) => {
    await Puja.findByIdAndRemove(req.params.id);
    res.json({status: 'Puja Deleted'});
};

pujaCtrl.getPujasPorIdProducto = async (req, res, next) => {
    const pujas = await Puja.find({ idSubasta_fk: req.params.id });
    res.json(pujas);
};

pujaCtrl.getPujasPorIdUsuario = async (req, res, next) => {
    const pujas = await Puja.find({ idUsuario_fk: req.params.id });
    res.json(pujas);
};


module.exports = pujaCtrl;