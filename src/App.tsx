import React, { useState, useEffect } from "react";
import "./App.css";
import currencyData from "./currency_data.json";

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Load currency data from the JSON file
    setCurrencies(currencyData);
  }, []);

  return (
    <div className="App">
      <h1>Target Currency</h1>
      <select>
        {/* Use map function to generate options */}
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
