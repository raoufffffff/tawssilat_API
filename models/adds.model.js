const mongoose = require('mongoose')

const adds = new mongoose.Schema({
    img: String,
    in: Boolean,
    linkout: String,
    linkin: {
        name: String,
        id: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const Adds = mongoose.model('adds', adds)

module.exports = Adds 