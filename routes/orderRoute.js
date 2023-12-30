const express = require('express');
const controller = require('../dist/orderController');
const router = express.Router();

router.get('/', controller.renderOrdersPage);
router.get('/add-order', controller.renderAddOrderPage);
router.post('/', controller.saveOrder);
router.delete('/:id', controller.deleteOrder);
router.use((req, res) => {
    res.send('404 Page Not Found');
})


module.exports = router;