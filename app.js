const express = require('express');
const dotenv = require('dotenv');
const mealRouter = require('./routes/mealRoute');
const orderRoute = require('./routes/orderRoute');
const middlewares = require('./middleware/middleware')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

dotenv.config();

// create a new instance of express
const app = express();

// defining the listening port
const port = process.env.port;

// setting the view engine to EJS
app.set('view engine', 'ejs');

// defining the public files path
app.use(express.static('public'));

// method override
app.use(methodOverride('X-HTTP-Method-Override'))

// logging middleware for debuging
app.use(middlewares.logger);

// error handeler
app.use(middlewares.errorHandler);

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// meals route
app.use('/meals', mealRouter);

// orders route
app.use('/orders', orderRoute)

app.get('/', (req, res) => {
    res.render('index', {title:'Restaurent Management System'})
})

// handle 404 pages
app.use((req, res) => {
    res.send('404 Page Not Found');
})

// listening to requests
app.listen(port, ()=> {
    console.log(`Server is Listening to Requests at Port ${port}`);
});
