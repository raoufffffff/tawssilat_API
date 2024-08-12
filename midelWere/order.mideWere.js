const Order = require("../models/order.model")

const OrderStepOne = async (id) => {
    console.log('we are good to go');
    try {
        let myorder = await Order.findById(id)
        setTimeout(async () => {
            if (!myorder.LivrorShow || !myorder.restaurantOK) {
                try {
                    await Order.findByIdAndUpdate(myorder._id, { LivrorShow: true })
                        .then(() => {
                            // OrderStepTwo(id)
                        })
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 63000);
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
                try {
                    await Order.findByIdAndUpdate(myorder._id, {
                        LivrorShow: false,
                        whoCancel: "srver",
                        whyCancel: "time out ",
                        cancel: true,
                        complate: false
                    })
                    console.log("done");
                } catch (error) {
                    console.error("Error updating orders:", error);
                }
            }
        }, 63000);
    } catch (e) {
        console.error("Error finding orders:", e);
    }
}

module.exports = { OrderStepOne, OrderStepTwo }