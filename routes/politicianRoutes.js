const express = require('express');
const router = express.Router();
const politicianController = require('../controllers/politicianController');

router.get('/', politicianController.listPoliticians);

module.exports = router;