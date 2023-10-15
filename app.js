const express = require('express');
const dotenv = require('dotenv');
<<<<<<< HEAD
const mealRouter = require('./routes/mealRoute');
const middlewares = require('./middleware/middleware')
const bodyParser = require('body-parser');
=======

// import express, {Express} from 'express';
// import dotenv from 'dotenv';
// import mealRouter from './dist/routes/'
>>>>>>> 37a2bc9c9b40f321d0e4a386c6d527870d7e414e

dotenv.config();

// create a new instance of express
const app = express();

// defining the listening port
const port = process.env.port;

// defining the public files path
app.use(express.static('public'));

// logging middleware for debuging
app.use(middlewares.logger);

// error handeler
app.use(middlewares.errorHandler);

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// meals route
app.use('/meals', mealRouter);

// listening to requests
app.listen(port, ()=> {
    console.log(`Server is Listening to Requests at Port ${port}`);
});
