const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const foodRoute = require('./routes/food.route');
const snakRoute = require('./routes/snak.route');
const restaurantRoute = require('./routes/Restaurant.route');
const orderRoute = require('./routes/order.route');
const AuthRest = require('./auth/rest.auth');
const FeedBackRoute = require('./routes/feedBack.route');
const admin = require("firebase-admin");

require('dotenv').config()

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

const app = express()
app.use(cors());
app.use(express.json())
app.use('/food', foodRoute)
app.use('/snak', snakRoute)
app.use('/restaurant', restaurantRoute)
app.use('/order', orderRoute)
app.use('/authrest', AuthRest)
app.use('/feedback', FeedBackRoute)


app.get('/', (req, res) => {
    res.send("hello world")
})



app.listen(3000, () => console.log("Server ready on port 3000."));
const DB = process.env.MONGOOSE_DB
mongoose
    .connect(DB)
    .then(() => {
        console.log("mriglla")

    })
    .catch(err => console.log(err))
module.exports = app;