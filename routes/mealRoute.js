
const express = require('express');
const router = express.Router();
const controller = require('../dist/mealController');


router.get('/add-meal', controller.renderAddMeal)

router.get('/meals', controller.renderMealsList)

router.get('/', controller.getAllMeals);

router.post('/', controller.addMeal);

router.put('/:id', controller.updateMeal);

router.delete('/:id', controller.deleteMeal);

router.get('/:id', controller.getSingleMeal);

router.post('/get-single-meal', controller.getMealJson)

router.use((req, res) => {
    res.send('404 Page Not Found');
})



module.exports = router;