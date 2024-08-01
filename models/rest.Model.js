const mongoose = require('mongoose')

const rest = new mongoose.Schema({
    name: String,
    phone: String,
    bg: String,
    logo: String,
    email: String,
    location: {
        "latitude": Number,
        "longitude": Number
    },
    cancelOrders: Number,
    open: Boolean,
    not: String,
    password: String,
    orders: Number,
    city: String,
})


const Restaurant = mongoose.model('rest', rest)

module.exports = Restaurant 