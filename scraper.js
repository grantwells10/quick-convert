const puppeteer = require('puppeteer');

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
    const price = await scrapePrice('https://www.amazon.com/Apple-iPhone-11-64GB-Unlocked/dp/B07ZPKZSSC');
    console.log(price);
})();