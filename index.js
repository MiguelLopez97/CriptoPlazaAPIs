'use strict'

var app = require('./app');
var port = 3900;

//Crea el servidor y escucha las peticiones HTTP
app.listen(port, () => {
    console.log('Servidor corriendo en http:localhost:' + port);
});