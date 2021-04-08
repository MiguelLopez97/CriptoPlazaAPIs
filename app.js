'use strict'

//Cargar módulo de Express para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar Express (HTTP)
var app = express();

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Exportar módulo (fichero actual)
module.exports = app;

//Importa las rutas definidas que están en la carpeta routes, en el archivo 'routes'
var routes = require('./routes/routes.route');

//Carga las rutas que se han importado anteriormente
app.use('/api', routes);

//Configuración de Headers y CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
