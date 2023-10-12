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
    console.log(meal);
    try {
        yield prisma.meal.create({
            data: meal,
        });
        res.json({
            "status": "Meal added successfully"
        });
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
        //   res.send(`${meal?.id} - ${meal?.name} - ${meal?.price}`) 
        if (meal === null) {
            res.status(404).send('Meal Not Found');
        }
        res.json(meal);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});
const getAllMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield prisma.meal.findMany();
        res.json(meals);
    }
    catch (err) {
        res.send(err.message);
    }
});
module.exports = { addMeal, updateMeal, deleteMeal, getSingleMeal, getAllMeals };
