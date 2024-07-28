const Order = require("../models/order.model")

const OrderStepOne = async (req, res, next) => {
    let { body } = req
    body.restaurantOK = false
    body.livrorOK = false
    body.about = {
        complate: false,
        restaurantCancel: false,
        livrorCancel: false,
        userCancel: false
    }
    body.serverCancel = false

    try {
        const myorder = await Order.create(body)
        res.send({ good: true, result: myorder, message: "ok" })
        next()
    } catch (error) {
        res, send({ good: false, message: error.message })
    }
}

const OrderStepTwo = async (req, res, next) => {
    try {
        let result = await Order.find();
        setTimeout(async () => {
            let tenMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            let oldorder = result.filter(e => new Date(e.createdAt) < tenMinutesAgo);

            const ServerCancel = async () => {
                try {
                    for (let e of oldorder) {
                        await Order.findByIdAndUpdate(e._id, { restaurantOK: true });
                    }
                } catch (e) {
                    console.error("Error updating orders:", e);
                }
            };

            await ServerCancel();
            next()
        }, 300000);
    } catch (e) {
        console.error("Error finding orders:", e);
    }
}

module.exports = { OrderStepOne, OrderStepTwo }