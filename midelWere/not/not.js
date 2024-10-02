const Restaurant = require('../../models/rest.Model');





const sendNot = async (restaurantId, orderDetails) => {
    try {
        // Fetch restaurant details by ID
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }

        if (!restaurant.not) {
            throw new Error('Restaurant does not have a push notification token');
        }

        // Create the message payload for FCM
        const message = {
            token: restaurant.not, // Push token from the restaurant's database
            notification: {
                title: 'New Order',
                body: `${orderDetails}`,  // Customize the body with order details
            },
            // APNs configuration for iOS
            apns: {
                payload: {
                    aps: {
                        sound: "a.wav", // Use the custom sound for iOS
                    },
                },
            },
            // Android configuration
            android: {
                priority: "high",
                notification: {
                    sound: "a.wav",  // Use the custom sound for Android
                },
            },
        };

        // Send the notification via Firebase Admin SDK
        const response = await admin.messaging().send(message);
        console.log("Successfully sent message:", response);
        return { success: true, message: 'Notification sent successfully' };

    } catch (error) {
        console.error('Error sending notification:', error.message);
        return { success: false, message: error.message };
    }
};


module.exports = sendNot;
