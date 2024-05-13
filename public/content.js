console.log("[Content] this is content script")

let defaultToCurrency = "USD";  // Default target currency

// SYMBOLS MAPPED TO CURRENCY CODES (from https://www.xe.com/symbols/)
// Duplicate symbols removed, kept the most common

const currencyData = [
    { "Symbol": "$", "Abbreviation": "USD" },
    { "Symbol": "€", "Abbreviation": "EUR" },
    { "Symbol": "دإ", "Abbreviation": "AED" },
    { "Symbol": "؋", "Abbreviation": "AFN" },
    { "Symbol": "Lek", "Abbreviation": "ALL" },
    { "Symbol": "դր", "Abbreviation": "AMD" },
    { "Symbol": "ман", "Abbreviation": "AZN" },
    { "Symbol": "KM", "Abbreviation": "BAM" },
    { "Symbol": "৳", "Abbreviation": "BDT" },
    { "Symbol": "лв", "Abbreviation": "BGN" },
    { "Symbol": "دب", "Abbreviation": "BHD" },
    { "Symbol": "FBu", "Abbreviation": "BIF" },
    { "Symbol": "Bs", "Abbreviation": "BOB" },
    { "Symbol": "R$", "Abbreviation": "BRL" },
    { "Symbol": "P", "Abbreviation": "BWP" },
    { "Symbol": "руб", "Abbreviation": "BYN" },
    { "Symbol": "FrCD", "Abbreviation": "CDF" },
    { "Symbol": "CHF", "Abbreviation": "CHF" },
    { "Symbol": "CN¥", "Abbreviation": "CNY" },
    { "Symbol": "₡", "Abbreviation": "CRC" },
    { "Symbol": "CV$", "Abbreviation": "CVE" },
    { "Symbol": "Kč", "Abbreviation": "CZK" },
    { "Symbol": "Fdj", "Abbreviation": "DJF" },
    { "Symbol": "kr", "Abbreviation": "DKK" },
    { "Symbol": "RD$", "Abbreviation": "DOP" },
    { "Symbol": "دج", "Abbreviation": "DZD" },
    { "Symbol": "جم", "Abbreviation": "EGP" },
    { "Symbol": "Nfk", "Abbreviation": "ERN" },
    { "Symbol": "Br", "Abbreviation": "ETB" },
    { "Symbol": "£", "Abbreviation": "GBP" },
    { "Symbol": "GEL", "Abbreviation": "GEL" },
    { "Symbol": "₵", "Abbreviation": "GHS" },
    { "Symbol": "FG", "Abbreviation": "GNF" },
    { "Symbol": "Q", "Abbreviation": "GTQ" },
    { "Symbol": "L", "Abbreviation": "HNL" },
    { "Symbol": "kn", "Abbreviation": "HRK" },
    { "Symbol": "Ft", "Abbreviation": "HUF" },
    { "Symbol": "Rp", "Abbreviation": "IDR" },
    { "Symbol": "₪", "Abbreviation": "ILS" },
    { "Symbol": "টকা", "Abbreviation": "INR" },
    { "Symbol": "دع", "Abbreviation": "IQD" },
    { "Symbol": "﷼", "Abbreviation": "IRR" },
    { "Symbol": "دأ", "Abbreviation": "JOD" },
    { "Symbol": "￥", "Abbreviation": "JPY" },
    { "Symbol": "Ksh", "Abbreviation": "KES" },
    { "Symbol": "៛", "Abbreviation": "KHR" },
    { "Symbol": "FC", "Abbreviation": "KMF" },
    { "Symbol": "₩", "Abbreviation": "KRW" },
    { "Symbol": "دك", "Abbreviation": "KWD" },
    { "Symbol": "тңг", "Abbreviation": "KZT" },
    { "Symbol": "لل", "Abbreviation": "LBP" },
    { "Symbol": "SL Re", "Abbreviation": "LKR" },
    { "Symbol": "Lt", "Abbreviation": "LTL" },
    { "Symbol": "Ls", "Abbreviation": "LVL" },
    { "Symbol": "دل", "Abbreviation": "LYD" },
    { "Symbol": "دم", "Abbreviation": "MAD" },
    { "Symbol": "K", "Abbreviation": "MMK" },
    { "Symbol": "RM", "Abbreviation": "MYR" },
    { "Symbol": "MTn", "Abbreviation": "MZN" },
    { "Symbol": "N$", "Abbreviation": "NAD" },
    { "Symbol": "₦", "Abbreviation": "NGN" },
    { "Symbol": "C$", "Abbreviation": "NIO" },
    { "Symbol": "नेरू", "Abbreviation": "NPR" },
    { "Symbol": "رع", "Abbreviation": "OMR" },
    { "Symbol": "B/.", "Abbreviation": "PAB" },
    { "Symbol": "S/.", "Abbreviation": "PEN" },
    { "Symbol": "₱", "Abbreviation": "PHP" },
    { "Symbol": "₨", "Abbreviation": "PKR" },
    { "Symbol": "zł", "Abbreviation": "PLN" },
    { "Symbol": "₲", "Abbreviation": "PYG" },
    { "Symbol": "رق", "Abbreviation": "QAR" },
    { "Symbol": "дин", "Abbreviation": "RSD" },
    { "Symbol": "₽", "Abbreviation": "RUB" },
    { "Symbol": "FR", "Abbreviation": "RWF" },
    { "Symbol": "رس", "Abbreviation": "SAR" },
    { "Symbol": "Ssh", "Abbreviation": "SOS" },
    { "Symbol": "لس", "Abbreviation": "SYP" },
    { "Symbol": "฿", "Abbreviation": "THB" },
    { "Symbol": "دت", "Abbreviation": "TND" },
    { "Symbol": "T$", "Abbreviation": "TOP" },
    { "Symbol": "TL", "Abbreviation": "TRY" },
    { "Symbol": "NT$", "Abbreviation": "TWD" },
    { "Symbol": "TSh", "Abbreviation": "TZS" },
    { "Symbol": "₴", "Abbreviation": "UAH" },
    { "Symbol": "USh", "Abbreviation": "UGX" },
    { "Symbol": "Bs.F.", "Abbreviation": "VEF" },
    { "Symbol": "₫", "Abbreviation": "VND" },
    { "Symbol": "FCFA", "Abbreviation": "XAF" },
    { "Symbol": "CFA", "Abbreviation": "XOF" },
    { "Symbol": "ري", "Abbreviation": "YER" },
    { "Symbol": "R", "Abbreviation": "ZAR" },
    { "Symbol": "ZK", "Abbreviation": "ZMK" },
  ];

