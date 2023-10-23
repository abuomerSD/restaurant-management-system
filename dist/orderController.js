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
const renderOrdersPage = (req, res) => {
    res.render('orders-list', { title: 'Orders List' });
};
const renderAddOrderPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let meals;
    try {
        meals = yield prisma.meal.findMany();
        res.render('add-order', { title: 'ADD Order', meals });
    }
    catch (err) {
        res.send(err.message);
    }
});
const saveOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const data = {
    //     id: req.body.id,
    customer_name: req.body.customer_name,
        //     order_total: req.body.order_total,
        //     isPayed: req.body.isPayed,
        // // }
        // const data = req.body;
        console.log('body: ', req.body);
    const order_details = req.body.Order_Details;
    try {
        const order = yield prisma.order.create({
            data: {
                customer_name: req.body.customer_name,
                order_total: req.body.order_total,
                isPayed: req.body.isPayed,
                // Order_Details: {
                //     create:  order_details
                // }
            },
        });
        console.log('order: ', order);
        console.log('details: ', order_details);
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
    }
    catch (error) {
        res.send(error.message);
    }
});
module.exports = {
    renderOrdersPage,
    renderAddOrderPage,
    saveOrder
};
