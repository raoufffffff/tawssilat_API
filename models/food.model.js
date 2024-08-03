const mongoose = require('mongoose')

const food = new mongoose.Schema({
    name: String,
    by: String,
    img: String,
    orders: Number,
    addon: [],
    des: String,
    type: String,
    price: Number,
    newPrice: Number,
    out: Boolean
})


const Food = mongoose.model('food', food)

module.exports = Food 