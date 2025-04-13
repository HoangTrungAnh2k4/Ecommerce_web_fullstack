const express = require('express');

const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/test', userController.test);
router.get('/list-equipment/by-type', userController.getListEquipmentByType);
router.get('/list-best-seller', userController.getListBestSeller);
router.get('/user-infor', userController.getUserInfor);
router.post('/post-rate', userController.postRate);
router.get('/get-rate/:id', userController.getRate);

module.exports = router;
