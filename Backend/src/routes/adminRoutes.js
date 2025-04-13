const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers');

router.post('/add-product', adminControllers.addProduct);
router.delete('/delete-product/:id', adminControllers.deleteProduct);

module.exports = router;
