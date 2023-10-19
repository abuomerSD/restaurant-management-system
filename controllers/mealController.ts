import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const addMeal = async (req: Request, res: Response) => {
    const meal = req.body;
    let price = Number(meal.price);
    meal.price = price;
    try {
        await prisma.meal.create({
            data:meal,
        });
        res.redirect('meals');
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

    if(meal === null)
    {
        res.status(404).send('Meal Not Found');
    }
    // res.json(meal);
    res.render('../views/meal-details.ejs', {title:'Meal Details', meal})
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
    //    res.json(meals);
    res.render('../views/meals-list.ejs', {title: 'Meals List', dollarSign:'$', meals})
    }
    catch(err: any)
    {
        res.send(err.message);
    }
}

const renderAddMeal = (req: Request, res: Response) => {
    try{
        res.render('add-meal', {title:'Add Meal'});
    }
    catch(err: any){
        res.send(err.message);
    }
}

const renderMealsList = (req: Request, res: Response) => {
    try
    {
        res.render('meals-list')
    }
    catch(err: any)
    {
        res.send(err.message);
    }
}

const getMealJson = async (req: Request, res:Response) => {
    const mealName = req.body.name;
    console.log(mealName)
    try{
        const meal = await prisma.meal.findUnique({
          where: {
            name:mealName,
          }  
        })
        res.json(meal);
    } catch(err: any){
        res.send(err.message);
    }
}

module.exports = { addMeal,
     updateMeal,
      deleteMeal,
       getSingleMeal,
        getAllMeals,
         renderAddMeal,
          renderMealsList,
          getMealJson }