const Order = require("../models/order.model")

const OrderStepOne = async (id) => {
    try {
        // Find the order by ID
        let myorder = await Order.findById(id);

        if (!myorder) {
            throw new Error('Order not found');
        }

        // Execute logic after 63 seconds (63000ms)
        setTimeout(async () => {
            try {
                // Check if the order's LivrorShow or restaurantOK properties are not true
                if (!myorder.LivrorShow || !myorder.restaurantOK) {
                    // Update LivrorShow to true
                    await Order.findByIdAndUpdate(myorder._id, { LivrorShow: true });

                    // You may want to call OrderStepTwo if it's needed (uncomment if necessary)
                    // OrderStepTwo(id);
                }

                // Send a notification with the order's ride data
                await fetch("https://tawssilat-backend-liv.onrender.com/not", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ride: myorder.ride })
                });

            } catch (error) {
                console.error("Error updating orders or sending notification:", error);
            }

        }, 63000);

    } catch (error) {
        console.error("Error in OrderStepOne:", error.message);
    }
};


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
        }, 10000);
    } catch (e) {
        console.error("Error finding orders:", e);
    }
}

module.exports = { OrderStepOne, OrderStepTwo }