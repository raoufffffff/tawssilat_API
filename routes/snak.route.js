const express = require('express');
const Snak = require('../models/snak.model');
const snakRoute = express.Router();

snakRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Snak.find({ by: id })
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

snakRoute.post('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    body.by = id
    body.newPrice = 0
    body.orders = 0
    try {
        const myfood = await Snak.create(body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


snakRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const myfood = await Snak.findByIdAndUpdate(id, body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

snakRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Snak.findByIdAndDelete(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

module.exports = snakRoute