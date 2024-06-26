const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4000; // PORT variable from Render

app.use(express.json());
// Enables CORS for all routes
app.use(cors());

app.get('/api', async (req, res) => {
    const url = `http://apilayer.net/api/live`;
    try {
        const response = await axios.get(url, {
            params: {
                access_key: process.env.API_KEY
            }
        });
        // send data from server to client
        res.json(response.data);
    } catch (error) {
        // send message from server to client
        res.status(500).json({ error: error.message });
    }
});

// Initliaze the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


