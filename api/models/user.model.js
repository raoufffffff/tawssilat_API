const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    img: String,
    phone: String,
    cancelOrders: Number,
    orders: Number,
    city: String,
})


const User = mongoose.model('user', user)

module.exports = User 