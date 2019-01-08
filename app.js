//Requires
var express = require('express');
var mongoose = require('mongoose');


//Inicializar Variables
var app = express();

//Conexion BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , ' online');
});

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
})



//Escuchar Peticiones
app.listen(3000, ()=>{
    console.log('Example app listening on port: \x1b[32m%s\x1b[0m' , ' 3000!');
})
