const express = require('express');
const Livror = require('../models/livror.model')
const livrorRoute = express.Router();

livrorRoute.get('/', async (req, res) => {
    try {
        const myfood = await Livror.find()
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

livrorRoute.post('/', async (req, res) => {
    let { body } = req
    body.cancelOrders = 0
    body.orders = 0
    try {
        const myfood = await User.cLivrore(body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


livrorRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const myfood = await User.findByIdAndUpdat(id, body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

livrorRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await User.findByIdAnLivrorete(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

module.exports = livrorRoute