const express = require('express');
const Food = require('../models/food.model');
const Restaurant = require('../models/rest.Model');
const foodRoute = express.Router();

foodRoute.get('/my/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Food.find({ by: id })
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

foodRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Food.findById(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


foodRoute.post('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    body.by = id
    try {
        let rest = await Restaurant.findById(id)
        if (!rest.menu.includes(body.type)) {
            rest.menu.push(body.type);
            await Restaurant.findByIdAndUpdate(id, { menu: rest.menu });
        }
        const myfood = await Food.create(body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})


foodRoute.put('/:id', async (req, res) => {
    const { id } = req.params
    let { body } = req
    try {
        const myfood = await Food.findByIdAndUpdate(id, body)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

foodRoute.put('/out/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Food.findByIdAndUpdate(id, { out: true })
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

foodRoute.put('/in/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Food.findByIdAndUpdate(id, { out: false })
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

foodRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myfood = await Food.findByIdAndDelete(id)
        res.send({ good: true, result: myfood, message: 'ok' })
    } catch (error) {
        res.status(404).send({ message: error.message, good: false })
    }
})

module.exports = foodRoute