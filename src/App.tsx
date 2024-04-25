import React, { useState, useEffect } from "react";
import "./App.css";
import Hello from "./components/Hello";
import Currencies from "./currency.jsx";

function App() {
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);

  useEffect(() => {
    // Load currency data from the JSON file
    setCurrencies(currencies);
  }, []);

  return (
    <div className="App">
      <h1>Target Currency</h1>
      <select>
        {/* Use map function to generate options */}
        {Currencies.currency.map((currency, index) => (
          <option key={index} value={currency.Value}>
            {currency.Key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
