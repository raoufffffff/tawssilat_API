const express = require('express')
const Restaurant = require('../models/rest.Model')
const AuthRest = express.Router()

AuthRest.post('/', async (req, res) => {
    const { body } = req
    try {
        const rest = await Restaurant.findOne({ email: body.email })
        console.log(rest);
        if (!rest) {
            res.send({ good: false, email: false })
            return
        }
        if (rest.password === body.password) {
            res.send({ good: true, result: rest })
            return
        }
        res.send({ good: false, password: false })

    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

module.exports = AuthRest