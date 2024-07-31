const express = require('express');
const User = require('../models/user.model')
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    try {
        const myfood = await User.find()
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

userRoute.post('/', async (req, res) => {
    let { body } = req
    body.cancelOrders = 0
    body.orders = 0
    try {
        const myfood = await User.create(body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


userRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const myfood = await User.findByIdAndUpdate(id, body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

userRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await User.findByIdAndDelete(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

module.exports = userRoute