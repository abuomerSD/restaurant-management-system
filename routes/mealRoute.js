const express = require('express');
const router = express.Router();
const controller = require('../dist/mealController');

router.get('/', (req, res) => {
    res.json({
        "msg":"ok",
    })
});

router.post('/', controller.addMeal);





module.exports = router;