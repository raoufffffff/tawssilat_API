const AddsRoute = require('express').Router()
const Adds = require('../models/adds.model')

AddsRoute.get('/', async (req, res) => {
    try {
        const result = await Adds.find()
        res.send({ good: true, message: result, length: result.length })
    } catch (error) {
        res.send({ message: error.message, good: false })
    }
})

AddsRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Adds.findByIdAndDelete(id)
        res.send({ good: true, message: result, length: result.length })
    } catch (error) {
        res.send({ message: error.message, good: false })
    }
})


AddsRoute.post('/', async (req, res) => {
    const body = req.body
    try {
        const result = await Adds.create(body)
        res.send({ good: true, message: result, length: result.length })
    } catch (error) {
        res.send({ message: error.message, good: false })
    }
})

module.exports = AddsRoute