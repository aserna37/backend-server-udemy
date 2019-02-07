//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')



//Inicializar Variables
var app = express();


//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


//Conexion BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , ' online');
});


//Server Index Config
//var serveIndex = require('serve-index');
//app.use(express.static(__dirname + '/'))
//app.use('/uploads', serveIndex(__dirname + '/uploads'));



//rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/img', imagenesRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/', appRoutes);



//Escuchar Peticiones
app.listen(3000, ()=>{
    console.log('Example app listening on port: \x1b[32m%s\x1b[0m' , ' 3000!');
})
