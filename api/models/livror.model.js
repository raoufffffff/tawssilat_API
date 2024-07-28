const mongoose = require('mongoose')

const livror = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    img: String,
    phone: String,
    cancelOrders: Number,
    orders: Number,
    city: String,
})


const Livror = mongoose.model('livror', livror)

module.exports = Livror 