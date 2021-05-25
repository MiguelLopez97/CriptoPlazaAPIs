'use strict'

var express = require('express');

var shastaController = require('../controllers/shasta.controller');
var trongridController = require('../controllers/trongrid.controller');

var router = express.Router();

//Rutas
router.get('/convertirHex/:address', trongridController.convertirHex);
router.post('/encodeParams', trongridController.encodeParams);
router.get('/generateAddress', trongridController.generateAddress);

//Rutas para la red de Shasta
router.get('/shasta/convertirHex/:address', shastaController.convertirHex);
router.post('/shasta/encodeParams', shastaController.encodeParams);
router.get('/shasta/generateAddress', shastaController.generateAddress);

module.exports = router;