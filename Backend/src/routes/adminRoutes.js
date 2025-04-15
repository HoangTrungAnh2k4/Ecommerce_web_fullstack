const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers');

router.post('/add-product', adminControllers.addProduct);
router.delete('/delete-product/:id', adminControllers.deleteProduct);
router.delete('/delete-rate/:id', adminControllers.deleteRate);

module.exports = router;
