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
        console.log("Fetching data...");
        const url = `https://currency-converter-e1ym.onrender.com/api`;
        const response = await fetch(url);
        console.log("Suppppp data...");
        if (!response) { 
            console.log("Failed to fetch data");
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
    // check for case when user tries to convert currency to itself
    if (fromCurrency == toCurrency) {
        return amount;
    }
    const rates = await retrieveCache();
    let conversionRate; 
    if (fromCurrency === "USD") {
        console.log("Converting from USD");
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
    const amountRegex = /[\d,\.]+/;
    const amount = text.match(amountRegex);
    let number = null;

    // Handle the various cases of commas and periods (ex 1.000,00 or 1,000.00)

    if (amount) {
        const normalizedAmount = amount.map(a => {
            console.log("HANDLING -> " + a);
            // Case 1: Both commas and periods are included
            if (a.includes(',') && a.includes('.')) {
                console.log("Case 1");
                // Case 1a: Comma comes before period, comma is delimiter for thousands
                if (a.indexOf(',') < a.indexOf('.')) {
                    // get rid of commas, leave decimal
                    return a.replace(/,/g, '');
                } 
                // Case 1b: Period comes before comma, period is delimiter for thousands
                else {
                    // get rid of periods, replace comma with period as decimal
                    return a.replace(/\./g, '').replace(/,/g, '.');
                }
            } 
            // Case 2: Only commas are included
            else if (a.includes(',')) {
                console.log("Case 2");
                // Case 2a: More than one comma, assume they are delimiter 
                if ((a.match(/,/) || []).length > 1){
                    return a.replace(/,/g, '');
                }
                // Case 2b: Only one comma, assume it is a decimal
                else {
                    console.log("2b");
                    const parts = a.split(',');
                    // Case 2bi: Three digits after comma, assume it is a delimiter
                    if (parts[1].length === 3) {
                        console.log('2bi');
                        return a.replace(/,/g, '');
                    } 
                    // Case 2bii: Assume it is a decimal
                    else {
                        console.log('2bii');
                        return a.replace(/,/g, '.');
                    }
                }
            }
            // Case 3: Only periods or no
            else {
                console.log("Case 3");
                // Case 3a: Only one period   
                if ((a.match(/\./g) || []).length == 1) {
                    const parts = a.split('.');
                    // Case 3ai: Three digits after period, assume it is a delimiter
                    if (parts[1].length === 3) {
                        return a.replace(/\./g, '');
                    } 
                    // Case 3aii: 1 or 2 digits after period, assume it is a decimal
                    else {
                        return a;
                    }
                }
                // Case 3b: Multiple periods or none, just remove if there and return
                else {
                    // just remove them
                    return a.replace(/\./g, '');
                }
            }
        })
        number = parseFloat(normalizedAmount[0]);
    }
    
    // Then, first, try to extract the three letter currency code
    const currencyRegex = /[A-Z]{3}/;
    let currency = text.match(currencyRegex);
    if (currency) {
        currency = currency[0];
        // ACCOUNT MANUALLY FOR CURRENCY SYMBOLS THAT ARE ALSO CURRENCY CODES
        if (currency == 'YEN') {
            currency = 'JPY';
        } else if (currency == 'CFA') {
            currency = 'XOF';
        } else if (currency == 'FCF') {
            currency = 'XAF';
        } else if (currency == 'FCD') {
            currency = 'CDF';
        }
        console.log("Amount: ", number);
        console.log("Currency: ", currency);
        return {
            currency: currency || "UNKNOWN", 
            number: number || 0
        };
    } 
    // If not, extract based off the keys in curreny_data.json
    for (let i = 0; i < currencyData.length; i++) {
        if (text.includes(currencyData[i].Symbol)) {
            console.log("Amount: ", number);
            console.log("Currency: ", currencyData[i].Abbreviation);
            return {
                currency: currencyData[i].Abbreviation || "UNKNOWN", 
                number: number || 0
            };
        }
    }

    return {
        currency: "UNKNOWN",
        number: number || 0
    }

}

function createPopup(selectionText, position, flag) {
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = (position.top - 50) + "px"; // position it above the selection
    popup.style.left = (position.left) + "px"; // align it with the left side of the selection
    popup.style.backgroundColor = "#fff";
    popup.style.color = "green";
    popup.style.border = "1px solid #000";
    popup.style.padding = "10px";
    // make it at the front of every website
    popup.style.zIndex = 999999;
    
    // Create a Popup div
    var selected = document.createElement("div");
    if (flag) {
        selected.textContent = defaultToCurrency + ' ' + selectionText;
    } else {
        selected.textContent = selectionText;
    }
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
        let result = null; 
        let flag = true; 
        if (selectedCurr.currency == "UNKNOWN") {
            result = "Currency not recognized";
            flag = false;
        } else {
            result = await convertCurrency(selectedCurr.number, selectedCurr.currency, defaultToCurrency);
        }
        if (flag) {
            result = result.toFixed(2);
        }
        const popup = createPopup(result, rect, flag);
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
  



