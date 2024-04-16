import { API_KEY } from './config.js'; 

//caching, store data with time stamp 

function getLiveRates(key) {
    const url = `http://api.currencylayer.com/live?access_key=${key}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error("Error fetching currency conversion data"); 
    });
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = getLiveRates(API_KEY); 
    let conversionRate; 
    if (fromCurrency === "USD") {
        conversionRate = rates[`USD${toCurrency}`]; 
    } else {
        conversionRate =  rates[`USD${toCurrency}`] / rates[`USD${fromCurrency}`]; 
    }
    return amount * conversionRate; 
}

console.log("Hello");
console.log(getLiveRates(API_KEY));

export default convertCurrency;