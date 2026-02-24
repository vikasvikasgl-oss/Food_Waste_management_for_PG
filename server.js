const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;
    
    try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'YOUR_API_KEY_HERE' // Put your Fast2SMS API key here
            },
            body: JSON.stringify({
                route: 'otp',
                variables_values: otp,
                numbers: phoneNumber,
                flash: 0
            })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
