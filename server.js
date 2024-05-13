const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000; // PORT variable from Render

app.use(express.json());

app.get('/api', async (req, res) => {
    const url = `https://apilayer.net/api/live`;
    try {
        const response = axios.get(url, {
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


