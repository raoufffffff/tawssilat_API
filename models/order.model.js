const mongoose = require('mongoose')

const order = new mongoose.Schema({
    userid: String,
    restaurantid: String,
    user: {
        name: String,
        location: {},
        phone: String,

    },
    restaurant: {
        name: String,
        location: {},
        phone: String,
    },
    price: Number,
    ride: Number,
    items: [],
    livror: {
        name: String,
        phone: String,
        id: String
    },
    whoCancel: String,
    whyCancel: String,
    complate: Boolean,
    restaurantOK: Boolean,
    livrorTake: Boolean,
    livrorTakefrom: Boolean,
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