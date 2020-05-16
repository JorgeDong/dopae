const Subasta = require('../models/Subasta');


const subastaCtrl = {};

subastaCtrl.getLastSubasta = async (req, res, next) => {
    const subasta = await Subasta.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(subasta);
};

subastaCtrl.getSubastas = async (req, res, next) => {
    const subasta = await Subasta.find();
    res.json(subasta);
};

subastaCtrl.createSubasta = async (req, res, next) => {
    Subasta.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        if(post == null){
            const subasta = new Subasta({
                idSubasta: 1,
                idProducto_fk: req.body.idProducto_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                PujaInicial: req.body.PujaInicial,
                Tiempo: req.body.Tiempo,
                FechaInicio: req.body.FechaInicio,
                FechaFinal: req.body.FechaFinal,
                Descripcion: req.body.Descripcion,
                Envio: req.body.Envio,
                fechaAlta: new Date()
            });
            await subasta.save();
            res.json({status: 'Subasta created',Subasta: subasta});
        }else{
            let lastSubasta = post.idSubasta;
            lastSubasta++;
            const subasta = new Subasta({
                idSubasta: lastSubasta,
                idProducto_fk: req.body.idProducto_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                PujaInicial: req.body.PujaInicial,
                Tiempo: req.body.Tiempo,
                FechaInicio: req.body.FechaInicio,
                FechaFinal: req.body.FechaFinal,
                Descripcion: req.body.Descripcion,
                Envio: req.body.Envio,
                fechaAlta: new Date()
            });
            await subasta.save();
            res.json({status: 'Subasta created',Subasta: subasta});
        }
    });

};

subastaCtrl.getSubasta = async (req, res, next) => {
    const { id } = req.params;
    const subasta = await Subasta.findById(id);
    res.json(subasta);
};

subastaCtrl.editSubasta = async (req, res, next) => {
    const { id } = req.params;

    const subasta = {
        idSubasta: req.body.idSubasta,
        idProducto_fk: req.body.idProducto_fk,
        idUsuario_fk: req.body.idUsuario_fk,
        PujaInicial: req.body.PujaInicial,
        Tiempo: req.body.Tiempo,
        FechaInicio: req.body.FechaInicio,
        FechaFinal: req.body.FechaFinal,
        Descripcion: req.body.Descripcion,
        Envio: req.body.Envio,
        fechaAlta: new Date()
    };

    await Subasta.findByIdAndUpdate(id, {$set: subasta}, {new: true});
    res.json({status: 'Subasta Updated'});
};

subastaCtrl.deleteSubasta = async (req, res, next) => {
    await Subasta.findByIdAndRemove(req.params.id);
    res.json({status: 'Subasta Deleted'});
};


// subastaCtrl.obtenerTodo = async (req, res, next) => {
//     //res.json({status: 'Subasta Deleted'});
//     Subasta.find(null, function (err, docs) {
//         console.log(docs)
//     });
// };

module.exports = subastaCtrl;