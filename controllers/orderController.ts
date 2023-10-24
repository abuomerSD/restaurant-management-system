import { PrismaClient } from "@prisma/client";
import { create } from "domain";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const renderOrdersPage = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany();
    // console.log(orders);

    res.render('orders-list', { title: 'Orders List', orders});
}

const renderAddOrderPage = async (req: Request, res: Response) => {
    let meals: any;
    try
    {
         meals = await prisma.meal.findMany();
         const orders = await prisma.order.findMany({
            orderBy: {
                id:'desc'
            },
            take:1
         })
         
        //  console.log(meals);
        //  console.log(orders[0].id);
         let lastInvoiceId :Number ;

         if(orders.length < 1){
            lastInvoiceId = 0;
         }
         else {
            lastInvoiceId = orders[0].id;
         }
         res.render('add-order', { title: 'ADD Order', meals, lastInvoiceId});
    }
    catch(err :any){
        res.send(err.message);
    }
}

const saveOrder = async (req: Request, res:Response) => {

    const order_details = req.body.Order_Details;

    try {
        const order = await prisma.order.create({
            
            data:{
                customer_name: req.body.customer_name,
                order_total: req.body.order_total,
                isPaid: req.body.isPayed,
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