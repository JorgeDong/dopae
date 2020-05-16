const Credito = require('../models/Credito');


const creditoCtrl = {};

creditoCtrl.getLastCredito = async (req, res, next) => {
    const credito = await Credito.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(credito);
};

creditoCtrl.getCreditos = async (req, res, next) => {
    const creditos = await Credito.find();
    res.json(creditos);
};

creditoCtrl.createCredito = async (req, res, next) => {
    Credito.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const credito = new Credito({
                idCredito: 1,
                idUsuario_fk: req.body.idUsuario_fk,
                CantidadCredito: req.body.CantidadCredito,
                moneda: req.body.moneda,
                fechaAlta: new Date()
            });
            await credito.save();
            res.json({status: 'Credito created',credito: credito});
        }else{
            let lastComentario = post.idCredito;
            lastComentario++;
            const credito = new Credito({
                idCredito: lastComentario,
                idUsuario_fk: req.body.idUsuario_fk,
                CantidadCredito: req.body.CantidadCredito,
                moneda: req.body.moneda,
                fechaAlta: new Date()
            });
            await credito.save();
            res.json({status: 'Credito created',credito: credito});
        }
    });

};

creditoCtrl.getCredito = async (req, res, next) => {
    const { id } = req.params;
    const credito = await Credito.findById(id);
    res.json(credito);
};

creditoCtrl.editCredito = async (req, res, next) => {
    const { id } = req.params;

    const credito = {
        idCredito: req.body.idCredito,
        idUsuario_fk: req.body.idUsuario_fk,
        CantidadCredito: req.body.CantidadCredito,
        moneda: req.body.moneda,
        fechaAlta: new Date()
    };
	console.log(credito)
    await Credito.findByIdAndUpdate(id, {$set: credito}, {new: true});
    res.json({status: 'Credito Updated'});
};

creditoCtrl.deleteCredito = async (req, res, next) => {
    await Credito.findByIdAndRemove(req.params.id);
    res.json({status: 'Credito Deleted'});
};

module.exports = creditoCtrl;