// Function to retrieve live exchange rates from the API and cache them

async function fetchAndCacheRates() {
    try {
        const url = `https://currency-converter-e1ym.onrender.com/api`;
        const response = await fetch(url);
        if (!response) { 
            throw new Error("Failed to fetch data");
        }
        // only get the quotes
        const data = await response.json();
        // store the conversion rates with the timestamp of retrieval in milliseconds
        const entry = {
            data: data.quotes,
            timestamp: Date.now()
        }
        console.log("Printing data....: ")
        console.log(data.quotes); 
        // use chrome.storage.local to store the data, it automatically serializes the data
        await chrome.storage.local.set({exchangeRates: entry});
        return data.quotes; 
    } catch (error) {
        console.log("CANT FETCH DATA");
        throw(error);
    }
}

// Function to convert currency from a given amount, fromCurrency to toCurrency

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await retrieveCache();
    let conversionRate; 
    if (fromCurrency === "USD") {
        conversionRate = rates[`USD${toCurrency}`]; 
    } else {
        if (toCurrency === "USD") {
            conversionRate = 1 / rates[`USD${fromCurrency}`]; 
        } else {
            conversionRate =  rates[`USD${toCurrency}`] / rates[`USD${fromCurrency}`]; 
        }
    }
    return amount * conversionRate; 
}

// Function to retrieve cached data or make a new fetch if expired or not there 

async function retrieveCache() {
    let output = await chrome.storage.local.get(['exchangeRates']);
    const response = output.exchangeRates;
    if (!response || !response.data) {
        console.log("No data found, doing initial API call...");
        return await fetchAndCacheRates();
    }
    const now = Date.now();
    const timestamp = response.timestamp;
    if (now - timestamp > 28800000) {
        console.log("Data expired, doing another API call...");
        await chrome.storage.local.remove('exchangeRates');
        return await fetchAndCacheRates(); 
    }
    console.log("Returning cached data...");
    return response.data; 
}

// Update the default currency from chrome.storage.local
async function updateCurrencyFromStorage() {
    const data = await chrome.storage.local.get(['selectedCurrency']);
    if (data.selectedCurrency) {
        defaultToCurrency = data.selectedCurrency;
        console.log("[Content] Updated default currency to:", defaultToCurrency);
    }
}

// Parse currecny ammount and symbol from selected text
async function extractCurrencyAndAmount(text) {
    // Extract the amount
    const amountRegex = /[\d,]+\.?\d*/;
    const amount = text.match(amountRegex);
    let number = null;
    if (amount) {
        number = parseFloat(amount[0].replace(/,/g, ''));
    }

    // First, try to extract the three letter currency code
    const currencyRegex = /[A-Z]{3}/;
    const currency = text.match(currencyRegex);
    if (currency) {
        return {
            currency: currency[0], 
            number: number
        };
    } 
    // If not, extract based off the keys in curreny_data.json
    for (let i = 0; i < currencyData.length; i++) {
        if (text.includes(currencyData[i].Symbol)) {
            return {
                currency: currencyData[i].Abbreviation, 
                number: number
            };
        }
    }

}

function createPopup(selectionText, position) {
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = (position.top - 50) + "px"; // position it above the selection
    popup.style.left = (position.left) + "px"; // align it with the left side of the selection
    popup.style.backgroundColor = "#fff";
    popup.style.border = "1px solid #000";
    popup.style.padding = "10px";
    
    // Create a Popup div
    var selected = document.createElement("div");
    selected.textContent = defaultToCurrency + ' ' + selectionText;
    popup.appendChild(selected);
    
    popup.id = "myPopup";

    return popup;
}

document.addEventListener("mouseup", async (event) => {
    var selection = window.getSelection();
    var selectionText = selection.toString().trim();
    console.log("[Content] selection: " + selection);
    if (selectionText && selectionText !== "") {
      var rect = selection.getRangeAt(0).getBoundingClientRect();
      try {
        // get target currency from storage
        await updateCurrencyFromStorage();
        const selectedCurr = await extractCurrencyAndAmount(selectionText); 
        const result = await convertCurrency(selectedCurr.number, selectedCurr.currency, defaultToCurrency);
        const popup = createPopup(result.toFixed(2), rect);
        document.body.appendChild(popup);
        document.addEventListener("mousedown", function(event) {
          var isClickInside = popup.contains(event.target);
          if (!isClickInside) {
              popup.parentNode.removeChild(popup);
              document.removeEventListener("mousedown", arguments.callee);
          }
        });
      } catch(error) {
        throw(error);
      }
    }
  });
  



