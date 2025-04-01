const express = require('express');

const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/test', userController.test);
router.get('/product-best-seller', userController.test);
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

module.exports = router;
