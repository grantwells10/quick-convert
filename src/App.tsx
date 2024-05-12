import React, { useState, useEffect } from "react";
import "./App.css";
import currencyData from "./currency_data.json";

// interface that matches the JSON structure
interface Currency {
  Symbol: string;
  Abbreviation: string;
}

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  // Load currency data from the JSON file
  useEffect(() => {
    setCurrencies(currencyData as Currency[]);
  }, []);

  // Load the selected currency from the cache when the component mounts
  useEffect(() => {
    chrome.storage.local.get(['selectedCurrency'], (result) => {
      setSelectedCurrency(result.selectedCurrency || 'USD');
    });
  }, []);

  useEffect(() => {
    // Save the selected currency to local storage whenever it changes
    chrome.storage.local.set({ 'selectedCurrency': selectedCurrency }, () => {
      console.log("Currency saved:", selectedCurrency);
    });
  }, [selectedCurrency]);

  // Function to handle currency selection changes
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
    // cache the currency
    chrome.storage.local.set({ selectedCurrency: event.target.value });
  };

  return (
    <div className="App">
      <h1>Target Currency</h1>
      <select value = {selectedCurrency} onChange={handleCurrencyChange}>
        {currencies.map((currency, index) => (
          <option key={index} value={currency.Abbreviation}>
            {currency.Abbreviation}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
