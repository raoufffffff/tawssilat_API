const Order = require("../models/order.model")

const OrderStepOne = async (id) => {
    console.log('we are good to go');
    try {
        let myorder = await Order.findById(id)
        setTimeout(async () => {
            if (myorder.LivrorShow) {
                return
            } else {
                myorder.LivrorShow = true
                try {
                    await Order.findByIdAndUpdate(id, myorder)
                    OrderStepTwo(id)
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 15000);
    } catch (error) {
        res, send({ good: false, message: error.message })
    }
}

const OrderStepTwo = async (id) => {
    console.log('ok done');
    try {
        let myorder = await Order.findById(id)
        setTimeout(async () => {
            if (myorder.livrorOK) {
                return
            } else {
                myorder.serverCancel = true
                myorder.LivrorShow = false
                try {
                    await Order.findByIdAndUpdate(id, myorder)
                    console.log("done");
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 10000);
    } catch (e) {
        console.error("Error finding orders:", e);
    }
}

module.exports = { OrderStepOne, OrderStepTwo }