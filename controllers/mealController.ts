import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const addMeal = async (req: Request, res: Response) => {
    const meal = req.body;
    console.log(meal);
    await prisma.meal.create({
        data:meal,
    });
    res.json({
        "status": "Meal added successfully"
    })
}

const updateMeal = async (req: Request, res: Response) => {
    const meal = req.body;
    const id = req.params.id;
    await prisma.meal.update({
        where:{
            id: id,
        }
    })
}

module.exports = { addMeal, updateMeal }