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
    // const data = {
    //     id: req.body.id,
        customer_name: req.body.customer_name,
    //     order_total: req.body.order_total,
    //     isPayed: req.body.isPayed,
    // // }
    // const data = req.body;

    console.log('body: ',req.body);
    const order_details = req.body.Order_Details;

    try {
        const order = await prisma.order.create({
            data:{
                customer_name: req.body.customer_name,
                order_total: req.body.order_total,
                isPayed: req.body.isPayed,
                // Order_Details: {
                //     create:  order_details
                // }
            },
        })
        console.log('order: ', order);
        console.log('details: ',order_details);

        // for(let i =0 ; i < order_details.length ; i++){
        //     const details = await prisma.order_Details.create({
        //         // data: {
        //         //     orderID: order.id,
        //         //     meal_name: order_details[i].name,
        //         //     meal_price: order_details[i].price,
        //         //     meal_qty: order_details[i].qty,
        //         //     meal_total: order_details[i].total,
        //         // }
        //         data: order_details
        //     })
        // }

    } catch (error: any) {
        res.send(error.message);
    }
}

module.exports = { 
    renderOrdersPage,
    renderAddOrderPage, 
    saveOrder
}