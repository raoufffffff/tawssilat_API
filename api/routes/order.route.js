const experss = require('express')
const Order = require('../models/order.model')
const { OrderStepOne, OrderStepTwo } = require('../midelWere/order.mideWere')
const orderRoute = experss.Router()

orderRoute.get('/my/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.find({ restaurantid: id })
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.get('/liv', async (req, res) => {
    try {
        const myorder = await Order.find({ restaurantOK })
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.post('/', async (req, res) => {
    let { body } = req
    body.restaurantOK = false
    body.livrorOK = false
    body.about = {
        complate: false,
        restaurantCancel: false,
        livrorCancel: false,
        userCancel: false
    }
    body.serverCancel = false

    try {
        const myorder = await Order.create(body)
        res.send({ good: true, result: myorder, message: "ok" })
        console.log(myorder._id);
    } catch (error) {
        res, send({ good: false, message: error.message })
    }
})

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.findByIdAndDelete(id)
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res, send({ good: false, message: error.message })
    }
})