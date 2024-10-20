const experss = require('express')
const Order = require('../models/order.model')
const { OrderStepOne } = require('../midelWere/order.mideWere')
const sendNot = require('../midelWere/not/not')
const orderRoute = experss.Router()

orderRoute.get('/my/:id', async (req, res) => {
    const { id } = req.params
    try {
        let myorder = await Order.find({ restaurantid: id })
        let result = myorder.filter(e => !e.cancel)
        res.send({ good: true, result: result, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let myorder = await Order.findById(id)
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.get('/myall/:id', async (req, res) => {
    const { id } = req.params
    try {
        let myorder = await Order.find({ restaurantid: id })
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.get('/', async (req, res) => {
    try {
        const myorder = await Order.find()
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

// orderRoute.get('/liv', async (req, res) => {
//     try {
//         const myorder = await Order.find({ LivrorShow: true })
//         res.send({ good: true, length: myorder.length, result: myorder, message: "ok" })
//     } catch (error) {
//         res.send({ good: false, message: error.message })
//     }
// })

orderRoute.post('/', async (req, res) => {
    let { body } = req
    body.restaurantOK = false
    body.livrorOK = false
    body.cancel = false
    body.complate = false
    try {
        const myorder = await Order.create(body)
        res.send({ good: true, result: myorder, message: "ok" })
        sendNot(body.restaurantid, body.price)
        OrderStepOne(myorder._id)
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.findByIdAndDelete(id)
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

// orderRoute.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         const myorder = await Order.findByIdAndDelete(id)
//         res.send({ good: true, result: myorder, message: "ok" })
//     } catch (error) {
//         res, send({ good: false, message: error.message })
//     }
// })


const aa = async () => {
    await fetch("https://tawssilat-backend-liv.onrender.com/not", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ride: myorder.ride })
    });
}


orderRoute.put('/acc/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.findByIdAndUpdate(id, { restaurantOK: true, LivrorShow: true })
        aa()
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.put('/done/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.findByIdAndUpdate(id, { livrorTake: true })
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

orderRoute.put('/ref/:id', async (req, res) => {
    const { id } = req.params
    try {
        const myorder = await Order.findByIdAndUpdate(id, { cancel: true, whoCancel: "Restaurant" })
        res.send({ good: true, result: myorder, message: "ok" })
    } catch (error) {
        res.send({ good: false, message: error.message })
    }
})

module.exports = orderRoute