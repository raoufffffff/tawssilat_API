const Order = require("../models/order.model")

const OrderStepOne = async (id) => {
    console.log('we are good to go');
    try {
        let myorder = await Order.findById(id)
        setTimeout(async () => {
            if (!myorder.LivrorShow || !myorder.restaurantOK) {
                myorder.LivrorShow = true
                try {
                    await Order.findByIdAndUpdate(id, myorder)
                        .then(() => {
                            OrderStepTwo(id)
                        })
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 360000);
    } catch (error) {
        res, send({ good: false, message: error.message })
    }
}

const OrderStepTwo = async (id) => {
    console.log('ok done');
    try {
        let myorder = await Order.findById(id)
        setTimeout(async () => {
            if (!myorder.livrorOK || !myorder.cancel) {
                // myorder.serverCancel = true
                myorder.LivrorShow = false
                myorder.whoCancel = "srver"
                myorder.whyCancel = "time out "
                myorder.complate = false
                myorder.cancel = true
                try {
                    await Order.findByIdAndUpdate(id, myorder)
                    console.log("done");
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 360000);
    } catch (e) {
        console.error("Error finding orders:", e);
    }
}

module.exports = { OrderStepOne, OrderStepTwo }