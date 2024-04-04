const puppeteer = require('puppeteer');
const convertCurrency = require('./convert.js');
const readlineSync = require('readline-sync');

const currencySymbols = {
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    '₹': 'INR'
    // add more
};

//get the currency symbol from the price string
function parseCurrencySymbol(s) {
    const regex = /[$€£¥₹]/g;
    const matches = s.match(regex);
    return matches ? matches.join('') : '';
}

//get the currency amount from the price string
function parseCurrencyAmount(s) {
    const regex = /[0-9]+(\.[0-9][0-9])?/g;
    const matches = s.match(regex);
    return matches ? matches[0] : '';
}

async function scrapePrice(url) {
    const browser = await puppeteer.launch({ headless : true });
    const page = await browser.newPage();

    //to help avoid bot detection 
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2' });

    const price = await page.evaluate(() => {
        let priceClass = '.apexPriceToPay, .a-price'; //use AI to find class name of price? 
        let priceElement = document.querySelector(priceClass); //just return the first price found
        return priceElement ? priceElement.innerText : "Price not able to be scraped, please enter manually"; //maybe add pop up to enter price manually? 
    });
    
    await browser.close();
    return price;
}

(async () => {
    // NEED TO FIGURE OUT HOW TO ONLY SCRAPE ONE OF THE PRICES
    const price = await scrapePrice('https://www.amazon.com/Apple-iPhone-11-64GB-Unlocked/dp/B07ZPKZSSC');
    console.log("Price: ", price);
    const symbol = parseCurrencySymbol(price)[0];
    console.log("symbol: ", symbol);
    const amount = parseCurrencyAmount(price);
    console.log("amount: ", amount);
    const fromCurrency = currencySymbols[symbol];
    console.log("fromCurrency: ", fromCurrency);
    const toCurrency = readlineSync.question('Enter the currency you want to convert to: ');
    console.log("toCurrency: ", toCurrency);
    const converted = await convertCurrency(amount, fromCurrency, toCurrency);
    console.log(converted);
})();