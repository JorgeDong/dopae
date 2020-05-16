const express = require('express');
const app = express();
const db = require('./config/mongodb.connection');
const passport = require('passport');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
require('./config/passport')(passport);     // Passport config

app.use(cors());

app.use(express.static(__dirname+'/public'))

//Socket IO Config
const http = require('http').Server(app);
const io   = require('socket.io')(http);

io.on('connection', function(socket) {
    const chat = require('./socket/chat')(socket, io);
})

// Body-Parser
app.use(express.urlencoded( {extended:false} ));

app.use(express.json());

// Using my ROUTES from routes/routes.js
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/categoria', require('./routes/categorias.routes'));
app.use('/api/imagen', require('./routes/imagen.routes'));
app.use('/api/producto', require('./routes/producto.routes'));
app.use('/api/subasta', require('./routes/subasta.routes'));
app.use('/api/puja', require('./routes/puja.routes'));
app.use('/api/comentario', require('./routes/comentario.routes'));
app.use('/api/credito', require('./routes/credito.routes'));

//require('./tests/categoria.test')(app);
//require('./tests/credito.test')(app);
//require('./tests/producto.test')(app);

app.get('*', (req, res)=> res.sendFile(__dirname+'/public/index.html'))

http.listen(PORT, console.log(`Server runnign at port: ${PORT}`));
