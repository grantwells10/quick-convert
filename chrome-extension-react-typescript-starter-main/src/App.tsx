import React, { useState, useEffect } from "react";
import "./App.css";
import Hello from "./components/Hello";

function App() {
  return (
    <div className="App">
    <h1>Target Currency</h1>
    <select>
      <option value="fruit">Fruit</option>
      <option value="vegetable">Vegetable</option>
      <option value="meat">Meat</option>
    </select>
  </div>
  );
}

export default App;


