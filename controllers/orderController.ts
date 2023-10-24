import { PrismaClient } from "@prisma/client";
import { create } from "domain";
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

const saveOrder = async (req: Request, res:Response) => {

    // console.log('body: ',req.body);
    const order_details = req.body.Order_Details;
    

    try {
        const order = await prisma.order.create({
            // data: req.body,
            data:{
                customer_name: req.body.customer_name,
                order_total: req.body.order_total,
                isPayed: req.body.isPayed,
                Order_Details: {
                    create: order_details,
                },
            },
            include:{
                Order_Details: true,
            }
        })
        .then(()=> res.redirect('/orders/add-order'))
        .catch((err)=> {
            console.log(err.message);
            res.send(err.message);
        })

        

    } catch (error: any) {
        res.send(error.message);
    }
}

module.exports = { 
    renderOrdersPage,
    renderAddOrderPage, 
    saveOrder
}