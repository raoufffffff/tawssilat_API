const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const foodRoute = require('./routes/food.route');
const snakRoute = require('./routes/snak.route');
const restaurantRoute = require('./routes/Restaurant.route');
const orderRoute = require('./routes/order.route');
const AuthRest = require('./auth/rest.auth');
const FeedBackRoute = require('./routes/feedBack.route');
const AddsRoute = require('./routes/adds.route');



const app = express()
app.use(cors());
app.use(express.json())
app.use('/food', foodRoute)
app.use('/snak', snakRoute)
app.use('/restaurant', restaurantRoute)
app.use('/order', orderRoute)
app.use('/authrest', AuthRest)
app.use('/feedback', FeedBackRoute)
app.use('/adds', AddsRoute)


app.get('/', (req, res) => {
    res.send("hello world")
})



app.listen(3000, () => console.log("Server ready on port 3000."));
const DB = process.env.MONGOOSE_DB
mongoose
    .connect("mongodb+srv://raouf:rabah@cluster0.ayejlxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))
module.exports = app;