const Producto = require('../models/Producto');
const Imagen = require('../models/Imagen');

const productoCtrl = {};

productoCtrl.getLastProducto = async (req, res, next) => {
    const producto = await Producto.findOne({}, {}, { sort: { '_id' : -1 } });
    res.json(producto);
};

productoCtrl.getProductos = async (req, res, next) => {
    const productos = await Producto.find();
    res.json(productos);
};

productoCtrl.createProducto = async (req, res, next) => {
    Producto.findOne({}, {}, { sort: { '_id' : -1 } }, async function(err, post) {
        
        const date = new Date();

        if(post == null){
            const producto = new Producto({
                idProducto: 1,
                idCategoria_fk: req.body.idCategoria_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                nombre: req.body.nombre,
                marca: req.body.marca,
                accesorios: req.body.accesorios,
                descripcion: req.body.descripcion,
                estadoDelProducto: req.body.estadoDelProducto,
                Valor: req.body.Valor,
                fechaAlta: date,
                PujaInicial: String(req.body.PujaInicial),
                Tiempo: req.body.Tiempo,
                Envio: req.body.Envio,
                Url: req.body.Url,
                //fechaFinal: result.setDate(result.getDate() + req.body.Tiempo)
                fechaFinal: addDays(date, Number(req.body.Tiempo))
            });
            await producto.save();
            res.json({status: 'Producto created',Producto: producto});
        }else{
            let lastProducto = post.idProducto;
            lastProducto++;
            const producto = new Producto({
                idProducto: lastProducto,
                idCategoria_fk: req.body.idCategoria_fk,
                idUsuario_fk: req.body.idUsuario_fk,
                nombre: req.body.nombre,
                marca: req.body.marca,
                accesorios: req.body.accesorios,
                descripcion: req.body.descripcion,
                estadoDelProducto: req.body.estadoDelProducto,
                Valor: req.body.Valor,
                fechaAlta: date,
                PujaInicial: String(req.body.PujaInicial),
                Tiempo: req.body.Tiempo,
                Envio: req.body.Envio,
                Url: req.body.Url,
                //fechaFinal: result.setDate(result.getDate() + req.body.Tiempo)
                fechaFinal: addDays(date, Number(req.body.Tiempo))
            });
         await producto.save();
         res.json({status: 'Producto created',Producto: producto});
        }
    });

};

productoCtrl.getProducto = async (req, res, next) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.json(producto);
};

productoCtrl.editProducto = async (req, res, next) => {
    const { id } = req.params;

    console.log(id)

    console.log(req.body)
    const date = new Date();

    const producto = {
        idProducto: req.body.idProducto,
        idCategoria_fk: req.body.idCategoria_fk,
        idUsuario_fk: req.body.idUsuario_fk,
        nombre: req.body.nombre,
        marca: req.body.marca,
        accesorios: req.body.accesorios,
        descripcion: req.body.descripcion,
        estadoDelProducto: req.body.estadoDelProducto,
        Valor: req.body.Valor,
        fechaAlta: new Date(),
        PujaInicial: String(req.body.PujaInicial),
        Tiempo: req.body.Tiempo,
        Envio: req.body.Envio,
        Url: req.body.Url,
        fechaFinal: addDays(date, Number(req.body.Tiempo))
    };



    await Producto.findByIdAndUpdate(id, {$set: producto}, {new: true});
    res.json({status: 'Producto Updated'});
};

productoCtrl.deleteProducto = async (req, res, next) => {
    await Producto.findByIdAndRemove(req.params.id);
    res.json({status: 'Producto Deleted'});
};

productoCtrl.findByID = async (req, res, next) => {
    console.log(req.params.id)
   const producto = await Producto.find({ idProducto: req.params.id });
    res.json(producto);
};

productoCtrl.findImagenesByID = async (req, res, next) => {
    const imagenes = await Imagen.find({ idProducto_fk: req.params.id });
    res.json(imagenes);
};

productoCtrl.getProductosPorIdUsuario = async (req, res, next) => {
    console.log(req.params.id)
   const producto = await Producto.find({ idUsuario_fk: req.params.id });
    res.json(producto);
};


function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}


module.exports = productoCtrl;