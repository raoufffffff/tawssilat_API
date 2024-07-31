const mongoose = require('mongoose')

const snak = new mongoose.Schema({
    name: String,
    by: String,
    img: String,
    orders: Number,
    des: String,
    price: Number,
})


const Snak = mongoose.model('snak', snak)

module.exports = Snak 