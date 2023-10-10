const express = require('express');
const dotenv = require('dotenv');

// import express, {Express} from 'express';
// import dotenv from 'dotenv';
// import mealRouter from './dist/routes/'

dotenv.config();

// create a new instance of express
const app = express();

// defining the listening port
const port = process.env.port;

// defining the public files path
app.use(express.static('public'));

// listening to requests
app.listen(port, ()=> {
    console.log(`Server is Listening to Requests at Port ${port}`);
});
