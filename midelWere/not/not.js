const Restaurant = require('../../models/rest.Model');
const { JWT } = require('google-auth-library');
require('dotenv').config()
function getAccessTokenAsync(key) {
    return new Promise(function (resolve, reject) {
        const jwtClient = new JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/cloud-platform'],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

async function sendFCMv1Notification(a, b) {
    const key = JSON.parse(process.env.FIREBASE_KEYS)
    const firebaseAccessToken = await getAccessTokenAsync(key);
    const deviceToken = a;

    const messageBody = {
        "message": {
            "token": deviceToken,
            "notification": {
                "title": "you have a new order",
                "body": `price: ${b} DA`,
            },
            "data": {
                "channelId": "default",
                "message": "Testing",
                "title": "This is an FCM notification message",
                "body": "{\"title\": \"new order\", \"body\": \"hello\"}",
                "scopeKey": "@tawssilatcompany/tawssilat_resturants",
                "experienceId": "@tawssilatcompany/tawssilat_resturants"
            }
        }

    };

    const response = await fetch(
        `https://fcm.googleapis.com/v1/projects/tawssilat-resturants/messages:send`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${firebaseAccessToken}`,
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody),
        }
    );

    const readResponse = (response) => response.json();
    const json = await readResponse(response);

    console.log(`Response JSON: ${JSON.stringify(json, null, 2)}`);
}


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
        sendFCMv1Notification(restaurant.not, orderDetails)


    } catch (error) {
        console.error('Error sending notification:', error.message);
        return { success: false, message: error.message };
    }
};


module.exports = sendNot;
