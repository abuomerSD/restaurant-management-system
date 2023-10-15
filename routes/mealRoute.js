
const express = require('express');
const router = express.Router();
const controller = require('../dist/mealController');


router.get('/add-meal', controller.renderAddMeal)

router.get('/', controller.getAllMeals);

router.post('/', controller.addMeal);

router.put('/:id', controller.updateMeal);

router.delete('/:id', controller.deleteMeal);

router.get('/:id', controller.getSingleMeal);



module.exports = router;