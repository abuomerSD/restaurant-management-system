import express from 'express';
const app = express();
const PORT = 5000;

app.use(express.static('public'));

app.listen(PORT, ()=> {
    console.log(`Server is Listening to Requests at Port ${PORT}`);
});
