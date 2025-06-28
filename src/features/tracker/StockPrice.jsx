import React, { useState, useEffect } from "react";
import axios from "axios";

const StockPrice = ({ symbol = "RELIANCE.BSE" }) => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "b9c3aebcd58d491296749df8f1a80426"; // Replace with your Twelve Data API key

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        setPrice(response.data.price);
      } catch (err) {
        setError("Error fetching price.");
        console.error(err);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // refresh every 60 seconds
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="bg-white shadow rounded p-4 w-fit">
      <h3 className="font-bold text-gray-800 mb-2">Live Stock Price</h3>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : price ? (
        <p>
          <strong>{symbol}:</strong> ₹{parseFloat(price).toFixed(2)}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockPrice;
