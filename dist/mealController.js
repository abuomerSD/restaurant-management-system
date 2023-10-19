"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meal = req.body;
    let price = Number(meal.price);
    meal.price = price;
    try {
        yield prisma.meal.create({
            data: meal,
        });
        res.redirect('meals');
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
const updateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meal = req.body;
    const id = req.params.id;
    try {
        yield prisma.meal.update({
            where: {
                id: id,
            },
            data: {
                name: meal.name,
                price: meal.price,
            },
        });
        res.json({
            "msg": "updated successfully",
        });
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
const deleteMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield prisma.meal.delete({
            where: {
                id: id,
            }
        });
        res.json({
            'msg': 'meal deleted successfully'
        });
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
const getSingleMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const meal = yield prisma.meal.findUnique({
            where: {
                id: id,
            }
        });
        if (meal === null) {
            res.status(404).send('Meal Not Found');
        }
        // res.json(meal);
        res.render('../views/meal-details.ejs', { title: 'Meal Details', meal });
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
const getAllMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield prisma.meal.findMany();
        //    res.json(meals);
        res.render('../views/meals-list.ejs', { title: 'Meals List', dollarSign: '$', meals });
    }
    catch (err) {
        res.send(err.message);
    }
});
const renderAddMeal = (req, res) => {
    try {
        res.render('add-meal', { title: 'Add Meal' });
    }
    catch (err) {
        res.send(err.message);
    }
};
const renderMealsList = (req, res) => {
    try {
        res.render('meals-list');
    }
    catch (err) {
        res.send(err.message);
    }
};
const getMealJson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mealName = req.body.name;
    console.log(mealName);
    try {
        const meal = yield prisma.meal.findUnique({
            where: {
                name: mealName,
            }
        });
        res.json(meal);
    }
    catch (err) {
        res.send(err.message);
    }
});
module.exports = { addMeal,
    updateMeal,
    deleteMeal,
    getSingleMeal,
    getAllMeals,
    renderAddMeal,
    renderMealsList,
    getMealJson };
