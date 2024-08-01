const mongoose = require('mongoose')

const feedback = new mongoose.Schema({
    by: String,
    type: String,
    body: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const FeedBack = mongoose.model('feedback', feedback)

module.exports = FeedBack 