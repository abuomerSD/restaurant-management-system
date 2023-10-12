import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const addMeal = async (req: Request, res: Response) => {
    const meal = req.body;
    console.log(meal);
    try {
        await prisma.meal.create({
            data:meal,
        });
        res.json({
            "status": "Meal added successfully"
        })
    }
    catch(err : any){
        res.status(404).send(err.message);
    }
}

const updateMeal = async (req: Request, res: Response) => {
    const meal = req.body;
    const id = req.params.id;
    try{
        await prisma.meal.update({
            where:{
                id: id,
            },
            data: {
                name: meal.name,
                price: meal.price,
            },
        })
        res.json({
            "msg":"updated successfully",
        })
    }
    catch(err: any) {
        res.status(404).send(err.message);
    }
    
}

const deleteMeal = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await prisma.meal.delete({
            where: {
                id: id,
            }
        })
    
        res.json({
            'msg': 'meal deleted successfully'
        })
    }
    catch(err: any){
        res.status(404).send(err.message);
    }
}

const getSingleMeal =async (req: Request, res: Response) => {
    const id = req.params.id;
    try 
    {
      const meal = await prisma.meal.findUnique({
        where: {
            id: id,
        }
      })

    //   res.send(`${meal?.id} - ${meal?.name} - ${meal?.price}`) 
    if(meal === null)
    {
        res.status(404).send('Meal Not Found');
    }
    res.json(meal);
    }
    catch(err: any)
    {
        res.status(404).send(err.message);
    }
}

const getAllMeals =async (req:Request, res: Response) => {
    try
    {
       const meals = await prisma.meal.findMany();
       res.json(meals);
    }
    catch(err: any)
    {
        res.send(err.message);
    }
}


module.exports = { addMeal, updateMeal, deleteMeal, getSingleMeal, getAllMeals }