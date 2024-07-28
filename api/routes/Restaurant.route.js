const express = require('express');
const Restaurant = require('../models/rest.Model');
const restaurantRoute = express.Router();

restaurantRoute.get('/', async (req, res) => {
    try {
        const myfood = await Restaurant.find()
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

restaurantRoute.post('/', async (req, res) => {
    let { body } = req
    body.cancelOrders = 0
    body.orders = 0
    try {
        const myfood = await Restaurant.create(body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


restaurantRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const myfood = await Restaurant.findByIdAndUpdate(id, body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

restaurantRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Restaurant.findByIdAndDelete(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

module.exports = restaurantRoute