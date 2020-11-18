var express = require('express');
const RandomController = require('../Controllers/RandomController');

var router = express.Router();

router.get('/age/:number', RandomController.setAge);
router.post('/tricks', RandomController.tricks);
router.get('/', RandomController.healthCheck);

module.exports = router;