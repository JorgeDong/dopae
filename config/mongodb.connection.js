const mongoose = require('mongoose');
const URI = 'mongodb+srv://admin:admin@pae-u17vu.mongodb.net/proyecto?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('MongoDB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;