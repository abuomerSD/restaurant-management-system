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
const renderOrdersPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield prisma.order.findMany();
    // console.log(orders);
    res.render('orders-list', { title: 'Orders List', orders });
});
const renderAddOrderPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let meals;
    try {
        meals = yield prisma.meal.findMany();
        const orders = yield prisma.order.findMany({
            orderBy: {
                id: 'desc'
            },
            take: 1
        });
        //  console.log(meals);
        //  console.log(orders[0].id);
        let lastInvoiceId;
        if (orders.length < 1) {
            lastInvoiceId = 0;
        }
        else {
            lastInvoiceId = orders[0].id;
        }
        res.render('add-order', { title: 'ADD Order', meals, lastInvoiceId });
    }
    catch (err) {
        res.send(err.message);
    }
});
const saveOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_details = req.body.Order_Details;
    try {
        const order = yield prisma.order.create({
            data: {
                customer_name: req.body.customer_name,
                order_total: req.body.order_total,
                isPaid: req.body.isPayed,
                Order_Details: {
                    create: order_details,
                },
            },
            include: {
                Order_Details: true,
            }
        })
            .then(() => res.redirect('/orders/add-order'))
            .catch((err) => {
            console.log(err.message);
            res.send(err.message);
        });
    }
    catch (error) {
        res.send(error.message);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const orderDetails = yield prisma.order_Details.deleteMany({
            where: {
                orderID: id,
            },
        });
        const order = yield prisma.order.delete({
            where: {
                id: id
            }
        });
        res.redirect('/orders');
    }
    catch (error) {
        res.send(error.message);
        console.log(error.message);
    }
});
module.exports = {
    renderOrdersPage,
    renderAddOrderPage,
    saveOrder,
    deleteOrder
};
