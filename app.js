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


//Conexion BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , ' online');
});



//rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);



//Escuchar Peticiones
app.listen(3000, ()=>{
    console.log('Example app listening on port: \x1b[32m%s\x1b[0m' , ' 3000!');
})
