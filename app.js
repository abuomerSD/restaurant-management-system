const express = require('express');
const dotenv = require('dotenv');
const mealRouter = require('./routes/mealRoute');
const middlewares = require('./middleware/middleware')
const bodyParser = require('body-parser');

dotenv.config();

// create a new instance of express
const app = express();

// defining the listening port
const port = process.env.port;

// defining the public files path
app.use(express.static('public'));

// logging middleware for debuging
app.use(middlewares.logger);

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// meals route
app.use('/meals', mealRouter);

// listening to requests
app.listen(port, ()=> {
    console.log(`Server is Listening to Requests at Port ${port}`);
});
