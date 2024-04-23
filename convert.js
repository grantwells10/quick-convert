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
        // use chrome.storage.local to store the data, it automatically serializes the data
        await chrome.storage.local.set({exchangeRates: entry});
        return data; 
    } catch (error) {
        console.log(error);
        return null; 
    }
}

// Function to convert currency from a given amount, fromCurrency to toCurrency

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await retrieveCache('exchangeRates');
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
    return new Promise((resolve, reject) => {
        // try to retrieve the data from the cache
        chrome.storage.local.get(['exchangeRates'], function(output) {
            // if chrome error, reject the promise
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return; 
            } 
            // try to fetch data from the API
            const response = output.exchangeRates; 
            // if nothing there, fetch and cache data 
            if (!response) {
                resolve(fetchAndCacheRates());
                return; 
            }
            // else, check if its expired
            const now = Date.now();
            const timestamp = response.timestamp;
            if (now - timestamp > 28800000) {
                // remove the old data, clean up step, if older than 8 hours
                chrome.storage.local.remove('exchangeRates', function() { 
                    // check for error again
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                        return; 
                    } 
                    // fetch and cache new data
                    resolve(fetchAndCacheRates());
                })
            } else {
                // else, return the data 
                resolve(response.data);
            }
    })}); 
}

export default convertCurrency;