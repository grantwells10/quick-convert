require('dotenv').config(); 
const axios = require('axios'); 

const API_KEY = process.env.CURRENCYLAYER_API_KEY; 

async function getLiveRates(key) {
    const url = `http://api.currencylayer.com/live?access_key=${key}`;
    try {
        const response = await axios.get(url);
        const data = response.data.quotes; 
        return data; 
    } catch (error) {
        console.error("Error fetching currency conversion data"); 
    }
}

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await getLiveRates(API_KEY); 
    let conversionRate; 
    if (fromCurrency === "USD") {
        conversionRate = rates[`USD${toCurrency}`]; 
    } else {
        conversionRate =  rates[`USD${toCurrency}`] / rates[`USD${fromCurrency}`]; 
    }
    return amount * conversionRate; 
}

module.exports = convertCurrency;