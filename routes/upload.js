var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

app.use(fileUpload());


app.put('/:tipo/:id', (req, res) => {
    
    var tipo = req.params.tipo;
    var id = req.params.id;


    //tipos de Coleccion

    var tiposValidos = ['usuarios','medicos','hospitales'];

    if(tiposValidos.indexOf( tipo ) < 0){
        return res.status(400).json({
            ok:false,
            mensaje: ' Tipo de coleccion no es valida',
            errors:{ message: 'Debe seleccionar una coleccion valida '  + tiposValidos.join(', ')}
        });

    }

    if(!req.files){
        
            return res.status(400).json({
                ok:false,
                mensaje: ' No selecciono nada',
                errors:{ message: 'Debe seleccionar una imagen'}
            });
    
            
        
    }

//Obtener nombre del archivo

var archivo = req.files.imagen
var nombreCortado = archivo.name.split('.')
var extensionArchivo = nombreCortado[nombreCortado.length -1]

//Solo estas extensiones aceptamos
var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

if(extensionesValidas.indexOf(extensionArchivo) < 0){
    return res.status(400).json({
        ok:false,
        mensaje: ' El archivo contiene una extension no valida',
        errors:{ message: 'Debe seleccionar una extension validas '  + extensionesValidas.join(', ') }
    });
}

//Nombre de Archivo Personalizado

var nombreArchivo = `${ id }-${new Date().getMilliseconds()}.${extensionArchivo}`;

//Mover el archivo temporal a un Path
var path = `./uploads/${ tipo }/${ nombreArchivo }`;

archivo.mv( path, err =>{
    if (err) {
        return res.status(500).json({
            ok:false,
            mensaje: ' Error al mover archivo',
            errors: err
        });  
    }
    
    subirPorTipo( tipo, id, nombreArchivo, res );
})

});

function subirPorTipo( tipo, id, nombreArchivo, res ){

    var Tipos = {
        usuarios: Usuario,
        medicos: Medico,
        hospitales: Hospital
    };

    if(Tipos.hasOwnProperty(tipo)){

        Tipos[tipo].findById(id, (err, modelo) => {
            if(err){
                return res.status(406).json({
                    ok:false,
                    mensaje: ' Formato Incorrecto -ID',
                    errors: err 
            });  
            }

            if(!modelo){
            return res.status(404).json({
                ok:false,
                mensaje: {message: 'Resultado no encontrado'},
                
            });
            }
            
            
            var pathViejo = `./uploads/${ tipo }/` + modelo.img;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo, (err)=>{
                    if(err){
                        return res.status(500).json({
                            ok:false,
                            mensaje: ' Error al eliminar archivo',
                            errors: { message: 'Error al eliminar archivo', err} 
                        });   
                    }
                });
            }

            //Todo ok, Imagen Guardada
            modelo.img = nombreArchivo;
            modelo.save((err, modeloActualizado)=>{
                    return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen cargada!',
                    [tipo]: modeloActualizado
                    });
            });


        });

    }





}
    


module.exports = app;



