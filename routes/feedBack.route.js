const express = require('express');
const FeedBack = require('../models/feedBack.model');
const FeedBackRoute = express.Router()

FeedBackRoute.get('/', async (req, res) => {
    try {
        const result = await FeedBack.find()
        res.send({ good: true, result: result, length: result.length })
    } catch (error) {
        res.send({ error: error })
    }
})

FeedBackRoute.post('/', async (req, res) => {
    const { body } = req
    try {
        const result = await FeedBack.create(body)
        res.send({ good: true, result: result, length: result.length })
    } catch (error) {
        res.send({ error: error })
    }
})

module.exports = FeedBackRoute