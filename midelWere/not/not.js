const Restaurant = require('../../models/rest.Model');

const sendNot = async (a, b) => {
    try {
        // Fetch restaurant details
        const rest = await Restaurant.findById(a);
        if (!rest) {
            throw new Error('Restaurant not found');
        }

        // Prepare the notification payload
        const notificationPayload = {
            to: rest.not,
            title: 'New Order',
            body: `${b}`
        };

        // Send the notification
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notificationPayload) // Convert body to JSON string
        });

        // Check for successful response
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to send notification: ${errorText}`);
        }

        const result = await response.json();
        console.log('Notification sent successfully:', result);

    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
}

module.exports = sendNot;
