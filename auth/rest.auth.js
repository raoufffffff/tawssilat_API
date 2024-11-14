const express = require('express')
const Restaurant = require('../models/rest.Model')
const AuthRest = express.Router()

AuthRest.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find all restaurants
        const restaurants = await Restaurant.find();

        // Normalize the email to match, ignoring case and whitespace
        const matchedRestaurant = restaurants.find(
            restaurant => restaurant.email.replace(/\s+/g, '').toLowerCase() === email.replace(/\s+/g, '').toLowerCase()
        );

        if (!matchedRestaurant) {
            res.send({ good: false, email: false });
            return;
        }

        // Compare password (if stored as plain text, otherwise use bcrypt here)
        if (matchedRestaurant.password.replace(/\s+/g, '').toLowerCase() === password.replace(/\s+/g, '').toLowerCase()) {
            res.send({ good: true, result: matchedRestaurant });
        } else {
            res.send({ good: false, password: false });
        }

    } catch (error) {
        res.status(500).send({ good: false, message: error.message });
    }
});


module.exports = AuthRest