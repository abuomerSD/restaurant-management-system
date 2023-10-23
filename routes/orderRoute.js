const express = require('express');
const controller = require('../dist/orderController');
const router = express.Router();

router.get('/', controller.renderOrdersPage);
router.get('/add-order', controller.renderAddOrderPage);
router.post('/', controller.saveOrder);


module.exports = router;