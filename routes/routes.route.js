'use strict'

var express = require('express');

var functionsJSController = require('../controllers/functions.controller');

var router = express.Router();

//Rutas
router.get('/convertirHex/:address', functionsJSController.convertirHex);
router.post('/encodeParams', functionsJSController.encodeParams);

module.exports = router;