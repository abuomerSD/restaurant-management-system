<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const controller = require('../dist/mealController');

router.get('/', controller.getAllMeals);
=======
// import express from 'express';
// const router = express.Router();

// router.get('/meals', (req, res) => {
//     res.json({
//         "msg":"ok",
//     })
// });
>>>>>>> 37a2bc9c9b40f321d0e4a386c6d527870d7e414e

router.post('/', controller.addMeal);

router.put('/:id', controller.updateMeal);

router.delete('/:id', controller.deleteMeal);

router.get('/:id', controller.getSingleMeal);


module.exports = router;