const express = require('express');

const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/test', userController.test);

module.exports = router;
