import { API_KEY } from './config.js'; 

// Function to retrieve live exchange rates from the API and cache them

async function fetchAndCacheRates() {
    try {
        const url = `http://api.currencylayer.com/live?access_key=${API_KEY}`;
        const response = await fetch(url);
        if (!response) {
            throw new Error("Failed to fetch data");
        }
        // only get the quotes
        const data = await response.json().quotes;
        // store the conversion rates with the timestamp of retrieval in milliseconds
        const entry = {
            data: data,
            timestamp: Date.now()
        }
        localStorage.setItem('exchangeRates', JSON.stringify(entry));
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Function to convert currency from a given amount, fromCurrency to toCurrency

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await retrieveCache('exchangeRates');
    
    // CHECK IF THE DATA IS OLDER THAN 8 HOURS WITH CACHING

    let conversionRate; 
    if (fromCurrency === "USD") {
        conversionRate = rates[`USD${toCurrency}`]; 
    } else {
        conversionRate =  rates[`USD${toCurrency}`] / rates[`USD${fromCurrency}`]; 
    }
    return amount * conversionRate; 
}

// Function to retrieve cached data or make a new fetch if expired or not there 

async function retrieveCache() {
    // attempt to retrieve the data from the cache
    const data = localStorage.getItem('exchangeRates');

    //no data to return, empty cache, fetch new data and cache it 
    if (!data) {
        return await fetchAndCacheRates(); 
    }

    // parse the data
    const parsedData = JSON.parse(data);

    // get current time 
    const now = Date.now();
    const timestamp = parsedData.timestamp; 

    // if the data is older than 8 hours, fetch new data and cache it
    if (now - timestamp > 28800000) {
        // remove the old data, clean up step
        localStorage.removeItem('exchangeRates');
        return await fetchAndCacheRates(); 
    } 

    // else, return the data!
    return parsedData.data;
}

async function extractCurrencyAndAmount(text) {
    const currencyRegex = /[A-Z]{3}/;
    const amountRegex = /[\d,]+\.?\d*/;

    const currency = text.match(currencyRegex);
    const amount = text.match(amountRegex);

    let number = null;
    if (amount) {
        number = parseFloat(amount[0].replace(/,/g, ''));
    }

    return {
        currency: currency ? currency[0] : null,
        number: number
    };
}

(async () => {
    console.log("Hello!");
})();

export default convertCurrency;