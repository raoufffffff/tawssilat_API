const mongoose = require('mongoose')

const order = new mongoose.Schema({
    user: {
        name: String,
        location: {},
        phone: String,

    },
    userid: String,
    restaurant: {
        name: String,
        location: {},
        phone: String,
    },
    restaurantid: String,
    price: Number,
    ride: Number,
    items: [],
    livror: {
        name: String,
        phone: String,
        id: String
    },
    about: {
        complate: Boolean,
        restaurantCancel: Boolean,
        livrorCancel: Boolean,
        userCancel: Boolean
    },
    serverCancel: Boolean,
    restaurantOK: Boolean,
    livrorOK: Boolean,
    LivrorShow: Boolean,
    cancel: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const Order = mongoose.model('order', order)

module.exports = Order 