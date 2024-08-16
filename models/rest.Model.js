const mongoose = require('mongoose');

// Define the restaurant schema
const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    bg: {
        type: String,
        default: '' // Default value for background image or color
    },
    logo: {
        type: String,
        default: '' // Default value for logo
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    cancelOrders: {
        type: Number,
        default: 0,
        min: 0 // Ensures the number of canceled orders can't be negative
    },
    open: {
        type: Boolean,
        default: false
    },
    not: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensure a minimum password length
    },
    orders: {
        type: Number,
        default: 0,
        min: 0 // Ensures the number of orders can't be negative
    },
    city: {
        type: String,
        required: true
    },
    menu: {
        type: [String], // Specify that menu is an array of strings
        default: [] // Initialize with an empty array
    }
});

// Create an index on email for faster lookups
restSchema.index({ email: 1 });

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restSchema);

module.exports = Restaurant;
