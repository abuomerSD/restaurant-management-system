const express = require('express');
const controller = require('../dist/orderController');
const router = express.Router();

router.get('/', controller.renderOrdersPage);
router.get('/add-order', controller.renderAddOrderPage);
router.post('/', controller.saveOrder);
router.delete('/:id', controller.deleteOrder);


module.exports = router;