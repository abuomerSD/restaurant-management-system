import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const renderOrdersPage = (req: Request, res: Response) => {
    res.render('orders-list', { title: 'Orders List'});
}

const renderAddOrderPage = async (req: Request, res: Response) => {
    let meals: any;
    try
    {
         meals = await prisma.meal.findMany();
         res.render('add-order', { title: 'ADD Order', meals});
    }
    catch(err :any){
        res.send(err.message);
    }
}

module.exports = { renderOrdersPage,
                    renderAddOrderPage }